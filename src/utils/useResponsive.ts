import { useState, useEffect, useCallback } from 'react';

interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLandscape: boolean;
  viewportHeight: number;
  safeAreaBottom: number;
}

// Función de debounce para evitar renderizados excesivos
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const useResponsive = (): ResponsiveState => {
  const [state, setState] = useState<ResponsiveState>(() => {
    // Initialize with current values to prevent hydration mismatch
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isLandscape = width > height;
      
      return {
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        isLandscape,
        viewportHeight: height,
        safeAreaBottom: 0,
      };
    }
    
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: false,
      isLandscape: false,
      viewportHeight: 0,
      safeAreaBottom: 0,
    };
  });

  const updateState = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isLandscape = width > height;
    
    // Get safe area bottom if available
    const computedStyle = getComputedStyle(document.documentElement);
    const safeAreaBottom = parseInt(
      computedStyle.getPropertyValue('--safe-area-inset-bottom') || '0'
    );

    setState({
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024,
      isLandscape,
      viewportHeight: height,
      safeAreaBottom,
    });
  }, []);

  useEffect(() => {
    updateState();
    
    // Debounce los eventos para evitar renderizados excesivos
    const debouncedUpdate = debounce(updateState, 100);
    
    window.addEventListener('resize', debouncedUpdate);
    window.addEventListener('orientationchange', debouncedUpdate);
    
    return () => {
      window.removeEventListener('resize', debouncedUpdate);
      window.removeEventListener('orientationchange', debouncedUpdate);
    };
  }, [updateState]);

  return state;
};

// Hook para animaciones optimizadas según dispositivo
export const useOptimizedAnimations = () => {
  const { isMobile } = useResponsive();
  
  // NUEVA ESTRATEGIA: CSS maneja las animaciones completamente
  // Este hook solo determina qué clases aplicar
  
  // Para elementos que necesitan animación condicional
  const getAnimationClasses = (baseClasses: string = '') => {
    if (isMobile) {
      // En móvil: clases base sin animaciones
      return baseClasses;
    }
    // En desktop: agregar clases de animación
    return `${baseClasses} desktop-animate`;
  };

  // Variantes simplificadas - solo para casos específicos donde se necesite JS
  const containerVariants = {
    hidden: { opacity: 1 }, // Siempre visible para evitar flash
    visible: { 
      opacity: 1,
      transition: { duration: 0 } // Sin transición
    }
  };

  const itemVariants = {
    hidden: { opacity: 1, y: 0 }, // Sin movimiento inicial
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0 } // Sin transición
    }
  };

  return {
    containerVariants,
    itemVariants,
    staticVariants: containerVariants,
    isMobile,
    getAnimationClasses
  };
};

export default useResponsive; 