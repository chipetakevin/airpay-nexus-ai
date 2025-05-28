
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const OrderManagement = () => {
  const { toast } = useToast();
  
  const [orders] = useState([
    {
      id: 'ORD-2024-001',
      customer: 'John Doe',
      type: 'Airtime',
      amount: 50.00,
      network: 'MTN',
      status: 'Completed',
      customerCashback: 1.25,
      adminMarkup: 1.25,
      networkPayment: 47.50,
      timestamp: '2024-01-15T14:30:00',
      receipt: 'RCP-001-2024'
    },
    {
      id: 'ORD-2024-002',
      customer: 'Jane Smith',
      type: 'Data Bundle',
      amount: 100.00,
      network: 'Vodacom',
      status: 'Processing',
      customerCashback: 2.50,
      adminMarkup: 2.50,
      networkPayment: 95.00,
      timestamp: '2024-01-15T15:15:00',
      receipt: 'RCP-002-2024'
    },
    {
      id: 'ORD-2024-003',
      customer: 'Mike Johnson',
      type: 'Airtime',
      amount: 25.00,
      network: 'Cell C',
      status: 'Completed',
      customerCashback: 0.63,
      adminMarkup: 0.63,
      networkPayment: 23.74,
      timestamp: '2024-01-15T16:00:00',
      receipt: 'RCP-003-2024'
    }
  ]);

  const [vendors] = useState([
    {
      id: 'VEN-001',
      name: 'MTN Reseller Hub',
      type: 'Primary Vendor',
      commissionRate: 1.5,
      totalSales: 25680.50,
      status: 'Active'
    },
    {
      id: 'VEN-002',
      name: 'Vodacom Partner Store',
      type: 'Authorized Dealer',
      commissionRate: 1.2,
      totalSales: 18900.25,
      status: 'Active'
    },
    {
      id: 'BRK-001',
      name: 'AirPay Distribution',
      type: 'Service Broker',
      commissionRate: 0.8,
      totalSales: 12450.00,
      status: 'Active'
    }
  ]);

  const handleGenerateReceipt = (orderId: string, receiptId: string) => {
    toast({
      title: "Receipt Generated",
      description: `Receipt ${receiptId} for order ${orderId} has been generated and sent`,
    });
  };

  const handleProcessPayment = (orderId: string) => {
    toast({
      title: "Payment Processed",
      description: `Payment for order ${orderId} has been processed successfully`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2">Order Management System</h3>
        <p className="text-gray-600">Complete order tracking with vendor, broker, and customer management</p>
      </div>

      {/* Order Processing Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders & Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Network</TableHead>
                <TableHead>Customer Cashback</TableHead>
                <TableHead>Admin Markup</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.type}</TableCell>
                  <TableCell>R{order.amount.toFixed(2)}</TableCell>
                  <TableCell>{order.network}</TableCell>
                  <TableCell className="text-blue-600">
                    R{order.customerCashback.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-yellow-600">
                    R{order.adminMarkup.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleGenerateReceipt(order.id, order.receipt)}
                      >
                        Receipt
                      </Button>
                      {order.status === 'Processing' && (
                        <Button
                          size="sm"
                          onClick={() => handleProcessPayment(order.id)}
                        >
                          Process
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Vendor & Broker Management */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor & Broker Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Commission Rate</TableHead>
                <TableHead>Total Sales</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-medium">{vendor.id}</TableCell>
                  <TableCell>{vendor.name}</TableCell>
                  <TableCell>{vendor.type}</TableCell>
                  <TableCell>{vendor.commissionRate}%</TableCell>
                  <TableCell>R{vendor.totalSales.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {vendor.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      Manage
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Customer Experience Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Mobile User Experience Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">98.5%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">2.3s</div>
              <div className="text-sm text-gray-600">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">4.8/5</div>
              <div className="text-sm text-gray-600">Customer Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">1,258</div>
              <div className="text-sm text-gray-600">Daily Transactions</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Automated Features Info */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="text-green-600 text-lg">⚡</div>
            <div>
              <h4 className="font-medium text-green-800 mb-1">Automated Order Processing</h4>
              <p className="text-sm text-green-700">
                Orders are automatically processed with instant receipts, payment distribution, 
                and email notifications to all stakeholders including customers, networks, and vendors.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderManagement;
