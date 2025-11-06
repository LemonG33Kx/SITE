
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
const ContactSection = () => {
  const {
    toast
  } = useToast();
  const handleContact = method => {
    toast({
      title: "🚧 Fonctionnalité à venir",
      description: "Cette fonctionnalité n'est pas encore implémentée—mais vous pouvez la demander dans votre prochain prompt ! 🚀"
    });
  };
  return <section id="contact" className="relative h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} viewport={{
        once: true,
        amount: 0.5
      }} className="max-w-2xl w-full text-center">
          <h2 className="text-5xl md:text-6xl font-extralight tracking-wider mb-6">
            Travaillons Ensemble
          </h2>
          <p className="text-lg text-gray-400 mb-12 font-light">
            Vous avez un projet en tête ? Discutons-en autour d'un café.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <motion.div whileHover={{
            scale: 1.05
          }} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all cursor-pointer" onClick={() => handleContact('email')}>
              <Mail className="mx-auto mb-4" size={32} />
              <p className="text-sm font-light">hugooo.cartier@gmail.com</p>
            </motion.div>

            <motion.div whileHover={{
            scale: 1.05
          }} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all cursor-pointer" onClick={() => handleContact('phone')}>
              <Phone className="mx-auto mb-4" size={32} />
              <p className="text-sm font-light">+33 6 42 39 45 16</p>
            </motion.div>
          </div>

          <div className="flex items-center justify-center gap-6 mb-12">
            <motion.button whileHover={{
            scale: 1.1
          }} onClick={() => handleContact('instagram')} className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all">
              <Instagram size={24} />
            </motion.button>
            <motion.button whileHover={{
            scale: 1.1
          }} onClick={() => handleContact('linkedin')} className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all">
              <Linkedin size={24} />
            </motion.button>
          </div>

          <Button onClick={() => handleContact('form')} className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg font-light tracking-wide">
            Demander un devis
          </Button>

          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="text-sm text-gray-500 font-light">
              © 2025 Hugo Cartier. Tous droits réservés.
            </p>
          </div>
        </motion.div>
      </div>
    </section>;
};
export default ContactSection;
