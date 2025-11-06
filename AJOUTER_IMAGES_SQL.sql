-- ============================================
-- AJOUTER TOUTES VOS IMAGES EN UNE FOIS
-- ============================================
-- 1. Uploadez vos images dans Supabase > Storage > gallery-images
-- 2. Remplacez les noms de fichiers ci-dessous par les vôtres
-- 3. Copiez-collez dans Supabase > SQL Editor > Run

-- Exemple : Si vous avez uploadé ces images :
-- - photo1.jpg
-- - mariage-2024.png
-- - IMG_8061.webp

-- Remplacez ci-dessous et exécutez :

INSERT INTO public.gallery_images (filename, storage_path, alt, description, category, is_public, is_protected)
VALUES 
  -- Image 1
  ('photo1.jpg', 'photo1.jpg', 'Hugo Cartier - JPG', 'Hugo Cartier - JPG', 'portfolio', true, false),
  
  -- Image 2
  ('mariage-2024.png', 'mariage-2024.png', 'Hugo Cartier - PNG', 'Hugo Cartier - PNG', 'portfolio', true, false),
  
  -- Image 3
  ('IMG_8061.webp', 'IMG_8061.webp', 'Hugo Cartier - WEBP', 'Hugo Cartier - WEBP', 'portfolio', true, false);
  
  -- Ajoutez une ligne pour chaque image que vous avez uploadée
  -- Format : ('nom-fichier.ext', 'nom-fichier.ext', 'Hugo Cartier - EXT', 'Hugo Cartier - EXT', 'portfolio', true, false),

-- ============================================
-- VARIANTE : Pour éviter les doublons
-- ============================================
-- Si vous relancez le script, utilisez cette version qui évite les doublons :

/*
INSERT INTO public.gallery_images (filename, storage_path, alt, description, category, is_public, is_protected)
SELECT 
  'photo1.jpg' as filename,
  'photo1.jpg' as storage_path,
  'Hugo Cartier - JPG' as alt,
  'Hugo Cartier - JPG' as description,
  'portfolio' as category,
  true as is_public,
  false as is_protected
WHERE NOT EXISTS (
  SELECT 1 FROM public.gallery_images WHERE storage_path = 'photo1.jpg'
);
*/

-- ============================================
-- VÉRIFIER QUE ÇA A FONCTIONNÉ
-- ============================================
-- Après avoir exécuté le script, vérifiez avec :

-- SELECT * FROM public.gallery_images ORDER BY created_at DESC;



