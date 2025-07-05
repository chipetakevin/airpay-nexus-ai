
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
import { ResponsiveRenderer, MobileOnly, DesktopOnly } from './layout/ResponsiveRenderer';
import { IntelligentLayout } from './layout/IntelligentLayout';

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
    <IntelligentLayout>
      <ResponsiveRenderer
        mobile={
          <NerveCenterMobileLayout 
            title="Nerve Center BaaS"
            subtitle="Mobile Dashboard"
            className="nerve-center-mobile-portal"
          >
            <div className="w-full responsive-content-wrapper">
      {/* Enhanced Mobile Navigation with Premium Styling */}
      <MobileOnly>
        <div className="mb-6 px-4">
          <div className="bg-gradient-to-br from-muted/30 via-background to-muted/20 rounded-3xl p-5 border border-border/40 shadow-lg backdrop-blur-sm">
            <div className="text-center mb-4">
              <h3 className="text-sm font-bold text-muted-foreground/80 uppercase tracking-wider">Navigate Services</h3>
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-2"></div>
            </div>
            <EnhancedPortalNavigation
              activeTab={activeTab}
              onTabChange={enhancedHandleTabChange}
              isTabAllowed={isTabAllowed}
              showAdminTab={showAdminTab}
              className="nerve-center-mobile-nav"
            />
          </div>
        </div>
      </MobileOnly>

              <Tabs value={activeTab} onValueChange={enhancedHandleTabChange} className="w-full">
                {/* Mobile Tab Content with Enhanced Service Cards */}
                <div className="nerve-center-mobile-content space-y-6">
                  <TabsContent value="contractor" className="mobile-fade-in">
                    <div className="service-card-mobile">
                      <ContractorRegistrationContainer />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="deals" className="mobile-fade-in">
                    <div className="service-card-mobile">
                      <AirtimeDealsSystem />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="onecard" className="mobile-fade-in">
                    <div className="service-card-mobile">
                      <OneCardDashboard />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="registration" className="mobile-fade-in">
                    <div className="service-card-mobile">
                      <CustomerRegistration />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="vendor" className="mobile-fade-in">
                    <div className="service-card-mobile">
                      <VendorRegistration />
                    </div>
                  </TabsContent>

                  <TabsContent value="unified-reports" className="mobile-fade-in">
                    <div className="service-card-mobile">
                      <ReportsTabContent />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="admin-reg" className="mobile-fade-in">
                    <div className="service-card-mobile">
                      <AdminRegistration />
                    </div>
                  </TabsContent>
                  
                  {showAdminTab && (
                    <TabsContent value="admin" className="mobile-fade-in">
                      <div className="service-card-mobile">
                        <AdminPortal onAuthSuccess={() => setIsAdminAuthenticated(true)} />
                      </div>
                    </TabsContent>
                  )}
                </div>
              </Tabs>
            </div>
          </NerveCenterMobileLayout>
        }
        desktop={
          <div className="nerve-center-desktop-portal min-h-screen bg-background">
            <div className="w-full max-w-7xl mx-auto p-6">
              {/* Enhanced Desktop Header */}
              <DesktopOnly>
                <header className="mb-8" role="banner">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h1 className="dashboard-title mb-2">Nerve Center BaaS</h1>
                      <p className="dashboard-subtitle">Enterprise Dashboard Portal</p>
                    </div>
                  </div>
                </header>
              </DesktopOnly>

              {/* Desktop Navigation with Enhanced Accessibility */}
              <DesktopOnly>
                <nav className="mb-6" role="navigation" aria-label="Main navigation">
                  <EnhancedPortalNavigation
                    activeTab={activeTab}
                    onTabChange={enhancedHandleTabChange}
                    isTabAllowed={isTabAllowed}
                    showAdminTab={showAdminTab}
                    className="nerve-center-desktop-nav"
                  />
                </nav>
              </DesktopOnly>

              <Tabs value={activeTab} onValueChange={enhancedHandleTabChange} className="w-full">
                {/* Legacy Desktop Navigation */}
                <DesktopOnly>
                  <div className="mb-6 bg-muted/30 rounded-lg p-4">
                    <TabSwitcher
                      currentTab={activeTab}
                      onTabChange={enhancedHandleTabChange}
                      isAuthenticated={userAuthenticated}
                      userName={userName}
                    />
                  </div>
                </DesktopOnly>
                
                {/* Desktop Tab Content with Enhanced Service Cards */}
                <div id="desktop-content" className="nerve-center-desktop-content space-y-8">
                  <TabsContent value="contractor" className="desktop-fade-in">
                    <div className="service-card">
                      <ContractorRegistrationContainer />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="deals" className="desktop-fade-in">
                    <div className="service-card">
                      <AirtimeDealsSystem />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="onecard" className="desktop-fade-in">
                    <div className="service-card">
                      <OneCardDashboard />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="registration" className="desktop-fade-in">
                    <div className="service-card">
                      <CustomerRegistration />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="vendor" className="desktop-fade-in">
                    <div className="service-card">
                      <VendorRegistration />
                    </div>
                  </TabsContent>

                  <TabsContent value="unified-reports" className="desktop-fade-in">
                    <div className="service-card">
                      <ReportsTabContent />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="admin-reg" className="desktop-fade-in">
                    <div className="service-card">
                      <AdminRegistration />
                    </div>
                  </TabsContent>
                  
                  {showAdminTab && (
                    <TabsContent value="admin" className="desktop-fade-in">
                      <div className="service-card">
                        <AdminPortal onAuthSuccess={() => setIsAdminAuthenticated(true)} />
                      </div>
                    </TabsContent>
                  )}
                </div>
              </Tabs>
            </div>
          </div>
        }
        fallback={
          <div className="nerve-center-fallback">
            <div className="text-center p-8">
              <h2 className="service-title mb-2">Loading Nerve Center...</h2>
              <p className="service-description">Optimizing for your device</p>
            </div>
          </div>
        }
      />
    </IntelligentLayout>
  );
};

export default PortalTabs;
