
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import CustomerProfileDropdown from '../CustomerProfileDropdown';
import { useMobileAuth } from '@/hooks/useMobileAuth';

interface HeaderActionsProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const HeaderActions = ({ isMenuOpen, toggleMenu }: HeaderActionsProps) => {
  const { isAuthenticated } = useMobileAuth();

  return (
    <div className="flex items-center space-x-4">
      {/* Customer Profile Dropdown - Only show for authenticated users */}
      {isAuthenticated && (
        <div className="hidden md:block">
          <CustomerProfileDropdown />
        </div>
      )}

      {/* Portal Access Button */}
      <Link to="/portal?tab=onecard">
        <Button size="sm" className="hidden md:flex bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          Portal Access
        </Button>
      </Link>

      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMenu}
        className="md:hidden"
      >
        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
    </div>
  );
};

export default HeaderActions;
