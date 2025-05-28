
import React from 'react';
import { Signal, Zap, TrendingUp, Users } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <Signal className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Air Pay</h1>
              <p className="text-sm text-blue-100">AI-Driven Airtime Management</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right">
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
    </header>
  );
};

export default Header;
