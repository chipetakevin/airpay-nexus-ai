
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, User, LogIn } from 'lucide-react';
import CustomerProfileDropdown from '../CustomerProfileDropdown';
import LoginModal from '../auth/LoginModal';
import { useMobileAuth } from '@/hooks/useMobileAuth';

interface HeaderActionsProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const HeaderActions = ({ isMenuOpen, toggleMenu }: HeaderActionsProps) => {
  const { isAuthenticated } = useMobileAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <div className="flex items-center space-x-4">
        {/* Desktop Customer Profile or Login */}
        <div className="hidden md:block">
          {isAuthenticated ? (
            <CustomerProfileDropdown />
          ) : (
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setShowLoginModal(true)}
                variant="outline"
                size="sm"
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Customer Login
              </Button>
              <Link to="/portal?tab=registration">
                <Badge className="bg-green-600 text-white hover:bg-green-700 cursor-pointer px-3 py-1">
                  Register Free
                </Badge>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMenu}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default HeaderActions;
