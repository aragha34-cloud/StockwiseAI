const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const stockRoutes = require('./routes/stock');
const portfolioRoutes = require('./routes/portfolio');
const userRoutes = require('./routes/user');
const learningRoutes = require('./routes/learning');
const marketRoutes = require('./routes/market');

app.use('/api/stock', stockRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/user', userRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/market', marketRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Stock Wise Backend API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Stock Wise Backend API running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});


