import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase, getImageUrl } from '@/lib/supabase';
import { RefreshCw, CheckCircle, XCircle, Image as ImageIcon, Loader2 } from 'lucide-react';

const AdminGalleryPage = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const syncImages = async () => {
    setIsSyncing(true);
    setSyncResult(null);

    try {
      // 1. Lister toutes les images du bucket
      const { data: files, error: listError } = await supabase.storage
        .from('gallery-images')
        .list('', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' }
        });

      if (listError) {
        console.error('Erreur listError:', listError);
        throw new Error('Erreur lors de la récupération des fichiers: ' + listError.message);
      }

      console.log('Fichiers trouvés dans le bucket:', files?.length || 0);

      // Filtrer uniquement les images
      const imageFiles = (files || []).filter(file => {
        const ext = file.name.toLowerCase().split('.').pop();
        return ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext);
      });

      console.log('Images filtrées:', imageFiles.length);

      // 2. Récupérer les images déjà enregistrées
      const { data: existingImages, error: selectError } = await supabase
        .from('gallery_images')
        .select('storage_path');

      if (selectError) {
        console.error('Erreur selectError:', selectError);
        throw new Error('Erreur lors de la récupération des images existantes: ' + selectError.message);
      }

      console.log('Images existantes dans la DB:', existingImages?.length || 0);

      const existingPaths = new Set(existingImages?.map(img => img.storage_path) || []);

      // 3. Filtrer les nouvelles images (TOUTES les images du bucket)
      const newImages = imageFiles.filter(file => !existingPaths.has(file.name));

      if (newImages.length === 0) {
        setSyncResult({
          success: true,
          message: 'Toutes les images sont déjà synchronisées !',
          added: 0,
          total: imageFiles.length
        });
        toast({
          title: '✅ Synchronisation terminée',
          description: 'Toutes les images sont déjà dans la base de données.',
        });
        setIsSyncing(false);
        loadImages(); // Recharger la liste
        return;
      }

      // 4. Préparer les données pour insertion
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

      // Trier les HC-X par numéro
      imagesToInsert.sort((a, b) => {
        const matchA = a.filename.match(/^HC-(\d+)/i);
        const matchB = b.filename.match(/^HC-(\d+)/i);
        if (matchA && matchB) {
          return parseInt(matchA[1]) - parseInt(matchB[1]);
        }
        return a.filename.localeCompare(b.filename);
      });

      // 5. Insérer les nouvelles images
      const { data: inserted, error: insertError } = await supabase
        .from('gallery_images')
        .insert(imagesToInsert)
        .select();

      if (insertError) {
        throw new Error('Erreur lors de l\'insertion: ' + insertError.message);
      }

      setSyncResult({
        success: true,
        message: `${inserted.length} nouvelle(s) image(s) ajoutée(s) avec succès !`,
        added: inserted.length,
        total: imageFiles.length,
        images: inserted
      });

      toast({
        title: '✅ Synchronisation réussie',
        description: `${inserted.length} image(s) ajoutée(s) !`,
      });

      // Recharger la liste
      loadImages();

    } catch (error) {
      console.error('Erreur:', error);
      setSyncResult({
        success: false,
        message: error.message || 'Une erreur est survenue lors de la synchronisation.',
        added: 0
      });
      toast({
        title: '❌ Erreur',
        description: error.message || 'Erreur lors de la synchronisation',
        variant: 'destructive',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const loadImages = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      toast({
        title: '❌ Erreur',
        description: 'Impossible de charger les images',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    loadImages();
  }, []);

  return (
    <PageTransition>
      <Helmet>
        <title>Administration Galerie - Hugo Cartier</title>
      </Helmet>

      <div className="min-h-screen bg-black pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-extralight tracking-wider text-white mb-4">
              Administration Galerie
            </h1>
            <p className="text-gray-400 font-light">
              Synchronisez automatiquement vos images uploadées dans Supabase
            </p>
          </motion.div>

          {/* Bouton de synchronisation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-light text-white mb-2">Synchronisation Automatique</h2>
                <p className="text-sm text-gray-400">
                  Cliquez pour détecter et ajouter toutes les nouvelles images du bucket Supabase
                </p>
              </div>
              <Button
                onClick={syncImages}
                disabled={isSyncing}
                className="bg-white text-black hover:bg-gray-200 min-w-[200px]"
                size="lg"
              >
                {isSyncing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Synchronisation...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Synchroniser les Images
                  </>
                )}
              </Button>
            </div>

            {syncResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-4 rounded-lg ${
                  syncResult.success
                    ? 'bg-green-500/10 border border-green-500/20'
                    : 'bg-red-500/10 border border-red-500/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  {syncResult.success ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  )}
                  <div>
                    <p className={`font-medium ${syncResult.success ? 'text-green-400' : 'text-red-400'}`}>
                      {syncResult.message}
                    </p>
                    {syncResult.success && syncResult.added > 0 && (
                      <p className="text-sm text-gray-400 mt-1">
                        {syncResult.total} image(s) au total dans le bucket
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Liste des images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-light text-white">Images dans la Galerie</h2>
              <Button
                onClick={loadImages}
                disabled={isLoading}
                variant="outline"
                size="sm"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-gray-400 mb-4" />
                <p className="text-gray-400">Chargement...</p>
              </div>
            ) : images.length === 0 ? (
              <div className="text-center py-12">
                <ImageIcon className="h-12 w-12 mx-auto text-gray-600 mb-4" />
                <p className="text-gray-400">Aucune image dans la galerie</p>
                <p className="text-sm text-gray-500 mt-2">
                  Uploadez des images dans Supabase et cliquez sur "Synchroniser"
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="relative group overflow-hidden rounded-lg border border-white/10"
                  >
                    <img
                      src={getImageUrl('gallery-images', image.storage_path)}
                      alt={image.alt}
                      className="w-full h-32 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-2">
                      <p className="text-xs text-white truncate">{image.filename}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {images.length > 0 && (
              <p className="text-sm text-gray-400 text-center mt-6">
                {images.length} image(s) dans la galerie publique
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AdminGalleryPage;

