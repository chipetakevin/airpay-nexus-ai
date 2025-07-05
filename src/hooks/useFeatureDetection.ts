import { useState, useEffect } from 'react';

interface FeatureDetectionResult {
  touchSupport: boolean;
  hoverSupport: boolean;
  orientationSupport: boolean;
  geolocationSupport: boolean;
  cameraSupport: boolean;
  pushNotificationSupport: boolean;
  serviceWorkerSupport: boolean;
  webPSupport: boolean;
  intersectionObserverSupport: boolean;
  cssGridSupport: boolean;
  flexboxSupport: boolean;
  customPropertiesSupport: boolean;
  reducedMotionPreference: boolean;
}

export const useFeatureDetection = (): FeatureDetectionResult => {
  const [features, setFeatures] = useState<FeatureDetectionResult>(() => {
    if (typeof window === 'undefined') {
      return {
        touchSupport: false,
        hoverSupport: true,
        orientationSupport: false,
        geolocationSupport: false,
        cameraSupport: false,
        pushNotificationSupport: false,
        serviceWorkerSupport: false,
        webPSupport: false,
        intersectionObserverSupport: false,
        cssGridSupport: false,
        flexboxSupport: false,
        customPropertiesSupport: false,
        reducedMotionPreference: false
      };
    }

    return {
      touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      hoverSupport: window.matchMedia('(hover: hover)').matches,
      orientationSupport: 'orientation' in window,
      geolocationSupport: 'geolocation' in navigator,
      cameraSupport: 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
      pushNotificationSupport: 'Notification' in window && 'serviceWorker' in navigator,
      serviceWorkerSupport: 'serviceWorker' in navigator,
      webPSupport: false, // Will be detected async
      intersectionObserverSupport: 'IntersectionObserver' in window,
      cssGridSupport: CSS.supports('display', 'grid'),
      flexboxSupport: CSS.supports('display', 'flex'),
      customPropertiesSupport: CSS.supports('color', 'var(--test)'),
      reducedMotionPreference: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };
  });

  useEffect(() => {
    // Async WebP detection
    const detectWebPSupport = () => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        setFeatures(prev => ({
          ...prev,
          webPSupport: webP.height === 2
        }));
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    };

    detectWebPSupport();

    // Listen for media query changes
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hoverQuery = window.matchMedia('(hover: hover)');

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setFeatures(prev => ({ ...prev, reducedMotionPreference: e.matches }));
    };

    const handleHoverChange = (e: MediaQueryListEvent) => {
      setFeatures(prev => ({ ...prev, hoverSupport: e.matches }));
    };

    reducedMotionQuery.addEventListener('change', handleMotionChange);
    hoverQuery.addEventListener('change', handleHoverChange);

    return () => {
      reducedMotionQuery.removeEventListener('change', handleMotionChange);
      hoverQuery.removeEventListener('change', handleHoverChange);
    };
  }, []);

  return features;
};