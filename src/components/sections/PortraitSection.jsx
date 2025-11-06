
import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import VideoBackground from '@/components/VideoBackground';
import ServiceCard from '@/components/ServiceCard';

const PortraitSection = () => {
  return (
    <section id="portrait" className="relative h-screen w-full snap-section">
      <VideoBackground videoUrl="https://videos.pexels.com/video-files/3044127/3044127-uhd_2560_1440_25fps.mp4" />
      
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <ServiceCard
          icon={<User size={48} />}
          title="Portrait"
          description="Révélez votre personnalité à travers des portraits authentiques et créatifs. Sessions en studio ou en extérieur selon vos envies."
          features={[
            'Portraits professionnels',
            'Shooting lifestyle',
            'Photos de famille',
            'Retouches artistiques'
          ]}
        />
      </div>
    </section>
  );
};

export default PortraitSection;
