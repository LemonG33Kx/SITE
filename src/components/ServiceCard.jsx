
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const ServiceCard = ({ icon, title, description, features }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="max-w-2xl w-full bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="mb-6 text-white/80"
      >
        {icon}
      </motion.div>

      <h2 className="text-4xl md:text-5xl font-extralight tracking-wider mb-4">
        {title}
      </h2>

      <p className="text-gray-300 text-lg font-light mb-8 leading-relaxed">
        {description}
      </p>

      <div className="space-y-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
              <Check size={14} className="text-white" />
            </div>
            <span className="text-gray-400 font-light">{feature}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ServiceCard;
