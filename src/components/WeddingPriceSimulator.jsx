
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Camera, Video, Film, Clock, Euro } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";

const serviceOptions = [
  { id: 'photos', label: 'Photos', icon: <Camera size={24} />, basePrice: 900 },
  { id: 'video', label: 'Vidéo', icon: <Video size={24} />, basePrice: 1400 },
  { id: 'combo', label: 'Photos + Vidéo', icon: <Film size={24} />, basePrice: 2100 },
];

const MIN_HOURS = 4;
const BASE_HOURS = 13; // 11h à 00h
const MIN_PRICE_RATIO = 0.5; // Le prix minimum est 50% du prix de base

// Function to format time, handling wrap-around for hours > 23
const formatTime = (hour) => {
  const h = Math.floor(hour % 24); // Use modulo 24 to get hour in 0-23 range
  const m = Math.round((hour % 1) * 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

const WeddingPriceSimulator = () => {
  const [service, setService] = useState('photos');
  const [timeRange, setTimeRange] = useState([11, 24]); // 11h à 00h (24 represents next day 00:00)
  const { toast } = useToast();

  const selectedService = serviceOptions.find(opt => opt.id === service);

  const estimatedPrice = useMemo(() => {
    const [start, end] = timeRange;
    const duration = end - start;

    if (duration < MIN_HOURS) {
      return selectedService.basePrice * MIN_PRICE_RATIO;
    }

    const pricePerHour = selectedService.basePrice / BASE_HOURS;
    const calculatedPrice = pricePerHour * duration;
    
    // Assurer un prix minimum
    return Math.max(calculatedPrice, selectedService.basePrice * MIN_PRICE_RATIO);
  }, [timeRange, selectedService]);

  const handleContactClick = () => {
    toast({
        title: 'Prise de contact',
        description: 'Cette fonctionnalité sera bientôt disponible ! Pour l\'instant, contactez-moi via le formulaire en bas de page.',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="mt-20"
    >
      <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
        <h3 className="text-3xl font-extralight tracking-wider text-center mb-10 text-white">Simulez votre devis Mariage</h3>

        <div className="mb-10">
          <div className="grid grid-cols-3 gap-4">
            {serviceOptions.map(opt => (
              <button
                key={opt.id}
                onClick={() => setService(opt.id)}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg border transition-all duration-300 ${
                  service === opt.id
                    ? 'bg-white text-black border-white'
                    : 'bg-white/5 text-white border-white/20 hover:bg-white/10'
                }`}
              >
                {opt.icon}
                <span className="text-sm font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <div className="flex justify-between items-center mb-4 text-white">
            <div className="flex items-center gap-2">
              <Clock size={20} />
              <span className="font-medium">Plage horaire</span>
            </div>
            <div className="font-mono text-lg bg-white/10 px-3 py-1 rounded">
              {formatTime(timeRange[0])} - {formatTime(timeRange[1])}
            </div>
          </div>
          <Slider
            min={8}
            max={26} // 8h à 02h du matin le lendemain (24=00h, 25=01h, 26=02h)
            step={0.5}
            value={timeRange}
            onValueChange={setTimeRange}
            minStepsBetweenThumbs={MIN_HOURS}
            className="my-6"
          />
           <div className="flex justify-between text-xs text-gray-400">
                <span>08:00</span>
                <span>17:00</span>
                <span>02:00</span>
            </div>
        </div>

        <div className="text-center border-t border-white/10 pt-8 mt-8">
            <p className="text-gray-400 mb-2">Estimation du tarif</p>
            <motion.p 
              key={estimatedPrice}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-white mb-6 flex items-center justify-center gap-2"
            >
              {Math.round(estimatedPrice)} <Euro size={36} className="opacity-80" />
            </motion.p>
            <Button size="lg" className="bg-white text-black hover:bg-gray-200" onClick={handleContactClick}>
              Demander un devis personnalisé
            </Button>
            <p className="text-xs text-gray-500 mt-4">Ce tarif est une estimation et peut varier selon les détails de votre projet.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default WeddingPriceSimulator;
