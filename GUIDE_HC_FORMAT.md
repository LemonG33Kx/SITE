# 🎯 Guide : Format HC-X.jpg

## 📤 Workflow Simple

### Étape 1 : Nommer et Uploader vos Images

1. **Renommez vos images** sur votre Mac :
   - `HC-1.jpg`
   - `HC-2.jpg`
   - `HC-3.jpg`
   - `HC-4.jpg`
   - etc.

2. **Uploadez dans Supabase** :
   - Allez dans **Supabase > Storage > gallery-images**
   - Cliquez sur **Upload files**
   - Sélectionnez vos images `HC-1.jpg`, `HC-2.jpg`, etc.
   - Cliquez sur **Upload**

### Étape 2 : Ajouter dans la Base de Données

**Option A : SQL Simple (Recommandé)**

1. Allez dans **Supabase > SQL Editor**
2. Ouvrez le fichier **`AJOUTER_HC_IMAGES.sql`**
3. Comptez combien d'images vous avez (ex: 5 images = HC-1 à HC-5)
4. Adaptez le script avec le bon nombre
5. Copiez-collez dans SQL Editor
6. Cliquez sur **Run** ▶️

**Exemple pour 5 images :**

```sql
INSERT INTO public.gallery_images (filename, storage_path, alt, description, category, is_public, is_protected)
VALUES 
  ('HC-1.jpg', 'HC-1.jpg', 'Hugo Cartier - JPG', 'Hugo Cartier - JPG', 'portfolio', true, false),
  ('HC-2.jpg', 'HC-2.jpg', 'Hugo Cartier - JPG', 'Hugo Cartier - JPG', 'portfolio', true, false),
  ('HC-3.jpg', 'HC-3.jpg', 'Hugo Cartier - JPG', 'Hugo Cartier - JPG', 'portfolio', true, false),
  ('HC-4.jpg', 'HC-4.jpg', 'Hugo Cartier - JPG', 'Hugo Cartier - JPG', 'portfolio', true, false),
  ('HC-5.jpg', 'HC-5.jpg', 'Hugo Cartier - JPG', 'Hugo Cartier - JPG', 'portfolio', true, false)
ON CONFLICT DO NOTHING;
```

**Option B : Script Automatique**

Si vous avez déjà uploadé vos images avec d'autres noms :

```bash
npm run sync-hc
```

Le script va automatiquement les renommer en HC-1, HC-2, etc.

### Étape 3 : Vérifier

1. Rafraîchissez votre site
2. Allez sur la page Galerie Publique
3. ✅ Vos images HC-1.jpg, HC-2.jpg, etc. apparaissent !

---

## 🔄 Ajouter de Nouvelles Images

### Si vous avez déjà HC-1 à HC-5 et vous voulez ajouter HC-6 :

1. Uploadez `HC-6.jpg` dans Supabase Storage
2. Dans SQL Editor, exécutez :

```sql
INSERT INTO public.gallery_images (filename, storage_path, alt, description, category, is_public, is_protected)
VALUES 
  ('HC-6.jpg', 'HC-6.jpg', 'Hugo Cartier - JPG', 'Hugo Cartier - JPG', 'portfolio', true, false)
ON CONFLICT DO NOTHING;
```

3. Rafraîchissez → ✅ HC-6 apparaît !

---

## 💡 Astuce

Si vous avez beaucoup d'images (ex: HC-1 à HC-50), utilisez la version automatique dans le fichier SQL :

```sql
-- Remplacez 50 par votre nombre d'images
INSERT INTO public.gallery_images (filename, storage_path, alt, description, category, is_public, is_protected)
SELECT 
  'HC-' || num || '.jpg' as filename,
  'HC-' || num || '.jpg' as storage_path,
  'Hugo Cartier - JPG' as alt,
  'Hugo Cartier - JPG' as description,
  'portfolio' as category,
  true as is_public,
  false as is_protected
FROM generate_series(1, 50) AS num
WHERE NOT EXISTS (
  SELECT 1 FROM public.gallery_images 
  WHERE storage_path = 'HC-' || num || '.jpg'
);
```

---

## ✅ C'est Tout !

Format simple et organisé : **HC-1.jpg, HC-2.jpg, HC-3.jpg...**



