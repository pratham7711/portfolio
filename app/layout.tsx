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
  metadataBase: new URL('https://portfolio-prathams-projects-371c8ade.vercel.app'),
  title: 'Pratham Sharma — Full Stack & AI Engineer',
  description:
    'Pratham Sharma — Full-stack & AI engineer at Leegality, building document infrastructure used by 2000+ businesses. RAG systems, Next.js, design systems. Volleyball captain. A portfolio told like a match.',
  keywords: [
    'Pratham Sharma',
    'full stack developer',
    'AI engineer India',
    'Next.js developer',
    'React developer',
    'Leegality',
    'RAG LangChain developer',
    'frontend engineer India',
  ],
  openGraph: {
    title: 'Pratham Sharma — Full Stack & AI Engineer',
    description:
      'Engineer at Leegality. The careful first touch, the game-steering set, the final impact — a portfolio told like a match.',
    type: 'website',
    images: ['/media/rally-set.png'],
    siteName: 'Pratham Sharma',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pratham Sharma — Full Stack & AI Engineer',
    description: 'A portfolio told like a volleyball match. Engineer at Leegality.',
    images: ['/media/rally-set.png'],
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Pratham Sharma',
  jobTitle: 'Software Engineer — Full Stack & AI',
  worksFor: { '@type': 'Organization', name: 'Leegality' },
  email: 'mailto:prathamsharma7711@gmail.com',
  sameAs: [
    'https://github.com/pratham7711',
    'https://www.linkedin.com/in/pratham-sharma-a7a97a201',
  ],
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'AI engineering',
    'RAG',
    'LangChain',
    'Node.js',
    'Design systems',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${grotesk.variable} ${fraunces.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
