import React, { Suspense, lazy } from 'react';
import { useFeatureDetection } from '@/hooks/useFeatureDetection';
import { useMobileDetection } from '@/hooks/useMobileDetection';

interface ProgressiveEnhancementProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireFeatures?: Array<keyof ReturnType<typeof useFeatureDetection>>;
  loadHeavyContent?: boolean;
  enableAnimations?: boolean;
}

export const ProgressiveEnhancement: React.FC<ProgressiveEnhancementProps> = ({
  children,
  fallback,
  requireFeatures = [],
  loadHeavyContent = true,
  enableAnimations = true
}) => {
  const features = useFeatureDetection();
  const { isMobile, touchSupport } = useMobileDetection();

  // Check if all required features are supported
  const hasRequiredFeatures = requireFeatures.every(feature => features[feature]);

  // Disable animations if user prefers reduced motion or on low-end devices
  const shouldShowAnimations = enableAnimations && 
    !features.reducedMotionPreference && 
    (loadHeavyContent || !isMobile);

  // Don't load heavy content on mobile to save bandwidth/battery
  const shouldLoadHeavyContent = loadHeavyContent && (!isMobile || !touchSupport);

  if (!hasRequiredFeatures) {
    return <>{fallback || null}</>;
  }

  return (
    <div 
      className={`progressive-enhancement ${shouldShowAnimations ? 'animations-enabled' : 'animations-disabled'}`}
      data-heavy-content={shouldLoadHeavyContent}
      data-mobile={isMobile}
      data-touch={touchSupport}
    >
      {shouldLoadHeavyContent ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        children
      )}
    </div>
  );
};