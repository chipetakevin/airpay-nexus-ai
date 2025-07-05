import { useState, useEffect } from 'react';

interface MobileDetectionResult {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  userAgent: string;
  screenWidth: number;
  screenHeight: number;
  devicePixelRatio: number;
}

export const useMobileDetection = (): MobileDetectionResult => {
  const [mobileData, setMobileData] = useState<MobileDetectionResult>(() => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        userAgent: '',
        screenWidth: 1024,
        screenHeight: 768,
        devicePixelRatio: 1
      };
    }

    const width = window.innerWidth;
    const userAgent = navigator.userAgent;
    
    // Enhanced mobile detection
    const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    return {
      isMobile: width < 768 || (isMobileUserAgent && width < 1024),
      isTablet: width >= 768 && width < 1024 && (isMobileUserAgent || isTouchDevice),
      isDesktop: width >= 1024 && !isMobileUserAgent,
      userAgent,
      screenWidth: width,
      screenHeight: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio || 1
    };
  });

  useEffect(() => {
    const updateMobileData = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const userAgent = navigator.userAgent;
      const devicePixelRatio = window.devicePixelRatio || 1;
      
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      setMobileData({
        isMobile: width < 768 || (isMobileUserAgent && width < 1024),
        isTablet: width >= 768 && width < 1024 && (isMobileUserAgent || isTouchDevice),
        isDesktop: width >= 1024 && !isMobileUserAgent,
        userAgent,
        screenWidth: width,
        screenHeight: height,
        devicePixelRatio
      });
    };

    // Update on resize and orientation change
    window.addEventListener('resize', updateMobileData);
    window.addEventListener('orientationchange', updateMobileData);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateMobileData);
      window.removeEventListener('orientationchange', updateMobileData);
    };
  }, []);

  return mobileData;
};