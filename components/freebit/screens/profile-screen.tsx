'use client'

import { motion } from 'framer-motion'
import { 
  User, Trophy, Flame, Coins, Target, Calendar, 
  ChevronRight, Lock, Star, Swords, Shield, Zap
} from 'lucide-react'
import type { User as UserType, Achievement, PaymentHistory, Debt } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/mock-data'

interface ProfileScreenProps {
  user: UserType
  achievements: Achievement[]
  paymentHistory: PaymentHistory[]
  debts: Debt[]
}

export function ProfileScreen({ user, achievements, paymentHistory, debts }: ProfileScreenProps) {
  const unlockedAchievements = achievements.filter(a => a.unlocked)
  const lockedAchievements = achievements.filter(a => !a.unlocked)
  const xpProgress = (user.xp / user.xpToNextLevel) * 100
  const totalPaid = paymentHistory.reduce((sum, p) => sum + p.amount, 0)
  const debtsCompleted = debts.filter(d => d.status === 'completed').length

  return (
    <div className="pb-24 px-4">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 text-center"
      >
        {/* Avatar */}
        <motion.div
          className="relative inline-block"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-24 h-24 mx-auto bg-[#FFD700] border-4 border-[#B8860B] flex items-center justify-center"
            style={{ boxShadow: '4px 4px 0 0 #B8860B' }}
          >
            <User className="w-12 h-12 text-[#0f0f23]" />
          </div>
          {/* Level Badge */}
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#4ECDC4] border-3 border-[#2A9D8F] flex items-center justify-center"
            style={{ boxShadow: '2px 2px 0 0 #2A9D8F' }}
          >
            <span className="text-[#0f0f23] font-[var(--font-press-start)] text-sm">
              {user.level}
            </span>
          </div>
        </motion.div>

        <h2 className="text-[#e8e8f0] font-[var(--font-press-start)] text-lg mt-4">
          {user.name}
        </h2>
        <p className="text-[#9090b0] text-sm mt-1">
          Guerrero Financiero
        </p>

        {/* XP Bar */}
        <div className="mt-4 max-w-xs mx-auto">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-[#4ECDC4]">XP</span>
            <span className="text-[#9090b0]">{user.xp} / {user.xpToNextLevel}</span>
          </div>
          <div className="h-4 bg-[#2a2a5e] border-2 border-[#3a3a6e]">
            <motion.div
              className="h-full bg-[#4ECDC4] pixel-progress"
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <p className="text-[#9090b0] text-xs mt-1">
            {user.xpToNextLevel - user.xp} XP para nivel {user.level + 1}
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-6 grid grid-cols-2 gap-3"
      >
        <div className="p-4 bg-[#1a1a3e] border-4 border-[#FF6B6B]" style={{ boxShadow: '3px 3px 0 0 #C0392B' }}>
          <Flame className="w-6 h-6 text-[#FF6B6B]" />
          <p className="text-[#FF6B6B] font-[var(--font-press-start)] text-xl mt-2">{user.streakDays}</p>
          <p className="text-[#9090b0] text-xs">Dias de racha</p>
        </div>
        
        <div className="p-4 bg-[#1a1a3e] border-4 border-[#FFD700]" style={{ boxShadow: '3px 3px 0 0 #B8860B' }}>
          <Coins className="w-6 h-6 text-[#FFD700]" />
          <p className="text-[#FFD700] font-[var(--font-press-start)] text-xl mt-2">{user.totalKoinsEarned.toLocaleString()}</p>
          <p className="text-[#9090b0] text-xs">Koins totales</p>
        </div>
        
        <div className="p-4 bg-[#1a1a3e] border-4 border-[#38A169]" style={{ boxShadow: '3px 3px 0 0 #276749' }}>
          <Trophy className="w-6 h-6 text-[#38A169]" />
          <p className="text-[#38A169] font-[var(--font-press-start)] text-xl mt-2">{debtsCompleted}</p>
          <p className="text-[#9090b0] text-xs">Deudas vencidas</p>
        </div>
        
        <div className="p-4 bg-[#1a1a3e] border-4 border-[#4ECDC4]" style={{ boxShadow: '3px 3px 0 0 #2A9D8F' }}>
          <Target className="w-6 h-6 text-[#4ECDC4]" />
          <p className="text-[#4ECDC4] font-[var(--font-press-start)] text-lg mt-2">{formatCurrency(totalPaid)}</p>
          <p className="text-[#9090b0] text-xs">Total pagado</p>
        </div>
      </motion.div>

      {/* Achievements Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[#FFD700] font-[var(--font-press-start)] text-xs">
            LOGROS ({unlockedAchievements.length}/{achievements.length})
          </h3>
          <button className="flex items-center gap-1 text-[#9090b0] text-sm hover:text-[#FFD700] transition-colors">
            Ver todos
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Unlocked Achievements */}
        <div className="grid grid-cols-4 gap-3">
          {unlockedAchievements.slice(0, 4).map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="relative p-3 bg-[#1a1a3e] border-2 border-[#38A169] text-center"
              style={{ boxShadow: '2px 2px 0 0 #276749' }}
            >
              <span className="text-2xl">{achievement.icon}</span>
              <p className="text-[#e8e8f0] text-[8px] mt-1 line-clamp-1">{achievement.name}</p>
            </motion.div>
          ))}
        </div>

        {/* Locked Achievements Preview */}
        {lockedAchievements.length > 0 && (
          <div className="mt-3 grid grid-cols-4 gap-3">
            {lockedAchievements.slice(0, 4).map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="relative p-3 bg-[#1a1a3e] border-2 border-[#3a3a6e] text-center opacity-50"
                style={{ boxShadow: '2px 2px 0 0 #252550' }}
              >
                <Lock className="w-6 h-6 text-[#9090b0] mx-auto" />
                <p className="text-[#9090b0] text-[8px] mt-1 line-clamp-1">???</p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6"
      >
        <h3 className="text-[#FFD700] font-[var(--font-press-start)] text-xs mb-3">
          ACTIVIDAD RECIENTE
        </h3>

        <div className="space-y-3">
          {paymentHistory.slice(0, 4).map((payment, index) => {
            const debt = debts.find(d => d.id === payment.debtId)
            
            return (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="flex items-center gap-3 p-3 bg-[#1a1a3e] border-2 border-[#3a3a6e]"
                style={{ boxShadow: '3px 3px 0 0 #252550' }}
              >
                <div className="w-10 h-10 bg-[#38A169] border-2 border-[#276749] flex items-center justify-center flex-shrink-0">
                  <Swords className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#e8e8f0] text-sm font-medium truncate">
                    {debt?.name || 'Pago'}
                  </p>
                  <p className="text-[#9090b0] text-xs">
                    {new Date(payment.date).toLocaleDateString('es-MX', { 
                      day: 'numeric', 
                      month: 'short' 
                    })}
                    {payment.bonusApplied && (
                      <span className="ml-2 text-[#FFD700]">{payment.bonusApplied}</span>
                    )}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[#38A169] font-[var(--font-press-start)] text-xs">
                    -{formatCurrency(payment.amount)}
                  </p>
                  <div className="flex items-center justify-end gap-2 mt-1">
                    <span className="text-[#FFD700] text-[10px]">+{payment.koinsEarned}</span>
                    <Coins className="w-3 h-3 text-[#FFD700]" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Member Since */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 flex items-center justify-center gap-2 text-[#9090b0] text-sm"
      >
        <Calendar className="w-4 h-4" />
        <span>
          Miembro desde {new Date(user.joinDate).toLocaleDateString('es-MX', { 
            month: 'long', 
            year: 'numeric' 
          })}
        </span>
      </motion.div>
    </div>
  )
}
