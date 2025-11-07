import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ServicePage from '@/pages/ServicePage';
import ClientGalleryPage from '@/pages/ClientGalleryPage';
import GalleryHubPage from '@/pages/GalleryHubPage';
import { CartProvider } from '@/context/CartContext';
import SuccessPage from '@/pages/SuccessPage';
import CancelPage from '@/pages/CancelPage';
import ConditionsGeneralesPage from '@/pages/ConditionsGeneralesPage';
import ConditionsUtilisationPage from '@/pages/ConditionsUtilisationPage';
import PolitiqueConfidentialitePage from '@/pages/PolitiqueConfidentialitePage';
import AdminGalleryPage from '@/pages/AdminGalleryPage';
import QuotePage from '@/pages/QuotePage';

const services = [
  {
    id: 'mariage',
    title: 'Mariage',
    videoUrl: 'https://videos.pexels.com/video-files/5331130/5331130-uhd_2560_1440_25fps.mp4',
    description: "Immortalisez les moments les plus précieux de votre vie. Des préparatifs à la première danse, je capture l'émotion et la beauté de votre journée unique.",
    features: ['Reportage photo & vidéo complet', 'Drone pour vues aériennes', 'Album photo premium', 'Film de mariage cinématographique'],
    gallery: [
      { alt: 'Couple de mariés s\'embrassant', description: 'Couple de mariés s\'embrassant tendrement après la cérémonie' },
      { alt: 'Détails de la robe de mariée', description: 'Gros plan sur les détails en dentelle de la robe de mariée' },
      { alt: 'Invités lançant du riz', description: 'Les invités joyeux lancent du riz sur les nouveaux mariés' },
      { alt: 'Première danse des mariés', description: 'La première danse émouvante du couple sous des lumières tamisées' },
      { alt: 'Gâteau de mariage à plusieurs étages', description: 'Magnifique gâteau de mariage décoré de fleurs fraîches' },
      { alt: 'Vue aérienne du lieu de réception', description: 'Vue aérienne par drone du domaine où a lieu la réception' },
    ]
  },
  {
    id: 'immobilier',
    title: 'Immobilier',
    videoUrl: 'https://videos.pexels.com/video-files/5524993/5524993-uhd_2560_1440_25fps.mp4',
    description: "Valorisez vos biens immobiliers avec des visuels professionnels qui séduisent les acheteurs. Photos et vidéos qui mettent en valeur chaque espace.",
    features: ['Photos HDR haute résolution', 'Visite virtuelle 360°', 'Vidéo de présentation', 'Retouches professionnelles'],
    gallery: [
      { alt: 'Salon moderne et lumineux', description: 'Salon spacieux et moderne avec de grandes fenêtres et une vue dégagée' },
      { alt: 'Cuisine design avec îlot central', description: 'Cuisine américaine design avec un îlot central en marbre' },
      { alt: 'Chambre parentale avec balcon', description: 'Chambre parentale élégante donnant sur un balcon privé' },
      { alt: 'Façade d\'une villa contemporaine', description: 'Extérieur d\'une villa d\'architecte avec piscine' },
      { alt: 'Salle de bain luxueuse', description: 'Salle de bain luxueuse avec une baignoire îlot et une douche à l\'italienne' },
      { alt: 'Jardin paysager avec terrasse', description: 'Jardin soigneusement paysager avec une grande terrasse en bois' },
    ]
  },
  {
    id: 'portrait',
    title: 'Portrait',
    videoUrl: 'https://videos.pexels.com/video-files/3044127/3044127-uhd_2560_1440_25fps.mp4',
    description: "Révélez votre personnalité à travers des portraits authentiques et créatifs. Sessions en studio ou en extérieur selon vos envies.",
    features: ['Portraits professionnels', 'Shooting lifestyle', 'Photos de famille', 'Retouches artistiques'],
    gallery: [
      { alt: 'Portrait en noir et blanc d\'un homme', description: 'Portrait intense en noir et blanc d\'un homme au regard pensif' },
      { alt: 'Femme riant aux éclats en extérieur', description: 'Portrait lifestyle d\'une jeune femme riant dans un parc' },
      { alt: 'Portrait professionnel sur fond neutre', description: 'Portrait corporate d\'un dirigeant d\'entreprise en studio' },
      { alt: 'Enfant jouant dans les feuilles d\'automne', description: 'Portrait spontané d\'un enfant s\'amusant dans les feuilles mortes' },
      { alt: 'Portrait artistique avec des jeux de lumière', description: 'Portrait créatif utilisant des néons colorés' },
      { alt: 'Photo de famille dans un champ de blé', description: 'Une famille heureuse posant ensemble au coucher du soleil' },
    ]
  },
  {
    id: 'evenementiel',
    title: 'Événementiel',
    videoUrl: 'https://videos.pexels.com/video-files/2022395/2022395-uhd_2560_1440_25fps.mp4',
    description: "Capturez l'essence de vos événements professionnels ou privés. Conférences, soirées d'entreprise, anniversaires - chaque moment compte.",
    features: ['Couverture complète d\'événement', 'Reportage photo en temps réel', 'Vidéo récapitulative', 'Livraison rapide'],
    gallery: [
      { alt: 'Conférencier sur scène', description: 'Un orateur captivant son public lors d\'une conférence internationale' },
      { alt: 'Ambiance d\'une soirée d\'entreprise', description: 'Invités discutant et réseautant lors d\'un cocktail d\'entreprise' },
      { alt: 'Foule lors d\'un concert', description: 'Vue de la foule enthousiaste lors d\'un festival de musique' },
      { alt: 'Lancement de produit', description: 'Le moment de la révélation d\'un nouveau produit high-tech' },
      { alt: 'Décoration d\'un gala de charité', description: 'Tables élégamment dressées pour un dîner de gala' },
      { alt: 'Participants à un atelier créatif', description: 'Participants concentrés pendant un workshop d\'entreprise' },
    ]
  }
];

function App() {
  const location = useLocation();

  return (
    <CartProvider>
      <Layout>
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          <Routes location={location} key={location.pathname}>
            <Route index element={<HomePage services={services} />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="/galerie" element={<GalleryHubPage />} />
            <Route path="/galerie/:galleryId" element={<ClientGalleryPage />} />
            <Route path="/service/:serviceId" element={<ServicePage services={services} />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/cancel" element={<CancelPage />} />
            <Route path="/conditions-generales-vente" element={<ConditionsGeneralesPage />} />
            <Route path="/conditions-utilisation" element={<ConditionsUtilisationPage />} />
            <Route path="/politique-confidentialite" element={<PolitiqueConfidentialitePage />} />
            <Route path="/admin/galerie" element={<AdminGalleryPage />} />
            <Route path="/demande-devis" element={<QuotePage />} />
          </Routes>
        </AnimatePresence>
      </Layout>
      <Toaster />
    </CartProvider>
  );
}

export default App;
