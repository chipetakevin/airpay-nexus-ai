
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import CustomerRegistration from './CustomerRegistration';
import VendorRegistration from './VendorRegistration';
import AdminRegistration from './AdminRegistration';
import OneCardDashboard from './OneCardDashboard';
import AdminPortal from './AdminPortal';
import ReportsTabContent from './onecard/ReportsTabContent';
import AirtimeDealsSystem from './AirtimeDealsSystem';
import TabSwitcher from './navigation/TabSwitcher';
import ModernTabNavigation from './navigation/ModernTabNavigation';

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

  // Enhanced tabs with consistent wording and proper mobile layout
  const tabs = [
    {
      value: 'deals',
      label: 'Smart Deals',
      icon: '🔥',
      description: 'Live Offers',
      color: 'orange'
    },
    {
      value: 'onecard',
      label: 'OneCard',
      icon: '💳',
      description: 'My Card',
      color: 'purple'
    },
    {
      value: 'registration',
      label: 'Customer',
      icon: '👤',
      description: 'Sign Up',
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
      label: 'Reports',
      icon: '👑',
      description: 'Gold Access',
      color: 'yellow'
    },
    {
      value: 'admin-reg',
      label: 'Admin',
      icon: '🔐',
      description: 'Control',
      color: 'gray'
    }
  ];

  if (showAdminTab) {
    tabs.push({
      value: 'admin',
      label: 'Control Center',
      icon: '⚙️',
      description: 'Admin Portal',
      color: 'gray'
    });
  }

  // Enhanced tab change handler with debugging
  const enhancedHandleTabChange = (value: string) => {
    console.log(`🔄 Tab change requested: ${value}`);
    console.log(`✅ Is tab allowed: ${isTabAllowed(value)}`);
    handleTabChange(value);
  };

  return (
    <div className="w-full max-w-6xl mx-auto pt-3 sm:pt-4 mobile-content-container mobile-safe-bottom">
      <Tabs value={activeTab} onValueChange={enhancedHandleTabChange} className="w-full">
        {/* Add Tab Switcher for seamless navigation */}
        <TabSwitcher 
          currentTab={activeTab}
          onTabChange={enhancedHandleTabChange}
          isAuthenticated={userAuthenticated}
          userName={userName}
        />

        {/* Modern Tab Navigation - Enhanced for Mobile */}
        <ModernTabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={enhancedHandleTabChange}
          isTabAllowed={isTabAllowed}
        />
        
        {/* Tab Content - Enhanced for Mobile Experience */}
        <div className="w-full mobile-vertical-stack">
          <TabsContent value="deals" className="mobile-section-spacing p-2 sm:p-3 md:p-4 lg:p-6 animate-fade-in">
            <AirtimeDealsSystem />
          </TabsContent>
          
          <TabsContent value="onecard" className="mobile-section-spacing p-2 sm:p-3 md:p-4 lg:p-6 animate-fade-in">
            <OneCardDashboard />
          </TabsContent>
          
          <TabsContent value="registration" className="mobile-section-spacing p-2 sm:p-3 md:p-4 lg:p-6 animate-fade-in">
            <div className="w-full max-w-4xl mx-auto">
              <CustomerRegistration />
            </div>
          </TabsContent>
          
          <TabsContent value="vendor" className="mobile-section-spacing p-2 sm:p-3 md:p-4 lg:p-6 animate-fade-in">
            <VendorRegistration />
          </TabsContent>

          <TabsContent value="unified-reports" className="mobile-section-spacing p-2 sm:p-3 md:p-4 lg:p-6 animate-fade-in">
            <ReportsTabContent />
          </TabsContent>
          
          <TabsContent value="admin-reg" className="mobile-section-spacing p-2 sm:p-3 md:p-4 lg:p-6 animate-fade-in">
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
