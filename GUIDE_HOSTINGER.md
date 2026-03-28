# 🚀 Guide d'installation sur Hostinger

## ✅ Build terminé avec succès !

Le dossier **`dist/`** contient votre site prêt pour la production.

---

## 📋 Étapes pour uploader sur Hostinger

### 1️⃣ Connectez-vous à Hostinger
- Allez sur : https://hpanel.hostinger.com
- Connectez-vous avec vos identifiants

### 2️⃣ Ouvrez le File Manager
- Dans votre panel Hostinger pour **daniilminevich.com**
- Cliquez sur **"Gestionnaire de fichiers"** (File Manager)

### 3️⃣ Nettoyez public_html
- Naviguez vers le dossier **`public_html`**
- **SUPPRIMEZ TOUT** le contenu existant (fichiers par défaut Hostinger)
- Sélectionnez tout → Clic droit → Delete

### 4️⃣ Uploadez votre site
**Sur votre PC :**
- Ouvrez le dossier : `C:\xampp\htdocs\Porfolio\dist\`

**Dans Hostinger File Manager :**
- Dans `public_html`, cliquez sur **"Upload"**
- **Glissez-déposez TOUT le contenu** du dossier `dist/` :
  - ✅ index.html
  - ✅ .htaccess
  - ✅ assets/ (dossier complet)
  - ✅ images/ (dossier complet)
  - ✅ projects.json
  - ✅ i18n.json

⚠️ **IMPORTANT** : Uploadez le **CONTENU** de `dist/`, pas le dossier `dist/` lui-même !

### 5️⃣ Vérifiez les permissions
- Fichiers : **644**
- Dossiers : **755**
- (Normalement automatique sur Hostinger)

### 6️⃣ Connectez votre domaine
- Retournez au dashboard Hostinger
- Cliquez sur **"Connecter le nom de domaine"**
- Suivez les instructions pour pointer **daniilminevich.com** vers votre hébergement

### 7️⃣ Testez !
- Allez sur : **https://daniilminevich.com** 🎉
- Si le domaine n'est pas encore connecté, utilisez l'URL temporaire fournie par Hostinger

---

## 📂 Structure finale dans public_html :

```
public_html/
├── .htaccess                    ← Pour React Router
├── index.html                   ← Page principale
├── assets/
│   ├── index-D60Y2PO5.css      ← Styles (53 KB)
│   └── index-DM_XWTbj.js       ← JavaScript (662 KB)
├── images/
│   ├── PP&logo/
│   │   ├── LogoRond.png        ← Votre logo (1 MB)
│   │   └── PhotoProfileDaniilMinevich.png (1.5 MB)
│   ├── GeoMoHIDE/
│   │   ├── Logo_GeoMoHi.png
│   │   └── ScreenGamplayGeoMoHi.jpg
│   ├── C.png, C++.png, CSS.png, HTML.png, Java.png, 
│   ├── JS.png, NODE.png, PHP.png, Python.png, SQL.png
├── projects.json                ← Liste des projets
└── i18n.json                    ← Traductions
```

---

## 🔄 Pour les mises à jour futures

Quand vous modifiez votre portfolio :

```powershell
# Sur votre PC
cd C:\xampp\htdocs\Porfolio
npm run build

# Puis uploadez le nouveau contenu de dist/ sur Hostinger
```

---

## ✅ Checklist finale

- [ ] Build terminé (dossier `dist/` créé)
- [ ] `.htaccess` présent dans `dist/`
- [ ] File Manager Hostinger ouvert
- [ ] `public_html` vidé
- [ ] Contenu de `dist/` uploadé
- [ ] Domaine connecté
- [ ] Site testé et fonctionnel

---

## 🎯 Résultat

✅ Site statique optimisé  
✅ Taille totale : ~3 MB (avec images)  
✅ Temps de chargement : ~2-3 secondes  
✅ React Router configuré  
✅ Cache et compression activés  

---

## 📧 Besoin d'aide ?

Si le site ne s'affiche pas :
1. Vérifiez que le domaine est bien connecté
2. Videz le cache de votre navigateur (Ctrl + Shift + R)
3. Attendez 5-10 minutes (propagation DNS)
4. Vérifiez que `index.html` est bien à la racine de `public_html`

**Bon déploiement ! 🚀**
