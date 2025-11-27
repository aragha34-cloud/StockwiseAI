# Setup Guide - Real Stock Data Integration

## Quick Start

1. **Install Dependencies:**
```bash
cd stock-wise-backend
npm install
```

2. **Create .env file:**
Create a `.env` file in the `stock-wise-backend` directory with:
```
PORT=3001
NODE_ENV=development
ALPHA_VANTAGE_API_KEY=AIzaSyBI15b7AWiMxrgCJ07pM4CWsmyjorC4bNU
```

3. **Initialize Database:**
```bash
npm run init-db
```

4. **Start the Backend Server:**
```bash
npm run dev
```

The backend will run on **http://localhost:3001**

## Real Stock Data

The backend now uses **Alpha Vantage API** to fetch real-time stock data including:
- Current stock prices (GLOBAL_QUOTE)
- Price changes and percentages
- Historical price data (TIME_SERIES_DAILY_ADJUSTED)
- Company information (OVERVIEW)
- Market statistics

### API Endpoints with Real Data:

- `GET /api/stock/:symbol` - Get detailed stock information with real prices
- `GET /api/market/stocks` - Get list of popular stocks with current prices

### Example:

Visit `http://localhost:3001/api/stock/AAPL` to see real Apple stock data.

Visit `http://localhost:3001/api/market/stocks` to see all popular stocks with current prices.

## Note

- Alpha Vantage free tier allows 5 API requests per minute (20 per minute for premium)
- All requests require a valid API key via `ALPHA_VANTAGE_API_KEY`

## Troubleshooting

If you get errors fetching stock data:
1. Check your internet connection
2. Verify the stock symbol is valid (e.g., AAPL, MSFT, GOOGL)
3. Alpha Vantage may return a `Note` message when rate limits are exceeded — wait at least 60 seconds before retrying


