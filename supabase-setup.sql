-- ============================================
-- Configuration Supabase pour la Galerie Hugo Cartier
-- ============================================
-- Copiez-collez ce fichier dans le SQL Editor de Supabase
-- pour créer automatiquement la structure nécessaire

-- 1. Créer la table pour stocker les métadonnées des images
create table if not exists public.gallery_images (
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

-- 2. Activer Row Level Security
alter table public.gallery_images enable row level security;

-- 3. Supprimer les politiques existantes si elles existent (pour éviter les doublons)
drop policy if exists "Les images publiques sont visibles par tous" on public.gallery_images;
drop policy if exists "Les images protégées nécessitent une authentification" on public.gallery_images;

-- 4. Politique : Tout le monde peut lire les images publiques
create policy "Les images publiques sont visibles par tous"
  on public.gallery_images
  for select
  using (is_public = true);

-- 5. Politique : Les images protégées nécessitent une authentification
-- Note: Cette politique sera plus tard remplacée par une authentification complète
create policy "Les images protégées nécessitent une authentification"
  on public.gallery_images
  for select
  using (is_protected = false OR auth.role() = 'authenticated');

-- 6. Index pour améliorer les performances
create index if not exists gallery_images_is_public_idx on public.gallery_images(is_public);
create index if not exists gallery_images_category_idx on public.gallery_images(category);
create index if not exists gallery_images_created_at_idx on public.gallery_images(created_at desc);

-- 7. Fonction pour mettre à jour automatiquement updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- 8. Trigger pour mettre à jour updated_at automatiquement
drop trigger if exists update_gallery_images_updated_at on public.gallery_images;
create trigger update_gallery_images_updated_at
  before update on public.gallery_images
  for each row
  execute function update_updated_at_column();

-- ============================================
-- Après avoir exécuté ce script :
-- ============================================
-- 1. Créez un bucket "gallery-images" dans Storage
-- 2. Configurez-le comme Public
-- 3. Uploadez vos images
-- 4. Ajoutez les métadonnées dans la table gallery_images
-- 5. Configurez vos variables d'environnement (.env)



