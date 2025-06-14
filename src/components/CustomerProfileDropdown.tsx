
import React, { useState, useEffect } from 'react';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { DisabledProfileCard } from './profile/DisabledProfileCard';
import { EnabledProfileCard } from './profile/EnabledProfileCard';
import { AdminProfileToggle } from './profile/AdminProfileToggle';

const CustomerProfileDropdown = () => {
  const { currentUser, isAuthenticated } = useMobileAuth();
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

  return (
    <div className="w-full px-3 py-2 space-y-3">
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
