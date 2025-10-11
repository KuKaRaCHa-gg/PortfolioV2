# 📸 Guide d'Ajout d'Images aux Projets# Guide d'utilisation de la Galerie d'Images



## 📁 Où Mettre les Images ?## 📸 Comment ajouter des images à vos projets



### Structure Simple### Étape 1: Préparer vos images



```1. Créez le dossier `public/images/` si il n'existe pas encore

Porfolio/2. Ajoutez vos screenshots de projets dans ce dossier

└── public/3. Nommez-les de manière claire : `projet1-home.jpg`, `projet2-interface.png`, etc.

    ├── projects.json

    └── images/           ← CRÉER CE DOSSIER ICI### Étape 2: Mettre à jour projects.json

        ├── portfolio-terminal.jpg

        ├── gemohi-map.pngÉditez le fichier `public/projects.json` et ajoutez un tableau `images` pour chaque projet :

        ├── game-collection.gif

        └── ...```json

```{

  "title": "Mon Super Projet",

### Structure Organisée (Recommandée)  "short": "Description courte",

  "stack": ["React", "Node.js"],

```  "images": [

Porfolio/    {

└── public/      "url": "/images/mon-projet-home.jpg",

    ├── projects.json      "alt": "Page d'accueil",

    └── images/      "caption": "Interface principale avec dashboard"

        ├── portfolio-terminal/    },

        │   ├── main.jpg    {

        │   ├── home.png      "url": "/images/mon-projet-admin.jpg",

        │   └── projects.png      "alt": "Panel admin",

        ├── gemohi/      "caption": "Interface d'administration"

        │   ├── main.jpg    }

        │   └── map.png  ]

        └── game-collection/}

            ├── main.jpg```

            └── list.png

```### Étape 3: Intégrer la galerie dans Projects.jsx



---La galerie `ImageGallery` s'intègre automatiquement si vous l'importez :



## 🔧 Comment Ajouter des Images```jsx

import ImageGallery from '../components/ImageGallery'

### Étape 1 : Créer le Dossier

// Dans votre composant :

**Windows** :<li key={i} className="project-item">

1. Ouvrir l'explorateur de fichiers  <strong>{p.title}</strong> - {p.short}

2. Aller dans `C:\xampp\htdocs\Porfolio\public\`  <div style={{fontSize:'0.8em',opacity:0.7,marginTop:5}}>

3. Clic droit → Nouveau → Dossier    Stack: {p.stack ? p.stack.join(', ') : 'N/A'}

4. Nommer : `images`  </div>

  

**VS Code** :  {/* Afficher la galerie si images disponibles */}

1. Clic droit sur le dossier `public`  {p.images && p.images.length > 0 && (

2. "New Folder"    <ImageGallery images={p.images} />

3. Nommer : `images`  )}

</li>

### Étape 2 : Copier vos Images```



Glisser-déposer vos screenshots/photos dans `public/images/`## 🎨 Formats supportés



**Formats acceptés** :- **Images** : JPG, PNG, GIF, WebP

- ✅ JPG/JPEG (photos, screenshots)- **Ratio recommandé** : 16:9 (paysage)

- ✅ PNG (logos, transparence)- **Taille recommandée** : 1920x1080px ou 1280x720px

- ✅ GIF (animations)- **Poids max** : ~500KB par image (optimisez avec TinyPNG ou similaire)

- ✅ WebP (moderne, optionnel)

## ⚡ Optimisation

### Étape 3 : Modifier projects.json

Pour des performances optimales :

Ouvrir `public/projects.json` et ajouter le tableau `images` :

1. **Compressez vos images** avant de les ajouter

```json2. **Utilisez WebP** quand possible (meilleure compression)

{3. **Lazy loading** : L'attribut `loading="lazy"` est déjà implémenté

  "title": "Portfolio Terminal - WordPress",4. **Nommage cohérent** : Utilisez des noms descriptifs

  "short": "Portfolio professionnel avec thème rétro-terminal",

  "stack": ["PHP", "WordPress", "CSS"],## 📝 Exemple complet

  "github": "https://github.com/...",

  "images": [Un exemple complet est disponible dans `public/projects-with-images-example.json`.

    "/images/portfolio-terminal/main.jpg",

    "/images/portfolio-terminal/home.png"Pour l'activer :

  ]1. Renommez `projects.json` en `projects-backup.json`

}2. Renommez `projects-with-images-example.json` en `projects.json`

```3. Ajoutez vos vraies images dans `public/images/`



---## 🖼️ Placeholder si pas d'images



## 📝 Exemples ConcretsSi un projet n'a pas d'images, la galerie affichera automatiquement :

```

### Exemple 1 : Sans Sous-Dossiers[ Images à venir ]

```

**Structure** :

```Vous pouvez personnaliser ce message dans `ImageGallery.jsx`.

public/images/
├── portfolio.jpg
├── gemohi.png
└── game-collection.jpg
```

**projects.json** :
```json
[
  {
    "title": "Portfolio Terminal",
    "images": ["/images/portfolio.jpg"]
  },
  {
    "title": "GeMoHi",
    "images": ["/images/gemohi.png"]
  }
]
```

