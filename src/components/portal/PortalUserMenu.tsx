
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  LogOut, 
  ChevronDown, 
  Shield,
  CreditCard
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePersistentAuth } from '@/hooks/usePersistentAuth';

interface PortalUserMenuProps {
  currentUser: any;
  resetUserType: () => void;
}

const PortalUserMenu = ({ currentUser, resetUserType }: PortalUserMenuProps) => {
  const { toast } = useToast();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { clearSession } = usePersistentAuth();

  const handleLogout = () => {
    clearSession();
    
    toast({
      title: "Logged Out Successfully",
      description: "You have been securely logged out from all accounts.",
    });
    
    resetUserType();
    window.location.href = '/';
  };

  const getUserTypeColor = (type: string) => {
    switch (type) {
      case 'customer': return 'bg-white text-[#75B8FA]';
      case 'vendor': return 'bg-white text-[#75B8FA]';
      case 'admin': return 'bg-white text-[#75B8FA]';
      default: return 'bg-white text-[#75B8FA]';
    }
  };

  const getUserTypeIcon = (type: string) => {
    switch (type) {
      case 'customer': return <User className="w-3 h-3" />;
      case 'vendor': return <CreditCard className="w-3 h-3" />;
      case 'admin': return <Shield className="w-3 h-3" />;
      default: return <User className="w-3 h-3" />;
    }
  };

  if (!currentUser) {
    return (
      <Button
        onClick={() => window.location.href = '/portal?tab=registration'}
        size="sm"
        className="bg-white text-[#75B8FA] hover:bg-white/90 px-4 sm:px-5 py-2 sm:py-2.5 h-8 sm:h-9 font-semibold transition-all duration-200"
      >
        <span className="hidden xs:inline">Get Started</span>
        <span className="xs:hidden">Start</span>
      </Button>
    );
  }

  return (
    <>
      <div className="relative">
        <Button
          onClick={() => setShowUserMenu(!showUserMenu)}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 h-8 sm:h-9 border-white bg-white text-[#75B8FA] hover:bg-white/90 transition-all duration-200 font-medium"
        >
          {getUserTypeIcon(currentUser.userType)}
          <span className="hidden xs:inline font-medium max-w-16 truncate">
            {currentUser.firstName}
          </span>
          <Badge className={`${getUserTypeColor(currentUser.userType)} text-xs px-2 py-1`}>
            {currentUser.userType.charAt(0).toUpperCase()}
          </Badge>
          <ChevronDown className="w-3 h-3" />
        </Button>

        {showUserMenu && (
          <div className="absolute right-0 top-full mt-2 w-64 sm:w-72 bg-white rounded-lg shadow-xl z-50 overflow-hidden">
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[#75B8FA]/20">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#75B8FA] rounded-lg flex items-center justify-center">
                  {getUserTypeIcon(currentUser.userType)}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-gray-800 sm:text-base truncate">
                    {currentUser.firstName} {currentUser.lastName}
                  </div>
                  <div className="text-sm text-gray-500 truncate">{currentUser.email}</div>
                </div>
              </div>
              
              {currentUser.cardNumber && (
                <div className="text-sm text-gray-600 mb-3 p-3 bg-[#75B8FA]/10 rounded-lg">
                  <span className="font-medium">Card:</span> ****{currentUser.cardNumber.slice(-4)}
                </div>
              )}
              
              {currentUser.isUnifiedProfile && (
                <Badge className="bg-white text-[#75B8FA] text-sm mb-3 px-3 py-2 w-full justify-center">
                  🌟 Full Access
                </Badge>
              )}
              
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="w-full flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 h-9"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Logout</span>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Overlay to close user menu when clicking outside */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </>
  );
};

export default PortalUserMenu;
