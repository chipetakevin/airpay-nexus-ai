
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AirtimeDealsSystem from './AirtimeDealsSystem';
import BillingDashboard from './billing/BillingDashboard';
import SpazaMarketplace from './spaza/SpazaMarketplace';
import DealAlertSystem from './alerts/DealAlertSystem';
import NotificationCenter from './reporting/NotificationCenter';
import AdminPortal from './AdminPortal';

const AirPayMasterDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-full mx-auto p-2 md:p-4">
        <Tabs defaultValue="deals" className="w-full">
          <TabsList className="w-full bg-white shadow-sm mb-4 md:mb-6 sticky top-0 z-40 rounded-xl border p-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 w-full">
              <TabsTrigger 
                value="deals" 
                className="flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
              >
                <span className="text-lg">🔥</span>
                <span className="text-xs font-medium">Smart Deals</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="billing" 
                className="flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
              >
                <span className="text-lg">💳</span>
                <span className="text-xs font-medium">Billing</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="spaza" 
                className="flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
              >
                <span className="text-lg">🏪</span>
                <span className="text-xs font-medium">Spaza Market</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="alerts" 
                className="flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
              >
                <span className="text-lg">🔔</span>
                <span className="text-xs font-medium">Deal Alerts</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="notifications" 
                className="flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
              >
                <span className="text-lg">💬</span>
                <span className="text-xs font-medium">Communications</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="admin" 
                className="flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-500 data-[state=active]:to-slate-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
              >
                <span className="text-lg">⚙️</span>
                <span className="text-xs font-medium">Admin Portal</span>
              </TabsTrigger>
            </div>
          </TabsList>

          <TabsContent value="deals" className="space-y-4 md:space-y-6 px-1 md:px-0">
            <AirtimeDealsSystem />
          </TabsContent>

          <TabsContent value="billing" className="space-y-4 md:space-y-6 px-1 md:px-0">
            <BillingDashboard />
          </TabsContent>

          <TabsContent value="spaza" className="space-y-4 md:space-y-6 px-1 md:px-0">
            <SpazaMarketplace />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4 md:space-y-6 px-1 md:px-0">
            <DealAlertSystem />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 md:space-y-6 px-1 md:px-0">
            <NotificationCenter />
          </TabsContent>

          <TabsContent value="admin" className="space-y-4 md:space-y-6 px-1 md:px-0">
            <AdminPortal />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AirPayMasterDashboard;
