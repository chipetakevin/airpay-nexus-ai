
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

  return (
    <div className="space-y-6">
      <AdminDashboardHeader />
      <AdminQuickStats customers={customers} transactions={transactions} />

      <Tabs defaultValue="customers" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="customers">Customer Management</TabsTrigger>
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-4">
          <CustomerTable
            customers={customers}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onCustomerSelect={setSelectedCustomer}
            onGenerateReport={handleGenerateCustomerReport}
            onGenerateMasterReport={handleGenerateMasterReport}
          />
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <TransactionTable transactions={transactions} />
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <ReportsSection onGenerateMasterReport={handleGenerateMasterReport} />
        </TabsContent>
      </Tabs>

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
