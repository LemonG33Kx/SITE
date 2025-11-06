# 🎯 Guide Simple : Upload et Synchronisation avec Format HC

## 📤 Option Recommandée : Nommage Automatique

### Méthode 1 : Upload Direct (Le Plus Simple)

1. **Allez dans Supabase > Storage > gallery-images**
2. **Uploadez vos images** (peu importe leur nom actuel : `photo1.jpg`, `IMG_8061.jpg`, etc.)
3. **Dans votre terminal**, lancez :
   ```bash
   npm run sync-hc
   ```

Le script va automatiquement :
- ✅ Renommer toutes vos images : `HC-1.jpg`, `HC-2.jpg`, `HC-3.jpg`, etc.
- ✅ Les ajouter dans la base de données
- ✅ Créer les métadonnées automatiquement

**C'est tout !** Vos images apparaîtront sur le site avec le format "Hugo Cartier - JPG".

---

## 📤 Méthode 2 : Renommer Avant Upload (Manuel)

Si vous préférez renommer vos images sur votre Mac avant :

1. **Renommez vos images** sur votre Mac :
   - `HC-1.jpg`
   - `HC-2.jpg`
   - `HC-3.jpg`
   - etc.

2. **Uploadez-les** dans Supabase > Storage > gallery-images

3. **Lancez le script** :
   ```bash
   npm run sync-gallery
   ```

---

## ⚠️ Important

**Ne mettez PAS toutes les images avec le même nom "HC.jpg"** car elles vont s'écraser dans Supabase.

Utilisez plutôt :
- `HC-1.jpg`
- `HC-2.jpg`
- `HC-3.jpg`
- etc.

Ou laissez le script les renommer automatiquement avec `npm run sync-hc` !

---

## 🚀 Workflow Recommandé

```
1. Uploadez vos images dans Supabase (n'importe quel nom)
   ↓
2. Lancez : npm run sync-hc
   ↓
3. Le script renomme automatiquement en HC-1, HC-2, etc.
   ↓
4. Rafraîchissez votre site → Images visibles !
```

---

## 💡 Conseil

Utilisez **`npm run sync-hc`** (la méthode 1) : c'est le plus simple et le plus sûr !



