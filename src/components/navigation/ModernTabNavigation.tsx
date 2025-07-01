
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TabItem {
  value: string;
  label: string;
  icon: string;
  description: string;
  color: string;
  isActive?: boolean;
  isAllowed?: boolean;
}

interface ModernTabNavigationProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (value: string) => void;
  isTabAllowed: (value: string) => boolean;
}

const ModernTabNavigation = ({ 
  tabs, 
  activeTab, 
  onTabChange, 
  isTabAllowed 
}: ModernTabNavigationProps) => {
  
  const getTabStyles = (tab: TabItem) => {
    const isActive = activeTab === tab.value;
    const isAllowed = isTabAllowed(tab.value);
    
    if (!isAllowed) {
      return "opacity-50 cursor-not-allowed bg-gray-50 border-gray-200 text-gray-400";
    }
    
    const colorMap = {
      orange: isActive 
        ? "bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg border-orange-400 scale-105" 
        : "bg-orange-50 border-orange-200 hover:bg-orange-100 hover:border-orange-300 text-orange-700",
      purple: isActive 
        ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg border-purple-400 scale-105" 
        : "bg-purple-50 border-purple-200 hover:bg-purple-100 hover:border-purple-300 text-purple-700",
      green: isActive 
        ? "bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg border-green-400 scale-105" 
        : "bg-green-50 border-green-200 hover:bg-green-100 hover:border-green-300 text-green-700",
      blue: isActive 
        ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg border-blue-400 scale-105" 
        : "bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-300 text-blue-700",
      yellow: isActive 
        ? "bg-gradient-to-br from-yellow-500 to-amber-500 text-white shadow-lg border-yellow-400 scale-105" 
        : "bg-yellow-50 border-yellow-200 hover:bg-yellow-100 hover:border-yellow-300 text-yellow-700",
      gray: isActive 
        ? "bg-gradient-to-br from-gray-600 to-slate-600 text-white shadow-lg border-gray-400 scale-105" 
        : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300 text-gray-700"
    };
    
    return colorMap[tab.color] || colorMap.gray;
  };

  const handleTabClick = (tab: TabItem) => {
    if (isTabAllowed(tab.value)) {
      console.log(`🖱️ Tab clicked: ${tab.value} (${tab.label})`);
      onTabChange(tab.value);
    } else {
      console.log(`❌ Tab not allowed: ${tab.value} (${tab.label})`);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 mb-4 sm:mb-6">
      {/* Mobile: 2x3 Grid */}
      <div className="grid grid-cols-2 gap-2 sm:hidden">
        {tabs.slice(0, 6).map((tab) => (
          <Card 
            key={tab.value}
            className={`
              ${getTabStyles(tab)}
              border-2 transition-all duration-300 cursor-pointer
              min-h-[80px] flex flex-col items-center justify-center p-3
              hover:shadow-md active:scale-95
            `}
            onClick={() => handleTabClick(tab)}
          >
            <div className="text-lg mb-1">{tab.icon}</div>
            <div className="text-center">
              <div className="text-xs font-bold leading-tight">{tab.label}</div>
              <div className="text-xs opacity-75 leading-tight mt-0.5">{tab.description}</div>
            </div>
            {activeTab === tab.value && (
              <div className="w-1 h-1 bg-current rounded-full mt-1 animate-pulse"></div>
            )}
          </Card>
        ))}
      </div>

      {/* Tablet: 3 columns */}
      <div className="hidden sm:grid lg:hidden grid-cols-3 gap-3">
        {tabs.map((tab) => (
          <Card 
            key={tab.value}
            className={`
              ${getTabStyles(tab)}
              border-2 transition-all duration-300 cursor-pointer
              min-h-[90px] flex flex-col items-center justify-center p-4
              hover:shadow-md active:scale-95
            `}
            onClick={() => handleTabClick(tab)}
          >
            <div className="text-xl mb-2">{tab.icon}</div>
            <div className="text-center">
              <div className="text-sm font-bold leading-tight">{tab.label}</div>
              <div className="text-xs opacity-75 leading-tight mt-1">{tab.description}</div>
            </div>
            {activeTab === tab.value && (
              <div className="flex items-center gap-1 mt-2">
                <div className="w-1 h-1 bg-current rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Desktop: Single row with optimal spacing */}
      <div className="hidden lg:flex gap-4 justify-center">
        {tabs.map((tab) => (
          <Card 
            key={tab.value}
            className={`
              ${getTabStyles(tab)}
              border-2 transition-all duration-300 cursor-pointer
              min-h-[100px] w-[140px] flex flex-col items-center justify-center p-4
              hover:shadow-lg hover:-translate-y-1 active:scale-95
            `}
            onClick={() => handleTabClick(tab)}
          >
            <div className="text-2xl mb-2">{tab.icon}</div>
            <div className="text-center">
              <div className="text-sm font-bold leading-tight">{tab.label}</div>
              <div className="text-xs opacity-75 leading-tight mt-1">{tab.description}</div>
            </div>
            {activeTab === tab.value && (
              <div className="flex items-center gap-1 mt-2">
                <div className="w-2 h-0.5 bg-current rounded-full"></div>
                <div className="w-4 h-0.5 bg-current rounded-full"></div>
                <div className="w-2 h-0.5 bg-current rounded-full"></div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ModernTabNavigation;
