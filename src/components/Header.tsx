
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

  return (
    <header className="bg-[#75B8FA] sticky top-0 z-50">
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
            
            {/* Buy Airtime & Data Tab - Only show on home page */}
            {isHomePage && (
              <button
                onClick={onQuickShopToggle}
                className={`relative px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 font-medium ${
                  isQuickShopOpen
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                    : 'bg-white text-green-600 hover:bg-green-50 border-2 border-green-200'
                }`}
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
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 bg-white rounded-b-lg mt-2">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-[#75B8FA]/10 text-[#75B8FA] font-semibold'
                      : 'text-[#75B8FA] hover:bg-[#75B8FA]/5 font-medium'
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
              
              {/* Mobile Buy Airtime & Data Tab - Only show on home page */}
              {isHomePage && (
                <button
                  onClick={() => {
                    onQuickShopToggle?.();
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isQuickShopOpen
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold'
                      : 'text-green-600 hover:bg-green-50 font-medium border-2 border-green-200'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Buy Airtime & Data</span>
                  <Badge className="bg-green-600 text-white text-xs ml-auto">
                    Quick
                  </Badge>
                </button>
              )}
              
              <div className="pt-4">
                <Button
                  onClick={() => {
                    window.open('https://wa.me/27832466539', '_blank');
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-[#75B8FA] hover:bg-[#75B8FA]/90 text-white font-semibold"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Support
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
