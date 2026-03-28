import React from 'react'
import ExplorerWindow from '../components/ExplorerWindow'
import '../styles/professional-pages.css'

const offers = [
  { company: 'Numidev', desc: 'Développeur fullstack: WordPress, Symfony, Laravel, React Native, ASP.NET/C#, SQL', fit: 'Élevé' },
  { company: 'Winflotte', desc: 'Développement Winflotte 10: CSS, Angular, C#, API, travail équipe', fit: 'Élevé' },
  { company: 'Lactalis', desc: 'Stage développement web: PHP, HTML, JS', fit: 'Élevé' },
  { company: 'ATWOPI', desc: 'Linux Debian, sécurité, scripts shell, ERP interne', fit: 'Moyen' },
  { company: 'KALYA', desc: 'Refonte back-office, Angular, Lumen, dataflow Python/SQL', fit: 'Moyen' },
  { company: 'VINCI', desc: 'Applications C# .NET sous SharePoint + tests', fit: 'Moyen' },
  { company: 'IETR', desc: 'Amélioration contrôle-commande industriel, Python, STM32', fit: 'Élevé' },
  { company: 'LIUM', desc: 'Applications web PHP/MySQL/JS/CSS, API XML, Git', fit: 'Élevé' }
]

const myChoices = [
  { company: 'Numidev', reason: 'Proximité et missions variées', note: 'Très intéressant' },
  { company: 'Winflotte', reason: 'Travail équipe ingénieurs, cadre formateur', note: 'Intéressant' },
  { company: 'Lactalis', reason: 'Développement web pour progression', note: 'Intéressant' },
  { company: 'ATWOPI', reason: 'Proche de mon alternance actuelle', note: 'À considérer' },
  { company: 'VINCI', reason: 'Nouveaux langages et environnement structuré', note: 'À considérer' }
]

export default function Recrutement() {
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
          <p className="muted">Veille d'annonces et justification des choix</p>

          <section className="pro-legend" aria-label="Légende des tableaux de recrutement">
            <h3>Légende</h3>
            <ul>
              <li><strong>Fit élevé:</strong> forte cohérence avec ton profil et objectifs</li>
              <li><strong>Fit moyen:</strong> intéressant mais à valider selon mission exacte</li>
              <li><strong>Mon avis:</strong> justification personnelle de sélection</li>
            </ul>
          </section>

          <section className="pro-block">
            <h3>Offres ciblées</h3>
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
            <h3>Mon avis sur les offres</h3>
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
            <h3>Preuves / Emplacements</h3>
            <ul>
              <li>Daniil MINEVICH CV (1).png</li>
              <li>Design sans titre.png</li>
              <li>Capture d'écran 2024-12-17 221347.png</li>
            </ul>
          </section>
        </div>
      </ExplorerWindow>
    </div>
  )
}
