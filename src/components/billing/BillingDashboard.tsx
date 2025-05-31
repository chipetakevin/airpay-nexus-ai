
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Receipt, 
  Download, 
  Share2, 
  DollarSign, 
  TrendingUp, 
  Users,
  Phone
} from 'lucide-react';

const BillingDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const billingData = {
    totalRevenue: 25840.50,
    customerProfit: 12920.25,
    vendorProfit: 9351.18,
    adminProfit: 3569.07,
    transactions: 486,
    newCustomers: 23,
    rewardsDistributed: 22271.43
  };

  const recentTransactions = [
    {
      id: 'TX001',
      type: 'Vendor Purchase',
      amount: 110.00,
      profit: 8.25,
      network: 'MTN',
      status: 'Completed'
    },
    {
      id: 'TX002',
      type: 'Customer Self',
      amount: 55.00,
      profit: 2.75,
      network: 'Vodacom',
      status: 'Completed'
    },
    {
      id: 'TX003',
      type: 'Gift Purchase',
      amount: 220.00,
      profit: 11.00,
      network: 'Cell C',
      status: 'Processing'
    }
  ];

  const handleShareReport = () => {
    // Implement WhatsApp/Email sharing
    console.log('Sharing report via WhatsApp/Email');
  };

  const handleDownloadReceipt = (transactionId: string) => {
    console.log('Downloading receipt for:', transactionId);
  };

  return (
    <div className="space-y-4 p-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">📊 AirPay Billing Dashboard</h2>
        <Button size="sm" onClick={handleShareReport} className="flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          Share Report
        </Button>
      </div>

      {/* Mobile-optimized Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <DollarSign className="w-6 h-6 mx-auto text-green-600 mb-2" />
            <div className="text-lg font-bold text-green-600">
              R{billingData.totalRevenue.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600">Total Revenue</div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 mx-auto text-blue-600 mb-2" />
            <div className="text-lg font-bold text-blue-600">
              R{billingData.rewardsDistributed.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600">Rewards Paid</div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 mx-auto text-purple-600 mb-2" />
            <div className="text-lg font-bold text-purple-600">
              {billingData.transactions}
            </div>
            <div className="text-xs text-gray-600">Transactions</div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <Phone className="w-6 h-6 mx-auto text-orange-600 mb-2" />
            <div className="text-lg font-bold text-orange-600">
              {billingData.newCustomers}
            </div>
            <div className="text-xs text-gray-600">New Customers</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="profits">Profit Share</TabsTrigger>
          <TabsTrigger value="receipts">Receipts</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-3">
          <div className="space-y-3">
            {recentTransactions.map((tx) => (
              <Card key={tx.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold">{tx.type}</div>
                      <div className="text-sm text-gray-600">{tx.network} • {tx.id}</div>
                    </div>
                    <Badge 
                      className={tx.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                    >
                      {tx.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg font-bold">R{tx.amount}</span>
                      <span className="text-sm text-green-600 ml-2">+R{tx.profit} profit</span>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleDownloadReceipt(tx.id)}>
                      <Receipt className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="profits" className="space-y-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Profit Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                <span className="text-sm">Vendor Profits (75%)</span>
                <span className="font-bold text-yellow-600">R{billingData.vendorProfit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                <span className="text-sm">Customer Rewards (50%)</span>
                <span className="font-bold text-green-600">R{billingData.customerProfit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                <span className="text-sm">Admin Profits</span>
                <span className="font-bold text-red-600">R{billingData.adminProfit.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receipts" className="space-y-3">
          <div className="text-center py-8">
            <Receipt className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <div className="text-gray-600 mb-4">Receipt management coming soon</div>
            <div className="text-sm text-gray-500">
              Auto-generated receipts will be available for download and sharing
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillingDashboard;
