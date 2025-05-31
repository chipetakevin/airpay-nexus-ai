
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const RevenueReporting = () => {
  const [revenueData] = useState({
    totalRevenue: 125840.50,
    networkCosts: 114400.45, // 91% of total revenue (network costs)
    totalMarkup: 11440.05, // 10% markup on network costs
    vendorProfits: 5148.02, // 75% of vendor purchases from markup
    customerRewards: 3861.02, // Various customer rewards
    adminProfits: 2431.01, // Admin share
    transactions: 1258
  });

  const [profitBreakdown] = useState([
    {
      category: 'Network Provider Costs',
      amount: 114400.45,
      percentage: 91.0,
      description: 'Actual network costs for airtime',
      color: 'text-gray-600'
    },
    {
      category: 'Vendor Profits (Vendor Purchases)',
      amount: 5148.02,
      percentage: 75.0,
      description: '75% of markup from vendor purchases',
      color: 'text-yellow-600'
    },
    {
      category: 'Customer Rewards (Self Purchase)',
      amount: 2287.01,
      percentage: 50.0,
      description: '50% of markup from customer self-purchases',
      color: 'text-green-600'
    },
    {
      category: 'Customer Rewards (Gift Purchase)',
      amount: 1574.01,
      percentage: 100.0,
      description: '50% each to buyer and recipient',
      color: 'text-blue-600'
    },
    {
      category: 'Admin Profits',
      amount: 2431.01,
      percentage: 21.3,
      description: 'Admin share from various transaction types',
      color: 'text-red-600'
    }
  ]);

  const [transactionTypes] = useState([
    {
      type: 'Vendor Purchases',
      count: 189,
      percentage: 15.0,
      profitShare: 'Vendor: 75%, Admin: 12.5%, Customer Cashback: 12.5%'
    },
    {
      type: 'Customer Self-Purchase',
      count: 629,
      percentage: 50.0,
      profitShare: 'Customer: 50%, Admin: 25%, Vendor Pool: 25%'
    },
    {
      type: 'Customer Gift Purchase',
      count: 440,
      percentage: 35.0,
      profitShare: 'Buyer: 50%, Recipient: 50%, Platform: 0%'
    }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2">🏦 Protected Revenue & Profit Distribution</h3>
        <p className="text-gray-600">10% markup protection with intelligent profit allocation</p>
      </div>

      {/* Revenue Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              R{revenueData.totalRevenue.toLocaleString()}
            </div>
            <div className="text-gray-600 text-sm">Total Revenue</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-gray-600 mb-2">
              R{revenueData.networkCosts.toLocaleString()}
            </div>
            <div className="text-gray-600 text-sm">Network Costs (91%)</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              R{revenueData.totalMarkup.toLocaleString()}
            </div>
            <div className="text-gray-600 text-sm">Protected Markup (10%)</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {revenueData.transactions}
            </div>
            <div className="text-gray-600 text-sm">Total Transactions</div>
          </CardContent>
        </Card>
      </div>

      {/* Profit Distribution Table */}
      <Card>
        <CardHeader>
          <CardTitle>Protected Markup Distribution (R{revenueData.totalMarkup.toLocaleString()})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Amount (R)</TableHead>
                <TableHead>Share %</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profitBreakdown.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.category}</TableCell>
                  <TableCell className={item.color}>
                    R{item.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>{item.percentage}%</TableCell>
                  <TableCell className="text-sm text-gray-600">{item.description}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800">
                      Distributed
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Transaction Type Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Type Profit Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction Type</TableHead>
                <TableHead>Count</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Profit Sharing Rule</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionTypes.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.type}</TableCell>
                  <TableCell>{item.count}</TableCell>
                  <TableCell>{item.percentage}%</TableCell>
                  <TableCell className="text-sm">{item.profitShare}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Protection Summary */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🛡️ Network Deal Protection Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">10%</div>
              <div className="text-sm text-gray-600">Automatic Markup</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">100%</div>
              <div className="text-sm text-gray-600">Profit Protection</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">Hidden</div>
              <div className="text-sm text-gray-600">Markup Display</div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-white rounded-lg border">
            <h4 className="font-semibold mb-2">Key Benefits:</h4>
            <ul className="text-sm space-y-1">
              <li>✅ Network deals protected with automatic 10% markup</li>
              <li>✅ All parties guaranteed profits - no losses incurred</li>
              <li>✅ Intelligent profit sharing based on purchase type</li>
              <li>✅ Vendor incentives encourage business growth</li>
              <li>✅ Customer rewards build loyalty and referrals</li>
              <li>✅ Admin profits ensure platform sustainability</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueReporting;
