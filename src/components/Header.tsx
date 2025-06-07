
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown, Menu, X, Zap, MessageSquare, Star, Settings, Users } from 'lucide-react';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { currentUser, isAuthenticated } = useMobileAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('userAuthenticated');
    localStorage.removeItem('userCredentials');
    localStorage.removeItem('onecardUser');
    localStorage.removeItem('onecardVendor');
    localStorage.removeItem('onecardAdmin');
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account."
    });
    
    navigate('/');
    window.location.reload();
  };

  const servicesMenuItems = [
    {
      title: "Smart Deals",
      description: "AI-powered airtime & data deals",
      icon: <Zap className="w-5 h-5" />,
      href: "/portal?tab=deals"
    },
    {
      title: "Spaza AI",
      description: "Intelligent business assistant",
      icon: <MessageSquare className="w-5 h-5" />,
      href: "/spaza-ai"
    },
    {
      title: "OneCard System",
      description: "Digital wallet & payments",
      icon: <Star className="w-5 h-5" />,
      href: "/portal?tab=onecard"
    }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-2 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              AirPay
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {servicesMenuItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.href}
                      onClick={() => setIsServicesOpen(false)}
                      className="flex items-start space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="text-blue-600 mt-1">
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/portal" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Portal
            </Link>
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {currentUser?.firstName?.[0] || 'U'}
                    </span>
                  </div>
                  <span className="text-sm text-gray-700">
                    {currentUser?.firstName || 'User'}
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/portal">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/portal?tab=registration">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-3">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              {/* Mobile Services */}
              <div className="space-y-2">
                <div className="px-3 py-2 text-gray-900 font-medium">Services</div>
                {servicesMenuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 px-6 py-2 text-gray-600 hover:text-blue-600"
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
              
              <Link
                to="/portal"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Portal
              </Link>

              {/* Mobile Auth */}
              <div className="pt-3 border-t border-gray-200">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="px-3 text-sm text-gray-600">
                      Welcome, {currentUser?.firstName || 'User'}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleLogout();
                      }}
                      className="mx-3"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex space-x-2 px-3">
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/portal" onClick={() => setIsMenuOpen(false)}>
                        Login
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link to="/portal?tab=registration" onClick={() => setIsMenuOpen(false)}>
                        Sign Up
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop for dropdown */}
      {isServicesOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsServicesOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
