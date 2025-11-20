'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Briefcase, Flame, GraduationCap, LineChart, LogOut, PieChart, Receipt, Sparkles, Target, TrendingUp, User, Wallet } from 'lucide-react'
import { Sidebar } from '@/components/sidebar'
import { useUser } from '@/lib/user-context'

export default function ProfilePage() {
  const { user, logout } = useUser()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="flex min-h-screen bg-[#0A1520]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl">
          <h2 className="text-white text-3xl font-bold mb-2 glow-text">My Profile</h2>
          <p className="text-gray-400 mb-8">Manage your account and preferences</p>

          {/* Account Information */}
          <div className="bg-white rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-gray-900" />
                <h3 className="text-gray-900 text-lg font-bold">Account Information</h3>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-2">
                  Full Name
                </label>
                <p className="text-gray-900 text-base font-medium">{user?.name || 'User'}</p>
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-2">
                  Email
                </label>
                <p className="text-gray-900 text-base font-medium">{user?.email || 'user@example.com'}</p>
              </div>
            </div>
          </div>

          {/* Investment Profile */}
          <div className="bg-white rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-teal-600" />
                <h3 className="text-gray-900 text-lg font-bold">Investment Profile</h3>
              </div>
              <button className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">
                Edit
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-2">
                  Experience Level
                </label>
                <span className="inline-block px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg">
                  Beginner
                </span>
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-2">
                  Risk Tolerance
                </label>
                <span className="inline-block px-3 py-1.5 bg-purple-100 text-purple-700 text-sm font-medium rounded-lg">
                  Moderate
                </span>
              </div>
            </div>
          </div>

          {/* Your Achievements */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="text-2xl">🏆</div>
              <h3 className="text-gray-900 text-lg font-bold">Your Achievements</h3>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-xl p-5 text-center border border-teal-200">
                <div className="text-3xl mb-2">📚</div>
                <p className="text-gray-900 text-2xl font-bold mb-1">2</p>
                <p className="text-gray-600 text-sm">Lessons</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-5 text-center border border-orange-200">
                <div className="text-3xl mb-2">🔥</div>
                <p className="text-gray-900 text-2xl font-bold mb-1">2</p>
                <p className="text-gray-600 text-sm">Day Streak</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-5 text-center border border-blue-200">
                <div className="text-3xl mb-2">💼</div>
                <p className="text-gray-900 text-2xl font-bold mb-1">$10000</p>
                <p className="text-gray-600 text-sm">Paper Money</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-5 text-center border border-purple-200">
                <div className="text-3xl mb-2">🎯</div>
                <p className="text-gray-900 text-2xl font-bold mb-1">Beginner</p>
                <p className="text-gray-600 text-sm">Level</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
