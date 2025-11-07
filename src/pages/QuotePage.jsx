import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from "@/components/ui/use-toast";
import { motion } from 'framer-motion';

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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prevData) => ({ ...prevData, service: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    toast({
      title: "Demande de devis envoyée !",
      description: "Merci. Je vous répondrai dans les plus brefs délais.",
    });
    setFormData({
      name: '',
      email: '',
      service: '',
      eventDate: '',
      location: '',
      message: '',
    });
  };

  return (
    <div className="bg-black text-white min-h-screen pt-32 pb-16">
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
              <Button type="submit" size="lg" className="bg-white text-black hover:bg-gray-200 px-10 py-6 text-base font-light tracking-wide">
                Envoyer ma demande
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default QuotePage;
