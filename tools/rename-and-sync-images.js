/**
 * Script pour renommer automatiquement les images et les synchroniser
 * 
 * Ce script détecte les images avec des noms similaires et les renomme
 * avec le format HC-1.jpg, HC-2.jpg, etc.
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Erreur: Les variables VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY doivent être définies dans le fichier .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function syncWithHCNaming() {
  console.log('🔄 Synchronisation avec format HC-X...\n');

  try {
    // 1. Lister toutes les images du bucket
    const { data: files, error: listError } = await supabase.storage
      .from('gallery-images')
      .list('', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'asc' }
      });

    if (listError) {
      console.error('❌ Erreur:', listError);
      return;
    }

    // Filtrer les images
    const imageFiles = files.filter(file => {
      const ext = file.name.toLowerCase().split('.').pop();
      return ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext);
    });

    console.log(`✅ ${imageFiles.length} image(s) trouvée(s) dans le bucket\n`);

    if (imageFiles.length === 0) {
      console.log('⚠️  Aucune image trouvée.');
      return;
    }

    // 2. Récupérer les images déjà enregistrées
    const { data: existingImages } = await supabase
      .from('gallery_images')
      .select('storage_path');

    const existingPaths = new Set(existingImages?.map(img => img.storage_path) || []);

    // 3. Trouver les nouvelles images et les renommer
    const newImages = imageFiles.filter(file => !existingPaths.has(file.name));
    
    if (newImages.length === 0) {
      console.log('✅ Toutes les images sont déjà synchronisées !');
      return;
    }

    console.log(`➕ ${newImages.length} nouvelle(s) image(s) à ajouter\n`);

    // 4. Trouver le prochain numéro disponible
    let nextNumber = 1;
    for (const file of imageFiles) {
      const match = file.name.match(/^HC-(\d+)\.(jpg|jpeg|png|webp|gif)$/i);
      if (match) {
        const num = parseInt(match[1]);
        if (num >= nextNumber) {
          nextNumber = num + 1;
        }
      }
    }

    // 5. Préparer les insertions avec format HC-X
    const imagesToInsert = [];
    
    for (const file of newImages) {
      const ext = file.name.toLowerCase().split('.').pop();
      const newName = `HC-${nextNumber}.${ext}`;
      
      // Si le nom est différent, on renomme dans le bucket
      if (file.name !== newName) {
        console.log(`📝 Renommage: ${file.name} → ${newName}`);
        
        // Copier avec le nouveau nom
        const { data: copyData, error: copyError } = await supabase.storage
          .from('gallery-images')
          .copy(file.name, newName);
        
        if (copyError) {
          console.error(`❌ Erreur lors du renommage de ${file.name}:`, copyError);
          continue;
        }
        
        // Supprimer l'ancien fichier
        await supabase.storage
          .from('gallery-images')
          .remove([file.name]);
      }
      
      imagesToInsert.push({
        filename: newName,
        storage_path: newName,
        alt: `Hugo Cartier - ${ext.toUpperCase()}`,
        description: `Hugo Cartier - ${ext.toUpperCase()}`,
        category: 'portfolio',
        is_public: true,
        is_protected: false
      });
      
      nextNumber++;
    }

    // 6. Insérer dans la base de données
    if (imagesToInsert.length > 0) {
      const { data: inserted, error: insertError } = await supabase
        .from('gallery_images')
        .insert(imagesToInsert)
        .select();

      if (insertError) {
        console.error('❌ Erreur lors de l\'insertion:', insertError);
        return;
      }

      console.log('\n✅ Images ajoutées avec succès !\n');
      console.log('📋 Liste des images :');
      inserted.forEach((img, index) => {
        console.log(`   ${index + 1}. ${img.filename} → ${img.alt}`);
      });
    }

    console.log(`\n✨ Synchronisation terminée !`);

  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

syncWithHCNaming();



