
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import MVNEDataExtractionPanel from './MVNEDataExtractionPanel';
import MVNEDailyRechargePanel from './MVNEDailyRechargePanel';

const DashboardManager = () => {
  const [customerData, setCustomerData] = useState<any>(null);
  const [vendorData, setVendorData] = useState<any>(null);
  const [adminData, setAdminData] = useState<any>(null);

  useEffect(() => {
    // Load all profile data
    const customer = localStorage.getItem('onecardUser');
    const vendor = localStorage.getItem('onecardVendor');
    const admin = localStorage.getItem('onecardAdmin');

    if (customer) setCustomerData(JSON.parse(customer));
    if (vendor) setVendorData(JSON.parse(vendor));
    if (admin) setAdminData(JSON.parse(admin));
  }, []);

  const getTotalBalances = () => {
    const customerBalance = customerData?.cashbackBalance || 0;
    const vendorBalance = vendorData?.cashbackBalance || 0;
    const adminBalance = adminData?.cashbackBalance || 0;
    
    return {
      totalCustomer: customerBalance,
      totalVendor: vendorBalance,
      totalAdmin: adminBalance,
      grandTotal: customerBalance + vendorBalance + adminBalance
    };
  };

  const balances = getTotalBalances();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2">OneCard Balance Management Dashboard</h3>
        <p className="text-gray-600">Comprehensive oversight of all OneCard cashback rewards</p>
      </div>

      {/* Total Balances Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              R{balances.totalCustomer.toFixed(2)}
            </div>
            <div className="text-gray-600 text-sm">Customer Balances</div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-2">
              R{balances.totalVendor.toFixed(2)}
            </div>
            <div className="text-gray-600 text-sm">Vendor Balances</div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-red-600 mb-2">
              R{balances.totalAdmin.toFixed(2)}
            </div>
            <div className="text-gray-600 text-sm">Admin Balance</div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              R{balances.grandTotal.toFixed(2)}
            </div>
            <div className="text-gray-600 text-sm">Total System Balance</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="customers" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="customers">Customer Profiles</TabsTrigger>
          <TabsTrigger value="vendors">Vendor Profiles</TabsTrigger>
          <TabsTrigger value="admin">Admin Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-4">
          {/* Intelligent Data Extraction Tabs */}
          <Tabs defaultValue="sim-data" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100">
              <TabsTrigger value="sim-data">SIM Card Identifiers</TabsTrigger>
              <TabsTrigger value="recharge-data">Daily Recharge Records</TabsTrigger>
            </TabsList>

            <TabsContent value="sim-data" className="space-y-4">
              <MVNEDataExtractionPanel />
            </TabsContent>

            <TabsContent value="recharge-data" className="space-y-4">
              <MVNEDailyRechargePanel />
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Customer Management</CardTitle>
            </CardHeader>
            <CardContent>
              {customerData ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold">Personal Information</h4>
                      <p>Name: {customerData.firstName} {customerData.lastName}</p>
                      <p>Email: {customerData.email}</p>
                      <p>Card Number: ****{customerData.cardNumber?.slice(-4)}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">OneCard Details</h4>
                      <p>Cashback Balance: R{customerData.cashbackBalance?.toFixed(2)}</p>
                      <p>Total Earned: R{customerData.totalEarned?.toFixed(2)}</p>
                      <p>Total Spent: R{customerData.totalSpent?.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm">View Details</Button>
                    <Button size="sm" variant="outline">Edit Profile</Button>
                    <Button size="sm" variant="outline">Manage Balance</Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No customer profiles found</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Management</CardTitle>
            </CardHeader>
            <CardContent>
              {vendorData ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold">Business Information</h4>
                      <p>Owner: {vendorData.firstName} {vendorData.lastName}</p>
                      <p>Company: {vendorData.companyName}</p>
                      <p>Email: {vendorData.email}</p>
                      <p>Vendor ID: ****{vendorData.vendorId?.slice(-4)}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">OneCard Gold Details</h4>
                      <p>Cashback Balance: R{vendorData.cashbackBalance?.toFixed(2)}</p>
                      <p>Commission Rate: {vendorData.commissionRate}%</p>
                      <p>Total Earned: R{vendorData.totalEarned?.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm">View Details</Button>
                    <Button size="sm" variant="outline">Edit Profile</Button>
                    <Button size="sm" variant="outline">Manage Commission</Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No vendor profiles found</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admin" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Administrator Profile</CardTitle>
            </CardHeader>
            <CardContent>
              {adminData ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold">Administrator Information</h4>
                      <p>Name: {adminData.firstName} {adminData.lastName}</p>
                      <p>Email: {adminData.email}</p>
                      <p>Role: {adminData.adminRole}</p>
                      <p>Admin ID: ****{adminData.adminId?.slice(-4)}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">OneCard Platinum Details</h4>
                      <p>System Access: {adminData.accessLevel}</p>
                      <p>Commission Rate: {adminData.systemCommission}%</p>
                      <p>Total Customers: {adminData.totalCustomers}</p>
                      <p>Total Vendors: {adminData.totalVendors}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm">System Settings</Button>
                    <Button size="sm" variant="outline">Security Settings</Button>
                    <Button size="sm" variant="outline">Audit Logs</Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No admin profile found</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardManager;
