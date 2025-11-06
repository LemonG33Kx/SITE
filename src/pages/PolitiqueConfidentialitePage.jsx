import React from 'react';
import { Helmet } from 'react-helmet';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';

const PolitiqueConfidentialitePage = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Politique de Confidentialité - Hugo Cartier</title>
        <meta name="description" content="Politique de confidentialité et protection des données personnelles conforme au RGPD - Hugo Cartier." />
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
              Politique de Confidentialité
            </h1>
            <p className="text-gray-400 text-center font-light">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-gray-500 text-center text-sm mt-2">
              Conforme au Règlement Général sur la Protection des Données (RGPD)
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none text-gray-300 font-light leading-relaxed space-y-8"
          >
            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">1. Introduction</h2>
              <p>
                La présente politique de confidentialité explique comment Hugo Cartier collecte, utilise et protège vos données personnelles lorsque vous utilisez ce site web ou lorsque vous utilisez nos services de photographie et vidéographie.
              </p>
              <p className="mt-4">
                Nous nous engageons à respecter votre vie privée et à traiter vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">2. Responsable du traitement</h2>
              <p>
                Le responsable du traitement des données personnelles est :
              </p>
              <p className="mt-4">
                <strong>Hugo Cartier</strong><br />
                Email : hugooo.cartier@gmail.com<br />
                Téléphone : +33 6 42 39 45 16
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">3. Données collectées</h2>
              <p>
                Nous collectons les données personnelles suivantes :
              </p>
              
              <h3 className="text-xl font-light text-white mt-6 mb-3">3.1. Données collectées via le site web</h3>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Données de navigation (adresse IP, type de navigateur, pages visitées)</li>
                <li>Cookies et technologies similaires</li>
                <li>Données de contact (nom, email, téléphone) lorsque vous utilisez le formulaire de contact</li>
              </ul>

              <h3 className="text-xl font-light text-white mt-6 mb-3">3.2. Données collectées dans le cadre des prestations</h3>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Identité (nom, prénom, adresse)</li>
                <li>Coordonnées (email, téléphone)</li>
                <li>Informations relatives à votre projet (date d'événement, lieu, spécificités)</li>
                <li>Données de facturation si applicable</li>
                <li>Photographies et vidéos vous concernant (avec votre consentement)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">4. Finalités du traitement</h2>
              <p>
                Vos données personnelles sont traitées pour les finalités suivantes :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Gestion de votre demande de devis ou de contact</li>
                <li>Exécution des prestations de photographie et vidéographie</li>
                <li>Gestion de la relation client et du suivi des commandes</li>
                <li>Facturation et gestion des paiements</li>
                <li>Gestion des galeries privées et accès sécurisé</li>
                <li>Amélioration de nos services et de l'expérience utilisateur</li>
                <li>Respect des obligations légales et réglementaires</li>
                <li>Communication marketing (uniquement avec votre consentement)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">5. Base légale du traitement</h2>
              <p>
                Le traitement de vos données personnelles est fondé sur :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Votre consentement</strong> pour les données de contact et de marketing</li>
                <li><strong>L'exécution d'un contrat</strong> pour les données nécessaires à la réalisation des prestations</li>
                <li><strong>L'obligation légale</strong> pour les données de facturation et comptabilité</li>
                <li><strong>Notre intérêt légitime</strong> pour l'amélioration de nos services et la sécurité du site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">6. Durée de conservation</h2>
              <p>
                Vos données personnelles sont conservées pour les durées suivantes :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Données de contact et de devis :</strong> 3 ans à compter du dernier contact</li>
                <li><strong>Données clients :</strong> Durée de la relation contractuelle + 5 ans (obligations comptables)</li>
                <li><strong>Photographies et vidéos :</strong> Conservation selon les modalités convenues contractuellement, avec possibilité d'archivage à long terme avec votre autorisation</li>
                <li><strong>Données de navigation :</strong> 13 mois maximum</li>
              </ul>
              <p className="mt-4">
                Au-delà de ces durées, les données sont soit supprimées, soit anonymisées.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">7. Destinataires des données</h2>
              <p>
                Vos données personnelles peuvent être transmises aux destinataires suivants :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Hugo Cartier (responsable du traitement)</li>
                <li>Prestataires techniques (hébergement, outils de communication) dans le cadre de leur mission</li>
                <li>Prestataires de paiement (Stripe) pour le traitement des transactions</li>
                <li>Autorités compétentes en cas d'obligation légale</li>
              </ul>
              <p className="mt-4">
                Nous ne vendons jamais vos données personnelles à des tiers à des fins commerciales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">8. Transferts hors UE</h2>
              <p>
                Dans le cadre de l'utilisation de certains services (hébergement cloud, outils en ligne), vos données peuvent être transférées vers des pays situés en dehors de l'Union Européenne. Ces transferts sont encadrés par des garanties appropriées (clauses contractuelles types, Privacy Shield, etc.).
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">9. Vos droits</h2>
              <p>
                Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Droit d'accès :</strong> Vous pouvez obtenir une copie de vos données personnelles</li>
                <li><strong>Droit de rectification :</strong> Vous pouvez demander la correction de données inexactes</li>
                <li><strong>Droit à l'effacement :</strong> Vous pouvez demander la suppression de vos données dans certains cas</li>
                <li><strong>Droit à la limitation :</strong> Vous pouvez demander la limitation du traitement de vos données</li>
                <li><strong>Droit à la portabilité :</strong> Vous pouvez récupérer vos données dans un format structuré</li>
                <li><strong>Droit d'opposition :</strong> Vous pouvez vous opposer au traitement de vos données pour motifs légitimes</li>
                <li><strong>Droit de retirer votre consentement :</strong> À tout moment, si le traitement est fondé sur le consentement</li>
              </ul>
              <p className="mt-4">
                Pour exercer ces droits, vous pouvez nous contacter à : hugooo.cartier@gmail.com
              </p>
              <p className="mt-4">
                Vous avez également le droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) si vous estimez que vos droits ne sont pas respectés : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-white underline">www.cnil.fr</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">10. Cookies</h2>
              <p>
                Le site utilise des cookies pour améliorer votre expérience de navigation. Les cookies sont de petits fichiers texte stockés sur votre appareil.
              </p>
              <p className="mt-4">
                Types de cookies utilisés :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site</li>
                <li><strong>Cookies analytiques :</strong> Pour comprendre comment les visiteurs utilisent le site</li>
                <li><strong>Cookies de préférences :</strong> Pour mémoriser vos choix</li>
              </ul>
              <p className="mt-4">
                Vous pouvez configurer votre navigateur pour refuser les cookies, mais certaines fonctionnalités du site peuvent ne plus être accessibles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">11. Sécurité des données</h2>
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>L'accès non autorisé</li>
                <li>La perte ou la destruction accidentelle</li>
                <li>La divulgation non autorisée</li>
                <li>La modification non autorisée</li>
              </ul>
              <p className="mt-4">
                Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n'est totalement sécurisée. Nous ne pouvons garantir une sécurité absolue.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">12. Données des mineurs</h2>
              <p>
                Nos services ne sont pas destinés aux mineurs. Si nous apprenons que des données personnelles d'un mineur ont été collectées sans le consentement des titulaires de l'autorité parentale, nous prendrons des mesures pour supprimer ces données.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">13. Modification de la politique</h2>
              <p>
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications seront publiées sur cette page avec une mise à jour de la date de "dernière mise à jour". Nous vous encourageons à consulter régulièrement cette page.
              </p>
            </section>

            <section className="mt-12 pt-8 border-t border-white/10">
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4">14. Contact</h2>
              <p>
                Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, vous pouvez nous contacter :
              </p>
              <p className="mt-4">
                <strong>Email :</strong> hugooo.cartier@gmail.com<br />
                <strong>Téléphone :</strong> +33 6 42 39 45 16
              </p>
            </section>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default PolitiqueConfidentialitePage;



