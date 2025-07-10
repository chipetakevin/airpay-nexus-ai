
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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
      teal: isActive 
        ? "tab-active tab-teal-active border-2 shadow-lg transform hover:shadow-xl" 
        : "tab-inactive tab-teal-inactive border hover:tab-teal-hover",
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
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 mb-6 sm:mb-8">
      {/* Enhanced Header Section */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-gray-200 mb-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700">Platform Navigation</span>
        </div>
        <p className="text-gray-500 text-sm">Select a service to continue</p>
      </div>

      {/* Mobile: Enhanced 2-column grid */}
      <div className="grid grid-cols-2 gap-3 sm:hidden">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;
          const isAllowed = isTabAllowed(tab.value);
          const isNerveCenter = tab.value === 'admin';
          
          return (
            <Card 
              key={tab.value}
              className={`
                transition-all duration-300 cursor-pointer min-h-[110px] 
                flex flex-col items-center justify-center p-3 relative overflow-hidden 
                rounded-xl border-2 shadow-sm hover:shadow-lg hover:-translate-y-1
                ${!isAllowed ? 'opacity-60 cursor-not-allowed' : ''}
                ${isActive ? 'ring-2 ring-blue-400 ring-offset-1 shadow-lg scale-[1.02]' : ''}
                ${getTabStyles(tab)}
                ${tab.value === 'admin-reg' ? 'ring-1 ring-red-200 border-red-200' : ''}
              `}
              onClick={() => handleTabClick(tab)}
              role="button"
              tabIndex={0}
              aria-label={`${tab.label} - ${tab.description}`}
            >
              {/* Active indicator overlay */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
              )}
              
              <div className="text-2xl mb-2 flex items-center gap-2 relative z-10">
                {tab.icon}
                {tab.adminOnly && !isAllowed && (
                  <span className="text-sm opacity-70">🔒</span>
                )}
              </div>
              
              <div className="text-center w-full px-1 relative z-10">
                <div className={`text-sm font-bold leading-tight mb-1 flex items-center justify-center gap-1 ${
                  isNerveCenter ? 'text-shadow' : ''
                }`}>
                  <span className="truncate">{tab.label}</span>
                  {isNerveCenter && (
                    <Badge className="text-[9px] px-1.5 py-0.5 h-4 bg-white/20 text-current border-white/30 font-bold backdrop-blur-sm">
                      AI
                    </Badge>
                  )}
                  {tab.adminOnly && isAllowed && tab.value !== 'admin' && (
                    <Badge className="text-[9px] px-1.5 py-0.5 h-4 bg-yellow-100 text-yellow-800 border-yellow-200 font-semibold">
                      ADMIN
                    </Badge>
                  )}
                </div>
                <div className={`text-xs leading-tight opacity-80 ${
                  isNerveCenter && isActive ? 'text-blue-100' : 
                  isNerveCenter ? 'text-blue-700' : 'text-gray-500'
                }`}>
                  {tab.description}
                </div>
              </div>
              
              {isActive && (
                <div className="flex items-center gap-1 mt-2 relative z-10">
                  <div className="w-1 h-1 bg-current rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Tablet: Enhanced 3-column grid */}
      <div className="hidden sm:grid lg:hidden grid-cols-3 gap-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;
          const isAllowed = isTabAllowed(tab.value);
          const isNerveCenter = tab.value === 'admin';
          
          return (
            <Card 
              key={tab.value}
              className={`
                transition-all duration-300 cursor-pointer min-h-[120px] 
                flex flex-col items-center justify-center p-5 relative overflow-hidden 
                rounded-xl border-2 shadow-md hover:shadow-xl hover:-translate-y-1
                ${!isAllowed ? 'opacity-60 cursor-not-allowed' : ''}
                ${isActive ? 'ring-2 ring-blue-400 ring-offset-2 shadow-xl transform scale-[1.02]' : ''}
                ${getTabStyles(tab)}
              `}
              onClick={() => handleTabClick(tab)}
              role="button"
              tabIndex={0}
              aria-label={`${tab.label} - ${tab.description}`}
            >
              {/* Active indicator overlay */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
              )}
              
              <div className="text-3xl mb-3 flex items-center gap-2 relative z-10">
                {tab.icon}
                {tab.adminOnly && !isAllowed && (
                  <span className="text-lg opacity-70">🔒</span>
                )}
              </div>
              
              <div className="text-center max-w-full px-2 relative z-10">
                <div className={`text-base font-bold leading-tight mb-2 flex items-center justify-center gap-2 ${
                  isNerveCenter ? 'text-shadow' : ''
                }`}>
                  <span className="truncate">{tab.label}</span>
                  {isNerveCenter && (
                    <Badge className="text-xs px-2 py-1 h-5 bg-white/20 text-current border-white/30 font-bold backdrop-blur-sm">
                      AI
                    </Badge>
                  )}
                  {tab.adminOnly && isAllowed && tab.value !== 'admin' && (
                    <Badge className="text-xs px-2 py-1 h-5 bg-yellow-100 text-yellow-800 border-yellow-200 font-semibold">
                      ADMIN
                    </Badge>
                  )}
                </div>
                <div className={`text-sm leading-tight opacity-80 ${
                  isNerveCenter && isActive ? 'text-blue-100' : 
                  isNerveCenter ? 'text-blue-700' : 'text-gray-500'
                }`}>
                  {tab.description}
                </div>
              </div>
              
              {isActive && (
                <div className="flex items-center gap-1 mt-3 relative z-10">
                  <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Desktop: Intelligent grid layout */}
      <div className="hidden lg:block">
        <div className="relative max-w-full">
          <div className={`
            grid gap-4 max-h-[75vh] overflow-y-auto pr-2
            ${tabs.length <= 8 ? "grid-cols-4" :
              tabs.length <= 12 ? "grid-cols-4 xl:grid-cols-6" :
              "grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"}
          `}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.value;
              const isAllowed = isTabAllowed(tab.value);
              const isNerveCenter = tab.value === 'admin';
              
              return (
                <Card 
                  key={tab.value}
                  className={`
                    transition-all duration-300 cursor-pointer min-h-[110px] w-full
                    flex flex-col items-center justify-center p-4 relative overflow-hidden 
                    rounded-xl border-2 shadow-md hover:shadow-xl hover:-translate-y-1 group
                    ${!isAllowed ? 'opacity-60 cursor-not-allowed' : ''}
                    ${isActive ? 'ring-2 ring-blue-400 ring-offset-2 shadow-xl transform scale-[1.02]' : ''}
                    ${getTabStyles(tab)}
                  `}
                  onClick={() => handleTabClick(tab)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${tab.label} - ${tab.description}`}
                >
                  {/* Active indicator overlay */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                  )}
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="text-2xl mb-2 flex items-center gap-1 relative z-10">
                    {tab.icon}
                    {tab.adminOnly && !isAllowed && (
                      <span className="text-sm opacity-70">🔒</span>
                    )}
                  </div>
                  
                  <div className="text-center w-full px-2 relative z-10">
                    <div className={`text-sm font-bold leading-tight mb-1 w-full flex items-center justify-center gap-1 ${
                      isNerveCenter ? 'text-shadow' : ''
                    }`}>
                      <span className="truncate max-w-full">{tab.label}</span>
                      {isNerveCenter && (
                        <Badge className="text-[9px] px-1 py-0.5 h-4 bg-white/20 text-current border-white/30 font-bold backdrop-blur-sm whitespace-nowrap">
                          AI
                        </Badge>
                      )}
                      {tab.adminOnly && isAllowed && tab.value !== 'admin' && (
                        <Badge className="text-[9px] px-1 py-0.5 h-4 bg-yellow-100 text-yellow-800 border-yellow-200 font-semibold whitespace-nowrap">
                          ADMIN
                        </Badge>
                      )}
                    </div>
                    <div className={`text-xs leading-tight w-full opacity-80 ${
                      isNerveCenter && isActive ? 'text-blue-100' : 
                      isNerveCenter ? 'text-blue-700' : 'text-gray-500'
                    }`}>
                      <span className="block truncate">{tab.description}</span>
                    </div>
                  </div>
                  
                  {isActive && (
                    <div className="flex items-center gap-1 mt-2 relative z-10">
                      <div className="w-2 h-0.5 bg-current rounded-full"></div>
                      <div className="w-4 h-0.5 bg-current rounded-full"></div>
                      <div className="w-2 h-0.5 bg-current rounded-full"></div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
          
          {/* Scroll Indicators */}
          {tabs.length > 12 && (
            <>
              <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white to-transparent pointer-events-none z-10"></div>
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>
            </>
          )}
        </div>
        
        {/* Enhanced Tab Status Display */}
        <div className="text-center mt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <p className="text-xs text-gray-600 font-medium">
              {tabs.filter(tab => isTabAllowed(tab.value)).length} of {tabs.length} services available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernTabNavigation;
