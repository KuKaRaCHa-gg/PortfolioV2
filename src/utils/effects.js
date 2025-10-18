// Effet Glitch sur les titres
export function initGlitchEffect() {
  const glitchElements = document.querySelectorAll('.glitch, h1, h2')
  
  glitchElements.forEach(el => {
    setInterval(() => {
      el.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`
      el.style.color = Math.random() > 0.5 ? '#00FF00' : '#00BBFF'
      
      setTimeout(() => {
        el.style.transform = 'translate(0, 0)'
        el.style.color = '#00FF00'
      }, 100)
    }, 2000 + Math.random() * 3000) // Glitch aléatoire toutes les 2-5s
  })
}

// Curseur personnalisé avec traînée
export function initCustomCursor() {
  // Vérifier si le curseur existe déjà
  if (document.getElementById('custom-cursor')) return

  const cursor = document.createElement('div')
  cursor.id = 'custom-cursor'
  document.body.appendChild(cursor)

  // Suivi du mouvement de la souris
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.pageX}px`
    cursor.style.top = `${e.pageY}px`
  })

  // Création de la traînée
  let lastTrailTime = 0
  document.addEventListener('mousemove', (e) => {
    const now = Date.now()
    if (now - lastTrailTime > 30) { // Limiter la fréquence des traînées
      const trail = document.createElement('div')
      trail.className = 'cursor-trail'
      trail.style.left = `${e.pageX}px`
      trail.style.top = `${e.pageY}px`
      document.body.appendChild(trail)

      setTimeout(() => {
        if (trail && trail.parentNode) {
          trail.remove()
        }
      }, 300)

      lastTrailTime = now
    }
  })
}

// Initialiser tous les effets
export function initEffects() {
  // Désactiver les effets sur mobile pour performances
  const isMobile = window.innerWidth <= 768
  if (isMobile) {
    console.log('Mobile detected - effects disabled for performance')
    return
  }
  
  initGlitchEffect()
  initCustomCursor()
}
