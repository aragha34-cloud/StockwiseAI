'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  level: string
}

interface UserContextType {
  user: User | null
  setUser: (user: User) => void
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('stockwise_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    } else {
      // Default user
      const defaultUser = {
        id: '1',
        name: 'Nidhi Konanur',
        email: 'nidhikonantbsg@gmail.com',
        level: 'BEGINNER INVESTOR'
      }
      setUser(defaultUser)
      localStorage.setItem('stockwise_user', JSON.stringify(defaultUser))
    }
  }, [])

  const updateUser = (newUser: User) => {
    setUser(newUser)
    localStorage.setItem('stockwise_user', JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('stockwise_user')
  }

  return (
    <UserContext.Provider value={{ user, setUser: updateUser, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
