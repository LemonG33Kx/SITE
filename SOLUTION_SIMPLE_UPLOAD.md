# 🎯 Solution Simple : Upload Tout-en-Un

## 🚀 La Solution la Plus Simple

**Un seul script qui fait TOUT :**
1. ✅ Upload vos images depuis votre Mac
2. ✅ Les renomme automatiquement HC-1.jpg, HC-2.jpg, etc.
3. ✅ Les ajoute dans Supabase Storage
4. ✅ Les ajoute dans la base de données
5. ✅ Les rend visibles sur votre site

**Tout automatiquement, d'un seul coup !**

---

## 📤 Comment Utiliser

### Option 1 : Glisser-Déposer (Le Plus Simple)

1. **Mettez toutes vos images dans un dossier** (ex: `MesPhotos`)
2. **Dans le terminal**, tapez :

```bash
npm run upload-images /chemin/vers/votre/dossier
```

**Exemple concret :**
```bash
npm run upload-images ~/Desktop/MesPhotos
```

Ou si vos images sont sur le Bureau :
```bash
npm run upload-images ~/Desktop
```

### Option 2 : Depuis n'importe quel dossier

```bash
cd "/Users/hugocartier/Desktop/SITE/Hugo's website"
npm run upload-images ~/Desktop/MesPhotos
```

---

## ✨ Ce Que le Script Fait Automatiquement

1. **Scanne le dossier** → Trouve toutes les images (JPG, PNG, WEBP, etc.)
2. **Vérifie Supabase** → Voir quel numéro HC-X utiliser (HC-1, HC-2, etc.)
3. **Renomme** → `photo1.jpg` devient `HC-1.jpg`, `photo2.png` devient `HC-2.png`, etc.
4. **Upload** → Les envoie dans Supabase Storage
5. **Synchronise** → Les ajoute dans la base de données
6. **Terminé !** → Elles sont visibles sur votre site

---

## 📋 Exemple Complet

Vous avez un dossier avec :
- `mariage1.jpg`
- `portrait2.png`
- `photo3.jpg`
- `image4.webp`

**Vous lancez :**
```bash
npm run upload-images ~/Desktop/MesPhotos
```

**Le script fait :**
- `mariage1.jpg` → Uploadé comme `HC-1.jpg`
- `portrait2.png` → Uploadé comme `HC-2.png`
- `photo3.jpg` → Uploadé comme `HC-3.jpg`
- `image4.webp` → Uploadé comme `HC-4.webp`

**Résultat :** Toutes vos images sont sur votre site avec les noms HC-1, HC-2, etc. !

---

## ⚠️ Important

- Les images sont **renommées automatiquement** dans Supabase
- Les **originaux restent sur votre Mac** (ils ne sont pas modifiés)
- Le script trouve **automatiquement le bon numéro** (si vous avez déjà HC-1 à HC-10, il commence à HC-11)

---

## 🔄 Workflow Recommandé

```
1. Mettez toutes vos images dans un dossier
   ↓
2. npm run upload-images /chemin/vers/dossier
   ↓
3. ✅ Toutes vos images sont uploadées et synchronisées !
   ↓
4. Rafraîchissez votre site → Images visibles !
```

---

## 🆚 Comparaison

**Avant (compliqué) :**
1. Renommer manuellement chaque image
2. Uploader une par une dans Supabase
3. Ajouter les métadonnées en SQL
4. Répéter pour chaque image

**Maintenant (simple) :**
1. `npm run upload-images dossier`
2. ✅ C'est tout !

---

## 💡 Conseils

- **Mettez toutes vos images dans un seul dossier** pour uploader en une fois
- Le script **gère automatiquement** les numéros (HC-1, HC-2, etc.)
- **Pas besoin de renommer** vos fichiers avant, le script le fait !

---

## ✅ C'est La Solution La Plus Simple !

**Un seul script, tout automatique, tout d'un coup !** 🎉



