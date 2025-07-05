
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import CustomerRegistration from './CustomerRegistration';
import VendorRegistration from './VendorRegistration';
import AdminRegistration from './AdminRegistration';
import OneCardDashboard from './OneCardDashboard';
import AdminPortal from './AdminPortal';
import ReportsTabContent from './onecard/ReportsTabContent';
import AirtimeDealsSystem from './AirtimeDealsSystem';
import { ContractorRegistrationContainer } from './contractor/ContractorRegistrationContainer';
import TabSwitcher from './navigation/TabSwitcher';
import ModernTabNavigation from './navigation/ModernTabNavigation';
import EnhancedPortalNavigation from './navigation/EnhancedPortalNavigation';
import { NerveCenterMobileLayout } from './layout/NerveCenterMobileLayout';
import { UniversalMobileTabs } from './tabs/UniversalMobileTabs';
import { useMobileFirst } from './layout/MobileFirstProvider';

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
  const { isMobile, deviceType } = useMobileFirst();
  
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

  // Ensure vendor tab is always included and accessible
  const tabs = [
    {
      value: 'contractor',
      label: 'Field Contractor',
      icon: '🔧',
      description: 'Register',
      color: 'blue'
    },
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
      description: 'Register',
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

  // Enhanced tab change handler with debugging
  const enhancedHandleTabChange = (value: string) => {
    console.log(`🔄 Tab change requested: ${value}`);
    console.log(`✅ Is tab allowed: ${isTabAllowed(value)}`);
    handleTabChange(value);
  };

  return (
    <NerveCenterMobileLayout 
      title="Nerve Center BaaS"
      subtitle="Mobile-First Dashboard"
      className="nerve-center-portal"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Enhanced Intelligent Navigation */}
        <div className="mb-6">
          <EnhancedPortalNavigation
            activeTab={activeTab}
            onTabChange={enhancedHandleTabChange}
            isTabAllowed={isTabAllowed}
            showAdminTab={showAdminTab}
            className="nerve-center-enhanced-nav"
          />
        </div>

        <Tabs value={activeTab} onValueChange={enhancedHandleTabChange} className="w-full">
          {/* Legacy Fallback Navigation for Desktop */}
          {!isMobile && (
            <div className="mb-4 bg-muted/30 rounded-lg p-2">
              <TabSwitcher 
                currentTab={activeTab}
                onTabChange={enhancedHandleTabChange}
                isAuthenticated={userAuthenticated}
                userName={userName}
              />
            </div>
          )}
          
          {/* Tab Content - Enhanced with Animations */}
          <div className="nerve-center-content-area space-y-6">
            <TabsContent value="contractor" className="nerve-center-fade-in">
              <div className="nerve-center-card">
                <ContractorRegistrationContainer />
              </div>
            </TabsContent>
            
            <TabsContent value="deals" className="nerve-center-fade-in">
              <div className="nerve-center-card">
                <AirtimeDealsSystem />
              </div>
            </TabsContent>
            
            <TabsContent value="onecard" className="nerve-center-fade-in">
              <div className="nerve-center-card">
                <OneCardDashboard />
              </div>
            </TabsContent>
            
            <TabsContent value="registration" className="nerve-center-fade-in">
              <div className="nerve-center-card">
                <CustomerRegistration />
              </div>
            </TabsContent>
            
            <TabsContent value="vendor" className="nerve-center-fade-in">
              <div className="nerve-center-card">
                <VendorRegistration />
              </div>
            </TabsContent>

            <TabsContent value="unified-reports" className="nerve-center-fade-in">
              <div className="nerve-center-card">
                <ReportsTabContent />
              </div>
            </TabsContent>
            
            <TabsContent value="admin-reg" className="nerve-center-fade-in">
              <div className="nerve-center-card">
                <AdminRegistration />
              </div>
            </TabsContent>
            
            {showAdminTab && (
              <TabsContent value="admin" className="nerve-center-fade-in">
                <div className="nerve-center-card">
                  <AdminPortal onAuthSuccess={() => setIsAdminAuthenticated(true)} />
                </div>
              </TabsContent>
            )}
          </div>
        </Tabs>
      </div>
    </NerveCenterMobileLayout>
  );
};

export default PortalTabs;
