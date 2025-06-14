
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
    // This will be called if user wants to enable again after clicking
    localStorage.setItem('profileEnabled', 'true');
    setShowEnableModal(false);
  };

  return (
    <>
      <Card 
        className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-300 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        onClick={handleCardClick}
      >
        <CardContent className="p-3">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
              </div>
              <div className="text-left">
                <div className="font-semibold text-blue-800 text-sm">
                  {user.firstName} {user.lastName}
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-700 text-xs border-green-300">
                    Profile Active
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-700 border-blue-300">
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
