const express = require('express');
const router = express.Router();
const stockService = require('../services/stockService');

// Popular stocks to display
const POPULAR_STOCKS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'TSLA', 'META', 'JPM'];

// GET /api/market/stocks - Get list of popular stocks with real-time data
router.get('/stocks', async (req, res) => {
  try {
    // Fetch real-time data for all popular stocks
    const stocks = await stockService.getMultipleQuotes(POPULAR_STOCKS);
    
    // Format data to match frontend structure
    const formattedStocks = stocks.map(stock => ({
      symbol: stock.symbol,
      name: stock.name,
      price: `$${stock.price.toFixed(2)}`,
      change: `${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}%`,
      positive: stock.positive,
      initial: stock.initial
    }));

    res.json(formattedStocks);
  } catch (error) {
    console.error('Error fetching market stocks:', error);
    
    // Fallback to mock data if API fails
    const fallbackStocks = [
      { symbol: 'AAPL', name: 'Apple Inc.', price: '$178.72', change: '+1.39%', positive: true, initial: 'A' },
      { symbol: 'MSFT', name: 'Microsoft', price: '$374.23', change: '-0.33%', positive: false, initial: 'M' },
      { symbol: 'GOOGL', name: 'Alphabet', price: '$139.67', change: '+2.35%', positive: true, initial: 'G' },
      { symbol: 'AMZN', name: 'Amazon', price: '$145.33', change: '+1.3%', positive: true, initial: 'A' },
      { symbol: 'NVDA', name: 'NVIDIA', price: '$495.22', change: '+2.56%', positive: true, initial: 'N' },
      { symbol: 'TSLA', name: 'Tesla', price: '$248.5', change: '-1.63%', positive: false, initial: 'T' },
      { symbol: 'META', name: 'Meta Platforms', price: '$355.2', change: '+1.62%', positive: true, initial: 'M' },
      { symbol: 'JPM', name: 'JPMorgan Chase', price: '$156.89', change: '+0.63%', positive: true, initial: 'J' },
    ];
    
    res.json(fallbackStocks);
  }
});

module.exports = router;

