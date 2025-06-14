
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OverviewTabContent } from './OverviewTabContent';
import { HistoryTabContent } from './HistoryTabContent';
import { DataPoolManagement } from './DataPoolManagement';
import AirtimeDealsSystem from '../AirtimeDealsSystem';

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
  const tabs = [
    {
      value: 'overview',
      label: 'Overview',
      icon: '📊',
      description: 'Dashboard'
    },
    {
      value: 'deals',
      label: 'Smart Deals',
      icon: '🔥',
      description: 'Shop Now'
    },
    {
      value: 'datapool',
      label: 'Data Pool',
      icon: '📡',
      description: 'Credits'
    },
    {
      value: 'history',
      label: 'History',
      icon: '📋',
      description: 'Transactions'
    }
  ];

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Mobile-First Responsive Tab Navigation */}
        <div className="w-full mb-6">
          <TabsList className="w-full">
            {/* Mobile: 2x2 Grid */}
            <div className="grid grid-cols-2 gap-2 w-full sm:hidden">
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  className="flex flex-col items-center gap-1 p-3 h-16 text-xs"
                >
                  <span className="text-lg">{tab.icon}</span>
                  <div className="text-center">
                    <div className="font-semibold leading-none">{tab.label}</div>
                    <div className="text-xs opacity-75 leading-none mt-0.5">{tab.description}</div>
                  </div>
                </TabsTrigger>
              ))}
            </div>

            {/* Tablet and Desktop: Single Row */}
            <div className="hidden sm:grid sm:grid-cols-4 gap-2 w-full">
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  className="flex flex-col items-center gap-2 p-4 h-20"
                >
                  <span className="text-xl">{tab.icon}</span>
                  <div className="text-center">
                    <div className="font-semibold text-sm">{tab.label}</div>
                    <div className="text-xs opacity-75">{tab.description}</div>
                  </div>
                </TabsTrigger>
              ))}
            </div>
          </TabsList>
        </div>
        
        {/* Tab Content */}
        <div className="w-full">
          <TabsContent value="overview" className="space-y-6">
            <OverviewTabContent
              userData={userData}
              showPhoneNumber={showPhoneNumber}
              showCardNumber={showCardNumber}
              onTogglePhoneVisibility={onTogglePhoneVisibility}
              onToggleCardVisibility={onToggleCardVisibility}
              onAccessRewards={onAccessRewards}
            />
          </TabsContent>

          <TabsContent value="deals" className="space-y-6">
            <AirtimeDealsSystem />
          </TabsContent>

          <TabsContent value="datapool" className="space-y-6">
            <DataPoolManagement userData={userData} />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <HistoryTabContent />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default OneCardTabsLayout;
