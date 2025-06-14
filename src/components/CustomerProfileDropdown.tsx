
import React from 'react';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { DisabledProfileCard } from './profile/DisabledProfileCard';

const CustomerProfileDropdown = () => {
  const { currentUser, isAuthenticated } = useMobileAuth();

  if (!isAuthenticated || !currentUser) {
    return null;
  }

  return (
    <div className="relative">
      <DisabledProfileCard user={currentUser} />
    </div>
  );
};

export default CustomerProfileDropdown;
