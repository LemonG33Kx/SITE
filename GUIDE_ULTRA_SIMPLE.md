# 🚀 Guide Ultra Simple : Upload + SQL

## 📤 Étapes (2 minutes)

### 1. Uploader vos Images

1. Allez dans **Supabase > Storage > gallery-images**
2. Cliquez sur **Upload file** (ou **Upload files** pour plusieurs)
3. Sélectionnez vos images
4. Cliquez sur **Upload**
5. ✅ Vos images sont maintenant dans le bucket

### 2. Ajouter dans la Base de Données (SQL)

1. Allez dans **Supabase > SQL Editor**
2. Ouvrez le fichier **`AJOUTER_IMAGES_SQL.sql`**
3. **Remplacez les noms de fichiers** par les vôtres
4. **Copiez-collez** dans le SQL Editor
5. Cliquez sur **Run** ▶️

### 3. Voir sur votre Site

1. Rafraîchissez votre site
2. ✅ Vos images apparaissent !

---

## 📝 Exemple Concret

### Si vous avez uploadé ces 3 images :
- `photo1.jpg`
- `mariage.png`
- `IMG_8061.webp`

### Dans le SQL Editor, tapez :

```sql
INSERT INTO public.gallery_images (filename, storage_path, alt, description, category, is_public, is_protected)
VALUES 
  ('photo1.jpg', 'photo1.jpg', 'Hugo Cartier - JPG', 'Hugo Cartier - JPG', 'portfolio', true, false),
  ('mariage.png', 'mariage.png', 'Hugo Cartier - PNG', 'Hugo Cartier - PNG', 'portfolio', true, false),
  ('IMG_8061.webp', 'IMG_8061.webp', 'Hugo Cartier - WEBP', 'Hugo Cartier - WEBP', 'portfolio', true, false);
```

### Cliquez sur **Run** → ✅ C'est fait !

---

## 💡 Astuce Rapide

Pour chaque nouvelle image, ajoutez juste une ligne :

```sql
('nouvelle-image.jpg', 'nouvelle-image.jpg', 'Hugo Cartier - JPG', 'Hugo Cartier - JPG', 'portfolio', true, false),
```

---

## ✅ C'est Tout !

Pas besoin de scripts compliqués, juste :
1. Upload dans Storage
2. SQL dans SQL Editor
3. C'est visible sur le site !



