
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  LogOut, 
  ChevronDown, 
  Crown, 
  Shield,
  CreditCard,
  Home
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AdminNavigationDropdown from './navigation/AdminNavigationDropdown';
import SessionIndicator from './auth/SessionIndicator';
import { usePersistentAuth } from '@/hooks/usePersistentAuth';

interface PortalHeaderProps {
  userType: 'customer' | 'vendor' | 'admin' | null;
  resetUserType: () => void;
}

const PortalHeader: React.FC<PortalHeaderProps> = ({ userType, resetUserType }) => {
  const { toast } = useToast();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const { clearSession } = usePersistentAuth();

  useEffect(() => {
    // Check for admin authentication
    const adminAuth = localStorage.getItem('adminAuthenticated');
    const credentials = localStorage.getItem('userCredentials');
    
    if (adminAuth === 'true') {
      setIsAdminAuthenticated(true);
    }

    // Get current user data
    const authFlag = localStorage.getItem('userAuthenticated');
    if (authFlag === 'true' && credentials) {
      try {
        const userCreds = JSON.parse(credentials);
        let userData = null;
        
        if (userCreds.userType === 'customer') {
          userData = localStorage.getItem('onecardUser');
        } else if (userCreds.userType === 'vendor') {
          userData = localStorage.getItem('onecardVendor');
        } else if (userCreds.userType === 'admin') {
          userData = localStorage.getItem('onecardAdmin');
        }
        
        if (userData) {
          const parsedData = JSON.parse(userData);
          setCurrentUser({
            ...parsedData,
            userType: userCreds.userType,
            isUnifiedProfile: userCreds.password === 'Malawi@1976'
          });
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

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
      case 'customer': return 'bg-white text-[#6FB7FF]';
      case 'vendor': return 'bg-white text-[#6FB7FF]';
      case 'admin': return 'bg-white text-[#6FB7FF]';
      default: return 'bg-white text-[#6FB7FF]';
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

  return (
    <div className="bg-[#6FB7FF] mx-1 rounded-lg">
      <div className="px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto gap-2 sm:gap-3">
          {/* Left Section - Enhanced Logo, Badge and Home */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <img 
                src="/lovable-uploads/9ca7fcec-0caf-4b50-9334-e7172bc98733.png" 
                alt="Divine Mobile Logo"
                className="h-10 sm:h-12 w-auto object-contain flex-shrink-0 filter brightness-110 contrast-110 saturate-110"
              />
              <div className="flex flex-col min-w-0">
                {currentUser?.isUnifiedProfile && (
                  <Badge className="bg-white text-[#6FB7FF] text-xs px-2 py-1 rounded-full flex items-center justify-center mb-1 whitespace-nowrap">
                    <span className="mr-1">🌟</span>
                    <span className="font-medium">Unified</span>
                  </Badge>
                )}
                <div className="hidden sm:block">
                  <SessionIndicator />
                </div>
              </div>
            </div>

            {/* Enhanced Home Button */}
            <Link to="/">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 h-8 sm:h-9 border-white bg-white text-[#6FB7FF] hover:bg-white/90 transition-all duration-200 font-medium"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline font-medium">Home</span>
              </Button>
            </Link>
          </div>

          {/* Center - Enhanced Admin Navigation */}
          <div className="flex-1 flex justify-center px-2 max-w-[220px] sm:max-w-none">
            <AdminNavigationDropdown isAdminAuthenticated={isAdminAuthenticated} />
          </div>

          {/* Right Section - Enhanced User Menu */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {currentUser && (
              <div className="relative">
                <Button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 h-8 sm:h-9 border-white bg-white text-[#6FB7FF] hover:bg-white/90 transition-all duration-200 font-medium"
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
                      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[#6FB7FF]/20">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#6FB7FF] rounded-lg flex items-center justify-center">
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
                        <div className="text-sm text-gray-600 mb-3 p-3 bg-[#6FB7FF]/10 rounded-lg">
                          <span className="font-medium">Card:</span> ****{currentUser.cardNumber.slice(-4)}
                        </div>
                      )}
                      
                      {currentUser.isUnifiedProfile && (
                        <Badge className="bg-white text-[#6FB7FF] text-sm mb-3 px-3 py-2 w-full justify-center">
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
            )}

            {!currentUser && (
              <Button
                onClick={() => window.location.href = '/portal?tab=registration'}
                size="sm"
                className="bg-white text-[#6FB7FF] hover:bg-white/90 px-4 sm:px-5 py-2 sm:py-2.5 h-8 sm:h-9 font-semibold transition-all duration-200"
              >
                <span className="hidden xs:inline">Get Started</span>
                <span className="xs:hidden">Start</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Overlay to close user menu when clicking outside */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </div>
  );
};

export default PortalHeader;
