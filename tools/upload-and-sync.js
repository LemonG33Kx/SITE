/**
 * Script tout-en-un : Upload + Renommage + Synchronisation
 * 
 * Ce script :
 * 1. Upload vos images depuis un dossier local
 * 2. Les renomme automatiquement HC-1.jpg, HC-2.jpg, etc.
 * 3. Les ajoute dans Supabase Storage
 * 4. Les ajoute dans la base de données
 * 
 * Usage: node tools/upload-and-sync.js /chemin/vers/vos/images
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readdir, readFile, stat } from 'fs/promises';
import { extname, join } from 'path';

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

async function uploadAndSync(imagesPath) {
  console.log('🚀 Upload et Synchronisation Automatique\n');
  console.log(`📁 Dossier source: ${imagesPath}\n`);

  try {
    // 1. Lister les images du dossier local
    console.log('📸 Recherche des images...');
    const files = await readdir(imagesPath);
    
    const imageFiles = files.filter(file => {
      const ext = extname(file).toLowerCase().slice(1);
      return ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext);
    });

    console.log(`✅ ${imageFiles.length} image(s) trouvée(s)\n`);

    if (imageFiles.length === 0) {
      console.log('⚠️  Aucune image trouvée dans le dossier.');
      return;
    }

    // 2. Vérifier quelles images sont déjà dans Supabase
    const { data: existingFiles } = await supabase.storage
      .from('gallery-images')
      .list('');

    const existingPaths = new Set(existingFiles?.map(f => f.name) || []);

    // 3. Trouver le prochain numéro HC-X
    let nextNumber = 1;
    for (const file of existingFiles || []) {
      const match = file.name.match(/^HC-(\d+)\.(jpg|jpeg|png|webp|gif)$/i);
      if (match) {
        const num = parseInt(match[1]);
        if (num >= nextNumber) {
          nextNumber = num + 1;
        }
      }
    }

    console.log(`📊 Prochain numéro disponible: HC-${nextNumber}\n`);

    // 4. Upload et renommage
    const uploaded = [];
    
    for (const file of imageFiles) {
      const filePath = join(imagesPath, file);
      const fileStat = await stat(filePath);
      
      if (!fileStat.isFile()) continue;

      const ext = extname(file).toLowerCase().slice(1);
      const newName = `HC-${nextNumber}.${ext}`;

      // Lire le fichier
      const fileBuffer = await readFile(filePath);

      // Upload vers Supabase
      console.log(`⬆️  Upload: ${file} → ${newName}`);
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(newName, fileBuffer, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        if (uploadError.message.includes('already exists')) {
          console.log(`   ⚠️  ${newName} existe déjà, on passe au suivant\n`);
          nextNumber++;
          continue;
        }
        throw uploadError;
      }

      // Ajouter dans la base de données
      const { error: insertError } = await supabase
        .from('gallery_images')
        .insert({
          filename: newName,
          storage_path: newName,
          alt: `Hugo Cartier - ${ext.toUpperCase()}`,
          description: `Hugo Cartier - ${ext.toUpperCase()}`,
          category: 'portfolio',
          is_public: true,
          is_protected: false
        });

      if (insertError && !insertError.message.includes('duplicate')) {
        console.error(`   ❌ Erreur DB: ${insertError.message}`);
      } else {
        console.log(`   ✅ ${newName} ajouté avec succès !\n`);
        uploaded.push(newName);
      }

      nextNumber++;
    }

    console.log('\n✨ Terminé !\n');
    console.log(`✅ ${uploaded.length} image(s) uploadée(s) et synchronisée(s) :`);
    uploaded.forEach(name => console.log(`   - ${name}`));
    console.log('\n🎉 Toutes vos images sont maintenant sur votre site !');

  } catch (error) {
    console.error('\n❌ Erreur:', error);
    process.exit(1);
  }
}

// Récupérer le chemin depuis les arguments
const imagesPath = process.argv[2];

if (!imagesPath) {
  console.error('❌ Usage: node tools/upload-and-sync.js /chemin/vers/vos/images');
  console.error('\nExemple:');
  console.error('   node tools/upload-and-sync.js ~/Desktop/MesPhotos');
  process.exit(1);
}

uploadAndSync(resolve(imagesPath));



