
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Unlock } from 'lucide-react';
import { AuthUser } from '@/hooks/useMobileAuth';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileInfo } from './ProfileInfo';
import { ProfileEnableModal } from './ProfileEnableModal';

interface DisabledProfileCardProps {
  user: AuthUser;
  onEnable?: () => void;
}

export const DisabledProfileCard = ({ user, onEnable }: DisabledProfileCardProps) => {
  const [showEnableModal, setShowEnableModal] = useState(false);

  const handleEnable = () => {
    onEnable?.();
  };

  const handleCardClick = () => {
    setShowEnableModal(true);
  };

  return (
    <>
      <Card 
        className="bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300 shadow-sm opacity-75 cursor-pointer hover:opacity-90 transition-opacity relative group"
        onClick={handleCardClick}
      >
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
              <div className="flex items-center gap-1">
                <Unlock className="w-3 h-3 text-gray-500 group-hover:text-blue-500 transition-colors" />
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </CardContent>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
          <div className="text-xs text-blue-600 font-medium bg-white/80 px-2 py-1 rounded">
            Click to enable
          </div>
        </div>
      </Card>

      <ProfileEnableModal
        isOpen={showEnableModal}
        onClose={() => setShowEnableModal(false)}
        onEnable={handleEnable}
      />
    </>
  );
};
