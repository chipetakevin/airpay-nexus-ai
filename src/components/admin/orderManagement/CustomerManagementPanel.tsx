import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import BulkActionsPanel from './BulkActionsPanel';

interface Customer {
  id: string;
  name: string;
  msisdn: string;
  network: string;
  registrationDate: string;
  totalSpent: number;
  totalOrders: number;
  averageOrderValue: number;
  lastOrderDate: string;
  status: 'active' | 'inactive' | 'suspended';
  ricaStatus: 'verified' | 'pending' | 'expired';
  preferences: {
    preferredNetwork: string;
    autoRecharge: boolean;
    notifications: boolean;
  };
}

const CustomerManagementPanel = () => {
  const { toast } = useToast();
  const [customers] = useState<Customer[]>([
    {
      id: 'CUST-001',
      name: 'John Doe',
      msisdn: '0821234567',
      network: 'MTN',
      registrationDate: '2024-01-10',
      totalSpent: 1250.50,
      totalOrders: 25,
      averageOrderValue: 50.02,
      lastOrderDate: '2024-01-15',
      status: 'active',
      ricaStatus: 'verified',
      preferences: {
        preferredNetwork: 'MTN',
        autoRecharge: true,
        notifications: true
      }
    },
    {
      id: 'CUST-002',
      name: 'Jane Smith',
      msisdn: '0827654321',
      network: 'Vodacom',
      registrationDate: '2024-01-08',
      totalSpent: 2100.75,
      totalOrders: 42,
      averageOrderValue: 50.02,
      lastOrderDate: '2024-01-14',
      status: 'active',
      ricaStatus: 'verified',
      preferences: {
        preferredNetwork: 'Vodacom',
        autoRecharge: false,
        notifications: true
      }
    },
    {
      id: 'CUST-003',
      name: 'Mike Johnson',
      msisdn: '0834567890',
      network: 'Cell C',
      registrationDate: '2024-01-12',
      totalSpent: 875.25,
      totalOrders: 18,
      averageOrderValue: 48.62,
      lastOrderDate: '2024-01-13',
      status: 'active',
      ricaStatus: 'pending',
      preferences: {
        preferredNetwork: 'Cell C',
        autoRecharge: true,
        notifications: false
      }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [bulkActionModal, setBulkActionModal] = useState<{
    isOpen: boolean;
    action: 'sms' | 'topup' | 'rica' | null;
  }>({ isOpen: false, action: null });

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.msisdn.includes(searchTerm) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTopUp = (customer: Customer) => {
    toast({
      title: "Top-Up Initiated",
      description: `Processing top-up for ${customer.name} (${customer.msisdn})`,
    });
  };

  const handleSendMessage = (customer: Customer) => {
    toast({
      title: "Message Sent",
      description: `SMS notification sent to ${customer.name}`,
    });
  };

  // Bulk Actions Handlers
  const handleBulkSMSCampaign = () => {
    if (selectedCustomers.length === 0) {
      toast({
        title: "No Customers Selected",
        description: "Please select customers for the SMS campaign",
        variant: "destructive"
      });
      return;
    }
    setBulkActionModal({ isOpen: true, action: 'sms' });
  };

  const handleBulkTopUp = () => {
    if (selectedCustomers.length === 0) {
      toast({
        title: "No Customers Selected", 
        description: "Please select customers for bulk top-up",
        variant: "destructive"
      });
      return;
    }
    setBulkActionModal({ isOpen: true, action: 'topup' });
  };

  const handleRICAStatusUpdate = () => {
    if (selectedCustomers.length === 0) {
      toast({
        title: "No Customers Selected",
        description: "Please select customers for RICA status update",
        variant: "destructive"
      });
      return;
    }
    setBulkActionModal({ isOpen: true, action: 'rica' });
  };

  const handleExportCustomerData = () => {
    // Generate CSV export
    const csvData = filteredCustomers.map(customer => ({
      ID: customer.id,
      Name: customer.name,
      Phone: customer.msisdn,
      Network: customer.network,
      'Registration Date': customer.registrationDate,
      'Total Spent': customer.totalSpent,
      'Total Orders': customer.totalOrders,
      Status: customer.status,
      'RICA Status': customer.ricaStatus
    }));

    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `customers_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export Completed",
      description: `${filteredCustomers.length} customer records exported`,
    });
  };

  const handleSelectCustomer = (customerId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedCustomers(prev => [...prev, customerId]);
    } else {
      setSelectedCustomers(prev => prev.filter(id => id !== customerId));
    }
  };

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedCustomers(filteredCustomers.map(c => c.id));
    } else {
      setSelectedCustomers([]);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRicaStatusColor = (status: string) => {
    switch(status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2">Customer Management</h3>
        <p className="text-gray-600">Manage Divine Mobile customers and their services</p>
      </div>

      <Tabs defaultValue="customers" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="bulk-actions">Bulk Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Customer Directory</CardTitle>
                <div className="flex gap-2">
                  <Input
                    placeholder="Search customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                  <Button>Add Customer</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Bulk Selection Controls */}
              <div className="flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                <Checkbox
                  checked={selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm font-medium">
                  Select All ({selectedCustomers.length} of {filteredCustomers.length} selected)
                </span>
                {selectedCustomers.length > 0 && (
                  <div className="flex gap-2 ml-auto">
                    <Button size="sm" onClick={handleBulkSMSCampaign}>
                      📱 SMS ({selectedCustomers.length})
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleBulkTopUp}>
                      💳 Top-Up ({selectedCustomers.length})
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleRICAStatusUpdate}>
                      🔄 RICA ({selectedCustomers.length})
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCustomers.map((customer) => (
                  <Card key={customer.id} className={`cursor-pointer hover:shadow-md ${selectedCustomers.includes(customer.id) ? 'ring-2 ring-blue-500' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-start gap-2">
                          <Checkbox
                            checked={selectedCustomers.includes(customer.id)}
                            onCheckedChange={(checked) => handleSelectCustomer(customer.id, !!checked)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div onClick={() => setSelectedCustomer(customer)}>
                            <h4 className="font-semibold">{customer.name}</h4>
                            <p className="text-sm text-gray-600">{customer.msisdn}</p>
                            <p className="text-xs text-gray-500">{customer.id}</p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Badge className={getStatusColor(customer.status)}>
                            {customer.status}
                          </Badge>
                          <Badge className={getRicaStatusColor(customer.ricaStatus)}>
                            RICA: {customer.ricaStatus}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Network:</span>
                          <span className="font-medium">{customer.network}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Spent:</span>
                          <span className="font-medium">R{customer.totalSpent.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Orders:</span>
                          <span className="font-medium">{customer.totalOrders}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Avg Order:</span>
                          <span className="font-medium">R{customer.averageOrderValue.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" onClick={(e) => { e.stopPropagation(); handleTopUp(customer); }}>
                          Top-Up
                        </Button>
                        <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleSendMessage(customer); }}>
                          Message
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">{customers.length}</div>
                <div className="text-sm text-gray-600">Total Customers</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">{customers.filter(c => c.status === 'active').length}</div>
                <div className="text-sm text-gray-600">Active Customers</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-600">
                  R{customers.reduce((acc, c) => acc + c.totalSpent, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Revenue</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-orange-600">
                  R{(customers.reduce((acc, c) => acc + c.totalSpent, 0) / customers.length).toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Avg Customer Value</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Network Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['MTN', 'Vodacom', 'Cell C', 'Telkom'].map(network => {
                  const count = customers.filter(c => c.network === network).length;
                  const percentage = (count / customers.length) * 100;
                  return (
                    <div key={network} className="flex items-center justify-between">
                      <span className="font-medium">{network}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{count} ({percentage.toFixed(1)}%)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk-actions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Customer Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  className="h-20 flex flex-col bg-blue-600 hover:bg-blue-700" 
                  onClick={() => handleBulkSMSCampaign()}
                >
                  <span className="text-lg">📱</span>
                  <span>Bulk SMS Campaign</span>
                </Button>
                <Button 
                  className="h-20 flex flex-col" 
                  variant="outline"
                  onClick={() => handleBulkTopUp()}
                >
                  <span className="text-lg">💳</span>
                  <span>Bulk Top-Up</span>
                </Button>
                <Button 
                  className="h-20 flex flex-col" 
                  variant="outline"
                  onClick={() => handleExportCustomerData()}
                >
                  <span className="text-lg">📊</span>
                  <span>Export Customer Data</span>
                </Button>
                <Button 
                  className="h-20 flex flex-col" 
                  variant="outline"
                  onClick={() => handleRICAStatusUpdate()}
                >
                  <span className="text-lg">🔄</span>
                  <span>RICA Status Update</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{selectedCustomer.name} - Detailed View</CardTitle>
                <Button variant="outline" onClick={() => setSelectedCustomer(null)}>Close</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Customer ID</Label>
                  <p className="font-medium">{selectedCustomer.id}</p>
                </div>
                <div>
                  <Label>MSISDN</Label>
                  <p className="font-medium">{selectedCustomer.msisdn}</p>
                </div>
                <div>
                  <Label>Network</Label>
                  <p className="font-medium">{selectedCustomer.network}</p>
                </div>
                <div>
                  <Label>Registration Date</Label>
                  <p className="font-medium">{new Date(selectedCustomer.registrationDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <Label>Preferences</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span>Preferred Network:</span>
                    <span className="font-medium">{selectedCustomer.preferences.preferredNetwork}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Auto Recharge:</span>
                    <Badge className={selectedCustomer.preferences.autoRecharge ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {selectedCustomer.preferences.autoRecharge ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Notifications:</span>
                    <Badge className={selectedCustomer.preferences.notifications ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {selectedCustomer.preferences.notifications ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={() => handleTopUp(selectedCustomer)}>Process Top-Up</Button>
                <Button variant="outline" onClick={() => handleSendMessage(selectedCustomer)}>Send Message</Button>
                <Button variant="outline">View Order History</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Bulk Actions Modal */}
      <BulkActionsPanel
        isOpen={bulkActionModal.isOpen}
        onClose={() => setBulkActionModal({ isOpen: false, action: null })}
        action={bulkActionModal.action}
        selectedCustomers={selectedCustomers}
      />
    </div>
  );
};

export default CustomerManagementPanel;