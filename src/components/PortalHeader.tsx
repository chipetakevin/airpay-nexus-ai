
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
      case 'customer': return 'bg-green-100 text-green-800';
      case 'vendor': return 'bg-blue-100 text-blue-800';
      case 'admin': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
    <div className="bg-white border-b border-blue-100 shadow-sm mx-1 rounded-lg">
      <div className="px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto gap-1 sm:gap-2">
          {/* Left Section - Logo, Badge and Home */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 min-w-0">
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="flex flex-col min-w-0">
                {currentUser?.isUnifiedProfile && (
                  <Badge className="bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full flex items-center justify-center shadow-md mb-0.5 whitespace-nowrap">
                    <span className="mr-1">🌟</span>
                    <span className="font-medium text-xs">Unified</span>
                  </Badge>
                )}
                <div className="hidden sm:block">
                  <SessionIndicator />
                </div>
              </div>
            </div>

            {/* Compact Home Button */}
            <Link to="/">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 px-1.5 sm:px-2 py-1 sm:py-1.5 h-6 sm:h-7 text-xs border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm"
              >
                <Home className="w-3 h-3" />
                <span className="hidden sm:inline font-medium text-xs">Home</span>
              </Button>
            </Link>
          </div>

          {/* Center - Compact Admin Navigation */}
          <div className="flex-1 flex justify-center px-1 max-w-[180px] sm:max-w-none">
            <AdminNavigationDropdown isAdminAuthenticated={isAdminAuthenticated} />
          </div>

          {/* Right Section - Compact User Menu */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {currentUser && (
              <div className="relative">
                <Button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 px-1.5 sm:px-2 py-1 sm:py-1.5 h-6 sm:h-7 text-xs border-blue-300 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 shadow-sm"
                >
                  {getUserTypeIcon(currentUser.userType)}
                  <span className="hidden xs:inline text-xs font-medium max-w-12 truncate">
                    {currentUser.firstName}
                  </span>
                  <Badge className={`${getUserTypeColor(currentUser.userType)} text-xs px-1 py-0.5 shadow-sm`}>
                    {currentUser.userType.charAt(0).toUpperCase()}
                  </Badge>
                  <ChevronDown className="w-2.5 h-2.5" />
                </Button>

                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-1 w-56 sm:w-64 bg-white border border-blue-200 rounded-lg shadow-xl z-50 overflow-hidden">
                    <div className="p-3 sm:p-4">
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          {getUserTypeIcon(currentUser.userType)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-800 text-xs sm:text-sm truncate">
                            {currentUser.firstName} {currentUser.lastName}
                          </div>
                          <div className="text-xs text-gray-500 truncate">{currentUser.email}</div>
                        </div>
                      </div>
                      
                      {currentUser.cardNumber && (
                        <div className="text-xs text-gray-600 mb-2 p-2 bg-gray-50 rounded-lg">
                          <span className="font-medium">Card:</span> ****{currentUser.cardNumber.slice(-4)}
                        </div>
                      )}
                      
                      {currentUser.isUnifiedProfile && (
                        <Badge className="bg-orange-100 text-orange-800 text-xs mb-2 px-2 py-1 w-full justify-center">
                          🌟 Full Access
                        </Badge>
                      )}
                      
                      <Button
                        onClick={handleLogout}
                        variant="outline"
                        size="sm"
                        className="w-full flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 h-7 text-xs"
                      >
                        <LogOut className="w-3 h-3" />
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
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-2 sm:px-3 py-1 sm:py-1.5 h-6 sm:h-7 text-xs font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <span className="hidden xs:inline">Start</span>
                <span className="xs:hidden">Go</span>
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
