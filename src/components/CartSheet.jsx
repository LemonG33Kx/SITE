
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

const CartSheet = ({ isOpen, onOpenChange }) => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { toast } = useToast();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    toast({
      title: '🚧 Boutique en ligne non connectée',
      description: "Pour activer le paiement, veuillez connecter l'intégration 'Online Store'.",
      variant: 'destructive',
    });
  };
  
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-[99]"
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: 'easeInOut' }}
            className="absolute top-0 right-0 h-full w-full max-w-md bg-gray-900 text-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-2xl font-light tracking-wider">Votre Panier</h2>
              <button onClick={() => onOpenChange(false)} className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            {cart.length === 0 ? (
              <div className="flex-grow flex items-center justify-center">
                <p className="text-gray-400">Votre panier est vide.</p>
              </div>
            ) : (
              <div className="flex-grow overflow-y-auto p-6">
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-md object-cover"/>
                      <div className="flex-grow">
                        <p className="font-light">{item.name}</p>
                        <p className="text-sm text-gray-400">{item.variant}</p>
                        <p className="text-sm text-gray-400">{(item.price).toFixed(2)}€</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-full border border-gray-700 hover:bg-gray-800"><Minus size={14}/></button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-full border border-gray-700 hover:bg-gray-800"><Plus size={14}/></button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-500 transition-colors"><Trash2 size={20}/></button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-light">Sous-total</span>
                  <span className="text-xl font-light">{subtotal.toFixed(2)}€</span>
                </div>
                <Button onClick={handleCheckout} className="w-full bg-white text-black hover:bg-gray-200 py-6 text-lg">
                  Finaliser la commande
                </Button>
                <button onClick={clearCart} className="w-full text-center text-sm text-gray-500 mt-4 hover:text-red-500 transition-colors">
                  Vider le panier
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartSheet;
