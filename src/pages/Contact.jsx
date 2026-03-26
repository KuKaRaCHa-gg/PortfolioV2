import React, { useState } from 'react'
import '../styles/terminal.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    
    // Utilisation de mailto avec votre vraie adresse Hostinger
    const mailtoLink = `mailto:contact@daniilminevich.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`De: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`
    
    // Ouvrir le client email
    window.location.href = mailtoLink
    
    // Simuler succès après 1 seconde
    setTimeout(() => {
      setSent(true)
      setSending(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 1000)
  }

  return (
    <div className="terminal-screen">
      <div className="terminal-frame contact-page">
        <div className="contact-header">
          <h1 className="glitch-text" data-text="CONTACT">CONTACT</h1>
          <p className="terminal-text">Envoyez-moi un message, je vous répondrai rapidement !</p>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="contact-form terminal-card">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                <span className="icon">[USER]</span> Nom *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Votre nom"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <span className="icon">[MAIL]</span> Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="votre.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject" className="form-label">
                <span className="icon">[NOTE]</span> Sujet *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Sujet de votre message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">
                <span className="icon">[MSG]</span> Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="form-textarea"
                rows="8"
                placeholder="Votre message..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="terminal-button primary submit-btn"
              disabled={sending}
            >
              {sending ? '[WAIT] Envoi...' : '[SEND] Envoyer le message'}
            </button>
          </form>
        ) : (
          <div className="success-message terminal-card">
            <div className="success-icon">[OK]</div>
            <h2 className="neon-text">Message envoyé avec succès !</h2>
            <p>Je vous répondrai dans les plus brefs délais.</p>
            <button 
              onClick={() => setSent(false)} 
              className="terminal-button"
            >
              [MAIL] Envoyer un autre message
            </button>
          </div>
        )}

        <div className="contact-info">
          <h3 className="section-title neon-text">AUTRES MOYENS DE CONTACT</h3>
          <div className="contact-links">
            <a href="mailto:contact@daniilminevich.com" className="contact-link">
              <span className="icon">[SEND]</span> contact@daniilminevich.com
            </a>
            <a href="https://github.com/KuKaRaCHa-gg" target="_blank" rel="noopener noreferrer" className="contact-link">
              <span className="icon">[CODE]</span> GitHub
            </a>
            <a href="https://linkedin.com/in/daniil-minevich" target="_blank" rel="noopener noreferrer" className="contact-link">
              <span className="icon">💼</span> LinkedIn
            </a>
            <a href="https://many.link/minevich" target="_blank" rel="noopener noreferrer" className="contact-link">
              <span className="icon">[LINK]</span> Tous mes liens
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
