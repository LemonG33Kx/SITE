
import React from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import VideoBackground from '@/components/VideoBackground';
import ServiceCard from '@/components/ServiceCard';

const ImmobilierSection = () => {
  return (
    <section id="immobilier" className="relative h-screen w-full snap-section">
      <VideoBackground videoUrl="https://videos.pexels.com/video-files/5524993/5524993-uhd_2560_1440_25fps.mp4" />
      
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <ServiceCard
          icon={<Home size={48} />}
          title="Immobilier"
          description="Valorisez vos biens immobiliers avec des visuels professionnels qui séduisent les acheteurs. Photos et vidéos qui mettent en valeur chaque espace."
          features={[
            'Photos HDR haute résolution',
            'Visite virtuelle 360°',
            'Vidéo de présentation',
            'Retouches professionnelles'
          ]}
        />
      </div>
    </section>
  );
};

export default ImmobilierSection;
