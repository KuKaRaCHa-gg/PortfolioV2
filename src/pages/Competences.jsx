import React, { useState, useEffect } from 'react'
import ExplorerWindow from '../components/ExplorerWindow'
import soundManager from '../utils/soundManager'
import '../styles/competences.css'

export default function Competences() {
  const [competences, setCompetences] = useState([])
  const [selectedCompetence, setSelectedCompetence] = useState(0)
  const [expandedAC, setExpandedAC] = useState(null)

  useEffect(() => {
    // Charger les compétences depuis le JSON
    fetch('/competences.json')
      .then(res => res.json())
      .then(data => {
        setCompetences(data.competences)
        soundManager.playBootSequence()
      })
      .catch(err => {
        console.error('Erreur chargement compétences:', err)
        soundManager.playError()
      })
  }, [])

  if (!competences.length) {
    return <div className="competences-loading">Chargement des compétences...</div>
  }

  const currentCompetence = competences[selectedCompetence]

  const toggleAC = (acId) => {
    soundManager.playClick()
    setExpandedAC(expandedAC === acId ? null : acId)
  }

  const handleCompetenceChange = (index) => {
    soundManager.playNavigation()
    setSelectedCompetence(index)
    setExpandedAC(null)
  }

  return (
    <div className="competences-page">
      <ExplorerWindow 
        title="Compétences" 
        path="C:\\Portfolio\\Competences" 
        status="Portfolio Evaluation System v2.0"
        className="competences-window"
      >
        <div className="competences-content">
          {/* Navigation des compétences */}
          <div className="competences-nav">
            {competences.map((comp, idx) => (
              <button
                key={comp.id}
                className={`comp-nav-btn ${selectedCompetence === idx ? 'active' : ''}`}
                onClick={() => handleCompetenceChange(idx)}
                onMouseEnter={() => soundManager.playHover()}
              >
                <span className="comp-number">C{comp.id}</span>
                <span className="comp-title">{comp.title.split(':')[0]}</span>
              </button>
            ))}
          </div>

          {/* Contenu de la compétence sélectionnée */}
          <div className="competence-details">
            <div className="competence-header">
              <h2>{currentCompetence.title}</h2>
              <p className="competence-desc">{currentCompetence.description}</p>
            </div>

            {/* ACs */}
            <div className="acs-container">
              {currentCompetence.acs.map((ac) => (
                <div key={ac.id} className="ac-card">
                  <div 
                    className="ac-header"
                    onClick={() => toggleAC(ac.id)}
                    role="button"
                    tabIndex="0"
                    onKeyPress={(e) => e.key === 'Enter' && toggleAC(ac.id)}
                    aria-label={`${ac.title} - Appuyer pour afficher/masquer`}
                  >
                    <span className="ac-icon">{expandedAC === ac.id ? '▼' : '▶'}</span>
                    <span className="ac-id">{ac.id}</span>
                    <span className="ac-title">{ac.title}</span>
                  </div>

                  {expandedAC === ac.id && (
                    <div className="ac-content">
                      {/* Colonne Non Acquis */}
                      <div className="ac-level non-acquis">
                        <div className="level-header">❌ Non Acquis</div>
                        <ul className="level-items">
                          {ac.levels.nonAcquis.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Colonne En Cours */}
                      <div className="ac-level en-cours">
                        <div className="level-header">🟡 En Cours d'Acquisition</div>
                        <ul className="level-items">
                          {ac.levels.enCours.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Colonne Acquis */}
                      <div className="ac-level acquis">
                        <div className="level-header">✅ Acquis</div>
                        <ul className="level-items">
                          {ac.levels.acquis.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer avec légende */}
            <div className="competences-footer">
              <p className="footer-text">
                💡 Cliquez sur une AC pour afficher les critères de chaque niveau d'acquisition
              </p>
              <p className="footer-note">
                Portfolio d'évaluation des compétences BUT Informatique | Année 2 | Daniil Minevich
              </p>
            </div>
          </div>
        </div>
      </ExplorerWindow>
    </div>
  )
}
