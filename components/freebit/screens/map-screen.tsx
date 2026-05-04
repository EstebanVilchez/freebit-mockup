'use client'

import { motion } from 'framer-motion'
import { ChevronRight, Sword, Shield, Trophy, Zap } from 'lucide-react'
import type { Debt, Quest } from '@/lib/mock-data'
import { formatCurrency, getProgressPercentage } from '@/lib/mock-data'

interface MapScreenProps {
  debts: Debt[]
  quests: Quest[]
  onSelectDebt: (debt: Debt) => void
}

const worldColors: Record<Debt['worldTheme'], { bg: string; border: string; glow: string }> = {
  fire: { bg: '#FF6B6B', border: '#C0392B', glow: '0 0 20px #FF6B6B' },
  ice: { bg: '#4ECDC4', border: '#2A9D8F', glow: '0 0 20px #4ECDC4' },
  forest: { bg: '#38A169', border: '#276749', glow: '0 0 20px #38A169' },
  desert: { bg: '#F6AD55', border: '#C05621', glow: '0 0 20px #F6AD55' },
  ocean: { bg: '#4299E1', border: '#2B6CB0', glow: '0 0 20px #4299E1' },
  sky: { bg: '#9B59B6', border: '#6C3483', glow: '0 0 20px #9B59B6' }
}

export function MapScreen({ debts, quests, onSelectDebt }: MapScreenProps) {
  const activeDebts = debts.filter(d => d.status !== 'completed')
  const completedDebts = debts.filter(d => d.status === 'completed')
  const totalDebt = activeDebts.reduce((sum, d) => sum + (d.totalAmount - d.paidAmount), 0)
  const activeQuests = quests.filter(q => !q.completed)

  return (
    <div className="pb-24 px-4">
      {/* Total Debt Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 p-4 bg-[#1a1a3e] border-4 border-[#3a3a6e]"
        style={{ boxShadow: '4px 4px 0 0 #252550' }}
      >
        <p className="text-[#9090b0] text-sm">Deuda Total Restante</p>
        <p className="text-[#FFD700] font-[var(--font-press-start)] text-xl mt-1">
          {formatCurrency(totalDebt)}
        </p>
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1">
            <Sword className="w-4 h-4 text-[#FF6B6B]" />
            <span className="text-[#e8e8f0] text-sm">{activeDebts.length} activas</span>
          </div>
          <div className="flex items-center gap-1">
            <Trophy className="w-4 h-4 text-[#38A169]" />
            <span className="text-[#e8e8f0] text-sm">{completedDebts.length} vencidas</span>
          </div>
        </div>
      </motion.div>

      {/* Active Quests Preview */}
      {activeQuests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4"
        >
          <h3 className="text-[#FFD700] font-[var(--font-press-start)] text-xs mb-3">
            MISIONES ACTIVAS
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {activeQuests.slice(0, 3).map((quest, index) => (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="flex-shrink-0 w-48 p-3 bg-[#2a2a5e] border-2 border-[#4ECDC4]"
                style={{ boxShadow: '3px 3px 0 0 #2A9D8F' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-[var(--font-press-start)] text-[#4ECDC4] uppercase">
                    {quest.type}
                  </span>
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-[#FFD700]" />
                    <span className="text-[10px] text-[#FFD700]">{quest.koinsReward}</span>
                  </div>
                </div>
                <p className="text-[#e8e8f0] text-sm mt-2 font-medium">{quest.title}</p>
                <div className="mt-2 h-2 bg-[#1a1a3e] border border-[#3a3a6e]">
                  <div 
                    className="h-full bg-[#4ECDC4]"
                    style={{ width: `${(quest.progress / quest.target) * 100}%` }}
                  />
                </div>
                <p className="text-[#9090b0] text-[10px] mt-1">
                  {quest.progress}/{quest.target}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* World Map - Debt Nodes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6"
      >
        <h3 className="text-[#FFD700] font-[var(--font-press-start)] text-xs mb-3">
          MAPA DE MUNDOS
        </h3>
        
        {/* Path visualization */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-8 top-8 bottom-8 w-1 bg-[#3a3a6e]" />
          
          <div className="space-y-4">
            {debts.map((debt, index) => {
              const colors = worldColors[debt.worldTheme]
              const progress = getProgressPercentage(debt)
              const isCompleted = debt.status === 'completed'
              
              return (
                <motion.button
                  key={debt.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  onClick={() => onSelectDebt(debt)}
                  className="w-full text-left relative"
                >
                  {/* Node marker */}
                  <motion.div
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center z-10"
                    style={{ 
                      backgroundColor: isCompleted ? '#38A169' : colors.bg,
                      border: `3px solid ${isCompleted ? '#276749' : colors.border}`,
                      boxShadow: isCompleted ? '0 0 15px #38A169' : colors.glow
                    }}
                    whileHover={{ scale: 1.1 }}
                    animate={isCompleted ? {} : { scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {isCompleted ? (
                      <Trophy className="w-4 h-4 text-white" />
                    ) : (
                      <Sword className="w-4 h-4 text-white" />
                    )}
                  </motion.div>

                  {/* Card */}
                  <div 
                    className={`ml-16 p-4 bg-[#1a1a3e] border-4 transition-all ${
                      isCompleted ? 'border-[#38A169] opacity-75' : 'border-[#3a3a6e] hover:border-[#FFD700]'
                    }`}
                    style={{ boxShadow: '4px 4px 0 0 #252550' }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{isCompleted ? '🏆' : '⚔️'}</span>
                          <h4 className="text-[#e8e8f0] font-bold">{debt.name}</h4>
                        </div>
                        <p className="text-[#9090b0] text-sm mt-1">
                          Boss: {debt.bossName}
                        </p>
                      </div>
                      <ChevronRight className={`w-5 h-5 ${isCompleted ? 'text-[#38A169]' : 'text-[#FFD700]'}`} />
                    </div>

                    {/* Progress */}
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#9090b0]">Progreso</span>
                        <span style={{ color: isCompleted ? '#38A169' : colors.bg }}>
                          {progress}%
                        </span>
                      </div>
                      <div className="h-3 bg-[#2a2a5e] border-2 border-[#3a3a6e]">
                        <motion.div
                          className="h-full pixel-progress"
                          style={{ backgroundColor: isCompleted ? '#38A169' : colors.bg }}
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                        />
                      </div>
                    </div>

                    {/* Amount info */}
                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <p className="text-[#9090b0] text-xs">Restante</p>
                        <p className="text-[#e8e8f0] font-[var(--font-press-start)] text-xs">
                          {formatCurrency(debt.totalAmount - debt.paidAmount)}
                        </p>
                      </div>
                      {!isCompleted && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-[#2a2a5e] border border-[#FFD700]">
                          <Shield className="w-3 h-3 text-[#FFD700]" />
                          <span className="text-[#FFD700] text-[10px] font-[var(--font-press-start)]">
                            Min: {formatCurrency(debt.minPayment)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
