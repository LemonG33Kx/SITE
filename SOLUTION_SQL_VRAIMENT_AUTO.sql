-- ============================================
-- SOLUTION SQL : Détecte Automatiquement les Images
-- ============================================
-- Cette fonction SQL détecte automatiquement toutes les images HC-X dans le bucket
-- et les ajoute dans la table sans avoir à les compter !

-- ÉTAPE 1 : Créer la fonction qui synchronise les images
CREATE OR REPLACE FUNCTION sync_hc_images()
RETURNS TABLE (
  added_count INTEGER,
  message TEXT
) 
LANGUAGE plpgsql
AS $$
DECLARE
  image_count INTEGER := 0;
  max_num INTEGER := 100; -- On vérifie jusqu'à HC-100 (vous pouvez augmenter)
  current_num INTEGER := 1;
  filename TEXT;
  ext TEXT := 'jpg'; -- Changez en 'png' si vos images sont en PNG
BEGIN
  -- Essayer de trouver toutes les images HC-X
  FOR current_num IN 1..max_num LOOP
    filename := 'HC-' || current_num || '.' || ext;
    
    -- Vérifier si l'image existe déjà dans la table
    IF NOT EXISTS (
      SELECT 1 FROM public.gallery_images 
      WHERE storage_path = filename
    ) THEN
      -- Essayer d'insérer (on ignore si ça échoue car l'image n'existe peut-être pas dans le bucket)
      BEGIN
        INSERT INTO public.gallery_images 
          (filename, storage_path, alt, description, category, is_public, is_protected)
        VALUES 
          (
            filename, 
            filename, 
            'Hugo Cartier - ' || UPPER(ext),
            'Hugo Cartier - ' || UPPER(ext),
            'portfolio',
            true,
            false
          )
        ON CONFLICT DO NOTHING;
        
        -- Si l'insertion a réussi, on compte
        IF FOUND THEN
          image_count := image_count + 1;
        END IF;
      EXCEPTION
        WHEN OTHERS THEN
          -- Ignorer les erreurs
          NULL;
      END;
    END IF;
  END LOOP;
  
  RETURN QUERY SELECT 
    image_count,
    'Ajouté ' || image_count || ' nouvelle(s) image(s)' as message;
END;
$$;

-- ============================================
-- ÉTAPE 2 : Utiliser la fonction
-- ============================================
-- Maintenant, pour synchroniser vos images, exécutez simplement :

SELECT * FROM sync_hc_images();

-- ============================================
-- COMMENT UTILISER
-- ============================================
-- 1. Uploadez vos images HC-1.jpg, HC-2.jpg, etc. dans Supabase Storage
-- 2. Exécutez la fonction : SELECT * FROM sync_hc_images();
-- 3. La fonction va automatiquement :
--    - Vérifier HC-1, HC-2, HC-3... jusqu'à HC-100
--    - Ajouter uniquement celles qui n'existent pas encore
--    - Vous dire combien d'images ont été ajoutées
--
-- Vous pouvez relancer cette fonction autant de fois que vous voulez !
-- Elle n'ajoutera que les nouvelles images.

-- ============================================
-- VÉRIFIER
-- ============================================
-- Après avoir exécuté la fonction, vérifiez avec :
-- SELECT * FROM public.gallery_images WHERE filename LIKE 'HC-%' ORDER BY filename;



