# 🚀 Ajouter des Images Automatiquement (Métadonnées Auto)

## ✨ Le Système Automatique

**Vous n'avez plus besoin d'écrire manuellement les métadonnées !**

Le script va automatiquement :
- ✅ Détecter toutes vos images uploadées
- ✅ Créer des métadonnées avec "Hugo Cartier" + format (JPG, PNG, etc.)
- ✅ Ajouter les images même sans description
- ✅ Utiliser le nom du fichier comme description par défaut

## 📤 Comment Utiliser

### Étape 1 : Uploader vos Images

1. Allez dans Supabase > **Storage** > **gallery-images**
2. **Upload** toutes vos images (peu importe leur nom)
3. C'est tout ! Les images sont maintenant dans le bucket

### Étape 2 : Lancer le Script Automatique

Dans votre terminal, exécutez simplement :

```bash
npm run sync-gallery
```

**C'est tout !** Le script va :
- Détecter automatiquement toutes les nouvelles images
- Les ajouter dans la base de données avec des métadonnées automatiques
- Les rendre visibles sur votre site immédiatement

### Format des Métadonnées Automatiques

Pour une image nommée `IMG_8061.jpg` :
- **Alt** : `Hugo Cartier - JPG`
- **Description** : `IMG 8061` (ou nom formaté)
- **Category** : `portfolio`
- **Visible** : Oui (publique)

## ✏️ Modifier les Descriptions (Optionnel)

Si vous voulez personnaliser une description après coup :

1. Allez dans Supabase > **Table Editor** > **gallery_images**
2. Trouvez votre image
3. Modifiez le champ `description`
4. C'est tout ! Le changement est instantané

**⚠️ Important** : Même sans description personnalisée, vos images s'afficheront toujours !

## 🔄 Workflow Recommandé

```
1. Uploader des images dans Supabase Storage
   ↓
2. Lancer : npm run sync-gallery
   ↓
3. Rafraîchir le site → Images visibles !
   ↓
4. (Optionnel) Modifier les descriptions dans Supabase
```

## 💡 Exemple

### Vous uploadez :
- `mariage-2024-01.jpg`
- `portrait-chloe.png`
- `immobilier-villa-3.webp`

### Le script crée automatiquement :
```sql
-- Image 1
alt: "Hugo Cartier - JPG"
description: "Mariage 2024 01"

-- Image 2
alt: "Hugo Cartier - PNG"
description: "Portrait Chloe"

-- Image 3
alt: "Hugo Cartier - WEBP"
description: "Immobilier Villa 3"
```

## 🎯 Avantages

✅ **Aucune écriture manuelle** : Tout est automatique  
✅ **Pas de description obligatoire** : Les images s'affichent même sans  
✅ **Rapide** : Upload → Script → Visible en 30 secondes  
✅ **Flexible** : Vous pouvez modifier après si besoin  

## 🚨 En Cas de Problème

Si le script ne fonctionne pas :
1. Vérifiez que votre fichier `.env` contient les bonnes clés Supabase
2. Vérifiez que le bucket s'appelle bien `gallery-images`
3. Vérifiez que la table `gallery_images` existe



