
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CustomerProfileDropdown from '../CustomerProfileDropdown';
import LoginModal from '../auth/LoginModal';
import { useToast } from '@/hooks/use-toast';

interface MobileMenuAuthProps {
  isAuthenticated: boolean;
  toggleMenu: () => void;
}

const MobileMenuAuth = ({ isAuthenticated, toggleMenu }: MobileMenuAuthProps) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('userAuthenticated');
    
    toast({
      title: "Logged Out Successfully",
      description: "Your account information has been saved for future logins.",
      duration: 3000,
    });
    
    window.location.href = '/';
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="pb-2 border-b border-gray-200 sticky top-0 bg-white z-10">
          <CustomerProfileDropdown />
        </div>
      ) : (
        <div className="pb-2 border-b border-gray-200 space-y-1 sticky top-0 bg-white z-10">
          <Button
            onClick={() => {
              setShowLoginModal(true);
              toggleMenu();
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 min-h-[36px] text-xs"
          >
            <LogIn className="w-3 h-3 mr-1" />
            Customer Login
          </Button>
          <Link to="/portal?tab=registration" onClick={toggleMenu}>
            <Button
              variant="outline"
              className="w-full border-green-500 text-green-700 hover:bg-green-50 min-h-[36px] text-xs"
            >
              <UserPlus className="w-3 h-3 mr-1" />
              Register Free Account
            </Button>
          </Link>
        </div>
      )}

      {/* Logout Section - Always Visible if authenticated */}
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
            <span className="text-xs">Logout Account</span>
          </button>
          <p className="text-xs text-red-600 text-center mt-0.5 font-medium">
            Secure logout from your session
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
