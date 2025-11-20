'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Flame, GraduationCap, LineChart, Plus, PieChart, Receipt, Sparkles, TrendingUp, TrendingDown, Wallet, X } from 'lucide-react'
import { Sidebar } from '@/components/sidebar'
import { useUser } from '@/lib/user-context'

export default function PortfolioPage() {
  const [showModal, setShowModal] = useState(false)
  const { user } = useUser()

  return (
    <div className="flex min-h-screen bg-[#0A1520]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 relative">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-white text-3xl font-bold mb-1 glow-text">Portfolio</h2>
            <p className="text-gray-400">Track and manage your investments</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Investment
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3 text-gray-700">
              <Receipt className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wide">Total Value</span>
            </div>
            <div className="mb-1">
              <span className="text-gray-900 text-3xl font-bold">$1500.00</span>
            </div>
            <span className="text-teal-600 text-sm font-medium">+8.2% all time</span>
          </div>

          <div className="bg-white rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3 text-gray-700">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wide">Holdings</span>
            </div>
            <div className="mb-1">
              <span className="text-gray-900 text-3xl font-bold">1</span>
            </div>
            <span className="text-gray-600 text-sm">Different stocks</span>
          </div>

          <div className="bg-white rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3 text-gray-700">
              <Wallet className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wide">Paper Balance</span>
            </div>
            <div className="mb-1">
              <span className="text-gray-900 text-3xl font-bold">$10000.00</span>
            </div>
            <span className="text-gray-600 text-sm">Available to invest</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Portfolio Allocation */}
          <div className="bg-white rounded-xl p-6">
            <h3 className="text-gray-900 text-lg font-bold mb-6">Portfolio Allocation</h3>
            <div className="flex items-center justify-center py-8">
              <div className="relative w-64 h-64">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="128" cy="128" r="100" fill="none" stroke="#10b981" strokeWidth="56" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-teal-600 text-sm font-medium">AAPL 100%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Holdings */}
          <div className="bg-white rounded-xl p-6">
            <h3 className="text-gray-900 text-lg font-bold mb-6">Current Holdings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal-500" />
                  <div>
                    <p className="text-gray-900 font-bold">AAPL</p>
                    <p className="text-gray-600 text-sm">Apple Inc.</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-900 font-bold">$1500.00</p>
                  <p className="text-gray-600 text-sm">10 shares</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Receipt className="w-5 h-5 text-gray-900" />
            <h3 className="text-gray-900 text-lg font-bold">Transaction History</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-teal-600" />
                <div>
                  <p className="text-gray-900 font-bold">AAPL</p>
                  <p className="text-gray-600 text-sm">10 shares @ $150.00</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-900 font-bold">$1500.00</p>
                <p className="text-gray-600 text-sm">Oct 27, 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Investment Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-gray-900 text-xl font-bold mb-6">Add New Investment</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Stock Symbol
                    </label>
                    <input
                      type="text"
                      defaultValue="AAPL"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Apple Inc."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Number of Shares
                    </label>
                    <input
                      type="number"
                      defaultValue="10"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Price per Share
                    </label>
                    <input
                      type="number"
                      defaultValue="150.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Purchase Date
                  </label>
                  <input
                    type="date"
                    defaultValue="2025-11-06"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 rounded-lg transition-colors">
                  Add to Portfolio
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
