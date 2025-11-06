
import React from 'react';
import { Helmet } from 'react-helmet';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { Camera, Video, Wind, Wand2, BrainCircuit, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

const skills = [
  {
    icon: <Camera size={32} className="text-gray-300" />,
    title: "Photographie",
    description: "Saisir l'instant parfait avec une composition et une lumière maîtrisées pour des images qui racontent une histoire."
  },
  {
    icon: <Video size={32} className="text-gray-300" />,
    title: "Vidéographie",
    description: "Créer des films cinématiques captivants, du story-board au montage final, pour donner vie à vos projets."
  },
  {
    icon: <Wind size={32} className="text-gray-300" />,
    title: "Prise de vue par Drone",
    description: "Offrir des perspectives aériennes époustouflantes et uniques pour valoriser des lieux et des événements."
  },
  {
    icon: <Wand2 size={32} className="text-gray-300" />,
    title: "Retouche Avancée",
    description: "Sublimer chaque image avec une retouche professionnelle, de la colorimétrie à la correction des détails."
  },
  {
    icon: <BrainCircuit size={32} className="text-gray-300" />,
    title: "Outils IA",
    description: "Utiliser l'intelligence artificielle pour la création d'images, la retouche intelligente et l'optimisation du flux de travail."
  }
];

const AboutPage = () => {
  const handlePaymentClick = () => {
    // Rediriger vers le lien de paiement Stripe
    window.open('https://buy.stripe.com/14AeVcbAP6V553k4tB87K01', '_blank');
  };

  return (
    <PageTransition>
      <Helmet>
        <html lang="fr" />
        <title>À Propos - Vidéaste & Photographe Rennes | Hugo Cartier</title>
        <meta name="description" content="Découvrez le parcours, la vision et les compétences de Hugo Cartier, vidéaste et photographe professionnel à Rennes. Spécialisé dans les mariages, l'immobilier, les portraits et l'événementiel." />
        <meta name="keywords" content="vidéaste rennes, photographe rennes, vidéaste professionnel rennes, photographe professionnel rennes, à propos hugo cartier" />
        <link rel="canonical" href="https://hugocartier.com/a-propos" />
      </Helmet>

      <div className="pt-32 pb-20 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-8">
              <img className="w-40 h-40 rounded-full object-cover border-4 border-gray-700" alt="Portrait de Hugo Cartier" src="/hugo-cartier.png" />
            </div>
            <h1 className="text-5xl md:text-6xl font-extralight tracking-wider mb-4">
              Hugo Cartier
            </h1>
            <p className="text-xl text-gray-400 font-light">
              Créateur d'images, conteur d'histoires.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.6, delay: 0.2 }} 
            className="prose prose-invert prose-lg max-w-none text-gray-300 font-light leading-relaxed text-left md:text-justify space-y-6 mb-24"
          >
            <p>
              Passionné par l'image sous toutes ses formes, j'ai transformé cette passion en une expertise multi-facettes en tant que <strong className="text-white">vidéaste et photographe professionnel</strong>. Mon objectif est de créer des visuels qui non seulement capturent un moment, mais qui évoquent aussi une émotion durable. Je combine une approche artistique avec des techniques de pointe pour donner vie à votre vision, que ce soit à travers la <strong className="text-white">réalisation vidéo</strong> ou la <strong className="text-white">photographie</strong>.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-24"
          >
            <h2 className="text-3xl md:text-4xl font-extralight tracking-wider text-center mb-12">Mes Compétences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <motion.div 
                  key={skill.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-start gap-6 hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="flex-shrink-0 mt-1">{skill.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg text-white mb-2">{skill.title}</h3>
                    <p className="text-gray-400 font-light text-sm">{skill.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
            className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-extralight tracking-wider text-white mb-4">Régler votre prestation</h2>
            <p className="text-gray-400 font-light max-w-xl mx-auto mb-8">
              Si nous avons collaboré ensemble, vous pouvez régler votre prestation directement en ligne. Cliquez sur le bouton ci-dessous pour accéder à la page de paiement sécurisée.
            </p>
            <Button 
              onClick={handlePaymentClick}
              size="lg"
              className="bg-white text-black hover:bg-gray-200"
            >
              <CreditCard className="mr-2 h-5 w-5" />
              Accéder au paiement
            </Button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AboutPage;
