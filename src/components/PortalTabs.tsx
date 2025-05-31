
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
    let baseClass = "text-xs sm:text-sm py-3 sm:py-4 px-1 sm:px-4 transition-all duration-200";
    
    // Check if tab is allowed
    const allowed = isTabAllowed(tabValue);
    
    if (!allowed) {
      baseClass += " opacity-30 cursor-not-allowed bg-gray-100 text-gray-400";
    } else {
      switch (tabValue) {
        case 'vendor':
          baseClass += " text-yellow-600 hover:bg-yellow-50";
          break;
        case 'admin-reg':
        case 'admin':
          baseClass += ` text-red-600 hover:bg-red-50 ${tabValue === 'admin' ? 'font-bold' : ''}`;
          break;
        default:
          baseClass += " hover:bg-blue-50";
      }
    }
    
    return baseClass;
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className={`grid w-full ${showAdminTab ? 'grid-cols-5' : 'grid-cols-4'} bg-gray-100 h-auto`}>
        <TabsTrigger 
          value="registration" 
          className={getTabClassName('registration')}
          disabled={!isTabAllowed('registration')}
        >
          <span className="hidden sm:inline">Customer Registration</span>
          <span className="sm:hidden">Customer</span>
        </TabsTrigger>
        <TabsTrigger 
          value="vendor" 
          className={getTabClassName('vendor')}
          disabled={!isTabAllowed('vendor')}
        >
          <span className="hidden sm:inline">Become a Vendor</span>
          <span className="sm:hidden">Vendor</span>
        </TabsTrigger>
        <TabsTrigger 
          value="onecard" 
          className={getTabClassName('onecard')}
          disabled={!isTabAllowed('onecard')}
        >
          <span className="hidden sm:inline">OneCard Rewards</span>
          <span className="sm:hidden">OneCard</span>
        </TabsTrigger>
        <TabsTrigger 
          value="admin-reg" 
          className={getTabClassName('admin-reg')}
          disabled={!isTabAllowed('admin-reg')}
        >
          <span className="hidden sm:inline">Admin</span>
          <span className="sm:hidden">Admin</span>
        </TabsTrigger>
        {showAdminTab && (
          <TabsTrigger 
            value="admin" 
            className={getTabClassName('admin')}
            disabled={!isTabAllowed('admin')}
          >
            <span className="hidden sm:inline">Admin Portal</span>
            <span className="sm:hidden">Portal</span>
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
