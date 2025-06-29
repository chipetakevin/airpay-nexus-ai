import React, { useState, useEffect } from 'react';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { useSessionManager } from '@/hooks/useSessionManager';
import { DisabledProfileCard } from './profile/DisabledProfileCard';
import { EnabledProfileCard } from './profile/EnabledProfileCard';
import { AdminProfileToggle } from './profile/AdminProfileToggle';
import SessionStatusIndicator from './session/SessionStatusIndicator';
import UnifiedProfileSwitcher from './profile/UnifiedProfileSwitcher';

const CustomerProfileDropdown = () => {
  const { currentUser, isAuthenticated } = useMobileAuth();
  const { sessionInfo } = useSessionManager();
  const [isProfileEnabled, setIsProfileEnabled] = useState(false);
  const [showAdminControls, setShowAdminControls] = useState(false);

  useEffect(() => {
    // Check if profile was previously enabled
    const profileStatus = localStorage.getItem('profileEnabled');
    if (profileStatus === 'true') {
      setIsProfileEnabled(true);
    }

    // Check if user is admin to show admin controls
    const credentials = localStorage.getItem('userCredentials');
    if (credentials) {
      try {
        const parsedCredentials = JSON.parse(credentials);
        if (parsedCredentials.userType === 'admin') {
          setShowAdminControls(true);
        }
      } catch (error) {
        console.error('Error parsing credentials:', error);
      }
    }
  }, []);

  const handleEnableProfile = () => {
    setIsProfileEnabled(true);
    localStorage.setItem('profileEnabled', 'true');
  };

  const handleDisableProfile = () => {
    setIsProfileEnabled(false);
    localStorage.setItem('profileEnabled', 'false');
  };

  const handleAdminToggle = (enabled: boolean) => {
    setIsProfileEnabled(enabled);
    localStorage.setItem('profileEnabled', enabled.toString());
  };

  if (!isAuthenticated || !currentUser) {
    return null;
  }

  // Check if this is Kevin Chipeta or admin user for session monitoring
  const isKevinOrAdmin = (
    (currentUser.firstName === 'Kevin' && currentUser.lastName === 'Chipeta') ||
    currentUser.userType === 'admin'
  );

  return (
    <div className="w-full px-3 py-2 space-y-3">
      {/* Session Status for Kevin and Admin users */}
      {isKevinOrAdmin && sessionInfo && (
        <SessionStatusIndicator />
      )}
      
      {/* Unified Profile Switcher */}
      <UnifiedProfileSwitcher />
      
      {isProfileEnabled ? (
        <EnabledProfileCard user={currentUser} onDisable={handleDisableProfile} />
      ) : (
        <DisabledProfileCard user={currentUser} onEnable={handleEnableProfile} />
      )}
      
      {showAdminControls && (
        <AdminProfileToggle 
          isEnabled={isProfileEnabled}
          onToggle={handleAdminToggle}
        />
      )}
    </div>
  );
};

export default CustomerProfileDropdown;
