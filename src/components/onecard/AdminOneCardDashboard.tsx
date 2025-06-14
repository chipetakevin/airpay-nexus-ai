
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import AdminDashboardHeader from './admin/AdminDashboardHeader';
import AdminQuickStats from './admin/AdminQuickStats';
import CustomerTable from './admin/CustomerTable';
import TransactionTable from './admin/TransactionTable';
import ReportsSection from './admin/ReportsSection';
import CustomerDetailModal from './admin/CustomerDetailModal';
import { Customer, Transaction } from './types/admin';
import { loadCustomerData, loadTransactionData } from './utils/adminDataLoader';
import { generateCustomerReport, generateMasterReport } from './utils/pdfGenerator';

const AdminOneCardDashboard = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [activeTab, setActiveTab] = useState('customers');
  const { toast } = useToast();

  useEffect(() => {
    setCustomers(loadCustomerData());
    setTransactions(loadTransactionData());
  }, []);

  const getCustomerTransactions = (customerId: string) => {
    return transactions.filter(tx => tx.customerId === customerId);
  };

  const handleGenerateCustomerReport = (customer: Customer) => {
    const customerTransactions = getCustomerTransactions(customer.id);
    generateCustomerReport(customer, customerTransactions, toast);
  };

  const handleGenerateMasterReport = () => {
    generateMasterReport(customers, transactions, toast);
  };

  const tabs = [
    {
      value: 'customers',
      label: 'Customer Management',
      icon: '👥',
      description: 'Directory',
      color: 'blue'
    },
    {
      value: 'transactions',
      label: 'Transaction History',
      icon: '📊',
      description: 'Records',
      color: 'green'
    },
    {
      value: 'reports',
      label: 'Reports & Analytics',
      icon: '📈',
      description: 'Insights',
      color: 'purple'
    }
  ];

  const getTabClassName = (tabValue: string, color: string) => {
    let baseClass = "flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300 min-h-[65px] flex-1 border text-xs shadow-sm relative overflow-hidden";
    
    const colorClasses = {
      blue: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-blue-400 bg-blue-50 border-blue-200 hover:border-blue-300 hover:bg-blue-100",
      green: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-green-400 bg-green-50 border-green-200 hover:border-green-300 hover:bg-green-100",
      purple: "data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-purple-400 bg-purple-50 border-purple-200 hover:border-purple-300 hover:bg-purple-100"
    };
    
    baseClass += " " + colorClasses[color];
    return baseClass;
  };

  return (
    <div className="space-y-6">
      <AdminDashboardHeader />
      <AdminQuickStats customers={customers} transactions={transactions} />

      <div className="w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Enhanced Mobile-First Navigation */}
          <div className="w-full mb-6">
            <TabsList className="w-full max-w-full">
              {/* Mobile: Single column for better touch targets */}
              <div className="grid grid-cols-1 gap-2 w-full sm:hidden">
                {tabs.map((tab) => (
                  <TabsTrigger 
                    key={tab.value}
                    value={tab.value} 
                    className={getTabClassName(tab.value, tab.color)}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <div className="text-center">
                      <div className="font-semibold leading-tight text-sm">{tab.label}</div>
                      <div className="text-xs opacity-75 leading-tight">{tab.description}</div>
                    </div>
                  </TabsTrigger>
                ))}
              </div>

              {/* Tablet: 2 columns */}
              <div className="hidden sm:grid sm:grid-cols-2 lg:hidden gap-2 w-full">
                {tabs.slice(0, 2).map((tab) => (
                  <TabsTrigger 
                    key={tab.value}
                    value={tab.value} 
                    className={getTabClassName(tab.value, tab.color)}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <div className="text-center">
                      <div className="font-semibold text-sm">{tab.label}</div>
                      <div className="text-xs opacity-75">{tab.description}</div>
                    </div>
                  </TabsTrigger>
                ))}
                {/* Reports tab on second row */}
                <div className="col-span-2">
                  <TabsTrigger 
                    value={tabs[2].value} 
                    className={`${getTabClassName(tabs[2].value, tabs[2].color)} w-full`}
                  >
                    <span className="text-lg">{tabs[2].icon}</span>
                    <div className="text-center">
                      <div className="font-semibold text-sm">{tabs[2].label}</div>
                      <div className="text-xs opacity-75">{tabs[2].description}</div>
                    </div>
                  </TabsTrigger>
                </div>
              </div>

              {/* Desktop: Single Row */}
              <div className="hidden lg:grid lg:grid-cols-3 gap-2 w-full">
                {tabs.map((tab) => (
                  <TabsTrigger 
                    key={tab.value}
                    value={tab.value} 
                    className={getTabClassName(tab.value, tab.color)}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <div className="text-center">
                      <div className="font-semibold text-sm">{tab.label}</div>
                      <div className="text-xs opacity-75">{tab.description}</div>
                    </div>
                  </TabsTrigger>
                ))}
              </div>
            </TabsList>
          </div>

          {/* Tab Content */}
          <div className="w-full">
            <TabsContent value="customers" className="space-y-4 animate-fade-in">
              <CustomerTable
                customers={customers}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onCustomerSelect={setSelectedCustomer}
                onGenerateReport={handleGenerateCustomerReport}
                onGenerateMasterReport={handleGenerateMasterReport}
              />
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4 animate-fade-in">
              <TransactionTable transactions={transactions} />
            </TabsContent>

            <TabsContent value="reports" className="space-y-4 animate-fade-in">
              <ReportsSection onGenerateMasterReport={handleGenerateMasterReport} />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {selectedCustomer && (
        <CustomerDetailModal
          customer={selectedCustomer}
          customerTransactions={getCustomerTransactions(selectedCustomer.id)}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </div>
  );
};

export default AdminOneCardDashboard;
