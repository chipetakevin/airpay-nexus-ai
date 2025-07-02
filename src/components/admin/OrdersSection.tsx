import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import OrderManagement from './OrderManagement';

const OrdersSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h2 className="text-xl md:text-2xl font-bold flex items-center justify-center md:justify-start gap-2 mb-2">
          <span className="text-2xl">📦</span>
          Order Management System
        </h2>
        <p className="text-muted-foreground">Complete order tracking with vendor, broker, and customer management</p>
      </div>

      <OrderManagement />
    </div>
  );
};

export default OrdersSection;