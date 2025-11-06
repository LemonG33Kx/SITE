
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PageTransition from '@/components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, ChevronLeft, ChevronRight, Maximize } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock data, to be replaced by Supabase
const mockGalleries = {
  'mariage-demo': {
    title: 'Mariage de J & A',
    password: 'demo123',
    images: Array.from({ length: 15 }, (_, i) => ({
      id: `m${i + 1}`,
      alt: `Photo de mariage ${i + 1}`,
      src: `https://images.unsplash.com/photo-1597861405047-28070a721c5a?q=80&w=800&auto=format&fit=crop&ixid=ps-${i}`,
      downloadUrl: `https://images.unsplash.com/photo-1597861405047-28070a721c5a?q=80&w=1920&auto=format&fit=crop&ixid=ps-${i}`
    })),
  },
  'portrait-demo': {
    title: 'Portraits de Chloé',
    password: 'demo123',
    images: Array.from({ length: 12 }, (_, i) => ({
      id: `p${i + 1}`,
      alt: `Portrait ${i + 1}`,
      src: `https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop&ixid=ps-${i}`,
      downloadUrl: `https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1920&auto=format&fit=crop&ixid=ps-${i}`
    })),
  }
};

const Lightbox = ({ image, onClose, onPrev, onNext }) => {
  if (!image) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div layoutId={`card-${image.id}`} className="relative" onClick={e => e.stopPropagation()}>
        <img src={image.src} alt={image.alt} className="max-w-[80vw] max-h-[80vh] object-contain rounded-lg" />
      </motion.div>
      
      <div className="absolute top-4 right-4 flex gap-4">
        <a href={image.downloadUrl} download target="_blank" rel="noopener noreferrer" className="p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"><Download size={24} /></a>
        <button onClick={onClose} className="p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"><X size={24} /></button>
      </div>

      <button onClick={onPrev} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"><ChevronLeft size={32} /></button>
      <button onClick={onNext} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"><ChevronRight size={32} /></button>
    </motion.div>
  );
};


const ClientGalleryPage = () => {
  const { galleryId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [gallery, setGallery] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // For lightbox

  useEffect(() => {
    // Mock authentication check
    const authPassword = sessionStorage.getItem(`gallery_auth_${galleryId}`);
    const mockGalleryData = mockGalleries[galleryId];
    if (!mockGalleryData || authPassword !== mockGalleryData.password) {
      navigate('/galerie');
      toast({ title: 'Accès non autorisé', description: 'Le mot de passe est incorrect ou a expiré.', variant: 'destructive' });
      return;
    }
    setGallery(mockGalleryData);
  }, [galleryId, navigate, toast]);
  
  const handleLightboxOpen = (image) => setSelectedImage(image);
  const handleLightboxClose = () => setSelectedImage(null);

  const handleLightboxPrev = (e) => {
    e.stopPropagation();
    const currentIndex = gallery.images.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + gallery.images.length) % gallery.images.length;
    setSelectedImage(gallery.images[prevIndex]);
  };

  const handleLightboxNext = (e) => {
    e.stopPropagation();
    const currentIndex = gallery.images.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % gallery.images.length;
    setSelectedImage(gallery.images[nextIndex]);
  };

  if (!gallery) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Chargement de la galerie...
      </div>
    );
  }

  return (
    <PageTransition>
      <Helmet>
        <title>{gallery.title} - Galerie Client</title>
        <meta name="description" content={`Visionnez et commandez les photos de la galerie ${gallery.title}.`} />
      </Helmet>
      <div className="min-h-screen bg-black pt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-extralight tracking-wider mb-2">{gallery.title}</h1>
            <p className="text-lg text-gray-400 font-light">
              Cliquez sur une image pour la voir en grand ou la télécharger.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {gallery.images.map(image => (
              <motion.div
                key={image.id}
                layoutId={`card-${image.id}`}
                className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                onClick={() => handleLightboxOpen(image)}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <Maximize size={48} className="text-white/80" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {selectedImage && <Lightbox 
          image={selectedImage}
          onClose={handleLightboxClose}
          onPrev={handleLightboxPrev}
          onNext={handleLightboxNext}
          />}
      </AnimatePresence>
    </PageTransition>
  );
};

export default ClientGalleryPage;
