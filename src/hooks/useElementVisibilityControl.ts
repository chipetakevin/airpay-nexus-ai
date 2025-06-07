
import { useEffect } from 'react';

export const useElementVisibilityControl = () => {
  useEffect(() => {
    const elementsToHide = [
      'footer',
      '.homepage-button',
      '.return-home-button',
      '.back-to-home',
      '.navigation-home',
      '[data-testid="home-button"]',
      '[aria-label*="home"]',
      '[aria-label*="Homepage"]',
      'nav .home-link',
      '.header-home-link'
    ];

    const backgroundElementsToHide = [
      '.background-overlay',
      '.hero-background', 
      '.page-background',
      '[style*="background-image"]',
      '.bg-gradient-to-br',
      '.absolute.inset-0',
      'img[class*="bg-"]',
      'img[src*="background"]',
      'img[src*="hero"]',
      '.hero-section img',
      '.background-image',
      '.overlay-image',
      'div[style*="background"]'
    ];

    const hiddenElements: HTMLElement[] = [];

    // Hide navigation and footer elements
    elementsToHide.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        const htmlElement = element as HTMLElement;
        if (htmlElement && htmlElement.style.display !== 'none') {
          htmlElement.dataset.originalDisplay = htmlElement.style.display || 'block';
          htmlElement.style.display = 'none';
          htmlElement.style.transition = 'opacity 0.3s ease-out';
          hiddenElements.push(htmlElement);
        }
      });
    });

    // Completely hide background images and overlays
    backgroundElementsToHide.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        const htmlElement = element as HTMLElement;
        if (htmlElement) {
          htmlElement.dataset.originalDisplay = htmlElement.style.display || 'block';
          htmlElement.dataset.originalVisibility = htmlElement.style.visibility || 'visible';
          
          htmlElement.style.display = 'none';
          htmlElement.style.visibility = 'hidden';
          htmlElement.style.opacity = '0';
          htmlElement.style.transition = 'opacity 0.3s ease-out';
          hiddenElements.push(htmlElement);
        }
      });
    });

    // Also hide any img tags that might be background images
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
      const htmlElement = img as HTMLElement;
      const computedStyle = window.getComputedStyle(htmlElement);
      const isBackgroundImage = computedStyle.position === 'absolute' || 
                               computedStyle.position === 'fixed' ||
                               htmlElement.className.includes('background') ||
                               htmlElement.className.includes('hero') ||
                               htmlElement.className.includes('overlay');
      
      if (isBackgroundImage) {
        htmlElement.dataset.originalDisplay = htmlElement.style.display || 'block';
        htmlElement.style.display = 'none';
        htmlElement.style.transition = 'opacity 0.3s ease-out';
        hiddenElements.push(htmlElement);
      }
    });

    // Cleanup function to restore elements when cart closes
    return () => {
      hiddenElements.forEach(element => {
        if (element.dataset.originalDisplay) {
          element.style.display = element.dataset.originalDisplay;
          delete element.dataset.originalDisplay;
        } else {
          element.style.display = 'block';
        }
        
        if (element.dataset.originalVisibility) {
          element.style.visibility = element.dataset.originalVisibility;
          delete element.dataset.originalVisibility;
        } else {
          element.style.visibility = 'visible';
        }
        
        element.style.opacity = '';
      });
    };
  }, []);
};
