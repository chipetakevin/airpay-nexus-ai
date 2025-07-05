import { useState, useEffect } from 'react';

interface MobileDetectionResult {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  userAgent: string;
  screenWidth: number;
  screenHeight: number;
  devicePixelRatio: number;
  touchSupport: boolean;
  orientation: 'portrait' | 'landscape';
  isIOSDevice: boolean;
  isAndroidDevice: boolean;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  forceDesktopRequested: boolean;
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
        devicePixelRatio: 1,
        touchSupport: false,
        orientation: 'landscape',
        isIOSDevice: false,
        isAndroidDevice: false,
        deviceType: 'desktop',
        forceDesktopRequested: false
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const userAgent = navigator.userAgent;
    
    // Enhanced device detection
    const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isIOSDevice = /iPad|iPhone|iPod/i.test(userAgent);
    const isAndroidDevice = /Android/i.test(userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const orientation = height > width ? 'portrait' : 'landscape';
    
    // Check if desktop site was requested (some mobile browsers modify user agent)
    const forceDesktopRequested = !isMobileUserAgent && isTouchDevice && width < 1024;
    
    const isMobile = width < 768 || (isMobileUserAgent && width < 1024 && !forceDesktopRequested);
    const isTablet = width >= 768 && width < 1024 && (isMobileUserAgent || isTouchDevice);
    const isDesktop = width >= 1024 && !isMobileUserAgent;
    
    return {
      isMobile,
      isTablet,
      isDesktop,
      userAgent,
      screenWidth: width,
      screenHeight: height,
      devicePixelRatio: window.devicePixelRatio || 1,
      touchSupport: isTouchDevice,
      orientation,
      isIOSDevice,
      isAndroidDevice,
      deviceType: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
      forceDesktopRequested
    };
  });

  useEffect(() => {
    const updateMobileData = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const userAgent = navigator.userAgent;
      const devicePixelRatio = window.devicePixelRatio || 1;
      
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isIOSDevice = /iPad|iPhone|iPod/i.test(userAgent);
      const isAndroidDevice = /Android/i.test(userAgent);
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const orientation = height > width ? 'portrait' : 'landscape';
      
      const forceDesktopRequested = !isMobileUserAgent && isTouchDevice && width < 1024;
      const isMobile = width < 768 || (isMobileUserAgent && width < 1024 && !forceDesktopRequested);
      const isTablet = width >= 768 && width < 1024 && (isMobileUserAgent || isTouchDevice);
      const isDesktop = width >= 1024 && !isMobileUserAgent;
      
      setMobileData({
        isMobile,
        isTablet,
        isDesktop,
        userAgent,
        screenWidth: width,
        screenHeight: height,
        devicePixelRatio,
        touchSupport: isTouchDevice,
        orientation,
        isIOSDevice,
        isAndroidDevice,
        deviceType: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
        forceDesktopRequested
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