# 🚀 Synchronisation Automatique - Aucun Comptage Requis !

## ✨ La Solution Simple

**Vous n'avez plus besoin de compter vos images !**

Le script détecte automatiquement TOUTES vos images HC-X.jpg et les ajoute.

## 📤 Workflow

### 1. Uploader vos Images

1. Renommez vos images : `HC-1.jpg`, `HC-2.jpg`, `HC-3.jpg`, etc.
2. Uploadez dans **Supabase > Storage > gallery-images**
3. **C'est tout pour l'upload !**

### 2. Lancer le Script (Automatique)

Dans votre terminal :

```bash
npm run sync-gallery
```

Le script va :
- ✅ Détecter automatiquement TOUTES les images HC-X dans le bucket
- ✅ Voir lesquelles sont déjà dans la base de données
- ✅ Ajouter uniquement les nouvelles
- ✅ **Aucun comptage nécessaire !**

### 3. Vérifier

Rafraîchissez votre site → Toutes vos images apparaissent !

---

## 🔄 Ajouter de Nouvelles Images

### Vous avez déjà HC-1 à HC-10, vous voulez ajouter HC-11 :

1. Uploadez `HC-11.jpg` dans Supabase
2. Lancez : `npm run sync-gallery`
3. ✅ HC-11 est automatiquement ajouté !

**Aucun comptage, aucune modification de script nécessaire !**

---

## 💡 Avantages

✅ **100% Automatique** : Le script compte pour vous  
✅ **Pas de modification** : Le même script fonctionne toujours  
✅ **Détection intelligente** : Ajoute uniquement les nouvelles images  
✅ **Format HC-X priorisé** : Les images HC-X sont traitées en premier  

---

## 🚨 Si le Script ne Fonctionne Pas

1. Vérifiez que votre fichier `.env` contient :
   ```
   VITE_SUPABASE_URL=votre-url
   VITE_SUPABASE_ANON_KEY=votre-clé
   ```

2. Vérifiez que vous êtes dans le bon dossier :
   ```bash
   cd "/Users/hugocartier/Desktop/SITE/Hugo's website"
   ```

3. Relancez le script

---

## ✅ C'est Tout !

**Une seule commande, toujours la même : `npm run sync-gallery`**

Plus besoin de compter, plus besoin de modifier de scripts ! 🎉



