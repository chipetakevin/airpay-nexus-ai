
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
    let baseClass = "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 min-h-[45px] w-full border text-xs shadow-sm";
    
    const allowed = isTabAllowed(tabValue);
    
    if (!allowed) {
      baseClass += " opacity-40 cursor-not-allowed bg-gray-100 text-gray-400 pointer-events-none border-gray-200";
    } else {
      switch (tabValue) {
        case 'registration':
          baseClass += " data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border-green-400 bg-green-50 border-green-200 hover:border-green-300 hover:bg-green-100 hover:shadow-md";
          break;
        case 'vendor':
          baseClass += " data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border-blue-400 bg-blue-50 border-blue-200 hover:border-blue-300 hover:bg-blue-100 hover:shadow-md";
          break;
        case 'onecard':
          baseClass += " data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border-purple-400 bg-purple-50 border-purple-200 hover:border-purple-300 hover:bg-purple-100 hover:shadow-md";
          break;
        case 'admin-reg':
        case 'admin':
          if (!isTabAllowed('admin-reg') && !isTabAllowed('admin')) {
            baseClass += " opacity-30 cursor-not-allowed bg-gray-200 text-gray-300 pointer-events-none border-gray-300";
          } else {
            baseClass += " data-[state=active]:bg-gradient-to-br data-[state=active]:from-gray-600 data-[state=active]:to-slate-700 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border-gray-400 bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-gray-100 hover:shadow-md";
          }
          break;
        default:
          baseClass += " data-[state=active]:bg-gradient-to-br data-[state=active]:from-indigo-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border-indigo-400 bg-indigo-50 border-indigo-200 hover:border-indigo-300 hover:bg-indigo-100 hover:shadow-md";
      }
    }
    
    return baseClass;
  };

  const getTabContent = (tabValue: string) => {
    if ((tabValue === 'admin-reg' || tabValue === 'admin') && !isTabAllowed(tabValue)) {
      return (
        <div className="flex flex-col items-center gap-0.5">
          <div className="text-sm opacity-30 blur-sm">🔒</div>
          <div className="text-center">
            <div className="text-xs font-semibold opacity-30 select-none pointer-events-none blur-sm">
              {tabValue === 'admin-reg' ? 'Admin' : 'Portal'}
            </div>
          </div>
        </div>
      );
    }

    switch (tabValue) {
      case 'registration':
        return (
          <div className="flex flex-col items-center gap-0.5">
            <div className="text-sm">👤</div>
            <div className="text-center">
              <div className="text-xs font-semibold">Customer</div>
              <div className="text-xs opacity-75">Registration</div>
            </div>
          </div>
        );
      case 'vendor':
        return (
          <div className="flex flex-col items-center gap-0.5">
            <div className="text-sm">🏪</div>
            <div className="text-center">
              <div className="text-xs font-semibold">Vendor</div>
              <div className="text-xs opacity-75">Partnership</div>
            </div>
          </div>
        );
      case 'onecard':
        return (
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-0.5">
              <div className="text-sm">🔥</div>
              <div className="text-xs">✨</div>
            </div>
            <div className="text-center">
              <div className="text-xs font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Smart Deals</div>
              <div className="text-xs opacity-75">Rewards</div>
            </div>
          </div>
        );
      case 'admin-reg':
        return (
          <div className="flex flex-col items-center gap-0.5">
            <div className="text-sm">🔐</div>
            <div className="text-center">
              <div className="text-xs font-semibold">Admin</div>
              <div className="text-xs opacity-75">Access</div>
            </div>
          </div>
        );
      case 'admin':
        return (
          <div className="flex flex-col items-center gap-0.5">
            <div className="text-sm">⚙️</div>
            <div className="text-center">
              <div className="text-xs font-semibold">Admin</div>
              <div className="text-xs opacity-75">Portal</div>
            </div>
          </div>
        );
      default:
        return tabValue;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto pt-6">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        {/* Mobile-First Tab Navigation */}
        <div className="w-full mb-6">
          <TabsList className="w-full bg-white/95 backdrop-blur-md shadow-lg border border-gray-200 rounded-2xl p-1.5">
            {/* Mobile: Horizontal Scroll */}
            <div className="flex lg:hidden w-full overflow-x-auto scrollbar-hide gap-1 pb-0.5">
              <TabsTrigger 
                value="registration" 
                className={getTabClassName('registration') + " flex-shrink-0 min-w-[70px]"}
                disabled={!isTabAllowed('registration')}
              >
                {getTabContent('registration')}
              </TabsTrigger>
              
              <TabsTrigger 
                value="vendor" 
                className={getTabClassName('vendor') + " flex-shrink-0 min-w-[70px]"}
                disabled={!isTabAllowed('vendor')}
              >
                {getTabContent('vendor')}
              </TabsTrigger>
              
              <TabsTrigger 
                value="onecard" 
                className={getTabClassName('onecard') + " flex-shrink-0 min-w-[70px]"}
                disabled={!isTabAllowed('onecard')}
              >
                {getTabContent('onecard')}
              </TabsTrigger>
              
              <TabsTrigger 
                value="admin-reg" 
                className={getTabClassName('admin-reg') + " flex-shrink-0 min-w-[70px]"}
                disabled={!isTabAllowed('admin-reg')}
              >
                {getTabContent('admin-reg')}
              </TabsTrigger>
              
              {showAdminTab && (
                <TabsTrigger 
                  value="admin" 
                  className={getTabClassName('admin') + " flex-shrink-0 min-w-[70px]"}
                  disabled={!isTabAllowed('admin')}
                >
                  {getTabContent('admin')}
                </TabsTrigger>
              )}
            </div>

            {/* Desktop: Grid Layout */}
            <div className={`hidden lg:grid w-full gap-2 ${showAdminTab ? 'grid-cols-5' : 'grid-cols-4'}`}>
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
        </div>
        
        {/* Tab Content */}
        <div className="w-full">
          <TabsContent value="registration" className="p-3 sm:p-4 lg:p-6 animate-fade-in">
            <CustomerRegistration />
          </TabsContent>
          
          <TabsContent value="vendor" className="p-3 sm:p-4 lg:p-6 animate-fade-in">
            <VendorRegistration />
          </TabsContent>
          
          <TabsContent value="onecard" className="p-3 sm:p-4 lg:p-6 animate-fade-in">
            <OneCardDashboard />
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
