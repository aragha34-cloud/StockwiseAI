const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');

// Helper function to get user ID from request
function getUserId(req) {
  return req.query.userId || req.headers['user-id'] || '1';
}

// GET /api/learning/progress - Get learning progress
router.get('/progress', (req, res) => {
  try {
    const userId = getUserId(req);
    
    const progress = db.prepare(`
      SELECT 
        id,
        lesson_title,
        category,
        status,
        completed_at,
        created_at,
        updated_at
      FROM learning_progress
      WHERE user_id = ?
      ORDER BY created_at DESC
    `).all(userId);

    // Get statistics
    const stats = db.prepare(`
      SELECT 
        COUNT(*) as total_lessons,
        SUM(CASE WHEN status = 'complete' THEN 1 ELSE 0 END) as completed_lessons
      FROM learning_progress
      WHERE user_id = ?
    `).get(userId);

    res.json({
      progress,
      stats: {
        total: stats.total_lessons || 0,
        completed: stats.completed_lessons || 0
      }
    });
  } catch (error) {
    console.error('Error fetching learning progress:', error);
    res.status(500).json({ error: 'Failed to fetch learning progress' });
  }
});

// POST /api/learning/lessons - Mark lesson as complete
router.post('/lessons', (req, res) => {
  try {
    const userId = getUserId(req);
    const { lessonTitle, category, status } = req.body;

    if (!lessonTitle || !category) {
      return res.status(400).json({ error: 'Missing required fields: lessonTitle, category' });
    }

    const lessonStatus = status || 'complete';
    const completedAt = lessonStatus === 'complete' ? new Date().toISOString() : null;

    // Check if lesson already exists
    const existing = db.prepare(`
      SELECT id FROM learning_progress 
      WHERE user_id = ? AND lesson_title = ?
    `).get(userId, lessonTitle);

    if (existing) {
      // Update existing lesson
      db.prepare(`
        UPDATE learning_progress 
        SET status = ?, completed_at = ?, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ? AND lesson_title = ?
      `).run(lessonStatus, completedAt, userId, lessonTitle);
    } else {
      // Insert new lesson
      const id = uuidv4();
      db.prepare(`
        INSERT INTO learning_progress (id, user_id, lesson_title, category, status, completed_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(id, userId, lessonTitle, category, lessonStatus, completedAt);
    }

    res.json({ message: 'Lesson progress updated successfully' });
  } catch (error) {
    console.error('Error updating lesson progress:', error);
    res.status(500).json({ error: 'Failed to update lesson progress' });
  }
});

// GET /api/learning/lessons - Get all lessons (with user's progress)
router.get('/lessons', (req, res) => {
  try {
    const userId = getUserId(req);
    
    // Define all available lessons (matching frontend)
    const allLessons = [
      {
        title: 'What is the Stock Market?',
        description: 'Understand the fundamentals of how stock markets work.',
        category: 'Basics',
        duration: '5 min'
      },
      {
        title: 'Stocks vs Bonds',
        description: 'Learn the key differences between stocks and bonds as investment vehicles.',
        category: 'Basics',
        duration: '4 min'
      },
      {
        title: 'Risk and Return',
        description: 'Explore the relationship between investment risk and potential returns.',
        category: 'Basics',
        duration: '6 min'
      },
      {
        title: 'Diversification Basics',
        description: 'Why putting all eggs in one basket is risky, and how to spread investments.',
        category: 'Basics',
        duration: '5 min'
      },
      {
        title: 'How to Buy Your First Stock',
        description: 'Step-by-step guide to making your first stock purchase.',
        category: 'Stocks',
        duration: '7 min'
      },
      {
        title: 'Reading Stock Quotes',
        description: 'Decode stock tickers, prices, and market data like a pro.',
        category: 'Stocks',
        duration: '5 min'
      },
      {
        title: 'Growth Investing',
        description: 'Learn about growth investing strategies.',
        category: 'Strategy',
        duration: '6 min'
      }
    ];

    // Get user's progress
    const userProgress = db.prepare(`
      SELECT lesson_title, status 
      FROM learning_progress 
      WHERE user_id = ?
    `).all(userId);

    const progressMap = {};
    userProgress.forEach(p => {
      progressMap[p.lesson_title] = p.status;
    });

    // Combine lessons with user progress
    const lessonsWithProgress = allLessons.map(lesson => ({
      ...lesson,
      status: progressMap[lesson.title] || 'initialize'
    }));

    res.json(lessonsWithProgress);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
});

module.exports = router;


