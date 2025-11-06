
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ContactFooter = () => {
  const { toast } = useToast();

  const handleAction = (action, url = null) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
       toast({
        title: "🚧 Fonctionnalité à venir",
        description: "Cette fonctionnalité n'est pas encore implémentée—mais vous pouvez la demander dans votre prochain prompt ! 🚀"
      });
    }
  };

  return (
    <footer id="contact" className="relative w-full bg-gradient-to-b from-black to-gray-900 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <img 
          src="/logo.png" 
          alt="Hugo Cartier Logo" 
          className="h-16 w-auto mx-auto mb-8" 
        />
        <h2 className="text-4xl md:text-5xl font-extralight tracking-wider mb-4">
          Travaillons Ensemble
        </h2>
        <p className="text-lg text-gray-400 mb-10 font-light">
          Prêt à donner vie à votre projet ? Contactez-moi.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10">
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all cursor-pointer" 
            onClick={() => handleAction('email', 'mailto:hugooo.cartier@gmail.com')}
          >
            <Mail className="mx-auto mb-3" size={30} />
            <p className="text-sm font-light">hugooo.cartier@gmail.com</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all cursor-pointer"
            onClick={() => handleAction()}
           >
            <Phone className="mx-auto mb-3" size={30} />
            <p className="text-sm font-light">+33 6 42 39 45 16</p>
          </motion.div>
        </div>

        <div className="flex items-center justify-center gap-6 mb-10">
          <motion.button whileHover={{ scale: 1.1 }} onClick={() => handleAction('instagram', 'https://instagram.com/cartierhug')} className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all">
            <Instagram size={24} />
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} onClick={() => handleAction('linkedin', 'https://www.linkedin.com/in/cartierhugo/')} className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all">
            <Linkedin size={24} />
          </motion.button>
        </div>

        <Button onClick={() => handleAction()} className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg font-light tracking-wide">
          Demander un devis
        </Button>
      </div>
      <div className="mt-16 pt-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-4">
          <Link to="/conditions-generales-vente" className="text-sm text-gray-400 hover:text-white transition-colors font-light">
            Conditions générales de vente
          </Link>
          <span className="hidden md:inline text-gray-600">•</span>
          <Link to="/conditions-utilisation" className="text-sm text-gray-400 hover:text-white transition-colors font-light">
            Conditions d'utilisation
          </Link>
          <span className="hidden md:inline text-gray-600">•</span>
          <Link to="/politique-confidentialite" className="text-sm text-gray-400 hover:text-white transition-colors font-light">
            Politique de confidentialité
          </Link>
        </div>
        <p className="text-sm text-gray-500 font-light text-center">
          © 2025 Hugo Cartier. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default ContactFooter;
