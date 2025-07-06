
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

const OrderManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2">🏢 Divine Mobile Order Management System</h3>
        <p className="text-gray-600">Comprehensive MVNO operations with MNO integrations and real-time processing</p>
      </div>

      <Tabs defaultValue="integration" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="integration">MNO Integration</TabsTrigger>
          <TabsTrigger value="processing">Real-Time Orders</TabsTrigger>
          <TabsTrigger value="customers">Customer Management</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Control</TabsTrigger>
          <TabsTrigger value="financial">Financial Analytics</TabsTrigger>
          <TabsTrigger value="onecard">OneCard Balances</TabsTrigger>
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

      </Tabs>
    </div>
  );
};

export default OrderManagement;
