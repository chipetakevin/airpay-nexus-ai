
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
      label: 'Deals',
      icon: '🔥',
      description: 'Shop'
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
      description: 'Logs'
    }
  ];

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Mobile-First Responsive Tab Navigation */}
        <div className="w-full mb-6">
          <TabsList className="w-full max-w-full">
            {/* Mobile: Single Row with 4 Compact Tabs */}
            <div className="grid grid-cols-4 gap-1 w-full">
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  className="flex flex-col items-center gap-1 p-2 min-h-[60px] text-xs"
                >
                  <span className="text-sm sm:text-lg">{tab.icon}</span>
                  <div className="text-center">
                    <div className="font-semibold leading-tight text-xs">{tab.label}</div>
                    <div className="text-xs opacity-75 leading-tight hidden sm:block">{tab.description}</div>
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
