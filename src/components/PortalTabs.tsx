
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomerRegistration from './CustomerRegistration';
import VendorRegistration from './VendorRegistration';
import AdminRegistration from './AdminRegistration';
import OneCardDashboard from './OneCardDashboard';
import AdminPortal from './AdminPortal';
import ReportsTabContent from './onecard/ReportsTabContent';
import AirtimeDealsSystem from './AirtimeDealsSystem';

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
  
  const tabs = [
    {
      value: 'deals',
      label: 'Smart Deals',
      icon: '🔥',
      description: 'Shop Now',
      color: 'bg-gradient-to-br from-orange-500 to-red-600'
    },
    {
      value: 'onecard',
      label: 'OneCard',
      icon: '💳',
      description: 'Dashboard',
      color: 'bg-gradient-to-br from-purple-500 to-pink-600'
    },
    {
      value: 'registration',
      label: 'Customer',
      icon: '👤',
      description: 'Register',
      color: 'bg-gradient-to-br from-green-500 to-emerald-600'
    },
    {
      value: 'vendor',
      label: 'Vendor',
      icon: '🏪',
      description: 'Partner',
      color: 'bg-gradient-to-br from-blue-500 to-cyan-600'
    },
    {
      value: 'unified-reports',
      label: 'Unified Reports',
      icon: '👑',
      description: 'Gold Card',
      color: 'bg-gradient-to-br from-yellow-500 to-amber-600'
    },
    {
      value: 'admin-reg',
      label: 'Admin',
      icon: '🔐',
      description: 'Access',
      color: 'bg-gradient-to-br from-gray-600 to-slate-700'
    }
  ];

  if (showAdminTab) {
    tabs.push({
      value: 'admin',
      label: 'Portal',
      icon: '⚙️',
      description: 'Control',
      color: 'bg-gradient-to-br from-gray-600 to-slate-700'
    });
  }

  const getTabClassName = (tabValue: string, color: string) => {
    const allowed = isTabAllowed(tabValue);
    
    if (!allowed && !isUnifiedProfile) {
      return "flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 min-h-[80px] flex-1 border text-sm opacity-40 cursor-not-allowed bg-gray-100 text-gray-400 pointer-events-none border-gray-200";
    } else {
      return `flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 min-h-[80px] flex-1 border text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1 data-[state=active]:${color} data-[state=active]:text-white data-[state=active]:border-transparent bg-white border-gray-200 hover:border-gray-300 text-gray-700`;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        {/* Mobile-Optimized Tab Navigation */}
        <div className="w-full mb-8">
          <TabsList className="w-full max-w-full bg-gray-50 p-2 rounded-2xl">
            {/* Mobile: 2x3 Grid */}
            <div className="grid grid-cols-2 gap-3 w-full sm:hidden">
              {tabs.slice(0, 4).map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  className={getTabClassName(tab.value, tab.color)}
                  disabled={!isTabAllowed(tab.value) && !isUnifiedProfile}
                >
                  <span className="text-2xl mb-1">{tab.icon}</span>
                  <div className="text-center">
                    <div className="font-semibold leading-tight text-sm">{tab.label}</div>
                    <div className="text-xs opacity-75 leading-tight">{tab.description}</div>
                  </div>
                </TabsTrigger>
              ))}
              {/* Second row */}
              {tabs.slice(4, 6).map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  className={getTabClassName(tab.value, tab.color)}
                  disabled={!isTabAllowed(tab.value) && !isUnifiedProfile}
                >
                  <span className="text-2xl mb-1">{tab.icon}</span>
                  <div className="text-center">
                    <div className="font-semibold leading-tight text-sm">{tab.label}</div>
                    <div className="text-xs opacity-75 leading-tight">{tab.description}</div>
                  </div>
                </TabsTrigger>
              ))}
            </div>

            {/* Tablet and Desktop: Responsive grids */}
            <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-7 gap-3 w-full">
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  className={getTabClassName(tab.value, tab.color)}
                  disabled={!isTabAllowed(tab.value) && !isUnifiedProfile}
                >
                  <span className="text-2xl mb-1">{tab.icon}</span>
                  <div className="text-center">
                    <div className="font-semibold text-sm">{tab.label}</div>
                    <div className="text-xs opacity-75">{tab.description}</div>
                  </div>
                </TabsTrigger>
              ))}
            </div>
          </TabsList>
        </div>
        
        {/* Tab Content with Enhanced Mobile Styling */}
        <div className="w-full">
          <TabsContent value="deals" className="p-0 animate-fade-in">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <AirtimeDealsSystem />
            </div>
          </TabsContent>
          
          <TabsContent value="onecard" className="p-0 animate-fade-in">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <OneCardDashboard />
            </div>
          </TabsContent>
          
          <TabsContent value="registration" className="p-0 animate-fade-in">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <CustomerRegistration />
            </div>
          </TabsContent>
          
          <TabsContent value="vendor" className="p-0 animate-fade-in">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <VendorRegistration />
            </div>
          </TabsContent>

          <TabsContent value="unified-reports" className="p-0 animate-fade-in">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <ReportsTabContent />
            </div>
          </TabsContent>
          
          <TabsContent value="admin-reg" className="p-0 animate-fade-in">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <AdminRegistration />
            </div>
          </TabsContent>
          
          {showAdminTab && (
            <TabsContent value="admin" className="p-0 animate-fade-in">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <AdminPortal onAuthSuccess={() => setIsAdminAuthenticated(true)} />
              </div>
            </TabsContent>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default PortalTabs;
