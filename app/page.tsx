'use client'

import { useState } from 'react'
import LenisProvider from '@/components/LenisProvider'
import Nav from '@/components/Nav'
import Loader from '@/components/Loader'
import Cursor from '@/components/Cursor'
import ScrollProgress from '@/components/ScrollProgress'
import Marquee from '@/components/Marquee'
import EasterEggs from '@/components/EasterEggs'
import FlashCut from '@/components/FlashCut'
import Grain from '@/components/Grain'
import RallyOpen from '@/components/acts/RallyOpen'
import EngineerBridge from '@/components/acts/EngineerBridge'
import ActMind from '@/components/acts/ActMind'
import Interests from '@/components/acts/Interests'
import ActMatch from '@/components/acts/ActMatch'
import MatchPoint from '@/components/acts/MatchPoint'

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
