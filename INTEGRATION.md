# Backend Integration Guide

This guide explains how to connect the existing frontend to this backend without modifying the frontend code.

## Option 1: Update Next.js API Route (Recommended)

Update the existing Next.js API route to proxy requests to the backend:

### Update `app/api/stock/[symbol]/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { symbol: string } }
) {
  const symbol = params.symbol

  try {
    // Proxy request to backend
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001'
    const response = await fetch(`${backendUrl}/api/stock/${symbol}`)
    const data = await response.json()
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('[v0] Error fetching stock data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stock data' },
      { status: 500 }
    )
  }
}
```

## Option 2: Next.js Rewrite (Alternative)

Add rewrites to `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
    ]
  },
}

export default nextConfig
```

This will automatically proxy all `/api/*` requests to the backend.

## Option 3: Environment Variable Proxy

Set up environment variables and update API calls:

1. Create `.env.local` in frontend:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

2. Update frontend API calls (if you decide to modify):
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api'
const response = await fetch(`${API_URL}/stock/${symbol}`)
```

## New Backend Endpoints

The backend provides these additional endpoints that the frontend can use:

### Portfolio Management
- `GET /api/portfolio` - Get portfolio summary
- `GET /api/portfolio/holdings` - Get all holdings
- `POST /api/portfolio/holdings` - Add new investment
- `DELETE /api/portfolio/holdings/:id` - Remove holding
- `GET /api/portfolio/transactions` - Get transaction history

### User Management
- `GET /api/user` - Get user profile
- `GET /api/user/stats` - Get user statistics for dashboard
- `PUT /api/user` - Update user profile

### Learning Progress
- `GET /api/learning/progress` - Get learning progress
- `GET /api/learning/lessons` - Get all lessons with user progress
- `POST /api/learning/lessons` - Mark lesson as complete

### Market Data
- `GET /api/market/stocks` - Get list of popular stocks

## Example Usage

### Fetching Portfolio Data

```typescript
// In your frontend component
const fetchPortfolio = async () => {
  const response = await fetch('/api/portfolio?userId=1')
  const data = await response.json()
  // data contains: totalValue, paperBalance, holdingsCount, holdings
}
```

### Adding an Investment

```typescript
const addInvestment = async () => {
  const response = await fetch('/api/portfolio/holdings?userId=1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      symbol: 'AAPL',
      companyName: 'Apple Inc.',
      shares: 10,
      purchasePrice: 150.00,
      purchaseDate: '2025-01-15'
    })
  })
  const data = await response.json()
}
```

### Updating Learning Progress

```typescript
const completeLesson = async (lessonTitle: string, category: string) => {
  const response = await fetch('/api/learning/lessons?userId=1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      lessonTitle,
      category,
      status: 'complete'
    })
  })
}
```

## Running Both Frontend and Backend

1. **Terminal 1** - Start the backend:
```bash
cd stock-wise-backend
npm install
npm run init-db
npm run dev
```

2. **Terminal 2** - Start the frontend:
```bash
cd v0-stock-wise-dashboard
npm install
npm run dev
```

The frontend will run on `http://localhost:3000` and the backend on `http://localhost:3001`.

## Data Storage

The backend uses a lightweight JSON data store at `stock-wise-backend/data/stockwise.json`.

Default user ID is `1` with:
- Name: Nidhi Konanur
- Email: nidhikonantbsg@gmail.com
- Paper Balance: $10,000
- Initial holdings: 10 shares of AAPL

## Notes

- The backend now uses Alpha Vantage for live market data. Set `ALPHA_VANTAGE_API_KEY` in `stock-wise-backend/.env`.
- User ID is passed via query parameter `?userId=1` or header `user-id: 1`
- For production, implement JWT authentication
- CORS is enabled to allow frontend connections


