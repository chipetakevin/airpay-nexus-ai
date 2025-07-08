import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus, LogOut, User, Store, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CustomerProfileDropdown from '../CustomerProfileDropdown';
import LoginModal from '../auth/LoginModal';
import { useToast } from '@/hooks/use-toast';
import { useMobileAuth } from '@/hooks/useMobileAuth';

interface MobileMenuAuthProps {
  isAuthenticated: boolean;
  toggleMenu: () => void;
}

const MobileMenuAuth = ({ isAuthenticated, toggleMenu }: MobileMenuAuthProps) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { toast } = useToast();
  const { currentUser } = useMobileAuth();

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem('userAuthenticated');
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('userCredentials');
    localStorage.removeItem('sessionStartTime');
    
    // Clear all user data but keep it permanently saved
    const userData = {
      customer: localStorage.getItem('onecardUser'),
      vendor: localStorage.getItem('onecardVendor'),
      admin: localStorage.getItem('onecardAdmin')
    };
    
    toast({
      title: "🔐 Logged Out Successfully",
      description: "Your profile information remains permanently saved for quick re-login.",
      duration: 3000,
    });
    
    // Redirect to home
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="pb-2 border-b border-gray-200 sticky top-0 bg-white z-10">
          <CustomerProfileDropdown />
          
          {/* User Type Indicator */}
          <div className="mt-2 p-2 bg-green-50 rounded-md">
            <div className="flex items-center gap-2">
              {currentUser?.userType === 'customer' && <User className="w-3 h-3 text-green-600" />}
              {currentUser?.userType === 'vendor' && <Store className="w-3 h-3 text-blue-600" />}
              {currentUser?.userType === 'admin' && <Shield className="w-3 h-3 text-purple-600" />}
              <span className="text-xs font-medium text-gray-700">
                Logged in as {currentUser?.userType?.toUpperCase()} 
                {currentUser?.firstName && ` - ${currentUser.firstName}`}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Registration Section - Prominent placement */}
          <div className="pb-2 border-b border-gray-200 space-y-1 sticky top-0 bg-white z-10">
            <div className="text-xs font-semibold text-gray-800 mb-2 text-center">
              🚨 Registration Required for All Services
            </div>
            
            {/* Customer Registration */}
            <Link to="/portal?tab=registration" onClick={toggleMenu}>
              <Button
                variant="outline"
                className="w-full border-green-500 text-green-700 hover:bg-green-50 min-h-[36px] text-xs"
              >
                <User className="w-3 h-3 mr-1" />
                Customer Registration
              </Button>
            </Link>

            {/* Vendor Registration */}
            <Link to="/portal?tab=vendor-registration" onClick={toggleMenu}>
              <Button
                variant="outline"
                className="w-full border-blue-500 text-blue-700 hover:bg-blue-50 min-h-[36px] text-xs"
              >
                <Store className="w-3 h-3 mr-1" />
                Vendor Registration
              </Button>
            </Link>

            {/* Admin Registration */}
            <Link to="/portal?tab=admin-registration" onClick={toggleMenu}>
              <Button
                variant="outline"
                className="w-full border-purple-500 text-purple-700 hover:bg-purple-50 min-h-[36px] text-xs"
              >
                <Shield className="w-3 h-3 mr-1" />
                Admin Registration
              </Button>
            </Link>

            {/* Login Button */}
            <Link to="/rica-registration" onClick={toggleMenu}>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 min-h-[36px] text-xs mt-2"
              >
                <LogIn className="w-3 h-3 mr-1" />
                Login (Existing Users)
              </Button>
            </Link>
          </div>
        </>
      )}

      {/* Logout Section - Only visible when authenticated */}
      {isAuthenticated && (
        <div className="mt-2 pt-2 border-t-2 border-red-100 bg-red-50/50 rounded-md p-2 sticky bottom-0 bg-white/95 backdrop-blur-sm">
          <button 
            onClick={() => {
              handleLogout();
              toggleMenu();
            }}
            className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white p-2.5 rounded-md transition-all duration-200 min-h-[36px] font-semibold shadow-lg touch-manipulation transform active:scale-95"
          >
            <LogOut className="w-3 h-3 flex-shrink-0" />
            <span className="text-xs">Secure Logout</span>
          </button>
          <p className="text-xs text-red-600 text-center mt-0.5 font-medium">
            Profile permanently saved for re-login
          </p>
        </div>
      )}

      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default MobileMenuAuth;
