
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
    <div className="bg-white border-b border-blue-100 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left Section - Logo and Status */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div className="flex flex-col items-start gap-2">
              {currentUser?.isUnifiedProfile && (
                <Badge className="bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full flex items-center justify-center shadow-md">
                  <span className="mr-1">🌟</span>
                  <span className="font-medium">Unified Access</span>
                </Badge>
              )}
              <SessionIndicator />
            </div>
          </div>

          {/* Home Button - Well spaced */}
          <Link to="/" className="ml-4">
            <Button
              variant="outline"
              className="flex items-center gap-3 px-4 py-2 h-10 text-sm border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Home</span>
            </Button>
          </Link>
        </div>

        {/* Center - Admin Navigation */}
        <div className="flex-1 flex justify-center px-8">
          <AdminNavigationDropdown isAdminAuthenticated={isAdminAuthenticated} />
        </div>

        {/* Right Section - User Menu and Get Started */}
        <div className="flex items-center gap-6">
          {currentUser && (
            <div className="relative">
              <Button
                onClick={() => setShowUserMenu(!showUserMenu)}
                variant="outline"
                className="flex items-center gap-3 px-4 py-2 h-10 text-sm border-blue-300 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 shadow-sm"
              >
                {getUserTypeIcon(currentUser.userType)}
                <span className="hidden sm:inline text-sm font-medium max-w-20 truncate">
                  {currentUser.firstName}
                </span>
                <Badge className={`${getUserTypeColor(currentUser.userType)} text-xs px-2 py-1 shadow-sm`}>
                  {currentUser.userType}
                </Badge>
                <ChevronDown className="w-4 h-4" />
              </Button>

              {showUserMenu && (
                <div className="absolute right-0 top-full mt-3 w-72 bg-white border border-blue-200 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        {getUserTypeIcon(currentUser.userType)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 text-base">
                          {currentUser.firstName} {currentUser.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{currentUser.email}</div>
                      </div>
                    </div>
                    
                    {currentUser.cardNumber && (
                      <div className="text-sm text-gray-600 mb-3 p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Card:</span> ****{currentUser.cardNumber.slice(-4)}
                      </div>
                    )}
                    
                    {currentUser.isUnifiedProfile && (
                      <Badge className="bg-orange-100 text-orange-800 text-sm mb-4 px-3 py-2 w-full justify-center">
                        🌟 Full Access Profile
                      </Badge>
                    )}
                    
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="w-full flex items-center gap-3 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 h-10"
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
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 h-10 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Get Started
            </Button>
          )}
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
