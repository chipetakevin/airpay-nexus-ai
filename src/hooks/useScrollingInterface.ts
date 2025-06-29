
import { useState, useEffect, useRef } from 'react';
import { useIsMobile } from './use-mobile';

export const useScrollingInterface = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const isMobile = useIsMobile();
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show interface when scrolling stops
      setIsScrolling(true);
      clearTimeout(timeoutRef.current);
      
      timeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      // Hide interface when scrolling down, show when scrolling up
      if (currentScrollY > scrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [scrollY, isMobile]);

  return {
    isVisible: isVisible || !isScrolling,
    isScrolling,
    isMobile
  };
};
