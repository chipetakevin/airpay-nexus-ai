
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Unlock } from 'lucide-react';
import { AuthUser } from '@/hooks/useMobileAuth';
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
        className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer relative group w-full max-w-sm mx-auto"
        onClick={handleCardClick}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between w-full gap-3">
            {/* Avatar and user info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
              </div>
              <div className="text-left min-w-0 flex-1">
                <div className="font-medium text-gray-700 text-base truncate leading-tight mb-2">
                  {user.firstName} {user.lastName}
                </div>
                <div>
                  <Badge className="bg-gray-200 text-gray-600 text-xs border-gray-300 px-2 py-1 font-medium">
                    Disabled
                  </Badge>
                </div>
              </div>
            </div>
            
            {/* Status and controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="flex items-center gap-1">
                <Unlock className="w-4 h-4 text-gray-500 group-hover:text-blue-500 transition-colors" />
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Click to enable text positioned at bottom */}
          <div className="mt-3 pt-2 border-t border-gray-200/50 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="text-[10px] text-blue-600 font-medium text-center">
              Click to enable
            </div>
          </div>
        </CardContent>
      </Card>

      <ProfileEnableModal
        isOpen={showEnableModal}
        onClose={() => setShowEnableModal(false)}
        onEnable={handleEnable}
      />
    </>
  );
};
