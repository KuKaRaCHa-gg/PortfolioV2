import React, { useState } from 'react'
import ObsidianGraph3D from '../components/ObsidianGraph3D'
import ExplorerWindow from '../components/ExplorerWindow'
import '../styles/graph3d.css'

export default function Graph3D({ onNavigate }) {
  const [isPlaying, setIsPlaying] = useState(true)

  const quickNodes = [
    { label: 'Portfolio', route: 'home' },
    { label: 'A Propos', route: 'about' },
    { label: 'Projets', route: 'projects' },
    { label: 'Contact', route: 'contact' },
    { label: 'Outils & Jeux', route: 'tools' },
    { label: 'Blog', route: 'blog' }
  ]

  return (
    <div className="terminal-screen graph3d-screen">
      <ExplorerWindow title="Graph 3D" path="C:\\Portfolio\\Graph3D" status="3D map connected" className="terminal-frame graph3d-frame">
        <div className="graph3d-header">
          <h2>Graph - Navigation visuelle</h2>
          <p>
            Cliquer sur un noeud pour naviguer · Glisser pour tourner · Molette pour zoomer
          </p>
          <div className="graph3d-status-row">
            <span>● Portfolio</span>
            <span>● A Propos</span>
            <span>● Projets</span>
            <span>● Contact</span>
            <span>● Outils & Jeux</span>
            <span>● Blog</span>
          </div>
        </div>

        <div className="graph3d-quick-links">
          <button className={`graph3d-control-btn play ${isPlaying ? 'playing' : ''}`} onClick={() => setIsPlaying((prev) => !prev)}>
            {isPlaying ? 'Pause animation' : 'Lancer animation'}
          </button>
          <button className="graph3d-control-btn back" onClick={() => onNavigate('home')}>
            Retour accueil
          </button>
          {quickNodes.map((node) => (
            <button key={node.route} className="graph3d-quick-link" onClick={() => onNavigate(node.route)}>
              {node.label}
            </button>
          ))}
        </div>

        <ObsidianGraph3D onNavigate={onNavigate} isPaused={!isPlaying} />

        <div className="graph3d-help">
          <span>Les branches restent visibles pour montrer que toutes les pages sont connectees.</span>
        </div>
      </ExplorerWindow>
    </div>
  )
}
