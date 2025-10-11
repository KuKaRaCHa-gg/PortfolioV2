# 📸 Images pour les Projets

## Comment ajouter vos propres images

### 1. Préparer vos images

Placez vos images de projets dans ce dossier (`public/images/`).

**Formats recommandés** :
- JPG ou PNG
- Résolution : 1200x800px minimum
- Ratio : 16:9 ou 3:2
- Poids : moins de 500KB (optimisez avec TinyPNG.com)

### 2. Nommer vos fichiers

Utilisez des noms clairs et descriptifs :
```
projet-musee-home.jpg
projet-musee-admin.jpg
projet-fxml-dashboard.jpg
projet-fxml-login.jpg
portfolio-terminal-home.jpg
```

### 3. Mettre à jour projects.json

Éditez `public/projects.json` et ajoutez un tableau `images` :

```json
{
  "title": "Site Musée - WordPress",
  "short": "Site web pour un musée avec gestion de contenu",
  "stack": ["WordPress", "PHP", "MySQL", "CSS"],
  "images": [
    {
      "url": "/images/projet-musee-home.jpg",
      "alt": "Page d'accueil du site musée",
      "caption": "Interface d'accueil avec galerie d'œuvres"
    },
    {
      "url": "/images/projet-musee-admin.jpg",
      "alt": "Interface d'administration",
      "caption": "Panneau d'administration WordPress personnalisé"
    }
  ]
}
```

## Placeholders automatiques

Si vous n'ajoutez pas d'images, le système génère automatiquement des placeholders avec :
- Fond vert terminal
- Nom du projet en ASCII
- Style cohérent avec le thème

## Optimisation des images

Pour de meilleures performances :

1. **Compresser** : Utilisez [TinyPNG](https://tinypng.com/) ou [Squoosh](https://squoosh.app/)
2. **Redimensionner** : Maximum 1920x1080px
3. **Format WebP** : Plus léger que JPG (optionnel mais recommandé)

### Conversion en WebP (optionnel)

```bash
# Installer cwebp (si vous voulez utiliser WebP)
# Puis convertir :
cwebp -q 80 projet-musee-home.jpg -o projet-musee-home.webp
```

## Exemples de projets avec images

Voir `public/projects-with-images-example.json` pour un exemple complet.

## Effets appliqués aux images

Les images des projets ont automatiquement :
- ✅ Filtre vert Matrix au survol
- ✅ Effet de zoom smooth
- ✅ Scanlines CRT rétro
- ✅ Overlay interactif
- ✅ Badge "NOUVEAU" pour les 2 premiers projets
- ✅ Effet parallax 3D au hover

Pas besoin de modifier le CSS, tout est automatique ! 🚀
