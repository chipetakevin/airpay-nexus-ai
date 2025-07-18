
import { useState, useEffect } from 'react';
import { useMobileAuth } from './useMobileAuth';

interface AccessPermissions {
  canAccessDeals: boolean;
  canAccessOneCard: boolean;
  canAccessVendorPortal: boolean;
  canAccessAdminPortal: boolean;
  canAccessRegistration: boolean;
  canAccessUSSDManager: boolean;
  canAccessFieldWorkers: boolean;
  canAccessAPIToolkit: boolean;
}

export const useAccessControl = () => {
  const { currentUser, isAuthenticated } = useMobileAuth();
  const [permissions, setPermissions] = useState<AccessPermissions>({
    canAccessDeals: false,
    canAccessOneCard: false,
    canAccessVendorPortal: false,
    canAccessAdminPortal: false,
    canAccessRegistration: true,
    canAccessUSSDManager: false,
    canAccessFieldWorkers: false,
    canAccessAPIToolkit: false
  });

  useEffect(() => {
    if (!isAuthenticated || !currentUser) {
      // Unauthenticated users can only access registration
      setPermissions({
        canAccessDeals: false,
        canAccessOneCard: false,
        canAccessVendorPortal: false,
        canAccessAdminPortal: false,
        canAccessRegistration: true,
        canAccessUSSDManager: false,
        canAccessFieldWorkers: false,
        canAccessAPIToolkit: false
      });
      return;
    }

    // Set permissions based on user type
    const newPermissions: AccessPermissions = {
      canAccessDeals: true, // All authenticated users can access deals
      canAccessOneCard: true, // All authenticated users can access OneCard
      canAccessVendorPortal: currentUser.userType === 'vendor' || currentUser.userType === 'admin',
      canAccessAdminPortal: currentUser.userType === 'admin',
      canAccessRegistration: false, // Authenticated users don't need registration
      canAccessUSSDManager: currentUser.userType === 'admin',
      canAccessFieldWorkers: currentUser.userType === 'admin',
      canAccessAPIToolkit: currentUser.userType === 'admin'
    };

    setPermissions(newPermissions);
  }, [isAuthenticated, currentUser]);

  const checkTabAccess = (tabName: string): boolean => {
    switch (tabName) {
      case 'deals':
        return permissions.canAccessDeals;
      case 'onecard':
        return permissions.canAccessOneCard;
      case 'vendor':
      case 'vendor-registration':
        return permissions.canAccessVendorPortal;
      case 'admin':
      case 'admin-registration':
        return permissions.canAccessAdminPortal;
      case 'registration':
        return permissions.canAccessRegistration;
      case 'ussd-manager':
        return permissions.canAccessUSSDManager;
      case 'field-workers':
        return permissions.canAccessFieldWorkers;
      case 'api-toolkit':
        return permissions.canAccessAPIToolkit;
      default:
        return false;
    }
  };

  return {
    permissions,
    checkTabAccess,
    userType: currentUser?.userType,
    isAuthenticated
  };
};
