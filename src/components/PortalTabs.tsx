
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useVersion } from '@/contexts/VersionContext';
import CustomerRegistration from './CustomerRegistration';
import VendorRegistration from './VendorRegistration';
import AdminRegistration from './AdminRegistration';
import OneCardDashboard from './OneCardDashboard';
import AdminPortal from './AdminPortal';
import ReportsTabContent from './onecard/ReportsTabContent';
import AirtimeDealsSystem from './AirtimeDealsSystem';
import TabSwitcher from './navigation/TabSwitcher';
import ModernTabNavigation from './navigation/ModernTabNavigation';
import DocumentationManager from './admin/DocumentationManager';
import VersionManager from './admin/VersionManager';
import AddexPayDashboard from './payroll/AddexPayDashboard';
import SimpleUSSDManager from './ussd/SimpleUSSDManager';
import FieldWorkerRegistration from './fieldworker/FieldWorkerRegistration';
import FieldWorkerDashboard from './fieldworker/FieldWorkerDashboard';
import APIToolkit from './api/APIToolkit';
import MVNEPortal from './mvne/MVNEPortal';

interface PortalTabsProps {
  activeTab: string;
  showAdminTab: boolean;
  isTabAllowed: (tabValue: string) => boolean;
  handleTabChange: (value: string) => void;
  setIsAdminAuthenticated: (value: boolean) => void;
  isUnifiedProfile?: boolean;
  isAuthenticated?: boolean;
  showAdminBanner?: boolean;
}

