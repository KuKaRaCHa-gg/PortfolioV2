import React from 'react'
import ExplorerWindow from '../components/ExplorerWindow'
import '../styles/professional-pages.css'

const offers = [
  {
    company: 'Numidev',
    desc: 'Développeur fullstack | Bac +3 à Bac +5. WordPress, Symfony, Laravel, React Native, ASP.NET/C#, mobile Android/iOS, SQL.',
    fit: 'Élevé'
  },
  {
    company: 'Ocetic',
    desc: 'Évaluation qualité d architecture logicielle. Etat de l art outils/normes, questionnaire dynamique, interface FR/EN, analyse BigData/Cloud/Web.',
    fit: 'Moyen'
  },
  {
    company: 'Winflotte',
    desc: 'Développement Winflotte 10. CSS, Angular, C#, APIs, collaboration équipe et utilisateurs réels.',
    fit: 'Élevé'
  },
  {
    company: 'Particeep',
    desc: 'Ingénieur test logiciel: stratégie/plans de tests, automatisation, anomalies, suivi mise en production, support client.',
    fit: 'Moyen'
  },
  { company: 'Lactalis', desc: 'Stage développement web: PHP, HTML, JS.', fit: 'Élevé' },
  { company: 'SEAp', desc: 'Stagiaire développement application web. Missions précises à définir.', fit: 'Moyen' },
  {
    company: 'ATWOPI',
    desc: 'Linux Debian, sécurisation, shell, pare-feu, ERP interne (Windev/Webdev), modifications mobile et webservices.',
    fit: 'Moyen'
  },
  {
    company: 'KALYA',
    desc: 'Refonte back-office Angular/Lumen, optimisation processus, dataflow Python/SQL, produits Kalya Research et Kalya Pro.',
    fit: 'Moyen'
  },
  { company: 'Abys', desc: 'Tests fonctionnels logiciels médicaux, scénarios, validation évolutions, conformité CE/FDA.', fit: 'Moyen' },
  {
    company: 'VINCI',
    desc: 'Applications C# .NET sous SharePoint, conception/réalisation tests, stack C#, HTML, JS, CSS, Office365.',
    fit: 'Moyen'
  },
  { company: 'Isatech', desc: 'Assistant consultant technique: Microsoft Dynamics 365, tests, maintenance corrective, support client.', fit: 'Moyen' },
  {
    company: 'IETR',
    desc: 'Contrôle-commande industriel: Python, interfaces dispositifs laser, implémentation STM32.',
    fit: 'Élevé'
  },
  {
    company: 'LIUM',
    desc: 'Développement/amélioration applications web et back-office: PHP, MySQL, JS, CSS, Git, API XML.',
    fit: 'Élevé'
  }
]

const myChoices = [
  { company: 'Numidev', reason: 'Pas loin de chez moi, missions intéressantes.', note: 'Priorité haute' },
  { company: 'Ocetic', reason: 'Beaucoup de test/évaluation, moins orienté dev pur.', note: 'Priorité basse' },
  { company: 'Winflotte', reason: 'Equipe d ingénieurs, environnement formateur.', note: 'Priorité haute' },
  { company: 'Particeep', reason: 'Fortement orienté tests.', note: 'Priorité basse' },
  { company: 'Lactalis', reason: 'Proche de chez moi, développement web utile pour progresser.', note: 'Priorité haute' },
  { company: 'SEAp', reason: 'Peu d informations disponibles sur la mission.', note: 'A confirmer' },
  { company: 'ATWOPI', reason: 'Assez proche de mon alternance actuelle.', note: 'A considérer' },
  { company: 'KALYA', reason: 'Projet existant + dataflow, intéressant techniquement.', note: 'A considérer' },
  { company: 'Abys', reason: 'Encore beaucoup de tests fonctionnels.', note: 'Priorité basse' },
  { company: 'VINCI', reason: 'Présence de tests mais permet de découvrir d autres technos.', note: 'A considérer' },
  { company: 'Isatech', reason: 'Travail sur un existant en contexte client.', note: 'A considérer' },
  { company: 'IETR', reason: 'Charge technique forte, environnement stimulant.', note: 'Intéressant' },
  { company: 'LIUM', reason: 'Missions web concrètes et variées.', note: 'Intéressant' }
]

const recrutmentImages = [
  '/images/CompetancesETC/Recrutment/Daniil MINEVICH CV .png',
  '/images/CompetancesETC/Recrutment/carte de visite.png',
  '/images/CompetancesETC/Recrutment/organisationsecheSI.png',
  '/images/CompetancesETC/Recrutment/Seché.png',
  '/images/CompetancesETC/Recrutment/workflow.png'
]

export default function Recrutement() {
  const resolveAssetPath = (path) => {
    if (!path || /^https?:\/\//i.test(path)) return path
    return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
  }

  return (
    <div className="pro-page">
      <ExplorerWindow
        title="Recrutement"
        path="C:\\Portfolio\\Recrutement"
        status="Veille offres et avis"
        className="pro-window"
      >
        <div className="pro-content">
          <h2>Recrutement</h2>
          <p className="muted">Veille d annonces, sélection des offres et justification de mes choix</p>

          <section className="pro-legend" aria-label="Légende des tableaux de recrutement">
            <h3>Légende</h3>
            <ul>
              <li><strong>Fit élevé:</strong> forte cohérence avec ton profil et objectifs</li>
              <li><strong>Fit moyen:</strong> intéressant mais à valider selon mission exacte</li>
              <li><strong>Mon avis:</strong> justification personnelle de sélection</li>
            </ul>
          </section>

          <section className="pro-block">
            <h3>Offres ciblées avec annonces intéressantes</h3>
            <div className="pro-table-wrap">
              <table className="pro-table">
                <thead>
                  <tr>
                    <th>Entreprise</th>
                    <th>Description</th>
                    <th>Fit</th>
                  </tr>
                </thead>
                <tbody>
                  {offers.map((offer) => (
                    <tr key={offer.company}>
                      <td>{offer.company}</td>
                      <td>{offer.desc}</td>
                      <td>
                        <span className={`fit-badge ${offer.fit === 'Élevé' ? 'fit-high' : 'fit-mid'}`}>
                          {offer.fit}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="pro-block">
            <h3>Explication de mes choix</h3>
            <div className="pro-table-wrap">
              <table className="pro-table">
                <thead>
                  <tr>
                    <th>Entreprise</th>
                    <th>Pourquoi ce choix</th>
                    <th>Priorité</th>
                  </tr>
                </thead>
                <tbody>
                  {myChoices.map((choice) => (
                    <tr key={choice.company}>
                      <td>{choice.company}</td>
                      <td>{choice.reason}</td>
                      <td>{choice.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="pro-block">
            <h3>Emplacements</h3>
            <div className="pro-image-grid">
              {recrutmentImages.map((imgPath) => {
                const label = imgPath.split('/').pop() || 'Image'
                const displayPath = encodeURI(resolveAssetPath(imgPath))
                return (
                  <a key={imgPath} href={displayPath} target="_blank" rel="noreferrer" className="pro-image-card">
                    <img src={displayPath} alt={label} width="960" height="540" loading="lazy" decoding="async" />
                    <span>{label}</span>
                  </a>
                )
              })}
            </div>
          </section>
        </div>
      </ExplorerWindow>
    </div>
  )
}
