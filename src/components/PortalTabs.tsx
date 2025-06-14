
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
    let baseClass = "flex flex-col items-center gap-3 p-4 md:p-6 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:scale-102 min-h-[120px] md:min-h-[140px]";
    
    const allowed = isTabAllowed(tabValue);
    
    if (!allowed) {
      baseClass += " opacity-30 cursor-not-allowed bg-gray-100 text-gray-400 pointer-events-none";
    } else {
      switch (tabValue) {
        case 'registration':
          baseClass += " data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:border-green-300";
          break;
        case 'vendor':
          baseClass += " data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 hover:border-blue-300";
          break;
        case 'onecard':
          baseClass += " data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 hover:border-purple-300 animate-pulse";
          break;
        case 'admin-reg':
        case 'admin':
          if (!isTabAllowed('admin-reg') && !isTabAllowed('admin')) {
            baseClass += " opacity-20 cursor-not-allowed bg-gray-200 text-gray-300 pointer-events-none";
          } else {
            baseClass += " data-[state=active]:bg-gradient-to-br data-[state=active]:from-gray-600 data-[state=active]:to-slate-700 data-[state=active]:text-white data-[state=active]:shadow-xl bg-gradient-to-br from-gray-50 to-slate-50 border-2 border-gray-200 hover:border-gray-300";
          }
          break;
        default:
          baseClass += " data-[state=active]:bg-gradient-to-br data-[state=active]:from-indigo-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-xl bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200 hover:border-indigo-300";
      }
    }
    
    return baseClass;
  };

  const getTabContent = (tabValue: string) => {
    if ((tabValue === 'admin-reg' || tabValue === 'admin') && !isTabAllowed(tabValue)) {
      return (
        <div className="flex flex-col items-center gap-3">
          <div className="text-4xl md:text-5xl opacity-30 blur-sm">🔒</div>
          <div className="text-center">
            <div className="text-sm md:text-base font-bold opacity-30 select-none pointer-events-none blur-sm">
              {tabValue === 'admin-reg' ? 'Admin' : 'Portal'}
            </div>
            <div className="text-xs opacity-30 select-none pointer-events-none blur-sm">
              {tabValue === 'admin-reg' ? 'Access' : 'Control'}
            </div>
          </div>
        </div>
      );
    }

    switch (tabValue) {
      case 'registration':
        return (
          <div className="flex flex-col items-center gap-3">
            <div className="text-4xl md:text-5xl">👤</div>
            <div className="text-center">
              <div className="text-sm md:text-base font-bold">Customer</div>
              <div className="text-xs opacity-75">Registration</div>
              <div className="text-xs opacity-60 mt-1">Join AirPay & OneCard</div>
            </div>
          </div>
        );
      case 'vendor':
        return (
          <div className="flex flex-col items-center gap-3">
            <div className="text-4xl md:text-5xl">🏪</div>
            <div className="text-center">
              <div className="text-sm md:text-base font-bold">Vendor</div>
              <div className="text-xs opacity-75">Partnership</div>
              <div className="text-xs opacity-60 mt-1">Business Solutions</div>
            </div>
          </div>
        );
      case 'onecard':
        return (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="animate-bounce text-4xl md:text-5xl">🔥</div>
              <div className="animate-pulse text-2xl md:text-3xl">✨</div>
            </div>
            <div className="text-center">
              <div className="text-sm md:text-base font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Smart Deals</div>
              <div className="text-xs opacity-75">Rewards & Offers</div>
              <div className="text-xs opacity-60 mt-1">AI-Powered Savings</div>
            </div>
          </div>
        );
      case 'admin-reg':
        return (
          <div className="flex flex-col items-center gap-3">
            <div className="text-4xl md:text-5xl">🔐</div>
            <div className="text-center">
              <div className="text-sm md:text-base font-bold">Admin</div>
              <div className="text-xs opacity-75">Access</div>
              <div className="text-xs opacity-60 mt-1">System Entry</div>
            </div>
          </div>
        );
      case 'admin':
        return (
          <div className="flex flex-col items-center gap-3">
            <div className="text-4xl md:text-5xl">⚙️</div>
            <div className="text-center">
              <div className="text-sm md:text-base font-bold">Admin</div>
              <div className="text-xs opacity-75">Portal</div>
              <div className="text-xs opacity-60 mt-1">System Control</div>
            </div>
          </div>
        );
      default:
        return tabValue;
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="w-full bg-white/95 backdrop-blur-md shadow-xl border-2 border-gray-100 rounded-2xl p-4 mb-8">
        <div className={`grid w-full gap-4 ${showAdminTab ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}`}>
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
      
      <TabsContent value="registration" className="p-4 sm:p-6 animate-fade-in">
        <CustomerRegistration />
      </TabsContent>
      
      <TabsContent value="vendor" className="p-4 sm:p-6 animate-fade-in">
        <VendorRegistration />
      </TabsContent>
      
      <TabsContent value="onecard" className="p-4 sm:p-6 animate-fade-in">
        <OneCardDashboard />
      </TabsContent>
      
      <TabsContent value="admin-reg" className="p-4 sm:p-6 animate-fade-in">
        <AdminRegistration />
      </TabsContent>
      
      {showAdminTab && (
        <TabsContent value="admin" className="p-4 sm:p-6 animate-fade-in">
          <AdminPortal onAuthSuccess={() => setIsAdminAuthenticated(true)} />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default PortalTabs;
