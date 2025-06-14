
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Smartphone } from 'lucide-react';
import DashboardStats from './DashboardStats';

const DashboardHeader = () => {
  return (
    <div className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg">
      <div className="max-w-7xl mx-auto p-3 md:p-4">
        {/* Compact Header with improved branding */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg ring-2 ring-white/50">
              <Smartphone className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                Divinely Mobile
              </h1>
              <p className="text-xs md:text-sm text-gray-600 font-medium">Customer Shopping Hub</p>
              <p className="text-xs text-gray-500 hidden sm:block">Smart Deals • Instant Service • Cashback Rewards</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Badge className="bg-green-100 text-green-700 text-xs px-2 py-1">
              🟢 All Systems Operational
            </Badge>
            <Button 
              variant="outline" 
              className="bg-white/80 hover:bg-white/90 border-2 border-gray-200 text-xs"
            >
              Need Help?
            </Button>
          </div>
        </div>

        {/* Compact Stats Grid */}
        <DashboardStats />
      </div>
    </div>
  );
};

export default DashboardHeader;
