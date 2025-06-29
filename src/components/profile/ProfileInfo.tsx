
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { AuthUser } from '@/hooks/useMobileAuth';

interface ProfileInfoProps {
  user: AuthUser;
}

export const ProfileInfo = ({ user }: ProfileInfoProps) => {
  return (
    <div className="text-left">
      <div className="font-semibold text-gray-600 text-sm">
        {user.firstName} {user.lastName}
      </div>
      <div className="flex items-center gap-2">
        <Badge className="bg-gray-200 text-gray-600 text-xs">
          <Star className="w-3 h-3 mr-1" />
          Profile Disabled
        </Badge>
      </div>
    </div>
  );
};
