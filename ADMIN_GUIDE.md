# 🎛️ Guide Administration Galerie

## 🚀 Accéder à la Page d'Administration

Une fois votre site démarré, allez sur :

```
http://localhost:3000/admin/galerie
```

## ✨ Fonctionnalités

### Bouton "Synchroniser les Images"

Ce bouton fait **exactement** la même chose que le script `npm run sync-gallery` :

1. ✅ Détecte toutes les images dans le bucket Supabase
2. ✅ Vérifie lesquelles sont déjà dans la base de données
3. ✅ Ajoute automatiquement les nouvelles images
4. ✅ Priorité aux images au format HC-X
5. ✅ Crée les métadonnées automatiquement

### Workflow Simple

```
1. Uploadez vos images HC-1.jpg, HC-2.jpg, etc. dans Supabase Storage
   ↓
2. Allez sur http://localhost:3000/admin/galerie
   ↓
3. Cliquez sur "Synchroniser les Images"
   ↓
4. ✅ Toutes vos nouvelles images sont ajoutées !
   ↓
5. Rafraîchissez la page Galerie Publique → Images visibles !
```

## 📋 Liste des Images

La page affiche aussi :
- Toutes les images actuellement dans votre galerie
- Un aperçu de chaque image
- Le nombre total d'images

## 🔄 Recharger la Liste

Cliquez sur l'icône de rafraîchissement pour recharger la liste des images.

## ⚠️ Note

Cette page est accessible publiquement pour l'instant. Si vous voulez la protéger par mot de passe plus tard, on peut ajouter une authentification !

## ✅ Avantages

- ✅ Pas besoin d'ouvrir le terminal
- ✅ Interface visuelle simple
- ✅ Feedback immédiat
- ✅ Voir toutes vos images en un coup d'œil