const PortalTabs = ({ 
  activeTab, 
  showAdminTab, 
  isTabAllowed, 
  handleTabChange, 
  setIsAdminAuthenticated,
  isUnifiedProfile = false,
  isAuthenticated = false,
  showAdminBanner = false
}: PortalTabsProps) => {
  const { displayVersion } = useVersion();
  
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

  // Check if user is registered admin with comprehensive authentication detection
  const isRegisteredAdmin = () => {
    try {
      const credentials = localStorage.getItem('userCredentials');
      const adminData = localStorage.getItem('onecardAdmin');
      const adminProfile = localStorage.getItem('adminProfile');
      const adminAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
      const isUserAuthenticated = localStorage.getItem('userAuthenticated') === 'true';
      
      if (!credentials && !adminProfile && !adminAuthenticated) {
        console.log('🔍 Admin check: No credentials or admin authentication found');
        return false;
      }
      
      // Check if admin is authenticated through any method
      let isAdmin = false;
      
      if (credentials) {
        const parsedCredentials = JSON.parse(credentials);
        isAdmin = parsedCredentials.userType === 'admin' || 
                 parsedCredentials.password === 'Malawi@1976';
      }
      
      // Admin is considered authenticated if ANY of these conditions are true:
      const hasAdminAccess = isAdmin || 
                            adminData !== null || 
                            adminProfile !== null || 
                            adminAuthenticated ||
                            (isUserAuthenticated && (adminProfile || adminAuthenticated));
      
      console.log('🔍 Comprehensive admin check result:', {
        hasCredentials: !!credentials,
        userType: credentials ? JSON.parse(credentials).userType : 'none',
        hasCorrectPassword: credentials ? JSON.parse(credentials).password === 'Malawi@1976' : false,
        hasAdminData: !!adminData,
        hasAdminProfile: !!adminProfile,
        adminAuthenticated,
        isUserAuthenticated,
        finalResult: hasAdminAccess
      });
      
      return hasAdminAccess;
    } catch (error) {
      console.log('🔍 Admin check error:', error);
      return false;
    }
  };

  const isAdmin = isRegisteredAdmin();

  // Enhanced tabs with admin access control
  // Define exactly 13 tabs as requested
  const baseTabs = [
    {
      value: 'deals',
      label: 'Smart Deals',
      icon: '🔥',
      description: 'Live Offers',
      color: 'orange',
      adminOnly: false
    },
    {
      value: 'onecard',
      label: 'OneCard',
      icon: '💳',
      description: 'My Card',
      color: 'purple',
      adminOnly: false
    },
    {
      value: 'registration',
      label: 'Customer',
      icon: '👤',
      description: 'Sign Up',
      color: 'green',
      adminOnly: false
    },
    {
      value: 'vendor',
      label: 'Vendor',
      icon: '🏪',
      description: 'Partner',
      color: 'blue',
      adminOnly: false
    },
    {
      value: 'ussd-manager',
      label: 'USSD Manager',
      icon: '📱',
      description: 'GSM Onboarding',
      color: 'emerald',
      adminOnly: false
    },
    {
      value: 'addex-pay',
      label: 'Addex Pay',
      icon: '💰',
      description: 'Payroll System',
      color: 'indigo',
      adminOnly: true
    },
    {
      value: 'field-workers',
      label: 'Field Workers',
      icon: '👥',
      description: 'Mobile Teams',
      color: 'teal',
      adminOnly: true
    },
    {
      value: 'api-toolkit',
      label: 'API Toolkit',
      icon: '🔌',
      description: 'MNO Integration',
      color: 'indigo',
      adminOnly: true
    },
    {
      value: 'admin',
      label: 'The Nerve Center',
      icon: '🧠',
      description: 'Admin Portal',
      color: 'blue',
      adminOnly: true
    },
    {
      value: 'unified-reports',
      label: 'Reports',
      icon: '👑',
      description: 'Gold Access',
      color: 'yellow',
      adminOnly: true
    },
    {
      value: 'documentation',
      label: 'Docs',
      icon: '📋',
      description: `MVNE ${displayVersion}`,
      color: 'blue',
      adminOnly: true
    },
    {
      value: 'version-manager',
      label: 'Versions',
      icon: '🔄',
      description: 'Auto-Update',
      color: 'purple',
      adminOnly: true
    }
  ];

  // Build tabs array - always show all 13 tabs for admin users
  let tabs = [...baseTabs];
  
  // For non-admin users, filter to show only non-admin tabs plus admin registration
  if (!isAdmin && !showAdminTab) {
    tabs = baseTabs.filter(tab => !tab.adminOnly);
    // Add admin registration tab for non-admins
    tabs.push({
      value: 'admin-reg',
      label: 'Admin Reg',
      icon: '🔐',
      description: 'Register',
      color: 'red',
      adminOnly: false
    });
  }

  console.log('🔍 Final tabs array:', tabs.map(t => `${t.label} (${t.value})`));
  console.log('🔍 Total tabs count:', tabs.length);
  console.log('🔍 Admin authenticated:', isAdmin || showAdminTab);

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
          
          <TabsContent value="documentation" className="mobile-section-spacing p-2 sm:p-3 md:p-4 lg:p-6 animate-fade-in">
            <DocumentationManager />
          </TabsContent>
          
          <TabsContent value="version-manager" className="mobile-section-spacing p-2 sm:p-3 md:p-4 lg:p-6 animate-fade-in">
            <VersionManager />
          </TabsContent>
          
          <TabsContent value="addex-pay" className="mobile-section-spacing p-2 sm:p-3 md:p-4 lg:p-6 animate-fade-in">
            <AddexPayDashboard />
          </TabsContent>
          
          <TabsContent value="ussd-manager" className="mobile-section-spacing p-2 sm:p-3 md:p-4 lg:p-6 animate-fade-in">
            <div className="min-h-[400px] w-full">
              <SimpleUSSDManager />
            </div>
          </TabsContent>
          
          <TabsContent value="field-workers" className="mobile-section-spacing p-2 sm:p-3 md:p-4 lg:p-6 animate-fade-in">
            <div className="space-y-6">
              {/* Check if user is a registered field worker */}
              <FieldWorkerDashboard />
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">New Field Worker Registration</h3>
                <FieldWorkerRegistration />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="api-toolkit" className="mobile-section-spacing p-2 sm:p-3 md:p-4 lg:p-6 animate-fade-in">
            <APIToolkit />
          </TabsContent>
          
          <TabsContent value="admin-reg" className="mobile-section-spacing p-2 sm:p-3 md:p-4 lg:p-6 animate-fade-in">
            <AdminRegistration />
          </TabsContent>
          
          <TabsContent value="admin" className="p-1 sm:p-2 md:p-4 lg:p-6 animate-fade-in">
            <AdminPortal 
              onAuthSuccess={() => setIsAdminAuthenticated(true)} 
              showAdminBanner={showAdminBanner}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default PortalTabs;
