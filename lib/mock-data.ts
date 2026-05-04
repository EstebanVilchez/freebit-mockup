// Mock data for Freebit MVP

export interface Debt {
  id: string
  name: string
  totalAmount: number
  paidAmount: number
  minPayment: number
  interestRate: number
  dueDate: string
  type: 'credit_card' | 'loan' | 'mortgage' | 'car' | 'student' | 'personal'
  status: 'active' | 'completed' | 'overdue'
  worldTheme: 'fire' | 'ice' | 'forest' | 'desert' | 'ocean' | 'sky'
  bossName: string
  bossDefeated: boolean
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  level: number
  xp: number
  xpToNextLevel: number
  koins: number
  totalKoinsEarned: number
  streakDays: number
  joinDate: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  category: 'payment' | 'streak' | 'milestone' | 'social'
  unlocked: boolean
  unlockedAt?: string
  koinsReward: number
}

export interface Quest {
  id: string
  title: string
  description: string
  type: 'daily' | 'weekly' | 'monthly' | 'special'
  progress: number
  target: number
  koinsReward: number
  xpReward: number
  expiresAt: string
  completed: boolean
}

export interface Reward {
  id: string
  name: string
  description: string
  category: 'avatar' | 'theme' | 'boost' | 'real'
  cost: number
  image: string
  owned: boolean
}

export interface PaymentHistory {
  id: string
  debtId: string
  amount: number
  date: string
  koinsEarned: number
  xpEarned: number
  bonusApplied?: string
}

// Mock User
export const mockUser: User = {
  id: 'user-1',
  name: 'Carlos',
  email: 'carlos@email.com',
  avatar: '/avatars/warrior.png',
  level: 7,
  xp: 2450,
  xpToNextLevel: 3000,
  koins: 1250,
  totalKoinsEarned: 4850,
  streakDays: 12,
  joinDate: '2024-01-15'
}

// Mock Debts (as game worlds)
export const mockDebts: Debt[] = [
  {
    id: 'debt-1',
    name: 'Tarjeta BBVA',
    totalAmount: 15000,
    paidAmount: 8500,
    minPayment: 450,
    interestRate: 28.5,
    dueDate: '2024-02-15',
    type: 'credit_card',
    status: 'active',
    worldTheme: 'fire',
    bossName: 'Dragon de Intereses',
    bossDefeated: false
  },
  {
    id: 'debt-2',
    name: 'Prestamo Personal',
    totalAmount: 25000,
    paidAmount: 22000,
    minPayment: 1200,
    interestRate: 18.0,
    dueDate: '2024-02-20',
    type: 'personal',
    status: 'active',
    worldTheme: 'ice',
    bossName: 'Gigante de Hielo',
    bossDefeated: false
  },
  {
    id: 'debt-3',
    name: 'Tarjeta Liverpool',
    totalAmount: 8000,
    paidAmount: 8000,
    minPayment: 0,
    interestRate: 32.0,
    dueDate: '2024-01-30',
    type: 'credit_card',
    status: 'completed',
    worldTheme: 'forest',
    bossName: 'Ent Consumista',
    bossDefeated: true
  },
  {
    id: 'debt-4',
    name: 'Credito Auto',
    totalAmount: 180000,
    paidAmount: 45000,
    minPayment: 4500,
    interestRate: 12.5,
    dueDate: '2024-02-25',
    type: 'car',
    status: 'active',
    worldTheme: 'desert',
    bossName: 'Esfinge Automotriz',
    bossDefeated: false
  }
]

// Mock Achievements
export const mockAchievements: Achievement[] = [
  {
    id: 'ach-1',
    name: 'Primer Pago',
    description: 'Realiza tu primer pago en Freebit',
    icon: '🎮',
    category: 'payment',
    unlocked: true,
    unlockedAt: '2024-01-16',
    koinsReward: 50
  },
  {
    id: 'ach-2',
    name: 'Racha de 7 dias',
    description: 'Mantén una racha de 7 días consecutivos',
    icon: '🔥',
    category: 'streak',
    unlocked: true,
    unlockedAt: '2024-01-22',
    koinsReward: 100
  },
  {
    id: 'ach-3',
    name: 'Conquistador',
    description: 'Liquida tu primera deuda completamente',
    icon: '🏆',
    category: 'milestone',
    unlocked: true,
    unlockedAt: '2024-01-30',
    koinsReward: 500
  },
  {
    id: 'ach-4',
    name: 'Pago Extra',
    description: 'Paga más del mínimo requerido',
    icon: '💪',
    category: 'payment',
    unlocked: true,
    unlockedAt: '2024-01-18',
    koinsReward: 75
  },
  {
    id: 'ach-5',
    name: 'Racha de 30 dias',
    description: 'Mantén una racha de 30 días consecutivos',
    icon: '⚡',
    category: 'streak',
    unlocked: false,
    koinsReward: 300
  },
  {
    id: 'ach-6',
    name: 'Maestro del Presupuesto',
    description: 'Mantente dentro del presupuesto por 3 meses',
    icon: '📊',
    category: 'milestone',
    unlocked: false,
    koinsReward: 400
  }
]

