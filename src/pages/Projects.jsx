import React, { useEffect, useState } from 'react'
import soundManager from '../utils/soundManager'
import AdvancedThreeScene from '../components/AdvancedThreeScene'
import ProjectCard from '../components/ProjectCard'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    // Edit `public/projects.json` to add or update projects displayed here
    fetch('/projects.json')
      .then(r => r.json())
      .then(setProjects)
      .catch(() => setProjects([]))
  }, [])

  // Extraire les technologies uniques pour les filtres
  const allTechs = [...new Set(projects.flatMap(p => p.stack || []))]

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.stack && p.stack.includes(filter))

  return (
    <div className="terminal-screen">
      <div className="terminal-frame projects">
        <h2>Projets Portfolio</h2>
        
        {/* Scène 3D avancée avec particules et interactions */}
        <div className="three-scene-container mobile-hide" style={{marginBottom:30}}>
          <h3>Visualisation 3D Interactive</h3>
          <AdvancedThreeScene />
          <p style={{fontSize:'0.8em', opacity:0.7, marginTop:10, textAlign:'center'}}>
            💡 Déplacez votre souris et cliquez sur les objets 3D pour interagir
          </p>
        </div>

        {/* Filtres de technologies */}
        <div className="project-filters mobile-hide" style={{margin:'2rem 0', width:'100%', maxWidth:'100%', overflow:'hidden'}}>
          <div className="command-prompt" style={{marginBottom:'1rem'}}>
            {'>'} Filtrer par technologie:
          </div>
          <div style={{display:'flex', flexWrap:'wrap', gap:'0.5rem', width:'100%'}}>
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => {
                setFilter('all')
                soundManager.playClick()
              }}
              onMouseEnter={() => soundManager.playHover()}
              style={{
                background: filter === 'all' ? 'var(--text)' : 'transparent',
                color: filter === 'all' ? '#000' : 'var(--text)',
                border: '1px solid var(--text)',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '0.9rem',
                whiteSpace: 'nowrap'
              }}
            >
              Tous ({projects.length})
            </button>
            {allTechs.map(tech => (
              <button 
                key={tech}
                className={`filter-btn ${filter === tech ? 'active' : ''}`}
                onClick={() => {
                  setFilter(tech)
                  soundManager.playClick()
                }}
                onMouseEnter={() => soundManager.playHover()}
                style={{
                  background: filter === tech ? 'var(--text)' : 'transparent',
                  color: filter === tech ? '#000' : 'var(--text)',
                  border: '1px solid var(--text)',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: '0.9rem',
                  whiteSpace: 'nowrap'
                }}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Grille de cartes de projets */}
        <div className="projects-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, i) => (
              <ProjectCard key={i} project={project} index={i} />
            ))
          ) : (
            <div className="no-projects" style={{
              textAlign:'center', 
              padding:'3rem', 
              border:'2px dashed var(--text)',
              gridColumn: '1 / -1'
            }}>
              <p>Aucun projet trouvé pour ce filtre.</p>
              <button 
                onClick={() => setFilter('all')}
                style={{
                  marginTop:'1rem',
                  background:'var(--text)',
                  color:'#000',
                  border:'none',
                  padding:'0.5rem 1.5rem',
                  cursor:'pointer'
                }}
              >
                Réinitialiser le filtre
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
