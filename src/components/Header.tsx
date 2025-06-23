
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
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
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
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs">
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
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp Support
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-200">
                <Button
                  onClick={() => {
                    window.open('https://wa.me/27832466539', '_blank');
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
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
