'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swords, Coins, Zap, ChevronDown, Check, Sparkles } from 'lucide-react'
import type { Debt } from '@/lib/mock-data'
import { formatCurrency, getProgressPercentage } from '@/lib/mock-data'

interface PayScreenProps {
  debts: Debt[]
  onPayment: (debtId: string, amount: number) => void
}

const quickAmounts = [100, 500, 1000, 2500]

export function PayScreen({ debts, onPayment }: PayScreenProps) {
  const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null)
  const [amount, setAmount] = useState('')
  const [showDebtSelector, setShowDebtSelector] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [earnedKoins, setEarnedKoins] = useState(0)

  const activeDebts = debts.filter(d => d.status !== 'completed')

  const handlePayment = () => {
    if (!selectedDebt || !amount) return
    
    const paymentAmount = parseFloat(amount)
    const koins = Math.floor(paymentAmount / 10) // 10 koins per 100 pesos
    setEarnedKoins(koins)
    setShowSuccess(true)
    
    setTimeout(() => {
      onPayment(selectedDebt.id, paymentAmount)
      setShowSuccess(false)
      setAmount('')
    }, 2500)
  }

  const estimatedKoins = amount ? Math.floor(parseFloat(amount) / 10) : 0
  const estimatedXP = amount ? Math.floor(parseFloat(amount) / 5) : 0

  return (
    <div className="pb-24 px-4">
      {/* Success Animation Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f0f23]/90"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="text-center"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="inline-block"
              >
                <Sparkles className="w-20 h-20 text-[#FFD700] mx-auto" />
              </motion.div>
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[#FFD700] font-[var(--font-press-start)] text-xl mt-4"
              >
                VICTORIA!
              </motion.h2>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-4 mt-6"
              >
                <div className="flex items-center gap-2 bg-[#1a1a3e] px-4 py-2 border-2 border-[#FFD700]">
                  <Coins className="w-6 h-6 text-[#FFD700]" />
                  <span className="text-[#FFD700] font-[var(--font-press-start)]">
                    +{earnedKoins}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-[#1a1a3e] px-4 py-2 border-2 border-[#4ECDC4]">
                  <Zap className="w-6 h-6 text-[#4ECDC4]" />
                  <span className="text-[#4ECDC4] font-[var(--font-press-start)]">
                    +{estimatedXP} XP
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 text-center"
      >
        <Swords className="w-12 h-12 text-[#FFD700] mx-auto" />
        <h2 className="text-[#FFD700] font-[var(--font-press-start)] text-lg mt-2">
          ATACAR DEUDA
        </h2>
        <p className="text-[#9090b0] text-sm mt-1">
          Cada pago es un golpe contra tus deudas
        </p>
      </motion.div>

      {/* Debt Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-6"
      >
        <label className="text-[#e8e8f0] text-sm font-medium mb-2 block">
          Selecciona tu objetivo
        </label>
        <button
          onClick={() => setShowDebtSelector(!showDebtSelector)}
          className="w-full p-4 bg-[#1a1a3e] border-4 border-[#3a3a6e] flex items-center justify-between hover:border-[#FFD700] transition-colors"
          style={{ boxShadow: '4px 4px 0 0 #252550' }}
        >
          {selectedDebt ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FF6B6B] flex items-center justify-center border-2 border-[#C0392B]">
                <Swords className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <p className="text-[#e8e8f0] font-medium">{selectedDebt.name}</p>
                <p className="text-[#9090b0] text-sm">
                  {formatCurrency(selectedDebt.totalAmount - selectedDebt.paidAmount)} restante
                </p>
              </div>
            </div>
          ) : (
            <span className="text-[#9090b0]">Selecciona una deuda...</span>
          )}
          <ChevronDown className={`w-5 h-5 text-[#9090b0] transition-transform ${showDebtSelector ? 'rotate-180' : ''}`} />
        </button>

        {/* Debt Options */}
        <AnimatePresence>
          {showDebtSelector && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-2 bg-[#1a1a3e] border-4 border-[#3a3a6e]" style={{ boxShadow: '4px 4px 0 0 #252550' }}>
                {activeDebts.map((debt) => (
                  <button
                    key={debt.id}
                    onClick={() => {
                      setSelectedDebt(debt)
                      setShowDebtSelector(false)
                    }}
                    className={`w-full p-3 flex items-center justify-between border-b border-[#3a3a6e] last:border-b-0 hover:bg-[#2a2a5e] transition-colors ${
                      selectedDebt?.id === debt.id ? 'bg-[#2a2a5e]' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-[#FF6B6B] flex items-center justify-center border-2 border-[#C0392B]">
                        <Swords className="w-3 h-3 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="text-[#e8e8f0] text-sm">{debt.name}</p>
                        <p className="text-[#9090b0] text-xs">
                          {getProgressPercentage(debt)}% completado
                        </p>
                      </div>
                    </div>
                    {selectedDebt?.id === debt.id && (
                      <Check className="w-5 h-5 text-[#38A169]" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Amount Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6"
      >
        <label className="text-[#e8e8f0] text-sm font-medium mb-2 block">
          Monto del ataque
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9090b0] text-xl">$</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="w-full p-4 pl-10 bg-[#1a1a3e] border-4 border-[#3a3a6e] text-[#e8e8f0] text-2xl font-[var(--font-press-start)] focus:border-[#FFD700] focus:outline-none transition-colors"
            style={{ boxShadow: '4px 4px 0 0 #252550' }}
          />
        </div>

        {/* Quick Amount Buttons */}
        <div className="flex gap-2 mt-3">
          {quickAmounts.map((quickAmount) => (
            <button
              key={quickAmount}
              onClick={() => setAmount(quickAmount.toString())}
              className={`flex-1 py-2 border-2 font-[var(--font-press-start)] text-xs transition-all ${
                amount === quickAmount.toString()
                  ? 'bg-[#FFD700] border-[#B8860B] text-[#0f0f23]'
                  : 'bg-[#2a2a5e] border-[#3a3a6e] text-[#e8e8f0] hover:border-[#FFD700]'
              }`}
              style={{ boxShadow: '2px 2px 0 0 #252550' }}
            >
              ${quickAmount >= 1000 ? `${quickAmount/1000}K` : quickAmount}
            </button>
          ))}
        </div>

        {/* Min Payment Suggestion */}
        {selectedDebt && (
          <button
            onClick={() => setAmount(selectedDebt.minPayment.toString())}
            className="w-full mt-3 py-2 border-2 border-dashed border-[#4ECDC4] text-[#4ECDC4] text-sm hover:bg-[#4ECDC4]/10 transition-colors"
          >
            Pago minimo: {formatCurrency(selectedDebt.minPayment)}
          </button>
        )}
      </motion.div>

      {/* Rewards Preview */}
      {amount && parseFloat(amount) > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-[#2a2a5e] border-2 border-[#FFD700]"
          style={{ boxShadow: '3px 3px 0 0 #B8860B' }}
        >
          <p className="text-[#FFD700] font-[var(--font-press-start)] text-xs mb-3">
            RECOMPENSAS ESTIMADAS
          </p>
          <div className="flex items-center justify-around">
            <div className="text-center">
              <Coins className="w-8 h-8 text-[#FFD700] mx-auto" />
              <p className="text-[#FFD700] font-[var(--font-press-start)] text-lg mt-1">
                +{estimatedKoins}
              </p>
              <p className="text-[#9090b0] text-xs">Koins</p>
            </div>
            <div className="w-px h-12 bg-[#3a3a6e]" />
            <div className="text-center">
              <Zap className="w-8 h-8 text-[#4ECDC4] mx-auto" />
              <p className="text-[#4ECDC4] font-[var(--font-press-start)] text-lg mt-1">
                +{estimatedXP}
              </p>
              <p className="text-[#9090b0] text-xs">XP</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Pay Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onClick={handlePayment}
        disabled={!selectedDebt || !amount || parseFloat(amount) <= 0}
        className={`w-full mt-6 py-4 font-[var(--font-press-start)] text-sm border-4 transition-all ${
          selectedDebt && amount && parseFloat(amount) > 0
            ? 'bg-[#FFD700] border-[#B8860B] text-[#0f0f23] hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[2px] active:translate-y-[2px]'
            : 'bg-[#2a2a5e] border-[#3a3a6e] text-[#9090b0] cursor-not-allowed'
        }`}
        style={{ 
          boxShadow: selectedDebt && amount && parseFloat(amount) > 0 
            ? '4px 4px 0 0 #B8860B' 
            : '4px 4px 0 0 #252550' 
        }}
        whileTap={selectedDebt && amount ? { scale: 0.98 } : {}}
      >
        <span className="flex items-center justify-center gap-2">
          <Swords className="w-5 h-5" />
          ATACAR!
        </span>
      </motion.button>
    </div>
  )
}
