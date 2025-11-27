const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Helper function to get user ID from request
function getUserId(req) {
  return req.query.userId || req.headers['user-id'] || '1';
}

// GET /api/user - Get user profile
router.get('/', (req, res) => {
  try {
    const userId = getUserId(req);
    
    const user = db.prepare(`
      SELECT 
        id,
        name,
        email,
        level,
        experience_level,
        risk_tolerance,
        paper_balance,
        investment_streak,
        last_active_date
      FROM users
      WHERE id = ?
    `).get(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// GET /api/user/stats - Get user statistics for dashboard
router.get('/stats', (req, res) => {
  try {
    const userId = getUserId(req);
    
    // Get user basic info
    const user = db.prepare('SELECT paper_balance, investment_streak FROM users WHERE id = ?').get(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get portfolio value
    const holdings = db.prepare('SELECT shares, purchase_price FROM portfolio_holdings WHERE user_id = ?').all(userId);
    let portfolioValue = 0;
    holdings.forEach(holding => {
      const mockCurrentPrice = parseFloat(holding.purchase_price) * (1 + Math.random() * 0.1);
      portfolioValue += holding.shares * mockCurrentPrice;
    });

    // Get learning progress
    const learningStats = db.prepare(`
      SELECT 
        COUNT(*) as total_lessons,
        SUM(CASE WHEN status = 'complete' THEN 1 ELSE 0 END) as completed_lessons
      FROM learning_progress
      WHERE user_id = ?
    `).get(userId);

    res.json({
      portfolioValue: parseFloat(portfolioValue.toFixed(2)),
      paperBalance: user.paper_balance,
      learningProgress: {
        completed: learningStats.completed_lessons || 0,
        total: learningStats.total_lessons || 24
      },
      investmentStreak: user.investment_streak || 0
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ error: 'Failed to fetch user stats' });
  }
});

// PUT /api/user - Update user profile
router.put('/', (req, res) => {
  try {
    const userId = getUserId(req);
    const { name, email, experience_level, risk_tolerance } = req.body;

    const updates = [];
    const values = [];

    if (name) {
      updates.push('name = ?');
      values.push(name);
    }
    if (email) {
      updates.push('email = ?');
      values.push(email);
    }
    if (experience_level) {
      updates.push('experience_level = ?');
      values.push(experience_level);
    }
    if (risk_tolerance) {
      updates.push('risk_tolerance = ?');
      values.push(risk_tolerance);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(userId);

    const query = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
    db.prepare(query).run(...values);

    res.json({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

module.exports = router;


