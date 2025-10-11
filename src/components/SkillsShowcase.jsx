import React, { useState } from 'react'
import soundManager from '../utils/soundManager'
import { asciiLogos, compactLogos } from '../data/asciiLogos'

// Composant Skills amélioré avec logos ASCII animés - SANS barres de progression
export default function SkillsShowcase() {
  const [selectedSkill, setSelectedSkill] = useState(null)

  const skills = [
    { name: 'javascript', category: 'Langages' },
    { name: 'typescript', category: 'Langages' },
    { name: 'python', category: 'Langages' },
    { name: 'java', category: 'Langages' },
    { name: 'c', category: 'Langages' },
    { name: 'cpp', category: 'Langages' },
    { name: 'php', category: 'Web' },
    { name: 'sql', category: 'Bases de données' },
    { name: 'html', category: 'Web' },
    { name: 'css', category: 'Web' },
    { name: 'react', category: 'Frameworks' },
    { name: 'node', category: 'Runtime' },
    { name: 'git', category: 'Outils' },
    { name: 'bash', category: 'Scripts' },
    { name: 'powershell', category: 'Scripts' },
    { name: 'mysql', category: 'Bases de données' },
    { name: 'sqlite', category: 'Bases de données' },
    { name: 'linux', category: 'Systèmes' },
    { name: 'windows', category: 'Systèmes' },
    { name: 'vscode', category: 'Outils' },
    { name: 'wordpress', category: 'CMS' },
    { name: 'kotlin', category: 'Mobile' },
    { name: 'arduino', category: 'IoT' }
  ]

  return (
    <div className="skills-showcase">
      <h2 className="section-title neon-text">💻 COMPÉTENCES TECHNIQUES</h2>
      
      {/* Grille de badges SANS pourcentages */}
      <div className="skills-grid-badges">
        {skills.map((skill, i) => (
          <div 
            key={i}
            className="skill-tag"
            onClick={() => {
              setSelectedSkill(skill)
              soundManager.playOpen()
            }}
            onMouseEnter={() => soundManager.playHover()}
            title={`Cliquez pour voir le logo ASCII ${skill.name.toUpperCase()}`}
          >
            <span className="skill-icon">{compactLogos[skill.name] || '⚡'}</span>
            <span className="skill-name">{skill.name.toUpperCase()}</span>
          </div>
        ))}
      </div>

      {/* Modal ASCII logo complet */}
      {selectedSkill && (
        <div className="modal" onClick={() => {
          setSelectedSkill(null)
          soundManager.playClose()
        }}>
          <div className="modal-inner ascii-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => {
              setSelectedSkill(null)
              soundManager.playClose()
            }}>×</button>
            <pre className="ascii-logo-large">
              {asciiLogos[selectedSkill.name] || '[ Logo non disponible ]'}
            </pre>
            <div className="skill-details">
              <h3>{selectedSkill.name.toUpperCase()}</h3>
              <p className="skill-category">
                <span className="category-badge">{selectedSkill.category}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
