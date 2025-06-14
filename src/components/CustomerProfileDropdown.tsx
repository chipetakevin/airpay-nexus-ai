
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

  if (!isAuthenticated || !currentUser) {
    return null;
  }

  return (
    <div className="relative">
      {isProfileEnabled ? (
        <EnabledProfileCard user={currentUser} />
      ) : (
        <DisabledProfileCard user={currentUser} onEnable={handleEnableProfile} />
      )}
    </div>
  );
};

export default CustomerProfileDropdown;
