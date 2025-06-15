
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomerRegistration from './CustomerRegistration';
import VendorRegistration from './VendorRegistration';
import AdminRegistration from './AdminRegistration';
import OneCardDashboard from './OneCardDashboard';
import AdminPortal from './AdminPortal';
import ReportsTabContent from './onecard/ReportsTabContent';

interface PortalTabsProps {
  activeTab: string;
  showAdminTab: boolean;
  isTabAllowed: (tabValue: string) => boolean;
  handleTabChange: (value: string) => void;
  setIsAdminAuthenticated: (value: boolean) => void;
  isUnifiedProfile?: boolean;
}

const PortalTabs = ({ 
  activeTab, 
  showAdminTab, 
  isTabAllowed, 
  handleTabChange, 
  setIsAdminAuthenticated,
  isUnifiedProfile = false
}: PortalTabsProps) => {
  
  const tabs = [
    {
      value: 'onecard',
      label: 'OneCard',
      icon: '💳',
      description: 'Dashboard',
      color: 'purple'
    },
    {
      value: 'registration',
      label: 'Customer',
      icon: '👤',
      description: 'Register',
      color: 'green'
    },
    {
      value: 'vendor',
      label: 'Vendor',
      icon: '🏪',
      description: 'Partner',
      color: 'blue'
    },
    {
      value: 'unified-reports',
      label: 'Unified Reports',
      icon: '👑',
      description: 'Gold Card',
      color: 'yellow'
    },
    {
      value: 'admin-reg',
      label: 'Admin',
      icon: '🔐',
      description: 'Access',
      color: 'gray'
    }
  ];

  if (showAdminTab) {
    tabs.push({
      value: 'admin',
      label: 'Portal',
      icon: '⚙️',
      description: 'Control',
      color: 'gray'
    });
  }

  const getTabClassName = (tabValue: string, color: string) => {
    let baseClass = "flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300 min-h-[65px] flex-1 border text-xs shadow-sm relative overflow-hidden";
    
    const allowed = isTabAllowed(tabValue);
    
    if (!allowed && !isUnifiedProfile) {
      baseClass += " opacity-40 cursor-not-allowed bg-gray-100 text-gray-400 pointer-events-none border-gray-200";
    } else {
      const colorClasses = {
        purple: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-purple-400 bg-purple-50 border-purple-200 hover:border-purple-300 hover:bg-purple-100",
        green: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-green-400 bg-green-50 border-green-200 hover:border-green-300 hover:bg-green-100",
        blue: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-blue-400 bg-blue-50 border-blue-200 hover:border-blue-300 hover:bg-blue-100",
        gray: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-gray-600 data-[state=active]:to-slate-700 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-gray-400 bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-gray-100"
      };
      baseClass += " " + colorClasses[color];
      
      // Add unified profile indicator
      if (isUnifiedProfile && allowed) {
        baseClass += " ring-2 ring-orange-400 ring-opacity-50";
      }
    }
    
    return baseClass;
  };

  return (
    <div className="w-full max-w-6xl mx-auto pt-4">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        {/* Unified Profile Indicator */}
        {isUnifiedProfile && (
          <div className="mb-4 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg">
            <div className="flex items-center gap-2 text-orange-700">
              <span className="text-lg">🌟</span>
              <span className="font-semibold">Unified Access Active</span>
              <span className="text-sm opacity-75">- All tabs enabled</span>
            </div>
          </div>
        )}

        {/* Optimized Mobile-First Tab Navigation */}
        <div className="w-full mb-6">
          <TabsList className="w-full max-w-full">
            {/* Mobile: 2x3 Grid for better touch experience */}
            <div className="grid grid-cols-2 gap-2 w-full sm:hidden">
              {tabs.slice(0, 4).map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  className={getTabClassName(tab.value, tab.color)}
                  disabled={!isTabAllowed(tab.value) && !isUnifiedProfile}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <div className="text-center">
                    <div className="font-semibold leading-tight text-xs">{tab.label}</div>
                    <div className="text-xs opacity-75 leading-tight">{tab.description}</div>
                  </div>
                  {isUnifiedProfile && (
                    <div className="absolute top-1 right-1 w-2 h-2 bg-orange-400 rounded-full"></div>
                  )}
                </TabsTrigger>
              ))}
              {/* Second row for remaining tabs */}
              {tabs.slice(4, 6).map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  className={getTabClassName(tab.value, tab.color)}
                  disabled={!isTabAllowed(tab.value) && !isUnifiedProfile}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <div className="text-center">
                    <div className="font-semibold leading-tight text-xs">{tab.label}</div>
                    <div className="text-xs opacity-75 leading-tight">{tab.description}</div>
                  </div>
                  {isUnifiedProfile && (
                    <div className="absolute top-1 right-1 w-2 h-2 bg-orange-400 rounded-full"></div>
                  )}
                </TabsTrigger>
              ))}
            </div>

            {/* Tablet: Responsive grid */}
            <div className="hidden sm:grid sm:grid-cols-3 lg:hidden gap-2 w-full">
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  className={getTabClassName(tab.value, tab.color)}
                  disabled={!isTabAllowed(tab.value) && !isUnifiedProfile}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <div className="text-center">
                    <div className="font-semibold text-sm">{tab.label}</div>
                    <div className="text-xs opacity-75">{tab.description}</div>
                  </div>
                  {isUnifiedProfile && (
                    <div className="absolute top-1 right-1 w-2 h-2 bg-orange-400 rounded-full"></div>
                  )}
                </TabsTrigger>
              ))}
            </div>

            {/* Desktop: Single Row */}
            <div className={`hidden lg:grid gap-2 w-full ${showAdminTab ? 'grid-cols-6' : 'grid-cols-5'}`}>
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  className={getTabClassName(tab.value, tab.color)}
                  disabled={!isTabAllowed(tab.value) && !isUnifiedProfile}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <div className="text-center">
                    <div className="font-semibold text-sm">{tab.label}</div>
                    <div className="text-xs opacity-75">{tab.description}</div>
                  </div>
                  {isUnifiedProfile && (
                    <div className="absolute top-1 right-1 w-2 h-2 bg-orange-400 rounded-full"></div>
                  )}
                </TabsTrigger>
              ))}
            </div>
          </TabsList>
        </div>
        
        {/* Tab Content */}
        <div className="w-full">
          <TabsContent value="onecard" className="p-2 sm:p-4 lg:p-6 animate-fade-in">
            <OneCardDashboard />
          </TabsContent>
          
          <TabsContent value="registration" className="p-2 sm:p-4 lg:p-6 animate-fade-in">
            <CustomerRegistration />
          </TabsContent>
          
          <TabsContent value="vendor" className="p-2 sm:p-4 lg:p-6 animate-fade-in">
            <VendorRegistration />
          </TabsContent>

          <TabsContent value="unified-reports" className="p-2 sm:p-4 lg:p-6 animate-fade-in">
            <ReportsTabContent />
          </TabsContent>
          
          <TabsContent value="admin-reg" className="p-2 sm:p-4 lg:p-6 animate-fade-in">
            <AdminRegistration />
          </TabsContent>
          
          {showAdminTab && (
            <TabsContent value="admin" className="p-2 sm:p-4 lg:p-6 animate-fade-in">
              <AdminPortal onAuthSuccess={() => setIsAdminAuthenticated(true)} />
            </TabsContent>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default PortalTabs;
