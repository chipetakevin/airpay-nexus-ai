
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import MNOIntegrationPanel from './orderManagement/MNOIntegrationPanel';
import RealTimeOrderProcessor from './orderManagement/RealTimeOrderProcessor';
import CustomerManagementPanel from './orderManagement/CustomerManagementPanel';
import InventoryManagementSystem from './orderManagement/InventoryManagementSystem';
import FinancialDistributionPanel from './orderManagement/FinancialDistributionPanel';
import OneCardBalancePanel from './orderManagement/OneCardBalancePanel';
import SecurityCenter from './orderManagement/SecurityCenter';

const OrderManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2">🏢 Divine Mobile Order Management System</h3>
        <p className="text-gray-600">Comprehensive MVNO operations with MNO integrations and real-time processing</p>
      </div>

      <Tabs defaultValue="integration" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1 h-auto p-2">
          <TabsTrigger value="integration" className="text-xs sm:text-sm px-2 py-2 h-auto whitespace-nowrap">
            MNO Integration
          </TabsTrigger>
          <TabsTrigger value="processing" className="text-xs sm:text-sm px-2 py-2 h-auto whitespace-nowrap">
            Real-Time Orders
          </TabsTrigger>
          <TabsTrigger value="customers" className="text-xs sm:text-sm px-2 py-2 h-auto whitespace-nowrap">
            Customer Management
          </TabsTrigger>
          <TabsTrigger value="inventory" className="text-xs sm:text-sm px-2 py-2 h-auto whitespace-nowrap">
            Inventory Control
          </TabsTrigger>
          <TabsTrigger value="financial" className="text-xs sm:text-sm px-2 py-2 h-auto whitespace-nowrap">
            Financial Analytics
          </TabsTrigger>
          <TabsTrigger value="onecard" className="text-xs sm:text-sm px-2 py-2 h-auto whitespace-nowrap bg-gradient-to-r from-yellow-100 to-amber-100 text-amber-700 border border-amber-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-600 data-[state=active]:to-amber-600 data-[state=active]:text-white">
            OneCard Balances
          </TabsTrigger>
          <TabsTrigger value="security" className="text-xs sm:text-sm px-2 py-2 h-auto whitespace-nowrap">
            Security Center
          </TabsTrigger>
        </TabsList>

        <TabsContent value="integration">
          <MNOIntegrationPanel />
        </TabsContent>

        <TabsContent value="processing">
          <RealTimeOrderProcessor />
        </TabsContent>

        <TabsContent value="customers">
          <CustomerManagementPanel />
        </TabsContent>

        <TabsContent value="inventory">
          <InventoryManagementSystem />
        </TabsContent>

        <TabsContent value="financial">
          <FinancialDistributionPanel />
        </TabsContent>

        <TabsContent value="onecard">
          <OneCardBalancePanel />
        </TabsContent>

        <TabsContent value="security">
          <SecurityCenter />
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default OrderManagement;
