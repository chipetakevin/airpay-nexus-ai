
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Smartphone, 
  Menu, 
  X, 
  ChevronDown,
  MessageCircle,
  Zap,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlatformDropdownOpen, setIsPlatformDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Devine Mobile
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            
            {/* Platform Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsPlatformDropdownOpen(true)}
              onMouseLeave={() => setIsPlatformDropdownOpen(false)}
            >
              <button className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                Platform
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              
              {isPlatformDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border py-2 z-50">
                  <Link 
                    to="/platform" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Zap className="w-4 h-4 mr-3 text-blue-600" />
                    <div>
                      <div className="font-medium">Enterprise Platform</div>
                      <div className="text-xs text-gray-500">Business solutions</div>
                    </div>
                  </Link>
                  <Link 
                    to="/platform/baas" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Users className="w-4 h-4 mr-3 text-purple-600" />
                    <div>
                      <div className="font-medium">BaaS Platform</div>
                      <div className="text-xs text-gray-500">Backend services</div>
                    </div>
                  </Link>
                  <Link 
                    to="/whatsapp-assistant" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <MessageCircle className="w-4 h-4 mr-3 text-green-600" />
                    <div>
                      <div className="font-medium">WhatsApp Assistant</div>
                      <div className="text-xs text-gray-500">AI-powered chat</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link to="/spaza-ai" className="text-gray-700 hover:text-blue-600 transition-colors">
              Spaza AI
            </Link>
            <Link to="/portal" className="text-gray-700 hover:text-blue-600 transition-colors">
              Portal
            </Link>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Link to="/portal">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/platform" 
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Enterprise Platform
              </Link>
              <Link 
                to="/platform/baas" 
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                BaaS Platform
              </Link>
              <Link 
                to="/whatsapp-assistant" 
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                WhatsApp Assistant
              </Link>
              <Link 
                to="/spaza-ai" 
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Spaza AI
              </Link>
              <Link 
                to="/portal" 
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Portal
              </Link>
              <Link to="/portal" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
