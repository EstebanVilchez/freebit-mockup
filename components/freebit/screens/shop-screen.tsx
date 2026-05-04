'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Coins, Check, Lock, Sparkles, User, Palette, Zap, Gift } from 'lucide-react'
import type { Reward, User as UserType } from '@/lib/mock-data'

interface ShopScreenProps {
  rewards: Reward[]
  user: UserType
  onPurchase: (rewardId: string) => void
}

const categoryIcons: Record<Reward['category'], React.ElementType> = {
  avatar: User,
  theme: Palette,
  boost: Zap,
  real: Gift
}

const categoryLabels: Record<Reward['category'], string> = {
  avatar: 'Avatares',
  theme: 'Temas',
  boost: 'Boosts',
  real: 'Premios Reales'
}

export function ShopScreen({ rewards, user, onPurchase }: ShopScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<Reward['category'] | 'all'>('all')
  const [showPurchaseSuccess, setShowPurchaseSuccess] = useState(false)
  const [purchasedItem, setPurchasedItem] = useState<Reward | null>(null)

  const categories: (Reward['category'] | 'all')[] = ['all', 'avatar', 'theme', 'boost', 'real']
  
  const filteredRewards = selectedCategory === 'all' 
    ? rewards 
    : rewards.filter(r => r.category === selectedCategory)

  const handlePurchase = (reward: Reward) => {
    if (user.koins < reward.cost || reward.owned) return
    
    setPurchasedItem(reward)
    setShowPurchaseSuccess(true)
    
    setTimeout(() => {
      onPurchase(reward.id)
      setShowPurchaseSuccess(false)
      setPurchasedItem(null)
    }, 2000)
  }

  return (
    <div className="pb-24 px-4">
      {/* Purchase Success Overlay */}
      <AnimatePresence>
        {showPurchaseSuccess && purchasedItem && (
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
              className="text-center p-8"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 2 }}
              >
                <ShoppingBag className="w-16 h-16 text-[#FFD700] mx-auto" />
              </motion.div>
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-[#FFD700] font-[var(--font-press-start)] text-lg mt-4"
              >
                COMPRA EXITOSA!
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-[#e8e8f0] mt-2"
              >
                {purchasedItem.name}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 text-center"
      >
        <ShoppingBag className="w-12 h-12 text-[#FFD700] mx-auto" />
        <h2 className="text-[#FFD700] font-[var(--font-press-start)] text-lg mt-2">
          TIENDA
        </h2>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Coins className="w-5 h-5 text-[#FFD700]" />
          <span className="text-[#FFD700] font-[var(--font-press-start)]">
            {user.koins.toLocaleString()}
          </span>
          <span className="text-[#9090b0] text-sm">disponibles</span>
        </div>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-6 flex gap-2 overflow-x-auto pb-2 -mx-4 px-4"
      >
        {categories.map((category) => {
          const isActive = selectedCategory === category
          const Icon = category === 'all' ? Sparkles : categoryIcons[category]
          
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex items-center gap-2 px-4 py-2 border-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#FFD700] border-[#B8860B] text-[#0f0f23]'
                  : 'bg-[#1a1a3e] border-[#3a3a6e] text-[#e8e8f0] hover:border-[#FFD700]'
              }`}
              style={{ boxShadow: isActive ? '3px 3px 0 0 #B8860B' : '3px 3px 0 0 #252550' }}
            >
              <Icon className="w-4 h-4" />
              <span className="text-xs font-[var(--font-press-start)]">
                {category === 'all' ? 'Todo' : categoryLabels[category]}
              </span>
            </button>
          )
        })}
      </motion.div>

      {/* Rewards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 grid grid-cols-2 gap-4"
      >
        {filteredRewards.map((reward, index) => {
          const Icon = categoryIcons[reward.category]
          const canAfford = user.koins >= reward.cost
          
          return (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className={`relative p-4 bg-[#1a1a3e] border-4 ${
                reward.owned 
                  ? 'border-[#38A169]' 
                  : canAfford 
                    ? 'border-[#3a3a6e] hover:border-[#FFD700]' 
                    : 'border-[#3a3a6e] opacity-60'
              } transition-colors`}
              style={{ boxShadow: '4px 4px 0 0 #252550' }}
            >
              {/* Owned Badge */}
              {reward.owned && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#38A169] border-2 border-[#276749] flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}

              {/* Icon/Image placeholder */}
              <div className={`w-12 h-12 mx-auto flex items-center justify-center border-2 ${
                reward.category === 'real' ? 'bg-[#FFD700] border-[#B8860B]' : 'bg-[#2a2a5e] border-[#3a3a6e]'
              }`}>
                <Icon className={`w-6 h-6 ${reward.category === 'real' ? 'text-[#0f0f23]' : 'text-[#FFD700]'}`} />
              </div>

              {/* Info */}
              <h4 className="text-[#e8e8f0] text-sm font-medium mt-3 text-center line-clamp-2">
                {reward.name}
              </h4>
              <p className="text-[#9090b0] text-xs mt-1 text-center line-clamp-2">
                {reward.description}
              </p>

              {/* Price / Purchase Button */}
              {reward.owned ? (
                <div className="mt-3 py-2 bg-[#38A169] border-2 border-[#276749] text-center">
                  <span className="text-white text-xs font-[var(--font-press-start)]">
                    OBTENIDO
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => handlePurchase(reward)}
                  disabled={!canAfford}
                  className={`w-full mt-3 py-2 border-2 flex items-center justify-center gap-2 transition-all ${
                    canAfford
                      ? 'bg-[#FFD700] border-[#B8860B] text-[#0f0f23] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px]'
                      : 'bg-[#2a2a5e] border-[#3a3a6e] text-[#9090b0] cursor-not-allowed'
                  }`}
                  style={{ boxShadow: canAfford ? '2px 2px 0 0 #B8860B' : 'none' }}
                >
                  {canAfford ? (
                    <>
                      <Coins className="w-4 h-4" />
                      <span className="text-xs font-[var(--font-press-start)]">
                        {reward.cost}
                      </span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span className="text-xs font-[var(--font-press-start)]">
                        {reward.cost}
                      </span>
                    </>
                  )}
                </button>
              )}
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
