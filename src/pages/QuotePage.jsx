import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from "@/components/ui/use-toast";
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { supabase } from '@/lib/supabase';
import emailjs from '@emailjs/browser';

const QuotePage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    eventDate: '',
    location: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prevData) => ({ ...prevData, service: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Envoi via l'API backend (évite les problèmes RLS en dev si le backend utilise la clé service_role)
  // default to '/api' so on Vercel the serverless function is at /api/submit-quote
  const apiBase = import.meta.env.VITE_API_URL ?? '/api';
      let usedApi = false;
      if (apiBase) {
        try {
          const res = await fetch(`${apiBase}/submit-quote`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });

          if (res.ok) {
            const data = await res.json().catch(() => null);
            console.log('Devis envoyé avec succès via API:', data);
            toast({
              title: 'Demande de devis envoyée !',
              description: 'Merci. Je vous répondrai dans les plus brefs délais.',
            });
            usedApi = true;
          } else if (res.status === 404) {
            console.warn('API endpoint not found (404), will try direct Supabase insertion.');
          } else {
            const err = await res.json().catch(() => ({}));
            console.error('API error submitting quote:', err);
            toast({
              title: "Erreur lors de l'envoi",
              description: err.message || `Statut ${res.status}`,
              variant: 'destructive',
            });
            return;
          }
        } catch (apiErr) {
          console.warn('API request failed, will try direct Supabase insertion.', apiErr);
        }
      }

      // Si l'API n'a pas fonctionné ou n'est pas configurée, on tente l'insertion côté client
      if (!usedApi) {
        // map form fields to DB column names (snake_case) for direct client insert
        const payload = {
          name: formData.name,
          email: formData.email,
          service: formData.service,
          event_date: formData.eventDate,
          location: formData.location,
          message: formData.message,
        };

        const { data, error } = await supabase
          .from('quotes')
          .insert([payload]);

        if (error) {
          console.error("Erreur lors de l'envoi du devis (Supabase client):", error);
          toast({
            title: "Erreur lors de l'envoi",
            description: error.message || "Une erreur est survenue. Veuillez réessayer plus tard.",
            variant: "destructive",
          });
          return;
        }

        console.log('Devis envoyé avec succès (Supabase client):', data);
        toast({
          title: 'Demande de devis envoyée !',
          description: 'Merci. Je vous répondrai dans les plus brefs délais.',
        });
      }

      // Envoi d'un e‑mail via EmailJS si configuré
      const EMAILJS_SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (EMAILJS_SERVICE && EMAILJS_TEMPLATE && EMAILJS_PUBLIC_KEY) {
        const templateParams = {
          name: formData.name,
          email: formData.email,
          service: formData.service,
          eventDate: formData.eventDate,
          location: formData.location,
          message: formData.message,
        };

        try {
          await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, templateParams, EMAILJS_PUBLIC_KEY);
          console.log('EmailJS: notification envoyée');
        } catch (emailErr) {
          console.warn('EmailJS: erreur lors de l\'envoi de la notification', emailErr);
        }
      } else {
        console.warn('EmailJS non configuré (VITE_EMAILJS_... manquantes).');
      }

      // Réinitialiser le formulaire après soumission
      setFormData({
        name: '',
        email: '',
        service: '',
        eventDate: '',
        location: '',
        message: '',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen pt-32 pb-16">
      <Helmet>
        <title>Demander un devis | Hugo Cartier - Photographe & Vidéaste</title>
        <meta name="description" content="Demandez un devis personnalisé pour vos projets de photographie et vidéographie de mariage, immobilier, portrait ou événementiel avec Hugo Cartier à Rennes." />
        <link rel="canonical" href="https://hugocartier.com/demande-devis" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hugocartier.com/demande-devis" />
        <meta property="og:title" content="Demander un devis | Hugo Cartier" />
        <meta property="og:description" content="Demandez un devis personnalisé pour vos projets de photographie et vidéographie de mariage, immobilier, portrait ou événementiel avec Hugo Cartier à Rennes." />
        <meta property="og:image" content="https://hugocartier.com/hugo-cartier.png" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="Hugo Cartier - Photographe & Vidéaste" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Demander un devis | Hugo Cartier" />
        <meta name="twitter:description" content="Demandez un devis personnalisé pour vos projets de photographie et vidéographie de mariage, immobilier, portrait ou événementiel avec Hugo Cartier à Rennes." />
        <meta name="twitter:image" content="https://hugocartier.com/hugo-cartier.png" />
      </Helmet>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-extralight text-center mb-6 tracking-wider">Demander un devis</h1>
          <p className="text-center text-gray-400 mb-12 font-light">
            Remplissez le formulaire ci-dessous pour obtenir une proposition personnalisée.
          </p>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="name" className="block text-sm font-light text-gray-400 mb-2">Nom Complet</label>
                <Input id="name" type="text" placeholder="Votre nom" required value={formData.name} onChange={handleChange} className="bg-white/5 border-white/10 focus:border-white/30" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-light text-gray-400 mb-2">Email</label>
                <Input id="email" type="email" placeholder="votre@email.com" required value={formData.email} onChange={handleChange} className="bg-white/5 border-white/10 focus:border-white/30" />
              </div>
            </div>
            
            <div>
              <label htmlFor="service" className="block text-sm font-light text-gray-400 mb-2">Type de service</label>
              <Select onValueChange={handleSelectChange} value={formData.service}>
                <SelectTrigger className="bg-white/5 border-white/10 focus:border-white/30">
                  <SelectValue placeholder="Sélectionnez une prestation" />
                </SelectTrigger>
                <SelectContent className="bg-black border-white/20">
                  <SelectItem value="mariage">Mariage</SelectItem>
                  <SelectItem value="immobilier">Immobilier</SelectItem>
                  <SelectItem value="evenementiel">Événementiel</SelectItem>
                  <SelectItem value="portrait">Portrait</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="eventDate" className="block text-sm font-light text-gray-400 mb-2">Date de l'événement</label>
                <Input id="eventDate" type="date" required value={formData.eventDate} onChange={handleChange} className="bg-white/5 border-white/10 focus:border-white/30" />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-light text-gray-400 mb-2">Lieu de l'événement</label>
                <Input id="location" type="text" placeholder="Ville, lieu de réception..." required value={formData.location} onChange={handleChange} className="bg-white/5 border-white/10 focus:border-white/30" />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-light text-gray-400 mb-2">Détails de votre projet</label>
              <textarea
                id="message"
                rows="6"
                className="w-full p-2 border rounded-md bg-white/5 border-white/10 focus:border-white/30 focus:ring-0 transition-colors"
                placeholder="Décrivez votre projet, vos attentes, le nombre d'invités, etc."
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="text-center pt-4">
              <Button type="submit" size="lg" disabled={loading} className="bg-white text-black hover:bg-gray-200 px-10 py-6 text-base font-light tracking-wide">
                {loading ? 'Envoi...' : 'Envoyer ma demande'}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default QuotePage;
