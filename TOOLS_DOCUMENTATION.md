# 🎮 OUTILS & JEUX INTERACTIFS - Documentation

## Vue d'ensemble

Cette section de votre portfolio contient des outils interactifs et des jeux rétro-terminaux démontrant vos compétences en algorithmique, visualisation de données et développement de jeux.

---

## 🔀 Générateur de Labyrinthes

### Caractéristiques
- **Génération procédurale** : Algorithme de Prim pour créer des labyrinthes aléatoires
- **Tailles configurables** : De 15x15 à 50x50 cellules
- **Visualisation en temps réel** : Animation de la résolution étape par étape

### Algorithmes de résolution implémentés

#### 1. A* (A-star)
- **Type** : Recherche informée
- **Propriété** : Optimal et complet
- **Performance** : Très rapide grâce à l'heuristique
- **Utilisation** : GPS, jeux vidéo, planification de trajectoires
- **Complexité** : O(b^d) avec bonne heuristique

#### 2. Dijkstra
- **Type** : Recherche uniforme
- **Propriété** : Optimal et complet
- **Performance** : Plus lent que A* mais garanti optimal
- **Utilisation** : Réseaux routiers, protocoles de routage
- **Complexité** : O((V + E) log V)

#### 3. DFS (Depth-First Search)
- **Type** : Recherche en profondeur
- **Propriété** : Non optimal mais complet
- **Performance** : Rapide mais peut trouver un chemin long
- **Utilisation** : Exploration de graphes, résolution de puzzles
- **Complexité** : O(V + E)

#### 4. BFS (Breadth-First Search)
- **Type** : Recherche en largeur
- **Propriété** : Optimal pour graphes non pondérés
- **Performance** : Explore niveau par niveau
- **Utilisation** : Plus court chemin, réseau social
- **Complexité** : O(V + E)

### Statistiques affichées
- ⏱️ **Temps d'exécution** (en secondes)
- 🔍 **Nombre de nœuds visités**
- 📏 **Longueur du chemin optimal**

### Technologies utilisées
- React Hooks (useState, useEffect, useRef)
- Canvas API pour le rendu
- Algorithmes de graphes classiques

---

## 🐍 Snake Terminal

### Caractéristiques
- **Gameplay classique** : Serpent qui grandit en mangeant des pommes
- **High Score** : Sauvegardé en localStorage
- **Difficulté progressive** : La vitesse augmente avec le score
- **Contrôles multiples** : Clavier + boutons tactiles mobiles
- **Pause** : Appuyez sur ESPACE

### Mécaniques de jeu
- 🍎 **Pommes** : +10 points, +1 segment
- 💀 **Game Over** : Collision avec murs ou soi-même
- 🏆 **Nouveau record** : Animation spéciale
- ⚡ **Vitesse** : Augmente tous les 10 points

### Contrôles
- ⬆️⬇️⬅️➡️ Flèches directionnelles
- ESPACE pour pause
- Boutons tactiles pour mobile

### Technologies utilisées
- React Hooks avec refs pour les contrôles
- Canvas API avec rendu 60fps
- LocalStorage pour persistance

---

## 🧬 Game of Life (Conway)

### Caractéristiques
- **Automate cellulaire** : Simulation des règles de Conway
- **Patterns classiques** : 6 configurations prédéfinies
- **Grille interactive** : Cliquez pour activer/désactiver cellules
- **Génération aléatoire** : Initialisation rapide
- **Contrôle de vitesse** : 10 à 100 générations/seconde

### Règles de Conway
1. 🟢 **Survie** : Cellule vivante avec 2-3 voisins → survit
2. 💀 **Mort** : Cellule vivante avec <2 ou >3 voisins → meurt
3. ✨ **Naissance** : Cellule morte avec exactement 3 voisins → naît

### Patterns prédéfinis

#### 🚀 Glider (Planeur)
- **Type** : Vaisseau spatial
- **Période** : 4 générations
- **Déplacement** : Diagonal
- **Utilisation** : Pattern le plus célèbre, démo classique

#### 🛸 LWSS (Lightweight Spaceship)
- **Type** : Vaisseau spatial lourd
- **Période** : 4 générations
- **Déplacement** : Horizontal
- **Utilisation** : Démontre mouvement complexe

#### 💫 Pulsar
- **Type** : Oscillateur
- **Période** : 3 générations
- **Déplacement** : Aucun (oscille sur place)
- **Utilisation** : Pattern symétrique impressionnant

