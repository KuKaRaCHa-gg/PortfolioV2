# 🖥️ PortfolioV2 - Terminal Rétro# Porfolio - Terminal Vert



Portfolio personnel avec design rétro-terminal cyberpunk, développé en React + Vite.Portfolio React + Vite stylé comme un terminal vert vintage (style IBM/Matrix). Design rétro avec animations (scanlines, glitch, neon, flying code, custom cursor), effets 3D avancés, sons synthétiques et galerie d'images.



![Version](https://img.shields.io/badge/version-2.0-00ff00)## ✨ Nouvelles Fonctionnalités

![React](https://img.shields.io/badge/React-18.2.0-61dafb)

![Vite](https://img.shields.io/badge/Vite-5.0.0-646cff)### 🎨 ASCII Art & Logos Animés

![License](https://img.shields.io/badge/license-MIT-green)- **15+ logos ASCII** pour langages de programmation (JavaScript, Python, Java, C, SQL, HTML, CSS, React, Node, Git, Docker, Bash, MySQL, Linux, VSCode)

- **SkillsShowcase** : Composant interactif avec badges de compétences animés

## 🎨 Aperçu- Cliquez sur un badge pour afficher le logo ASCII complet avec effet neon

- Barres de progression avec effet shimmer et animations fluides

Portfolio interactif avec :

- 🟢 Design terminal vert phosphorescent style Matrix### 🎮 Scène 3D Avancée

- 🎮 Animations et effets sonores interactifs- **AdvancedThreeScene** : Système de particules avec 2000 points lumineux

- 🕹️ 5 mini-jeux intégrés (Tetris, Snake, Pong, Game of Life, Maze)- **3 objets géométriques** : Torus, Icosaèdre, Sphère (wireframe vert)

- 📱 100% Responsive (mobile → desktop 4K)- **Effet parallaxe** : La caméra suit les mouvements de souris

- 🖱️ Curseurs personnalisés pixel art- **Interactions cliquables** : Les objets pulsent quand on clique dessus

- 🔊 Système de sons synthétiques rétro- Rotations automatiques et animations fluides



## ✨ Fonctionnalités### 🔊 Système de Sons Synthétiques

- **SoundManager** : Générateur de sons Web Audio API (pas de fichiers externes)

### Pages- **Effets sonores** :

- **Home** : Animation de boot terminal avec logo animé  - Typing : Clavier mécanique pendant le typewriter

- **About** : Profil, compétences, expériences, technologies favorites  - Beeps : Navigation entre pages

- **Projects** : 11 projets avec filtres interactifs  - Boot sequence : 5 notes ascendantes au démarrage

- **Tools & Games** : Collection de 5 jeux jouables  - Success/Error : Feedback pour actions réussies/échouées

- **Blog** : Articles de blog (structure prête)- **Bouton de contrôle** : 🔊/🔇 en bas à droite pour activer/désactiver

- **Contact** : Formulaire de contact

### 🖼️ Galerie d'Images

### Jeux Intégrés- **ImageGallery** : Composant pour screenshots de projets

1. 🟦 **Tetris** - 7 pièces classiques, scoring, niveaux- Grille responsive avec thumbnails

2. 🐍 **Snake** - Gameplay fluide avec high score- Modal pour voir les images en plein écran

3. 🏓 **Pong** - Jeu classique de tennis- Effets de zoom et overlay au survol

4. 🧬 **Game of Life** - Automate cellulaire de Conway- Support pour légendes d'images

5. 🌀 **Maze Generator** - Générateur de labyrinthes

## 🚀 Quick start

### Effets

- ✅ Particules Three.js en arrière-plan### 1. Installer les dépendances

- ✅ Scanlines CRT rétro

- ✅ Glitch effects sur hover```powershell

- ✅ Code volant animé (Matrix style)npm install

- ✅ 12+ sons interactifs différents```

- ✅ Logos animés avec effets néon

### 2. Lancer en développement

## 🚀 Installation

```powershell

### Prérequisnpm run dev

- Node.js 18+ et npm```



### CommandesLe site s'ouvre sur http://localhost:5173



```bash### 3. Build pour production

# Cloner le repo

git clone https://github.com/KuKaRaCHa-gg/PortfolioV2.git```powershell

cd PortfolioV2npm run build

```

# Installer les dépendances

npm installLe résultat est dans le dossier `dist/`.



# Lancer en développement## 📂 Structure du projet

npm run dev

```

# Build pour productionC:\xampp\htdocs\Porfolio/

npm run build├── public/

│   ├── projects.json         # Liste des projets affichés

# Preview du build│   └── i18n.json             # Traductions FR/EN

npm run preview├── src/

```│   ├── components/

│   │   ├── Header.jsx        # En-tête avec titre

## 📦 Technologies│   │   ├── Footer.jsx        # Pied de page avec liens

│   │   ├── Skills.jsx        # Liste de compétences (ancienne version)

### Frontend│   │   ├── SkillsShowcase.jsx # ✨ NOUVEAU: Compétences avec ASCII logos

- **React 18.2** - UI Library│   │   ├── ProjectModal.jsx  # Modale de détail projet

- **Vite 5.0** - Build tool ultra rapide│   │   ├── ThreeScene.jsx    # Scène 3D simple (cube)

- **Three.js** - Effets 3D et particules│   │   ├── AdvancedThreeScene.jsx # ✨ NOUVEAU: Scène 3D avec particules

- **Web Audio API** - Système de sons synthétiques│   │   ├── FlyingCode.jsx    # Code volant en arrière-plan

│   │   └── ImageGallery.jsx  # ✨ NOUVEAU: Galerie d'images

### Styling│   ├── pages/

- **CSS3** avec variables CSS│   │   ├── Home.jsx          # Page d'accueil avec boot sequence + sons

- **Responsive Design** (320px → 3840px+)│   │   ├── About.jsx         # À propos (charge profile.json + SkillsShowcase)

- **Animations** keyframes customisées│   │   ├── Projects.jsx      # Liste projets + AdvancedThreeScene

- **Thème** : Terminal vert néon (#00FF00)│   │   ├── Contact.jsx       # Formulaire de contact

│   │   └── games/

## 🔧 Configuration│   │       └── Pong.jsx      # Mini-jeu Pong interactif

│   ├── shared/

### Personnalisation│   │   └── Typewriter.jsx    # Effet machine à écrire avec sons

│   ├── styles/

**Profil** : Éditer `src/data/profile.json`│   │   └── terminal.css      # Thème terminal + styles nouveaux composants

```json│   ├── data/

{│   │   ├── profile.json      # Données personnelles

  "name": "Votre Nom",│   │   └── asciiLogos.js     # ✨ NOUVEAU: Bibliothèque de logos ASCII

  "avatar": "/images/votre-photo.png",│   ├── utils/

  "skills": ["JavaScript", "React", ...],│   │   ├── effects.js        # Effets visuels (glitch, cursor)

  ...│   │   └── soundManager.js   # ✨ NOUVEAU: Système de sons synthétiques

}│   ├── App.jsx               # Application principale + bouton son

```│   └── main.jsx              # Point d'entrée React

├── index.html

**Projets** : Éditer `public/projects.json`├── vite.config.js

```json├── package.json

[└── README.md

  {```

    "title": "Nom du Projet",

    "stack": ["React", "Node.js"],## ✏️ Modifier le contenu

    "images": ["/images/projet/main.jpg"],

    "featured": true### Informations personnelles

  }

]Éditez `src/data/profile.json` pour modifier tes infos (nom, âge, contact, compétences, expériences, formations, langues, centres d'intérêt).

```

### Projets

## 🎮 Système de Sons

Éditez `public/projects.json` pour ajouter/modifier/supprimer des projets affichés sur la page Projects.

12 types de sons disponibles :

- `playHover()` - Feedback hover### Traductions

- `playClick()` - Confirmation clic

- `playNavigation()` - Transition pageÉditez `public/i18n.json` pour ajouter/modifier les traductions FR/EN (pour support bilingue futur).

- `playOpen()` - Ouverture modal

- `playClose()` - Fermeture## 🎨 Animations et effets

- `playGlitch()` - Effet Matrix

- Et plus...- **Scanlines** : Lignes horizontales animées sur tout le site

- **Glitch** : Effet de distorsion aléatoire sur les titres

## 📱 Responsive- **Neon glow** : Effet néon sur les bordures et textes

- **Flying code** : Code volant en arrière-plan (snippets de code gaming + tech)

Breakpoints :- **Custom cursor** : Curseur vert personnalisé avec traînée

- **320-480px** : Mobile petit- **Boot sequence** : Animation de démarrage style terminal sur Home

- **481-768px** : Mobile/Tablette- **Typewriter** : Effet machine à écrire sur les textes

- **769-1024px** : Tablette- **Loading bar** : Barre de chargement animée

- **1025-1920px** : Desktop- **ThreeJS** : Cube 3D rotatif sur la page Projects

- **1920px+** : Ultra-wide- **Pong** : Mini-jeu interactif (contrôle par souris)



## 🔒 Sécurité## 📦 Technologies utilisées



✅ Aucune donnée sensible dans le code- **React 18** : Framework frontend

✅ Pas d'email/téléphone hardcodé- **Vite 5** : Build tool ultra-rapide

✅ `.gitignore` complet- **Three.js** : Rendu 3D (cube rotatif)

✅ Anciens fichiers profile supprimés- **Framer Motion** : Animations (listée dans package.json, prête à utiliser)

✅ Clés API à ajouter en `.env` (non commité)- **CSS pur** : Thème terminal vert (scanlines, neon, glitch)

- **JavaScript ES6+** : Logique et effets

## 📄 License

## 🌐 Déploiement

MIT License - Libre d'utilisation pour projets personnels

### Option 1: XAMPP local

## 👨‍💻 Auteur

Après `npm run build`, copie le contenu de `dist/` dans `C:\xampp\htdocs\Porfolio`.

**Daniil Minevich**

- GitHub: [@KuKaRaCHa-gg](https://github.com/KuKaRaCHa-gg)### Option 2: Vercel (recommandé)



---1. Push ton projet sur GitHub

2. Connecte-toi sur [Vercel](https://vercel.com)

⭐ Si vous aimez ce projet, n'hésitez pas à mettre une étoile !3. Import ton repo GitHub

4. Déploiement automatique

### Option 3: Netlify

1. Push ton projet sur GitHub
2. Connecte-toi sur [Netlify](https://netlify.com)
3. "New site from Git" → sélectionne ton repo
4. Build command: `npm run build`
5. Publish directory: `dist`

### Option 4: Hostinger + GitHub

1. Push ton projet sur GitHub
2. Sur Hostinger, clone ton repo dans le dossier public_html
3. Installe Node.js sur ton hébergement
4. Run `npm install && npm run build`
5. Configure ton serveur pour servir le dossier `dist/`

## 🔧 Backend Symfony (optionnel)

Pour ajouter un vrai formulaire de contact avec envoi d'email:

1. Crée un dossier `backend/` à la racine
2. Initialise Symfony : `composer create-project symfony/skeleton backend`
3. Installe Symfony Mailer : `composer require symfony/mailer`
4. Configure l'envoi d'email dans `backend/.env`
5. Crée une route API `/api/contact` pour recevoir les formulaires
6. Dans React, modifie `Contact.jsx` pour envoyer à cette API

## 📝 Notes

- **Port dev** : Par défaut Vite utilise le port 5173. Pour changer, édite `vite.config.js` et ajoute `server: { port: 7173 }`
- **Images** : Place tes images dans `public/images/` et référence-les avec `/images/nom.jpg`
- **Favicon** : Remplace `public/favicon.ico` par ton propre favicon
- **Commentaires** : Tous les fichiers contiennent des commentaires pour faciliter la modification

## 🎮 Jeux inclus

- **Pong** : Mini-jeu Pong interactif (contrôle par souris). Accessible via le bouton "Pong" dans la navigation.

## 🚧 Améliorations futures

- [ ] Support bilingue FR/EN complet (i18n.json prêt)
- [ ] Backend Symfony pour formulaire de contact
- [ ] Plus de mini-jeux (Snake, Tetris, etc.)
- [ ] Mode sombre / vert / bleu / rouge
- [ ] Animations Framer Motion sur les transitions
- [ ] Modale ProjectModal interactive
- [ ] Filtres sur la page Projects (par stack, par année)

## 📧 Contact

Daniil Minevich  
GitHub: [KuKaRaCHa-gg](https://github.com/KuKaRaCHa-gg)

## 📄 Licence

Libre d'utilisation pour ton portfolio personnel.

