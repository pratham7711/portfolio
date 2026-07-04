import type { Metadata } from 'next'
import { Space_Grotesk, Fraunces, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-mono-var',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pratham Sharma — Engineer & Setter',
  description:
    'Full-stack & AI engineer at Leegality. A portfolio in three acts: the mind, the body, the match point.',
  openGraph: {
    title: 'Pratham Sharma — Engineer & Setter',
    description: 'A portfolio in three acts.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${grotesk.variable} ${fraunces.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
