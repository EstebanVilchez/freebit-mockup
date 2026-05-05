'use client'

import { motion } from 'framer-motion'
import { Flame, Coins } from 'lucide-react'
import type { User } from '@/lib/mock-data'

interface HeaderProps {
  user: User
}

export function Header({ user }: HeaderProps) {
  const xpProgress = (user.xp / user.xpToNextLevel) * 100

  return (
    <header className="sticky top-0 z-40 bg-[#0f0f23] border-b-4 border-[#3a3a6e] px-4 py-3">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* Logo and Level */}
        <div className="flex items-center gap-3">
          <motion.div
            className="flex items-center justify-center w-10 h-10 bg-[#FFD700] pixel-border-gold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-[#0f0f23] font-[var(--font-press-start)] text-xs font-bold">
              {user.level}
            </span>
          </motion.div>
          <div>
            <p className="text-[#FFD700] font-[var(--font-press-start)] text-[10px]">
              NIVEL {user.level}
            </p>
            {/* XP Progress Bar */}
            <div className="w-20 h-2 bg-[#2a2a5e] border-2 border-[#3a3a6e] mt-1">
              <motion.div
                className="h-full bg-[#4ECDC4]"
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          {/* Streak */}
          <motion.div 
            className="flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
          >
            <Flame className="w-5 h-5 text-[#FF6B6B]" />
            <span className="text-[#FF6B6B] font-[var(--font-press-start)] text-xs">
              {user.streakDays}
            </span>
          </motion.div>

          {/* Koins */}
          <motion.div 
            className="flex items-center gap-1 bg-[#1a1a3e] px-3 py-1 border-2 border-[#FFD700]"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Coins className="w-5 h-5 text-[#FFD700]" />
            </motion.div>
            <span className="text-[#FFD700] font-[var(--font-press-start)] text-xs">
              {user.koins.toLocaleString('en-US')}
            </span>
          </motion.div>
        </div>
      </div>
    </header>
  )
}
