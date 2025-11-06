
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PageTransition from '@/components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Image as ImageIcon, Lock, Camera } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase, getImageUrl } from '@/lib/supabase';
import LumysWidget from '@/components/LumysWidget';

const mockPrivateGalleries = [
    { id: 'mariage-demo', title: 'Mariage de J & A', date: '15 Octobre 2025', password: 'demo123', coverImage: 'https://images.unsplash.com/photo-1597861405047-28070a721c5a?q=80&w=800&auto=format&fit=crop' },
    { id: 'portrait-demo', title: 'Portraits de Chloé', date: '22 Septembre 2025', password: 'demo123', coverImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop' },
];

const MasonryImage = ({ image }) => {
  // Utiliser Supabase Storage si storage_path est disponible, sinon fallback
  const imageUrl = image.storage_path 
    ? getImageUrl('gallery-images', image.storage_path)
    : image.filename 
      ? `/gallery/images/${image.filename}` 
      : image.url || 'https://images.unsplash.com/photo-1595872018818-97555653a011';
  
  return (
    <motion.div
      className="relative overflow-hidden rounded-lg group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <img 
        className="w-full h-auto object-cover" 
        alt={image.alt || image.description || 'Image de la galerie'} 
        src={imageUrl}
        loading="lazy"
      />
      {(image.description || image.alt) && (
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <p className="text-white text-sm font-light transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {image.description || image.alt || ''}
          </p>
        </div>
      )}
    </motion.div>
  );
};

const PasswordDialog = ({ open, onOpenChange, gallery, onPasswordCorrect }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (password === gallery.password) {
      setError(false);
      onPasswordCorrect(password);
    } else {
      setError(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle>Accès à la galerie "{gallery?.title}"</DialogTitle>
          <DialogDescription>
            Cette galerie est protégée. Veuillez entrer le mot de passe.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <Input 
                type="password" 
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                className={`bg-black/50 border-gray-700 text-white ${error ? 'border-red-500' : ''}`} 
            />
            {error && <p className="text-red-500 text-sm">Mot de passe incorrect.</p>}
        </div>
        <Button onClick={handleSubmit} className="w-full bg-white text-black hover:bg-gray-200">
            Entrer
        </Button>
      </DialogContent>
    </Dialog>
  );
};


const GalleryHubPage = () => {
  const [activeTab, setActiveTab] = useState('public');
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [publicImages, setPublicImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Charger les images depuis Supabase
  useEffect(() => {
    const loadPublicImages = async () => {
      setIsLoading(true);
      try {
        // Essayer d'abord Supabase
        const { data, error } = await supabase
          .from('gallery_images')
          .select('*')
          .eq('is_public', true)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Erreur Supabase:', error);
          // Fallback sur le fichier JSON si Supabase n'est pas configuré
          const response = await fetch('/gallery/public-gallery.json');
          if (response.ok) {
            const jsonData = await response.json();
            const visibleImages = jsonData.images.filter(img => img.visible !== false);
            setPublicImages(visibleImages);
          } else {
            setPublicImages([]);
          }
        } else {
          // Convertir les données Supabase au format attendu
          const formattedImages = data.map(img => ({
            id: img.id,
            filename: img.filename,
            storage_path: img.storage_path,
            alt: img.alt,
            description: img.description,
            category: img.category,
            is_public: img.is_public,
            is_protected: img.is_protected,
          }));
          setPublicImages(formattedImages);
        }
      } catch (error) {
        console.error('Erreur lors du chargement de la galerie:', error);
        // Fallback sur le fichier JSON en cas d'erreur
        try {
          const response = await fetch('/gallery/public-gallery.json');
          if (response.ok) {
            const jsonData = await response.json();
            const visibleImages = jsonData.images.filter(img => img.visible !== false);
            setPublicImages(visibleImages);
          } else {
            setPublicImages([]);
          }
        } catch (fallbackError) {
          console.error('Erreur fallback:', fallbackError);
          setPublicImages([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (activeTab === 'public') {
      loadPublicImages();
    }
  }, [activeTab]);

  const handlePrivateGalleryClick = (gallery) => {
    setSelectedGallery(gallery);
    setIsPasswordDialogOpen(true);
  };
  
  const handlePasswordCorrect = (password) => {
    sessionStorage.setItem(`gallery_auth_${selectedGallery.id}`, password);
    setIsPasswordDialogOpen(false);
    toast({ title: 'Accès autorisé !', description: `Bienvenue dans la galerie ${selectedGallery.title}` });
    navigate(`/galerie/${selectedGallery.id}`);
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Galerie - Hugo Cartier</title>
        <meta name="description" content="Explorez ma galerie publique ou accédez à votre espace client privé." />
      </Helmet>
      <div className="min-h-screen bg-black pt-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-extralight tracking-wider text-white">Galerie</h1>
            <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-400 font-light">
              Découvrez une sélection de mes travaux ou connectez-vous pour voir vos photos.
            </p>
          </motion.div>

          <div className="flex justify-center mb-12">
            <div className="flex space-x-2 bg-gray-900/50 border border-gray-700 rounded-full p-1">
              <button
                onClick={() => setActiveTab('public')}
                className={`px-6 py-2 text-sm font-medium rounded-full transition-colors flex items-center gap-2 ${activeTab === 'public' ? 'bg-white text-black' : 'text-gray-300 hover:bg-gray-800'}`}
              >
                <ImageIcon size={16}/> Galerie Publique
              </button>
              <button
                onClick={() => setActiveTab('private')}
                className={`px-6 py-2 text-sm font-medium rounded-full transition-colors flex items-center gap-2 ${activeTab === 'private' ? 'bg-white text-black' : 'text-gray-300 hover:bg-gray-800'}`}
              >
                <Lock size={16} /> Accès Privé
              </button>
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'public' ? (
                <div className="min-h-[600px] w-full" key={`lumys-${activeTab}`}>
                  <LumysWidget key={`lumys-widget-${activeTab}`} />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockPrivateGalleries.map(gallery => (
                        <motion.div 
                            key={gallery.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="group relative overflow-hidden rounded-xl border border-white/10 cursor-pointer"
                            onClick={() => handlePrivateGalleryClick(gallery)}
                        >
                            <img src={gallery.coverImage} alt={`Couverture de la galerie ${gallery.title}`} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-6 text-white">
                                <h3 className="text-2xl font-light tracking-wider">{gallery.title}</h3>
                                <p className="text-sm text-gray-300">{gallery.date}</p>
                            </div>
                             <div className="absolute top-4 right-4 p-3 bg-black/50 rounded-full">
                                <Lock size={20} />
                            </div>
                        </motion.div>
                    ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <PasswordDialog 
        open={isPasswordDialogOpen}
        onOpenChange={setIsPasswordDialogOpen}
        gallery={selectedGallery}
        onPasswordCorrect={handlePasswordCorrect}
      />
    </PageTransition>
  );
};

export default GalleryHubPage;
