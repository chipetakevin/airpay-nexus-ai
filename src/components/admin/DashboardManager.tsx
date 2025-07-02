import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useScrollCollapse } from '@/hooks/useScrollCollapse';
import { useDashboardData } from '@/hooks/useDashboardData';
import BalanceOverviewSection from './sections/BalanceOverviewSection';
import TabNavigationSection from './sections/TabNavigationSection';
import CustomerProfileSection from './sections/CustomerProfileSection';
import VendorProfileSection from './sections/VendorProfileSection';
import AdminProfileSection from './sections/AdminProfileSection';
import DataExtractionCenter from './sections/DataExtractionCenter';

const DashboardManager = () => {
  const [activeMainTab, setActiveMainTab] = useState('customers');
  const [activeDataTab, setActiveDataTab] = useState('sim-data');
  
  const { customerData, vendorData, adminData, balances } = useDashboardData();
  const {
    isBalancesCollapsed,
    setIsBalancesCollapsed,
    isCustomerProfileCollapsed,
    setIsCustomerProfileCollapsed
  } = useScrollCollapse();

  const mainTabs = [
    { id: 'customers', label: 'Customer Profiles' },
    { id: 'vendors', label: 'Vendor Profiles' },
    { id: 'admin', label: 'Admin Profile' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2">OneCard Balance Management Dashboard</h3>
        <p className="text-gray-600">Comprehensive oversight of all OneCard cashback rewards</p>
      </div>

      {/* Total Balances Overview */}
      <BalanceOverviewSection 
        balances={balances}
        isCollapsed={isBalancesCollapsed}
        onToggleCollapse={setIsBalancesCollapsed}
      />

      {/* Custom Tab Navigation */}
      <div className="w-full">
        <TabNavigationSection 
          tabs={mainTabs}
          activeTab={activeMainTab}
          onTabChange={setActiveMainTab}
        />

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
                    
                    {/* Divine Mobile Data Extraction Center */}
                    <DataExtractionCenter 
                      activeDataTab={activeDataTab}
                      onDataTabChange={setActiveDataTab}
                    />
                  </div>

                  {/* Customer Profile Section */}
                  <CustomerProfileSection 
                    customerData={customerData}
                    isCollapsed={isCustomerProfileCollapsed}
                    onToggleCollapse={setIsCustomerProfileCollapsed}
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {activeMainTab === 'vendors' && (
            <VendorProfileSection vendorData={vendorData} />
          )}

          {activeMainTab === 'admin' && (
            <AdminProfileSection adminData={adminData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardManager;