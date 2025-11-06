
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import VideoBackground from '@/components/VideoBackground';
import ServiceCard from '@/components/ServiceCard';

const MariageSection = () => {
  return (
    <section id="mariage" className="relative h-screen w-full snap-section">
      <VideoBackground videoUrl="https://videos.pexels.com/video-files/5331130/5331130-uhd_2560_1440_25fps.mp4" />
      
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <ServiceCard
          icon={<Heart size={48} />}
          title="Mariage"
          description="Immortalisez les moments les plus précieux de votre vie. Des préparatifs à la première danse, je capture l'émotion et la beauté de votre journée unique."
          features={[
            'Reportage photo & vidéo complet',
            'Drone pour vues aériennes',
            'Album photo premium',
            'Film de mariage cinématographique'
          ]}
        />
      </div>
    </section>
  );
};

export default MariageSection;
