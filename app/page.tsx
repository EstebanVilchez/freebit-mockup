'use client'

import { useState } from 'react'
import { Header } from '@/components/freebit/header'
import { BottomNav } from '@/components/freebit/bottom-nav'
import { MapScreen } from '@/components/freebit/screens/map-screen'
import { PayScreen } from '@/components/freebit/screens/pay-screen'
import { ShopScreen } from '@/components/freebit/screens/shop-screen'
import { ProfileScreen } from '@/components/freebit/screens/profile-screen'
import { DebtDetailModal } from '@/components/freebit/debt-detail-modal'
import { 
  mockUser, 
  mockDebts, 
  mockQuests, 
  mockRewards, 
  mockAchievements,
  mockPaymentHistory,
  type Debt 
} from '@/lib/mock-data'

type Tab = 'map' | 'pay' | 'shop' | 'profile'

export default function FreebitApp() {
  const [activeTab, setActiveTab] = useState<Tab>('map')
  const [user, setUser] = useState(mockUser)
  const [debts, setDebts] = useState(mockDebts)
  const [rewards, setRewards] = useState(mockRewards)
  const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null)
  const [showDebtModal, setShowDebtModal] = useState(false)

  const handleSelectDebt = (debt: Debt) => {
    setSelectedDebt(debt)
    setShowDebtModal(true)
  }

  const handlePayNow = (debt: Debt) => {
    setShowDebtModal(false)
    setActiveTab('pay')
  }

  const handlePayment = (debtId: string, amount: number) => {
    // Update debt
    setDebts(prevDebts => 
      prevDebts.map(debt => {
        if (debt.id === debtId) {
          const newPaidAmount = debt.paidAmount + amount
          const isCompleted = newPaidAmount >= debt.totalAmount
          return {
            ...debt,
            paidAmount: Math.min(newPaidAmount, debt.totalAmount),
            status: isCompleted ? 'completed' as const : debt.status,
            bossDefeated: isCompleted
          }
        }
        return debt
      })
    )

    // Update user koins and XP
    const koinsEarned = Math.floor(amount / 10)
    const xpEarned = Math.floor(amount / 5)
    
    setUser(prev => ({
      ...prev,
      koins: prev.koins + koinsEarned,
      totalKoinsEarned: prev.totalKoinsEarned + koinsEarned,
      xp: prev.xp + xpEarned
    }))
  }

  const handlePurchase = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId)
    if (!reward || user.koins < reward.cost) return

    setRewards(prevRewards =>
      prevRewards.map(r =>
        r.id === rewardId ? { ...r, owned: true } : r
      )
    )

    setUser(prev => ({
      ...prev,
      koins: prev.koins - reward.cost
    }))
  }

  return (
    <div className="min-h-screen bg-[#0f0f23] max-w-md mx-auto relative">
      <Header user={user} />

      <main className="relative">
        {activeTab === 'map' && (
          <MapScreen 
            debts={debts} 
            quests={mockQuests}
            onSelectDebt={handleSelectDebt}
          />
        )}
        {activeTab === 'pay' && (
          <PayScreen 
            debts={debts}
            onPayment={handlePayment}
          />
        )}
        {activeTab === 'shop' && (
          <ShopScreen 
            rewards={rewards}
            user={user}
            onPurchase={handlePurchase}
          />
        )}
        {activeTab === 'profile' && (
          <ProfileScreen 
            user={user}
            achievements={mockAchievements}
            paymentHistory={mockPaymentHistory}
            debts={debts}
          />
        )}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      <DebtDetailModal
        debt={selectedDebt}
        isOpen={showDebtModal}
        onClose={() => setShowDebtModal(false)}
        onPayNow={handlePayNow}
      />
    </div>
  )
}
