
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const RevenueReporting = () => {
  const [revenueData, setRevenueData] = useState({
    totalRevenue: 125840.50,
    customerCashback: 3145.75,
    adminMarkup: 3145.75,
    networkPayments: 119549.00,
    transactions: 1258
  });

  const [breakdownData] = useState([
    {
      category: 'Customer Cashback (2.5%)',
      amount: 3145.75,
      percentage: 2.5,
      recipients: 1258,
      color: 'text-blue-600'
    },
    {
      category: 'Admin Markup (2.5%)',
      amount: 3145.75,
      percentage: 2.5,
      recipients: 1,
      color: 'text-yellow-600'
    },
    {
      category: 'Network Payments (95%)',
      amount: 119549.00,
      percentage: 95.0,
      recipients: 8,
      color: 'text-green-600'
    }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2">Revenue Breakdown & Reporting</h3>
        <p className="text-gray-600">Comprehensive revenue analysis and distribution tracking</p>
      </div>

      {/* Revenue Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              R{revenueData.totalRevenue.toLocaleString()}
            </div>
            <div className="text-gray-600 text-sm">Total Revenue</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              R{revenueData.customerCashback.toLocaleString()}
            </div>
            <div className="text-gray-600 text-sm">Customer Cashback</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-2">
              R{revenueData.adminMarkup.toLocaleString()}
            </div>
            <div className="text-gray-600 text-sm">Admin Markup</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              R{revenueData.networkPayments.toLocaleString()}
            </div>
            <div className="text-gray-600 text-sm">Network Payments</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown Table */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Distribution Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Amount (R)</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {breakdownData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.category}</TableCell>
                  <TableCell className={item.color}>
                    R{item.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>{item.percentage}%</TableCell>
                  <TableCell>{item.recipients}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Processed
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Admin OneCard Gold Summary */}
      <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            💳 Admin OneCard Gold Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">
                R{revenueData.adminMarkup.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Markup Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">
                {revenueData.transactions}
              </div>
              <div className="text-sm text-gray-600">Transactions Processed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">2.5%</div>
              <div className="text-sm text-gray-600">Admin Markup Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueReporting;