// Mock Quests
export const mockQuests: Quest[] = [
  {
    id: 'quest-1',
    title: 'Pago Diario',
    description: 'Realiza cualquier pago hoy',
    type: 'daily',
    progress: 0,
    target: 1,
    koinsReward: 25,
    xpReward: 50,
    expiresAt: '2024-02-06T23:59:59',
    completed: false
  },
  {
    id: 'quest-2',
    title: 'Mision Semanal',
    description: 'Paga el minimo de 3 deudas esta semana',
    type: 'weekly',
    progress: 2,
    target: 3,
    koinsReward: 150,
    xpReward: 300,
    expiresAt: '2024-02-11T23:59:59',
    completed: false
  },
  {
    id: 'quest-3',
    title: 'Doble Golpe',
    description: 'Realiza 2 pagos en un solo día',
    type: 'daily',
    progress: 1,
    target: 2,
    koinsReward: 50,
    xpReward: 100,
    expiresAt: '2024-02-06T23:59:59',
    completed: false
  },
  {
    id: 'quest-4',
    title: 'Super Pago',
    description: 'Paga $5,000 o más en una sola transacción',
    type: 'special',
    progress: 0,
    target: 1,
    koinsReward: 200,
    xpReward: 500,
    expiresAt: '2024-02-28T23:59:59',
    completed: false
  }
]

// Mock Rewards (Shop Items)
export const mockRewards: Reward[] = [
  {
    id: 'reward-1',
    name: 'Avatar: Caballero Dorado',
    description: 'Un avatar legendario para tu perfil',
    category: 'avatar',
    cost: 500,
    image: '/rewards/knight.png',
    owned: false
  },
  {
    id: 'reward-2',
    name: 'Tema: Cyberpunk',
    description: 'Cambia los colores de tu app a estilo cyberpunk',
    category: 'theme',
    cost: 750,
    image: '/rewards/cyberpunk.png',
    owned: false
  },
  {
    id: 'reward-3',
    name: 'Boost: XP x2',
    description: 'Duplica tu XP ganado por 24 horas',
    category: 'boost',
    cost: 200,
    image: '/rewards/xp-boost.png',
    owned: true
  },
  {
    id: 'reward-4',
    name: 'Cafecito Gratis',
    description: 'Canjea por un café en Starbucks',
    category: 'real',
    cost: 1000,
    image: '/rewards/coffee.png',
    owned: false
  },
  {
    id: 'reward-5',
    name: 'Avatar: Mago Financiero',
    description: 'Domina la magia del ahorro',
    category: 'avatar',
    cost: 350,
    image: '/rewards/mage.png',
    owned: true
  },
  {
    id: 'reward-6',
    name: 'Netflix 1 Mes',
    description: 'Un mes de suscripción a Netflix',
    category: 'real',
    cost: 2500,
    image: '/rewards/netflix.png',
    owned: false
  }
]

// Mock Payment History
export const mockPaymentHistory: PaymentHistory[] = [
  {
    id: 'pay-1',
    debtId: 'debt-1',
    amount: 500,
    date: '2024-02-05',
    koinsEarned: 50,
    xpEarned: 100
  },
  {
    id: 'pay-2',
    debtId: 'debt-2',
    amount: 1500,
    date: '2024-02-04',
    koinsEarned: 75,
    xpEarned: 150,
    bonusApplied: 'Pago Extra +25%'
  },
  {
    id: 'pay-3',
    debtId: 'debt-4',
    amount: 4500,
    date: '2024-02-03',
    koinsEarned: 90,
    xpEarned: 200
  },
  {
    id: 'pay-4',
    debtId: 'debt-3',
    amount: 2000,
    date: '2024-02-01',
    koinsEarned: 500,
    xpEarned: 1000,
    bonusApplied: 'Deuda Liquidada!'
  }
]

// Helper functions
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

export function getProgressPercentage(debt: Debt): number {
  return Math.round((debt.paidAmount / debt.totalAmount) * 100)
}

export function getWorldIcon(theme: Debt['worldTheme']): string {
  const icons: Record<Debt['worldTheme'], string> = {
    fire: '🔥',
    ice: '❄️',
    forest: '🌲',
    desert: '🏜️',
    ocean: '🌊',
    sky: '☁️'
  }
  return icons[theme]
}

export function getDebtTypeIcon(type: Debt['type']): string {
  const icons: Record<Debt['type'], string> = {
    credit_card: '💳',
    loan: '🏦',
    mortgage: '🏠',
    car: '🚗',
    student: '🎓',
    personal: '👤'
  }
  return icons[type]
}
