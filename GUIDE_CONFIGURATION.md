# 📋 Guide de Configuration - Portfolio V2

## ✅ Ce qui a été intégré

### 🎬 **CV Vidéo YouTube**
- ✅ Vidéo intégrée directement dans la page **À propos**
- ✅ Lecteur YouTube responsive (16:9)
- ✅ Lien : https://youtu.be/YHs_1_mAryU
- ✅ Position : Après l'en-tête, avant les activités

### 💼 **Flux LinkedIn dans Blog**
- ⏳ Widget SociableKIT en cours de synchronisation
- ✅ Section dédiée "MES ACTUALITÉS LINKEDIN"
- ✅ Iframe intégré avec vos posts LinkedIn
- ✅ Bouton vers votre profil LinkedIn complet
- 📝 Widget ID actuel : `25505046`

### ✉️ **Formulaire de Contact Fonctionnel**
- ✅ Formulaire stylé avec thème terminal
- ✅ 4 champs : Nom, Email, Sujet, Message
- ✅ Service : Formspree (gratuit)
- ✅ Fallback : mailto si Formspree échoue
- ✅ Message de succès animé
- ✅ Liens vers GitHub, LinkedIn, Many.link

---

## 🔧 Configuration à faire

### 1️⃣ **Formspree (Formulaire de Contact)**

#### Étape A : Créer un compte Formspree
1. Allez sur : https://formspree.io/
2. Cliquez sur **"Get Started"**
3. Inscrivez-vous avec votre email

#### Étape B : Créer un formulaire
1. Une fois connecté, cliquez sur **"+ New Form"**
2. Donnez un nom : "Portfolio Contact Form"
3. Copiez l'ID de formulaire (format : `xvgoodnr`)

#### Étape C : Mettre à jour le code
Dans `src/pages/Contact.jsx`, ligne 23 :
```javascript
const formspreeEndpoint = 'https://formspree.io/f/VOTRE_ID_ICI'
```
Remplacez `xvgoodnr` par votre vrai ID Formspree.

#### Étape D : Tester
1. Allez sur votre portfolio local : http://localhost:5173
2. Page Contact → Remplissez le formulaire
3. Envoyez → Vous recevrez un email de confirmation

---

### 2️⃣ **SociableKIT (Flux LinkedIn)**

#### Étape A : Vérifier la synchronisation
1. Allez sur : https://www.sociablekit.com/app/users/feeds
2. Vérifiez que votre flux est "Ready"
3. Si "Syncing", attendez l'email de confirmation (5-10 min)

#### Étape B : Obtenir votre Widget ID
1. Une fois prêt, cliquez sur votre widget
2. Cliquez sur **"Embed"**
3. Copiez l'URL de l'iframe
4. L'ID est le nombre à la fin : `https://widgets.sociablekit.com/linkedin-profile-posts/iframe/[VOTRE_ID]`

#### Étape C : Mettre à jour le code
Dans `src/pages/Blog.jsx`, ligne 96 :
```jsx
<iframe
  src="https://widgets.sociablekit.com/linkedin-profile-posts/iframe/VOTRE_ID_ICI"
  ...
```
Remplacez `25505046` par votre vrai Widget ID.

#### Étape D : Personnaliser (optionnel)
Sur SociableKIT, vous pouvez :
- Changer le nombre de posts affichés
- Modifier les couleurs (thème sombre recommandé)
- Activer/désactiver les likes/commentaires

---

## 🎮 Jeux Steam (Prochaine étape)

Pour intégrer vos jeux Steam, plusieurs options :

### Option 1 : Steam Widget Officiel
1. Allez sur votre profil Steam
2. Modifiez votre profil → Paramètres de confidentialité
3. Mettez "Public" pour "Détails du jeu"
4. Copiez votre Steam ID

### Option 2 : Steam API
- Nécessite une clé API Steam
- Affiche automatiquement vos jeux
- Temps de jeu, achievements, etc.

### Option 3 : Liste manuelle
- Ajoutez vos jeux favoris dans `profile.json`
- Section "Jeux préférés" avec logos/captures

**Quelle option préférez-vous ?** 🎮

---

## 📤 Déploiement sur Hostinger

Une fois les configurations terminées :

1. **Build** :
   ```bash
   npm run build
   ```

2. **Upload** :
   - Dossier : `C:\xampp\htdocs\Porfolio\dist\`
   - Destination : Hostinger `public_html/`

3. **Fichiers à uploader** :
   - ✅ index.html
   - ✅ .htaccess
   - ✅ assets/ (CSS + JS)
   - ✅ images/
   - ✅ profile.json
   - ✅ projects.json

---

## 🔒 Sécurité

✅ **Pas d'email/téléphone dans le code**  
✅ **Formspree protège contre le spam**  
✅ **Pas d'API keys exposées**  
✅ **.gitignore complet**

---

## 📊 Résumé des modifications

| Fonctionnalité | Statut | Fichier |
|---|---|---|
| CV Vidéo intégré | ✅ Fait | `About.jsx` |
| LinkedIn feed | ⏳ En attente sync | `Blog.jsx` |
| Formulaire Contact | ✅ Fait | `Contact.jsx` |
| Jeux Steam | ⏳ À faire | - |

---

## 🆘 Aide

**Formspree ne fonctionne pas ?**
- Vérifiez votre ID de formulaire
- Le fallback mailto s'activera automatiquement

**LinkedIn ne s'affiche pas ?**
- Attendez l'email SociableKIT
- Vérifiez votre Widget ID
- Testez l'URL iframe dans un navigateur

**Questions ?**
- Fichier de config : Ce guide
- Tests locaux : `npm run dev`
- Production : Uploadez `dist/` sur Hostinger

---

Créé le : 18 octobre 2025  
Portfolio : https://daniilminevich.com
