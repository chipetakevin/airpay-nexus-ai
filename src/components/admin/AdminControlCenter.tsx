import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CustomerManagementDashboard from './CustomerManagementDashboard';
import MVNEDataExtractionPanel from './MVNEDataExtractionPanel';
import MVNEDailyRechargePanel from './MVNEDailyRechargePanel';
import ModernAdminTabs from './ModernAdminTabs';
import OrdersSection from './OrdersSection';
import MobileCustomerManagementLayout from './mobile/MobileCustomerManagementLayout';
import { adminTabs, profileTabs, dataTabs } from './AdminTabsConfig';
import { useIsMobile } from '@/hooks/use-mobile';

interface AdminControlCenterProps {
  activeAdminTab: string;
  setActiveAdminTab: (tab: string) => void;
  activeProfileTab: string;
  setActiveProfileTab: (tab: string) => void;
  activeDataTab: string;
  setActiveDataTab: (tab: string) => void;
}

const AdminControlCenter: React.FC<AdminControlCenterProps> = ({
  activeAdminTab,
  setActiveAdminTab,
  activeProfileTab,
  setActiveProfileTab,
  activeDataTab,
  setActiveDataTab
}) => {
  const isMobile = useIsMobile();

  // Mobile-first Customer Management View
  if (isMobile && activeAdminTab === 'dashboard' && activeProfileTab === 'customer-profiles') {
    return (
      <MobileCustomerManagementLayout
        activeAdminTab={activeAdminTab}
        setActiveAdminTab={setActiveAdminTab}
        activeProfileTab={activeProfileTab}
        setActiveProfileTab={setActiveProfileTab}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">🛡️</span>
          Admin Control Center
        </h1>
        <p className="text-gray-600">Complete system administration and oversight</p>
      </div>

      {/* Main Admin Tabs */}
      <div className="flex justify-center">
        <ModernAdminTabs
          tabs={adminTabs}
          activeTab={activeAdminTab}
          onTabChange={setActiveAdminTab}
          variant="primary"
        />
      </div>

      {/* Profile Tabs - Only shown when Dashboard is active */}
      {activeAdminTab === 'dashboard' && (
        <div className="flex justify-center">
          <ModernAdminTabs
            tabs={profileTabs}
            activeTab={activeProfileTab}
            onTabChange={setActiveProfileTab}
            variant="secondary"
          />
        </div>
      )}

      {/* Main Dashboard Content */}
      {activeAdminTab === 'dashboard' && (
        <div className="grid gap-6">
          {/* Customer Management Section - Only show when Customer Profiles is active */}
          {activeProfileTab === 'customer-profiles' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-xl">🏢</span>
                  Customer Management
                </CardTitle>
                <p className="text-gray-600">Manage customer accounts, view balances, and handle support tickets</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <CustomerManagementDashboard />
                  
                  {/* Divine Mobile Data Extraction Center */}
                  <div className="mt-8 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                      Divine Mobile Data Extraction Center
                    </h3>
                    
                    {/* Data Extraction Tabs */}
                    <div className="w-full">
                      <ModernAdminTabs
                        tabs={dataTabs}
                        activeTab={activeDataTab}
                        onTabChange={setActiveDataTab}
                        variant="secondary"
                        className="w-full"
                      />

                      {/* Data Tab Content */}
                      <div className="mt-6">
                        {activeDataTab === 'sim-data' && <MVNEDataExtractionPanel />}
                        {activeDataTab === 'recharge-data' && <MVNEDailyRechargePanel />}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Vendor Profiles Content */}
          {activeProfileTab === 'vendor-profiles' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-xl">🏪</span>
                  Vendor Management
                </CardTitle>
                <p className="text-gray-600">Manage vendor accounts, commissions, and business operations</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 p-3 bg-black text-white rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
                  <span className="text-lg">🏪</span>
                  <span className="text-lg font-semibold">Manage Vendors</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Admin Profile Content */}
          {activeProfileTab === 'admin-profile' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-xl">👨‍💼</span>
                  Admin Profile Management
                </CardTitle>
                <p className="text-gray-600">System administration settings and admin account management</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 p-3 bg-black text-white rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
                  <span className="text-lg">👨‍💼</span>
                  <span className="text-lg font-semibold">Manage Admin Settings</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* OneCard Administration Section - Always visible */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-xl">💳</span>
                OneCard Administration
              </CardTitle>
              <p className="text-gray-600">Monitor cashback allocations, card status, and reward distributions</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 p-3 bg-black text-white rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
                <span className="text-lg">💳</span>
                <span className="text-lg font-semibold">Manage OneCards</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Orders Tab Content */}
      {activeAdminTab === 'orders' && <OrdersSection />}

      {/* Other Admin Tabs Content */}
      {activeAdminTab !== 'dashboard' && activeAdminTab !== 'orders' && (
        <Card>
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">
              {activeAdminTab.charAt(0).toUpperCase() + activeAdminTab.slice(1)} Section
            </h3>
            <p className="text-muted-foreground">Content for {activeAdminTab} will be available soon.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminControlCenter;
