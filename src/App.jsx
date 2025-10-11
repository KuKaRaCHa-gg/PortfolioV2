import React, { useState, useEffect } from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Tools from './pages/Tools'
import Blog from './pages/Blog'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import FlyingCode from './components/FlyingCode'
import { initEffects } from './utils/effects'
import soundManager from './utils/soundManager'

export default function App() {
  const [route, setRoute] = useState('home')
  const [soundEnabled, setSoundEnabled] = useState(true)

  // Initialiser les effets visuels au montage
  useEffect(() => {
    initEffects()
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
      <Sidebar currentRoute={route} onNavigate={handleNavigation} />
      
      {route === 'home' && <Home onEnter={() => handleNavigation('projects')} />}
      {route === 'about' && <About />}
      {route === 'projects' && <Projects />}
      {route === 'contact' && <Contact />}
      {route === 'tools' && <Tools />}
      {route === 'blog' && <Blog />}
      
      <Footer />
      
      {/* Code volant en arrière-plan */}
      <FlyingCode />
      
      {/* Bouton de contrôle du son */}
      <button 
        className={`sound-control ${soundEnabled ? '' : 'muted'}`}
        onClick={toggleSound}
        title={soundEnabled ? "Désactiver les sons" : "Activer les sons"}
      >
        {soundEnabled ? '🔊 SON' : '🔇 SON'}
      </button>
    </div>
  )
}
