
import React from 'react';
import Navigation from '@/components/Navigation';
import ContactFooter from '@/components/ContactFooter';

const navItems = [
    { to: '/', label: 'Accueil' },
    { 
      label: 'Services',
      isDropdown: true,
      children: [
        { to: '/service/mariage', label: 'Mariage' },
        { to: '/service/immobilier', label: 'Immobilier' },
        { to: '/service/portrait', label: 'Portrait' },
        { to: '/service/evenementiel', label: 'Événementiel' },
      ]
    },
    { to: '/galerie', label: 'Galerie' },
    { to: '/a-propos', label: 'À Propos' },
];

const Layout = ({ children }) => {
  return (
    <div className="relative bg-black min-h-screen text-white">
      <Navigation navItems={navItems} />
      <main>{children}</main>
      <ContactFooter />
    </div>
  );
};

export default Layout;
