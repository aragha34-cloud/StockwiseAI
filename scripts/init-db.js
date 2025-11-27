const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Initialize default user
function initDefaultUser() {
  const existingUser = db.prepare('SELECT id FROM users WHERE id = ?').get('1');
  
  if (!existingUser) {
    db.prepare(`
      INSERT INTO users (id, name, email, level, experience_level, risk_tolerance, paper_balance, investment_streak)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      '1',
      'Nidhi Konanur',
      'nidhikonantbsg@gmail.com',
      'BEGINNER INVESTOR',
      'Beginner',
      'Moderate',
      10000.00,
      2
    );
    console.log('✅ Default user created');
  } else {
    console.log('ℹ️  Default user already exists');
  }
}

// Initialize default portfolio holdings
function initDefaultHoldings() {
  const existingHolding = db.prepare('SELECT id FROM portfolio_holdings WHERE user_id = ?').get('1');
  
  if (!existingHolding) {
    db.prepare(`
      INSERT INTO portfolio_holdings (id, user_id, symbol, company_name, shares, purchase_price, purchase_date)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      uuidv4(),
      '1',
      'AAPL',
      'Apple Inc.',
      10,
      150.00,
      new Date().toISOString().split('T')[0]
    );

    // Add corresponding transaction
    db.prepare(`
      INSERT INTO transactions (id, user_id, symbol, type, shares, price_per_share, total_amount, transaction_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      uuidv4(),
      '1',
      'AAPL',
      'BUY',
      10,
      150.00,
      1500.00,
      new Date().toISOString().split('T')[0]
    );

    // Update user balance
    db.prepare('UPDATE users SET paper_balance = paper_balance - ? WHERE id = ?').run(1500.00, '1');

    console.log('✅ Default portfolio holdings created');
  } else {
    console.log('ℹ️  Default portfolio holdings already exist');
  }
}

// Initialize default learning progress
function initDefaultLearningProgress() {
  const completedLessons = [
    { title: 'What is the Stock Market?', category: 'Basics' },
    { title: 'Growth Investing', category: 'Strategy' }
  ];

  completedLessons.forEach(lesson => {
    const existing = db.prepare(`
      SELECT id FROM learning_progress 
      WHERE user_id = ? AND lesson_title = ?
    `).get('1', lesson.title);

    if (!existing) {
      db.prepare(`
        INSERT INTO learning_progress (id, user_id, lesson_title, category, status, completed_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        uuidv4(),
        '1',
        lesson.title,
        lesson.category,
        'complete',
        new Date().toISOString()
      );
    }
  });

  console.log('✅ Default learning progress initialized');
}

// Run initialization
console.log('🚀 Initializing database with default data...');
initDefaultUser();
initDefaultHoldings();
initDefaultLearningProgress();
console.log('✅ Database initialization complete!');

process.exit(0);

