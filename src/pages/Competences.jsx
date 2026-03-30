import React, { useEffect, useMemo, useState } from 'react'
import ExplorerWindow from '../components/ExplorerWindow'
import soundManager from '../utils/soundManager'
import '../styles/competences.css'

export default function Competences() {
  const [years, setYears] = useState([])
  const [selectedYear, setSelectedYear] = useState(0)
  const [selectedCompetence, setSelectedCompetence] = useState(0)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}competences.json`)
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

  const getEvidenceLabel = (path, idx) => {
    if (!path) return `Preuve ${idx + 1}`
    const raw = path.split('/').pop() || `Preuve ${idx + 1}`
    return raw.replace(/\.[^.]+$/, '')
  }

  const getEvidenceDescription = (path, idx) => {
    const label = getEvidenceLabel(path, idx)
    return `Description: ${label.replace(/[_-]+/g, ' ')}`
  }

  const getEvidenceList = (comp) => {
    if (!comp?.evidences) return []
    return Array.isArray(comp.evidences) ? comp.evidences : [comp.evidences]
  }

  const toDisplayPath = (path) => {
    if (!path) return ''
    if (/^https?:\/\//i.test(path)) return path
    return encodeURI(`${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`)
  }

  const getCompetenceDescription = (comp, year, pageIndex, total) => {
    const baseById = {
      1: 'Concevoir, coder, tester et livrer une application robuste orientee utilisateur.',
      2: 'Analyser et optimiser les solutions pour ameliorer performance, qualite et maintenabilite.',
      3: 'Installer, configurer et securiser les environnements systemes et reseaux.',
      4: 'Structurer, exploiter et valoriser les donnees pour la decision et le pilotage.',
      5: 'Planifier, coordonner et suivre un projet informatique avec une methode claire.',
      6: 'Collaborer efficacement en equipe et valoriser sa contribution professionnelle.',
      7: 'Communiquer avec clarte a l ecrit et a l oral selon le contexte professionnel.'
    }
    const id = Number(comp?.id)
    const base = baseById[id] || comp?.description || ''
    return `${year?.label || 'Annee'} - Page ${pageIndex + 1}/${total}. ${base}`
  }

  const getAcShortDescription = (ac) => {
    const title = (ac?.title || '').toLowerCase()

    if (title.includes('interface')) return 'Concevoir une interface lisible, fluide et adaptee a l utilisateur.'
    if (title.includes('test') || title.includes('essai') || title.includes('valider')) return 'Definir des tests pertinents et conclure avec des resultats exploitables.'
    if (title.includes('algorith') || title.includes('optimis') || title.includes('complexit')) return 'Comparer les approches et justifier la solution la plus efficace.'
    if (title.includes('donnee') || title.includes('base de donnees')) return 'Modeliser et manipuler des donnees fiables, securisees et utiles.'
    if (title.includes('systeme') || title.includes('reseau') || title.includes('configur') || title.includes('poste')) return 'Installer et configurer un environnement technique stable et securise.'
    if (title.includes('projet') || title.includes('coordination') || title.includes('pilot')) return 'Organiser le travail d equipe et assurer un suivi clair de l avancement.'
    if (title.includes('communication') || title.includes('ecrit') || title.includes('oral') || title.includes('expression')) return 'Produire une communication claire, structuree et adaptee au public cible.'

    return ac?.shortDescription || 'Mettre en oeuvre la competence avec rigueur et justification technique.'
  }

  const getSocioCulturalActivities = (yearId, compId) => {
    const catalog = {
      annee1: {
        7: [
          {
            title: 'Club lecture techno-fiction',
            summary: 'Animation d un mini-club autour de textes de science-fiction pour améliorer vocabulaire et argumentation.',
            impact: 'Renforce la prise de parole et la capacité de synthèse.'
          },
          {
            title: 'Atelier critique de film',
            summary: 'Rédaction d une critique structurée (problématique, argument, conclusion) après projection.',
            impact: 'Améliore l expression écrite et la logique argumentative.'
          },
          {
            title: 'Podcast étudiant',
            summary: 'Enregistrement d un court podcast sur un sujet culturel ou numérique avec conducteur éditorial.',
            impact: 'Travaille la diction, la clarté et la structuration du message oral.'
          }
        ],
        6: [
          {
            title: 'Organisation d un événement campus',
            summary: 'Répartition des rôles, planning, communication interne et bilan collectif.',
            impact: 'Développe coordination, entraide et leadership.'
          }
        ]
      },
      annee2: {
        7: [
          {
            title: 'Journal de veille culturelle',
            summary: 'Publication hebdomadaire de notes courtes: actualité tech, culture numérique, analyse critique.',
            impact: 'Améliore la régularité d écriture et l esprit critique.'
          },
          {
            title: 'Débat encadré FR/EN',
            summary: 'Débat en binôme sur un sujet de société (IA, écologie numérique, inclusion).',
            impact: 'Renforce l argumentation et l adaptation au public.'
          },
          {
            title: 'Exposition photo commentée',
            summary: 'Création d une mini-exposition avec cartels explicatifs et présentation orale.',
            impact: 'Développe narration, sens esthétique et communication multimodale.'
          }
        ],
        5: [
          {
            title: 'Projet solidaire local',
            summary: 'Pilotage d une action associative avec planning, budget et rétrospective.',
            impact: 'Travaille la gestion de projet dans un cadre réel.'
          }
        ]
      },
      annee3: {
        7: [
          {
            title: 'Conférence flash professionnelle',
            summary: 'Présentation de 5 minutes sur un sujet métier avec support visuel sobre.',
            impact: 'Renforce posture pro et capacité de synthèse rapide.'
          },
          {
            title: 'Atelier CV/Portfolio narratif',
            summary: 'Réécriture du parcours sous forme de récit de compétences et preuves contextualisées.',
            impact: 'Valorise l employabilité et la communication de l expérience.'
          },
          {
            title: 'Médiation numérique intergénérationnelle',
            summary: 'Animation d une séance d accompagnement aux outils numériques pour un public non expert.',
            impact: 'Développe pédagogie, écoute active et communication claire.'
          }
        ],
        6: [
          {
            title: 'Coordination événement tech-campus',
            summary: 'Pilotage d une équipe mixte pour organiser une démonstration projet.',
            impact: 'Consolide coordination, communication inter-équipe et restitution finale.'
          }
        ]
      }
    }

    return (catalog[yearId] && catalog[yearId][compId]) || []
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
                <div className="competence-wrapper">
                  <div className="competence-page">
                    <div className="competence-page-head">
                      <h2>{currentCompetence.title}</h2>
                      <p>{getCompetenceDescription(currentCompetence, currentYear, selectedCompetence, currentYear.competences.length)}</p>
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

                    <section className="ac-navigator" aria-label="Vue d'ensemble des AC">
                      <h3>Aperçu des AC</h3>
                      <div className="ac-cards-grid">
                        {currentCompetence.acs.map((ac) => {
                          const currentStep = getCurrentStep(ac)
                          const stepLabel =
                            currentStep === 1
                              ? 'Non acquis'
                              : currentStep === 2
                                ? 'En cours'
                                : 'Acquis'
                          const stepClass =
                            currentStep === 1
                              ? 'status-na'
                              : currentStep === 2
                                ? 'status-eca'
                                : 'status-a'
                          const shortDesc = getAcShortDescription(ac)

                          return (
                            <div key={`card-${ac.id}`} className={`ac-card ${stepClass}`}>
                              <div className="ac-card-header">
                                <span className="ac-id">{ac.id}</span>
                                <span className={`ac-status-badge ${stepClass}`}>{stepLabel}</span>
                              </div>
                              <h4 className="ac-card-title">{ac.title}</h4>
                            {shortDesc && (
                              <p className="ac-card-desc">{shortDesc}</p>
                            )}
                          </div>
                        )
                      })}
                    </div>
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

                  {(() => {
                    const socioActivities = getSocioCulturalActivities(currentYear?.id, Number(currentCompetence?.id))
                    if (socioActivities.length === 0) return null

                    return (
                      <section className="socio-block" aria-label="Activités socio-culturelles proposées">
                        <h3>Activités socio-culturelles proposées</h3>
                        <p className="socio-intro">
                          Suggestions d activités valorisables dans le portfolio pour renforcer les preuves de compétence.
                        </p>
                        <div className="socio-grid">
                          {socioActivities.map((activity, index) => (
                            <article key={`socio-${index}`} className="socio-card">
                              <h4>{activity.title}</h4>
                              <p>{activity.summary}</p>
                              <p className="socio-impact">Impact: {activity.impact}</p>
                            </article>
                          ))}
                        </div>
                      </section>
                    )
                  })()}

                  {getEvidenceList(currentCompetence).length > 0 && (
                    <section className="evidences-block">
                      <h3>Preuves & Ressources</h3>

                      <ul className="evidence-list">
                        {getEvidenceList(currentCompetence).map((ev, idx) => {
                          const isImage = /\.(png|jpe?g|webp|gif)(\?.*)?$/i.test(ev)
                          const label = getEvidenceLabel(ev, idx)
                          const displayPath = toDisplayPath(ev)

                          if (isImage) {
                            return (
                              <li key={`evidence-${idx}`} className="evidence-item evidence-image-item">
                                <a href={displayPath} target="_blank" rel="noreferrer">
                                  <img
                                    src={displayPath}
                                    alt={label}
                                    width="960"
                                    height="540"
                                    loading="lazy"
                                    decoding="async"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none'
                                      const fallback = e.currentTarget.parentElement?.querySelector('.img-fallback')
                                      if (fallback) fallback.style.display = 'block'
                                    }}
                                  />
                                  <span className="img-fallback" style={{ display: 'none' }}>
                                    Image indisponible: {label}
                                  </span>
                                  <span className="evidence-desc">{getEvidenceDescription(ev, idx)}</span>
                                </a>
                              </li>
                            )
                          }

                          return (
                            <li key={`evidence-${idx}`} className="evidence-item">
                              <a href={displayPath} target="_blank" rel="noreferrer">{ev}</a>
                              <span className="evidence-desc">{getEvidenceDescription(ev, idx)}</span>
                            </li>
                          )
                        })}
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