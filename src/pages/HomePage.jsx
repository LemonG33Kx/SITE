
import React from 'react';
import { Helmet } from 'react-helmet';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import VideoBackground from '@/components/VideoBackground';
import InstagramFeed from '@/components/InstagramFeed';

const ServicesHighlightSection = ({ services }) => {
  return (
    <section id="services" className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-4xl md:text-5xl font-extralight tracking-wider text-center mb-16"
        >
          Mes Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <Link to={`/service/${service.id}`} className="block group">
                <div className="relative overflow-hidden rounded-lg aspect-square">
                  <VideoBackground videoUrl={service.videoUrl} />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center p-4">
                    <h3 className="text-2xl font-light tracking-widest uppercase text-white transition-transform duration-300 group-hover:scale-110">
                      {service.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomePage = ({ services }) => {
  const scrollToNext = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Données structurées LocalBusiness pour le SEO local
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://hugocartier.com",
    "name": "Hugo Cartier - Photographe & Vidéaste",
    "image": "https://hugocartier.com/hugo-cartier.png",
    "description": "Vidéaste et photographe professionnel à Rennes, spécialisé dans les mariages, l'immobilier, les portraits et l'événementiel. Réalisation de films vidéo et reportages photo de qualité.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Rennes",
      "addressRegion": "Bretagne",
      "postalCode": "35000",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.1173,
      "longitude": 1.6778
    },
    "url": "https://hugocartier.com",
    "telephone": "+33",
    "email": "hugooo.cartier@gmail.com",
    "priceRange": "€€",
    "areaServed": {
      "@type": "City",
      "name": "Rennes"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de Photographie et Vidéographie",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Vidéographie et Photographie de Mariage",
            "description": "Vidéaste et photographe de mariage professionnel à Rennes et en Bretagne. Reportage vidéo et photo, film cinématographique de mariage"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Vidéographie et Photographie Immobilière",
            "description": "Vidéaste et photographe immobilier à Rennes. Vidéos de présentation, visites virtuelles 360°, photos HDR pour valoriser vos biens"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Vidéographie et Photographie Portrait",
            "description": "Vidéaste et photographe portrait à Rennes. Vidéos portrait, shooting lifestyle, portraits professionnels en studio ou extérieur"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Vidéographie Événementielle",
            "description": "Vidéaste événementiel professionnel à Rennes. Reportage vidéo d'événements, conférences, soirées d'entreprise, couverture complète"
          }
        }
      ]
    },
    "sameAs": [
      "https://instagram.com/cartierhug",
      "https://www.linkedin.com/in/cartierhugo/"
    ]
  };

  return (
    <PageTransition>
      <Helmet>
        <html lang="fr" />
        <title>Vidéaste & Photographe Rennes | Hugo Cartier - Mariage, Immobilier, Portrait, Événementiel</title>
        <meta name="description" content="Vidéaste et photographe professionnel à Rennes. Spécialisé dans les mariages, l'immobilier, les portraits et l'événementiel. Reportage vidéo et photo de qualité en Bretagne. Réalisation de films cinématiques et reportages professionnels." />
        <meta name="keywords" content="vidéaste rennes, vidéaste de mariage rennes, vidéaste événementiel rennes, vidéaste immobilier rennes, vidéaste portrait rennes, photographe rennes, photographe mariage rennes, reportage vidéo rennes, réalisation vidéo rennes, vidéaste bretagne, caméraman rennes, film mariage rennes, vidéo événement rennes" />
        <link rel="canonical" href="https://hugocartier.com/" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hugocartier.com/" />
        <meta property="og:title" content="Vidéaste & Photographe Rennes | Hugo Cartier" />
        <meta property="og:description" content="Vidéaste et photographe professionnel à Rennes. Spécialisé dans les mariages, l'immobilier, les portraits et l'événementiel. Reportage vidéo et photo de qualité." />
        <meta property="og:image" content="https://hugocartier.com/hugo-cartier.png" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="Hugo Cartier - Photographe & Vidéaste" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vidéaste & Photographe Rennes | Hugo Cartier" />
        <meta name="twitter:description" content="Vidéaste et photographe professionnel à Rennes. Spécialisé dans les mariages, l'immobilier, les portraits et l'événementiel. Reportage vidéo et photo de qualité." />
        <meta name="twitter:image" content="https://hugocartier.com/hugo-cartier.png" />
        
        {/* Geo tags */}
        <meta name="geo.region" content="FR-35" />
        <meta name="geo.placename" content="Rennes" />
        <meta name="geo.position" content="48.1173;1.6778" />
        <meta name="ICBM" content="48.1173, 1.6778" />
        
        {/* Données structurées JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      </Helmet>
      
      <section id="hero" className="relative h-screen w-full">
        <VideoBackground videoUrl="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h1 className="text-6xl md:text-8xl font-extralight tracking-widest mb-6 uppercase">
              Hugo Cartier
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-wide text-gray-300 mb-2">
              Vidéaste & Photographe
            </p>
            <p className="text-lg md:text-xl font-light tracking-wide text-gray-400 mb-12">
              Rennes, Bretagne
            </p>
            <div className="w-24 h-px bg-white/50 mx-auto"></div>
          </motion.div>

          <motion.button
            onClick={scrollToNext}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce"
            aria-label="Scroll to services"
          >
            <ChevronDown size={40} className="text-white/70" />
          </motion.button>
        </div>
      </section>

      <ServicesHighlightSection services={services} />
      <InstagramFeed username="cartierhug" />

    </PageTransition>
  );
};

export default HomePage;
