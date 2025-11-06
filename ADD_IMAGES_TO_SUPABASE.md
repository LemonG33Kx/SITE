# 🖼️ Comment Ajouter vos Images dans Supabase

## Option 1 : Script Automatique (RECOMMANDÉ) ⚡

Le script va automatiquement détecter toutes vos images uploadées et les ajouter dans la base de données !

### Installation des dépendances nécessaires

```bash
npm install dotenv
```

### Exécuter le script

```bash
node tools/sync-gallery-images.js
```

Le script va :
1. ✅ Lister toutes les images du bucket `gallery-images`
2. ✅ Les ajouter automatiquement dans la table `gallery_images`
3. ✅ Créer des métadonnées par défaut (alt, description, etc.)

**C'est tout !** Vos images devraient maintenant apparaître sur le site.

---

## Option 2 : Via l'Interface Supabase (Manuel) 🖱️

### Étape 1 : Uploader l'image

1. Allez dans **Storage** > **gallery-images**
2. Cliquez sur **Upload file**
3. Sélectionnez votre image

### Étape 2 : Ajouter les métadonnées

1. Allez dans **Table Editor** > **gallery_images**
2. Cliquez sur **Insert** > **Insert row**
3. Remplissez les champs :

| Champ | Valeur | Exemple |
|-------|--------|---------|
| `filename` | Nom du fichier | `IMG_8061.jpg` |
| `storage_path` | Chemin dans le bucket | `IMG_8061.jpg` |
| `alt` | Description courte | `Photo de mariage au coucher du soleil` |
| `description` | Description détaillée | `Magnifique photo de mariage prise lors de la cérémonie extérieure` |
| `category` | Catégorie | `mariage`, `portrait`, `immobilier`, `evenementiel` |
| `is_public` | ✅ cocher pour public | `true` |
| `is_protected` | ❌ laisser vide | `false` |

4. Cliquez sur **Save**

**Répétez pour chaque image !**

---

## Option 3 : Via SQL (Pour plusieurs images à la fois) 💻

1. Allez dans **SQL Editor** dans Supabase
2. Exécutez cette requête en remplaçant les valeurs :

```sql
INSERT INTO public.gallery_images (filename, storage_path, alt, description, category, is_public, is_protected)
VALUES 
  ('IMG_8061.jpg', 'IMG_8061.jpg', 'Photo de mariage', 'Belle photo de mariage', 'mariage', true, false),
  ('IMG_8740.jpg', 'IMG_8740.jpg', 'Portrait', 'Portrait professionnel', 'portrait', true, false),
  ('Chammes3.jpg', 'Chammes3.jpg', 'Photo Chammes', 'Photo de la série Chammes', 'portfolio', true, false);
```

3. Cliquez sur **Run**

---

## 🔍 Vérifier que ça fonctionne

1. Ouvrez la console de votre navigateur (F12)
2. Allez sur la page de la galerie
3. Vérifiez qu'il n'y a pas d'erreurs
4. Les images devraient apparaître !

## ⚠️ Si les images n'apparaissent toujours pas

1. **Vérifiez que `is_public = true`** dans la table
2. **Vérifiez que le bucket est bien Public** dans Storage > Settings
3. **Vérifiez les URLs** : Ouvrez la console (F12) et regardez les erreurs réseau
4. **Vérifiez vos variables d'environnement** : Le fichier `.env` doit contenir vos clés Supabase

## 💡 Conseil

Utilisez le **Script Automatique (Option 1)** ! C'est le plus rapide et le plus sûr.



