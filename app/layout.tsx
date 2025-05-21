import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const geistSans = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Eu quero Zeus',
  description: '...',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  )
}
