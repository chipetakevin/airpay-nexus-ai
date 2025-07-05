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
        <div className="intelligent-layout">
          {/* Responsive content */}
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
        </div>
      </ProgressiveEnhancement>
    </ForceMobileLayout>
  );
};