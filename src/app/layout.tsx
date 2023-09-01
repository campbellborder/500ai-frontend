import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import WebSocketsProvider from '@/providers/ws-provider'
import StateProvider from '@/providers/state-provider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '500ai',
  description: 'Compete against advanced AIs in 500',
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
          <body className={inter.className}>
            {children}
            <Toaster/>
          </body>
        </WebSocketsProvider>
      </StateProvider>
    </html>
  )
}
