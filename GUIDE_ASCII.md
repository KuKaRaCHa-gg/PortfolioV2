# 🎨 Logos ASCII - Documentation

## Vue d'ensemble

Le fichier `src/data/asciiLogos.js` contient une bibliothèque complète de logos ASCII pour les langages de programmation et outils de développement.

## 📦 Contenu disponible

### Logos ASCII complets (15 langages)

| Langage | Clé | Taille | Style |
|---------|-----|--------|-------|
| JavaScript | `javascript` | Large | Logo JS stylisé |
| Python | `python` | Large | Serpent ASCII |
| Java | `java` | Large | Logo + texte |
| C | `c` | Large | Lettre C stylisée |
| SQL | `sql` | Large | Texte SQL |
| HTML | `html` | Large | Tags HTML |
| CSS | `css` | Large | Texte CSS |
| React | `react` | Large | Logo React stylisé |
| Node.js | `node` | Large | Logo Node.js |
| Git | `git` | Large | Logo Git |
| Docker | `docker` | Large | Logo baleine |
| Bash | `bash` | Large | Texte BASH |
| MySQL | `mysql` | Large | Logo MySQL |
| Linux | `linux` | Large | Pingouin Tux |
| VS Code | `vscode` | Large | Logo VSCode |

### Logos compacts (emojis)

Chaque langage a aussi une version compacte avec emoji :

```javascript
{ JS }  // JavaScript
🐍 PY   // Python
☕ JAVA // Java
🔷 C    // C
📊 SQL  // SQL
🌐 HTML // HTML
🎨 CSS  // CSS
⚛️ REACT // React
💚 NODE // Node.js
🔀 GIT  // Git
🐳 DOCKER // Docker
💻 BASH // Bash
🐬 MYSQL // MySQL
🐧 LINUX // Linux
📝 VSCODE // VS Code
```

### Emojis Gaming

Références aux jeux mentionnés dans le projet :

```javascript
💀🔫 ultrakill
😈🔥 doom
🎯👑 apex
```

## 🚀 Utilisation

### Dans un composant React

```jsx
import { asciiLogos, compactLogos, gamingEmojis } from '../data/asciiLogos'

// Afficher un logo complet
<pre className="ascii-logo">
  {asciiLogos.javascript}
</pre>

// Afficher un logo compact
<span className="compact-logo">
  {compactLogos.python}
</span>

// Afficher un emoji gaming
<span>{gamingEmojis.ultrakill}</span>
```

### Dans SkillsShowcase

Le composant `SkillsShowcase` utilise automatiquement :
- **compactLogos** pour les badges
- **asciiLogos** pour le modal au clic

```jsx
// Badge avec logo compact
<span className="skill-icon">{compactLogos[skill.name]}</span>

// Modal avec logo complet
<pre className="ascii-logo-large">
  {asciiLogos[selectedSkill.name]}
</pre>
```

## ✨ Styles CSS recommandés

### Logo complet

```css
.ascii-logo-large {
  color: var(--text);
  font-size: 0.6rem;
  line-height: 1.2;
  text-align: center;
  margin: 1rem 0;
  text-shadow: 0 0 5px var(--glow);
  animation: neon-text 3s ease-in-out infinite;
  white-space: pre;
  overflow-x: auto;
}
```

### Logo compact

```css
.compact-logo {
  font-size: 1.5rem;
  display: inline-block;
  text-shadow: 0 0 3px var(--glow);
}
```

## 🎨 Ajouter un nouveau logo

### Étape 1 : Créer le logo ASCII

Utilisez un générateur en ligne ou créez-le manuellement :
- [ASCII Art Generator](https://www.ascii-art-generator.org/)
- [Text to ASCII Art Generator](https://patorjk.com/software/taag/)

### Étape 2 : Ajouter au fichier

Ouvrez `src/data/asciiLogos.js` et ajoutez :

```javascript
export const asciiLogos = {
  // ... logos existants ...
  
  php: `
    ____  __  ______
   / __ \\/ / / / __ \\
  / /_/ / /_/ / /_/ /
 / .___/\\__,_/ .___/
/_/         /_/
  `
}

export const compactLogos = {
  // ... logos existants ...
  
  php: '🐘 PHP'
}
```

### Étape 3 : Mettre à jour SkillsShowcase

Dans `src/components/SkillsShowcase.jsx`, ajoutez le skill :

```javascript
const skills = [
  // ... skills existants ...
  { name: 'php', level: 75, category: 'Backend' }
]
```

## 🎭 Format des logos

### Recommandations

1. **Largeur max** : ~60 caractères
2. **Hauteur max** : ~10 lignes
3. **Caractères** : ASCII standard uniquement (éviter Unicode sauf emojis)
4. **Alignement** : Centré ou gauche selon le design
5. **Espacement** : Template literals avec indentation cohérente

### Exemple bien formaté

```javascript
python: `
    ____        __  __                
   / __ \\__  __/ /_/ /_  ____  ____  
  / /_/ / / / / __/ __ \\/ __ \\/ __ \\ 
 / ____/ /_/ / /_/ / / / /_/ / / / / 
/_/    \\__, /\\__/_/ /_/\\____/_/ /_/  
      /____/                         
`
```

## 🌟 Animations possibles

### Effet apparition progressive

```css
@keyframes reveal-ascii {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.ascii-logo-large {
  animation: reveal-ascii 0.5s ease-out;
}
```

### Effet glitch

```css
@keyframes ascii-glitch {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(-2px, 2px); }
  50% { transform: translate(2px, -2px); }
  75% { transform: translate(-1px, -1px); }
}

.ascii-logo-large:hover {
  animation: ascii-glitch 0.3s ease-in-out;
}
```

### Effet neon pulsant

```css
@keyframes neon-pulse {
  0%, 100% {
    text-shadow: 0 0 5px var(--glow);
  }
  50% {
    text-shadow: 0 0 20px var(--glow), 0 0 30px var(--glow);
  }
}

.ascii-logo-large {
  animation: neon-pulse 2s ease-in-out infinite;
}
```

## 📚 Ressources

### Générateurs en ligne
- [ASCII Art Generator](https://www.ascii-art-generator.org/)
- [TAAG](https://patorjk.com/software/taag/)
- [ASCII Art Paint](https://ascii-paint.com/)

### Collections d'ASCII Art
- [ASCII Art Archive](https://www.asciiart.eu/)
- [Chris.com ASCII Art](https://www.chris.com/ascii/)
- [ASCII World](http://www.asciiworld.com/)

### Polices recommandées
- **Courier New** : Standard, bien supporté
- **Share Tech Mono** : Style terminal moderne (actuellement utilisé)
- **Ubuntu Mono** : Lisible, espacement uniforme
- **Fira Code** : Bon pour le code, ligatures

## 💡 Astuces

1. **Taille responsive** : Utilisez `font-size` en `rem` plutôt que `px`
2. **Contraste** : Assurez-vous que le logo est lisible sur fond noir
3. **Simplicité** : Les logos simples sont plus lisibles en petit
4. **Test mobile** : Vérifiez le rendu sur mobile (peut être trop grand)
5. **Fallback** : Prévoyez un message si le logo n'existe pas

```javascript
{asciiLogos[skill.name] || '[ Logo non disponible ]'}
```

## 🔥 Idées d'amélioration

1. **Animation caractère par caractère** : Afficher le logo progressivement
2. **Couleurs variables** : Différentes couleurs selon le langage
3. **Effets de hover** : Rotation 3D, zoom, glitch
4. **Version filaire** : Effet wireframe sur hover
5. **Particules** : Ajouter des particules autour du logo
