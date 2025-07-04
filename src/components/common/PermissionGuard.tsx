import React from 'react';
import { usePermissions, ResourceType, PermissionType, UserRole } from '@/hooks/usePermissions';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

interface PermissionGuardProps {
  children: React.ReactNode;
  resourceType?: ResourceType;
  permissionType?: PermissionType;
  resourceId?: string;
  requiredRole?: UserRole | UserRole[];
  fallback?: React.ReactNode;
  showFallback?: boolean;
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({
  children,
  resourceType,
  permissionType,
  resourceId,
  requiredRole,
  fallback,
  showFallback = true
}) => {
  const { hasPermission, hasRole, isLoading } = usePermissions();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-pulse">Loading permissions...</div>
      </div>
    );
  }

  // Check role-based permission
  if (requiredRole) {
    if (!hasRole(requiredRole)) {
      if (!showFallback) return null;
      
      return fallback || (
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            You don't have the required role to access this content.
          </AlertDescription>
        </Alert>
      );
    }
  }

  // Check resource-based permission
  if (resourceType && permissionType) {
    if (!hasPermission(resourceType, permissionType, resourceId)) {
      if (!showFallback) return null;
      
      return fallback || (
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            You don't have permission to {permissionType} {resourceType}.
          </AlertDescription>
        </Alert>
      );
    }
  }

  // If all checks pass, render children
  return <>{children}</>;
};

export default PermissionGuard;