### Exemple 2 : Avec Sous-Dossiers (Mieux)

**Structure** :
```
public/images/
├── portfolio/
│   ├── main.jpg
│   ├── home.png
│   └── about.png
└── gemohi/
    ├── main.jpg
    └── map.png
```

**projects.json** :
```json
[
  {
    "title": "Portfolio Terminal",
    "images": [
      "/images/portfolio/main.jpg",
      "/images/portfolio/home.png",
      "/images/portfolio/about.png"
    ]
  },
  {
    "title": "GeMoHi",
    "images": [
      "/images/gemohi/main.jpg",
      "/images/gemohi/map.png"
    ]
  }
]
```

---

## ✅ Checklist

Avant de tester :

- [ ] Dossier `public/images/` créé
- [ ] Images copiées dedans
- [ ] Noms sans espaces : `mon-projet.jpg` ✅ (pas `mon projet.jpg` ❌)
- [ ] Extensions en minuscules : `.jpg` ✅ (pas `.JPG` ❌)
- [ ] Chemins dans `projects.json` commencent par `/images/`
- [ ] Toutes les images < 1 MB (optimisées)

---

## 🧪 Tester Localement

```powershell
# 1. Lancer le serveur
npm run dev

# 2. Ouvrir http://localhost:5173
# 3. Aller sur Projects
# 4. Vérifier que les images s'affichent
```

Si image ne s'affiche pas, vérifier :
- Chemin correct dans `projects.json`
- Fichier existe bien dans `public/images/`
- Nom exact (attention majuscules/minuscules)

---

## 📤 Pour Hostinger

Quand vous déployez sur Hostinger :

```
public_html/
├── index.html
├── assets/
├── projects.json
└── images/          ← NE PAS OUBLIER !
    ├── projet1.jpg
    ├── projet2.png
    └── ...
```

**Important** : Uploader le dossier `images/` en même temps que le build !

---

## 💡 Conseils

### Optimiser les Images

**Avant upload** :
- Redimensionner : Max 1920x1080px
- Compresser sur [TinyPNG](https://tinypng.com)
- Convertir JPG si possible (plus léger que PNG)

### Noms de Fichiers

**Bon** ✅ :
- `portfolio-main.jpg`
- `gemohi-map-view.png`
- `snake-game-demo.gif`

**Mauvais** ❌ :
- `Image 1.jpg` (espace)
- `Photo.JPG` (majuscules)
- `capture d'écran.png` (espaces + accents)

### Plusieurs Images par Projet

```json
{
  "title": "Mon Projet",
  "images": [
    "/images/projet/main.jpg",       // Image principale
    "/images/projet/screenshot1.png", // Screenshots supplémentaires
    "/images/projet/screenshot2.png",
    "/images/projet/demo.gif"         // Animation
  ]
}
```

La première image sera affichée sur la carte, les autres dans le modal/carrousel.

---

## 🚨 Problèmes Fréquents

### Image ne s'affiche pas

**Vérifier** :
1. Chemin commence par `/images/` (avec le slash)
2. Fichier existe dans `public/images/`
3. Nom exact (respecter majuscules/minuscules)
4. Extension en minuscules

### Image trop lourde

Compresser sur :
- [TinyPNG](https://tinypng.com) - PNG/JPG
- [Squoosh](https://squoosh.app) - Tous formats

Objectif : < 500 KB par image

---

## 📖 Exemples Complets

### Portfolio avec 11 Projets

```json
[
  {
    "title": "Portfolio Terminal - WordPress",
    "images": ["/images/portfolio-wordpress.jpg"]
  },
  {
    "title": "GeMoHi - Game on Map",
    "images": [
      "/images/gemohi/main.jpg",
      "/images/gemohi/map.png",
      "/images/gemohi/gameplay.gif"
    ]
  },
  {
    "title": "Game Collection Manager",
    "images": ["/images/game-collection.jpg"]
  },
  {
    "title": "DEALLOC - Nuit de l'Info 2024",
    "images": []
  },
  {
    "title": "SAE 2.01 - Gestionnaire de Jeux",
    "images": [
      "/images/sae201/accueil.png",
      "/images/sae201/liste.png"
    ]
  }
]
```

**Note** : Si `images: []` (vide), le projet affichera une image placeholder par défaut.

---

## 🎯 Résumé Rapide

```powershell
# 1. Créer dossier
mkdir public\images

# 2. Copier vos images
# (Glisser-déposer dans public/images/)

# 3. Éditer projects.json
{
  "title": "Mon Projet",
  "images": ["/images/mon-projet.jpg"]
}

# 4. Tester
npm run dev

# 5. Déployer (n'oubliez pas le dossier images!)
npm run build
```

---

## ✨ Et voilà !

Vos projets auront maintenant de belles images ! 🎨

Questions ? Regardez les autres guides dans le dossier :
- `DEPLOIEMENT_HOSTINGER.md` - Comment mettre en ligne
- `RESPONSIVE_FIXES.md` - Corrections responsive
- `CORRECTIONS_LAYOUT.md` - Fixes layout récents
