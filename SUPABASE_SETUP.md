# Configuration Supabase pour la Galerie

## 📋 Étape 1 : Créer un compte Supabase

1. Allez sur [https://supabase.com](https://supabase.com)
2. Créez un compte gratuit (très généreux pour commencer)
3. Créez un nouveau projet

## 📦 Étape 2 : Créer le Storage Bucket

1. Dans votre projet Supabase, allez dans **Storage**
2. Créez un nouveau bucket appelé `gallery-images`
3. Configurez-le comme **Public** pour les images publiques
   - Les images protégées seront gérées via les politiques RLS (Row Level Security)

## 🗄️ Étape 3 : Créer la Table dans la Base de Données

1. Allez dans **SQL Editor**
2. Exécutez cette requête SQL pour créer la table :

```sql
-- Créer la table pour stocker les métadonnées des images
create table public.gallery_images (
  id uuid default gen_random_uuid() primary key,
  filename text not null,
  storage_path text not null,
  alt text,
  description text,
  category text,
  is_public boolean default true,
  is_protected boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Activer Row Level Security
alter table public.gallery_images enable row level security;

-- Politique : Tout le monde peut lire les images publiques
create policy "Les images publiques sont visibles par tous"
  on public.gallery_images
  for select
  using (is_public = true);

-- Politique : Les images protégées nécessitent une authentification
create policy "Les images protégées nécessitent une authentification"
  on public.gallery_images
  for select
  using (is_protected = false OR auth.role() = 'authenticated');

-- Index pour améliorer les performances
create index gallery_images_is_public_idx on public.gallery_images(is_public);
create index gallery_images_category_idx on public.gallery_images(category);
```

## 🔑 Étape 4 : Configurer les Variables d'Environnement

1. Dans votre projet Supabase, allez dans **Settings** > **API**
2. Copiez :
   - **Project URL** (ex: `https://xxxxx.supabase.co`)
   - **anon public** key

3. Créez un fichier `.env` à la racine de votre projet avec :

```
VITE_SUPABASE_URL=votre-project-url
VITE_SUPABASE_ANON_KEY=votre-anon-key
```

## 📤 Étape 5 : Uploader vos Images

### Option 1 : Via l'Interface Supabase (pour commencer)

1. Allez dans **Storage** > **gallery-images**
2. Cliquez sur **Upload file**
3. Uploadez vos images

### Option 2 : Via le Code (à implémenter plus tard)

Vous pourrez créer une interface d'administration pour uploader directement depuis le site.

## 📝 Étape 6 : Ajouter les Métadonnées dans la Table

Après avoir uploadé une image :

1. Allez dans **Table Editor** > **gallery_images**
2. Ajoutez une nouvelle ligne avec :
   - `filename`: Le nom du fichier (ex: `IMG_8061.jpg`)
   - `storage_path`: Le chemin dans le bucket (ex: `IMG_8061.jpg`)
   - `alt`: Description courte pour l'accessibilité
   - `description`: Description détaillée
   - `category`: Catégorie (portrait, mariage, etc.)
   - `is_public`: `true` pour les images publiques, `false` pour les privées
   - `is_protected`: `true` pour les images qui nécessitent une authentification

## 🔒 Gestion des Images Protégées

- **is_public = true** : Image visible par tous (galerie publique)
- **is_public = false, is_protected = true** : Image visible uniquement après authentification
- **is_public = false, is_protected = false** : Image privée (non accessible)

## 🚀 Redémarrer le Serveur

Après avoir créé le fichier `.env`, redémarrez le serveur :

```bash
npm run dev
```

## 💡 Conseils

- Commencez par uploader quelques images pour tester
- Les images publiques seront visibles immédiatement
- Pour les images protégées, il faudra implémenter l'authentification (étape suivante)



