import { useState, useEffect, RefObject } from 'react';

export const useScrollDirection = (threshold: number = 10, elementRef?: RefObject<HTMLElement>) => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = 0;
    let ticking = false;
    let cleanup: (() => void) | null = null;

    const updateScrollDirection = () => {
      // Determine scroll element
      let scrollElement: HTMLElement | null = null;
      
      if (elementRef?.current) {
        scrollElement = elementRef.current;
      } else {
        // Try to find the mobile scroll container
        scrollElement = document.querySelector('.mobile-scroll-container') as HTMLElement;
      }

      const scrollY = scrollElement ? scrollElement.scrollTop : window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      
      // Only update if we've scrolled past the threshold
      if (Math.abs(scrollY - lastScrollY) >= threshold) {
        setScrollDirection(direction);
        lastScrollY = scrollY > 0 ? scrollY : 0;
      }
      
      // Track if we've scrolled at all
      setIsScrolled(scrollY > 10);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    // Setup scroll listener with a small delay to ensure DOM is ready
    const setupScrollListener = () => {
      let scrollElement: HTMLElement | null = null;
      
      if (elementRef?.current) {
        scrollElement = elementRef.current;
      } else {
        scrollElement = document.querySelector('.mobile-scroll-container') as HTMLElement;
      }

      if (scrollElement) {
        scrollElement.addEventListener('scroll', onScroll, { passive: true });
        cleanup = () => scrollElement?.removeEventListener('scroll', onScroll);
      } else {
        // Fallback to window scroll
        window.addEventListener('scroll', onScroll, { passive: true });
        cleanup = () => window.removeEventListener('scroll', onScroll);
      }
    };

    const timeoutId = setTimeout(setupScrollListener, 100);

    return () => {
      clearTimeout(timeoutId);
      if (cleanup) {
        cleanup();
      }
    };
  }, [threshold, elementRef]);

  return { scrollDirection, isScrolled };
}; 