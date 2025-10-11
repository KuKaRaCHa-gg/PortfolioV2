import React, { useState, useEffect } from 'react'
import Typewriter from '../shared/Typewriter'
import soundManager from '../utils/soundManager'

export default function Home({ onEnter }) {
  const [bootComplete, setBootComplete] = useState(false)

  useEffect(() => {
    // Jouer séquence de boot sonore
    soundManager.playBootSequence()
    
    // Simule la séquence de boot terminale - ACCÉLÉRÉ
    const timer = setTimeout(() => {
      setBootComplete(true)
      soundManager.playSuccess()
    }, 1200) // Boot terminé après 1.2s au lieu de 2s

    return () => clearTimeout(timer)
  }, [])

  const handleEnter = () => {
    soundManager.playBeep(1000, 0.15)
    if (onEnter) onEnter()
  }

  return (
    <div className="terminal-screen">
      <div className="terminal-frame">
        {/* Logo d'accueil */}
        <div className="home-logo-container">
          <img src="/images/PP&logo/LogoRond.png" alt="Logo Daniil" className="home-logo" />
        </div>

        {/* Boot sequence */}
        <div className="boot-sequence">
          <p>[OK] Initialisation du système...</p>
          <p>[OK] Chargement du profil...</p>
          <div className="loading-bar"></div>
        </div>

        {/* Affiche le typewriter seulement après boot */}
        {bootComplete && (
          <>
            <Typewriter 
              lines={[
                "Bienvenue sur le portfolio de Daniil Minevich",
                "Développeur Full Stack - Codeur Rétro",
                "Appuyez sur Entrée pour continuer..."
              ]} 
              speed={25}
              enableSound={true}
            />
            <div className="enter-row">
              <button className="enter-btn" onClick={handleEnter}>Entrer</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
