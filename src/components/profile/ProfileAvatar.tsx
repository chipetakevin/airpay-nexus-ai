
import React from 'react';
import { AuthUser } from '@/hooks/useMobileAuth';

interface ProfileAvatarProps {
  user: AuthUser;
}

export const ProfileAvatar = ({ user }: ProfileAvatarProps) => {
  return (
    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
      <img 
        src="/lovable-uploads/5ef6be83-8590-459d-942d-7a0539064226.png" 
        alt="Divine Mobile Crown Logo"
        className="h-6 w-6 object-contain"
      />
    </div>
  );
};
