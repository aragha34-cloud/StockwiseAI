'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Flame, GraduationCap, LineChart, PieChart, Receipt, Sparkles, TrendingUp } from 'lucide-react'
import { useUser } from '@/lib/user-context'

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useUser()
  
  const navItems = [
    { href: '/', icon: PieChart, label: 'Dashboard' },
    { href: '/learn', icon: GraduationCap, label: 'Learn' },
    { href: '/portfolio', icon: Receipt, label: 'Portfolio' },
    { href: '/market', icon: TrendingUp, label: 'Market' },
  ]

  return (
    <aside className="w-[213px] border-r border-[#1a2b3d] flex flex-col">
      {/* Logo */}
      <div className="p-6 pb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl flex items-center justify-center">
            <LineChart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">StockWise</h1>
            <p className="text-teal-400 text-xs font-medium glow-text">FUTURE OF INVESTING</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                  isActive
                    ? 'bg-blue-500 text-white glow-border'
                    : 'text-gray-400 hover:text-white hover:bg-[#1a2b3d]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className={isActive ? 'glow-text' : ''}>{item.label}</span>
                {isActive && <Sparkles className="w-4 h-4 ml-auto" />}
              </Link>
            )
          })}
        </div>

        {/* Progress Matrix */}
        <div className="mt-8 border border-teal-500/30 rounded-xl p-4 bg-[#0d1d2e]">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <h3 className="text-teal-400 text-xs font-bold uppercase tracking-wide">Progress Matrix</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Lessons</span>
              <span className="text-white text-lg font-bold">2</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Streak</span>
              <div className="flex items-center gap-1">
                <span className="text-white text-lg font-bold">2</span>
                <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <Link href="/profile" className="p-4 border-t border-[#1a2b3d] hover:bg-[#0d1d2e] transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
            {user?.name.charAt(0) || 'N'}
          </div>
          <div>
            <p className="text-white text-sm font-medium">{user?.name || 'User'}</p>
            <p className="text-teal-400 text-xs font-medium">{user?.level || 'INVESTOR'}</p>
          </div>
        </div>
      </Link>
    </aside>
  )
}
