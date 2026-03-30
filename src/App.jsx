import React, { lazy, Suspense, useState, useEffect } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import FlyingCode from './components/FlyingCode'
import Home from './pages/Home'
import { initEffects } from './utils/effects'
import soundManager from './utils/soundManager'

const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const Contact = lazy(() => import('./pages/Contact'))
const Tools = lazy(() => import('./pages/Tools'))
const Blog = lazy(() => import('./pages/Blog'))
const Competences = lazy(() => import('./pages/Competences'))
const Graph3D = lazy(() => import('./pages/Graph3D'))
const Entreprise = lazy(() => import('./pages/Entreprise'))
const Recrutement = lazy(() => import('./pages/Recrutement'))

export default function App() {
  const [route, setRoute] = useState('home')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showFlyingCode, setShowFlyingCode] = useState(true)
  const [ecoMode, setEcoMode] = useState(false)
  const [secretUnlocked, setSecretUnlocked] = useState(false)

  const secretRoutes = ['competences', 'entreprise', 'recrutement']
  const SECRET_KEY = '31MARS2026'

  // Initialiser les effets visuels au montage
  useEffect(() => {
    initEffects()

    const savedEcoMode = window.localStorage.getItem('ecoMode') === '1'
    const lowPerfDevice = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const shouldEnableEco = savedEcoMode || lowPerfDevice || reducedMotion
    setEcoMode(shouldEnableEco)

    // Debloque les pages secretes via URL, ex: ?key=31MARS2026&page=competences
    const params = new URLSearchParams(window.location.search)
    const secretKey = params.get('key') || params.get('secret')
    const page = params.get('page')
    const hasSecretAccess = secretKey === SECRET_KEY

    setSecretUnlocked(hasSecretAccess)

    if (page && secretRoutes.includes(page) && hasSecretAccess) {
      setRoute(page)
    }

    const mobileOrReduced = window.matchMedia('(max-width: 900px), (pointer: coarse), (prefers-reduced-motion: reduce)')
    const syncExperienceMode = () => {
      const shouldReduce = mobileOrReduced.matches
      setShowFlyingCode(!shouldReduce)

      if (shouldReduce && soundManager.enabled) {
        const enabled = soundManager.toggle()
        setSoundEnabled(enabled)
      }
    }

    syncExperienceMode()

    if (mobileOrReduced.addEventListener) {
      mobileOrReduced.addEventListener('change', syncExperienceMode)
    } else if (mobileOrReduced.addListener) {
      mobileOrReduced.addListener(syncExperienceMode)
    }

    return () => {
      if (mobileOrReduced.removeEventListener) {
        mobileOrReduced.removeEventListener('change', syncExperienceMode)
      } else if (mobileOrReduced.removeListener) {
        mobileOrReduced.removeListener(syncExperienceMode)
      }
    }

  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('eco-mode', ecoMode)
    window.localStorage.setItem('ecoMode', ecoMode ? '1' : '0')
    if (ecoMode) {
      setShowFlyingCode(false)
    }
  }, [ecoMode])

  useEffect(() => {
    if (!secretUnlocked && secretRoutes.includes(route)) {
      setRoute('home')
    }
  }, [route, secretUnlocked])

  const handleNavigation = (newRoute) => {
    soundManager.playBeep(600, 0.08)
    setRoute(newRoute)
  }

  const toggleSound = () => {
    const enabled = soundManager.toggle()
    setSoundEnabled(enabled)
    if (enabled) {
      soundManager.playSuccess()
    }
  }

  return (
    <div className="terminal-root">
      <Header />
      <Sidebar currentRoute={route} onNavigate={handleNavigation} showSecretPages={secretUnlocked} />
      
      <Suspense fallback={<div style={{ padding: '1rem 1.5rem', color: '#8aff8a' }}>Chargement de la page...</div>}>
        {route === 'home' && <Home onEnter={() => handleNavigation('about')} />}
        {route === 'about' && <About />}
        {route === 'projects' && <Projects />}
        {route === 'contact' && <Contact />}
        {route === 'tools' && <Tools />}
        {route === 'blog' && <Blog />}
        {route === 'competences' && <Competences />}
        {route === 'entreprise' && <Entreprise />}
        {route === 'recrutement' && <Recrutement />}
        {route === 'graph3d' && <Graph3D onNavigate={handleNavigation} />}
      </Suspense>
      
      <Footer />
      
      {/* Code volant en arrière-plan */}
      {showFlyingCode && <FlyingCode />}
      
      {/* Bouton de contrôle du son */}
      <button 
        className={`sound-control ${soundEnabled ? '' : 'muted'}`}
        onClick={toggleSound}
        title={soundEnabled ? "Désactiver les sons" : "Activer les sons"}
      >
        {soundEnabled ? '[SOUND-ON] SON' : '[SOUND-OFF] SON'}
      </button>

      <button
        className={`eco-control ${ecoMode ? 'active' : ''}`}
        onClick={() => setEcoMode((prev) => !prev)}
        title={ecoMode ? 'Désactiver le mode éco' : 'Activer le mode éco'}
      >
        {ecoMode ? '[ECO-ON]' : '[ECO-OFF]'}
      </button>
    </div>
  )
}
