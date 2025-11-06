# 🔌 Comment le Terminal Modifie Supabase

## Le Principe

Quand vous lancez `npm run sync-gallery` dans votre terminal :

1. **Le script se connecte à Supabase** avec vos clés (dans le fichier `.env`)
2. **Il lit les fichiers** dans votre bucket Supabase Storage
3. **Il modifie directement** la base de données Supabase
4. **Tout se passe via Internet** - c'est comme utiliser l'interface Supabase, mais en automatique !

## Schéma Visuel

```
Votre Terminal (Mac)
    ↓
[Script npm run sync-gallery]
    ↓
Se connecte à Supabase (via Internet)
    ↓
Lit: Quelles images dans le bucket?
    ↓
Lit: Quelles images déjà dans la table?
    ↓
Écrit: Ajoute les nouvelles images dans la table
    ↓
✅ C'est fait dans Supabase !
```

## Les Clés Magiques

Dans votre fichier `.env`, vous avez :
- `VITE_SUPABASE_URL` → L'adresse de votre projet Supabase
- `VITE_SUPABASE_ANON_KEY` → La clé pour se connecter

C'est comme avoir les identifiants pour accéder à votre compte Supabase !

## C'est Comme...

Imaginez que Supabase est un serveur sur Internet. Le script dans votre terminal est comme un assistant qui :
- Se connecte à ce serveur
- Lit ce qui s'y trouve
- Modifie les données
- Tout automatiquement !

## ✅ Vérification

Après avoir lancé le script, allez dans Supabase > Table Editor > gallery_images, et vous verrez que les images ont été ajoutées !

