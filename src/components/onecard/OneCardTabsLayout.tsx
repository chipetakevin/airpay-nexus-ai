
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OverviewTabContent } from './OverviewTabContent';
import { EnhancedHistoryTabContent } from './EnhancedHistoryTabContent';
import { DataPoolManagement } from './DataPoolManagement';
import ReportsTabContent from './ReportsTabContent';
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
      description: 'Dashboard',
      color: 'purple'
    },
    {
      value: 'deals',
      label: 'Smart Deals',
      icon: '🔥',
      description: 'Shop Now',
      color: 'orange'
    },
    {
      value: 'datapool',
      label: 'Data Pool',
      icon: '📡',
      description: 'Credits',
      color: 'blue'
    },
    {
      value: 'reports',
      label: 'Reports',
      icon: '👑',
      description: 'Gold Card',
      color: 'yellow'
    },
    {
      value: 'history',
      label: 'Smart History',
      icon: '🔍',
      description: 'AI Search',
      color: 'green'
    }
  ];

  const getTabClassName = (tabValue: string, color: string) => {
    let baseClass = "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 min-h-[55px] flex-1 border text-xs shadow-sm relative overflow-hidden";
    
    const colorClasses = {
      orange: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-orange-400 bg-orange-50 border-orange-200 hover:border-orange-300 hover:bg-orange-100",
      purple: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-purple-400 bg-purple-50 border-purple-200 hover:border-purple-300 hover:bg-purple-100",
      blue: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-blue-400 bg-blue-50 border-blue-200 hover:border-blue-300 hover:bg-blue-100",
      green: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-green-400 bg-green-50 border-green-200 hover:border-green-300 hover:bg-green-100",
      yellow: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-yellow-500 data-[state=active]:to-amber-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-yellow-400 bg-yellow-50 border-yellow-200 hover:border-yellow-300 hover:bg-yellow-100"
    };
    baseClass += " " + colorClasses[color];
    
    return baseClass;
  };

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Enhanced Mobile-First Navigation with better spacing */}
        <div className="w-full mb-4">
          <TabsList className="w-full max-w-full bg-gradient-to-r from-gray-50 to-gray-100 p-1.5">
            {/* Mobile: Optimized layout for better touch targets and spacing */}
            <div className="grid grid-cols-2 gap-1.5 w-full sm:hidden">
              {tabs.slice(0, 4).map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  className={getTabClassName(tab.value, tab.color)}
                >
                  <span className="text-base">{tab.icon}</span>
                  <div className="text-center">
                    <div className="font-semibold leading-tight text-xs">{tab.label}</div>
                    <div className="text-xs opacity-75 leading-tight">{tab.description}</div>
                  </div>
                </TabsTrigger>
              ))}
              {/* Second row for remaining tabs on mobile */}
              <TabsTrigger 
                value="history" 
                className={getTabClassName('history', 'green')}
              >
                <span className="text-base">🔍</span>
                <div className="text-center">
                  <div className="font-semibold leading-tight text-xs">Smart History</div>
                  <div className="text-xs opacity-75 leading-tight">AI Search</div>
                </div>
              </TabsTrigger>
            </div>

            {/* Tablet & Desktop: All tabs in responsive layout */}
            <div className="hidden sm:grid sm:grid-cols-5 gap-1.5 w-full">
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  className={getTabClassName(tab.value, tab.color)}
                >
                  <span className="text-lg">{tab.icon}</span>
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
          <TabsContent value="overview" className="space-y-4 animate-fade-in">
            <OverviewTabContent
              userData={userData}
              showPhoneNumber={showPhoneNumber}
              showCardNumber={showCardNumber}
              onTogglePhoneVisibility={onTogglePhoneVisibility}
              onToggleCardVisibility={onToggleCardVisibility}
              onAccessRewards={onAccessRewards}
            />
          </TabsContent>

          <TabsContent value="deals" className="space-y-4 animate-fade-in">
            <AirtimeDealsSystem />
          </TabsContent>

          <TabsContent value="datapool" className="space-y-4 animate-fade-in">
            <DataPoolManagement userData={userData} />
          </TabsContent>

          <TabsContent value="reports" className="space-y-4 animate-fade-in">
            <ReportsTabContent />
          </TabsContent>

          <TabsContent value="history" className="space-y-4 animate-fade-in">
            <EnhancedHistoryTabContent />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default OneCardTabsLayout;
