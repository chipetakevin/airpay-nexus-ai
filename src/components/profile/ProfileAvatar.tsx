
import React from 'react';
import { AuthUser } from '@/hooks/useMobileAuth';

interface ProfileAvatarProps {
  user: AuthUser;
}

export const ProfileAvatar = ({ user }: ProfileAvatarProps) => {
  return (
    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
      <img 
        src="/lovable-uploads/788fddcb-574c-4f1d-9c73-54cc003a95d1.png" 
        alt="Divine Mobile Logo"
        className="h-6 w-6 object-contain"
      />
    </div>
  );
};
