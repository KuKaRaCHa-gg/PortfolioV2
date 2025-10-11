// Sound Manager - Système de sons pour le portfolio
class SoundManager {
  constructor() {
    this.sounds = {}
    this.enabled = true
    this.volume = 0.3
    this.audioContext = null
    
    // Initialiser AudioContext (nécessaire pour Chrome)
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    }
  }

  // Générer un son de typing synthétique
  generateTypingSound() {
    if (!this.audioContext) return null
    
    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()
    
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(800 + Math.random() * 200, this.audioContext.currentTime)
    
    gainNode.gain.setValueAtTime(this.volume * 0.1, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05)
    
    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)
    
    return { oscillator, gainNode, duration: 0.05 }
  }

  // Générer un beep synthétique
  generateBeepSound(frequency = 800, duration = 0.1) {
    if (!this.audioContext) return null
    
    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()
    
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime)
    
    gainNode.gain.setValueAtTime(this.volume * 0.2, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration)
    
    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)
    
    return { oscillator, gainNode, duration }
  }

  // Générer un son de succès (2 notes ascendantes)
  generateSuccessSound() {
    if (!this.audioContext) return null
    
    const playNote = (freq, time, duration) => {
      const osc = this.audioContext.createOscillator()
      const gain = this.audioContext.createGain()
      
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, time)
      
      gain.gain.setValueAtTime(this.volume * 0.2, time)
      gain.gain.exponentialRampToValueAtTime(0.01, time + duration)
      
      osc.connect(gain)
      gain.connect(this.audioContext.destination)
      
      osc.start(time)
      osc.stop(time + duration)
    }
    
    const now = this.audioContext.currentTime
    playNote(523.25, now, 0.15) // C5
    playNote(659.25, now + 0.15, 0.2) // E5
    
    return { duration: 0.35 }
  }

  // Générer un son d'erreur (note descendante)
  generateErrorSound() {
    if (!this.audioContext) return null
    
    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()
    
    oscillator.type = 'sawtooth'
    oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.2)
    
    gainNode.gain.setValueAtTime(this.volume * 0.15, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2)
    
    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)
    
    return { oscillator, gainNode, duration: 0.2 }
  }

  // Jouer un son de typing
  playTyping() {
    if (!this.enabled || !this.audioContext) return
    
    const sound = this.generateTypingSound()
    if (sound) {
      sound.oscillator.start(this.audioContext.currentTime)
      sound.oscillator.stop(this.audioContext.currentTime + sound.duration)
    }
  }

  // Jouer un beep
  playBeep(frequency = 800, duration = 0.1) {
    if (!this.enabled || !this.audioContext) return
    
    const sound = this.generateBeepSound(frequency, duration)
    if (sound) {
      sound.oscillator.start(this.audioContext.currentTime)
      sound.oscillator.stop(this.audioContext.currentTime + sound.duration)
    }
  }

  // Jouer un son de succès
  playSuccess() {
    if (!this.enabled || !this.audioContext) return
    this.generateSuccessSound()
  }

  // Jouer un son d'erreur
  playError() {
    if (!this.enabled || !this.audioContext) return
    
    const sound = this.generateErrorSound()
    if (sound) {
      sound.oscillator.start(this.audioContext.currentTime)
      sound.oscillator.stop(this.audioContext.currentTime + sound.duration)
    }
  }

  // Jouer une séquence de boot (plusieurs beeps)
  playBootSequence() {
    if (!this.enabled || !this.audioContext) return
    
    const notes = [400, 500, 600, 700, 800]
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playBeep(freq, 0.08)
      }, i * 150)
    })
  }

  // Son de hover stylé (note courte montante)
  playHover() {
    if (!this.enabled || !this.audioContext) return
    this.playBeep(600, 0.05)
  }

  // Son de clic stylé (double beep rapide)
  playClick() {
    if (!this.enabled || !this.audioContext) return
    this.playBeep(800, 0.05)
    setTimeout(() => this.playBeep(900, 0.05), 50)
  }

  // Son de navigation (triple beep ascendant rapide)
  playNavigation() {
    if (!this.enabled || !this.audioContext) return
    const notes = [600, 750, 900]
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playBeep(freq, 0.04)
      }, i * 40)
    })
  }

  // Son d'ouverture de modal/card (mélodie montante)
  playOpen() {
    if (!this.enabled || !this.audioContext) return
    const notes = [523, 659, 784] // C5, E5, G5
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playBeep(freq, 0.08)
      }, i * 60)
    })
  }

  // Son de fermeture de modal/card (mélodie descendante)
  playClose() {
    if (!this.enabled || !this.audioContext) return
    const notes = [784, 659, 523] // G5, E5, C5
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playBeep(freq, 0.08)
      }, i * 60)
    })
  }

  // Son de glitch/matrix (effet cyberpunk)
  playGlitch() {
    if (!this.enabled || !this.audioContext) return
    
    const osc = this.audioContext.createOscillator()
    const gain = this.audioContext.createGain()
    
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(100, this.audioContext.currentTime)
    
    // Modulation rapide de fréquence pour effet glitch
    for (let i = 0; i < 10; i++) {
      const time = this.audioContext.currentTime + (i * 0.02)
      const freq = 100 + Math.random() * 500
      osc.frequency.setValueAtTime(freq, time)
    }
    
    gain.gain.setValueAtTime(this.volume * 0.15, this.audioContext.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2)
    
    osc.connect(gain)
    gain.connect(this.audioContext.destination)
    
    osc.start()
    osc.stop(this.audioContext.currentTime + 0.2)
  }

  // Son de power-up (gaming style)
  playPowerUp() {
    if (!this.enabled || !this.audioContext) return
    const notes = [440, 554, 659, 880] // A4, C#5, E5, A5
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playBeep(freq, 0.1)
      }, i * 70)
    })
  }

  // Son de coin collecté (Mario style)
  playCoin() {
    if (!this.enabled || !this.audioContext) return
    const notes = [988, 1319] // B5, E6
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playBeep(freq, 0.08)
      }, i * 50)
    })
  }

  // Son de scan/loading (beep répété)
  playScan() {
    if (!this.enabled || !this.audioContext) return
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        this.playBeep(700, 0.06)
      }, i * 100)
    }
  }

  // Son d'alerte/notification
  playNotification() {
    if (!this.enabled || !this.audioContext) return
    const notes = [880, 1047, 880] // A5, C6, A5
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playBeep(freq, 0.12)
      }, i * 120)
    })
  }

  // Son rétro game over
  playGameOver() {
    if (!this.enabled || !this.audioContext) return
    const notes = [659, 622, 587, 554, 523] // E5 -> C5 descendant
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playBeep(freq, 0.2)
      }, i * 150)
    })
  }

  // Son de achievement/victoire
  playAchievement() {
    if (!this.enabled || !this.audioContext) return
    const notes = [523, 659, 784, 1047] // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playBeep(freq, 0.15)
      }, i * 100)
    })
    // Note finale longue
    setTimeout(() => {
      this.playBeep(1047, 0.4)
    }, 400)
  }

  // Toggle son
  toggle() {
    this.enabled = !this.enabled
    return this.enabled
  }

  // Changer le volume
  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol))
  }

  // Résumer AudioContext si suspendu (requis par certains navigateurs)
  resume() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume()
    }
  }
}

// Instance singleton
const soundManager = new SoundManager()

// Résumer le contexte audio lors du premier clic utilisateur
if (typeof window !== 'undefined') {
  const resumeAudio = () => {
    soundManager.resume()
    document.removeEventListener('click', resumeAudio)
    document.removeEventListener('keydown', resumeAudio)
  }
  document.addEventListener('click', resumeAudio)
  document.addEventListener('keydown', resumeAudio)
}

export default soundManager
