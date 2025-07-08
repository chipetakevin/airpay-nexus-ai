
import React from 'react';
import { useLocation } from 'react-router-dom';
import HeaderLogo from './header/HeaderLogo';
import DesktopNavigation from './header/DesktopNavigation';
import MobileMenuButton from './header/MobileMenuButton';
import MobileMenuOverlay from './header/MobileMenuOverlay';
import HeaderActions from './header/HeaderActions';

interface HeaderProps {
  onQuickShopToggle?: () => void;
  isQuickShopOpen?: boolean;
}

const Header = ({ onQuickShopToggle, isQuickShopOpen }: HeaderProps) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const isHomePage = location.pathname === '/';

  const handleQuickShopClick = () => {
    // Redirect to WhatsApp Shopping Assistant page
    window.location.href = '/whatsapp-assistant';
  };

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside or pressing escape
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen) {
        const target = event.target as Element;
        if (!target.closest('[data-mobile-menu]')) {
          setIsMenuOpen(false);
        }
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="bg-[#75B8FA] sticky top-0 z-40 relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <HeaderLogo />

            {/* Desktop Navigation */}
            <DesktopNavigation 
              isHomePage={isHomePage}
              handleQuickShopClick={handleQuickShopClick}
            />

            {/* Header Actions - includes login/auth buttons */}
            <HeaderActions 
              isMenuOpen={isMenuOpen}
              toggleMenu={toggleMenu}
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenuOverlay 
        isMenuOpen={isMenuOpen}
        closeMenu={closeMenu}
        isHomePage={isHomePage}
        handleQuickShopClick={handleQuickShopClick}
      />
    </>
  );
};

export default Header;
