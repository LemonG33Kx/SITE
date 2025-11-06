import React from 'react';
import { Helmet } from 'react-helmet';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';

const ConditionsUtilisationPage = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Conditions d'utilisation - Hugo Cartier</title>
        <meta name="description" content="Conditions d'utilisation du site web de Hugo Cartier, photographe et vidéaste professionnel." />
      </Helmet>

      <div className="pt-32 pb-20 px-6 bg-black min-h-screen">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-extralight tracking-wider mb-4 text-center">
              Conditions d'utilisation
            </h1>
            <p className="text-gray-400 text-center font-light">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none text-gray-300 font-light leading-relaxed space-y-8"
          >
            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">1. Acceptation des conditions</h2>
              <p>
                L'accès et l'utilisation du site web de Hugo Cartier impliquent l'acceptation pleine et entière des présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">2. Informations légales</h2>
              <p>
                <strong>Éditeur du site :</strong><br />
                Hugo Cartier<br />
                Email : hugooo.cartier@gmail.com<br />
                Téléphone : +33 6 42 39 45 16
              </p>
              <p className="mt-4">
                <strong>Hébergement :</strong><br />
                Les informations relatives à l'hébergement sont disponibles sur demande.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">3. Accès au site</h2>
              <p>
                Hugo Cartier s'efforce de permettre l'accès au site 24 heures sur 24, 7 jours sur 7, mais ne peut garantir une disponibilité absolue. Le site peut être interrompu pour maintenance, mise à jour ou pour tout autre raison, notamment technique.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">4. Utilisation du site</h2>
              <p>
                L'utilisateur s'engage à utiliser le site de manière loyale et conforme à sa destination. Il est strictement interdit :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>D'utiliser le site à des fins illégales ou frauduleuses</li>
                <li>De tenter d'accéder de manière non autorisée au site ou à ses fonctionnalités</li>
                <li>De reproduire, copier ou vendre tout ou partie du site sans autorisation</li>
                <li>D'introduire des virus ou tout autre code malveillant</li>
                <li>De porter atteinte à l'intégrité ou à la sécurité du site</li>
                <li>D'utiliser le site de manière à porter préjudice à Hugo Cartier ou à des tiers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">5. Propriété intellectuelle</h2>
              <p>
                L'ensemble du contenu du site (textes, images, vidéos, logos, graphismes, etc.) est la propriété exclusive de Hugo Cartier ou de ses partenaires et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
              </p>
              <p className="mt-4">
                Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable de Hugo Cartier.
              </p>
              <p className="mt-4">
                Les photographies et vidéos présentées sur le site sont la propriété de Hugo Cartier et sont protégées par le droit d'auteur. Toute utilisation, même partielle, sans autorisation est strictement interdite.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">6. Galeries privées</h2>
              <p>
                L'accès aux galeries privées est réservé aux clients ayant reçu des identifiants personnels. L'utilisateur s'engage à :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Conserver la confidentialité de ses identifiants</li>
                <li>Ne pas partager ses identifiants avec des tiers</li>
                <li>Utiliser les contenus uniquement à des fins personnelles</li>
                <li>Respecter les droits d'auteur sur les images et vidéos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">7. Liens hypertextes</h2>
              <p>
                Le site peut contenir des liens vers d'autres sites web. Hugo Cartier n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou leur accessibilité.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">8. Cookies</h2>
              <p>
                Le site peut utiliser des cookies pour améliorer l'expérience utilisateur. En continuant à naviguer sur le site, vous acceptez l'utilisation de cookies conformément à notre Politique de Confidentialité.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">9. Données personnelles</h2>
              <p>
                Les données personnelles collectées via le site sont traitées conformément au Règlement Général sur la Protection des Données (RGPD) et à notre Politique de Confidentialité. Vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition concernant vos données personnelles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">10. Responsabilité</h2>
              <p>
                Hugo Cartier s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur le site. Cependant, Hugo Cartier ne peut garantir l'exactitude, la complétude ou l'actualité de toutes les informations présentes sur le site.
              </p>
              <p className="mt-4">
                Hugo Cartier ne saurait être tenu responsable des dommages directs ou indirects résultant de l'utilisation ou de l'impossibilité d'utiliser le site, notamment en cas d'interruption, de dysfonctionnement, de virus ou de bug.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">11. Modification des conditions</h2>
              <p>
                Hugo Cartier se réserve le droit de modifier les présentes conditions d'utilisation à tout moment. Les utilisateurs sont invités à consulter régulièrement cette page pour prendre connaissance des éventuelles modifications.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">12. Droit applicable et juridiction</h2>
              <p>
                Les présentes conditions d'utilisation sont soumises au droit français. En cas de litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux compétents selon les règles de droit commun.
              </p>
            </section>

            <section className="mt-12 pt-8 border-t border-white/10">
              <p className="text-sm text-gray-500">
                Pour toute question concernant ces conditions d'utilisation, vous pouvez nous contacter à : hugooo.cartier@gmail.com
              </p>
            </section>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ConditionsUtilisationPage;



