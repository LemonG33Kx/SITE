
import React from 'react';
import { Helmet } from 'react-helmet';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';

const mockImages = [
  { id: 'p1', alt: 'Paysage de montagne spectaculaire au coucher du soleil', description: 'Spectacular mountain landscape at sunset', aspectRatio: '3/4' },
  { id: 'p2', alt: 'Portrait en noir et blanc d\'une femme souriante', description: 'Black and white portrait of a smiling woman', aspectRatio: '2/3' },
  { id: 'p3', alt: 'Rue animée d\'une ville asiatique la nuit', description: 'Busy street in an Asian city at night', aspectRatio: '4/3' },
  { id: 'p4', alt: 'Drone photo of a coastal road winding along the cliffs', description: 'Drone photo of a coastal road winding along the cliffs', aspectRatio: '16/9' },
  { id: 'p5', alt: 'Détail macro d\'une goutte de rosée sur une feuille verte', description: 'Macro detail of a dew drop on a green leaf', aspectRatio: '1/1' },
  { id: 'p6', alt: 'Architecture moderne d\'un bâtiment en verre et en acier', description: 'Modern architecture of a glass and steel building', aspectRatio: '2/3' },
  { id: 'p7', alt: 'Plat gastronomique dressé dans un restaurant chic', description: 'Gourmet dish plated in a fancy restaurant', aspectRatio: '4/3' },
  { id: 'p8', alt: 'Couple se promenant sur une plage de sable blanc', description: 'Couple walking on a white sand beach', aspectRatio: '3/2' },
  { id: 'p9', alt: 'Vue aérienne d\'une forêt automnale colorée', description: 'Aerial view of a colorful autumn forest', aspectRatio: '16/9' },
  { id: 'p10', alt: 'Concert de rock avec des lumières de scène vives', description: 'Rock concert with bright stage lights', aspectRatio: '4/3' },
  { id: 'p11', alt: 'Un chaton curieux regardant l\'objectif', description: 'A curious kitten looking at the camera', aspectRatio: '1/1' },
  { id: 'p12', alt: 'Voiture de sport vintage sur une route de campagne', description: 'Vintage sports car on a country road', aspectRatio: '3/2' },
];

const MasonryImage = ({ image }) => (
  <motion.div
    className="relative overflow-hidden rounded-lg group"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <img className="w-full h-auto object-cover" alt={image.alt} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
      <p className="text-white text-sm font-light transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{image.alt}</p>
    </div>
  </motion.div>
);

const PublicGalleryPage = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Portfolio - Hugo Cartier</title>
        <meta name="description" content="Découvrez une sélection de mes meilleures réalisations en photographie et vidéo. Un aperçu de mon univers créatif." />
      </Helmet>
      <div className="min-h-screen bg-black pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-extralight tracking-wider text-white">Mon Portfolio</h1>
            <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-400 font-light">
              Une collection de moments, de lieux et d'histoires que j'ai eu le privilège de capturer.
            </p>
          </motion.div>
          
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {mockImages.map((image) => (
              <MasonryImage key={image.id} image={image} />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default PublicGalleryPage;
