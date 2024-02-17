import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Acyprot Trader',
  description: 'A safer way to trade',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className+" bg-gradient-to-l from-primary to-primary/50 text-black/70"}>
        {children}
        </body>
    </html>
  )
}
