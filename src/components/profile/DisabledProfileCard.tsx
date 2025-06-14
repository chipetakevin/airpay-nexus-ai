
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
        className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 shadow-sm opacity-90 cursor-pointer hover:opacity-100 transition-all duration-300 relative group w-full max-w-md"
        onClick={handleCardClick}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between w-full gap-3">
            {/* Left section with avatar and user info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
              </div>
              <div className="text-left min-w-0 flex-1">
                <div className="font-semibold text-gray-700 text-sm truncate">
                  {user.firstName} {user.lastName}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-gray-200 text-gray-600 text-xs border-gray-300 px-2 py-1">
                    Profile Disabled
                  </Badge>
                </div>
              </div>
            </div>
            
            {/* Right section with status and controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Badge className="bg-red-100 text-red-600 border-red-200 text-xs px-2 py-1">
                Disabled
              </Badge>
              <div className="flex items-center gap-1">
                <Unlock className="w-4 h-4 text-gray-500 group-hover:text-blue-500 transition-colors" />
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </CardContent>
        
        {/* Hover overlay with click hint */}
        <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
          <div className="text-xs text-blue-600 font-medium bg-white/90 px-3 py-2 rounded-md shadow-sm">
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
