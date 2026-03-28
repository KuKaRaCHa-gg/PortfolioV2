import React, { lazy, Suspense, useState, useEffect } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import FlyingCode from './components/FlyingCode'
import { initEffects } from './utils/effects'
import soundManager from './utils/soundManager'

const Home = lazy(() => import('./pages/Home'))
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

  const secretRoutes = ['competences', 'entreprise', 'recrutement']

  // Initialiser les effets visuels au montage
  useEffect(() => {
    initEffects()

    // Debloque les pages secretes via URL, ex: ?key=31MARS2026&page=competences
    const params = new URLSearchParams(window.location.search)
    const page = params.get('page')

    if (page && secretRoutes.includes(page)) {
      setRoute(page)
    }

  }, [])

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
      <Sidebar currentRoute={route} onNavigate={handleNavigation} showSecretPages />
      
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
      <FlyingCode />
      
      {/* Bouton de contrôle du son */}
      <button 
        className={`sound-control ${soundEnabled ? '' : 'muted'}`}
        onClick={toggleSound}
        title={soundEnabled ? "Désactiver les sons" : "Activer les sons"}
      >
        {soundEnabled ? '[SOUND-ON] SON' : '[SOUND-OFF] SON'}
      </button>
    </div>
  )
}
