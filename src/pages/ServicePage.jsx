
import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Navigate } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';
import VideoBackground from '@/components/VideoBackground';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import WeddingPriceSimulator from '@/components/WeddingPriceSimulator';

// Données SEO spécifiques par service
const seoData = {
  mariage: {
    title: "Vidéaste & Photographe de Mariage Rennes | Hugo Cartier - Reportage Photo & Vidéo",
    description: "Vidéaste et photographe de mariage professionnel à Rennes. Reportage photo et vidéo de mariage, film cinématographique, drone, album premium. Capturez les moments précieux de votre union avec Hugo Cartier.",
    keywords: "vidéaste mariage rennes, vidéaste de mariage rennes, photographe mariage rennes, photographe de mariage rennes, reportage mariage rennes, vidéo mariage rennes, film mariage rennes, vidéaste mariage bretagne, photographe mariage bretagne, reportage photo mariage rennes, album mariage rennes, drone mariage rennes, réalisation vidéo mariage rennes",
    ogTitle: "Vidéaste & Photographe de Mariage Rennes | Hugo Cartier",
    ogDescription: "Vidéaste et photographe professionnel spécialisé dans les mariages à Rennes. Reportage photo et vidéo de qualité, film cinématographique pour immortaliser votre journée unique.",
    canonical: "/service/mariage"
  },
  evenementiel: {
    title: "Vidéaste Événementiel Rennes | Hugo Cartier - Reportage Vidéo Professionnel",
    description: "Vidéaste événementiel professionnel à Rennes. Reportage vidéo d'événements, conférences, soirées d'entreprise. Couverture vidéo complète pour vos événements professionnels et privés.",
    keywords: "vidéaste événementiel rennes, vidéaste événement rennes, reportage vidéo événement rennes, vidéaste conférence rennes, vidéaste soirée entreprise rennes, vidéaste bretagne, réalisation vidéo événement rennes, caméraman événement rennes",
    ogTitle: "Vidéaste Événementiel Rennes | Hugo Cartier",
    ogDescription: "Vidéaste professionnel spécialisé dans l'événementiel à Rennes. Reportage vidéo de qualité pour vos événements professionnels et privés.",
    canonical: "/service/evenementiel"
  },
  portrait: {
    title: "Vidéaste Portrait & Photographe Rennes | Hugo Cartier",
    description: "Vidéaste et photographe portrait professionnel à Rennes. Vidéos portrait, shooting lifestyle, portraits professionnels. Créez des contenus vidéo et photo authentiques.",
    keywords: "vidéaste portrait rennes, vidéaste rennes, photographe portrait rennes, vidéo portrait rennes, shooting vidéo rennes, vidéaste lifestyle rennes, réalisation vidéo portrait rennes",
    ogTitle: "Vidéaste Portrait Rennes | Hugo Cartier",
    ogDescription: "Vidéaste et photographe portrait professionnel à Rennes. Création de vidéos et photos portrait authentiques et créatives.",
    canonical: "/service/portrait"
  },
  immobilier: {
    title: "Vidéaste Immobilier Rennes | Hugo Cartier - Vidéo & Photos Immobilières",
    description: "Vidéaste et photographe immobilier professionnel à Rennes. Vidéos de présentation immobilière, visite virtuelle 360°, photos HDR. Valorisez vos biens immobiliers avec des visuels professionnels.",
    keywords: "vidéaste immobilier rennes, vidéo immobilier rennes, photographe immobilier rennes, visite virtuelle rennes, vidéo présentation bien immobilier rennes, vidéaste bretagne immobilier",
    ogTitle: "Vidéaste Immobilier Rennes | Hugo Cartier",
    ogDescription: "Vidéaste et photographe immobilier professionnel à Rennes. Vidéos et photos de qualité pour valoriser vos biens immobiliers.",
    canonical: "/service/immobilier"
  }
};

