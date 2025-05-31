
import React from 'react';
import { Link } from 'react-router-dom';
import { Signal, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onLogoClick?: () => void;
  showAdminLink?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick, showAdminLink = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Check authentication status for smart redirects
  const isAuthenticated = localStorage.getItem('userAuthenticated') === 'true';

  const getRegistrationLink = (type: string) => {
    if (isAuthenticated) {
      // Redirect authenticated users to smart deals
      return '/portal?tab=onecard';
    }
    // Redirect non-authenticated users to registration
    return `/portal?tab=${type}`;
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div 
            onClick={onLogoClick} 
            className="flex items-center space-x-3 cursor-pointer"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <Signal className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Air Pay</h1>
              <p className="text-xs sm:text-sm text-blue-100 hidden sm:block">AI-Driven Airtime & Data Management</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="bg-transparent text-white hover:bg-white/20 flex items-center gap-2">
                  <Menu className="w-4 h-4" />
                  Categories
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white text-gray-900 min-w-[200px] z-50">
                <DropdownMenuLabel>Registration</DropdownMenuLabel>
                <Link to={getRegistrationLink('registration')}>
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
                    Customer Registration
                  </DropdownMenuItem>
                </Link>
                <Link to={getRegistrationLink('vendor')}>
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 text-yellow-600">
                    Vendor Registration
                  </DropdownMenuItem>
                </Link>
                <Link to={getRegistrationLink('admin-reg')}>
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 text-red-600">
                    Admin Registration
                  </DropdownMenuItem>
                </Link>
                
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Services</DropdownMenuLabel>
                <Link to="/portal?tab=onecard">
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 text-blue-600">
                    Airtime Deals
                  </DropdownMenuItem>
                </Link>
                <Link to="/portal?tab=onecard">
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 text-purple-600">
                    Data Deals
                  </DropdownMenuItem>
                </Link>
                <Link to="/portal?tab=onecard">
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 text-green-600">
                    OneCard Rewards
                  </DropdownMenuItem>
                </Link>
                
                {showAdminLink && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Admin</DropdownMenuLabel>
                    <Link to="/portal?tab=admin">
                      <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 text-red-600 font-bold">
                        Admin Portal
                      </DropdownMenuItem>
                    </Link>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link to={isAuthenticated ? "/portal?tab=onecard" : "/portal"}>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2">
                🚀 {isAuthenticated ? 'Smart Deals' : 'Get Started'}
              </Button>
            </Link>
            
            {/* System Status */}
            <div className="flex items-center space-x-4">
              <div className="text-right hidden lg:block">
                <p className="text-sm text-blue-100">System Status</p>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">99.99% Uptime</span>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-blue-100 hidden sm:block">Active Transactions</p>
                <p className="text-lg font-bold">2,847</p>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/20">
            <div className="flex flex-col space-y-3 mt-4">
              {/* Mobile Categories */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-blue-100">Registration</p>
                <Link 
                  to={getRegistrationLink('registration')} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block pl-4 py-2 text-sm hover:bg-white/10 rounded"
                >
                  Customer Registration
                </Link>
                <Link 
                  to={getRegistrationLink('vendor')} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block pl-4 py-2 text-sm text-yellow-300 hover:bg-white/10 rounded"
                >
                  Vendor Registration
                </Link>
                <Link 
                  to={getRegistrationLink('admin-reg')} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block pl-4 py-2 text-sm text-red-300 hover:bg-white/10 rounded"
                >
                  Admin Registration
                </Link>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-semibold text-blue-100">Services</p>
                <Link 
                  to="/portal?tab=onecard" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block pl-4 py-2 text-sm text-blue-300 hover:bg-white/10 rounded"
                >
                  Airtime Deals
                </Link>
                <Link 
                  to="/portal?tab=onecard" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block pl-4 py-2 text-sm text-purple-300 hover:bg-white/10 rounded"
                >
                  Data Deals
                </Link>
                <Link 
                  to="/portal?tab=onecard" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block pl-4 py-2 text-sm text-green-300 hover:bg-white/10 rounded"
                >
                  OneCard Rewards
                </Link>
              </div>

              {showAdminLink && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-blue-100">Admin</p>
                  <Link 
                    to="/portal?tab=admin" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block pl-4 py-2 text-sm text-red-300 font-bold hover:bg-white/10 rounded"
                  >
                    Admin Portal
                  </Link>
                </div>
              )}
              
              <Link 
                to="/portal" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full mt-4"
              >
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white w-full">
                  🚀 Get Started
                </Button>
              </Link>
              
              {/* Mobile System Status */}
              <div className="bg-white/10 rounded-lg p-3 mt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-blue-100">System Status</p>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">99.99% Uptime</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-blue-100">Active Transactions</p>
                    <p className="text-lg font-bold">2,847</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
