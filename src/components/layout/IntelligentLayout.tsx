import React from 'react';
import { ResponsiveRenderer, MobileOnly, DesktopOnly, ForceMobileLayout } from './ResponsiveRenderer';
import { ProgressiveEnhancement } from './ProgressiveEnhancement';
import { useMobileDetection } from '@/hooks/useMobileDetection';
import { useFeatureDetection } from '@/hooks/useFeatureDetection';

interface IntelligentLayoutProps {
  children: React.ReactNode;
}

export const IntelligentLayout: React.FC<IntelligentLayoutProps> = ({ children }) => {
  const mobileDetection = useMobileDetection();
  const features = useFeatureDetection();

  return (
    <ForceMobileLayout>
      <ProgressiveEnhancement
        requireFeatures={['flexboxSupport']}
        enableAnimations={!mobileDetection.isMobile}
        loadHeavyContent={!mobileDetection.isMobile}
      >
        <div className={`
          intelligent-layout 
          ${mobileDetection.touchSupport ? 'touch-enabled' : 'no-touch'}
          ${features.hoverSupport ? 'hover-enabled' : 'no-hover'}
          ${mobileDetection.forceDesktopRequested ? 'force-desktop-requested' : ''}
        `}>
          {/* Mobile-specific header */}
          <MobileOnly>
            <header className="mobile-header">
              <h1>Mobile Experience</h1>
            </header>
          </MobileOnly>

          {/* Desktop-specific navigation */}
          <DesktopOnly>
            <nav className="desktop-nav">
              <div>Desktop Navigation</div>
            </nav>
          </DesktopOnly>

          {/* Responsive content with device-specific optimizations */}
          <ResponsiveRenderer
            mobile={
              <div className="mobile-optimized">
                {children}
              </div>
            }
            desktop={
              <div className="desktop-enhanced">
                {children}
              </div>
            }
            fallback={children}
          />

          {/* Debug info in development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="fixed bottom-4 left-4 bg-black/80 text-white p-2 rounded text-xs">
              <div>Device: {mobileDetection.deviceType}</div>
              <div>Touch: {mobileDetection.touchSupport ? 'Yes' : 'No'}</div>
              <div>Size: {mobileDetection.screenWidth}x{mobileDetection.screenHeight}</div>
              <div>Orientation: {mobileDetection.orientation}</div>
              <div>Force Desktop: {mobileDetection.forceDesktopRequested ? 'Yes' : 'No'}</div>
            </div>
          )}
        </div>
      </ProgressiveEnhancement>
    </ForceMobileLayout>
  );
};