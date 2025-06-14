
import React from 'react';
import { AuthUser } from '@/hooks/useMobileAuth';

interface ProfileAvatarProps {
  user: AuthUser;
}

export const ProfileAvatar = ({ user }: ProfileAvatarProps) => {
  return (
    <div className="w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white font-bold">
      {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
    </div>
  );
};
