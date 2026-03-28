import React, { useState, useEffect } from 'react'
import Typewriter from '../shared/Typewriter'
import soundManager from '../utils/soundManager'
import ExplorerWindow from '../components/ExplorerWindow'

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

  useEffect(() => {
    if (!bootComplete || !onEnter) return

    const autoNavigate = setTimeout(() => {
      onEnter()
    }, 1000)

    return () => clearTimeout(autoNavigate)
  }, [bootComplete, onEnter])

  const handleEnter = () => {
    soundManager.playBeep(1000, 0.15)
    if (onEnter) onEnter()
  }

  return (
    <div className="terminal-screen">
      <ExplorerWindow title="Home" path="C:\\Portfolio\\Home" status="Session ready" className="terminal-frame home-hero-window">
        <div className="ultra-home-layout">
          <div className="ultra-home-left">
            <h1 className="ultra-title">Daniil Minevich - Portfolio Terminal</h1>
            <p className="ultra-subtitle">Développeur Full Stack - Interface Rétro Terminal</p>

            <div className="boot-sequence">
              <p>[OK] PROFILE INITIALIZED</p>
              <p>[OK] PROJECT INDEX READY</p>
              <p>READY - PRESS ENTER TO CONTINUE</p>
              <div className="loading-bar"></div>
            </div>

            {bootComplete ? (
              <div className="ultra-menu" role="navigation" aria-label="Menu principal du portfolio">
                <button 
                  className="ultra-menu-btn primary" 
                  onClick={handleEnter}
                  aria-label="Entrer dans le portfolio - Accès au contenu principal"
                >
                  ENTER
                </button>
                <button 
                  className="ultra-menu-btn" 
                  type="button"
                  aria-label="Voir mes projets"
                >
                  PROJECTS
                </button>
                <button 
                  className="ultra-menu-btn" 
                  type="button"
                  aria-label="Accès aux jeux et outils interactifs"
                >
                  TOOLS
                </button>
                <button 
                  className="ultra-menu-btn" 
                  type="button"
                  aria-label="Formulaire de contact"
                >
                  CONTACT
                </button>
              </div>
            ) : (
              <Typewriter
                lines={[
                  'Bienvenue sur le portfolio de Daniil Minevich',
                  'Developpeur Full Stack - Interface Retro',
                  'Preparation du menu personnel...'
                ]}
                speed={20}
                enableSound={true}
              />
            )}
          </div>

          <div className="ultra-home-right">
            <img src="/images/PP&logo/LogoRond.png" alt="Logo Daniil" className="home-logo" />
          </div>
        </div>
      </ExplorerWindow>
    </div>
  )
}
