
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AirtimeDealsSystem from './AirtimeDealsSystem';
import { OverviewTabContent } from './onecard/OverviewTabContent';
import { HistoryTabContent } from './onecard/HistoryTabContent';
import { DataPoolManagement } from './onecard/DataPoolManagement';

const OneCardDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showCardNumber, setShowCardNumber] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('onecardUser');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  if (!userData) {
    return (
      <div className="text-center py-8 sm:py-12">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">OneCard Rewards Dashboard</h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base px-4">
          Please register first to access your OneCard rewards and smart deals
        </p>
      </div>
    );
  }

  const handleAccessRewards = () => {
    setActiveTab('deals');
  };

  const togglePhoneVisibility = () => {
    setShowPhoneNumber(!showPhoneNumber);
  };

  const toggleCardVisibility = () => {
    setShowCardNumber(!showCardNumber);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="deals">Smart Deals</TabsTrigger>
          <TabsTrigger value="datapool">Data Pool</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTabContent
            userData={userData}
            showPhoneNumber={showPhoneNumber}
            showCardNumber={showCardNumber}
            onTogglePhoneVisibility={togglePhoneVisibility}
            onToggleCardVisibility={toggleCardVisibility}
            onAccessRewards={handleAccessRewards}
          />
        </TabsContent>

        <TabsContent value="deals" className="space-y-4 sm:space-y-6">
          <AirtimeDealsSystem />
        </TabsContent>

        <TabsContent value="datapool">
          <DataPoolManagement userData={userData} />
        </TabsContent>

        <TabsContent value="history">
          <HistoryTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OneCardDashboard;
