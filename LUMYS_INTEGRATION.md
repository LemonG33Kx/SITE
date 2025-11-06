# 📸 Intégration Lumys Photos

## ✅ Ce qui a été fait

Lumys Photos est maintenant intégré dans votre site !

### Modifications effectuées :

1. **Script Lumys ajouté** dans `index.html` (chargé automatiquement)
2. **Composant LumysWidget créé** dans `src/components/LumysWidget.jsx`
3. **Widget intégré** dans la page Galerie (`/galerie`)

## 🎯 Utilisation

### Accéder aux galeries Lumys

1. Allez sur votre site : `http://localhost:3000/galerie`
2. Cliquez sur l'onglet **"Galerie Publique"**
3. Les galeries Lumys s'affichent automatiquement !

## 📋 Configuration

### API Key actuelle
- **API Key** : `9bjf8ama955idfcc`

### Filtre par catégorie (optionnel)

Si vous voulez afficher seulement certaines catégories de galeries :

1. Ouvrez `src/components/LumysWidget.jsx`
2. Modifiez la ligne pour décommenter et ajouter votre catégorie :
   ```jsx
   // Dans index.html, décommentez et modifiez :
   var lumysCategory = "mariage"; // Remplacez par votre catégorie
   ```

Ou utilisez le composant avec une catégorie :
```jsx
<LumysWidget category="mariage" />
```

## 🔄 Pages disponibles

- **Galerie Publique** (`/galerie` → onglet "Galerie Publique") : Affiche les galeries Lumys
- **Accès Privé** (`/galerie` → onglet "Accès Privé") : Galeries privées (système existant)

## 💡 Fonctionnalités Lumys

- ✅ Affichage automatique de vos galeries Lumys
- ✅ Gestion via l'interface Lumys (pas besoin de modifier le code)
- ✅ Filtrage par catégorie possible
- ✅ Responsive et intégré au design du site

## 🎨 Personnalisation

Le widget Lumys utilise son propre style. Si vous voulez l'adapter au design de votre site, vous pouvez modifier les styles dans `src/components/LumysWidget.jsx`.

## ✅ C'est prêt !

Vos galeries Lumys sont maintenant accessibles sur votre site ! 🎉



