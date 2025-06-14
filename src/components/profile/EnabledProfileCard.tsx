
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown } from 'lucide-react';
import { AuthUser } from '@/hooks/useMobileAuth';
import { ProfileEnableModal } from './ProfileEnableModal';

interface EnabledProfileCardProps {
  user: AuthUser;
  onDisable?: () => void;
}

export const EnabledProfileCard = ({ user, onDisable }: EnabledProfileCardProps) => {
  const [showEnableModal, setShowEnableModal] = useState(false);

  const handleCardClick = () => {
    onDisable?.();
  };

  const handleEnable = () => {
    localStorage.setItem('profileEnabled', 'true');
    setShowEnableModal(false);
  };

  return (
    <>
      <Card 
        className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer w-full max-w-md"
        onClick={handleCardClick}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between w-full gap-3">
            {/* Left section with avatar and user info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
              </div>
              <div className="text-left min-w-0 flex-1">
                <div className="font-semibold text-blue-800 text-sm truncate">
                  {user.firstName} {user.lastName}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-green-100 text-green-700 text-xs border-green-200 px-2 py-1">
                    Profile Active
                  </Badge>
                </div>
              </div>
            </div>
            
            {/* Right section with status and controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs px-2 py-1">
                Enabled
              </Badge>
              <ChevronDown className="w-4 h-4 text-blue-600" />
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
