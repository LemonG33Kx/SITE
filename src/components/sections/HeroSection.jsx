
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import VideoBackground from '@/components/VideoBackground';

const HeroSection = () => {
  const scrollToNext = () => {
    const element = document.getElementById('services-container');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full">
      <VideoBackground videoUrl="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="text-6xl md:text-8xl font-extralight tracking-widest mb-6">
            HUGO CARTIER
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-wide text-gray-300 mb-12">
            Photographe & Vidéaste
          </p>
          <div className="w-24 h-px bg-white/50 mx-auto"></div>
        </motion.div>

        <motion.button
          onClick={scrollToNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <ChevronDown size={40} className="text-white/70" />
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
