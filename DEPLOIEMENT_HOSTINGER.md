# 🚀 Guide de Déploiement sur Hostinger

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir :
- ✅ Un compte Hostinger actif
- ✅ Un plan d'hébergement web (pas juste le domaine)
- ✅ Accès au panneau de contrôle Hostinger (hPanel)
- ✅ Votre portfolio React/Vite compilé

---

## 🔨 Étape 1 : Build du Projet

### 1.1 Ouvrir le Terminal dans VS Code

```powershell
# Dans le dossier du projet
cd C:\xampp\htdocs\Porfolio
```

### 1.2 Installer les dépendances (si pas déjà fait)

```powershell
npm install
```

### 1.3 Créer le build de production

```powershell
npm run build
```

**Résultat** : Un dossier `dist` sera créé avec tous les fichiers optimisés

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
└── projects.json
```

---

## 📤 Étape 2 : Préparer les Fichiers

### 2.1 Vérifier le contenu du dossier `dist`

Vérifiez que vous avez :
- ✅ `index.html`
- ✅ Dossier `assets/` avec JS et CSS
- ✅ `projects.json`
- ✅ Dossier `images/` (si vous avez ajouté des images)

### 2.2 Créer une archive ZIP (optionnel)

**Option A** : Clic droit sur le dossier `dist` → "Compresser vers ZIP"

**Option B** : Utiliser PowerShell
```powershell
Compress-Archive -Path .\dist\* -DestinationPath portfolio.zip
```

---

## 🌐 Étape 3 : Connexion à Hostinger

### 3.1 Se connecter au hPanel

1. Aller sur [hostinger.fr](https://www.hostinger.fr)
2. Cliquer sur **"Se connecter"**
3. Entrer vos identifiants
4. Accéder au **hPanel** (panneau de contrôle)

### 3.2 Choisir votre site web

1. Dans le menu de gauche, cliquer sur **"Sites Web"**
2. Sélectionner le site où vous voulez déployer
3. Ou créer un nouveau site si nécessaire

---

## 📂 Étape 4 : Upload via File Manager

### 4.1 Ouvrir le File Manager

1. Dans le hPanel, chercher **"Gestionnaire de fichiers"** ou **"File Manager"**
2. Cliquer dessus pour ouvrir l'interface

### 4.2 Naviguer vers public_html

```
/ (racine)
└── public_html/  ← C'est ici !
```

**Important** : `public_html` est le dossier qui contient votre site web visible

### 4.3 Supprimer les fichiers par défaut

Dans `public_html`, supprimer :
- `index.html` (page par défaut Hostinger)
- Tous les autres fichiers de démo

### 4.4 Uploader les fichiers du build

**Méthode 1 : Upload direct**
1. Cliquer sur **"Upload"**
2. Sélectionner **TOUS** les fichiers du dossier `dist`
3. Attendre la fin de l'upload (barre de progression)

**Méthode 2 : Upload ZIP puis extraction**
1. Upload `portfolio.zip` dans `public_html`
2. Clic droit sur `portfolio.zip` → **"Extract"**
3. Supprimer `portfolio.zip` après extraction

### 4.5 Vérifier la structure

Après upload, `public_html` doit contenir :
```
public_html/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
├── projects.json
└── images/ (si présent)
```

**⚠️ ERREUR FRÉQUENTE** :
Si vous avez :
```
public_html/
└── dist/
    └── index.html
```
❌ **MAUVAIS !** Déplacer le contenu de `dist` directement dans `public_html`

---

## 🔧 Étape 5 : Configuration (si nécessaire)

### 5.1 Vérifier le fichier .htaccess

Si votre site ne charge pas correctement, créer un fichier `.htaccess` dans `public_html` :

```apache
# .htaccess pour React SPA (Single Page Application)

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Rediriger toutes les requêtes vers index.html sauf fichiers existants
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

# Activer la compression GZIP
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Cache des fichiers statiques
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
</IfModule>
```

### 5.2 Configurer le domaine (si personnalisé)

1. Dans hPanel, aller dans **"Domaines"**
2. Cliquer sur **"Gérer"** à côté de votre domaine
3. Vérifier que le domaine pointe vers `public_html`
4. Si sous-domaine, créer : `portfolio.votredomaine.com`

---

## ✅ Étape 6 : Tester le Site

### 6.1 Accéder au site

- URL principale : `https://votredomaine.com`
- URL temporaire : `https://votresite.hostingersite.com` (fournie par Hostinger)

### 6.2 Vérifications

- ✅ La page d'accueil s'affiche
- ✅ Les animations fonctionnent
- ✅ La navigation marche (Home, About, Projects, etc.)
- ✅ Les images se chargent (si présentes)
- ✅ Les projets s'affichent depuis `projects.json`
- ✅ Le background 3D fonctionne
- ✅ Pas d'erreurs dans la console (F12)

### 6.3 Vérifier la console du navigateur

1. Ouvrir le site
2. Appuyer sur **F12**
3. Aller dans l'onglet **"Console"**
4. Vérifier qu'il n'y a **pas d'erreurs rouges**

