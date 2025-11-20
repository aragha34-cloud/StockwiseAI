import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { symbol: string } }
) {
  const symbol = params.symbol

  try {
    // In production, you would use yfinance via a Python backend or use a financial API
    // For now, we'll return mock data with realistic structure
    const mockData = {
      symbol: symbol,
      currentPrice: 267.44,
      riskLevel: 'MEDIUM RISK',
      recommendation: 'BUY',
      historicalPrices: generateHistoricalPrices(),
      predictedPrices: generatePredictedPrices(),
      fundamentals: `${getCompanyName(symbol)} is a leading technology company known for its innovative products and services. It has a strong financial position, with significant cash reserves and a history of consistent revenue growth. The company's diverse product lineup contributes to its robust market presence.`,
      riskAssessment: `${getCompanyName(symbol)} operates in the highly competitive technology sector, which can lead to market volatility. However, its strong brand, diverse product portfolio, and substantial cash reserves help mitigate some of these risks.`,
      investmentRecommendation: `Analyst consensus rates ${symbol} as a 'Buy,' with an average 12-month price target of $275.87, indicating potential upside from the current price.`,
      keyFactors: [
        'Product innovation',
        'Market competition',
        'Supply chain dynamics',
        'Regulatory environment',
        'Global economic conditions'
      ]
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error('[v0] Error fetching stock data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stock data' },
      { status: 500 }
    )
  }
}

function getCompanyName(symbol: string): string {
  const companies: Record<string, string> = {
    AAPL: 'Apple Inc.',
    MSFT: 'Microsoft',
    GOOGL: 'Alphabet',
    AMZN: 'Amazon',
    NVDA: 'NVIDIA',
    TSLA: 'Tesla',
    META: 'Meta Platforms',
    JPM: 'JPMorgan Chase'
  }
  return companies[symbol] || symbol
}

function generateHistoricalPrices() {
  const prices = []
  const startDate = new Date('2024-10-18')
  let currentPrice = 240

  for (let i = 0; i < 45; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    currentPrice += (Math.random() - 0.4) * 3
    prices.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(currentPrice.toFixed(2))
    })
  }

  return prices
}

function generatePredictedPrices() {
  const prices = []
  const startDate = new Date('2024-12-02')
  let currentPrice = 285

  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    currentPrice += (Math.random() - 0.5) * 2
    prices.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(currentPrice.toFixed(2))
    })
  }

  return prices
}
