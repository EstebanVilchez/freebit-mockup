import type { Metadata, Viewport } from 'next'
import { DM_Sans, Press_Start_2P } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-dm-sans'
})

const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start'
})

export const metadata: Metadata = {
  title: 'Freebit - Level Up Your Finances',
  description: 'Gamifica tus finanzas y conquista tus deudas con Freebit. Convierte cada pago en una victoria.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0f0f23',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-[#0f0f23]">
      <body className={`${dmSans.variable} ${pressStart2P.variable} font-sans antialiased bg-[#0f0f23] text-[#e8e8f0]`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
