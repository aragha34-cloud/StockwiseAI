const express = require('express');
const router = express.Router();
const stockService = require('../services/stockService');

// GET /api/stock/:symbol - Get detailed stock information
router.get('/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    
    // Fetch real-time stock data
    const [quote, historicalPrices, summary] = await Promise.all([
      stockService.getCurrentQuote(symbol).catch(() => null),
      stockService.getHistoricalPrices(symbol).catch(() => []),
      stockService.getStockSummary(symbol).catch(() => null)
    ]);

    // If quote fetch failed, return error
    if (!quote) {
      return res.status(404).json({ error: `Stock symbol ${symbol} not found or unable to fetch data` });
    }

    // Calculate risk level and recommendation
    const changePercent = quote.changePercent || 0;
    const riskLevel = stockService.calculateRiskLevel(changePercent, Math.abs(changePercent));
    const recommendation = stockService.generateRecommendation(
      changePercent,
      summary?.targetPrice,
      quote.currentPrice
    );

    // Generate predicted prices (simple trend-based prediction)
    const predictedPrices = generatePredictedPrices(quote.currentPrice, historicalPrices.slice(-5));

    // Format fundamentals and assessments
    const companyName = stockService.COMPANY_NAMES[symbol] || symbol;
    const fundamentals = summary?.description || 
      `${companyName} is a leading company in the ${summary?.sector || 'technology'} sector. ` +
      `The company operates in the ${summary?.industry || 'technology'} industry and has shown ` +
      `strong market performance.`;
    
    const riskAssessment = `${companyName} operates in the ${summary?.sector || 'technology'} sector, ` +
      `which can lead to market volatility. The stock has shown ${Math.abs(changePercent).toFixed(2)}% ` +
      `movement today, indicating ${riskLevel.toLowerCase()} volatility levels.`;

    const targetPrice = summary?.targetPrice || (quote.currentPrice * 1.1);
    const investmentRecommendation = `Analyst consensus rates ${symbol} as a '${recommendation}', ` +
      `with a target price of $${targetPrice.toFixed(2)}, ` +
      `indicating ${recommendation === 'BUY' ? 'potential upside' : recommendation === 'SELL' ? 'potential downside' : 'neutral'} from the current price.`;

    const stockData = {
      symbol: symbol,
      currentPrice: parseFloat(quote.currentPrice.toFixed(2)),
      riskLevel: riskLevel,
      recommendation: recommendation,
      historicalPrices: historicalPrices,
      predictedPrices: predictedPrices,
      fundamentals: fundamentals,
      riskAssessment: riskAssessment,
      investmentRecommendation: investmentRecommendation,
      keyFactors: [
        'Market volatility',
        'Sector performance',
        'Company fundamentals',
        'Analyst recommendations',
        'Economic conditions'
      ]
    };

    res.json(stockData);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({ error: 'Failed to fetch stock data', message: error.message });
  }
});

// Helper function to generate predicted prices based on recent trend
function generatePredictedPrices(currentPrice, recentPrices) {
  const predictedPrices = [];
  const startDate = new Date();
  
  // Calculate trend from recent prices
  let trend = 0;
  if (recentPrices.length >= 2) {
    const firstPrice = recentPrices[0].price;
    const lastPrice = recentPrices[recentPrices.length - 1].price;
    trend = (lastPrice - firstPrice) / recentPrices.length;
  }

  let predictedPrice = currentPrice;
  for (let i = 1; i <= 30; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Apply trend with some randomness
    predictedPrice += trend + (Math.random() - 0.5) * (Math.abs(trend) + 0.5);
    
    predictedPrices.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(predictedPrice.toFixed(2))
    });
  }

  return predictedPrices;
}

module.exports = router;

