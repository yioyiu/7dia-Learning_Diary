import type { Metadata } from 'next'
import '../styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '每日记录 - AI增强的日记工具',
  description: '轻量级、AI增强的日记/学习记录工具',
  icons: {
    icon: '/web.svg',
    shortcut: '/web.svg',
    apple: '/web.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

