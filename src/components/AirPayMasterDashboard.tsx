
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
          <TabsList className="grid w-full grid-cols-6 bg-white shadow-sm mb-4 md:mb-6 sticky top-0 z-40">
            <TabsTrigger value="deals" className="text-xs md:text-sm">Smart Deals</TabsTrigger>
            <TabsTrigger value="billing" className="text-xs md:text-sm">Billing</TabsTrigger>
            <TabsTrigger value="spaza" className="text-xs md:text-sm">Spaza Market</TabsTrigger>
            <TabsTrigger value="alerts" className="text-xs md:text-sm">Deal Alerts</TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs md:text-sm">Communications</TabsTrigger>
            <TabsTrigger value="admin" className="text-xs md:text-sm">Admin Portal</TabsTrigger>
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
