import React, { useState } from 'react'
import ImageGallery from './ImageGallery'

// Composant carte de projet avec image stylée et effets 3D
export default function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setMousePos({ x, y })
  }

  // Calcul de la transformation 3D basée sur la position de la souris
  const tiltStyle = isHovered ? {
    transform: `
      perspective(1000px)
      rotateX(${(mousePos.y - 0.5) * -15}deg)
      rotateY(${(mousePos.x - 0.5) * 15}deg)
      translateZ(20px)
      scale(1.05)
    `
  } : {}

  // Image de fallback si pas d'images
  const thumbnailImage = project.images && project.images.length > 0 
    ? project.images[0].url 
    : `/placeholder-project-${(index % 5) + 1}.jpg`

  return (
    <div 
      className="project-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={tiltStyle}
    >
      {/* Image principale avec overlay */}
      <div className="project-card-image">
        <img 
          src={thumbnailImage} 
          alt={project.title}
          width="600"
          height="400"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            // Fallback local pour éviter une requête externe
            e.target.src = `${import.meta.env.BASE_URL}images/PP&logo/LogoRond.png`
          }}
        />
        <div className="project-card-overlay">
          <div className="project-card-overlay-content">
            <span className="view-icon">👁️</span>
            <p>Voir le projet</p>
          </div>
        </div>
        
        {/* Effet de scanlines sur l'image */}
        <div className="project-scanlines"></div>
        
        {/* Badge "NOUVEAU" si c'est un projet récent */}
        {index < 2 && <div className="project-badge-new">NOUVEAU</div>}
      </div>

      {/* Contenu du projet */}
      <div className="project-card-content">
        <h3 className="project-card-title">
          <span className="project-number">[{String(index + 1).padStart(2, '0')}]</span> {project.title}
        </h3>
        
        <p className="project-card-description">{project.short}</p>
        
        {/* Équipe (si projet collaboratif) */}
        {project.team && project.team.length > 0 && (
          <div className="project-team" style={{margin:'0.5rem 0', fontSize:'0.85rem', opacity:0.8}}>
            <span style={{color:'var(--accent)'}}>👥 Équipe:</span>{' '}
            {project.team.join(', ')}
          </div>
        )}
        
        {/* Stack technique avec badges animés */}
        <div className="project-card-stack">
          <span className="stack-label">{'>'} Stack:</span>
          <div className="stack-tags">
            {(project.stack || []).map((tech, i) => (
              <span key={i} className="stack-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Barre de progression stylée */}
        <div className="project-progress-bar">
          <div 
            className="project-progress-fill" 
            style={{ width: `${85 + Math.random() * 15}%` }}
          ></div>
        </div>

        {/* Galerie d'images (cachée par défaut, visible au clic) */}
        {project.images && project.images.length > 0 && (
          <details className="project-gallery-details">
            <summary>📸 Voir les captures ({project.images.length})</summary>
            <ImageGallery images={project.images} />
          </details>
        )}

        {/* Actions */}
        <div className="project-card-actions">
          {project.github && (
            <button 
              className="project-btn project-btn-primary"
              onClick={() => window.open(project.github, '_blank')}
            >
              <span className="btn-icon">[LINK]</span> GitHub
            </button>
          )}
          <button className="project-btn project-btn-secondary">
            <span className="btn-icon"></span> Détails
          </button>
        </div>
      </div>

      {/* Effet de lueur au hover */}
      {isHovered && (
        <div 
          className="project-glow-spot" 
          style={{
            left: `${mousePos.x * 100}%`,
            top: `${mousePos.y * 100}%`
          }}
        />
      )}
    </div>
  )
}
