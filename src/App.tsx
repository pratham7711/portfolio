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

    const ctx = gsap.context(() => {
      // Scroll progress indicator
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
          },
        })
      }

      // Section title reveal animations
      document.querySelectorAll('.section-heading').forEach((heading) => {
        ScrollTrigger.create({
          trigger: heading,
          start: 'top 80%',
          onEnter: () => heading.classList.add('in-view'),
          onLeaveBack: () => heading.classList.remove('in-view'),
        })
      })
    })

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [isLoading])

  return (
    <>
      {isLoading && <Loader onComplete={handleLoaderComplete} />}
      <Cursor />

      <div ref={mainRef} className="app">
        {/* Scroll progress indicator */}
        <div ref={progressRef} className="scroll-progress" />

        <Nav />
        <main>
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
