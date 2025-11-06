-- ============================================
-- QUICK START : Ajouter vos images rapidement
-- ============================================
-- Copiez-collez ceci dans Supabase > SQL Editor
-- Remplacez les noms de fichiers par les vôtres !

-- Exemple : Si vous avez uploadé ces images dans le bucket :
-- - IMG_8061.jpg
-- - IMG_8740.jpg
-- - Chammes3.jpg

-- Alors remplacez ci-dessous et exécutez :

INSERT INTO public.gallery_images (filename, storage_path, alt, description, category, is_public, is_protected)
VALUES 
  -- Remplacez "IMG_8061.jpg" par le nom de votre première image
  ('IMG_8061.jpg', 'IMG_8061.jpg', 'Photo de galerie', 'Description de votre première photo', 'portfolio', true, false),
  
  -- Ajoutez une ligne pour chaque image (copiez la ligne ci-dessus)
  ('IMG_8740.jpg', 'IMG_8740.jpg', 'Photo de galerie', 'Description de votre deuxième photo', 'portfolio', true, false),
  ('Chammes3.jpg', 'Chammes3.jpg', 'Photo Chammes', 'Photo de la série Chammes', 'portfolio', true, false);
  -- Continuez pour toutes vos images...

-- ============================================
-- VARIANTE : Lister automatiquement depuis le bucket
-- ============================================
-- Cette requête va lister toutes les images de votre bucket
-- (À utiliser dans une fonction Supabase plus tard)

-- Pour l'instant, utilisez la méthode ci-dessus avec INSERT INTO



