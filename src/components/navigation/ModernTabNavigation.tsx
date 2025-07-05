
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
      return "opacity-50 cursor-not-allowed bg-muted border-border text-muted-foreground";
    }
    
    const colorMap = {
      orange: isActive 
        ? "tab-active tab-orange-active border-2 shadow-lg transform hover:shadow-xl" 
        : "tab-inactive tab-orange-inactive border hover:tab-orange-hover",
      purple: isActive 
        ? "tab-active tab-purple-active border-2 shadow-lg transform hover:shadow-xl" 
        : "tab-inactive tab-purple-inactive border hover:tab-purple-hover",
      green: isActive 
        ? "tab-active tab-green-active border-2 shadow-lg transform hover:shadow-xl" 
        : "tab-inactive tab-green-inactive border hover:tab-green-hover",
      blue: isActive 
        ? "tab-active tab-blue-active border-2 shadow-lg transform hover:shadow-xl" 
        : "tab-inactive tab-blue-inactive border hover:tab-blue-hover",
      yellow: isActive 
        ? "tab-active tab-yellow-active border-2 shadow-lg transform hover:shadow-xl" 
        : "tab-inactive tab-yellow-inactive border hover:tab-yellow-hover",
      gray: isActive 
        ? "tab-active tab-gray-active border-2 shadow-lg transform hover:shadow-xl" 
        : "tab-inactive tab-gray-inactive border hover:tab-gray-hover"
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
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 mb-6 sm:mb-8">
      {/* Enhanced Mobile: 2x3 Grid with improved card sizing and typography */}
      <div className="grid grid-cols-2 gap-3 sm:hidden">
        {tabs.slice(0, 6).map((tab) => (
          <Card 
            key={tab.value}
            className={`
              ${getTabStyles(tab)}
              transition-all duration-300 cursor-pointer
              min-h-[100px] flex flex-col items-center justify-center p-3
              hover:shadow-lg mobile-touch-target
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              overflow-hidden
            `}
            onClick={() => handleTabClick(tab)}
            role="button"
            tabIndex={0}
            aria-label={`${tab.label} - ${tab.description}`}
          >
            <div className="text-xl mb-1.5">{tab.icon}</div>
            <div className="text-center w-full max-w-full">
              <div className="text-sm font-bold leading-tight truncate px-1 max-w-full overflow-hidden">{tab.label}</div>
              <div className="text-xs opacity-90 leading-tight mt-0.5 truncate px-1 max-w-full overflow-hidden">{tab.description}</div>
            </div>
            {activeTab === tab.value && (
              <div className="flex items-center gap-1 mt-1.5">
                <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Enhanced Tablet: 3 columns with improved touch targets */}
      <div className="hidden sm:grid lg:hidden grid-cols-3 gap-4">
        {tabs.map((tab) => (
          <Card 
            key={tab.value}
            className={`
              ${getTabStyles(tab)}
              transition-all duration-300 cursor-pointer
              min-h-[110px] flex flex-col items-center justify-center p-5
              hover:shadow-lg
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              overflow-hidden
            `}
            onClick={() => handleTabClick(tab)}
            role="button"
            tabIndex={0}
            aria-label={`${tab.label} - ${tab.description}`}
          >
            <div className="text-2xl mb-2">{tab.icon}</div>
            <div className="text-center max-w-full">
              <div className="text-sm font-bold leading-tight truncate max-w-full overflow-hidden">{tab.label}</div>
              <div className="text-sm opacity-85 leading-tight mt-1 truncate max-w-full overflow-hidden">{tab.description}</div>
            </div>
            {activeTab === tab.value && (
              <div className="flex items-center gap-1 mt-2">
                <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
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
              transition-all duration-300 cursor-pointer
              min-h-[100px] w-[140px] flex flex-col items-center justify-center p-4
              hover:shadow-lg hover:-translate-y-1
              overflow-hidden
            `}
            onClick={() => handleTabClick(tab)}
          >
            <div className="text-2xl mb-2">{tab.icon}</div>
            <div className="text-center max-w-full">
              <div className="text-sm font-bold leading-tight truncate max-w-full overflow-hidden">{tab.label}</div>
              <div className="text-xs opacity-75 leading-tight mt-1 truncate max-w-full overflow-hidden">{tab.description}</div>
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
