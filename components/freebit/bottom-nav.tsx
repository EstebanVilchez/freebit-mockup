'use client'

import { Map, CreditCard, ShoppingBag, User } from 'lucide-react'
import { motion } from 'framer-motion'

type Tab = 'map' | 'pay' | 'shop' | 'profile'

interface BottomNavProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

const tabs = [
  { id: 'map' as Tab, label: 'Mapa', icon: Map },
  { id: 'pay' as Tab, label: 'Pagar', icon: CreditCard },
  { id: 'shop' as Tab, label: 'Tienda', icon: ShoppingBag },
  { id: 'profile' as Tab, label: 'Perfil', icon: User }
]

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a3e] border-t-4 border-[#FFD700]">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center justify-center w-full h-full"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#FFD700]"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <motion.div
                animate={{ 
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -2 : 0
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <Icon 
                  className={`w-6 h-6 ${
                    isActive ? 'text-[#FFD700]' : 'text-[#9090b0]'
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </motion.div>
              <span 
                className={`text-[10px] mt-1 font-[var(--font-press-start)] ${
                  isActive ? 'text-[#FFD700]' : 'text-[#9090b0]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
      {/* Safe area padding for mobile devices */}
      <div className="h-safe-area-inset-bottom bg-[#1a1a3e]" />
    </nav>
  )
}
