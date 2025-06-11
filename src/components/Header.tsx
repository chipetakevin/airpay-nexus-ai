
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Smartphone, Menu, X, Crown, Zap, Brain, MessageCircle, Scan, ShoppingCart, Terminal, Settings, FileCheck, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import CustomerProfileDropdown from './CustomerProfileDropdown';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useMobileAuth();
  const { toast } = useToast();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Only clear authentication flags, keep user data for future registrations
    localStorage.removeItem('userAuthenticated');
    localStorage.removeItem('userCredentials');
    
    // Keep the following data for future registrations:
    // - onecardUser (customer data)
    // - onecardVendor (vendor data) 
    // - onecardAdmin (admin data)
    
    toast({
      title: "Logged Out Successfully",
      description: "Your account information has been saved for future logins.",
      duration: 3000,
    });
    
    // Redirect to heroes section (main landing page)
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Enhanced Logo with improved hover effects */}
        <Link to="/" className="flex items-center space-x-2 group cursor-pointer">
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-all duration-300 ease-out group-active:scale-95">
              <Smartphone className="h-5 w-5 text-white" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition-all duration-300"></div>
          </div>
          <div className="flex flex-col group-hover:scale-105 transition-all duration-300 ease-out group-active:scale-95">
            <span className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Divinely</span>
            <span className="font-montserrat font-bold text-lg text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text -mt-1 group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300">
              Mobile
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <div className="relative group">
            <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <span>Services</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <div className="relative group/submenu">
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group cursor-pointer">
                    <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 group-hover:text-blue-600">Divinely BaaS Platform</div>
                      <div className="text-xs text-gray-500">AI-Powered Backend Services</div>
                    </div>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div className="absolute top-0 left-full ml-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transition-all duration-200">
                    <div className="p-2">
                      <Link to="/devine-baas" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Brain className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 group-hover:text-blue-600">Main Platform</div>
                          <div className="text-xs text-gray-500">Full BaaS dashboard & services</div>
                        </div>
                      </Link>
                      <Link to="/devine-baas" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <FileCheck className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 group-hover:text-blue-600">Mobile Porting & RICA</div>
                          <div className="text-xs text-gray-500">SIM porting & RICA registration</div>
                        </div>
                      </Link>
                      <Link to="/baas-platform" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Brain className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 group-hover:text-blue-600">Mobile Divinely BaaS Portal</div>
                          <div className="text-xs text-gray-500">Advanced BaaS management portal</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <Link to="/portal?tab=onecard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Zap className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 group-hover:text-blue-600">Smart Deals Portal</div>
                    <div className="text-xs text-gray-500">Exclusive airtime & data deals</div>
                  </div>
                </Link>
                <Link to="/whatsapp-assistant" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <MessageCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 group-hover:text-blue-600">WhatsApp Business</div>
                    <div className="text-xs text-gray-500">AI-powered business assistant</div>
                  </div>
                </Link>
                {/* Logout Option - Only show if authenticated - Fixed Positioning */}
                {isAuthenticated && (
                  <>
                    <div className="border-t border-gray-200 my-2"></div>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors group w-full text-left"
                    >
                      <div className="p-2 bg-red-100 rounded-lg">
                        <LogOut className="w-4 h-4 text-red-600" />
                      </div>
                      <div className="pt-1">
                        <div className="font-medium text-gray-900 group-hover:text-red-600">Logout</div>
                        <div className="text-xs text-gray-500">Sign out of your account</div>
                      </div>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <span>Platforms</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <Link to="/scan-to-text-ai" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Scan className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 group-hover:text-blue-600">AI Document Scanner</div>
                    <div className="text-xs text-gray-500">Intelligent text extraction</div>
                  </div>
                </Link>
                <Link to="/baas-platform" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Brain className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 group-hover:text-blue-600">BaaS Platform</div>
                    <div className="text-xs text-gray-500">Backend-as-a-Service</div>
                  </div>
                </Link>
                <Link to="/ussd-system" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Terminal className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 group-hover:text-blue-600">USSD System</div>
                    <div className="text-xs text-gray-500">Mobile service codes</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <span>Dashboards</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <Link to="/master-dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Settings className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 group-hover:text-blue-600">Master Dashboard</div>
                    <div className="text-xs text-gray-500">System overview & control</div>
                  </div>
                </Link>
                <Link to="/platform-dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Brain className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 group-hover:text-blue-600">Platform Dashboard</div>
                    <div className="text-xs text-gray-500">Analytics & insights</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Right side actions */}
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
      </div>

      {/* Mobile Navigation Menu - Enhanced for better UX */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {/* Customer Profile for Mobile */}
            {isAuthenticated && (
              <div className="pb-4 border-b border-gray-200">
                <CustomerProfileDropdown />
              </div>
            )}

            {/* Mobile Navigation Links with 44px touch targets */}
            <Link to="/devine-baas" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors min-h-[44px]" onClick={toggleMenu}>
              <Crown className="w-4 h-4 text-yellow-600" />
              <span className="font-medium">Divinely BaaS Platform</span>
            </Link>
            <Link to="/devine-baas" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors ml-4 min-h-[44px]" onClick={toggleMenu}>
              <FileCheck className="w-4 h-4 text-orange-600" />
              <span className="font-medium">Mobile Porting & RICA</span>
            </Link>
            <Link to="/baas-platform" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors ml-4 min-h-[44px]" onClick={toggleMenu}>
              <Brain className="w-4 h-4 text-purple-600" />
              <span className="font-medium">Mobile Divinely BaaS Portal</span>
            </Link>
            <Link to="/portal?tab=onecard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors min-h-[44px]" onClick={toggleMenu}>
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="font-medium">Smart Deals Portal</span>
            </Link>
            <Link to="/whatsapp-assistant" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors min-h-[44px]" onClick={toggleMenu}>
              <MessageCircle className="w-4 h-4 text-green-600" />
              <span className="font-medium">WhatsApp Business</span>
            </Link>
            <Link to="/scan-to-text-ai" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors min-h-[44px]" onClick={toggleMenu}>
              <Scan className="w-4 h-4 text-purple-600" />
              <span className="font-medium">AI Document Scanner</span>
            </Link>
            <Link to="/master-dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors min-h-[44px]" onClick={toggleMenu}>
              <Settings className="w-4 h-4 text-red-600" />
              <span className="font-medium">Master Dashboard</span>
            </Link>
            
            {/* Mobile Logout Option - Only show if authenticated - Fixed Positioning */}
            {isAuthenticated && (
              <>
                <div className="border-t border-gray-200 my-4"></div>
                <button 
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors w-full text-left min-h-[44px]"
                >
                  <LogOut className="w-4 h-4 text-red-600" />
                  <div className="pt-1">
                    <span className="font-medium text-red-600">Logout</span>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
