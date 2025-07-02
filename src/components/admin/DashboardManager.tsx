import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp } from 'lucide-react';
import MVNEDataExtractionPanel from './MVNEDataExtractionPanel';
import MVNEDailyRechargePanel from './MVNEDailyRechargePanel';

const DashboardManager = () => {
  const [customerData, setCustomerData] = useState<any>(null);
  const [vendorData, setVendorData] = useState<any>(null);
  const [adminData, setAdminData] = useState<any>(null);
  const [activeMainTab, setActiveMainTab] = useState('customers');
  const [activeDataTab, setActiveDataTab] = useState('sim-data');
  const [isBalancesCollapsed, setIsBalancesCollapsed] = useState(false);

  useEffect(() => {
    // Load all profile data
    const customer = localStorage.getItem('onecardUser');
    const vendor = localStorage.getItem('onecardVendor');
    const admin = localStorage.getItem('onecardAdmin');

    if (customer) setCustomerData(JSON.parse(customer));
    if (vendor) setVendorData(JSON.parse(vendor));
    if (admin) setAdminData(JSON.parse(admin));
  }, []);

  // Add scroll detection to collapse balance cards when scrolling down
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If scrolling down and balances are not collapsed, collapse them
      if (currentScrollY > lastScrollY && currentScrollY > 50 && !isBalancesCollapsed) {
        setIsBalancesCollapsed(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isBalancesCollapsed]);

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

  const mainTabs = [
    { id: 'customers', label: 'Customer Profiles' },
    { id: 'vendors', label: 'Vendor Profiles' },
    { id: 'admin', label: 'Admin Profile' }
  ];

  const dataTabs = [
    { id: 'sim-data', label: 'SIM Card Identifiers' },
    { id: 'recharge-data', label: 'Daily Recharge Records' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2">OneCard Balance Management Dashboard</h3>
        <p className="text-gray-600">Comprehensive oversight of all OneCard cashback rewards</p>
      </div>

      {/* Total Balances Overview */}
      {!isBalancesCollapsed && (
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
      )}

      {/* Collapsed Balance Summary */}
      {isBalancesCollapsed && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-sm font-medium text-muted-foreground">
                  System Balance Summary
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-700">
                  R{balances.grandTotal.toFixed(2)}
                </Badge>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsBalancesCollapsed(false)}
                className="text-xs text-green-700 hover:bg-green-100 flex items-center gap-1"
              >
                <ChevronDown className="w-4 h-4" />
                Show Details
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Custom Tab Navigation */}
      <div className="w-full">
        <div className="inline-flex h-auto items-center justify-center rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 p-1.5 text-muted-foreground shadow-lg border border-gray-200/50 backdrop-blur-sm w-full overflow-x-auto">
          <div className="grid w-full grid-cols-3 gap-1">
            {mainTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  console.log('Main tab clicked:', tab.id);
                  setActiveMainTab(tab.id);
                }}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-3 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[56px] flex-1 min-w-0 cursor-pointer ${
                  activeMainTab === tab.id
                    ? 'bg-white text-foreground shadow-lg shadow-blue-100/50 border border-blue-200/30'
                    : 'hover:bg-white/70 hover:shadow-md'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeMainTab === 'customers' && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-xl">🏢</span>
                    Customer Management
                  </CardTitle>
                  <p className="text-gray-600">Manage customer accounts, view balances, and handle support tickets</p>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center gap-3 p-3 bg-black text-white rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
                      <span className="text-lg">👥</span>
                      <span className="text-lg font-semibold">Manage Customers</span>
                    </div>
                    
                    {/* Divine Mobile Data Extraction Center - Moved directly under Manage Customers */}
                    <div className="mt-6 space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                        Divine Mobile Data Extraction Center
                      </h3>
                      
                      {/* Data Extraction Tabs */}
                      <div className="w-full">
                        <div className="inline-flex h-auto items-center justify-center rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-1.5 text-muted-foreground shadow-lg border border-blue-200 backdrop-blur-sm w-full">
                          <div className="grid w-full grid-cols-2 gap-1">
                            {dataTabs.map((tab) => (
                              <button
                                key={tab.id}
                                onClick={() => {
                                  console.log('Data tab clicked:', tab.id);
                                  setActiveDataTab(tab.id);
                                }}
                                className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-3 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[48px] flex-1 min-w-0 cursor-pointer ${
                                  activeDataTab === tab.id
                                    ? tab.id === 'sim-data' 
                                      ? 'bg-blue-500 text-white shadow-lg'
                                      : 'bg-purple-500 text-white shadow-lg'
                                    : 'hover:bg-white/70 hover:shadow-md'
                                }`}
                              >
                                {tab.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Data Tab Content */}
                        <div className="mt-6">
                          {activeDataTab === 'sim-data' && <MVNEDataExtractionPanel />}
                          {activeDataTab === 'recharge-data' && <MVNEDailyRechargePanel />}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Customer Profile Section */}
                  {customerData && (
                    <div className="mt-8 pt-6 border-t">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Current Customer Profile
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg">
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
                      <div className="flex space-x-2 mt-4">
                        <Button size="sm">View Details</Button>
                        <Button size="sm" variant="outline">Edit Profile</Button>
                        <Button size="sm" variant="outline">Manage Balance</Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeMainTab === 'vendors' && (
            <div className="space-y-4">
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
            </div>
          )}

          {activeMainTab === 'admin' && (
            <div className="space-y-4">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardManager;