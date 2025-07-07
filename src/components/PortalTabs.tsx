
import React, { useMemo } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useRoleBasedAccess } from '@/hooks/useRoleBasedAccess';
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
import USSDManager from './ussd/USSDManager';

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
  
  // Use role-based access control
  const { user, permissions, loading, hasTabAccess, getRoleDisplayName } = useRoleBasedAccess();

  // Memoize tabs based on user role and permissions
  const tabs = useMemo(() => {
    const baseTabs = [
      {
        value: 'deals',
        label: 'Smart Deals',
        icon: '🔥',
        description: 'Live Offers',
        color: 'orange',
        requiredRole: null // Available to all
      },
      {
        value: 'onecard',
        label: 'OneCard',
        icon: '💳',
        description: 'My Card', 
        color: 'purple',
        requiredRole: null // Available to all authenticated users
      },
      {
        value: 'registration',
        label: 'Customer',
        icon: '👤',
        description: 'Sign Up',
        color: 'green',
        requiredRole: null // Available to all
      },
      {
        value: 'vendor',
        label: 'Vendor',
        icon: '🏪',
        description: 'Partner',
        color: 'blue',
        requiredRole: null // Available to all for registration
      }
    ];

    // Add role-specific tabs based on permissions
    if (permissions.canAccessVendorFeatures) {
      baseTabs.push({
        value: 'ussd-manager',
        label: 'USSD Manager',
        icon: '📱',
        description: 'GSM Onboarding',
        color: 'emerald',
        requiredRole: 'vendor'
      });
    }

    if (permissions.canAccessAdminFeatures) {
      baseTabs.push(
        {
          value: 'admin',
          label: 'Control Center',
          icon: '⚙️',
          description: 'Admin Portal',
          color: 'gray',
          requiredRole: 'admin'
        },
        {
          value: 'addex-pay',
          label: 'Addex Pay',
          icon: '💰',
          description: 'Payroll System',
          color: 'indigo',
          requiredRole: 'admin'
        },
        {
          value: 'unified-reports',
          label: 'Reports',
          icon: '👑',
          description: 'Gold Access',
          color: 'yellow',
          requiredRole: 'admin'
        },
        {
          value: 'documentation',
          label: 'Docs',
          icon: '📋',
          description: 'MVNE v3.0',
          color: 'blue',
          requiredRole: 'admin'
        },
        {
          value: 'version-manager',
          label: 'Versions',
          icon: '🔄',
          description: 'Auto-Update',
          color: 'purple',
          requiredRole: 'admin'
        }
      );
    }

    // Add admin registration for non-admin users
    if (!permissions.isAdmin) {
      baseTabs.push({
        value: 'admin-reg',
        label: 'Admin Reg',
        icon: '🔐',
        description: 'Register',
        color: 'red',
        requiredRole: null
      });
    }

    console.log('🔍 Role-based tabs generated:', {
      userRole: permissions.role,
      tabCount: baseTabs.length,
      tabs: baseTabs.map(t => t.label)
    });

    return baseTabs;
  }, [permissions]);

  // Enhanced tab change handler with role-based access control
  const enhancedHandleTabChange = (value: string) => {
    console.log(`🔄 Tab change requested: ${value}`);
    
    if (hasTabAccess(value)) {
      console.log(`✅ Access granted for tab: ${value}`);
      handleTabChange(value);
    } else {
      console.log(`❌ Access denied for tab: ${value}`);
      // Optionally show a message or redirect to allowed tab
    }
  };

  // Get user display name for tab switcher
  const userName = user ? (user.user_metadata?.firstName || user.email?.split('@')[0] || 'User') : '';
  const userAuthenticated = !!user;

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto pt-3 sm:pt-4 mobile-content-container mobile-safe-bottom">
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-blue-600">Loading user permissions...</span>
        </div>
      </div>
    );
  }

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
            <USSDManager />
          </TabsContent>
          
          <TabsContent value="admin-reg" className="mobile-section-spacing p-2 sm:p-3 md:p-4 lg:p-6 animate-fade-in">
            <AdminRegistration />
          </TabsContent>
          
          {(permissions.isAdmin || showAdminTab) && (
            <TabsContent value="admin" className="p-1 sm:p-2 md:p-4 lg:p-6 animate-fade-in">
              <AdminPortal 
                onAuthSuccess={() => setIsAdminAuthenticated(true)} 
                showAdminBanner={showAdminBanner}
              />
            </TabsContent>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default PortalTabs;
