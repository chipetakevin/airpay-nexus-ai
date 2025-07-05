import React, { createContext, useContext, useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileFirstContextType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  orientation: 'portrait' | 'landscape';
  screenSize: {
    width: number;
    height: number;
  };
}

const MobileFirstContext = createContext<MobileFirstContextType | undefined>(undefined);

export const useMobileFirst = () => {
  const context = useContext(MobileFirstContext);
  if (!context) {
    throw new Error('useMobileFirst must be used within a MobileFirstProvider');
  }
  return context;
};

interface MobileFirstProviderProps {
  children: React.ReactNode;
}

export const MobileFirstProvider: React.FC<MobileFirstProviderProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  useEffect(() => {
    const updateScreenInfo = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
      setOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
    };

    updateScreenInfo();
    window.addEventListener('resize', updateScreenInfo);
    window.addEventListener('orientationchange', updateScreenInfo);

    return () => {
      window.removeEventListener('resize', updateScreenInfo);
      window.removeEventListener('orientationchange', updateScreenInfo);
    };
  }, []);

  const isTablet = screenSize.width >= 768 && screenSize.width < 1024;
  const isDesktop = screenSize.width >= 1024;
  
  const deviceType: 'mobile' | 'tablet' | 'desktop' = 
    isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

  const value: MobileFirstContextType = {
    isMobile,
    isTablet,
    isDesktop,
    deviceType,
    orientation,
    screenSize
  };

  return (
    <MobileFirstContext.Provider value={value}>
      <div className={`mobile-first-layout ${deviceType} ${orientation}`}>
        {children}
      </div>
    </MobileFirstContext.Provider>
  );
};