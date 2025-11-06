-- ============================================
-- Ajouter UNE image dans la galerie Supabase
-- ============================================
-- Remplacez "NOM_DE_VOTRE_IMAGE.jpg" par le nom réel de votre image
-- Puis copiez-collez dans Supabase > SQL Editor > Run

INSERT INTO public.gallery_images (filename, storage_path, alt, description, category, is_public, is_protected)
VALUES 
  (
    'NOM_DE_VOTRE_IMAGE.jpg',  -- Remplacez par le nom exact de votre image (ex: IMG_8061.jpg)
    'NOM_DE_VOTRE_IMAGE.jpg',  -- Même nom ici (le chemin dans le bucket)
    'Photo de galerie',        -- Description courte pour l'accessibilité
    'Une belle photographie',  -- Description détaillée (modifiable ensuite)
    'portfolio',               -- Catégorie (portfolio, mariage, portrait, etc.)
    true,                      -- is_public : true = visible par tous
    false                      -- is_protected : false = pas protégée
  );

-- ============================================
-- EXEMPLE avec une image nommée "IMG_8061.jpg"
-- ============================================
-- Si votre image s'appelle "IMG_8061.jpg", utilisez :

/*
INSERT INTO public.gallery_images (filename, storage_path, alt, description, category, is_public, is_protected)
VALUES 
  (
    'IMG_8061.jpg',
    'IMG_8061.jpg',
    'Photo de galerie',
    'Une belle photographie',
    'portfolio',
    true,
    false
  );
*/



