import React from 'react';
import { useRoleBasedAccess, UserRole } from '@/hooks/useRoleBasedAccess';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Lock } from 'lucide-react';

interface RoleBasedAccessGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  requiresAdmin?: boolean;
  requiresVendor?: boolean;
  requiresCustomer?: boolean;
  requiresAuth?: boolean;
  fallback?: React.ReactNode;
  showAccessDenied?: boolean;
}

export const RoleBasedAccessGuard = ({
  children,
  requiredRole,
  requiresAdmin = false,
  requiresVendor = false,
  requiresCustomer = false,
  requiresAuth = false,
  fallback,
  showAccessDenied = true
}: RoleBasedAccessGuardProps) => {
  const { user, permissions, loading } = useRoleBasedAccess();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-blue-600">Checking permissions...</span>
      </div>
    );
  }

  // Check if authentication is required and user is not authenticated
  if (requiresAuth && !user) {
    if (fallback) return <>{fallback}</>;
    if (!showAccessDenied) return null;
    
    return (
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4 flex items-center gap-3">
          <Lock className="w-5 h-5 text-yellow-600" />
          <div>
            <p className="font-medium text-yellow-800">Authentication Required</p>
            <p className="text-sm text-yellow-600">Please log in to access this feature.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Check specific role requirements
  const hasAccess = 
    (!requiredRole || permissions.role === requiredRole) &&
    (!requiresAdmin || permissions.isAdmin) &&
    (!requiresVendor || permissions.isVendor || permissions.isAdmin) &&
    (!requiresCustomer || permissions.isCustomer || permissions.isVendor || permissions.isAdmin);

  if (!hasAccess) {
    if (fallback) return <>{fallback}</>;
    if (!showAccessDenied) return null;
    
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4 flex items-center gap-3">
          <Shield className="w-5 h-5 text-red-600" />
          <div>
            <p className="font-medium text-red-800">Access Restricted</p>
            <p className="text-sm text-red-600">
              {requiredRole 
                ? `This feature requires ${requiredRole} privileges.`
                : 'You do not have permission to access this feature.'
              }
            </p>
            <p className="text-xs text-red-500 mt-1">
              Current role: {permissions.role || 'Guest'}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
};