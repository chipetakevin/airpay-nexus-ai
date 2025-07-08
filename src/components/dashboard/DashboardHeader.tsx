
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Home, Settings, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DashboardStats from './DashboardStats';

const DashboardHeader = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const isUnified = localStorage.getItem('userCredentials') && 
    JSON.parse(localStorage.getItem('userCredentials') || '{}').password === 'Malawi@1976';
  const isAdminAuthenticated = localStorage.getItem('userAuthenticated') === 'true';

  return (
    <div className="w-full">
      {/* Main Header Container - Match First Image Layout */}
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
            </div>

            {/* Navigation Pills - Match First Image */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-center max-w-2xl">
              
              {/* Unified Status */}
              {isUnified && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 sm:gap-2 shadow-md">
                  <span className="text-sm sm:text-base">⭐</span>
                  <span className="text-xs sm:text-sm font-semibold">Unified</span>
                </div>
              )}

              {/* Home Button */}
              <Link to="/">
                <div className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 sm:gap-2 transition-all duration-200 shadow-sm hover:shadow-md">
                  <Home className="w-4 h-4" />
                  <span className="text-xs sm:text-sm font-medium hidden sm:inline">Home</span>
                </div>
              </Link>

              {/* Navigation Button - Match First Image */}
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
                    <DropdownMenuItem className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 rounded-md cursor-pointer">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Dashboard Settings
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 rounded-md cursor-pointer">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      System Status
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* User Section - Match First Image */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Badge 
                variant="secondary" 
                className="bg-green-100 text-green-700 border-green-200 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium"
              >
                <User className="w-3 h-3 mr-1" />
                <span className="hidden sm:inline">A</span>
                <span className="sm:hidden">A</span>
              </Badge>
              
              {/* Status Indicator */}
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto p-3 md:p-4">
        <DashboardStats />
      </div>
    </div>
  );
};

export default DashboardHeader;
