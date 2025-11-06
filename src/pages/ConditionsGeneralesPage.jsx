import React from 'react';
import { Helmet } from 'react-helmet';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';

const ConditionsGeneralesPage = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Conditions Générales de Vente - Hugo Cartier</title>
        <meta name="description" content="Conditions générales de vente pour les services de photographie et vidéographie de Hugo Cartier." />
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
              Conditions Générales de Vente
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
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">1. Objet et champ d'application</h2>
              <p>
                Les présentes Conditions Générales de Vente (CGV) régissent les prestations de photographie et de vidéographie proposées par Hugo Cartier, photographe et vidéaste professionnel. Toute commande implique l'acceptation sans réserve des présentes conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">2. Identification du prestataire</h2>
              <p>
                <strong>Raison sociale :</strong> Hugo Cartier<br />
                <strong>Email :</strong> hugooo.cartier@gmail.com<br />
                <strong>Téléphone :</strong> +33 6 42 39 45 16
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">3. Description des prestations</h2>
              <p>
                Hugo Cartier propose des services de photographie et vidéographie dans les domaines suivants :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Photographie et vidéographie de mariage</li>
                <li>Photographie immobilière</li>
                <li>Portraits professionnels et personnels</li>
                <li>Couverture événementielle</li>
                <li>Services de drone et vues aériennes</li>
                <li>Retouche et post-production</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">4. Commandes et devis</h2>
              <p>
                Toute prestation fait l'objet d'un devis détaillé précisant :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>La nature et le détail des prestations</li>
                <li>Les dates et lieux d'intervention</li>
                <li>Le nombre de photos/vidéos livrées</li>
                <li>Les conditions de livraison</li>
                <li>Le prix total TTC et les modalités de paiement</li>
              </ul>
              <p className="mt-4">
                Le devis est valable 30 jours. La commande est considérée comme acceptée après signature du devis et versement d'un acompte.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">5. Tarifs et modalités de paiement</h2>
              <p>
                Les tarifs sont indiqués en euros TTC. Hugo Cartier se réserve le droit de modifier ses tarifs à tout moment. Les prestations sont facturées au tarif en vigueur au moment de la commande.
              </p>
              <p className="mt-4">
                Le paiement s'effectue selon les modalités suivantes :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Un acompte de 30% à la commande</li>
                <li>Le solde avant la livraison des prestations</li>
              </ul>
              <p className="mt-4">
                En cas de retard de paiement, des pénalités de 3 fois le taux d'intérêt légal peuvent être appliquées.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">6. Droits d'auteur et cession</h2>
              <p>
                Hugo Cartier conserve l'entière propriété des droits d'auteur sur toutes les photographies et vidéos réalisées. Toute utilisation commerciale, publication ou reproduction nécessite l'autorisation écrite préalable.
              </p>
              <p className="mt-4">
                Les droits d'utilisation personnelle (partage sur réseaux sociaux, impressions privées) sont accordés au client dans le cadre de la prestation. Les droits d'exploitation commerciale ou publicitaire font l'objet d'une cession spécifique et tarifée.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">7. Livraison</h2>
              <p>
                Les délais de livraison sont indiqués dans le devis. En cas de retard, le client sera informé dès que possible. La livraison s'effectue par transfert numérique sécurisé ou sur support physique selon la prestation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">8. Droit de rétractation</h2>
              <p>
                Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne s'applique pas aux contrats de fourniture de contenus numériques ou de prestations de services dont l'exécution a commencé avec l'accord exprès du consommateur.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">9. Annulation et report</h2>
              <p>
                <strong>Annulation par le client :</strong>
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Plus de 30 jours avant : remboursement intégral de l'acompte</li>
                <li>Entre 15 et 30 jours : 50% de l'acompte retenu</li>
                <li>Moins de 15 jours : acompte non remboursable</li>
              </ul>
              <p className="mt-4">
                <strong>Annulation par Hugo Cartier :</strong> En cas d'annulation pour cause de force majeure, l'intégralité des sommes versées sera remboursée.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">10. Réclamations</h2>
              <p>
                Toute réclamation doit être adressée par email à hugooo.cartier@gmail.com dans un délai de 15 jours suivant la livraison. Hugo Cartier s'engage à répondre dans les meilleurs délais et à trouver une solution équitable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">11. Responsabilité</h2>
              <p>
                Hugo Cartier ne saurait être tenu responsable en cas de non-respect des horaires convenus pour des raisons indépendantes de sa volonté (retard client, conditions météorologiques, événement imprévu).
              </p>
              <p className="mt-4">
                La responsabilité de Hugo Cartier est limitée au montant de la prestation facturée en cas de perte ou détérioration des fichiers avant livraison au client.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">12. Données personnelles</h2>
              <p>
                Les données personnelles collectées dans le cadre des commandes sont traitées conformément à la Politique de Confidentialité disponible sur ce site. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-4 mt-8">13. Droit applicable et juridiction</h2>
              <p>
                Les présentes CGV sont soumises au droit français. Tout litige relatif à leur interprétation ou à leur exécution relève des tribunaux compétents du ressort du domicile du prestataire.
              </p>
            </section>

            <section className="mt-12 pt-8 border-t border-white/10">
              <p className="text-sm text-gray-500">
                Pour toute question concernant ces conditions générales de vente, vous pouvez nous contacter à : hugooo.cartier@gmail.com
              </p>
            </section>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ConditionsGeneralesPage;



