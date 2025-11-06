# Guide de la Galerie Publique

## 📁 Structure des dossiers

```
public/
  └── gallery/
      ├── images/              ← Placez vos images ici
      ├── public-gallery.json  ← Fichier de configuration (liste des images)
      └── README.md            ← Ce fichier
```

## 🖼️ Comment ajouter des images

### Étape 1 : Ajouter votre image

1. Placez votre fichier image dans le dossier `public/gallery/images/`
2. Utilisez un nom de fichier descriptif (ex: `mariage-coucher-soleil.jpg`, `portrait-femme-bw.png`)
3. Formats acceptés : `.jpg`, `.jpeg`, `.png`, `.webp`

### Étape 2 : Ajouter l'image dans le fichier JSON

Ouvrez le fichier `public/gallery/public-gallery.json` et ajoutez une nouvelle entrée dans le tableau `images` :

```json
{
  "images": [
    {
      "id": "img-001",
      "filename": "nom-de-votre-fichier.jpg",
      "alt": "Description courte pour l'accessibilité",
      "description": "Description détaillée qui apparaîtra au survol",
      "category": "portrait",
      "dateAdded": "2025-01-15",
      "visible": true
    },
    {
      "id": "img-002",
      "filename": "nouvelle-image.jpg",
      "alt": "Une autre superbe image",
      "description": "Description de cette nouvelle image",
      "category": "mariage",
      "dateAdded": "2025-01-16",
      "visible": true
    }
  ]
}
```

### Paramètres expliqués

- **id** : Identifiant unique (ex: `img-001`, `img-002`, etc.)
- **filename** : Le nom exact du fichier que vous avez placé dans `images/`
- **alt** : Texte alternatif pour l'accessibilité (important pour le SEO)
- **description** : Description qui apparaît au survol de l'image
- **category** : Catégorie (portrait, mariage, immobilier, evenementiel, etc.) - optionnel
- **dateAdded** : Date d'ajout au format YYYY-MM-DD
- **visible** : `true` pour afficher l'image, `false` pour la masquer temporairement

### Exemple complet

1. Vous avez une image nommée `mariage-2024-01.jpg` dans `public/gallery/images/`
2. Vous ajoutez dans le JSON :

```json
{
  "id": "img-003",
  "filename": "mariage-2024-01.jpg",
  "alt": "Couple de mariés lors de la cérémonie",
  "description": "Moment émouvant de la cérémonie de mariage de Julie et Alexandre",
  "category": "mariage",
  "dateAdded": "2025-01-17",
  "visible": true
}
```

## 🔄 Recharger le site

Après avoir ajouté une image et mis à jour le JSON :
1. Sauvegardez le fichier JSON
2. Rafraîchissez la page de la galerie dans votre navigateur (F5 ou Cmd+R)
3. L'image devrait apparaître automatiquement !

## 💡 Conseils

- **Nom de fichiers** : Utilisez des noms sans espaces (utilisez des tirets `-` ou underscores `_`)
- **Optimisation** : Compressez vos images avant de les ajouter pour un chargement plus rapide
- **Taille recommandée** : Images de 1200-2000px de large maximum
- **Ordre** : Les images s'affichent dans l'ordre du tableau JSON (vous pouvez réorganiser)
- **Masquer temporairement** : Mettez `"visible": false` au lieu de supprimer l'entrée

## ❌ Retirer une image

Pour retirer une image :
1. Supprimez l'entrée correspondante dans le JSON, OU
2. Mettez `"visible": false` pour la masquer sans la supprimer

Vous pouvez aussi supprimer le fichier image du dossier `images/` si vous n'en avez plus besoin.



