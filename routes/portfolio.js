const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');

// Helper function to get user ID from request
// In production, this would come from JWT token
function getUserId(req) {
  // For now, defaulting to user ID '1' or from query/header
  return req.query.userId || req.headers['user-id'] || '1';
}

// GET /api/portfolio - Get user's portfolio summary
router.get('/', (req, res) => {
  try {
    const userId = getUserId(req);
    
    // Get user's paper balance
    const user = db.prepare('SELECT paper_balance FROM users WHERE id = ?').get(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get all holdings
    const holdings = db.prepare(`
      SELECT 
        symbol,
        company_name,
        shares,
        purchase_price,
        purchase_date
      FROM portfolio_holdings
      WHERE user_id = ?
    `).all(userId);

    // Calculate total value (using mock current prices)
    // In production, fetch real-time prices
    let totalValue = 0;
    const holdingsWithValue = holdings.map(holding => {
      const mockCurrentPrice = parseFloat((parseFloat(holding.purchase_price) * (1 + Math.random() * 0.1)).toFixed(2));
      const value = holding.shares * mockCurrentPrice;
      totalValue += value;
      return {
        ...holding,
        currentPrice: mockCurrentPrice,
        totalValue: parseFloat(value.toFixed(2))
      };
    });

    res.json({
      totalValue: parseFloat(totalValue.toFixed(2)),
      paperBalance: user.paper_balance,
      holdingsCount: holdings.length,
      holdings: holdingsWithValue
    });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ error: 'Failed to fetch portfolio' });
  }
});

// GET /api/portfolio/holdings - Get detailed holdings
router.get('/holdings', (req, res) => {
  try {
    const userId = getUserId(req);
    
    const holdings = db.prepare(`
      SELECT 
        id,
        symbol,
        company_name,
        shares,
        purchase_price,
        purchase_date
      FROM portfolio_holdings
      WHERE user_id = ?
      ORDER BY purchase_date DESC
    `).all(userId);

    res.json(holdings);
  } catch (error) {
    console.error('Error fetching holdings:', error);
    res.status(500).json({ error: 'Failed to fetch holdings' });
  }
});

// POST /api/portfolio/holdings - Add new investment
router.post('/holdings', (req, res) => {
  try {
    const userId = getUserId(req);
    const { symbol, companyName, shares, purchasePrice, purchaseDate } = req.body;

    // Validate input
    if (!symbol || !companyName || !shares || !purchasePrice || !purchaseDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check user exists
    const user = db.prepare('SELECT paper_balance FROM users WHERE id = ?').get(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const totalAmount = shares * purchasePrice;

    // Check if user has enough balance
    if (user.paper_balance < totalAmount) {
      return res.status(400).json({ error: 'Insufficient paper balance' });
    }

    // Start transaction
    const insertHolding = db.prepare(`
      INSERT INTO portfolio_holdings (id, user_id, symbol, company_name, shares, purchase_price, purchase_date)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const insertTransaction = db.prepare(`
      INSERT INTO transactions (id, user_id, symbol, type, shares, price_per_share, total_amount, transaction_date)
      VALUES (?, ?, ?, 'BUY', ?, ?, ?, ?)
    `);

    const updateBalance = db.prepare('UPDATE users SET paper_balance = paper_balance - ? WHERE id = ?');

    const transaction = db.transaction(() => {
      const holdingId = uuidv4();
      insertHolding.run(holdingId, userId, symbol.toUpperCase(), companyName, shares, purchasePrice, purchaseDate);

      const transactionId = uuidv4();
      insertTransaction.run(transactionId, userId, symbol.toUpperCase(), shares, purchasePrice, totalAmount, purchaseDate);

      updateBalance.run(totalAmount, userId);
    });

    transaction();

    res.status(201).json({ 
      message: 'Investment added successfully',
      holding: {
        id: uuidv4(),
        symbol: symbol.toUpperCase(),
        companyName,
        shares,
        purchasePrice,
        purchaseDate
      }
    });
  } catch (error) {
    console.error('Error adding investment:', error);
    res.status(500).json({ error: 'Failed to add investment' });
  }
});

// DELETE /api/portfolio/holdings/:id - Remove holding
router.delete('/holdings/:id', (req, res) => {
  try {
    const userId = getUserId(req);
    const holdingId = req.params.id;

    const holding = db.prepare('SELECT * FROM portfolio_holdings WHERE id = ? AND user_id = ?').get(holdingId, userId);
    if (!holding) {
      return res.status(404).json({ error: 'Holding not found' });
    }

    // In a real app, this would be a SELL transaction, not a delete
    // For simplicity, we'll just delete the holding
    db.prepare('DELETE FROM portfolio_holdings WHERE id = ? AND user_id = ?').run(holdingId, userId);

    res.json({ message: 'Holding removed successfully' });
  } catch (error) {
    console.error('Error removing holding:', error);
    res.status(500).json({ error: 'Failed to remove holding' });
  }
});

// GET /api/portfolio/transactions - Get transaction history
router.get('/transactions', (req, res) => {
  try {
    const userId = getUserId(req);
    
    const transactions = db.prepare(`
      SELECT 
        id,
        symbol,
        type,
        shares,
        price_per_share,
        total_amount,
        transaction_date,
        created_at
      FROM transactions
      WHERE user_id = ?
      ORDER BY transaction_date DESC, created_at DESC
    `).all(userId);

    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

module.exports = router;


