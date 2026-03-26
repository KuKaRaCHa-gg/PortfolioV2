import React, { useState } from 'react'
import ExplorerWindow from '../components/ExplorerWindow'
import '../styles/blog.css'

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState(null)

  const articles = [
    {
      id: 1,
      title: "Introduction aux algorithmes de pathfinding",
      date: "2025-01",
      category: "Algorithmes",
      tags: ["A*", "Dijkstra", "DFS", "BFS"],
      summary: "Exploration détaillée des algorithmes de recherche de chemins avec implémentations et comparaisons de performances.",
      content: `
# Algorithmes de Pathfinding

Les algorithmes de recherche de chemins sont essentiels en informatique...

## A* (A-star)
- Combine heuristique et coût réel
- Optimal et complet
- Performance: O((b^d) log(b^d))

## Dijkstra
- Garantit le chemin le plus court
- Pas d'heuristique
- Explore uniformément

## DFS vs BFS
- DFS: Stack, exploration en profondeur
- BFS: Queue, exploration en largeur
      `
    },
    {
      id: 2,
      title: "Game of Life : Automate cellulaire de Conway",
      date: "2024-12",
      category: "Game Dev",
      tags: ["JavaScript", "Canvas", "Simulation"],
      summary: "Implémentation complète du Game of Life avec patterns classiques et optimisations.",
      content: `
# Game of Life

Automate cellulaire inventé par John Conway en 1970...

## Règles
1. Survie: 2-3 voisins
2. Mort: <2 ou >3 voisins
3. Naissance: exactement 3 voisins
      `
    },
    {
      id: 3,
      title: "PowerShell pour l'administration système",
      date: "2024-04",
      category: "SysAdmin",
      tags: ["PowerShell", "Active Directory", "SCCM"],
      summary: "Scripts PowerShell pour automatiser la gestion de Active Directory et SCCM/MECM en entreprise.",
      content: `
# Administration avec PowerShell

Scripts développés en stage chez ASGL Conseil...

## Active Directory
- Gestion des ordinateurs
- Suppression automatisée
- Rapports CSV

## SCCM/MECM
- Collection management
- Deployment automation
      `
    },
    {
      id: 4,
      title: "React Hooks: useState et useEffect",
      date: "2024-11",
      category: "Web Dev",
      tags: ["React", "Hooks", "JavaScript"],
      summary: "Guide pratique des hooks React les plus utilisés avec exemples concrets.",
      content: `
# React Hooks Essentiels

## useState
Gestion d'état local dans les composants fonctionnels...

## useEffect
Effets de bord et cycle de vie...
      `
    }
  ]

  return (
    <div className="terminal-screen blog-page">
      <ExplorerWindow title="Blog" path="C:\\Portfolio\\Blog" status="Articles available" className="terminal-frame">
        <div className="blog-header">
          <h1 className="glitch-text" data-text="BLOG & ACTUALITÉS">BLOG & ACTUALITÉS</h1>
          <p className="terminal-text">Articles techniques et actualités professionnelles</p>
        </div>

        {/* Section LinkedIn Feed */}
        <div className="linkedin-section">
          <h2 className="section-title neon-text">[SOCIAL] MES ACTUALITÉS LINKEDIN</h2>
          <div className="linkedin-embed-container">
            {/* Badge LinkedIn Profile */}
            <div className="badge-base LI-profile-badge" data-locale="fr_FR" data-size="large" data-theme="dark" data-type="HORIZONTAL" data-vanity="daniil-minevich" data-version="v1">
              <a className="badge-base__link LI-simple-link" href="https://fr.linkedin.com/in/daniil-minevich?trk=profile-badge">Daniil Minevich</a>
            </div>
          </div>
          <p className="terminal-text" style={{textAlign: 'center', margin: '2rem 0'}}>
            [STATS] <strong>Mes dernières activités :</strong> Postes partagés, articles et actualités professionnelles
          </p>
          <a 
            href="https://linkedin.com/in/daniil-minevich" 
            target="_blank" 
            rel="noopener noreferrer"
            className="terminal-button primary linkedin-btn"
          >
            [LINK] Voir mon profil LinkedIn complet
          </a>
        </div>

        {!selectedArticle ? (
          <>
            <div className="articles-grid">
              {articles.map(article => (
                <article key={article.id} className="article-card terminal-card">
                  <div className="article-category">{article.category}</div>
                  <h2 className="article-title">{article.title}</h2>
                  <div className="article-meta">
                    <span className="article-date">[DATE] {article.date}</span>
                  </div>
                  <p className="article-summary">{article.summary}</p>
                  <div className="article-tags">
                    {article.tags.map((tag, i) => (
                      <span key={i} className="tag">{tag}</span>
                    ))}
                  </div>
                  <button
                    className="terminal-button primary"
                    onClick={() => setSelectedArticle(article)}
                  >
                    [READ] Lire l'article
                  </button>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="article-full">
            <button
              className="terminal-button"
              onClick={() => setSelectedArticle(null)}
            >
              [BACK] Retour aux articles
            </button>
            
            <article className="article-content terminal-card">
              <div className="article-header-full">
                <span className="article-category">{selectedArticle.category}</span>
                <h1>{selectedArticle.title}</h1>
                <div className="article-meta">
                  <span>[DATE] {selectedArticle.date}</span>
                </div>
                <div className="article-tags">
                  {selectedArticle.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
              
              <div className="article-body">
                <pre className="article-text">{selectedArticle.content}</pre>
              </div>
            </article>
          </div>
        )}
      </ExplorerWindow>
    </div>
  )
}
