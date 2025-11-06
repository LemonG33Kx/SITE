import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
const InstagramFeed = ({
  username
}) => {
  const images = [{
    id: 1,
    description: "Un couple de mariés s'embrassant au coucher du soleil"
  }, {
    id: 2,
    description: "Vue aérienne d'une villa de luxe avec piscine"
  }, {
    id: 3,
    description: "Portrait en noir et blanc d'un homme au regard intense"
  }, {
    id: 4,
    description: "Foule dansant lors d'un festival de musique la nuit"
  }, {
    id: 5,
    description: "Détail d'une bague de fiançailles sur un bouquet de fleurs"
  }, {
    id: 6,
    description: "Intérieur moderne et lumineux d'un appartement en vente"
  }];
  return <section className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} viewport={{
        once: true,
        amount: 0.5
      }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extralight tracking-wider mb-4">
            Dernières Publications
          </h2>
          <a href={`https://instagram.com/${username}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-lg font-light text-gray-400 hover:text-white transition-colors">
            <Instagram size={20} />
            @{username}
          </a>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {images.map((image, index) => <motion.div key={image.id} initial={{
          opacity: 0,
          y: 20,
          scale: 0.95
        }} whileInView={{
          opacity: 1,
          y: 0,
          scale: 1
        }} transition={{
          duration: 0.5,
          delay: index * 0.1
        }} viewport={{
          once: true,
          amount: 0.5
        }} className="group aspect-square relative overflow-hidden rounded-lg">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" alt={image.description} src="/placeholder-image.jpg" />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>)}
        </div>
      </div>
    </section>;
};
export default InstagramFeed;