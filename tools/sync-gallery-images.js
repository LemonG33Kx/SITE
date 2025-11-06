/**
 * Script pour synchroniser les images du bucket Supabase avec la table gallery_images
 * 
 * Usage: node tools/sync-gallery-images.js
 * 
 * Ce script liste toutes les images du bucket et les ajoute automatiquement
 * dans la table gallery_images si elles n'existent pas déjà.
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Configuration pour ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger les variables d'environnement
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Erreur: Les variables VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY doivent être définies dans le fichier .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function syncGalleryImages() {
  console.log('🔄 Démarrage de la synchronisation...\n');

  try {
    // 1. Lister toutes les images du bucket
    console.log('📦 Récupération des images du bucket "gallery-images"...');
    const { data: files, error: listError } = await supabase.storage
      .from('gallery-images')
      .list('', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      });

    if (listError) {
      console.error('❌ Erreur lors de la récupération des fichiers:', listError);
      return;
    }

    // Filtrer uniquement les images
    const imageFiles = files.filter(file => {
      const ext = file.name.toLowerCase().split('.').pop();
      return ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext);
    });

    console.log(`✅ ${imageFiles.length} image(s) trouvée(s) dans le bucket\n`);

    if (imageFiles.length === 0) {
      console.log('⚠️  Aucune image trouvée dans le bucket.');
      return;
    }

    // 2. Récupérer les images déjà enregistrées
    const { data: existingImages, error: selectError } = await supabase
      .from('gallery_images')
      .select('storage_path');

    if (selectError) {
      console.error('❌ Erreur lors de la récupération des images existantes:', selectError);
      return;
    }

    const existingPaths = new Set(existingImages?.map(img => img.storage_path) || []);
    console.log(`📊 ${existingPaths.size} image(s) déjà enregistrée(s) dans la base de données\n`);

    // 3. Filtrer uniquement les images au format HC-X (priorité)
    const hcImages = imageFiles.filter(file => {
      const isHCFormat = /^HC-\d+\.(jpg|jpeg|png|webp|gif)$/i.test(file.name);
      return isHCFormat && !existingPaths.has(file.name);
    });

    // 4. Ajouter les autres images non-HC si nécessaire
    const otherImages = imageFiles.filter(file => {
      const isHCFormat = /^HC-\d+\.(jpg|jpeg|png|webp|gif)$/i.test(file.name);
      return !isHCFormat && !existingPaths.has(file.name);
    });

    const newImages = [...hcImages, ...otherImages];
    
    if (newImages.length === 0) {
      console.log('✅ Toutes les images sont déjà synchronisées !');
      return;
    }

    console.log(`➕ ${newImages.length} nouvelle(s) image(s) à ajouter\n`);
    if (hcImages.length > 0) {
      console.log(`   📸 ${hcImages.length} image(s) au format HC-X détectée(s)\n`);
    }

    // Préparer les données pour insertion
    const imagesToInsert = newImages.map(file => {
      const filename = file.name;
      const ext = filename.toLowerCase().split('.').pop();
      const formatName = ext.toUpperCase();
      
      return {
        filename: filename,
        storage_path: filename,
        alt: `Hugo Cartier - ${formatName}`,
        description: `Hugo Cartier - ${formatName}`,
        category: 'portfolio',
        is_public: true,
        is_protected: false
      };
    });

    // Trier les HC-X par numéro pour un meilleur affichage
    imagesToInsert.sort((a, b) => {
      const matchA = a.filename.match(/^HC-(\d+)/i);
      const matchB = b.filename.match(/^HC-(\d+)/i);
      if (matchA && matchB) {
        return parseInt(matchA[1]) - parseInt(matchB[1]);
      }
      return a.filename.localeCompare(b.filename);
    });

    // Insérer les nouvelles images
    const { data: inserted, error: insertError } = await supabase
      .from('gallery_images')
      .insert(imagesToInsert)
      .select();

    if (insertError) {
      console.error('❌ Erreur lors de l\'insertion:', insertError);
      return;
    }

    console.log('✅ Images ajoutées avec succès !\n');
    console.log('📋 Liste des images ajoutées :');
    inserted.forEach((img, index) => {
      console.log(`   ${index + 1}. ${img.filename}`);
      console.log(`      → Alt: ${img.alt}`);
      console.log(`      → Description: ${img.description}`);
    });

    console.log(`\n✨ Synchronisation terminée ! ${inserted.length} image(s) ajoutée(s).`);
    console.log('\n💡 Toutes les images ont été automatiquement configurées avec des métadonnées par défaut.');
    console.log('   Vous pouvez modifier les descriptions dans Supabase > Table Editor > gallery_images si vous le souhaitez.');

  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

// Exécuter le script
syncGalleryImages();

