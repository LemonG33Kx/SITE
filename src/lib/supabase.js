import { createClient } from '@supabase/supabase-js';

// Configuration Supabase
// IMPORTANT: Remplacez ces valeurs par vos vraies clés Supabase
// Vous les trouverez dans votre dashboard Supabase > Settings > API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fonction pour obtenir l'URL publique d'une image depuis Supabase Storage
export const getImageUrl = (bucket, path) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

// Fonction pour uploader une image (pour usage futur dans une interface admin)
export const uploadImage = async (bucket, path, file) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) throw error;
  return data;
};



