import { useState, useEffect } from 'react';

interface DashboardData {
  customerData: any;
  vendorData: any;
  adminData: any;
}

export const useDashboardData = () => {
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

  return {
    customerData,
    vendorData,
    adminData,
    balances: getTotalBalances()
  };
};