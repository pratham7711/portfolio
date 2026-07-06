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
  metadataBase: new URL('https://www.prathamsharma.in'),
  title: 'Pratham Sharma — Full-Stack & AI Software Engineer',
  description:
    'Pratham Sharma is a software engineer specialising in full-stack and AI development — React, Next.js, TypeScript, Node.js, RAG and LLM systems. Currently building AI document infrastructure at Leegality, used by 2,000+ businesses.',
  keywords: [
    'Pratham Sharma',
    'Pratham Sharma software engineer',
    'Pratham Sharma developer',
    'Pratham Sharma portfolio',
    'Pratham Sharma Leegality',
    'software engineer',
    'full stack developer',
    'fullstack engineer',
    'AI engineer India',
    'Next.js developer',
    'React developer',
    'RAG LangChain developer',
    'frontend engineer India',
  ],
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'Pratham Sharma', url: 'https://www.prathamsharma.in' }],
  creator: 'Pratham Sharma',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'Pratham Sharma — Full-Stack & AI Software Engineer',
    description:
      'Software engineer at Leegality. The careful first touch, the game-steering set, the final impact — a portfolio told like a match.',
    type: 'website',
    url: 'https://www.prathamsharma.in',
    locale: 'en_US',
    images: ['/media/og.jpg'],
    siteName: 'Pratham Sharma',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pratham Sharma — Full-Stack & AI Software Engineer',
    description: 'A portfolio told like a volleyball match. Software engineer at Leegality.',
    images: ['/media/og.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://www.prathamsharma.in/#person',
      name: 'Pratham Sharma',
      alternateName: 'pratham7711',
      url: 'https://www.prathamsharma.in',
      image: 'https://www.prathamsharma.in/media/og.jpg',
      jobTitle: 'Software Engineer — Full Stack & AI',
      description:
        'Full-stack and AI software engineer building React, Next.js, TypeScript, and LLM-powered products. Currently shipping AI document infrastructure at Leegality, used by 2,000+ businesses.',
      worksFor: {
        '@type': 'Organization',
        name: 'Leegality',
        url: 'https://www.leegality.com',
      },
      address: { '@type': 'PostalAddress', addressCountry: 'IN' },
      email: 'mailto:prathamsharma7711@gmail.com',
      sameAs: [
        'https://github.com/pratham7711',
        'https://www.linkedin.com/in/pratham-sharma-a555b8207',
        'https://leetcode.com/pratham7711/',
        'https://www.npmjs.com/~prathamsharma7711',
      ],
      knowsAbout: [
        'Software engineering',
        'Full-stack development',
        'React',
        'Next.js',
        'TypeScript',
        'Node.js',
        'AI engineering',
        'RAG',
        'LangChain',
        'CUDA',
        'Design systems',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.prathamsharma.in/#website',
      url: 'https://www.prathamsharma.in',
      name: 'Pratham Sharma',
      publisher: { '@id': 'https://www.prathamsharma.in/#person' },
      inLanguage: 'en',
    },
    {
      '@type': 'ProfilePage',
      '@id': 'https://www.prathamsharma.in/#profilepage',
      url: 'https://www.prathamsharma.in',
      name: 'Pratham Sharma — Full-Stack & AI Software Engineer',
      isPartOf: { '@id': 'https://www.prathamsharma.in/#website' },
      mainEntity: { '@id': 'https://www.prathamsharma.in/#person' },
      dateModified: '2026-07-06',
      inLanguage: 'en',
    },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
