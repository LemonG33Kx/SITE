import React from 'react';
import { motion } from 'framer-motion';

const WelcomeMessage = () => {
  return (
    <motion.p
      className='text-xl md:text-2xl text-white max-w-2xl mx-auto'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      Bienvenue sur mon portfolio ! Je suis Hugo Cartier, photographe et vidéaste passionné.
      Découvrez mes créations et laissez-moi capturer vos moments précieux.
    </motion.p>
  );
};

export default WelcomeMessage;
