
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const GalleryLoginPage = () => {
  const [galleryId, setGalleryId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Mock authentication logic
    setTimeout(() => {
      if ((galleryId === 'mariage-demo' && password === 'demo123') || (galleryId === 'portrait-demo' && password === 'demo123')) {
        toast({
          title: "Accès autorisé !",
          description: `Bienvenue dans la galerie ${galleryId}.`,
        });
        sessionStorage.setItem('gallery_auth_token', `${galleryId}-${password}`); // Simple mock token
        navigate(`/galerie/client/${galleryId}`);
      } else {
        toast({
          title: "Erreur d'authentification",
          description: "Le nom de la galerie ou le mot de passe est incorrect.",
          variant: "destructive",
        });
        setError('Le nom de la galerie ou le mot de passe est incorrect.');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Accès Galerie Privée - Hugo Cartier</title>
        <meta name="description" content="Accédez à votre galerie photo privée en utilisant vos identifiants." />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-black p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-white/10 rounded-full mb-4">
                <Lock className="text-white" size={32} />
              </div>
              <h1 className="text-3xl font-extralight text-white tracking-wider">Accès Privé</h1>
              <p className="text-gray-400 mt-2">Entrez vos identifiants pour voir votre galerie.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  placeholder="Nom de la galerie"
                  value={galleryId}
                  onChange={(e) => setGalleryId(e.target.value)}
                  className="bg-black/50 border-gray-700 text-white"
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black/50 border-gray-700 text-white"
                />
              </div>
              
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center text-red-500 text-sm"
                  >
                    <AlertCircle className="mr-2 h-4 w-4" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <Button type="submit" disabled={isLoading} className="w-full bg-white text-black hover:bg-gray-200 text-lg py-6">
                {isLoading ? 'Vérification...' : 'Entrer'}
                {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
              </Button>
            </form>
            <div className="text-center mt-6">
              <p className="text-xs text-gray-500">Pour la démo, essayez :</p>
              <p className="text-xs text-gray-500">Galerie: <span className="text-gray-400 font-mono">mariage-demo</span> | MDP: <span className="text-gray-400 font-mono">demo123</span></p>
            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default GalleryLoginPage;
