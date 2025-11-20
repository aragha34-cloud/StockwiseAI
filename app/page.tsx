'use client'

import { ArrowRight, BookOpen, Clock, File, Flame, GraduationCap, LineChart, PieChart, Receipt, Sparkles, TrendingUp, Wallet, Zap } from 'lucide-react'
import Link from 'next/link'
import { Sidebar } from '@/components/sidebar'
import { useUser } from '@/lib/user-context'

export default function Dashboard() {
  const { user } = useUser()

  return (
    <div className="flex min-h-screen bg-[#0A1520]">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-8 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-white/90 text-sm font-bold uppercase tracking-wide">System Online</span>
          </div>
          <h2 className="text-white text-4xl font-bold mb-2 glow-text">Welcome, {user?.name || 'User'}</h2>
          <p className="text-white/90 text-base">Neural investment interface active. Building wealth through quantum analysis.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {/* Portfolio Value */}
          <div className="bg-[#0d1d2e] border border-[#1a2b3d] rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-teal-400 text-xs font-bold uppercase tracking-wide">Portfolio Value</span>
              <div className="w-9 h-9 rounded-lg bg-teal-500/20 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-teal-400" />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-white text-3xl font-bold">$1620.00</span>
              <span className="text-teal-400 text-sm font-medium mb-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +8.2%
              </span>
            </div>
          </div>

          {/* Paper Balance */}
          <div className="bg-[#0d1d2e] border border-[#1a2b3d] rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-teal-400 text-xs font-bold uppercase tracking-wide">Paper Balance</span>
              <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Receipt className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div className="mb-1">
              <span className="text-white text-3xl font-bold">$10000.00</span>
            </div>
            <span className="text-gray-500 text-sm">Practice money</span>
          </div>

          {/* Learning Progress */}
          <div className="bg-[#0d1d2e] border border-[#1a2b3d] rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-teal-400 text-xs font-bold uppercase tracking-wide">Learning Progress</span>
              <div className="w-9 h-9 rounded-lg bg-pink-500/20 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-pink-400" />
              </div>
            </div>
            <div className="mb-1">
              <span className="text-white text-3xl font-bold">2/24</span>
            </div>
            <span className="text-gray-500 text-sm">8% complete</span>
          </div>

          {/* Investment Streak */}
          <div className="bg-[#0d1d2e] border border-[#1a2b3d] rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-teal-400 text-xs font-bold uppercase tracking-wide">Investment Streak</span>
              <div className="w-9 h-9 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-orange-400" />
              </div>
            </div>
            <div className="mb-1">
              <span className="text-white text-3xl font-bold">2 days</span>
            </div>
            <span className="text-gray-500 text-sm">Keep it up!</span>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Continue Learning */}
          <Link href="/learn" className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 flex items-center justify-between hover:from-purple-600 hover:to-pink-600 transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-white text-xl font-bold mb-0.5">Continue Learning</h3>
                <p className="text-white/80 text-sm">Pick up where you left off</p>
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Explore Stocks */}
          <Link href="/market" className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl p-6 flex items-center justify-between hover:from-cyan-600 hover:to-blue-600 transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-white text-xl font-bold mb-0.5">Explore Stocks</h3>
                <p className="text-white/80 text-sm">Research investment opportunities</p>
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Recent Investments */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <File className="w-4 h-4 text-teal-400" />
              <h3 className="text-white text-xl font-bold">Recent Investments</h3>
            </div>
            <div className="bg-[#0d1d2e] border border-[#1a2b3d] rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-lg font-bold mb-1">AAPL</p>
                  <p className="text-gray-400 text-sm">10 shares</p>
                </div>
                <div className="text-right">
                  <p className="text-teal-400 text-lg font-bold">$1500.00</p>
                  <p className="text-gray-400 text-sm">@$150.00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Journey */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-4 h-4 text-pink-400" />
              <h3 className="text-white text-xl font-bold">Learning Journey</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-[#0d1d2e] border border-[#1a2b3d] rounded-xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal-400" />
                  <div>
                    <p className="text-white font-medium mb-0.5">What is the Stock Market?</p>
                    <p className="text-gray-400 text-sm">Basics</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-teal-500/20 border border-teal-500/30 rounded-md flex items-center gap-1">
                  <svg className="w-3 h-3 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-teal-400 text-xs font-medium">Complete</span>
                </div>
              </div>
              <div className="bg-[#0d1d2e] border border-[#1a2b3d] rounded-xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal-400" />
                  <div>
                    <p className="text-white font-medium mb-0.5">Growth Investing</p>
                    <p className="text-gray-400 text-sm">Strategy</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-teal-500/20 border border-teal-500/30 rounded-md flex items-center gap-1">
                  <svg className="w-3 h-3 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-teal-400 text-xs font-medium">Complete</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
