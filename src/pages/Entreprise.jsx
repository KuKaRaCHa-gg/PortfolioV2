import React from 'react'
import ExplorerWindow from '../components/ExplorerWindow'
import '../styles/professional-pages.css'

const entImages = [
  '/images/CompetancesETC/ENT/Daniil MINEVICH CV qr code.png',
  '/images/CompetancesETC/ENT/maquette site.png'
]

export default function Entreprise() {
  return (
    <div className="pro-page">
      <ExplorerWindow
        title="Entreprise"
        path="C:\\Portfolio\\Entreprise"
        status="Dossier entreprise"
        className="pro-window"
      >
        <div className="pro-content">
          <h2>Entreprise</h2>
          <p className="muted">Dossier entreprise: alternance, contexte, réalisations, impact et preuves</p>

          <section className="pro-legend" aria-label="Légende de lecture de la page entreprise">
            <h3>Légende</h3>
            <ul>
              <li><strong>Contexte:</strong> environnement et objectif</li>
              <li><strong>Actions:</strong> ce qui a été réellement produit</li>
              <li><strong>Impact:</strong> résultats concrets pour l'équipe</li>
              <li><strong>Preuves:</strong> captures, liens, livrables</li>
            </ul>
          </section>

          <section className="pro-block">
            <h3>Contexte et liens utiles</h3>
            <ul>
              <li><a href="https://github.com/KuKaRaCHa-gg" target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a href="https://many.link/daniil_minevich" target="_blank" rel="noreferrer">Manylink</a></li>
              <li>QR code accès plein info</li>
            </ul>
            <div className="pro-image-grid">
              {entImages.map((imgPath) => {
                const label = imgPath.split('/').pop() || 'Image'
                return (
                  <a key={imgPath} href={encodeURI(imgPath)} target="_blank" rel="noreferrer" className="pro-image-card">
                    <img src={encodeURI(imgPath)} alt={label} loading="lazy" />
                    <span>{label}</span>
                  </a>
                )
              })}
            </div>
          </section>

          <section className="pro-block">
            <h3>Contexte infrastructure</h3>
            <p>
              Mon site internet est temporairement hors ligne pendant la mise en place d'un serveur
              physique avec Ethan Eveilleaux. Ce serveur hébergera le portfolio et un serveur de jeux.
            </p>
          </section>

          <section className="pro-block">
            <h3>Alternance - Séché Alliance</h3>
            <p>Période : 07/09/2024 - 31/08/2026</p>
            <div className="pro-table-wrap">
              <table className="pro-table">
                <thead>
                  <tr>
                    <th>Contexte</th>
                    <th>Actions</th>
                    <th>Impact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Modernisation des outils internes Workspace EUQ 1</td>
                    <td>Développement d'un outil de supervision des postes</td>
                    <td>Diagnostic plus rapide et meilleure visibilité du parc</td>
                  </tr>
                  <tr>
                    <td>Automatisation des opérations IT</td>
                    <td>Scripts PowerShell et automatisation workflows</td>
                    <td>Réduction des tâches répétitives</td>
                  </tr>
                  <tr>
                    <td>Déploiement applicatif à grande échelle</td>
                    <td>Packaging AppDeploy et déploiements silencieux</td>
                    <td>Standardisation et gain de temps</td>
                  </tr>
                  <tr>
                    <td>Tests CoreView</td>
                    <td>Outil de génération de fichiers CSV</td>
                    <td>Campagnes de test plus rapides et structurées</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="pro-block">
            <h3>Recherche de l alternance</h3>
            <p>
              J ai trouvé cette alternance grâce à mon tuteur IUT, qui m a orienté vers Séché Alliance
              après un premier processus de candidature non retenu ailleurs. Cette mise en relation m a
              permis de passer un entretien où mes compétences en développement et en automatisation ont
              été déterminantes.
            </p>
          </section>

          <section className="pro-block">
            <h3>Déroulement de l alternance</h3>
            <p>
              Intégré à l équipe Workspace EUQ 1, je participe à la modernisation des outils internes,
              au packaging d applications, et à l automatisation de workflows PowerShell. J ai aussi
              progressé sur des outils comme Pytheas/CoreView et je développe un générateur CSV pour
              simplifier les tests de workflows.
            </p>
          </section>

          <section className="pro-block">
            <h3>Preuves / Emplacements</h3>
            <ul>
              <li>Seché.png</li>
              <li>organisationsecheSI.png</li>
              <li>workflow.png</li>
            </ul>
          </section>
        </div>
      </ExplorerWindow>
    </div>
  )
}