#### 🔫 Gosper Glider Gun
- **Type** : Générateur infini
- **Période** : 30 générations
- **Production** : Crée des gliders indéfiniment
- **Utilisation** : Démontre Turing-complétude

#### ⚡ Pentadecathlon
- **Type** : Oscillateur
- **Période** : 15 générations
- **Utilisation** : Oscillateur linéaire complexe

#### 🌰 Acorn
- **Type** : Méthuselah
- **Stabilisation** : Après 5206 générations
- **Utilisation** : Petit pattern → grande structure

### Technologies utilisées
- React avec gestion d'état complexe
- Canvas API optimisée
- Algorithmes de simulation cellulaire

---

## 📊 Statistiques générales

### Outils implémentés
- ✅ Générateur de labyrinthes (4 algorithmes)
- ✅ Snake Game (contrôles complets)
- ✅ Game of Life (6 patterns)
- ⏳ Tetris (bientôt)
- ⏳ Mandelbrot Explorer (bientôt)
- ⏳ 2048 (bientôt)

### Lignes de code
- **MazeGenerator.jsx** : ~450 lignes
- **SnakeGame.jsx** : ~350 lignes
- **GameOfLife.jsx** : ~400 lignes
- **Styles CSS** : ~800 lignes
- **Total** : ~2000 lignes pour la section Tools

### Concepts démontrés
- 🧠 **Algorithmique** : A*, Dijkstra, DFS, BFS
- 🎨 **Canvas API** : Rendu 2D optimisé
- 🎮 **Game Loops** : Animation 60fps
- 💾 **Persistance** : LocalStorage
- 📱 **Responsive** : Mobile + Desktop
- ⚡ **Performance** : Optimisation React

---

## 🚀 Utilisation

### Lancement
```bash
npm run dev
```

### Navigation
1. Cliquez sur **🎮 Tools** dans le menu
2. Sélectionnez un outil dans la grille
3. Interagissez avec l'interface

### Raccourcis clavier
- **Labyrinthe** : Aucun (souris uniquement)
- **Snake** : Flèches + ESPACE
- **Game of Life** : Clic souris sur grille

---

## 🎯 Prochaines fonctionnalités

### Tetris Terminal
- Pièces classiques (I, O, T, S, Z, L, J)
- Rotation et déplacement
- Suppression de lignes
- Score et niveau
- Style CRT retro

### Mandelbrot Explorer
- Zoom interactif infini
- Palettes de couleurs
- Navigation souris
- Export d'images
- Formules mathématiques

### 2048
- Grille 4x4
- Fusion de tuiles
- Score et meilleur score
- Animation des déplacements
- Style néon terminal

---

## 🎨 Style terminal unifié

Tous les outils partagent le même thème :
- 🟢 **Couleur principale** : #00ff00 (vert néon)
- ⬛ **Fond** : #0a0a0a (noir profond)
- ✨ **Effets** : Glow, scanlines, CRT
- 🔤 **Police** : Courier New (monospace)
- 📦 **Borders** : 2-3px solid #00ff00

---

## 📚 Ressources éducatives

### Algorithmes de graphes
- [A* Algorithm](https://en.wikipedia.org/wiki/A*_search_algorithm)
- [Dijkstra's Algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)
- [DFS vs BFS](https://www.geeksforgeeks.org/difference-between-bfs-and-dfs/)

### Game of Life
- [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
- [LifeWiki Patterns](https://conwaylife.com/wiki/Main_Page)
- [Gosper Glider Gun](https://en.wikipedia.org/wiki/Gun_(cellular_automaton))

### Canvas API
- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
- [HTML5 Canvas Deep Dive](https://joshondesign.com/p/books/canvasdeepdive/title.html)

---

## 🏆 Compétences démontrées

### Algorithmique
- Implémentation de 4 algorithmes de pathfinding
- Génération procédurale de labyrinthes
- Simulation d'automate cellulaire
- Détection de collisions

### Frontend
- React Hooks avancés (useRef, useCallback)
- Canvas API avec optimisations
- Gestion d'état complexe
- Responsive design

### UX/UI
- Interface intuitive
- Feedback visuel immédiat
- Animations fluides
- Accessibilité mobile

---

**Développé par Daniil MINEVICH**  
*Portfolio Terminal Cyberpunk* 💚👾
