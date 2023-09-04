import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StateProvider from '@/contexts/state-provider'
import DiscardProvider from '@/contexts/discard-provider'
import WebSocketsProvider from '@/contexts/ws-provider'
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
        <DiscardProvider>
          <WebSocketsProvider>
            <body className={inter.className}>
              {children}
              <Toaster/>
            </body>
          </WebSocketsProvider>
        </DiscardProvider>
      </StateProvider>
    </html>
  )
}
