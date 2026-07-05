'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import LenisProvider from '@/components/LenisProvider'
import Nav from '@/components/Nav'
import Loader from '@/components/Loader'
import Cursor from '@/components/Cursor'
import ScrollProgress from '@/components/ScrollProgress'
import Grain from '@/components/Grain'
import RallyOpen from '@/components/acts/RallyOpen'

const EngineerBridge = dynamic(() => import('@/components/acts/EngineerBridge'))
const ActMind = dynamic(() => import('@/components/acts/ActMind'))
const Marquee = dynamic(() => import('@/components/Marquee'))
const ActMatch = dynamic(() => import('@/components/acts/ActMatch'))
const Interests = dynamic(() => import('@/components/acts/Interests'))
const MatchPoint = dynamic(() => import('@/components/acts/MatchPoint'))
const EasterEggs = dynamic(() => import('@/components/EasterEggs'), { ssr: false })
const FlashCut = dynamic(() => import('@/components/FlashCut'), { ssr: false })

export default function Home() {
  const [loading, setLoading] = useState(true)

  return (
    <LenisProvider>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <ScrollProgress />
      <EasterEggs />
      <FlashCut />
      <Grain />
      <Cursor />
      <main id="main">
        {/* ACT I — the rally IS the opening pitch */}
        <RallyOpen />

        {/* ACT II — match cut: court → desk */}
        <EngineerBridge />

        {/* ACT III — the file: who, where, what */}
        <ActMind />
        <Marquee
          items={['ENGINEER', 'SETTER', 'BUILDER', 'CAPTAIN', 'AI-NATIVE', 'PLAYMAKER']}
        />

        {/* the work — projects rail */}
        <ActMatch />

        {/* interests */}
        <Interests />

        {/* the final whistle — powerful CTA */}
        <MatchPoint />
      </main>
    </LenisProvider>
  )
}
