
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
    let baseClass = "text-xs sm:text-sm py-3 sm:py-4 px-1 sm:px-4 transition-all duration-200 relative";
    
    // Check if tab is allowed
    const allowed = isTabAllowed(tabValue);
    
    if (!allowed) {
      baseClass += " opacity-30 cursor-not-allowed bg-gray-100 text-gray-400";
    } else {
      switch (tabValue) {
        case 'vendor':
          baseClass += " text-yellow-600 hover:bg-yellow-50";
          break;
        case 'onecard':
          // Smart Deals tab with maximum attention animation
          baseClass += ` text-blue-600 hover:bg-blue-50 
            animate-pulse 
            before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-blue-400 before:via-purple-500 before:to-green-400 before:p-[2px] before:animate-pulse before:-z-10
            after:absolute after:inset-[2px] after:rounded-lg after:bg-white after:-z-10
            shadow-lg shadow-blue-500/50 animate-[pulse_1.5s_ease-in-out_infinite]
            font-semibold
            bg-gradient-to-r from-blue-50 to-purple-50
            border-2 border-transparent bg-clip-padding
            hover:shadow-xl hover:shadow-blue-600/60
            transform hover:scale-105`;
          break;
        case 'admin-reg':
        case 'admin':
          // Gray out admin tabs for non-admin users
          if (!isTabAllowed('admin-reg') && !isTabAllowed('admin')) {
            baseClass += " opacity-20 cursor-not-allowed bg-gray-200 text-gray-300 pointer-events-none";
          } else {
            baseClass += ` text-red-600 hover:bg-red-50 ${tabValue === 'admin' ? 'font-bold' : ''}`;
          }
          break;
        default:
          baseClass += " hover:bg-blue-50";
      }
    }
    
    return baseClass;
  };

  const getTabContent = (tabValue: string) => {
    // For admin tabs, show grayed out unreadable text for non-admin users
    if ((tabValue === 'admin-reg' || tabValue === 'admin') && !isTabAllowed(tabValue)) {
      return (
        <span className="opacity-30 text-gray-400 select-none pointer-events-none blur-sm">
          {tabValue === 'admin-reg' ? (
            <>
              <span className="hidden sm:inline">■■■■■</span>
              <span className="sm:hidden">■■■</span>
            </>
          ) : (
            <>
              <span className="hidden sm:inline">■■■■■ ■■■■■■</span>
              <span className="sm:hidden">■■■■■■</span>
            </>
          )}
        </span>
      );
    }

    // Normal tab content for allowed tabs with special styling for Smart Deals
    switch (tabValue) {
      case 'registration':
        return (
          <>
            <span className="hidden sm:inline">Customer Registration</span>
            <span className="sm:hidden">Customer</span>
          </>
        );
      case 'vendor':
        return (
          <>
            <span className="hidden sm:inline">Become a Vendor</span>
            <span className="sm:hidden">Vendor</span>
          </>
        );
      case 'onecard':
        return (
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="animate-bounce text-lg">🔥</span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
              <span className="hidden sm:inline">Smart Deals</span>
              <span className="sm:hidden">Deals</span>
            </span>
            <span className="animate-pulse">✨</span>
          </div>
        );
      case 'admin-reg':
        return (
          <>
            <span className="hidden sm:inline">Admin</span>
            <span className="sm:hidden">Admin</span>
          </>
        );
      case 'admin':
        return (
          <>
            <span className="hidden sm:inline">Admin Portal</span>
            <span className="sm:hidden">Portal</span>
          </>
        );
      default:
        return tabValue;
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className={`grid w-full ${showAdminTab ? 'grid-cols-5' : 'grid-cols-4'} bg-gray-100 h-auto`}>
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
