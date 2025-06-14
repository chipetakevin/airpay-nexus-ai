
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown } from 'lucide-react';
import { AuthUser } from '@/hooks/useMobileAuth';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileInfo } from './ProfileInfo';

interface DisabledProfileCardProps {
  user: AuthUser;
}

export const DisabledProfileCard = ({ user }: DisabledProfileCardProps) => {
  return (
    <Card className="bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300 shadow-sm opacity-50 cursor-not-allowed">
      <CardContent className="p-3">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ProfileAvatar user={user} />
            <ProfileInfo user={user} />
          </div>
          
          <div className="flex items-center gap-2">
            <Badge className="bg-gray-200 text-gray-600">
              Disabled
            </Badge>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
