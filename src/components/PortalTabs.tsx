
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
  
  const getTabClassName = (tabValue: string) => {
    let baseClass = "flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-300 hover:bg-gray-50";
    
    const allowed = isTabAllowed(tabValue);
    
    if (!allowed) {
      baseClass += " opacity-30 cursor-not-allowed bg-gray-100 text-gray-400";
    } else {
      switch (tabValue) {
        case 'vendor':
          baseClass += " data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg";
          break;
        case 'onecard':
          baseClass += " data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg animate-pulse";
          break;
        case 'admin-reg':
        case 'admin':
          if (!isTabAllowed('admin-reg') && !isTabAllowed('admin')) {
            baseClass += " opacity-20 cursor-not-allowed bg-gray-200 text-gray-300 pointer-events-none";
          } else {
            baseClass += " data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg";
          }
          break;
        default:
          baseClass += " data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg";
      }
    }
    
    return baseClass;
  };

  const getTabContent = (tabValue: string) => {
    if ((tabValue === 'admin-reg' || tabValue === 'admin') && !isTabAllowed(tabValue)) {
      return (
        <div className="flex flex-col items-center gap-1">
          <span className="text-lg opacity-30 blur-sm">🔒</span>
          <span className="text-xs opacity-30 select-none pointer-events-none blur-sm">
            {tabValue === 'admin-reg' ? 'Admin' : 'Portal'}
          </span>
        </div>
      );
    }

    switch (tabValue) {
      case 'registration':
        return (
          <div className="flex flex-col items-center gap-1">
            <span className="text-lg">👤</span>
            <span className="text-xs font-medium">Customer</span>
            <span className="text-xs opacity-75">Registration</span>
          </div>
        );
      case 'vendor':
        return (
          <div className="flex flex-col items-center gap-1">
            <span className="text-lg">🏪</span>
            <span className="text-xs font-medium">Vendor</span>
            <span className="text-xs opacity-75">Partnership</span>
          </div>
        );
      case 'onecard':
        return (
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1">
              <span className="animate-bounce text-lg">🔥</span>
              <span className="animate-pulse">✨</span>
            </div>
            <span className="text-xs font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Smart Deals</span>
            <span className="text-xs opacity-75">Rewards</span>
          </div>
        );
      case 'admin-reg':
        return (
          <div className="flex flex-col items-center gap-1">
            <span className="text-lg">🔐</span>
            <span className="text-xs font-medium">Admin</span>
            <span className="text-xs opacity-75">Access</span>
          </div>
        );
      case 'admin':
        return (
          <div className="flex flex-col items-center gap-1">
            <span className="text-lg">⚙️</span>
            <span className="text-xs font-medium">Admin</span>
            <span className="text-xs opacity-75">Portal</span>
          </div>
        );
      default:
        return tabValue;
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="w-full bg-white shadow-sm border rounded-xl p-2 mb-6">
        <div className={`grid w-full gap-2 ${showAdminTab ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5' : 'grid-cols-2 sm:grid-cols-4'}`}>
          <TabsTrigger 
            value="registration" 
            className={getTabClassName('registration')}
            disabled={!isTabAllowed('registration')}
          >
            {getTabContent('registration')}
          </TabsTrigger>
          
          <TabsTrigger 
            value="vendor" 
            className={getTabClassName('vendor')}
            disabled={!isTabAllowed('vendor')}
          >
            {getTabContent('vendor')}
          </TabsTrigger>
          
          <TabsTrigger 
            value="onecard" 
            className={getTabClassName('onecard')}
            disabled={!isTabAllowed('onecard')}
          >
            {getTabContent('onecard')}
          </TabsTrigger>
          
          <TabsTrigger 
            value="admin-reg" 
            className={getTabClassName('admin-reg')}
            disabled={!isTabAllowed('admin-reg')}
          >
            {getTabContent('admin-reg')}
          </TabsTrigger>
          
          {showAdminTab && (
            <TabsTrigger 
              value="admin" 
              className={getTabClassName('admin')}
              disabled={!isTabAllowed('admin')}
            >
              {getTabContent('admin')}
            </TabsTrigger>
          )}
        </div>
      </TabsList>
      
      <TabsContent value="registration" className="p-4 sm:p-6">
        <CustomerRegistration />
      </TabsContent>
      
      <TabsContent value="vendor" className="p-4 sm:p-6">
        <VendorRegistration />
      </TabsContent>
      
      <TabsContent value="onecard" className="p-4 sm:p-6">
        <OneCardDashboard />
      </TabsContent>
      
      <TabsContent value="admin-reg" className="p-4 sm:p-6">
        <AdminRegistration />
      </TabsContent>
      
      {showAdminTab && (
        <TabsContent value="admin" className="p-4 sm:p-6">
          <AdminPortal onAuthSuccess={() => setIsAdminAuthenticated(true)} />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default PortalTabs;
