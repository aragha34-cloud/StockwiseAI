'use client'

import Link from 'next/link'
import { BarChart3, BookOpen, Flame, GraduationCap, LineChart, PieChart, Receipt, Sparkles, Target, TrendingUp } from 'lucide-react'
import { Sidebar } from '@/components/sidebar'
import { useUser } from '@/lib/user-context'

export default function LearnPage() {
  const { user } = useUser()
  
  const lessons = [
    {
      title: 'What is the Stock Market?',
      description: 'Understand the fundamentals of how stock markets work.',
      category: 'Basics',
      duration: '5 min',
      icon: <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center"><BookOpen className="w-6 h-6 text-white" /></div>,
      status: 'complete',
      bgColor: 'bg-gradient-to-br from-teal-100 to-teal-50'
    },
    {
      title: 'Stocks vs Bonds',
      description: 'Learn the key differences between stocks and bonds as investment vehicles.',
      category: 'Basics',
      duration: '4 min',
      icon: <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center"><Target className="w-6 h-6 text-white" /></div>,
      status: 'initialize',
      bgColor: 'bg-[#1a2838]'
    },
    {
      title: 'Risk and Return',
      description: 'Explore the relationship between investment risk and potential returns.',
      category: 'Basics',
      duration: '6 min',
      icon: <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center"><TrendingUp className="w-6 h-6 text-white" /></div>,
      status: 'initialize',
      bgColor: 'bg-[#1a2838]'
    },
    {
      title: 'Diversification Basics',
      description: 'Why putting all eggs in one basket is risky, and how to spread investments.',
      category: 'Basics',
      duration: '5 min',
      icon: <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center"><BarChart3 className="w-6 h-6 text-white" /></div>,
      status: 'initialize',
      bgColor: 'bg-[#1a2838]'
    },
    {
      title: 'How to Buy Your First Stock',
      description: 'Step-by-step guide to making your first stock purchase.',
      category: 'Stocks',
      duration: '7 min',
      icon: <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center"><Target className="w-6 h-6 text-white" /></div>,
      status: 'initialize',
      bgColor: 'bg-[#1a2838]'
    },
    {
      title: 'Reading Stock Quotes',
      description: 'Decode stock tickers, prices, and market data like a pro.',
      category: 'Stocks',
      duration: '5 min',
      icon: <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center"><Target className="w-6 h-6 text-white" /></div>,
      status: 'initialize',
      bgColor: 'bg-[#1a2838]'
    },
  ]

  return (
    <div className="flex min-h-screen bg-[#0A1520]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-2xl p-8 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="w-6 h-6 text-white" />
            <h2 className="text-white text-4xl font-bold glow-text">Neural Learning Hub</h2>
          </div>
          <p className="text-white/90 text-base mb-6">
            Advanced knowledge transfer system. Master investing through quantum education modules.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white font-bold text-sm">Progress Matrix</span>
              <span className="text-white font-bold text-lg">2/20</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2.5 mb-2">
              <div className="bg-white h-2.5 rounded-full" style={{ width: '10%' }}></div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-300" />
              <span className="text-white/90 text-xs font-medium">10% Neural Sync Complete</span>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 mb-6">
          <button className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg text-sm">
            All Lessons
            <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">20</span>
          </button>
          <button className="px-5 py-2.5 bg-[#1a2838] text-gray-300 hover:text-white font-medium rounded-lg text-sm transition-colors">
            Basics
            <span className="ml-2 px-2 py-0.5 bg-white/10 rounded-full text-xs">4</span>
          </button>
          <button className="px-5 py-2.5 bg-[#1a2838] text-gray-300 hover:text-white font-medium rounded-lg text-sm transition-colors">
            Stocks
            <span className="ml-2 px-2 py-0.5 bg-white/10 rounded-full text-xs">4</span>
          </button>
          <button className="px-5 py-2.5 bg-[#1a2838] text-gray-300 hover:text-white font-medium rounded-lg text-sm transition-colors">
            Analysis
            <span className="ml-2 px-2 py-0.5 bg-white/10 rounded-full text-xs">4</span>
          </button>
          <button className="px-5 py-2.5 bg-[#1a2838] text-gray-300 hover:text-white font-medium rounded-lg text-sm transition-colors">
            Strategy
            <span className="ml-2 px-2 py-0.5 bg-white/10 rounded-full text-xs">4</span>
          </button>
          <button className="px-5 py-2.5 bg-[#1a2838] text-gray-300 hover:text-white font-medium rounded-lg text-sm transition-colors">
            Advanced
            <span className="ml-2 px-2 py-0.5 bg-white/10 rounded-full text-xs">4</span>
          </button>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-3 gap-4">
          {lessons.map((lesson, index) => (
            <div key={index} className={`${lesson.bgColor} rounded-xl p-5 border ${lesson.status === 'complete' ? 'border-teal-200' : 'border-[#1a2b3d]'}`}>
              <div className="flex items-start justify-between mb-4">
                {lesson.icon}
                <span className="px-2.5 py-1 bg-gray-900/30 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                  {lesson.duration}
                </span>
              </div>
              
              <h3 className={`${lesson.status === 'complete' ? 'text-gray-900' : 'text-white'} text-lg font-bold mb-2`}>
                {lesson.title}
              </h3>
              <p className={`${lesson.status === 'complete' ? 'text-gray-600' : 'text-gray-400'} text-sm mb-4`}>
                {lesson.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 ${lesson.status === 'complete' ? 'bg-gray-900 text-white' : 'bg-gray-800 text-gray-300'} text-xs font-medium rounded-md`}>
                  {lesson.category}
                </span>
                {lesson.status === 'complete' ? (
                  <div className="px-3 py-1.5 bg-teal-500 text-white text-xs font-medium rounded-md flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Complete
                  </div>
                ) : (
                  <button className="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs font-medium rounded-md transition-all">
                    Initialize
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
