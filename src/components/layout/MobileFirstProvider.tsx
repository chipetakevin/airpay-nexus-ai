import React, { createContext, useContext, useEffect, useState } from 'react';

interface MobileFirstContextType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  orientation: 'portrait' | 'landscape';
  touchDevice: boolean;
  // Backward compatibility
  deviceType: 'mobile' | 'tablet' | 'desktop';
  screenSize: 'sm' | 'md' | 'lg' | 'xl';
}

const MobileFirstContext = createContext<MobileFirstContextType | undefined>(undefined);

export const useMobileFirst = () => {
  const context = useContext(MobileFirstContext);
  if (context === undefined) {
    throw new Error('useMobileFirst must be used within a MobileFirstProvider');
  }
  return context;
};

interface MobileFirstProviderProps {
  children: React.ReactNode;
}

export const MobileFirstProvider: React.FC<MobileFirstProviderProps> = ({ children }) => {
  const [screenData, setScreenData] = useState<MobileFirstContextType>(() => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 768;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024;
    
    return {
      isMobile,
      isTablet,
      isDesktop,
      screenWidth: width,
      orientation: typeof window !== 'undefined' 
        ? (window.innerHeight > window.innerWidth ? 'portrait' : 'landscape')
        : 'portrait',
      touchDevice: typeof window !== 'undefined' 
        ? 'ontouchstart' in window || navigator.maxTouchPoints > 0
        : false,
      deviceType: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
      screenSize: width < 640 ? 'sm' : width < 768 ? 'md' : width < 1024 ? 'lg' : 'xl'
    };
  });

  useEffect(() => {
    const updateScreenData = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;
      
      setScreenData({
        isMobile,
        isTablet,
        isDesktop,
        screenWidth: width,
        orientation: window.innerHeight > window.innerWidth ? 'portrait' : 'landscape',
        touchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        deviceType: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
        screenSize: width < 640 ? 'sm' : width < 768 ? 'md' : width < 1024 ? 'lg' : 'xl'
      });
    };

    // Add event listeners
    window.addEventListener('resize', updateScreenData);
    window.addEventListener('orientationchange', updateScreenData);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateScreenData);
      window.removeEventListener('orientationchange', updateScreenData);
    };
  }, []);

  return (
    <MobileFirstContext.Provider value={screenData}>
      {children}
    </MobileFirstContext.Provider>
  );
};