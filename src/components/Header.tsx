
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, Crown, Star, ShoppingCart,
  Menu, X, Zap, CreditCard
} from 'lucide-react';
import HeaderLogo from './header/HeaderLogo';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
    <header className="relative bg-[#5B7FE8] shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 relative">
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
                    ? 'bg-white/80 text-blue-700 font-medium shadow-md backdrop-blur-sm'
                    : 'text-white hover:bg-white/20 hover:text-white backdrop-blur-sm font-medium'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>

          {/* WhatsApp Quick Access */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              onClick={() => window.open('https://wa.me/27832466539', '_blank')}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 shadow-lg font-semibold"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp Support
            </Button>
          </div>

          {/* Mobile Menu Button with white lines */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/20 backdrop-blur-sm transition-colors text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 bg-white/90 backdrop-blur-sm rounded-b-lg mt-2 shadow-lg">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-blue-100/80 text-blue-800 font-semibold'
                      : 'text-blue-700 hover:bg-blue-50/80 font-medium'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
              
              <div className="pt-4">
                <Button
                  onClick={() => {
                    window.open('https://wa.me/27832466539', '_blank');
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold"
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
