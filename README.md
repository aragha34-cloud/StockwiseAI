<<<<<<< HEAD
# StockWise Dashboard

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/aragha34-6294s-projects/v0-stock-wise-dashboard)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/lrknSB6xSUl)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/aragha34-6294s-projects/v0-stock-wise-dashboard](https://vercel.com/aragha34-6294s-projects/v0-stock-wise-dashboard)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/lrknSB6xSUl](https://v0.app/chat/lrknSB6xSUl)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
=======
# Stock Wise Backend API

Backend API service for the Stock Wise Dashboard application.

## Features

- **Stock Data API**: Get detailed stock information, historical prices, and predictions
- **Market API**: Get list of popular stocks with real-time data
- **Portfolio Management**: CRUD operations for user investments
- **User Management**: User profiles and statistics
- **Learning Progress**: Track user's learning journey and lesson completion
- **JSON Storage**: Simple persisted data without external DB

## Tech Stack

- Node.js & Express.js
- File-based JSON storage (no external DB required)
- RESTful API architecture

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with your configuration (see `SETUP.md` for example values).

3. Initialize the database with default data:
```bash
npm run init-db
```

4. Start the server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The API will be running on `http://localhost:3001`

## API Endpoints

### Stock Endpoints

- `GET /api/stock/:symbol` - Get detailed stock information

### Market Endpoints

- `GET /api/market/stocks` - Get list of popular stocks

### Portfolio Endpoints

- `GET /api/portfolio` - Get user's portfolio summary
- `GET /api/portfolio/holdings` - Get detailed holdings
- `POST /api/portfolio/holdings` - Add new investment
- `DELETE /api/portfolio/holdings/:id` - Remove holding
- `GET /api/portfolio/transactions` - Get transaction history

### User Endpoints

- `GET /api/user` - Get user profile
- `GET /api/user/stats` - Get user statistics for dashboard
- `PUT /api/user` - Update user profile

### Learning Endpoints

- `GET /api/learning/progress` - Get learning progress
- `GET /api/learning/lessons` - Get all lessons with user progress
- `POST /api/learning/lessons` - Mark lesson as complete

### Health Check

- `GET /health` - Check API health status

## Data Storage

Data is stored in a lightweight JSON file at `data/stockwise.json`. The file contains
collections that mirror traditional database tables:

- `users` - User accounts and profiles
- `portfolio_holdings` - User's stock holdings
- `transactions` - Transaction history
- `learning_progress` - User's learning progress
- `stock_cache` - Cached stock data

## User ID

Currently, the API uses a simple user ID system. In production, you would:
- Implement JWT authentication
- Extract user ID from the JWT token
- Add proper authentication middleware

For now, you can pass the user ID via:
- Query parameter: `?userId=1`
- Header: `user-id: 1`

Default user ID is `1` if not provided.

## Frontend Integration

To connect the frontend to this backend:

1. Update your frontend API calls to point to `http://localhost:3001`
2. Or set up a proxy in your Next.js `next.config.mjs`:

```javascript
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'http://localhost:3001/api/:path*',
    },
  ],
}
```

## Real Stock Data Integration

**✅ The backend now uses the Alpha Vantage API to fetch real-time stock data!**

- All stock prices are fetched in real-time from Alpha Vantage
- Historical data is available for the last 45 days (TIME_SERIES_DAILY_ADJUSTED)
- Market data updates automatically
- Requires a free Alpha Vantage API key (set `ALPHA_VANTAGE_API_KEY` in `.env`)

## Notes

- Real stock data is fetched from Alpha Vantage (free tier requires API key)
- All persistence lives in `data/stockwise.json`
- Default user data is initialized when you run `npm run init-db`
- Stock data updates in real-time with current market prices

## Development

For development, use `nodemon` for auto-reloading:
```bash
npm run dev
```

## License

MIT

>>>>>>> fd232f2 (Initial commit - backend)
