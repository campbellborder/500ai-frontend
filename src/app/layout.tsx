import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import WebSocketsProvider from '@/providers/ws-provider'
import StateProvider from '@/providers/state-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <StateProvider>
        <WebSocketsProvider>
        <body className={inter.className}>{children}</body>
        </WebSocketsProvider>
      </StateProvider>
    </html>
  )
}