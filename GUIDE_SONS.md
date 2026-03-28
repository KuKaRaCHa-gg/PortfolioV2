# 🔊 Système de Sons - Documentation

## Vue d'ensemble

Le portfolio utilise **Web Audio API** pour générer des sons synthétiques en temps réel. Aucun fichier MP3/WAV n'est nécessaire - tous les sons sont créés programmatiquement.

## 🎵 Sons disponibles

### 1. Typing Sound (Son de frappe)
- **Type** : Square wave
- **Fréquence** : 800-1000 Hz (aléatoire)
- **Durée** : 50ms
- **Usage** : Effet typewriter sur la page Home
- **Déclencheur** : Automatique pendant l'animation de texte

```javascript
soundManager.playTyping()
```

### 2. Beep (Bip simple)
- **Type** : Sine wave
- **Fréquence** : Paramétrable (défaut 800 Hz)
- **Durée** : Paramétrable (défaut 100ms)
- **Usage** : Navigation entre pages
- **Déclencheur** : Clic sur boutons de navigation

```javascript
soundManager.playBeep(frequency, duration)
// Exemple: soundManager.playBeep(1000, 0.15)
```

### 3. Boot Sequence (Séquence de démarrage)
- **Type** : Série de 5 beeps
- **Fréquences** : 400, 500, 600, 700, 800 Hz
- **Durée** : 80ms par beep
- **Intervalle** : 150ms entre chaque beep
- **Usage** : Animation de boot sur la page Home
- **Déclencheur** : Automatique au chargement de Home

```javascript
soundManager.playBootSequence()
```

### 4. Success Sound (Son de succès)
- **Type** : 2 notes ascendantes (C5 + E5)
- **Fréquences** : 523.25 Hz puis 659.25 Hz
- **Durée totale** : 350ms
- **Usage** : Boot terminé, activation du son
- **Déclencheur** : Fin de boot sequence, toggle son ON

```javascript
soundManager.playSuccess()
```

### 5. Error Sound (Son d'erreur)
- **Type** : Sawtooth wave descendante
- **Fréquence** : 400 Hz → 200 Hz
- **Durée** : 200ms
- **Usage** : Erreurs de formulaire (prévu)
- **Déclencheur** : À implémenter

```javascript
soundManager.playError()
```

## 🎛️ Contrôle du volume

Le volume par défaut est **30%** (0.3). Pour le modifier :

```javascript
soundManager.setVolume(0.5) // 50%
```

## 🔇 Activer/Désactiver les sons

### Via le bouton UI
Un bouton est disponible en bas à droite de l'écran :
- 🔊 SON : Sons activés
- 🔇 SON : Sons désactivés

### Via code
```javascript
const enabled = soundManager.toggle()
console.log(enabled ? 'Sons ON' : 'Sons OFF')
```

### Via propriété
```javascript
soundManager.enabled = false // Désactiver
soundManager.enabled = true  // Activer
```

## 🔧 Compatibilité navigateurs

Le système utilise **AudioContext** qui est supporté par :
- ✅ Chrome/Edge 35+
- ✅ Firefox 25+
- ✅ Safari 14.1+
- ✅ Opera 22+

**Note** : Chrome nécessite une interaction utilisateur (clic/touche) avant de jouer des sons. Le système reprend automatiquement l'AudioContext au premier clic.

## 📝 Ajouter de nouveaux sons

### Exemple : Ajouter un son de "whoosh"

1. Ouvrez `src/utils/soundManager.js`
2. Ajoutez une méthode :

```javascript
generateWhooshSound() {
  if (!this.audioContext) return null
  
  const oscillator = this.audioContext.createOscillator()
  const gainNode = this.audioContext.createGain()
  
  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.5)
  
  gainNode.gain.setValueAtTime(this.volume * 0.3, this.audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5)
  
  oscillator.connect(gainNode)
  gainNode.connect(this.audioContext.destination)
  
  return { oscillator, gainNode, duration: 0.5 }
}

playWhoosh() {
  if (!this.enabled || !this.audioContext) return
  const sound = this.generateWhooshSound()
  if (sound) {
    sound.oscillator.start(this.audioContext.currentTime)
    sound.oscillator.stop(this.audioContext.currentTime + sound.duration)
  }
}
```

3. Utilisez-le dans vos composants :

```javascript
import soundManager from '../utils/soundManager'

soundManager.playWhoosh()
```

## 🎼 Formes d'ondes disponibles

- **sine** : Son pur et doux
- **square** : Son rétro, style 8-bit
- **sawtooth** : Son râpeux, agressif
- **triangle** : Entre sine et square

## 💡 Conseils d'utilisation

1. **N'abusez pas des sons** : Trop de sons peut être irritant
2. **Testez le volume** : 0.3 (30%) est un bon défaut
3. **Fréquences recommandées** :
   - Graves : 100-400 Hz
   - Médiums : 400-2000 Hz
   - Aigus : 2000-8000 Hz
4. **Durées recommandées** :
   - Beeps courts : 50-100ms
   - Transitions : 200-500ms
   - Effets longs : 500-1000ms

## 🐛 Dépannage

### Les sons ne jouent pas
1. Vérifiez que le bouton 🔊 est activé
2. Vérifiez le volume du navigateur
3. Testez dans la console :
```javascript
soundManager.playBeep()
```

### AudioContext suspendu
Chrome peut suspendre l'AudioContext. Le système reprend automatiquement au premier clic.

### Sons déformés
Réduisez le volume :
```javascript
soundManager.setVolume(0.2)
```
