const fetch = require('node-fetch');

const ALPHA_VANTAGE_API_KEY =
  process.env.ALPHA_VANTAGE_API_KEY ||
  process.env.STOCK_API_KEY ||
  process.env.ALPHAVANTAGE_API_KEY;
const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';

// Company name mapping
const COMPANY_NAMES = {
  AAPL: 'Apple Inc.',
  MSFT: 'Microsoft',
  GOOGL: 'Alphabet',
  AMZN: 'Amazon',
  NVDA: 'NVIDIA',
  TSLA: 'Tesla',
  META: 'Meta Platforms',
  JPM: 'JPMorgan Chase'
};

/**
 * Get current stock quote
 */
async function getCurrentQuote(symbol) {
  try {
    const data = await alphaVantageRequest({
      function: 'GLOBAL_QUOTE',
      symbol
    });

    const quote = data['Global Quote'];
    if (!quote) {
      throw new Error(`No quote data returned for ${symbol}`);
    }

    const currentPrice = parseFloat(quote['05. price']) || 0;
    const previousClose = parseFloat(quote['08. previous close']) || 0;
    const change = parseFloat(quote['09. change']) || currentPrice - previousClose;
    const changePercentRaw = quote['10. change percent'] || '0%';
    const changePercent = parseFloat(changePercentRaw.replace('%', '')) || 0;

    return {
      symbol,
      currentPrice,
      previousClose,
      change,
      changePercent,
      marketCap: 0, // Alpha Vantage global quote does not include market cap
      volume: parseInt(quote['06. volume'], 10) || 0,
      high: parseFloat(quote['03. high']) || 0,
      low: parseFloat(quote['04. low']) || 0,
      open: parseFloat(quote['02. open']) || 0
    };
  } catch (error) {
    console.error(`Error fetching quote for ${symbol}:`, error.message);
    throw error;
  }
}

/**
 * Get historical prices
 */
async function getHistoricalPrices(symbol, period = '45d') {
  try {
    const data = await alphaVantageRequest({
      function: 'TIME_SERIES_DAILY_ADJUSTED',
      symbol,
      outputsize: 'compact'
    });

    const timeSeries = data['Time Series (Daily)'];
    if (!timeSeries) {
      throw new Error(`No historical data returned for ${symbol}`);
    }

    const dates = Object.keys(timeSeries).sort(); // ascending
    const recentDates = dates.slice(-45);

    return recentDates.map(date => {
      const entry = timeSeries[date];
      return {
        date,
        price: parseFloat(entry['4. close'] || entry['5. adjusted close'] || 0),
        open: parseFloat(entry['1. open'] || 0),
        high: parseFloat(entry['2. high'] || 0),
        low: parseFloat(entry['3. low'] || 0),
        volume: parseInt(entry['6. volume'] || entry['5. volume'] || 0, 10)
      };
    });
  } catch (error) {
    console.error(`Error fetching historical data for ${symbol}:`, error.message);
    return [];
  }
}

/**
 * Get stock summary/profile
 */
async function getStockSummary(symbol) {
  try {
    const data = await alphaVantageRequest({
      function: 'OVERVIEW',
      symbol
    });

    if (!data || Object.keys(data).length === 0) {
      throw new Error(`No overview data returned for ${symbol}`);
    }

    return {
      description: data.Description || '',
      sector: data.Sector || '',
      industry: data.Industry || '',
      employees: parseInt(data.FullTimeEmployees || '0', 10) || 0,
      recommendation: data.AnalystTargetPrice ? 'BUY' : 'HOLD',
      targetPrice: parseFloat(data.AnalystTargetPrice || '0') || 0,
      marketCap: parseFloat(data.MarketCapitalization || '0') || 0
    };
  } catch (error) {
    console.error(`Error fetching summary for ${symbol}:`, error.message);
    return {
      description: '',
      sector: '',
      industry: '',
      employees: 0,
      recommendation: 'HOLD',
      targetPrice: 0,
      marketCap: 0
    };
  }
}

/**
 * Get multiple stock quotes for market page
 */
async function getMultipleQuotes(symbols) {
  try {
    const quotes = await Promise.all(
      symbols.map(async symbol => {
        try {
          const quote = await getCurrentQuote(symbol);
          return quote;
        } catch (error) {
          console.warn(`Skipping ${symbol}: ${error.message}`);
          return null;
        }
      })
    );

    return quotes
      .filter(Boolean)
      .map(quote => {
        const changePercent = quote.changePercent || 0;
        return {
          symbol: quote.symbol,
          name: COMPANY_NAMES[quote.symbol] || quote.symbol,
          price: parseFloat(quote.currentPrice.toFixed(2)),
          change: parseFloat(changePercent.toFixed(2)),
          positive: quote.change >= 0,
          initial: quote.symbol.charAt(0)
        };
      });
  } catch (error) {
    console.error('Error fetching multiple quotes:', error.message);
    throw error;
  }
}

/**
 * Calculate risk level based on volatility
 */
function calculateRiskLevel(changePercent, volatility) {
  const absChange = Math.abs(changePercent);
  if (absChange < 1) return 'LOW RISK';
  if (absChange < 3) return 'MEDIUM RISK';
  return 'HIGH RISK';
}

/**
 * Generate recommendation based on price movement
 */
function generateRecommendation(changePercent, targetPrice, currentPrice) {
  if (targetPrice && currentPrice) {
    const upside = ((targetPrice - currentPrice) / currentPrice) * 100;
    if (upside > 10) return 'BUY';
    if (upside < -10) return 'SELL';
    return 'HOLD';
  }
  
  if (changePercent > 2) return 'BUY';
  if (changePercent < -2) return 'SELL';
  return 'HOLD';
}

module.exports = {
  getCurrentQuote,
  getHistoricalPrices,
  getStockSummary,
  getMultipleQuotes,
  calculateRiskLevel,
  generateRecommendation,
  COMPANY_NAMES
};

async function alphaVantageRequest(params) {
  if (!ALPHA_VANTAGE_API_KEY) {
    throw new Error('Alpha Vantage API key is not configured');
  }

  const searchParams = new URLSearchParams({
    ...params,
    apikey: ALPHA_VANTAGE_API_KEY
  });

  const url = `${ALPHA_VANTAGE_BASE_URL}?${searchParams.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Alpha Vantage request failed with status ${response.status}`);
  }

  const data = await response.json();

  if (data['Error Message']) {
    throw new Error(data['Error Message']);
  }

  if (data['Note']) {
    throw new Error(`Alpha Vantage API limit reached: ${data['Note']}`);
  }

  return data;
}


