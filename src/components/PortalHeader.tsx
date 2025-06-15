
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  LogOut, 
  ChevronDown, 
  Crown, 
  Shield,
  CreditCard
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AdminNavigationDropdown from './navigation/AdminNavigationDropdown';

interface PortalHeaderProps {
  userType: 'customer' | 'vendor' | 'admin' | null;
  resetUserType: () => void;
}

const PortalHeader: React.FC<PortalHeaderProps> = ({ userType, resetUserType }) => {
  const { toast } = useToast();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

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
    localStorage.removeItem('userAuthenticated');
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('onecardUser');
    localStorage.removeItem('onecardVendor');
    localStorage.removeItem('onecardAdmin');
    localStorage.removeItem('userCredentials');
    sessionStorage.clear();
    
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
      case 'customer': return <User className="w-4 h-4" />;
      case 'vendor': return <CreditCard className="w-4 h-4" />;
      case 'admin': return <Shield className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Crown className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Divinely Mobile Portal</h1>
            {currentUser?.isUnifiedProfile && (
              <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs">
                🌟 Unified Access
              </Badge>
            )}
          </div>
        </div>

        {/* Center - Admin Navigation Dropdown with better spacing */}
        <div className="flex-1 flex justify-center px-6">
          <AdminNavigationDropdown isAdminAuthenticated={isAdminAuthenticated} />
        </div>

        {/* User Menu with improved spacing */}
        <div className="flex items-center gap-4 pr-2">
          {currentUser && (
            <div className="relative">
              <Button
                onClick={() => setShowUserMenu(!showUserMenu)}
                variant="outline"
                className="flex items-center gap-2 mr-2"
              >
                {getUserTypeIcon(currentUser.userType)}
                <span className="hidden sm:inline">
                  {currentUser.firstName} {currentUser.lastName}
                </span>
                <Badge className={getUserTypeColor(currentUser.userType)}>
                  {currentUser.userType}
                </Badge>
                <ChevronDown className="w-4 h-4" />
              </Button>

              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      {getUserTypeIcon(currentUser.userType)}
                      <div>
                        <div className="font-medium text-gray-800">
                          {currentUser.firstName} {currentUser.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{currentUser.email}</div>
                      </div>
                    </div>
                    
                    {currentUser.cardNumber && (
                      <div className="text-sm text-gray-600 mb-2">
                        Card: ****{currentUser.cardNumber.slice(-4)}
                      </div>
                    )}
                    
                    {currentUser.isUnifiedProfile && (
                      <Badge className="bg-orange-100 text-orange-800 text-xs mb-3">
                        🌟 Full Access Profile
                      </Badge>
                    )}
                    
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="w-full flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {!currentUser && (
            <Button
              onClick={() => window.location.href = '/portal?tab=registration'}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white mr-2"
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
