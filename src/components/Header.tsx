
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, Crown, Star, ShoppingCart,
  Menu, X, Zap, CreditCard
} from 'lucide-react';
import HeaderLogo from './header/HeaderLogo';

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

  const navigationItems = [
    { 
      path: '/', 
      label: 'Home', 
      icon: <Crown className="w-4 h-4" /> 
    },
    { 
      path: '/deals', 
      label: 'Deals Hub', 
      icon: <ShoppingCart className="w-4 h-4" />,
      badge: 'USSD'
    },
    { 
      path: '/whatsapp-assistant', 
      label: 'WhatsApp Shopping', 
      icon: <MessageCircle className="w-4 h-4" />,
      badge: 'AI'
    },
    { 
      path: '/portal', 
      label: 'Portal', 
      icon: <Star className="w-4 h-4" /> 
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen) {
        const target = event.target as Element;
        if (!target.closest('[data-mobile-menu]')) {
          setIsMenuOpen(false);
        }
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
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
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                    isActive(item.path)
                      ? 'bg-white text-[#75B8FA] font-medium'
                      : 'text-white hover:bg-white/20 hover:text-white font-medium'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge className="bg-[#75B8FA] text-white text-xs border-white">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
              
              {/* Buy Airtime & Data Tab - Always show on home page */}
              {isHomePage && (
                <button
                  onClick={handleQuickShopClick}
                  className="relative px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 font-medium bg-white text-green-600 hover:bg-green-50 border-2 border-green-200"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Buy Airtime & Data</span>
                  <Badge className="bg-green-600 text-white text-xs">
                    Quick
                  </Badge>
                </button>
              )}
            </nav>

            {/* WhatsApp Quick Access */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                onClick={() => window.open('https://wa.me/27832466539', '_blank')}
                className="bg-white text-[#75B8FA] hover:bg-white/90 px-4 py-2 font-semibold"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Support
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              data-mobile-menu="trigger"
              className="md:hidden p-3 rounded-lg hover:bg-white/20 transition-colors z-50 relative touch-manipulation"
              aria-label="Toggle menu"
              type="button"
            >
              {isMenuOpen ? 
                <X className="w-6 h-6 text-white" /> : 
                <Menu className="w-6 h-6 text-white" />
              }
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="md:hidden fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
            onClick={closeMenu}
          />
          
          {/* Mobile Menu */}
          <div 
            data-mobile-menu="content"
            className="md:hidden fixed left-0 right-0 top-16 bg-white shadow-2xl border-t-2 border-[#75B8FA]/20 z-[70] max-h-[calc(100vh-4rem)] overflow-y-auto animate-slide-down"
          >
            <nav className="p-6 space-y-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 text-lg ${
                    isActive(item.path)
                      ? 'bg-[#75B8FA] text-white font-semibold shadow-lg'
                      : 'text-[#75B8FA] hover:bg-[#75B8FA]/10 font-medium border border-[#75B8FA]/20'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge className="bg-[#75B8FA] text-white text-xs ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
              
              {/* Mobile Buy Airtime & Data Tab - Always show on home page */}
              {isHomePage && (
                <button
                  onClick={() => {
                    handleQuickShopClick();
                    closeMenu();
                  }}
                  className="w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 text-lg text-green-600 hover:bg-green-50 font-medium border-2 border-green-200 bg-green-50/50"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Buy Airtime & Data</span>
                  <Badge className="bg-green-600 text-white text-xs ml-auto">
                    Quick
                  </Badge>
                </button>
              )}
              
              <div className="pt-4 border-t border-gray-200 mt-6">
                <Button
                  onClick={() => {
                    window.open('https://wa.me/27832466539', '_blank');
                    closeMenu();
                  }}
                  className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white font-semibold text-lg py-4 h-auto"
                >
                  <MessageCircle className="w-5 h-5 mr-3" />
                  WhatsApp Support
                </Button>
              </div>
            </nav>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default Header;
