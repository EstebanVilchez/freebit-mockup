'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Swords, Shield, Trophy, Calendar, TrendingDown, Coins, Zap } from 'lucide-react'
import type { Debt } from '@/lib/mock-data'
import { formatCurrency, getProgressPercentage } from '@/lib/mock-data'

interface DebtDetailModalProps {
  debt: Debt | null
  isOpen: boolean
  onClose: () => void
  onPayNow: (debt: Debt) => void
}

const worldColors: Record<Debt['worldTheme'], { bg: string; border: string; gradient: string }> = {
  fire: { bg: '#FF6B6B', border: '#C0392B', gradient: 'from-[#FF6B6B] to-[#C0392B]' },
  ice: { bg: '#4ECDC4', border: '#2A9D8F', gradient: 'from-[#4ECDC4] to-[#2A9D8F]' },
  forest: { bg: '#38A169', border: '#276749', gradient: 'from-[#38A169] to-[#276749]' },
  desert: { bg: '#F6AD55', border: '#C05621', gradient: 'from-[#F6AD55] to-[#C05621]' },
  ocean: { bg: '#4299E1', border: '#2B6CB0', gradient: 'from-[#4299E1] to-[#2B6CB0]' },
  sky: { bg: '#9B59B6', border: '#6C3483', gradient: 'from-[#9B59B6] to-[#6C3483]' }
}

export function DebtDetailModal({ debt, isOpen, onClose, onPayNow }: DebtDetailModalProps) {
  if (!debt) return null

  const colors = worldColors[debt.worldTheme]
  const progress = getProgressPercentage(debt)
  const remaining = debt.totalAmount - debt.paidAmount
  const isCompleted = debt.status === 'completed'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#0f0f23]/80"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto"
          >
            <div className="bg-[#1a1a3e] border-t-4" style={{ borderColor: colors.bg }}>
              {/* Header */}
              <div className="relative p-4" style={{ backgroundColor: colors.bg }}>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 bg-[#0f0f23]/50 flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#0f0f23]/30 border-4 border-white/30 flex items-center justify-center">
                    {isCompleted ? (
                      <Trophy className="w-8 h-8 text-white" />
                    ) : (
                      <Swords className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-white font-[var(--font-press-start)] text-sm">
                      {debt.name}
                    </h2>
                    <p className="text-white/80 text-sm mt-1">
                      Boss: {debt.bossName}
                    </p>
                    {isCompleted && (
                      <span className="inline-block mt-2 px-2 py-1 bg-white/20 text-white text-xs font-[var(--font-press-start)]">
                        CONQUISTADO
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[#9090b0] text-sm">Progreso de batalla</span>
                    <span style={{ color: colors.bg }} className="font-[var(--font-press-start)] text-sm">
                      {progress}%
                    </span>
                  </div>
                  <div className="h-6 bg-[#2a2a5e] border-4 border-[#3a3a6e]">
                    <motion.div
                      className="h-full"
                      style={{ backgroundColor: colors.bg }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-[#38A169]">
                      Pagado: {formatCurrency(debt.paidAmount)}
                    </span>
                    <span className="text-[#FF6B6B]">
                      Restante: {formatCurrency(remaining)}
                    </span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-[#2a2a5e] border-2 border-[#3a3a6e]">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[#FFD700]" />
                      <span className="text-[#9090b0] text-xs">Total</span>
                    </div>
                    <p className="text-[#e8e8f0] font-[var(--font-press-start)] text-xs mt-1">
                      {formatCurrency(debt.totalAmount)}
                    </p>
                  </div>

                  <div className="p-3 bg-[#2a2a5e] border-2 border-[#3a3a6e]">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-[#FF6B6B]" />
                      <span className="text-[#9090b0] text-xs">Interes</span>
                    </div>
                    <p className="text-[#FF6B6B] font-[var(--font-press-start)] text-xs mt-1">
                      {debt.interestRate}%
                    </p>
                  </div>

                  <div className="p-3 bg-[#2a2a5e] border-2 border-[#3a3a6e]">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#4ECDC4]" />
                      <span className="text-[#9090b0] text-xs">Vencimiento</span>
                    </div>
                    <p className="text-[#4ECDC4] font-[var(--font-press-start)] text-xs mt-1">
                      {new Date(debt.dueDate).toLocaleDateString('es-MX', { 
                        day: 'numeric', 
                        month: 'short' 
                      })}
                    </p>
                  </div>

                  <div className="p-3 bg-[#2a2a5e] border-2 border-[#3a3a6e]">
                    <div className="flex items-center gap-2">
                      <Swords className="w-4 h-4 text-[#38A169]" />
                      <span className="text-[#9090b0] text-xs">Pago Min</span>
                    </div>
                    <p className="text-[#38A169] font-[var(--font-press-start)] text-xs mt-1">
                      {formatCurrency(debt.minPayment)}
                    </p>
                  </div>
                </div>

                {/* Reward Preview */}
                {!isCompleted && (
                  <div className="p-4 bg-[#2a2a5e] border-2 border-[#FFD700]" style={{ boxShadow: '3px 3px 0 0 #B8860B' }}>
                    <p className="text-[#FFD700] font-[var(--font-press-start)] text-xs mb-2">
                      RECOMPENSA AL VENCER
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Coins className="w-5 h-5 text-[#FFD700]" />
                        <span className="text-[#FFD700]">+500 Koins</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-[#4ECDC4]" />
                        <span className="text-[#4ECDC4]">+1000 XP</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                {!isCompleted && (
                  <motion.button
                    onClick={() => onPayNow(debt)}
                    className="w-full py-4 bg-[#FFD700] border-4 border-[#B8860B] font-[var(--font-press-start)] text-[#0f0f23] text-sm flex items-center justify-center gap-2"
                    style={{ boxShadow: '4px 4px 0 0 #B8860B' }}
                    whileHover={{ x: -2, y: -2 }}
                    whileTap={{ x: 2, y: 2, boxShadow: 'none' }}
                  >
                    <Swords className="w-5 h-5" />
                    ATACAR AHORA
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
