
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Home, Settings, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PortalHeaderProps {
  userType: 'customer' | 'vendor' | 'admin' | null;
  resetUserType: () => void;
  onShowAdminBanner?: (show: boolean) => void;
  showAdminBanner?: boolean;
  isAdminAuthenticated?: boolean;
}

const PortalHeader = ({ 
  userType, 
  resetUserType, 
  onShowAdminBanner, 
  showAdminBanner = false, 
  isAdminAuthenticated = false 
}: PortalHeaderProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const isUnified = localStorage.getItem('userCredentials') && 
    JSON.parse(localStorage.getItem('userCredentials') || '{}').password === 'Malawi@1976';

  return (
    <div className="w-full">
      {/* Main Header Container */}
      <Card className="bg-white/95 backdrop-blur-lg border-0 shadow-lg mx-2 sm:mx-4 mb-2 rounded-xl sm:rounded-2xl overflow-hidden">
        <div className="px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            
            {/* Logo Section */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <img 
                  src="/lovable-uploads/788fddcb-574c-4f1d-9c73-54cc003a95d1.png" 
                  alt="Divine Mobile Logo"
                  className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold text-gray-800">
                  Divine Mobile
                </h1>
                <p className="text-xs text-gray-500">Smart Portal</p>
              </div>
            </div>

            {/* Navigation Pills */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-center max-w-2xl">
              
              {/* Unified Status */}
              {isUnified && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 sm:gap-2 shadow-md">
                  <span className="text-sm sm:text-base">⭐</span>
                  <span className="text-xs sm:text-sm font-semibold">Unified</span>
                </div>
              )}

              {/* Navigation Button - Fully Functional */}
              {isAdminAuthenticated && (
                <DropdownMenu open={isNavOpen} onOpenChange={setIsNavOpen}>
                  <DropdownMenuTrigger asChild>
                    <div className="relative bg-gradient-to-r from-pink-100 to-red-100 hover:from-pink-200 hover:to-red-200 text-red-600 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer">
                      <Settings className="w-4 h-4" />
                      <span className="text-sm font-medium">Nav</span>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-sm"></div>
                    </div>
                  </DropdownMenuTrigger>
                  
                  <DropdownMenuContent 
                    align="center" 
                    className="w-56 bg-white border border-gray-200 shadow-lg rounded-lg p-1 mt-2"
                    sideOffset={8}
                  >
                    <DropdownMenuItem
                      onClick={() => onShowAdminBanner?.(!showAdminBanner)}
                      className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 rounded-md cursor-pointer"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      {showAdminBanner ? 'Hide Admin Info' : 'Show Admin Info'}
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 rounded-md cursor-pointer">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Admin Settings
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 rounded-md cursor-pointer">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      System Status
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* User Section */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Home Button - Moved to Far Right */}
              <Link to="/">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                  <img 
                    src="/lovable-uploads/788fddcb-574c-4f1d-9c73-54cc003a95d1.png" 
                    alt="Divine Mobile Home"
                    className="w-7 h-7 sm:w-8 sm:h-8 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </Link>

              {userType && (
                <Badge 
                  variant="secondary" 
                  className="bg-green-100 text-green-700 border-green-200 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium"
                >
                  <User className="w-3 h-3 mr-1" />
                  <span className="capitalize hidden sm:inline">{userType}</span>
                  <span className="capitalize sm:hidden">{userType.charAt(0)}</span>
                </Badge>
              )}
              
              {/* Status Indicator */}
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PortalHeader;
