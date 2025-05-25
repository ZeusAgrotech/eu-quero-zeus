import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
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
      <body
        className={`${inter.variable} bg-zeus-400 antialiased dark:bg-zeus-950`}
      >
        {children}
      </body>
    </html>
  )
}
