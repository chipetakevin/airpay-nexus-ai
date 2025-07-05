import React, { useState, useEffect } from 'react';
import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import { usePermissions } from '@/hooks/usePermissions';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Lock } from 'lucide-react';

interface FeatureGuardProps {
  children: React.ReactNode;
  featureKey: string;
  contractorId?: string;
  fallback?: React.ReactNode;
  showFallback?: boolean;
  loadingComponent?: React.ReactNode;
}

const FeatureGuard: React.FC<FeatureGuardProps> = ({
  children,
  featureKey,
  contractorId,
  fallback,
  showFallback = true,
  loadingComponent
}) => {
  const { checkFeatureAccess } = useFeatureAccess();
  const { currentUser, hasRole } = usePermissions();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      setIsLoading(true);
      
      // Admins have access to all features
      if (hasRole(['admin', 'manager'])) {
        setHasAccess(true);
        setIsLoading(false);
        return;
      }

      // Check feature access for the contractor
      const userId = contractorId || currentUser?.id;
      if (userId) {
        const access = await checkFeatureAccess(userId, featureKey);
        setHasAccess(access);
      } else {
        setHasAccess(false);
      }
      
      setIsLoading(false);
    };

    checkAccess();
  }, [featureKey, contractorId, currentUser?.id, checkFeatureAccess, hasRole]);

  // Show loading state
  if (isLoading) {
    return loadingComponent || (
      <div className="flex items-center justify-center p-4">
        <div className="animate-pulse">Loading feature access...</div>
      </div>
    );
  }

  // Check if user has access
  if (hasAccess) {
    return <>{children}</>;
  }

  // No access - show fallback or nothing
  if (!showFallback) {
    return null;
  }

  return fallback || (
    <Alert className="border-muted">
      <Lock className="h-4 w-4" />
      <AlertDescription>
        This feature is not available for your account. Contact your administrator for access.
      </AlertDescription>
    </Alert>
  );
};

export default FeatureGuard;