-- ============================================
-- AJOUTER VOS IMAGES AVEC FORMAT HC-X
-- ============================================
-- 1. Uploadez vos images dans Supabase > Storage > gallery-images
--    Nommez-les : HC-1.jpg, HC-2.jpg, HC-3.jpg, etc.
-- 2. Exécutez ce script en remplaçant le nombre d'images
-- 3. Copiez-collez dans Supabase > SQL Editor > Run

-- Exemple : Si vous avez 3 images (HC-1.jpg, HC-2.jpg, HC-3.jpg)

INSERT INTO public.gallery_images (filename, storage_path, alt, description, category, is_public, is_protected)
VALUES 
  ('HC-1.jpg', 'HC-1.jpg', 'Hugo Cartier - JPG', 'Hugo Cartier - JPG', 'portfolio', true, false),
  ('HC-2.jpg', 'HC-2.jpg', 'Hugo Cartier - JPG', 'Hugo Cartier - JPG', 'portfolio', true, false),
  ('HC-3.jpg', 'HC-3.jpg', 'Hugo Cartier - JPG', 'Hugo Cartier - JPG', 'portfolio', true, false)
ON CONFLICT DO NOTHING;

-- ============================================
-- VERSION AVEC NUMÉROTATION AUTOMATIQUE
-- ============================================
-- Cette version ajoute toutes les images de HC-1 à HC-N automatiquement
-- Remplacez 10 par le nombre d'images que vous avez uploadées

/*
INSERT INTO public.gallery_images (filename, storage_path, alt, description, category, is_public, is_protected)
SELECT 
  'HC-' || num || '.jpg' as filename,
  'HC-' || num || '.jpg' as storage_path,
  'Hugo Cartier - JPG' as alt,
  'Hugo Cartier - JPG' as description,
  'portfolio' as category,
  true as is_public,
  false as is_protected
FROM generate_series(1, 10) AS num  -- Remplacez 10 par votre nombre d'images
WHERE NOT EXISTS (
  SELECT 1 FROM public.gallery_images 
  WHERE storage_path = 'HC-' || num || '.jpg'
);
*/

-- ============================================
-- VÉRIFIER
-- ============================================
-- Après exécution, vérifiez avec :
-- SELECT * FROM public.gallery_images WHERE filename LIKE 'HC-%' ORDER BY filename;



