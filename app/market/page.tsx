'use client'

import Link from 'next/link'
import { BarChart3, Flame, GraduationCap, LineChart, PieChart, Receipt, Search, Sparkles, TrendingDown, TrendingUp } from 'lucide-react'
import { Sidebar } from '@/components/sidebar'
import { useState } from 'react'

export default function MarketPage() {
  const [searchQuery, setSearchQuery] = useState('')
  
  const stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: '$178.72', change: '+1.39%', positive: true, initial: 'A' },
    { symbol: 'MSFT', name: 'Microsoft', price: '$374.23', change: '-0.33%', positive: false, initial: 'M' },
    { symbol: 'GOOGL', name: 'Alphabet', price: '$139.67', change: '+2.35%', positive: true, initial: 'G' },
    { symbol: 'AMZN', name: 'Amazon', price: '$145.33', change: '+1.3%', positive: true, initial: 'A' },
    { symbol: 'NVDA', name: 'NVIDIA', price: '$495.22', change: '+2.56%', positive: true, initial: 'N' },
    { symbol: 'TSLA', name: 'Tesla', price: '$248.5', change: '-1.63%', positive: false, initial: 'T' },
    { symbol: 'META', name: 'Meta Platforms', price: '$355.2', change: '+1.62%', positive: true, initial: 'M' },
    { symbol: 'JPM', name: 'JPMorgan Chase', price: '$156.89', change: '+0.63%', positive: true, initial: 'J' },
  ]

  const filteredStocks = stocks.filter(stock => 
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-[#0A1520]">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded-2xl p-8 mb-6">
          <h2 className="text-white text-4xl font-bold mb-3 glow-text">Market Explorer</h2>
          <p className="text-white/90 text-base mb-6">Research stocks and discover investment opportunities</p>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for stocks (e.g., AAPL, Microsoft)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white rounded-lg pl-12 pr-4 py-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-[1fr,400px] gap-6">
          {/* Popular Stocks */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-gray-900" />
              <h3 className="text-gray-900 text-xl font-bold">Popular Stocks</h3>
            </div>
            
            <div className="space-y-3">
              {filteredStocks.map((stock) => (
                <Link 
                  key={stock.symbol} 
                  href={`/market/${stock.symbol}`}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {stock.initial}
                    </div>
                    <div className="text-left">
                      <p className="text-gray-900 font-bold text-base">{stock.symbol}</p>
                      <p className="text-gray-500 text-sm">{stock.name}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-8">
                    <p className="text-gray-900 font-bold text-lg">{stock.price}</p>
                    <div className={`px-3 py-1.5 rounded-lg flex items-center gap-1 min-w-[80px] justify-center ${
                      stock.positive ? 'bg-teal-50' : 'bg-red-50'
                    }`}>
                      {stock.positive ? (
                        <TrendingUp className="w-3.5 h-3.5 text-teal-500" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${
                        stock.positive ? 'text-teal-600' : 'text-red-600'
                      }`}>
                        {stock.change}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Stock Analysis */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <h3 className="text-gray-900 text-xl font-bold">Stock Analysis</h3>
            </div>
            
            <div className="flex flex-col items-center justify-center h-[400px] text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <BarChart3 className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-600 text-sm max-w-[280px]">
                Click on any stock to get AI-powered analysis and insights
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
