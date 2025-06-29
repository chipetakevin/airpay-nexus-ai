
import React from 'react';
import { Menu, X } from 'lucide-react';

interface MobileMenuButtonProps {
  isMenuOpen: boolean;
  toggleMenu: (e: React.MouseEvent) => void;
}

const MobileMenuButton = ({ isMenuOpen, toggleMenu }: MobileMenuButtonProps) => {
  return (
    <button
      onClick={toggleMenu}
      data-mobile-menu="trigger"
      className="md:hidden p-3 rounded-lg hover:bg-white/20 transition-colors z-[100] relative touch-manipulation"
      aria-label="Toggle menu"
      type="button"
    >
      {isMenuOpen ? 
        <X className="w-6 h-6 text-white" /> : 
        <Menu className="w-6 h-6 text-white" />
      }
    </button>
  );
};

export default MobileMenuButton;
