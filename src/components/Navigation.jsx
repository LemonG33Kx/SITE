
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = ({ navItems }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || location.pathname.startsWith('/galerie') ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <motion.div
                whileHover={{ rotate: 10 }}
                whileTap={{ rotate: -10 }}
                transition={{ duration: 0.2 }}
              >
                <img 
                  src="/logo.png" 
                  alt="Hugo Cartier Logo" 
                  className="h-8 w-auto" 
                />
              </motion.div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                item.isDropdown ? (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-light tracking-wide hover:text-gray-300 transition-colors focus:outline-none">
                      {item.label}
                      <ChevronDown size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {item.children.map((child) => (
                        <DropdownMenuItem key={child.to} asChild>
                          <Link to={child.to}>{child.label}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="text-sm font-light tracking-wide hover:text-gray-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>

            <div className="flex md:hidden items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed inset-0 z-40 bg-black md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item) => (
                item.isDropdown ? (
                  <div key={item.label} className="text-center">
                     <p className="text-2xl font-light tracking-wide text-gray-500 mb-4">{item.label}</p>
                     <div className="flex flex-col gap-4">
                      {item.children.map(child => (
                         <Link
                          key={child.to}
                          to={child.to}
                          className="text-xl font-light tracking-wide text-gray-300 hover:text-white transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                     </div>
                  </div>
                ) : (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="text-2xl font-light tracking-wide hover:text-gray-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
