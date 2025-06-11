
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, TrendingUp } from 'lucide-react';

const WhatsAppAnalytics = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="w-5 h-5" />
            Business Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Total Business Conversations</span>
              <span className="font-bold">8,432</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Successful Transactions</span>
              <span className="font-bold text-green-600">7,892</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Customer Satisfaction</span>
              <span className="font-bold text-blue-600">4.8/5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Avg Session Duration</span>
              <span className="font-bold">3m 24s</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Revenue Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Today's Revenue</span>
              <span className="font-bold">R 124,567</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Weekly Revenue</span>
              <span className="font-bold text-green-600">R 892,340</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Monthly Revenue</span>
              <span className="font-bold text-blue-600">R 3.2M</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Growth Rate</span>
              <span className="font-bold text-purple-600">+18.5%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppAnalytics;
