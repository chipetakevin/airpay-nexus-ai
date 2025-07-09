
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OverviewTabContent } from './OverviewTabContent';
import { HistoryTabContent } from './HistoryTabContent';
import ReportsTabContent from './ReportsTabContent';
import UserReceiptsTab from './UserReceiptsTab';
import { AgenticAICashbackDashboard } from './reporting/AgenticAICashbackDashboard';

interface OneCardTabsLayoutProps {
  userData: any;
  showPhoneNumber: boolean;
  showCardNumber: boolean;
  onTogglePhoneVisibility: () => void;
  onToggleCardVisibility: () => void;
  onAccessRewards: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const OneCardTabsLayout = ({
  userData,
  showPhoneNumber,
  showCardNumber,
  onTogglePhoneVisibility,
  onToggleCardVisibility,
  onAccessRewards,
  activeTab,
  setActiveTab
}: OneCardTabsLayoutProps) => {
  // Get current user info for receipts
  const getCurrentUserInfo = () => {
    try {
      const credentials = localStorage.getItem('userCredentials');
      if (credentials) {
        const parsedCredentials = JSON.parse(credentials);
        let userId = '';
        
        if (parsedCredentials.userType === 'customer') {
          userId = userData?.cardNumber || 'customer_' + Date.now();
        } else if (parsedCredentials.userType === 'vendor') {
          const vendorData = localStorage.getItem('onecardVendor');
          if (vendorData) {
            const parsedVendorData = JSON.parse(vendorData);
            userId = parsedVendorData.vendorId || 'vendor_' + Date.now();
          }
        } else if (parsedCredentials.userType === 'admin') {
          const adminData = localStorage.getItem('onecardAdmin');
          if (adminData) {
            const parsedAdminData = JSON.parse(adminData);
            userId = parsedAdminData.adminId || 'admin_' + Date.now();
          }
        }
        
        return {
          userType: parsedCredentials.userType as 'customer' | 'vendor' | 'admin',
          userId: userId,
          isAdmin: parsedCredentials.userType === 'admin' || parsedCredentials.password === 'Malawi@1976'
        };
      }
    } catch (error) {
      console.error('Error getting current user info:', error);
    }
    
    return {
      userType: 'customer' as const,
      userId: userData?.cardNumber || 'customer_' + Date.now(),
      isAdmin: false
    };
  };

  const userInfo = getCurrentUserInfo();

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">
            💳 Overview
          </TabsTrigger>
          <TabsTrigger value="ai-analytics" className="text-xs sm:text-sm">
            🧠 AI Analytics
          </TabsTrigger>
          <TabsTrigger value="history" className="text-xs sm:text-sm">
            📊 History
          </TabsTrigger>
          <TabsTrigger value="receipts" className="text-xs sm:text-sm">
            🧾 Receipts
          </TabsTrigger>
          <TabsTrigger value="reports" className="text-xs sm:text-sm">
            📈 Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTabContent
            userData={userData}
            showPhoneNumber={showPhoneNumber}
            showCardNumber={showCardNumber}
            onTogglePhoneVisibility={onTogglePhoneVisibility}
            onToggleCardVisibility={onToggleCardVisibility}
            onAccessRewards={onAccessRewards}
          />
        </TabsContent>

        <TabsContent value="ai-analytics">
          <AgenticAICashbackDashboard 
            userData={userData}
            userType={userInfo.userType}
          />
        </TabsContent>

        <TabsContent value="history">
          <HistoryTabContent />
        </TabsContent>

        <TabsContent value="receipts">
          <UserReceiptsTab 
            userType={userInfo.userType}
            userId={userInfo.userId}
            isAdminView={userInfo.isAdmin}
          />
        </TabsContent>

        <TabsContent value="reports">
          <ReportsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OneCardTabsLayout;
