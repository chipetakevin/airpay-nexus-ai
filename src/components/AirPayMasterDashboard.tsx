
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
      <div className="max-w-7xl mx-auto p-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            🚀 AirPay Nexus AI
          </h1>
          <p className="text-gray-600 mt-2">Complete ecosystem management platform</p>
        </div>

        <Tabs defaultValue="deals" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-white shadow-sm mb-6">
            <TabsTrigger value="deals" className="text-xs">Smart Deals</TabsTrigger>
            <TabsTrigger value="billing" className="text-xs">Billing</TabsTrigger>
            <TabsTrigger value="spaza" className="text-xs">Spaza Market</TabsTrigger>
            <TabsTrigger value="alerts" className="text-xs">Deal Alerts</TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs">Communications</TabsTrigger>
            <TabsTrigger value="admin" className="text-xs">Admin Portal</TabsTrigger>
          </TabsList>

          <TabsContent value="deals" className="space-y-6">
            <AirtimeDealsSystem />
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <BillingDashboard />
          </TabsContent>

          <TabsContent value="spaza" className="space-y-6">
            <SpazaMarketplace />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <DealAlertSystem />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <NotificationCenter />
          </TabsContent>

          <TabsContent value="admin" className="space-y-6">
            <AdminPortal />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AirPayMasterDashboard;
