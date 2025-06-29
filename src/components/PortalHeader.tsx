
import React, { useState, useEffect } from 'react';
import { usePersistentAuth } from '@/hooks/usePersistentAuth';
import AdminNavigationDropdown from './navigation/AdminNavigationDropdown';
import PortalLogo from './portal/PortalLogo';
import PortalUserMenu from './portal/PortalUserMenu';

interface PortalHeaderProps {
  userType: 'customer' | 'vendor' | 'admin' | null;
  resetUserType: () => void;
}

const PortalHeader: React.FC<PortalHeaderProps> = ({ userType, resetUserType }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isUnifiedProfile, setIsUnifiedProfile] = useState(false);
  const { clearSession } = usePersistentAuth();

  useEffect(() => {
    // Check for admin authentication
    const adminAuth = localStorage.getItem('adminAuthenticated');
    const credentials = localStorage.getItem('userCredentials');
    
    if (adminAuth === 'true') {
      setIsAdminAuthenticated(true);
    }

    // Get current user data
    const authFlag = localStorage.getItem('userAuthenticated');
    if (authFlag === 'true' && credentials) {
      try {
        const userCreds = JSON.parse(credentials);
        let userData = null;
        
        if (userCreds.userType === 'customer') {
          userData = localStorage.getItem('onecardUser');
        } else if (userCreds.userType === 'vendor') {
          userData = localStorage.getItem('onecardVendor');
        } else if (userCreds.userType === 'admin') {
          userData = localStorage.getItem('onecardAdmin');
        }
        
        if (userData) {
          const parsedData = JSON.parse(userData);
          const isUnified = userCreds.password === 'Malawi@1976';
          setIsUnifiedProfile(isUnified);
          setCurrentUser({
            ...parsedData,
            userType: userCreds.userType,
            isUnifiedProfile: isUnified
          });
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  return (
    <div className="bg-[#75B8FA] mx-1 rounded-lg">
      <div className="px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto gap-2 sm:gap-3">
          {/* Left Section - Logo and Home */}
          <PortalLogo isUnifiedProfile={isUnifiedProfile} />

          {/* Center - Admin Navigation */}
          <div className="flex-1 flex justify-center px-2 max-w-[220px] sm:max-w-none">
            <AdminNavigationDropdown isAdminAuthenticated={isAdminAuthenticated} />
          </div>

          {/* Right Section - User Menu */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <PortalUserMenu currentUser={currentUser} resetUserType={resetUserType} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalHeader;