const ServicePage = ({ services }) => {
  const { serviceId } = useParams();
  const service = services.find(s => s.id === serviceId);

  if (!service) {
    return <Navigate to="/" />;
  }

  const seo = seoData[serviceId] || {
    title: `Vidéaste ${service.title} Rennes | Hugo Cartier - Photographe & Vidéaste`,
    description: `Vidéaste et photographe ${service.title.toLowerCase()} professionnel à Rennes. ${service.description}`,
    keywords: `vidéaste ${service.title.toLowerCase()} rennes, vidéaste de ${service.title.toLowerCase()} rennes, photographe ${service.title.toLowerCase()} rennes, vidéo ${service.title.toLowerCase()} rennes, reportage vidéo ${service.title.toLowerCase()} rennes, vidéaste bretagne`,
    ogTitle: `Vidéaste ${service.title} Rennes | Hugo Cartier`,
    ogDescription: `Vidéaste et photographe ${service.title.toLowerCase()} professionnel à Rennes. ${service.description}`,
    canonical: `/service/${serviceId}`
  };

  // Données structurées Schema.org
  const structuredData = {
    "@context": "https://schema.org",
    "@type": serviceId === 'mariage' ? "ProfessionalService" : "Service",
    "name": service.title,
    "description": seo.description,
    "provider": {
      "@type": "Person",
      "name": "Hugo Cartier",
      "jobTitle": "Photographe & Vidéaste",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Rennes",
        "addressRegion": "Bretagne",
        "addressCountry": "FR"
      },
      "email": "hugooo.cartier@gmail.com",
      "url": "https://hugocartier.com"
    },
    "areaServed": {
      "@type": "City",
      "name": "Rennes"
    },
    "serviceType": service.title,
    ...(serviceId === 'mariage' && {
      "category": "Photographie et Vidéographie de Mariage",
      "keywords": "vidéaste mariage rennes, photographe mariage rennes, reportage mariage, vidéo mariage, film mariage"
    }),
    ...(serviceId === 'evenementiel' && {
      "category": "Vidéographie Événementielle",
      "keywords": "vidéaste événementiel rennes, reportage vidéo événement, vidéaste conférence"
    }),
    ...(serviceId === 'portrait' && {
      "category": "Vidéographie et Photographie Portrait",
      "keywords": "vidéaste portrait rennes, vidéo portrait, shooting vidéo"
    }),
    ...(serviceId === 'immobilier' && {
      "category": "Vidéographie et Photographie Immobilière",
      "keywords": "vidéaste immobilier rennes, vidéo immobilier, visite virtuelle"
    })
  };

  return (
    <PageTransition>
      <Helmet>
        <html lang="fr" />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href={`https://hugocartier.com${seo.canonical}`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://hugocartier.com${seo.canonical}`} />
        <meta property="og:title" content={seo.ogTitle} />
        <meta property="og:description" content={seo.ogDescription} />
        <meta property="og:image" content="https://hugocartier.com/hugo-cartier.png" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="Hugo Cartier - Photographe & Vidéaste" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://hugocartier.com${seo.canonical}`} />
        <meta name="twitter:title" content={seo.ogTitle} />
        <meta name="twitter:description" content={seo.ogDescription} />
        <meta name="twitter:image" content="https://hugocartier.com/hugo-cartier.png" />
        
        {/* Geo tags */}
        <meta name="geo.region" content="FR-35" />
        <meta name="geo.placename" content="Rennes" />
        <meta name="geo.position" content="48.1173;1.6778" />
        <meta name="ICBM" content="48.1173, 1.6778" />
        
        {/* Données structurées JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Helmet>

      <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center">
        <VideoBackground videoUrl={service.videoUrl} />
        <div className="relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extralight tracking-widest uppercase"
          >
            {service.title}
          </motion.h1>
        </div>
      </section>

      <section className="bg-black py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="text-xl text-gray-300 font-light leading-relaxed text-center mb-16">
              <p className="mb-4">{service.description}</p>
              {serviceId === 'mariage' && (
                <p className="text-lg text-gray-400">
                  <strong className="text-white">Vidéaste et photographe</strong> de mariage professionnel basé à <strong className="text-white">Rennes</strong>, je me déplace dans toute la <strong className="text-white">Bretagne</strong> pour capturer les moments précieux de votre union. Spécialisé dans le <strong className="text-white">reportage photo et vidéo de mariage</strong>, je vous accompagne de la préparation jusqu'à la soirée pour immortaliser chaque instant de votre journée unique. Réalisation de <strong className="text-white">films cinématiques</strong> et reportages photo de qualité professionnelle.
                </p>
              )}
              {serviceId === 'evenementiel' && (
                <p className="text-lg text-gray-400">
                  <strong className="text-white">Vidéaste événementiel</strong> professionnel à <strong className="text-white">Rennes</strong>, je réalise des reportages vidéo pour vos événements professionnels et privés. Spécialisé dans la couverture vidéo de conférences, soirées d'entreprise, lancements de produits et événements culturels. Je me déplace dans toute la <strong className="text-white">Bretagne</strong> pour capturer l'essence de vos événements avec des vidéos dynamiques et professionnelles.
                </p>
              )}
              {serviceId === 'portrait' && (
                <p className="text-lg text-gray-400">
                  <strong className="text-white">Vidéaste et photographe</strong> portrait professionnel à <strong className="text-white">Rennes</strong>, je crée des contenus vidéo et photo authentiques qui révèlent votre personnalité. Spécialisé dans les vidéos portrait, shooting lifestyle et portraits professionnels. Sessions en studio ou en extérieur selon vos envies, avec un rendu créatif et professionnel.
                </p>
              )}
              {serviceId === 'immobilier' && (
                <p className="text-lg text-gray-400">
                  <strong className="text-white">Vidéaste et photographe</strong> immobilier professionnel à <strong className="text-white">Rennes</strong>, je valorise vos biens immobiliers avec des visuels professionnels. Spécialisé dans les vidéos de présentation immobilière, visites virtuelles 360° et photos HDR haute résolution. Mes réalisations vidéo et photo séduisent les acheteurs et mettent en valeur chaque espace de vos biens.
                </p>
              )}
            </div>

            <div className="border-t border-b border-white/10 py-12">
              <h3 className="text-2xl font-light tracking-wider text-center mb-8 text-white">Prestations Incluses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-2xl mx-auto">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                      <Check size={14} className="text-white" />
                    </div>
                    <span className="text-gray-400 font-light">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {service.id === 'mariage' && <WeddingPriceSimulator />}

          {service.gallery && service.gallery.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
              className="mt-16 text-center"
            >
                <h3 className="text-2xl font-light tracking-wider text-center mb-8 text-white">Galerie</h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {service.gallery.map((image, index) => (
                      <div key={index} className={`aspect-square bg-gray-900 rounded-lg overflow-hidden ${index > 2 ? 'hidden md:block' : ''}`}>
                          <img 
                            className="w-full h-full object-cover" 
                            alt={serviceId === 'mariage' ? `Photographie de mariage Rennes - ${image.alt}` : image.alt} 
                            src="https://images.unsplash.com/photo-1595872018818-97555653a011"
                            loading={index < 3 ? "eager" : "lazy"}
                            width="400"
                            height="400"
                          />
                      </div>
                    ))}
                </div>
            </motion.div>
          )}

        </div>
      </section>
    </PageTransition>
  );
};

export default ServicePage;
