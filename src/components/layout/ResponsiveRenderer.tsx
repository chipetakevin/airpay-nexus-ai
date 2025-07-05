import React from 'react';
import { useMobileDetection } from '@/hooks/useMobileDetection';
import { useMobileFirst } from './MobileFirstProvider';

interface ResponsiveRendererProps {
  mobile?: React.ReactNode;
  tablet?: React.ReactNode;
  desktop?: React.ReactNode;
  fallback?: React.ReactNode;
  children?: React.ReactNode;
  showOn?: 'mobile' | 'tablet' | 'desktop' | 'mobile-tablet' | 'tablet-desktop' | 'all';
  hideOn?: 'mobile' | 'tablet' | 'desktop';
  touchOnly?: boolean;
  forceLayout?: 'mobile' | 'desktop';
}

export const ResponsiveRenderer: React.FC<ResponsiveRendererProps> = ({
  mobile,
  tablet,
  desktop,
  fallback,
  children,
  showOn = 'all',
  hideOn,
  touchOnly = false,
  forceLayout
}) => {
  const mobileDetection = useMobileDetection();
  const { isMobile, isTablet, isDesktop } = useMobileFirst();
  
  // Enhanced device detection with force layout support
  const currentDevice = forceLayout === 'mobile' ? 'mobile' : 
                       forceLayout === 'desktop' ? 'desktop' :
                       mobileDetection.deviceType;
  
  // Touch device filtering
  if (touchOnly && !mobileDetection.touchSupport) {
    return null;
  }
  
  // Hide on specific devices
  if (hideOn) {
    if (hideOn === 'mobile' && currentDevice === 'mobile') return null;
    if (hideOn === 'tablet' && currentDevice === 'tablet') return null;
    if (hideOn === 'desktop' && currentDevice === 'desktop') return null;
  }
  
  // Show on specific devices
  const shouldShow = () => {
    switch (showOn) {
      case 'mobile':
        return currentDevice === 'mobile';
      case 'tablet':
        return currentDevice === 'tablet';
      case 'desktop':
        return currentDevice === 'desktop';
      case 'mobile-tablet':
        return currentDevice === 'mobile' || currentDevice === 'tablet';
      case 'tablet-desktop':
        return currentDevice === 'tablet' || currentDevice === 'desktop';
      case 'all':
        return true;
      default:
        return true;
    }
  };
  
  if (!shouldShow()) {
    return null;
  }
  
  // Render device-specific content
  if (currentDevice === 'mobile' && mobile) {
    return <>{mobile}</>;
  }
  
  if (currentDevice === 'tablet' && tablet) {
    return <>{tablet}</>;
  }
  
  if (currentDevice === 'desktop' && desktop) {
    return <>{desktop}</>;
  }
  
  // Fallback to children or fallback content
  return <>{children || fallback}</>;
};

// Utility components for common patterns
export const MobileOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ResponsiveRenderer mobile={children} />
);

export const TabletOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ResponsiveRenderer tablet={children} />
);

export const DesktopOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ResponsiveRenderer desktop={children} />
);

export const TouchOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ResponsiveRenderer touchOnly>{children}</ResponsiveRenderer>
);

// Force mobile layout component for preventing desktop layout on mobile
export const ForceMobileLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { touchSupport, screenWidth } = useMobileDetection();
  
  // Force mobile layout if it's a touch device under 1024px
  const shouldForceMobile = touchSupport && screenWidth < 1024;
  
  return (
    <div className={shouldForceMobile ? 'force-mobile-layout' : ''}>
      <ResponsiveRenderer forceLayout={shouldForceMobile ? 'mobile' : undefined}>
        {children}
      </ResponsiveRenderer>
    </div>
  );
};