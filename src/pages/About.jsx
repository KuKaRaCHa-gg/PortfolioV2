import React, { useEffect, useState } from 'react'
import soundManager from '../utils/soundManager'
import SkillsShowcase from '../components/SkillsShowcase'
import '../styles/about.css'

export default function About() {
  const [profile, setProfile] = useState(null)

  useEffect(()=>{
    fetch('/profile.json')
      .then(r=>r.json())
      .then(setProfile)
      .catch(err => {
        console.error('Erreur chargement profile:', err)
        setProfile({}) // Évite le chargement infini
      })
  },[])

  if(!profile) return <div className="terminal-screen"><div className="terminal-frame">Chargement...</div></div>

  return (
    <div className="terminal-screen about-page">
      <div className="terminal-frame">
        <div className="about-header">
          {profile.avatar && (
            <div className="profile-avatar">
              <img src={profile.avatar} alt={profile.name} />
            </div>
          )}
          <h1 className="glitch-text" data-text={profile.name}>{profile.name}</h1>
          <p className="about-subtitle">{profile.title}</p>
          <p className="about-summary">{profile.summary}</p>
          
          <div className="social-links">
            <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" className="social-btn">
              <span className="icon">💻</span> GitHub
            </a>
            <a href={profile.contact.links} target="_blank" rel="noopener noreferrer" className="social-btn">
              <span className="icon">🔗</span> Liens
            </a>
            {profile.cvVideo && (
              <a href={profile.cvVideo} target="_blank" rel="noopener noreferrer" className="social-btn cv-video-btn">
                <span className="icon">🎬</span> CV Vidéo
              </a>
            )}
            <span className="location-badge">
              <span className="icon">📍</span> {profile.contact.location}
            </span>
          </div>
        </div>

        {/* Section CV Vidéo intégré */}
        {profile.cvVideo && (
          <div className="cv-video-section">
            <h2 className="section-title neon-text">🎬 MON CV EN VIDÉO</h2>
            <div className="video-container">
              <iframe
                width="100%"
                height="500"
                src="https://www.youtube.com/embed/YHs_1_mAryU"
                title="CV Vidéo Daniil Minevich"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="cv-video-iframe"
              ></iframe>
            </div>
          </div>
        )}

        {/* Section Activités & Passions */}
        {profile.activities && (
          <div className="activities-section">
            <h2 className="section-title neon-text">[LIFE] ACTIVITÉS & PASSIONS</h2>
            <div className="activities-grid">
              {profile.activities.map((activity, i) => (
                <div key={i} className="activity-card">
                  <div className="activity-icon">{activity.icon}</div>
                  <h3 className="activity-title">{activity.title}</h3>
                  <p className="activity-description">{activity.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Composant Skills sans barres de progression */}
        <SkillsShowcase />

        {/* Section Technologies Favorites */}
        <div className="favorite-techs-section">
          <h2 className="section-title neon-text">⚡ TECHNOLOGIES FAVORITES</h2>
          <div className="favorite-techs-grid">
            <div className="tech-logo-card" onMouseEnter={() => soundManager.playHover()}>
              <img src="/images/JS.png" alt="JavaScript" className="tech-logo" />
              <h3 className="tech-name">JavaScript</h3>
              <p className="tech-desc">Ce portfolio a été développé avec React + Vite</p>
            </div>
            <div className="tech-logo-card" onMouseEnter={() => soundManager.playHover()}>
              <img src="/images/Python.png" alt="Python" className="tech-logo" />
              <h3 className="tech-name">Python</h3>
              <p className="tech-desc">En cours d'apprentissage</p>
            </div>
            <div className="tech-logo-card" onMouseEnter={() => soundManager.playHover()}>
              <img src="/images/Java.png" alt="Java" className="tech-logo" />
              <h3 className="tech-name">Java</h3>
              <p className="tech-desc">Projets BUT Informatique (JavaFX, POO)</p>
            </div>
            <div className="tech-logo-card" onMouseEnter={() => soundManager.playHover()}>
              <img src="/images/PHP.png" alt="PHP" className="tech-logo" />
              <h3 className="tech-name">PHP</h3>
              <p className="tech-desc">WordPress, sites web dynamiques</p>
            </div>
            <div className="tech-logo-card" onMouseEnter={() => soundManager.playHover()}>
              <img src="/images/C.png" alt="C" className="tech-logo" />
              <h3 className="tech-name">C</h3>
              <p className="tech-desc">Programmation système</p>
            </div>
            <div className="tech-logo-card" onMouseEnter={() => soundManager.playHover()}>
              <img src="/images/C++.png" alt="C++" className="tech-logo" />
              <h3 className="tech-name">C++</h3>
              <p className="tech-desc">POO, classe Date</p>
            </div>
            <div className="tech-logo-card" onMouseEnter={() => soundManager.playHover()}>
              <img src="/images/HTML.png" alt="HTML" className="tech-logo" />
              <h3 className="tech-name">HTML</h3>
              <p className="tech-desc">Structure des pages web</p>
            </div>
            <div className="tech-logo-card" onMouseEnter={() => soundManager.playHover()}>
              <img src="/images/css.png" alt="CSS" className="tech-logo" />
              <h3 className="tech-name">CSS</h3>
              <p className="tech-desc">Design et animations</p>
            </div>
            <div className="tech-logo-card" onMouseEnter={() => soundManager.playHover()}>
              <img src="/images/SQL.png" alt="SQL" className="tech-logo" />
              <h3 className="tech-name">SQL</h3>
              <p className="tech-desc">Bases de données (MySQL, SQLite)</p>
            </div>
            <div className="tech-logo-card" onMouseEnter={() => soundManager.playHover()}>
              <img src="/images/NODE.png" alt="Node.js" className="tech-logo" />
              <h3 className="tech-name">Node.js</h3>
              <p className="tech-desc">Runtime JavaScript</p>
            </div>
          </div>
        </div>

        <h3 className="section-title">[WORK] EXPÉRIENCES</h3>
        <div className="experiences-list">
          {profile.experiences.map((e,i)=>(
            <div key={i} className="experience-card terminal-card">
              <div className="experience-header">
                <strong className="experience-role">{e.role}</strong>
                <span className="experience-company">{e.company}</span>
                {e.year && <span className="experience-year">{e.year}</span>}
              </div>
              <ul className="experience-details">
                {e.details.map((d,ii)=>(<li key={ii}>{d}</li>))}
              </ul>
            </div>
          ))}
        </div>

        <h3 className="section-title">🎓 FORMATIONS</h3>
        <div className="education-list">
          {profile.education.map((ed,i)=>(
            <div key={i} className="education-card terminal-card">
              <strong>{ed.school}</strong>
              {ed.status && <span className="education-status"> - {ed.status}</span>}
              {ed.note && <span className="education-note"> ({ed.note})</span>}
            </div>
          ))}
        </div>

        {/* Section Jeux Steam */}
        {profile.games && (
          <div className="games-section">
            <h2 className="section-title neon-text">🎮 MES JEUX</h2>
            <div className="steam-profile-link">
              <a href={profile.steamProfile} target="_blank" rel="noopener noreferrer" className="social-btn">
                <span className="icon">🎮</span> Voir mon profil Steam complet
              </a>
            </div>
            <div className="games-grid">
              {profile.games.map((game, i) => (
                <div key={i} className="game-tag">
                  {game}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats GitHub */}
        {profile.stats && (
          <div className="github-stats">
            <h3 className="section-title">📊 STATISTIQUES</h3>
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-value">{profile.stats.repositories}</div>
                <div className="stat-label">Repositories</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">{profile.stats.projects_completed}</div>
                <div className="stat-label">Projets</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">{profile.stats.languages_mastered}</div>
                <div className="stat-label">Langages</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">{profile.stats.years_experience}</div>
                <div className="stat-label">Années</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
