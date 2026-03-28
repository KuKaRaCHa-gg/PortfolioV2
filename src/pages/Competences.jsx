import React, { useEffect, useMemo, useState } from 'react'
import ExplorerWindow from '../components/ExplorerWindow'
import soundManager from '../utils/soundManager'
import '../styles/competences.css'

export default function Competences() {
  const [years, setYears] = useState([])
  const [selectedYear, setSelectedYear] = useState(0)
  const [selectedCompetence, setSelectedCompetence] = useState(0)

  useEffect(() => {
    fetch('/competences.json')
      .then((res) => res.json())
      .then((data) => {
        setYears(data.years || [])
        const year2Index = (data.years || []).findIndex((y) => y.id === 'annee2')
        setSelectedYear(year2Index >= 0 ? year2Index : 0)
        setSelectedCompetence(0)
      })
      .catch((err) => {
        console.error('Erreur chargement competences:', err)
        soundManager.playError()
      })
  }, [])

  const currentYear = useMemo(() => years[selectedYear], [years, selectedYear])
  const currentCompetence = useMemo(() => {
    if (!currentYear || !currentYear.competences || currentYear.competences.length === 0) {
      return null
    }
    return currentYear.competences[selectedCompetence] || null
  }, [currentYear, selectedCompetence])

  const getCurrentStep = (ac) => {
    const acKey = `${currentYear?.id || 'x'}-${currentCompetence?.id || 'x'}-${ac.id}`

    // AC volontairement laissées en progression pour refléter l'etat reel.
    const forcedInProgress = new Set([
      'annee1-1-AC3',
      'annee1-2-AC2',
      'annee1-3-AC4',
      'annee2-1-AC2',
      'annee2-2-AC4',
      'annee2-5-AC4',
      'annee2-6-AC3',
      'annee2-7-AC1',
      'annee2-7-AC3'
    ])

    if (forcedInProgress.has(acKey)) {
      return 2
    }

    const text = `${ac.title} ${(ac.levels?.nonAcquis || []).join(' ')}`.toLowerCase()
    const isIncomplete =
      text.includes('à compléter') ||
      text.includes('veuillez configurer le bloc') ||
      text.includes('contenu à compléter')

    // Par défaut: acquis. Les AC incomplètes restent en cours.
    return isIncomplete ? 2 : 3
  }

  const getRowCount = (ac) =>
    Math.max(
      (ac.levels?.nonAcquis || []).length,
      (ac.levels?.enCours || []).length,
      (ac.levels?.acquis || []).length
    )

  const getRowSelection = (ac, rowIndex) => {
    const acKey = `${currentYear?.id || 'x'}-${currentCompetence?.id || 'x'}-${ac.id}`

    // Selection ligne par ligne: 1=Non acquis, 2=En cours, 3=Acquis.
    const forcedRowsInProgress = {
      'annee1-1-AC3': [0, 1],
      'annee1-2-AC2': [1],
      'annee1-3-AC4': [0],
      'annee2-1-AC2': [0],
      'annee2-2-AC4': [1],
      'annee2-5-AC4': [0],
      'annee2-6-AC3': [0],
      'annee2-7-AC1': [0, 1],
      'annee2-7-AC3': [1]
    }

    if ((forcedRowsInProgress[acKey] || []).includes(rowIndex)) {
      return 2
    }

    const nonAcquisLine = (ac.levels?.nonAcquis || [])[rowIndex] || ''
    const enCoursLine = (ac.levels?.enCours || [])[rowIndex] || ''
    const acquisLine = (ac.levels?.acquis || [])[rowIndex] || ''
    const all = `${nonAcquisLine} ${enCoursLine} ${acquisLine}`.toLowerCase()

    const isIncomplete =
      all.includes('à compléter') ||
      all.includes('veuillez configurer le bloc') ||
      all.includes('contenu à compléter')

    return isIncomplete ? 2 : 3
  }

  const inProgressAcs = useMemo(() => {
    if (!currentCompetence) {
      return []
    }

    return currentCompetence.acs
      .filter((ac) => {
        const rowCount = getRowCount(ac)
        for (let i = 0; i < rowCount; i += 1) {
          if (getRowSelection(ac, i) === 2) return true
        }
        return false
      })
      .map((ac) => ({ id: ac.id, title: ac.title }))
  }, [currentCompetence])

  const handleYearChange = (idx) => {
    soundManager.playNavigation()
    setSelectedYear(idx)
    setSelectedCompetence(0)
  }

  const handleCompetenceChange = (idx) => {
    soundManager.playClick()
    setSelectedCompetence(idx)
  }

  if (!years.length) {
    return <div className="competences-loading">Chargement des competences...</div>
  }

  return (
    <div className="competences-page">
      <ExplorerWindow
        title="Competences"
        path="C:\\Portfolio\\Competences"
        status="Tri par annee et tableaux AC"
        className="competences-window"
      >
        <div className="competences-content">
          <div className="year-tabs">
            {years.map((year, idx) => (
              <button
                key={year.id}
                className={`year-tab ${selectedYear === idx ? 'active' : ''}`}
                onClick={() => handleYearChange(idx)}
                onMouseEnter={() => soundManager.playHover()}
                type="button"
              >
                {year.label}
              </button>
            ))}
          </div>

          {currentYear && currentYear.competences && currentYear.competences.length > 0 ? (
            <>
              <div className="competence-nav">
                {currentYear.competences.map((comp, idx) => (
                  <button
                    key={`${currentYear.id}-${comp.id}`}
                    className={`comp-nav-btn ${selectedCompetence === idx ? 'active' : ''}`}
                    onClick={() => handleCompetenceChange(idx)}
                    type="button"
                  >
                    Competence {comp.id}
                  </button>
                ))}
              </div>

              {currentCompetence && (
                <div className="competence-page">
                  <div className="competence-page-head">
                    <h2>{currentCompetence.title}</h2>
                    <p>{currentCompetence.description}</p>
                    <p className="page-counter">
                      Page {selectedCompetence + 1}/{currentYear.competences.length}
                    </p>
                  </div>

                  <section className="legend-block" aria-label="Légende des tableaux de compétences">
                    <h3>Légende du tableau</h3>
                    <div className="legend-grid">
                      <div className="legend-item legend-na">
                        <strong>Non acquis</strong>
                        <span>Niveau initial de l'AC</span>
                      </div>
                      <div className="legend-item legend-eca">
                        <strong>En cours d'acquisition</strong>
                        <span>Niveau intermédiaire en progression</span>
                      </div>
                      <div className="legend-item legend-a">
                        <strong>Acquis (néon)</strong>
                        <span>Niveau validé et mis en valeur</span>
                      </div>
                    </div>
                    <p className="legend-note">
                      Évaluation figée (non modifiable): niveau actuel défini sur Acquis, sauf quelques AC en En cours.
                    </p>
                  </section>

                  <section className="in-progress-block" aria-label="Compétences actuellement en cours">
                    <h3>AC actuellement en cours d'acquisition</h3>
                    {inProgressAcs.length === 0 ? (
                      <p>Aucune AC en cours sur cette compétence.</p>
                    ) : (
                      <ul>
                        {inProgressAcs.map((item) => (
                          <li key={item.id}>{item.id} - {item.title}</li>
                        ))}
                      </ul>
                    )}
                  </section>

                  <div className="acs-list">
                    {currentCompetence.acs.map((ac) => {
                      const currentStep = getCurrentStep(ac)
                      const rowCount = getRowCount(ac)

                      return (
                      <section key={`${currentCompetence.id}-${ac.id}`} className="ac-section">
                        <h3>
                          {ac.id} - {ac.title}
                        </h3>

                        <div className="ac-step-selector read-only" aria-label={`Niveau actuel ${ac.id}`}>
                          <span>Niveau actuel :</span>
                          <span className={`step-pill ${currentStep === 1 ? 'active' : ''}`}>Non acquis</span>
                          <span className={`step-pill ${currentStep === 2 ? 'active' : ''}`}>En cours</span>
                          <span className={`step-pill ${currentStep === 3 ? 'active' : ''}`}>Acquis</span>
                        </div>

                        <div className="table-wrap">
                          <table className="ac-table">
                            <caption>
                              Tableau d'évaluation - {ac.id}
                            </caption>
                            <thead>
                              <tr>
                                <th className="col-na">Non acquis</th>
                                <th className="col-eca">En cours d'acquisition</th>
                                <th className="col-a">Acquis</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Array.from({ length: rowCount }).map((_, rowIndex) => {
                                const rowSelection = getRowSelection(ac, rowIndex)
                                const naText = (ac.levels?.nonAcquis || [])[rowIndex] || '—'
                                const ecText = (ac.levels?.enCours || [])[rowIndex] || '—'
                                const aText = (ac.levels?.acquis || [])[rowIndex] || '—'

                                return (
                                  <tr key={`${ac.id}-row-${rowIndex}`}>
                                    <td className="cell-na">
                                      <p className={`criterion-text statement-na ${rowSelection === 1 ? 'neon-selected' : ''}`}>{naText}</p>
                                    </td>
                                    <td className="cell-eca">
                                      <p className={`criterion-text statement-eca ${rowSelection === 2 ? 'neon-selected' : ''}`}>{ecText}</p>
                                    </td>
                                    <td className="cell-a">
                                      <p className={`criterion-text statement-a ${rowSelection === 3 ? 'neon-selected' : ''}`}>{aText}</p>
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </section>
                    )})}
                  </div>

                  {currentCompetence.evidences && currentCompetence.evidences.length > 0 && (
                    <section className="evidences-block">
                      <h3>Emplacement / Preuves</h3>
                      <ul>
                        {currentCompetence.evidences.map((evidence, idx) => (
                          <li key={`ev-${idx}`}>{evidence}</li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {currentCompetence.comment && (
                    <section className="comment-block">
                      <h3>Commentaire</h3>
                      <p>{currentCompetence.comment}</p>
                    </section>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="empty-year">
              <h2>{currentYear?.label}</h2>
              <p>Aucune competence renseignee pour cette annee pour le moment.</p>
            </div>
          )}
        </div>
      </ExplorerWindow>
    </div>
  )
}