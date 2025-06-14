
import React, { useState } from 'react';
import DashboardNavigation from './dashboard/DashboardNavigation';
import TabContentContainer from './dashboard/TabContentContainer';
import DealAlertSystem from './alerts/DealAlertSystem';
import BillingDashboard from './billing/BillingDashboard';
import SpazaMarketplace from './spaza/SpazaMarketplace';
import NotificationCenter from './reporting/NotificationCenter';
import AdminPortal from './AdminPortal';
import EnhancedDealsGrid from './deals/EnhancedDealsGrid';
import InviteFriendTab from './invite/InviteFriendTab';

const OneCardDashboard = () => {
  const [activeTab, setActiveTab] = useState('deals');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'deals':
        return <EnhancedDealsGrid />;
      case 'billing':
        return <BillingDashboard />;
      case 'spaza':
        return <SpazaMarketplace />;
      case 'alerts':
        return <DealAlertSystem />;
      case 'invite':
        return <InviteFriendTab />;
      case 'notifications':
        return <NotificationCenter />;
      case 'admin':
        return <AdminPortal onAuthSuccess={() => {}} />;
      default:
        return <EnhancedDealsGrid />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <DashboardNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
        />
        
        <TabContentContainer>
          {renderTabContent()}
        </TabContentContainer>
      </div>
    </div>
  );
};

export default OneCardDashboard;
