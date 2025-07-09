
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TabItem {
  value: string;
  label: string;
  icon: string;
  description: string;
  color: string;
  adminOnly?: boolean;
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
    const isNerveCenter = tab.value === 'admin';
    
    if (!isAllowed) {
      return "opacity-50 cursor-not-allowed bg-muted border-border text-muted-foreground";
    }
    
    // Special styling for The Nerve Center
    if (isNerveCenter) {
      return isActive 
        ? "bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white border-2 border-blue-500 shadow-xl transform hover:shadow-2xl ring-2 ring-blue-300 ring-opacity-50" 
        : "bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 text-blue-800 border-2 border-blue-300 hover:from-blue-100 hover:via-blue-200 hover:to-indigo-200 hover:border-blue-400 shadow-lg hover:shadow-xl ring-1 ring-blue-200";
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
      red: isActive 
        ? "bg-red-600 text-white border-red-700 shadow-lg transform hover:shadow-xl" 
        : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:border-red-300",
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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10">
      {/* Enhanced Mobile: Dynamic Grid with improved spacing and visibility */}
      <div className="grid grid-cols-2 gap-4 sm:hidden">
        {tabs.map((tab) => (
          <Card 
            key={tab.value}
            className={`
              ${getTabStyles(tab)}
              transition-all duration-300 cursor-pointer
              min-h-[120px] flex flex-col items-center justify-center p-4
              hover:shadow-xl hover:-translate-y-1 mobile-touch-target
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              overflow-hidden rounded-lg
              ${tab.value === 'admin-reg' ? 'ring-2 ring-red-200 border-red-300' : ''}
            `}
            onClick={() => handleTabClick(tab)}
            role="button"
            tabIndex={0}
            aria-label={`${tab.label} - ${tab.description}`}
          >
            <div className="text-2xl mb-2 flex items-center gap-2">
              {tab.icon}
              {tab.adminOnly && !isTabAllowed(tab.value) && (
                <span className="text-sm">🔒</span>
              )}
            </div>
            <div className="text-center w-full max-w-full px-2">
              <div className={`text-sm font-bold leading-snug mb-1 max-w-full overflow-hidden flex items-center justify-center gap-1 ${
                tab.value === 'admin' ? 'text-shadow' : ''
              }`}>
                {tab.label}
                {tab.value === 'admin' && (
                  <Badge className="text-xs px-1.5 py-0.5 h-5 bg-white/20 text-current border-white/30 font-bold backdrop-blur-sm">
                    NEURAL
                  </Badge>
                )}
                {tab.adminOnly && isTabAllowed(tab.value) && tab.value !== 'admin' && (
                  <Badge className="text-xs px-1.5 py-0.5 h-5 bg-yellow-100 text-yellow-800 border-yellow-200 font-semibold">
                    ADMIN
                  </Badge>
                )}
              </div>
              <div className={`text-xs leading-snug mt-1 max-w-full overflow-hidden ${
                tab.value === 'admin' 
                  ? (activeTab === tab.value ? 'text-blue-100' : 'text-blue-700') 
                  : 'text-muted-foreground'
              }`}>
                {tab.description}
              </div>
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

      {/* Enhanced Tablet: 3 columns with improved spacing and touch targets */}
      <div className="hidden sm:grid lg:hidden grid-cols-3 gap-6">
        {tabs.map((tab) => (
          <Card 
            key={tab.value}
            className={`
              ${getTabStyles(tab)}
              transition-all duration-300 cursor-pointer
              min-h-[130px] flex flex-col items-center justify-center p-6
              hover:shadow-xl hover:-translate-y-1
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              overflow-hidden rounded-lg
            `}
            onClick={() => handleTabClick(tab)}
            role="button"
            tabIndex={0}
            aria-label={`${tab.label} - ${tab.description}`}
          >
            <div className="text-3xl mb-3 flex items-center gap-2">
              {tab.icon}
              {tab.adminOnly && !isTabAllowed(tab.value) && (
                <span className="text-lg">🔒</span>
              )}
            </div>
            <div className="text-center max-w-full px-2">
              <div className={`text-base font-bold leading-snug mb-2 max-w-full overflow-hidden flex items-center justify-center gap-2 ${
                tab.value === 'admin' ? 'text-shadow' : ''
              }`}>
                {tab.label}
                {tab.value === 'admin' && (
                  <Badge className="text-xs px-2 py-1 h-5 bg-white/20 text-current border-white/30 font-bold backdrop-blur-sm">
                    NEURAL
                  </Badge>
                )}
                {tab.adminOnly && isTabAllowed(tab.value) && tab.value !== 'admin' && (
                  <Badge className="text-xs px-2 py-1 h-5 bg-yellow-100 text-yellow-800 border-yellow-200 font-semibold">
                    ADMIN
                  </Badge>
                )}
              </div>
              <div className={`text-sm leading-snug mt-1 max-w-full overflow-hidden ${
                tab.value === 'admin' 
                  ? (activeTab === tab.value ? 'text-blue-100' : 'text-blue-700') 
                  : 'text-muted-foreground'
              }`}>
                {tab.description}
              </div>
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

      {/* Desktop: Single row with enhanced spacing and visibility */}
      <div className="hidden lg:flex gap-6 justify-center flex-wrap">
        {tabs.map((tab) => (
          <Card 
            key={tab.value}
            className={`
              ${getTabStyles(tab)}
              transition-all duration-300 cursor-pointer
              min-h-[120px] w-[160px] flex flex-col items-center justify-center p-6
              hover:shadow-xl hover:-translate-y-2
              overflow-hidden rounded-lg
            `}
            onClick={() => handleTabClick(tab)}
          >
            <div className="text-3xl mb-3 flex items-center gap-2">
              {tab.icon}
              {tab.adminOnly && !isTabAllowed(tab.value) && (
                <span className="text-lg">🔒</span>
              )}
            </div>
            <div className="text-center max-w-full px-2">
              <div className={`text-base font-bold leading-snug mb-2 max-w-full overflow-hidden flex items-center justify-center gap-2 ${
                tab.value === 'admin' ? 'text-shadow' : ''
              }`}>
                {tab.label}
                {tab.value === 'admin' && (
                  <Badge className="text-xs px-2 py-1 h-5 bg-white/20 text-current border-white/30 font-bold backdrop-blur-sm">
                    NEURAL
                  </Badge>
                )}
                {tab.adminOnly && isTabAllowed(tab.value) && tab.value !== 'admin' && (
                  <Badge className="text-xs px-2 py-1 h-5 bg-yellow-100 text-yellow-800 border-yellow-200 font-semibold">
                    ADMIN
                  </Badge>
                )}
              </div>
              <div className={`text-sm leading-snug mt-1 max-w-full overflow-hidden ${
                tab.value === 'admin' 
                  ? (activeTab === tab.value ? 'text-blue-100' : 'text-blue-700') 
                  : 'text-muted-foreground'
              }`}>
                {tab.description}
              </div>
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
