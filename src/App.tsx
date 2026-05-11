import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Nav, Hero, About, Experience, Skills, Projects, Contact, Footer, Cursor, Loader } from './components'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const progressRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)

  const handleLoaderComplete = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    if (isLoading) return

    const mm = gsap.matchMedia()

    mm.add(
      { reduceMotion: '(prefers-reduced-motion: reduce)' },
      (context) => {
        const { reduceMotion } = context.conditions as { reduceMotion: boolean }

        if (progressRef.current) {
          gsap.to(progressRef.current, {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: document.body,
              start: 'top top',
              end: 'bottom bottom',
              scrub: reduceMotion ? false : 0.3,
            },
          })
        }

        document.querySelectorAll('.section-heading').forEach((heading) => {
          ScrollTrigger.create({
            trigger: heading,
            start: 'top 80%',
            onEnter: () => heading.classList.add('in-view'),
            onLeaveBack: () => heading.classList.remove('in-view'),
          })
        })
      }
    )

    return () => mm.revert()
  }, [isLoading])

  return (
    <>
      {isLoading && <Loader onComplete={handleLoaderComplete} />}
      <Cursor />

      <div ref={mainRef} className="app">
        <a href="#main-content" className="skip-link">Skip to content</a>

        {/* Scroll progress indicator */}
        <div ref={progressRef} className="scroll-progress" />

        <Nav />
        <main id="main-content">
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
