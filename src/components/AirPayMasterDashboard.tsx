
import React, { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import AirtimeDealsSystem from './AirtimeDealsSystem';
import BillingDashboard from './billing/BillingDashboard';
import SpazaMarketplace from './spaza/SpazaMarketplace';
import DealAlertSystem from './alerts/DealAlertSystem';
import NotificationCenter from './reporting/NotificationCenter';
import AdminPortal from './AdminPortal';
import DashboardHeader from './dashboard/DashboardHeader';
import DashboardNavigation from './dashboard/DashboardNavigation';
import TabContentContainer from './dashboard/TabContentContainer';

const AirPayMasterDashboard = () => {
  const [activeTab, setActiveTab] = useState('deals');

  const tabConfigs = [
    {
      id: 'deals',
      icon: '🔥',
      title: 'Smart Airtime & Data Deals',
      description: 'Discover the best deals from top SA retailers with AI-powered recommendations',
      badges: [
        { text: 'Live AI', className: 'bg-blue-600 text-white px-2 py-1 text-xs' },
        { text: 'Cashback', className: 'bg-green-600 text-white px-2 py-1 text-xs' }
      ],
      headerGradient: 'from-blue-50 via-purple-50 to-indigo-50',
      component: <AirtimeDealsSystem />
    },
    {
      id: 'billing',
      icon: '💳',
      title: 'Billing Dashboard',
      description: 'Manage payments, view transactions, and track your spending',
      badges: [
        { text: 'Secure', className: 'bg-green-600 text-white px-2 py-1 text-xs' }
      ],
      headerGradient: 'from-green-50 to-emerald-50',
      component: <BillingDashboard />
    },
    {
      id: 'spaza',
      icon: '🏪',
      title: 'Spaza Marketplace',
      description: 'Your neighborhood digital marketplace - always open for business',
      badges: [
        { text: '24/7 Open', className: 'bg-orange-600 text-white px-2 py-1 text-xs' }
      ],
      headerGradient: 'from-orange-50 to-red-50',
      component: <SpazaMarketplace />
    },
    {
      id: 'alerts',
      icon: '🔔',
      title: 'Deal Alert System',
      description: 'Never miss a great deal with real-time notifications',
      badges: [
        { text: 'Live', className: 'bg-yellow-600 text-white px-2 py-1 text-xs' }
      ],
      headerGradient: 'from-yellow-50 to-orange-50',
      component: <DealAlertSystem />
    },
    {
      id: 'notifications',
      icon: '💬',
      title: 'Communications Center',
      description: 'Stay connected with updates, support, and community',
      badges: [
        { text: 'Active', className: 'bg-cyan-600 text-white px-2 py-1 text-xs' }
      ],
      headerGradient: 'from-cyan-50 to-blue-50',
      component: <NotificationCenter />
    },
    {
      id: 'admin',
      icon: '⚙️',
      title: 'Admin Portal',
      description: 'Advanced controls and system management',
      badges: [
        { text: 'Secure', className: 'bg-gray-600 text-white px-2 py-1 text-xs' }
      ],
      headerGradient: 'from-gray-50 to-slate-50',
      component: <AdminPortal />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <DashboardHeader />

      {/* Main Content Area with Tabs */}
      <div className="max-w-7xl mx-auto p-3 md:p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <DashboardNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Tab Content */}
          <div className="space-y-4 md:space-y-6">
            {tabConfigs.map((config) => (
              <TabsContent key={config.id} value={config.id} className="space-y-4 md:space-y-6 animate-fade-in m-0">
                <TabContentContainer
                  icon={config.icon}
                  title={config.title}
                  description={config.description}
                  badges={config.badges}
                  headerGradient={config.headerGradient}
                >
                  {config.component}
                </TabContentContainer>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AirPayMasterDashboard;
