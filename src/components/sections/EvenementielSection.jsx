
import React from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import VideoBackground from '@/components/VideoBackground';
import ServiceCard from '@/components/ServiceCard';

const EvenementielSection = () => {
  return (
    <section id="evenementiel" className="relative h-screen w-full snap-section">
      <VideoBackground videoUrl="https://videos.pexels.com/video-files/2022395/2022395-uhd_2560_1440_25fps.mp4" />
      
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <ServiceCard
          icon={<Camera size={48} />}
          title="Événementiel"
          description="Capturez l'essence de vos événements professionnels ou privés. Conférences, soirées d'entreprise, anniversaires - chaque moment compte."
          features={[
            'Couverture complète d\'événement',
            'Reportage photo en temps réel',
            'Vidéo récapitulative',
            'Livraison rapide'
          ]}
        />
      </div>
    </section>
  );
};

export default EvenementielSection;