**Erreurs courantes** :
- ❌ `Failed to load resource: 404` → Fichier manquant
- ❌ `CORS error` → Problème de configuration serveur
- ❌ `Mixed content` → HTTP/HTTPS mixé

---

## 🔄 Étape 7 : Mises à Jour Futures

### 7.1 Pour mettre à jour le site

```powershell
# 1. Faire les modifications dans le code
# 2. Rebuild
npm run build

# 3. Re-upload le contenu de dist/ vers public_html/
```

### 7.2 Méthode rapide avec FileZilla (recommandé)

**Installer FileZilla** (client FTP gratuit)

1. Télécharger : [filezilla-project.org](https://filezilla-project.org/)
2. Installer FileZilla

**Configurer la connexion FTP**

1. Dans hPanel Hostinger, aller dans **"FTP Accounts"**
2. Noter les informations :
   - **Host** : `ftp.votredomaine.com`
   - **Username** : `u123456789` (fourni par Hostinger)
   - **Password** : (votre mot de passe FTP)
   - **Port** : `21`

3. Dans FileZilla :
   - Fichier → Gestionnaire de sites
   - Nouveau site
   - Entrer les infos FTP
   - Se connecter

4. Glisser-déposer les fichiers de `dist/` vers `public_html/`

**Avantage** : Beaucoup plus rapide pour les mises à jour fréquentes !

---

## 🚨 Dépannage

### Problème 1 : Page blanche

**Causes possibles** :
- ❌ Fichiers mal placés (dans `dist/` au lieu de `public_html/`)
- ❌ Erreur JavaScript (vérifier console F12)
- ❌ Mauvais chemin dans `vite.config.js`

**Solutions** :
```javascript
// vite.config.js
export default defineConfig({
  base: '/', // Pour la racine du domaine
  // ou
  base: '/portfolio/', // Pour un sous-dossier
})
```

Puis rebuild : `npm run build`

### Problème 2 : CSS/JS ne charge pas

**Vérifier** :
1. Les fichiers existent dans `public_html/assets/`
2. Les chemins sont relatifs dans `index.html`
3. Permissions des fichiers (755 pour dossiers, 644 pour fichiers)

**Fix permissions** :
Dans File Manager Hostinger :
- Clic droit sur dossier → Permissions → 755
- Clic droit sur fichier → Permissions → 644

### Problème 3 : Images ne s'affichent pas

**Vérifier** :
1. Les images sont bien dans `public_html/images/`
2. Les chemins dans `projects.json` sont corrects :
   ```json
   "images": ["/images/projet1.jpg"]
   ```
3. Extensions en minuscules (`.jpg` pas `.JPG`)

### Problème 4 : 404 sur les routes

**Besoin d'un `.htaccess`** (voir Étape 5.1)

---

## 📊 Optimisations Post-Déploiement

### 1. SSL/HTTPS

Dans hPanel :
1. Aller dans **"SSL"**
2. Activer **"Force HTTPS"**
3. Installer certificat SSL gratuit (Let's Encrypt)

### 2. CDN Cloudflare (optionnel)

1. Créer compte sur [cloudflare.com](https://www.cloudflare.com)
2. Ajouter votre site
3. Modifier les nameservers chez Hostinger
4. Activer le CDN (cache + sécurité)

### 3. Compression d'images

Avant upload, optimiser les images :
- [tinypng.com](https://tinypng.com) (PNG/JPG)
- [squoosh.app](https://squoosh.app) (tous formats)

---

## ✅ Checklist Finale

Avant de déclarer le site en production :

- [ ] Build créé avec `npm run build`
- [ ] Contenu de `dist/` uploadé dans `public_html/`
- [ ] Structure correcte (index.html à la racine)
- [ ] `.htaccess` configuré
- [ ] SSL/HTTPS activé
- [ ] Site accessible via domaine
- [ ] Toutes les pages fonctionnent
- [ ] Images chargées
- [ ] Console sans erreurs
- [ ] Responsive testé (mobile/tablet/desktop)
- [ ] Performance testée ([PageSpeed](https://pagespeed.web.dev/))

---

## 🎯 Résumé Rapide

```powershell
# 1. Build
npm run build

# 2. Aller sur Hostinger hPanel
# 3. File Manager → public_html
# 4. Supprimer contenu par défaut
# 5. Upload tout le contenu de dist/
# 6. Créer .htaccess si besoin
# 7. Tester sur votredomaine.com
```

---

## 📞 Support

**Si problèmes** :
- 💬 Support Hostinger : Chat 24/7 dans hPanel
- 📧 Email : support@hostinger.com
- 📚 Base de connaissances : [support.hostinger.com](https://support.hostinger.com)

**Ressources utiles** :
- [Documentation Vite](https://vitejs.dev/guide/static-deploy.html)
- [Guide Hostinger déploiement](https://www.hostinger.fr/tutoriels/comment-deployer-un-site-web)

---

## 🎉 Félicitations !

Votre portfolio est maintenant en ligne et accessible au monde entier ! 🌍

**Prochaines étapes** :
- Partager le lien sur LinkedIn
- Ajouter au CV
- Mettre à jour GitHub README avec le lien live
- Monitorer les performances avec Google Analytics (optionnel)
