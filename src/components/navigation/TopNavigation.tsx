
import React from 'react';
import { Crown, Home, ChevronDown } from 'lucide-react';
import { useMobileAuth } from '@/hooks/useMobileAuth';

const TopNavigation = () => {
  const { currentUser, isAuthenticated } = useMobileAuth();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 safe-area-pt">
      <div className="flex items-center justify-between px-5 py-4 max-w-md mx-auto">
        {/* Left - Navigation Icons */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white border-opacity-20">
            <Crown className="w-7 h-7 text-white" />
          </div>
          <div className="w-12 h-12 bg-white bg-opacity-30 rounded-xl flex items-center justify-center backdrop-blur-sm border-2 border-white border-opacity-30">
            <Home className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Center - Start Button */}
        <button className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-8 py-3 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          Start
        </button>

        {/* Right - User Profile */}
        <div className="flex items-center">
          <div className="bg-white bg-opacity-10 rounded-2xl px-4 py-2 backdrop-blur-sm border border-white border-opacity-20">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-green-900 font-bold text-lg">
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
