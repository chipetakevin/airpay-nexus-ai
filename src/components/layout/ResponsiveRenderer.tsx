import React from 'react';
import { useMobileDetection } from '@/hooks/useMobileDetection';
import { useMobileFirst } from './MobileFirstProvider';
import { cn } from '@/lib/utils';

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
  
  // Strict device separation - prevent crossover
  const actualDevice = mobileDetection.deviceType;
  const effectiveDevice = forceLayout || actualDevice;
  
  // Log device decisions in development
  if (process.env.NODE_ENV === 'development' && currentDevice !== effectiveDevice) {
    console.log('ResponsiveRenderer: Device override', {
      actualDevice,
      effectiveDevice,
      forceLayout
    });
  }
  
  // Touch device filtering with strict separation
  if (touchOnly && !mobileDetection.touchSupport) {
    return null;
  }
  
  // Hide on specific devices - strict enforcement
  if (hideOn) {
    if (hideOn === 'mobile' && (effectiveDevice === 'mobile' || actualDevice === 'mobile')) return null;
    if (hideOn === 'tablet' && (effectiveDevice === 'tablet' || actualDevice === 'tablet')) return null;
    if (hideOn === 'desktop' && (effectiveDevice === 'desktop' || actualDevice === 'desktop')) return null;
  }
  
  // Show on specific devices - enhanced logic
  const shouldShow = () => {
    switch (showOn) {
      case 'mobile':
        return effectiveDevice === 'mobile';
      case 'tablet':
        return effectiveDevice === 'tablet';
      case 'desktop':
        return effectiveDevice === 'desktop';
      case 'mobile-tablet':
        return effectiveDevice === 'mobile' || effectiveDevice === 'tablet';
      case 'tablet-desktop':
        return effectiveDevice === 'tablet' || effectiveDevice === 'desktop';
      case 'all':
        return true;
      default:
        return true;
    }
  };
  
  if (!shouldShow()) {
    return null;
  }
  
  // Render device-specific content with strict separation
  if (effectiveDevice === 'mobile' && mobile) {
    return <>{mobile}</>;
  }
  
  if (effectiveDevice === 'tablet' && tablet) {
    return <>{tablet}</>;
  }
  
  if (effectiveDevice === 'desktop' && desktop) {
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

// Force mobile layout component with enhanced device detection
export const ForceMobileLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { touchSupport, screenWidth, deviceType } = useMobileDetection();
  
  // Enhanced logic to force mobile layout
  const shouldForceMobile = 
    deviceType === 'mobile' || 
    (touchSupport && screenWidth < 1024) ||
    localStorage.getItem('forceMobileInterface') === 'true';
  
  // Prevent desktop layout bleeding through
  const forceLayout = shouldForceMobile ? 'mobile' : undefined;
  
  if (process.env.NODE_ENV === 'development') {
    console.log('ForceMobileLayout:', {
      deviceType,
      touchSupport,
      screenWidth,
      shouldForceMobile,
      forceLayout
    });
  }
  
  return (
    <div className={cn(
      shouldForceMobile ? 'force-mobile-layout mobile-interface-only' : 'allow-responsive-layout',
      'device-layout-container'
    )}>
      <ResponsiveRenderer forceLayout={forceLayout}>
        {children}
      </ResponsiveRenderer>
    </div>
  );
};