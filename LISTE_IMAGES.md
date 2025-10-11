# 📸 Liste des Images à Créer - Portfolio

## 🎯 Format et Style Général

### Spécifications Techniques
- **Format** : JPG (photos/screenshots), PNG (UI/transparence), GIF (animations)
- **Taille** : 1920x1080px (Full HD) ou 1200x800px minimum
- **Poids** : < 500 KB par image JPG, < 200 KB par PNG
- **Ratio** : 16:9 ou 4:3
- **Style** : Screenshots propres, fond sombre si possible

### Style Visuel Recommandé
- ✅ **Thème sombre** (correspond au portfolio terminal)
- ✅ **Interface claire** (pas de données personnelles visibles)
- ✅ **Zoom approprié** (texte lisible)
- ✅ **Qualité** (pas flou, bien cadré)
- ✅ **Contexte** (montrer l'utilisation réelle)

---

## 📋 Liste Complète des Images par Projet

### 1. Portfolio Terminal - WordPress ⭐

**Priorité** : HAUTE (featured)

**Images à prendre** (3-5) :
```
public/images/portfolio-terminal/
├── main.jpg           [OBLIGATOIRE] Page d'accueil
├── projects.png       [RECOMMANDÉ] Page projets avec grille
├── about.png          [RECOMMANDÉ] Page à propos
├── terminal-effet.gif [OPTIONNEL] Animation du terminal
└── responsive.png     [OPTIONNEL] Vue mobile
```

**Style** :
- Theme rétro-terminal vert phosphorescent
- Animations Matrix visibles
- Effets de scanlines
- Fond noir avec bordures néon

**Capture** :
1. Ouvrir le site WordPress
2. Plein écran (F11)
3. Win + Shift + S pour capturer
4. Sauvegarder en JPG

**Optimisation** :
```
Avant : 2.5 MB
TinyPNG : 450 KB ✓
```

---

### 2. GeMoHi - Game on Map ⭐

**Priorité** : HAUTE (featured)

**GitHub** : https://github.com/KuKaRaCHa-gg/GeMoHi.git

**Images à prendre** (4-6) :
```
public/images/gemohi/
├── main.jpg           [OBLIGATOIRE] Carte avec zones 1000mx1000m explorées
├── map-zones.png      [OBLIGATOIRE] Grille des cases découvertes colorées
├── stats.png          [RECOMMANDÉ] Stats (pièces, % terre, zones)
├── ui-menu.png        [RECOMMANDÉ] Menu avec color picker et options
├── gameplay.gif       [OPTIONNEL] Animation exploration en temps réel
└── rules.png          [OPTIONNEL] Écran des règles du jeu
```

**Description du Jeu** :
- **Concept** : Jeu de capture de zones basé sur géolocalisation GPS
- **Système** : Grille de cases 1000m x 1000m (abandonné système cercles pour perf)
- **Objectif** : Explorer le monde réel pour marquer des territoires et collecter pièces
- **Techno** : Android (min API 25), Google Maps API, sauvegarde Gson/JSON, POO Java
- **Originalité** : % de surface terrestre découverte, exécution en arrière-plan

**Style des Screenshots** :
- ✅ **Carte Google Maps** avec grille de zones colorées (1000mx1000m)
- ✅ **Cases explorées** bien visibles (couleur personnalisable avec color picker)
- ✅ **UI responsive** en overlay sur carte (stats, boutons, recentrage)
- ✅ **Statistiques** : Nombre de pièces, % terre découverte, nb zones explorées
- ✅ **Pièces dorées** visibles sur la carte (même si "inutiles" mais satisfaction !)
- ✅ **Thème coloré** (pas sombre comme terminal, UI Android native colorée)

**Fonctionnalités à Montrer** :
1. **Carte principale** :
   - Grille 1000m x 1000m avec plusieurs cases explorées
   - Position GPS actuelle (point bleu)
   - Zones colorées (couleur picker custom)
   - Pièces dorées à ramasser
   
2. **Interface Stats** :
   - 💰 Nombre de pièces collectées
   - 🌍 % de terre découverte (ex: 0.0001%)
   - 📍 Nombre de zones explorées
   
3. **Menu Options** :
   - 🎨 Color Picker (personnalisation couleur zones)
   - 📜 Règles du jeu
   - ℹ️ Crédits
   - 🎯 Bouton recentrage sur position
   
4. **Version évolutive** :
   - Montrer différence entre V0.125 (cercles) et V1.0 (cases)
   - Si possible screenshot ancien vs nouveau système

**Capture** :
1. **Lancer sur téléphone Android** (meilleure option) :
   ```
   - Activer GPS + Données mobiles
   - Lancer GeMoHi
   - Se déplacer pour avoir 5-10 zones explorées
   - Screenshot : Volume Down + Power
   - Transférer images via USB ou Google Photos
   ```

2. **Ou émulateur Android Studio** :
   ```
   - Ouvrir AVD Manager
   - Lancer émulateur avec Google Play
   - Simuler localisation GPS (3 points dans Extended Controls)
   - Déplacer manuellement position pour créer zones
   - Screenshot dans émulateur
   ```

3. **Screenshots importants** :
   - Carte avec zones explorées (main.jpg)
   - Stats en overlay (stats.png)
   - Menu ouvert avec color picker (ui-menu.png)
   - GIF de l'exploration en temps réel (gameplay.gif avec ScreenToGif)

**Contenu de Test Idéal** :
- **Minimum 5-10 zones explorées** (pour montrer le système de grille)
- **Plusieurs pièces collectées** (ex: 47 pièces)
- **% terre découverte** visible (ex: 0.0001% ou 0.001%)
- **Couleur custom** (pas couleur par défaut, montrer personnalisation)
- **Zoom carte** approprié (voir plusieurs cases et grille 1000m)

**Ce qui rend GeMoHi unique** :
- ❌ PAS de cercles qui se superposent (optimisation performance)
- ✅ Cases fixes 1000mx1000m alignées sur point (0,0,0)
- ✅ Pièces par zone (pas individuelles)
- ✅ % terre découverte calculé précisément
- ✅ Addictif même pour le créateur !
- ⚠️ Limité 2 mois (coût API Google 200€/mois après)

**Versions à potentiellement capturer** :
- **V1.0 (OBLIGATOIRE)** : Version finale avec tout (color picker, règles, crédits, responsive)
- **V0.750** : UI amélioré, système cases 1000m actuel
- **V0.125** : Première version avec cercles (pour comparaison avant/après)

**GitHub README visible** :
- Montrer que le repo a un README explicatif
- API Google Maps documentée
- Code POO en Java

---

### 3. Game Collection Manager ⭐

**Priorité** : HAUTE (featured)

**Images à prendre** (3-5) :
```
public/images/game-collection/
├── main.jpg           [OBLIGATOIRE] Dashboard principal
├── liste.png          [RECOMMANDÉ] Liste des jeux
├── details.png        [RECOMMANDÉ] Fiche détaillée
├── recherche.gif      [OPTIONNEL] Animation recherche
└── stats.png          [OPTIONNEL] Statistiques
```

**Style** :
- Interface web Bootstrap
- Grilles de jeux avec covers
- Couleurs vives (jaquettes de jeux)
- UI moderne et propre

**Capture** :
1. Ouvrir localhost ou version déployée
2. Remplir avec quelques jeux exemple
3. Screenshot page liste complète
4. Screenshot d'une fiche détaillée

**Contenu fake OK** :
- Utiliser jeux populaires (Mario, Zelda, etc.)
- Données de test visibles
- Toutes les fonctionnalités montrées

---

### 4. DEALLOC - Nuit de l'Info 2024 ⭐

**Priorité** : HAUTE (featured)

**Images à prendre** (2-3) :
```
public/images/dealloc/
├── main.jpg           [OBLIGATOIRE] Page d'accueil du projet
├── feature1.png       [RECOMMANDÉ] Fonctionnalité principale
└── team.png           [OPTIONNEL] Interface ou concept
```

**Style** :
- Design de hackathon (créatif, rapide)
- Thème de la Nuit de l'Info
- Interface web responsive
- Couleurs dynamiques

**Si pas de deploy actif** :
- Screenshots de localhost
- Ou screenshots pendant l'événement
- Ou mockups de design
- Ou photos de l'équipe au travail (flouter visages si souhaité)

---

### 5. SAE 2.01 - Gestionnaire Jeux Vidéo ⭐

**Priorité** : HAUTE (featured)

**Images à prendre** (3-4) :
```
public/images/sae201/
├── main.jpg           [OBLIGATOIRE] Interface principale JavaFX
├── liste.png          [RECOMMANDÉ] Liste des jeux
├── details.png        [RECOMMANDÉ] Fiche d'un jeu
└── recherche.png      [OPTIONNEL] Fonction recherche
```

**Style** :
- Interface JavaFX propre
- Thème clair ou sombre (selon design)
- Données de test visibles
- UI desktop native

**Capture** :
1. Lancer le .jar ou depuis IDE
2. Ajouter quelques jeux exemple
3. Win + Shift + S pour capturer
4. Montrer toutes les fonctionnalités

**Éléments à montrer** :
- Grille de jeux
- Formulaire d'ajout
- Recherche/filtres
- Détails complets

---

### 6. SCCM/MECM Admin Tools

**Priorité** : MOYENNE

**Images à prendre** (1-2) :
```
public/images/sccm-tools/
├── main.png           [OBLIGATOIRE] Interface PowerShell/script
└── results.png        [OPTIONNEL] Résultats d'exécution
```

**Style** :
- Terminal PowerShell bleu Windows
- Code PowerShell visible
- Résultats de commandes
- **ATTENTION** : Masquer noms de machines/utilisateurs réels !

**Capture** :
1. Ouvrir PowerShell ISE
2. Charger le script
3. Screenshot du code (partie significative)
4. Ou screenshot résultat avec données anonymisées

**Sécurité** :
- ❌ Pas de noms de serveurs réels
- ❌ Pas d'adresses IP
- ❌ Pas de comptes AD réels
- ✅ Utiliser données de test/dev

---

### 7. Active Directory Manager

**Priorité** : MOYENNE

**Images à prendre** (1-2) :
```
public/images/ad-manager/
├── main.png           [OBLIGATOIRE] Script PowerShell
└── console.png        [OPTIONNEL] Exécution
```

**Style** :
- PowerShell bleu
- Code bien indenté
- Commentaires visibles
- **SÉCURITÉ** : Données anonymes uniquement

**Même précautions que SCCM Tools**

---

### 8. Portfolio Moderne

**Priorité** : MOYENNE

**Images à prendre** (2-3) :
```
public/images/portfolio-moderne/
├── main.jpg           [OBLIGATOIRE] Page d'accueil
├── projects.png       [RECOMMANDÉ] Section projets
└── responsive.png     [OPTIONNEL] Vue mobile
```

**Style** :
- Design moderne (pas terminal)
- Interface web épurée
- Couleurs claires ou design system
- Animations/transitions visibles

**Capture** :
1. Ouvrir le site
2. Plein écran
3. Screenshot des sections principales

---

### 9. Duck Simulator

**Priorité** : BASSE

**Images à prendre** (1-2) :
```
public/images/duck/
├── main.png           [OBLIGATOIRE] Interface console Java
└── uml.png            [OPTIONNEL] Diagramme UML
```

**Style** :
- Console Java avec output
- Ou diagramme de classes UML
- Code source visible
- Patterns de design apparents

**Capture** :
1. Lancer depuis IDE
2. Screenshot de la console avec output
3. Ou exporter diagramme UML depuis IDE

---

### 10. MortPion - Tic Tac Toe

**Priorité** : BASSE

**Images à prendre** (1-2) :
```
public/images/mortpion/
├── main.jpg           [OBLIGATOIRE] Interface de jeu JavaFX
└── gameplay.gif       [OPTIONNEL] Animation partie
```

**Style** :
- Interface JavaFX avec grille 3x3
- Symboles X et O visibles
- Design soigné
- Partie en cours

**Capture** :
1. Lancer le jeu
2. Jouer quelques coups
3. Screenshot avec partie en cours
4. Optionnel : GIF d'une partie complète (ScreenToGif)

---

### 11. Date C++ Class

**Priorité** : BASSE

**Images à prendre** (1) :
```
public/images/date-cpp/
└── main.png           [OBLIGATOIRE] Code C++ + output
```

**Style** :
- Code C++ dans IDE (VS Code, CLion, Visual Studio)
- Syntaxe colorée
- Tests unitaires ou main() avec résultats
- Console avec output

**Capture** :
1. Ouvrir le fichier .cpp dans IDE
2. Split screen : code + terminal
3. Screenshot montrant classe Date et utilisation

---

## 🎨 Outils Recommandés

### Capture d'Écran
1. **Windows** : `Win + Shift + S` (Snipping Tool)
2. **Chrome Extension** : [GoFullPage](https://chrome.google.com/webstore/detail/gofullpage) (page complète)
3. **Logiciel** : ShareX (gratuit, puissant)

### GIF Animés
1. **ScreenToGif** (gratuit, Windows) - [screentogif.com](https://www.screentogif.com/)
2. **LICEcap** (gratuit, léger)
3. **OBS Studio** (enregistrer → convertir en GIF)

### Optimisation
1. **TinyPNG** - [tinypng.com](https://tinypng.com) (PNG/JPG)
2. **Squoosh** - [squoosh.app](https://squoosh.app) (tous formats)
3. **ezgif** - [ezgif.com](https://ezgif.com) (optimiser GIF)

---

## 📊 Checklist par Projet

### Projets avec Deploy Web (Priorité 1)
- [ ] Portfolio Terminal WordPress (3 images)
- [ ] Game Collection Manager (3 images)
- [ ] Portfolio Moderne (2 images)

### Projets Mobile/Desktop (Priorité 2)
- [ ] GeMoHi Android (2 images)
- [ ] SAE 2.01 JavaFX (3 images)
- [ ] MortPion JavaFX (1 image)

### Projets Code/Scripts (Priorité 3)
- [ ] DEALLOC (2 images)
- [ ] SCCM Tools (1 image anonymisée)
- [ ] AD Manager (1 image anonymisée)
- [ ] Duck Simulator (1 image)
- [ ] Date C++ (1 image)

---

## 🎯 Priorités de Capture

### À faire en PREMIER (Featured)
1. **Portfolio Terminal** - Main, Projects, About
2. **Game Collection** - Dashboard, Liste, Détails
3. **GeMoHi** - Carte, Menu
4. **SAE 2.01** - Interface, Liste
5. **DEALLOC** - Page principale

**Temps estimé** : 1-2 heures

### À faire ENSUITE
6. Portfolio Moderne (1 image minimum)
7. SCCM/AD Tools (1 image anonyme chacun)
8. MortPion (1 image)

**Temps estimé** : 30 minutes

### À faire SI TEMPS
9. Duck Simulator
10. Date C++
11. GIF animés

**Temps estimé** : 30 minutes

---

## 📝 Template projects.json

Une fois images capturées :

```json
{
  "title": "Portfolio Terminal - WordPress",
  "short": "Portfolio professionnel avec thème rétro-terminal",
  "stack": ["PHP", "WordPress", "CSS", "JavaScript", "Bedrock"],
  "github": "https://github.com/...",
  "date": "2024-03",
  "featured": true,
  "images": [
    "/images/portfolio-terminal/main.jpg",
    "/images/portfolio-terminal/projects.png",
    "/images/portfolio-terminal/about.png"
  ]
}
```

---

## ✅ Résumé Rapide

### Nombre d'Images Total
- **Minimum** : 11 images (1 par projet)
- **Recommandé** : 25-30 images (2-3 par projet)
- **Optimal** : 35-40 images (avec GIF)

### Temps Total Estimé
- **Capture** : 2-3 heures
- **Optimisation** : 30 minutes
- **Organisation** : 15 minutes
- **Ajout projects.json** : 15 minutes

**TOTAL** : ~3-4 heures de travail

---

## 🚀 Workflow Recommandé

### Session 1 : Projets Web (1h)
1. Portfolio Terminal (3 images)
2. Game Collection (3 images)
3. Portfolio Moderne (2 images)

### Session 2 : Apps Desktop/Mobile (1h)
4. GeMoHi (2 images)
5. SAE 2.01 (3 images)
6. MortPion (1 image)

### Session 3 : Code/Scripts (1h)
7. DEALLOC (2 images)
8. SCCM/AD (2 images anonymisées)
9. Duck/Date (2 images)

### Session 4 : Optimisation (30min)
- Compresser toutes les images
- Organiser dans dossiers
- Mettre à jour projects.json
- Tester localement

---

## 💡 Conseils Finaux

### Pour de Beaux Screenshots
- ✅ Résolution élevée (1920x1080 minimum)
- ✅ Zoom approprié (100%, pas 125% ou 150%)
- ✅ Navigateur sans extensions visibles
- ✅ Barre de signets cachée (Ctrl+Shift+B)
- ✅ Plein écran (F11) pour web

### Données de Test
- ✅ Utiliser jeux/projets connus
- ✅ Remplir avec contenu réaliste
- ✅ Pas de "test", "aaaa", "lorem ipsum"
- ✅ Montrer fonctionnalités réelles

### Sécurité
- ❌ Pas de données personnelles
- ❌ Pas de noms réels (AD/SCCM)
- ❌ Pas d'adresses IP privées
- ✅ Anonymiser si nécessaire

---

## 📞 Questions ?

**Tous les guides sont dans** : `C:\xampp\htdocs\Porfolio\`

- `GUIDE_IMAGES.md` - Comment intégrer les images
- `DEPLOIEMENT_HOSTINGER.md` - Comment déployer
- `LISTE_IMAGES.md` - Ce fichier (liste complète)

**Bon courage pour les captures ! 📸🎉**
