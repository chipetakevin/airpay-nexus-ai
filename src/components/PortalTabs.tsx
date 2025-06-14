
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomerRegistration from './CustomerRegistration';
import VendorRegistration from './VendorRegistration';
import AdminRegistration from './AdminRegistration';
import OneCardDashboard from './OneCardDashboard';
import AdminPortal from './AdminPortal';

interface PortalTabsProps {
  activeTab: string;
  showAdminTab: boolean;
  isTabAllowed: (tabValue: string) => boolean;
  handleTabChange: (value: string) => void;
  setIsAdminAuthenticated: (value: boolean) => void;
}

const PortalTabs = ({ 
  activeTab, 
  showAdminTab, 
  isTabAllowed, 
  handleTabChange, 
  setIsAdminAuthenticated 
}: PortalTabsProps) => {
  
  const tabs = [
    {
      value: 'deals',
      label: 'Smart Deals',
      icon: '🔥',
      description: 'Shop Now',
      color: 'orange'
    },
    {
      value: 'onecard',
      label: 'Overview',
      icon: '📊',
      description: 'Dashboard',
      color: 'purple'
    },
    {
      value: 'registration',
      label: 'Customer',
      icon: '👤',
      description: 'Registration',
      color: 'green'
    },
    {
      value: 'vendor',
      label: 'Vendor',
      icon: '🏪',
      description: 'Partnership',
      color: 'blue'
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
      description: 'Admin',
      color: 'gray'
    });
  }

  const getTabClassName = (tabValue: string, color: string) => {
    let baseClass = "flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-300 min-h-[60px] w-full border text-xs shadow-sm relative overflow-hidden";
    
    const allowed = isTabAllowed(tabValue);
    
    if (!allowed) {
      baseClass += " opacity-40 cursor-not-allowed bg-gray-100 text-gray-400 pointer-events-none border-gray-200";
    } else {
      const colorClasses = {
        orange: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-orange-400 bg-orange-50 border-orange-200 hover:border-orange-300 hover:bg-orange-100",
        purple: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-purple-400 bg-purple-50 border-purple-200 hover:border-purple-300 hover:bg-purple-100",
        green: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-green-400 bg-green-50 border-green-200 hover:border-green-300 hover:bg-green-100",
        blue: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-blue-400 bg-blue-50 border-blue-200 hover:border-blue-300 hover:bg-blue-100",
        gray: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-gray-600 data-[state=active]:to-slate-700 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-gray-400 bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-gray-100"
      };
      baseClass += " " + colorClasses[color];
    }
    
    return baseClass;
  };

  return (
    <div className="w-full max-w-6xl mx-auto pt-6">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        {/* Mobile-First Tab Navigation */}
        <div className="w-full mb-6">
          <TabsList className="w-full">
            {/* Mobile: 2x3 Grid */}
            <div className="grid grid-cols-2 gap-2 w-full sm:hidden">
              {tabs.slice(0, 6).map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  className={getTabClassName(tab.value, tab.color)}
                  disabled={!isTabAllowed(tab.value)}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <div className="text-center">
                    <div className="font-semibold leading-tight">{tab.label}</div>
                    <div className="text-xs opacity-75 leading-tight">{tab.description}</div>
                  </div>
                </TabsTrigger>
              ))}
            </div>

            {/* Tablet: 3x2 Grid */}
            <div className="hidden sm:grid sm:grid-cols-3 lg:hidden gap-3 w-full">
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  className={getTabClassName(tab.value, tab.color)}
                  disabled={!isTabAllowed(tab.value)}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <div className="text-center">
                    <div className="font-semibold text-sm">{tab.label}</div>
                    <div className="text-xs opacity-75">{tab.description}</div>
                  </div>
                </TabsTrigger>
              ))}
            </div>

            {/* Desktop: Single Row */}
            <div className={`hidden lg:grid gap-3 w-full ${showAdminTab ? 'grid-cols-6' : 'grid-cols-5'}`}>
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  className={getTabClassName(tab.value, tab.color)}
                  disabled={!isTabAllowed(tab.value)}
                >
                  <span className="text-2xl">{tab.icon}</span>
                  <div className="text-center">
                    <div className="font-semibold text-sm">{tab.label}</div>
                    <div className="text-xs opacity-75">{tab.description}</div>
                  </div>
                </TabsTrigger>
              ))}
            </div>
          </TabsList>
        </div>
        
        {/* Tab Content */}
        <div className="w-full">
          <TabsContent value="deals" className="p-3 sm:p-4 lg:p-6 animate-fade-in">
            <OneCardDashboard />
          </TabsContent>
          
          <TabsContent value="onecard" className="p-3 sm:p-4 lg:p-6 animate-fade-in">
            <OneCardDashboard />
          </TabsContent>
          
          <TabsContent value="registration" className="p-3 sm:p-4 lg:p-6 animate-fade-in">
            <CustomerRegistration />
          </TabsContent>
          
          <TabsContent value="vendor" className="p-3 sm:p-4 lg:p-6 animate-fade-in">
            <VendorRegistration />
          </TabsContent>
          
          <TabsContent value="admin-reg" className="p-3 sm:p-4 lg:p-6 animate-fade-in">
            <AdminRegistration />
          </TabsContent>
          
          {showAdminTab && (
            <TabsContent value="admin" className="p-3 sm:p-4 lg:p-6 animate-fade-in">
              <AdminPortal onAuthSuccess={() => setIsAdminAuthenticated(true)} />
            </TabsContent>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default PortalTabs;
