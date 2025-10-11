import React, { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // For now simulate send
    setSent(true)
  }

  return (
    <div className="terminal-screen">
      <div className="terminal-frame contact">
        <h2>Contact</h2>
        {!sent ? (
          <form onSubmit={handleSubmit} className="contact-form">
            <label>Nom</label>
            <input name="name" />
            <label>Message</label>
            <textarea name="message" />
            <button type="submit">Envoyer (simulation)</button>
          </form>
        ) : (
          <div>Message simulé envoyé. (Quand backend actif, il enverra un vrai mail.)</div>
        )}
      </div>
    </div>
  )
}
