'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Sidebar } from '@/components/sidebar'
import { AlertCircle, TrendingUp, X } from 'lucide-react'
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface StockData {
  symbol: string
  currentPrice: number
  riskLevel: string
  recommendation: string
  historicalPrices: Array<{ date: string; price: number }>
  predictedPrices: Array<{ date: string; price: number }>
  fundamentals: string
  riskAssessment: string
  investmentRecommendation: string
  keyFactors: string[]
}

export default function StockDetailPage() {
  const params = useParams()
  const router = useRouter()
  const symbol = params.symbol as string
  const [stockData, setStockData] = useState<StockData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStockData() {
      try {
        const response = await fetch(`/api/stock/${symbol}`)
        const data = await response.json()
        setStockData(data)
      } catch (error) {
        console.error('[v0] Error fetching stock data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStockData()
  }, [symbol])

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#0A1520]">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-white text-xl">Loading stock data...</div>
        </main>
      </div>
    )
  }

  if (!stockData) {
    return (
      <div className="flex min-h-screen bg-[#0A1520]">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-white text-xl">Stock data not found</div>
        </main>
      </div>
    )
  }

  // Combine historical and predicted data for the chart
  const chartData = [
    ...stockData.historicalPrices.map(d => ({ date: d.date, historical: d.price, predicted: null })),
    ...stockData.predictedPrices.map(d => ({ date: d.date, historical: null, predicted: d.price }))
  ]

  return (
    <div className="flex min-h-screen bg-[#0A1520]">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-auto">
        {/* Header with close button */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-white text-3xl font-bold glow-text">{symbol} - Detailed Analysis</h1>
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-lg border border-gray-600 hover:border-gray-400 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stock Header */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 mb-6">
          <h2 className="text-gray-900 text-2xl font-bold mb-4">{getCompanyName(symbol)}</h2>
          <div className="flex items-center gap-6">
            <div>
              <p className="text-gray-600 text-sm mb-1">Current Price</p>
              <p className="text-gray-900 text-5xl font-bold">${stockData.currentPrice}</p>
            </div>
            <div className="px-4 py-2 bg-yellow-100 border-2 border-yellow-500 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-700" />
              <span className="text-yellow-700 font-bold">{stockData.riskLevel}</span>
            </div>
            <button className="px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg flex items-center gap-2 text-white font-bold transition-colors">
              <TrendingUp className="w-5 h-5" />
              {stockData.recommendation}
            </button>
          </div>
        </div>

        {/* Price History & Prediction Chart */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <h3 className="text-gray-900 text-xl font-bold mb-6">Price History & Prediction</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return `${date.getMonth() + 1}/${date.getDate()}`
                }}
              />
              <YAxis 
                stroke="#6b7280"
                tick={{ fontSize: 12 }}
                domain={['dataMin - 10', 'dataMax + 10']}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                labelFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString()
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="historical" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Historical Price"
                dot={false}
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#a855f7" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Predicted Price"
                dot={false}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Company Fundamentals */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <h3 className="text-gray-900 text-xl font-bold mb-4">Company Fundamentals</h3>
          <p className="text-gray-700 leading-relaxed">{stockData.fundamentals}</p>
        </div>

        {/* Risk Assessment */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-gray-900" />
            <h3 className="text-gray-900 text-xl font-bold">Risk Assessment</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">{stockData.riskAssessment}</p>
        </div>

        {/* Investment Recommendation */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-gray-900" />
            <h3 className="text-gray-900 text-xl font-bold">Investment Recommendation</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">{stockData.investmentRecommendation}</p>
        </div>

        {/* Key Factors */}
        <div className="bg-white rounded-2xl p-6">
          <h3 className="text-gray-900 text-xl font-bold mb-4">Key Factors</h3>
          <ul className="space-y-2">
            {stockData.keyFactors.map((factor, index) => (
              <li key={index} className="flex items-center gap-3 text-gray-700">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                {factor}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
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
