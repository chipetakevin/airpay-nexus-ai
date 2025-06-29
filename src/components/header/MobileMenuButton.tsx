
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
      className="md:hidden p-3 rounded-xl hover:bg-white/20 transition-all duration-200 z-[100] relative touch-manipulation bg-white/10 backdrop-blur-sm border border-white/20"
      aria-label="Toggle menu"
      type="button"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        {isMenuOpen ? 
          <X className="w-5 h-5 text-white transition-transform duration-200 rotate-0" /> : 
          <Menu className="w-5 h-5 text-white transition-transform duration-200" />
        }
      </div>
    </button>
  );
};

export default MobileMenuButton;
