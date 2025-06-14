
import React, { useState, useEffect } from 'react';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { DisabledProfileCard } from './profile/DisabledProfileCard';
import { EnabledProfileCard } from './profile/EnabledProfileCard';

const CustomerProfileDropdown = () => {
  const { currentUser, isAuthenticated } = useMobileAuth();
  const [isProfileEnabled, setIsProfileEnabled] = useState(false);

  useEffect(() => {
    // Check if profile was previously enabled
    const profileStatus = localStorage.getItem('profileEnabled');
    if (profileStatus === 'true') {
      setIsProfileEnabled(true);
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

  if (!isAuthenticated || !currentUser) {
    return null;
  }

  return (
    <div className="w-full px-3 py-2">
      {isProfileEnabled ? (
        <EnabledProfileCard user={currentUser} onDisable={handleDisableProfile} />
      ) : (
        <DisabledProfileCard user={currentUser} onEnable={handleEnableProfile} />
      )}
    </div>
  );
};

export default CustomerProfileDropdown;
