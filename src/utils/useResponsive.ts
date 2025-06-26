import { useState, useEffect } from 'react';

interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLandscape: boolean;
  viewportHeight: number;
  safeAreaBottom: number;
}

export const useResponsive = (): ResponsiveState => {
  const [state, setState] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLandscape: false,
    viewportHeight: 0,
    safeAreaBottom: 0,
  });

  useEffect(() => {
    const updateState = () => {
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
    };

    updateState();
    
    window.addEventListener('resize', updateState);
    window.addEventListener('orientationchange', updateState);
    
    return () => {
      window.removeEventListener('resize', updateState);
      window.removeEventListener('orientationchange', updateState);
    };
  }, []);

  return state;
};

export default useResponsive; 