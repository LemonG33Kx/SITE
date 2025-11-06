# 🚀 Comment Lancer le Script de Synchronisation

## 📍 Où Lancer le Script ?

**Le script se lance depuis VOTRE TERMINAL, sur votre ordinateur** (pas depuis Supabase).

## 🖥️ Étapes Détaillées

### 1. Ouvrir un Terminal

Sur Mac :
- Appuyez sur `Cmd + Espace`
- Tapez "Terminal"
- Ouvrez l'application Terminal

### 2. Aller dans le Dossier du Projet

Dans le terminal, tapez :

```bash
cd "/Users/hugocartier/Desktop/SITE/Hugo's website"
```

(Puis appuyez sur Entrée)

### 3. Lancer le Script

Tapez :

```bash
npm run sync-gallery
```

(Puis appuyez sur Entrée)

### 4. Voir le Résultat

Le script va :
- Se connecter à Supabase
- Lister les images du bucket
- Les ajouter dans la base de données
- Afficher un message de confirmation

## 📋 Exemple Complet

Voici ce que vous devriez voir dans votre terminal :

```
🔄 Démarrage de la synchronisation...

📦 Récupération des images du bucket "gallery-images"...
✅ 5 image(s) trouvée(s) dans le bucket

📊 1 image(s) déjà enregistrée(s) dans la base de données

➕ 4 nouvelle(s) image(s) à ajouter

✅ Images ajoutées avec succès !

📋 Liste des images ajoutées :
   1. IMG_8061.jpg
      → Alt: Hugo Cartier - JPG
      → Description: IMG 8061
   2. photo2.png
      → Alt: Hugo Cartier - PNG
      → Description: Photo2
   ...

✨ Synchronisation terminée ! 4 image(s) ajoutée(s).
```

## ⚠️ Important

Le script se lance depuis :
- ✅ VOTRE terminal (sur votre Mac)
- ❌ PAS depuis Supabase
- ❌ PAS depuis le navigateur

## 🔧 Si ça ne Fonctionne Pas

1. **Vérifiez que vous êtes dans le bon dossier** :
   ```bash
   pwd
   ```
   (Devrait afficher : `/Users/hugocartier/Desktop/SITE/Hugo's website`)

2. **Vérifiez que le fichier .env existe** :
   ```bash
   ls -la .env
   ```

3. **Vérifiez les erreurs** : Le script vous dira s'il y a un problème !



