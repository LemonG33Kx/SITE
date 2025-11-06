
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';

const CancelPage = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Paiement Annulé - Hugo Cartier</title>
        <meta name="description" content="Le processus de paiement a été annulé." />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-black p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl text-center">
            <div className="inline-block p-4 bg-red-500/10 rounded-full mb-4">
              <XCircle className="text-red-500" size={48} />
            </div>
            <h1 className="text-3xl font-extralight text-white tracking-wider">Paiement Annulé</h1>
            <p className="text-gray-400 mt-2 mb-8">
              Votre commande a été annulée. N'hésitez pas à parcourir votre galerie à nouveau.
            </p>
            <Button asChild className="w-full bg-white text-black hover:bg-gray-200 text-lg py-6">
              <Link to="/galerie">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Retour à la galerie
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default CancelPage;
