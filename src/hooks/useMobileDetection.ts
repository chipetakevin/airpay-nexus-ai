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
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const orientation = height > width ? 'portrait' : 'landscape' as 'portrait' | 'landscape';
    
    // Enhanced device detection with comprehensive patterns
    const mobilePatterns = [
      /android.*mobile/i, /iphone/i, /ipod/i, /blackberry/i, /bb10/i, 
      /opera mini/i, /mobile/i, /phone/i, /samsung.*mobile/i, 
      /windows phone/i, /iemobile/i, /webos/i
    ];
    
    const tabletPatterns = [
      /ipad/i, /android(?!.*mobile)/i, /tablet/i, /kindle/i, /silk/i, 
      /playbook/i, /rim tablet/i
    ];
    
    const desktopPatterns = [
      /windows nt/i, /mac os x/i, /linux/i, /cros/i, /x11/i
    ];
    
    // Check patterns against user agent
    const isMobileUA = mobilePatterns.some(pattern => pattern.test(userAgent));
    const isTabletUA = tabletPatterns.some(pattern => pattern.test(userAgent));
    const isDesktopUA = desktopPatterns.some(pattern => pattern.test(userAgent));
    
    // Device-specific checks
    const isIOSDevice = /iPad|iPhone|iPod/i.test(userAgent);
    const isAndroidDevice = /Android/i.test(userAgent);
    
    // Additional capability checks
    const hasMouseSupport = window.matchMedia('(pointer: fine)').matches;
    const hasHoverSupport = window.matchMedia('(hover: hover)').matches;
    const forceDesktopRequested = localStorage.getItem('forceDesktop') === 'true' || 
                                 (isDesktopUA && hasMouseSupport && hasHoverSupport);
    
    // Strict device classification - prevent layout crossover
    let deviceType: 'mobile' | 'tablet' | 'desktop';
    let isMobile: boolean;
    let isTablet: boolean;
    
    // Desktop: Non-touch OR explicit desktop patterns with mouse/hover
    if (forceDesktopRequested || (isDesktopUA && hasMouseSupport && hasHoverSupport)) {
      deviceType = 'desktop';
      isMobile = false;
      isTablet = false;
    }
    // Mobile: Explicit mobile patterns OR touch + small screen without hover
    else if (isMobileUA || (isTouchDevice && width < 768 && !hasHoverSupport)) {
      deviceType = 'mobile';
      isMobile = true;
      isTablet = false;
    }
    // Tablet: Explicit tablet patterns OR touch + medium screen
    else if (isTabletUA || (isTouchDevice && width >= 768 && width < 1024)) {
      deviceType = 'tablet';
      isMobile = false;
      isTablet = true;
    }
    // Fallback: Large screen = desktop, otherwise mobile
    else {
      if (width >= 1024 && hasMouseSupport) {
        deviceType = 'desktop';
        isMobile = false;
        isTablet = false;
      } else {
        deviceType = 'mobile';
        isMobile = true;
        isTablet = false;
      }
    }

    const isDesktop = deviceType === 'desktop';

    // Debug logging
    if (process.env.NODE_ENV === 'development') {
      console.log('Enhanced Device Detection:', {
        deviceType,
        width,
        userAgent: userAgent.substring(0, 50) + '...',
        isTouchDevice,
        hasMouseSupport,
        hasHoverSupport,
        patterns: { isMobileUA, isTabletUA, isDesktopUA }
      });
    }
    
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
      deviceType,
      forceDesktopRequested
    };
  });

  useEffect(() => {
    const updateMobileData = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const userAgent = navigator.userAgent;
      const devicePixelRatio = window.devicePixelRatio || 1;
      
      // Enhanced device detection with comprehensive patterns
      const mobilePatterns = [
        /android.*mobile/i, /iphone/i, /ipod/i, /blackberry/i, /bb10/i, 
        /opera mini/i, /mobile/i, /phone/i, /samsung.*mobile/i, 
        /windows phone/i, /iemobile/i, /webos/i
      ];
      
      const tabletPatterns = [
        /ipad/i, /android(?!.*mobile)/i, /tablet/i, /kindle/i, /silk/i, 
        /playbook/i, /rim tablet/i
      ];
      
      const desktopPatterns = [
        /windows nt/i, /mac os x/i, /linux/i, /cros/i, /x11/i
      ];
      
      const isMobileUA = mobilePatterns.some(pattern => pattern.test(userAgent));
      const isTabletUA = tabletPatterns.some(pattern => pattern.test(userAgent));
      const isDesktopUA = desktopPatterns.some(pattern => pattern.test(userAgent));
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const orientation = height > width ? 'portrait' : 'landscape';
      
      const hasMouseSupport = window.matchMedia('(pointer: fine)').matches;
      const hasHoverSupport = window.matchMedia('(hover: hover)').matches;
      const forceDesktopRequested = localStorage.getItem('forceDesktop') === 'true' || 
                                   (isDesktopUA && hasMouseSupport && hasHoverSupport);
      
      // Strict device classification
      let deviceType: 'mobile' | 'tablet' | 'desktop';
      let isMobile: boolean;
      let isTablet: boolean;
      
      if (forceDesktopRequested || (isDesktopUA && hasMouseSupport && hasHoverSupport)) {
        deviceType = 'desktop';
        isMobile = false;
        isTablet = false;
      } else if (isMobileUA || (isTouchDevice && width < 768 && !hasHoverSupport)) {
        deviceType = 'mobile';
        isMobile = true;
        isTablet = false;
      } else if (isTabletUA || (isTouchDevice && width >= 768 && width < 1024)) {
        deviceType = 'tablet';
        isMobile = false;
        isTablet = true;
      } else {
        if (width >= 1024 && hasMouseSupport) {
          deviceType = 'desktop';
          isMobile = false;
          isTablet = false;
        } else {
          deviceType = 'mobile';
          isMobile = true;
          isTablet = false;
        }
      }
      
      setMobileData({
        isMobile,
        isTablet,
        isDesktop: deviceType === 'desktop',
        userAgent,
        screenWidth: width,
        screenHeight: height,
        devicePixelRatio,
        touchSupport: isTouchDevice,
        orientation,
        isIOSDevice: /iPad|iPhone|iPod/i.test(userAgent),
        isAndroidDevice: /Android/i.test(userAgent),
        deviceType,
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