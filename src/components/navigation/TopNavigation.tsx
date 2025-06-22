
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Crown, Home, User, ChevronDown } from 'lucide-react';
import { useMobileAuth } from '@/hooks/useMobileAuth';

const TopNavigation = () => {
  const { currentUser, isAuthenticated } = useMobileAuth();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 safe-area-pt">
      <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
        {/* Left - Crown Logo */}
        <div className="flex items-center">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Crown className="w-7 h-7 text-white" />
          </div>
        </div>

        {/* Center - Home Icon */}
        <div className="flex items-center">
          <div className="w-12 h-12 bg-white bg-opacity-10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white border-opacity-20">
            <Home className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Right - User Profile */}
        <div className="flex items-center">
          <div className="bg-white bg-opacity-10 rounded-2xl px-4 py-2 backdrop-blur-sm border border-white border-opacity-20">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-green-900 font-bold text-sm">
                  {isAuthenticated && currentUser?.firstName 
                    ? currentUser.firstName.charAt(0).toUpperCase()
                    : 'G'
                  }
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
