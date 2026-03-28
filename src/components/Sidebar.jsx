import React, { useState } from 'react'
import soundManager from '../utils/soundManager'
import '../styles/sidebar.css'

export default function Sidebar({ currentRoute, onNavigate, showSecretPages = false }) {
  const [isOpen, setIsOpen] = useState(false)

  const baseItems = [
    { id: 'home', icon: 'HOME', label: 'Accueil' },
    { id: 'about', icon: 'USER', label: 'À propos' },
    { id: 'projects', icon: 'CODE', label: 'Projets' },
    { id: 'tools', icon: 'GAME', label: 'Outils & Jeux' },
    { id: 'blog', icon: 'FILE', label: 'Blog' },
    { id: 'contact', icon: 'MAIL', label: 'Contact' },
    { id: 'graph3d', icon: '[GRAPH]', label: 'Graph 3D' }
  ]

  const secretItems = [
    { id: 'competences', icon: '[COMP]', label: 'Compétences' },
    { id: 'entreprise', icon: '[BIZ]', label: 'Entreprise' },
    { id: 'recrutement', icon: '[JOB]', label: 'Recrutement' }
  ]

  const menuItems = showSecretPages ? [...baseItems, ...secretItems] : baseItems

  return (
    <>
      {/* Bouton hamburger mobile */}
      <button 
        className={`sidebar-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => {
          setIsOpen(!isOpen)
          soundManager.playClick()
        }}
        onMouseEnter={() => soundManager.playHover()}
        aria-label={isOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
        aria-expanded={isOpen}
        aria-controls="sidebar-nav"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Overlay mobile */}
      {isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => {
            setIsOpen(false)
            soundManager.playClose()
          }}
          role="presentation"
        />
      )}

      {/* Sidebar */}
      <nav 
        className={`sidebar ${isOpen ? 'open' : ''}`}
        aria-label="Navigation principale"
        id="sidebar-nav"
      >
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-text">MENU</span>
          </div>
        </div>

        <ul className="sidebar-menu">
          {menuItems.map(item => (
            <li key={item.id}>
              <button
                className={`sidebar-item ${currentRoute === item.id ? 'active' : ''}`}
                onClick={() => {
                  onNavigate(item.id)
                  setIsOpen(false)
                  soundManager.playNavigation()
                }}
                onMouseEnter={() => soundManager.playHover()}
              >
                <span className="item-icon">[{item.icon}]</span>
                <span className="item-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="sidebar-footer">
          <div className="sidebar-status">
            <span className="status-dot"></span>
            <span className="status-text">ONLINE</span>
          </div>
          <div className="sidebar-version">v3.0</div>
        </div>
      </nav>
    </>
  )
}
