import React, { useEffect, useRef } from 'react';

const LumysWidget = ({ category = null, widgetKey = null }) => {
  const widgetRef = useRef(null);
  const initAttemptedRef = useRef(false);
  const widgetId = 'lumys-widget'; // ID fixe requis par Lumys

  useEffect(() => {
    // Réinitialiser quand la clé change (changement d'onglet)
    initAttemptedRef.current = false;

    // Attendre que la div soit montée dans le DOM
    const checkAndInit = () => {
      if (!widgetRef.current) {
        return false;
      }

      // Configuration Lumys (code exact fourni par Lumys)
      window.lumysUrl = "https://app.lumys.photo";
      window.lumysApiKey = "9bjf8ama955idfcc";
      
      // Si une catégorie est spécifiée, la définir
      if (category) {
        window.lumysCategory = category;
      } else {
        // S'assurer que la catégorie n'est pas définie si non spécifiée
        delete window.lumysCategory;
      }

      // Vérifier si la div existe dans le DOM
      const widgetDiv = document.getElementById(widgetId);
      if (!widgetDiv) {
        return false;
      }

      // Vider complètement le contenu précédent
      widgetDiv.innerHTML = '';
      
      // S'assurer que l'ID est bien défini pour Lumys
      widgetDiv.id = widgetId;

      return true;
    };

    // Essayer immédiatement
    if (!checkAndInit()) {
      // Si ça ne marche pas, réessayer après un court délai
      const timer = setTimeout(() => {
        if (checkAndInit() && !initAttemptedRef.current) {
          initLumys();
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      initLumys();
    }

    function initLumys() {
      if (initAttemptedRef.current) return;
      initAttemptedRef.current = true;

      // Attendre un peu avant de recharger le script pour s'assurer que la div est prête
      setTimeout(() => {
        const widgetDiv = document.getElementById(widgetId);
        if (!widgetDiv) {
          console.error('La div lumys-widget n\'existe pas');
          return;
        }

        // S'assurer que la div est vide
        widgetDiv.innerHTML = '';

        // Supprimer l'ancien script s'il existe pour forcer une réinitialisation complète
        const scriptId = 'lumys-widget-loader';
        const existingScript = document.getElementById(scriptId);
        if (existingScript) {
          existingScript.remove();
        }
        
        // Nettoyer les variables globales si elles existent
        delete window.lumysWidget;
        delete window.lumys;
        
        // Attendre un peu avant de recharger le script
        setTimeout(() => {
          // Créer un nouveau script avec un timestamp pour forcer le rechargement
          const script = document.createElement('script');
          script.id = scriptId;
          script.src = window.lumysUrl + "/widget/lumys-widget-v1.js?v=" + Date.now();
          script.async = true;
          script.onload = () => {
            console.log('Script Lumys chargé et réinitialisé');
            // Attendre un peu pour que le widget s'initialise
            setTimeout(() => {
              applyCustomStyles();
            }, 800);
          };
          script.onerror = () => {
            console.error('Erreur lors du chargement du script Lumys');
          };
          document.head.appendChild(script);
        }, 50);
      }, 150);
    }

    function applyCustomStyles() {
      // Appliquer des styles personnalisés au widget Lumys
      setTimeout(() => {
        const widgetDiv = document.getElementById(widgetId);
        if (widgetDiv) {
          // Styles pour améliorer l'intégration
          const style = document.createElement('style');
          style.id = 'lumys-custom-styles';
          style.textContent = `
            #lumys-widget {
              background: transparent !important;
            }
            #lumys-widget * {
              color: white !important;
            }
            #lumys-widget img {
              border-radius: 0.5rem !important;
              transition: transform 0.3s ease, box-shadow 0.3s ease !important;
            }
            #lumys-widget img:hover {
              transform: scale(1.05) !important;
              box-shadow: 0 10px 30px rgba(255, 255, 255, 0.1) !important;
            }
            #lumys-widget .gallery-item,
            #lumys-widget .album-item,
            #lumys-widget [class*="gallery"],
            #lumys-widget [class*="album"] {
              border-radius: 0.5rem !important;
              overflow: hidden !important;
            }
            /* Ne pas masquer les éléments de galerie - seulement le branding spécifique */
          `;
          
          // Supprimer l'ancien style s'il existe
          const oldStyle = document.getElementById('lumys-custom-styles');
          if (oldStyle) {
            oldStyle.remove();
          }
          
          document.head.appendChild(style);

          // Masquer uniquement les éléments de branding spécifiques (très sélectif)
          const hideBrandingElements = () => {
            const allElements = widgetDiv.querySelectorAll('*');
            allElements.forEach(element => {
              const text = (element.textContent || '').trim();
              const tagName = element.tagName;
              
              // Ne JAMAIS masquer les images, liens vers images, ou conteneurs de galerie
              if (
                tagName === 'IMG' ||
                tagName === 'A' ||
                element.closest('[class*="gallery"]') ||
                element.closest('[class*="album"]') ||
                element.closest('[class*="grid"]') ||
                element.closest('[class*="container"]')
              ) {
                return; // Ne pas toucher aux éléments de galerie
              }
              
              // Masquer UNIQUEMENT si le texte contient exactement le branding et rien d'autre
              if (
                text === 'Un service proposé par Lumys' ||
                (text.includes('Un service proposé par Lumys') && text.length < 60 && !text.includes('image'))
              ) {
                // Vérifier que ce n'est pas un parent d'une image
                if (!element.querySelector('img') && !element.closest('[class*="gallery"]')) {
                  element.style.display = 'none';
                  element.style.visibility = 'hidden';
                  element.style.opacity = '0';
                  element.style.height = '0';
                  element.style.width = '0';
                  element.style.overflow = 'hidden';
                  element.style.position = 'absolute';
                  element.style.left = '-9999px';
                }
              }
            });
          };

          // Exécuter avec un délai pour laisser le widget se charger complètement
          setTimeout(hideBrandingElements, 2000);
          setTimeout(hideBrandingElements, 4000);
        }
      }, 1000);
    }

    // Cleanup function
    return () => {
      // Ne pas nettoyer le script ici car on veut qu'il persiste
      // Le script sera supprimé et recréé à chaque fois qu'on revient sur l'onglet
    };
  }, [category, widgetKey]);

  return (
    <div className="w-full relative">
      <div 
        ref={widgetRef}
        id={widgetId}
        className="min-h-[600px] bg-transparent w-full"
        data-lumys-widget="true"
      ></div>
    </div>
  );
};

export default LumysWidget;

