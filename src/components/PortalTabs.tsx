import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomerRegistration from './CustomerRegistration';
import VendorRegistration from './VendorRegistration';
import AdminRegistration from './AdminRegistration';
import OneCardDashboard from './OneCardDashboard';
import AdminPortal from './AdminPortal';
import ReportsTabContent from './onecard/ReportsTabContent';
import AirtimeDealsSystem from './AirtimeDealsSystem';
import TabSwitcher from './navigation/TabSwitcher';

interface PortalTabsProps {
  activeTab: string;
  showAdminTab: boolean;
  isTabAllowed: (tabValue: string) => boolean;
  handleTabChange: (value: string) => void;
  setIsAdminAuthenticated: (value: boolean) => void;
  isUnifiedProfile?: boolean;
  isAuthenticated?: boolean;
}

const PortalTabs = ({ 
  activeTab, 
  showAdminTab, 
  isTabAllowed, 
  handleTabChange, 
  setIsAdminAuthenticated,
  isUnifiedProfile = false,
  isAuthenticated = false
}: PortalTabsProps) => {
  
  // Get user data for tab switcher
  const getUserData = () => {
    try {
      const credentials = localStorage.getItem('userCredentials');
      if (credentials) {
        const userCreds = JSON.parse(credentials);
        const userData = localStorage.getItem('onecardUser');
        if (userData) {
          const user = JSON.parse(userData);
          return { name: user.firstName, isAuth: true };
        }
      }
    } catch (error) {
      console.log('No user data found');
    }
    return { name: '', isAuth: false };
  };

  const { name: userName, isAuth: userAuthenticated } = getUserData();

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
    let baseClass = "flex flex-col items-center gap-1 p-2 sm:p-3 rounded-xl transition-all duration-300 min-h-[60px] sm:min-h-[65px] flex-1 border text-xs shadow-sm relative overflow-hidden";
    
    const allowed = isTabAllowed(tabValue);
    
    if (!allowed && !isUnifiedProfile) {
      baseClass += " opacity-40 cursor-not-allowed bg-gray-100 text-gray-400 pointer-events-none border-gray-200";
    } else {
      const colorClasses = {
        orange: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-orange-400 bg-orange-50 border-orange-200 hover:border-orange-300 hover:bg-orange-100",
        purple: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-purple-400 bg-purple-50 border-purple-200 hover:border-purple-300 hover:bg-purple-100",
        green: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-green-400 bg-green-50 border-green-200 hover:border-green-300 hover:bg-green-100",
        blue: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-blue-400 bg-blue-50 border-blue-200 hover:border-blue-300 hover:bg-blue-100",
        yellow: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-yellow-500 data-[state=active]:to-amber-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-yellow-400 bg-yellow-50 border-yellow-200 hover:border-yellow-300 hover:bg-yellow-100",
        gray: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-gray-600 data-[state=active]:to-slate-700 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-gray-400 bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-gray-100"
      };
      baseClass += " " + colorClasses[color];
    }
    
    return baseClass;
  };

  return (
    <div className="w-full max-w-6xl mx-auto pt-4">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        {/* Add Tab Switcher for seamless navigation */}
        <TabSwitcher 
          currentTab={activeTab}
          onTabChange={handleTabChange}
          isAuthenticated={userAuthenticated}
          userName={userName}
        />

        {/* Mobile-Optimized Tab Navigation */}
        <div className="w-full mb-6">
          <TabsList className="w-full max-w-full bg-gradient-to-r from-gray-50 to-gray-100 p-1 sm:p-1.5">
            {/* Mobile: 2x3 Grid with better spacing */}
            <div className="grid grid-cols-2 gap-1 w-full sm:hidden">
              {tabs.slice(0, 4).map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  className={getTabClassName(tab.value, tab.color)}
                  disabled={!isTabAllowed(tab.value) && !isUnifiedProfile}
                >
                  <span className="text-base sm:text-lg">{tab.icon}</span>
                  <div className="text-center">
                    <div className="font-semibold leading-tight text-xs">{tab.label}</div>
                    <div className="text-xs opacity-75 leading-tight">{tab.description}</div>
                  </div>
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
                  <span className="text-base sm:text-lg">{tab.icon}</span>
                  <div className="text-center">
                    <div className="font-semibold leading-tight text-xs">{tab.label}</div>
                    <div className="text-xs opacity-75 leading-tight">{tab.description}</div>
                  </div>
                </TabsTrigger>
              ))}
            </div>

            {/* Tablet: Responsive grid */}
            <div className="hidden sm:grid sm:grid-cols-3 lg:hidden gap-1.5 w-full">
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
                </TabsTrigger>
              ))}
            </div>

            {/* Desktop: Single Row */}
            <div className={`hidden lg:grid gap-1.5 w-full ${showAdminTab ? 'grid-cols-7' : 'grid-cols-6'}`}>
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
                </TabsTrigger>
              ))}
            </div>
          </TabsList>
        </div>
        
        {/* Tab Content - Optimized for top positioning */}
        <div className="w-full">
          <TabsContent value="deals" className="p-1 sm:p-2 md:p-4 lg:p-6 animate-fade-in">
            <AirtimeDealsSystem />
          </TabsContent>
          
          <TabsContent value="onecard" className="p-1 sm:p-2 md:p-4 lg:p-6 animate-fade-in">
            <OneCardDashboard />
          </TabsContent>
          
          <TabsContent value="registration" className="p-1 sm:p-2 md:p-4 lg:p-6 animate-fade-in">
            <div className="w-full max-w-4xl mx-auto">
              <CustomerRegistration />
            </div>
          </TabsContent>
          
          <TabsContent value="vendor" className="p-0 animate-fade-in">
            <VendorRegistration />
          </TabsContent>

          <TabsContent value="unified-reports" className="p-1 sm:p-2 md:p-4 lg:p-6 animate-fade-in">
            <ReportsTabContent />
          </TabsContent>
          
          <TabsContent value="admin-reg" className="p-1 sm:p-2 md:p-4 lg:p-6 animate-fade-in">
            <AdminRegistration />
          </TabsContent>
          
          {showAdminTab && (
            <TabsContent value="admin" className="p-1 sm:p-2 md:p-4 lg:p-6 animate-fade-in">
              <AdminPortal onAuthSuccess={() => setIsAdminAuthenticated(true)} />
            </TabsContent>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default PortalTabs;
