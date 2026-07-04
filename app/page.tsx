'use client'

import { useState } from 'react'
import LenisProvider from '@/components/LenisProvider'
import Nav from '@/components/Nav'
import Loader from '@/components/Loader'
import Scoreboard from '@/components/Scoreboard'
import NarratorBall from '@/components/NarratorBall'
import EasterEggs from '@/components/EasterEggs'
import FlashCut from '@/components/FlashCut'
import ReelBreak from '@/components/ReelBreak'
import ActMind from '@/components/acts/ActMind'
import TheTurn from '@/components/acts/TheTurn'
import ActBody from '@/components/acts/ActBody'
import ActMatch from '@/components/acts/ActMatch'

export default function Home() {
  const [loading, setLoading] = useState(true)

  return (
    <LenisProvider>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      {!loading && (
        <>
          <Scoreboard />
          <NarratorBall />
        </>
      )}
      <EasterEggs />
      <FlashCut />
      <main id="main">
        <ActMind />
        <TheTurn />
        <ActBody />
        <ReelBreak
          dark={false}
          lines={['CAPTAIN.', 'SETTER.', 'PLAYMAKER.', 'NOW — THE HIGHLIGHTS.']}
        />
        <ActMatch />
      </main>
    </LenisProvider>
  )
}
