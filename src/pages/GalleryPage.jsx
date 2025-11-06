
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageTransition from '@/components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ShoppingCart, X, ChevronLeft, ChevronRight, Maximize } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const mockImages = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  alt: `Photo de mariage ${i + 1}`,
  src: `https://picsum.photos/seed/${i + 1}/800/800`,
  price: 25.00,
  productName: `Impression Photo ${i+1} (20x30cm)`
}));

const GalleryImage = ({ image, onImageClick }) => {
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleDownload = (e) => {
    e.stopPropagation();
    toast({
      title: "Téléchargement simulé",
      description: "Ceci est une simulation. Le téléchargement réel sera disponible.",
    });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ id: image.id, name: image.productName, price: image.price, image: image.src }, 1);
    toast({
      title: "Ajouté au panier!",
      description: `${image.productName} a été ajouté à votre panier.`,
    });
  };

  return (
    <motion.div
      layoutId={`card-${image.id}`}
      className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
      onClick={() => onImageClick(image)}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <img src={image.src} alt={image.alt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between">
        <div className="flex justify-end">
          <button onClick={() => onImageClick(image)} className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all">
            <Maximize size={20} />
          </button>
        </div>
        <div className="flex items-center justify-end gap-2">
          <button onClick={handleDownload} className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all">
            <Download size={20} />
          </button>
          <button onClick={handleAddToCart} className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Lightbox = ({ image, onClose, onPrev, onNext }) => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  const handleDownload = (e) => {
    e.stopPropagation();
    toast({
      title: "Téléchargement simulé",
      description: "Ceci est une simulation. Le téléchargement réel sera disponible.",
    });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ id: image.id, name: image.productName, price: image.price, image: image.src }, 1);
    toast({
      title: "Ajouté au panier!",
      description: `${image.productName} a été ajouté à votre panier.`,
    });
  };

  if (!image) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div layoutId={`card-${image.id}`} className="relative max-w-4xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <img src={image.src} alt={image.alt} className="max-w-full max-h-[90vh] object-contain rounded-lg" />
      </motion.div>
      
      <div className="absolute top-4 right-4 flex gap-4">
        <Button onClick={handleAddToCart} variant="secondary" className="bg-white/10 hover:bg-white/20 text-white">
          <ShoppingCart className="mr-2 h-4 w-4" /> Acheter Impression ({image.price.toFixed(2)}€)
        </Button>
        <button onClick={handleDownload} className="p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"><Download size={24} /></button>
        <button onClick={onClose} className="p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"><X size={24} /></button>
      </div>

      <button onClick={onPrev} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"><ChevronLeft size={32} /></button>
      <button onClick={onNext} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"><ChevronRight size={32} /></button>
    </motion.div>
  );
};

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  
  const handleClose = () => {
    setSelectedImage(null);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const currentIndex = mockImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + mockImages.length) % mockImages.length;
    setSelectedImage(mockImages[prevIndex]);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const currentIndex = mockImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % mockImages.length;
    setSelectedImage(mockImages[nextIndex]);
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Galerie Client - Hugo Cartier</title>
        <meta name="description" content="Accédez à votre galerie photo privée. Téléchargez vos images et commandez des impressions de haute qualité." />
      </Helmet>
      <div className="min-h-screen bg-black pt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-extralight tracking-wider mb-4">Galerie Privée</h1>
            <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto">
              Bienvenue dans votre espace personnel. Revivez vos moments et commandez des souvenirs inoubliables.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {mockImages.map(image => (
              <GalleryImage key={image.id} image={image} onImageClick={handleImageClick} />
            ))}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {selectedImage && <Lightbox image={selectedImage} onClose={handleClose} onPrev={handlePrev} onNext={handleNext} />}
      </AnimatePresence>
    </PageTransition>
  );
};

export default GalleryPage;
