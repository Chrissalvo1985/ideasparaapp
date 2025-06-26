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
  const [state, setState] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLandscape: false,
    viewportHeight: 0,
    safeAreaBottom: 0,
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
    const debouncedUpdate = debounce(updateState, 150);
    
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
  
  // Variantes sin layout shift para móvil
  const containerVariants = {
    hidden: { opacity: isMobile ? 0 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.03 : 0.1, // Animaciones más rápidas en móvil
        delayChildren: isMobile ? 0.01 : 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: isMobile ? 0 : 20, // Sin desplazamiento vertical en móvil
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: isMobile ? "tween" : "spring", // Transiciones más simples en móvil
        duration: isMobile ? 0.2 : 0.5,
        stiffness: 300,
        damping: 24
      }
    }
  };

  return {
    containerVariants,
    itemVariants,
    isMobile
  };
};

export default useResponsive; 