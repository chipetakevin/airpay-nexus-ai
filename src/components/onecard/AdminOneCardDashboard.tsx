
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Search, Users, CreditCard, TrendingUp, FileText, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cardNumber: string;
  onecardBalance: number;
  totalCashback: number;
  registrationDate: string;
  networkProvider: string;
  ricaVerified: boolean;
}

interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  cashbackEarned: number;
  network: string;
  status: string;
  timestamp: string;
  transactionType: string;
}

const AdminOneCardDashboard = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadCustomerData();
    loadTransactionData();
  }, []);

  const loadCustomerData = () => {
    // Load customers from localStorage (in a real app, this would be from Supabase)
    const storedCustomers = [];
    
    // Check for registered customers
    const customerData = localStorage.getItem('onecardUser');
    if (customerData) {
      const customer = JSON.parse(customerData);
      storedCustomers.push({
        id: customer.cardNumber || 'user-1',
        firstName: customer.firstName || 'Unknown',
        lastName: customer.lastName || 'User',
        email: customer.email || 'unknown@email.com',
        phone: customer.registeredPhone || 'Unknown',
        cardNumber: customer.cardNumber || 'Unknown',
        onecardBalance: Number(customer.onecardBalance) || 0,
        totalCashback: Number(customer.totalCashback) || 0,
        registrationDate: customer.registrationDate || new Date().toISOString(),
        networkProvider: customer.networkProvider || 'Unknown',
        ricaVerified: Boolean(customer.ricaVerified)
      });
    }

    // Add sample admin data for demonstration
    storedCustomers.push(
      {
        id: 'admin-kevin',
        firstName: 'Kevin',
        lastName: 'Chipeta',
        email: 'kevin@divinely.com',
        phone: '+27832466539',
        cardNumber: 'DC2024001',
        onecardBalance: 1500.00,
        totalCashback: 245.50,
        registrationDate: '2024-01-15T10:30:00Z',
        networkProvider: 'Vodacom',
        ricaVerified: true
      },
      {
        id: 'cust-001',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah@example.com',
        phone: '+27821234567',
        cardNumber: 'DC2024002',
        onecardBalance: 850.75,
        totalCashback: 125.25,
        registrationDate: '2024-02-10T14:20:00Z',
        networkProvider: 'MTN',
        ricaVerified: true
      },
      {
        id: 'cust-002',
        firstName: 'Michael',
        lastName: 'Smith',
        email: 'michael@example.com',
        phone: '+27837654321',
        cardNumber: 'DC2024003',
        onecardBalance: 420.00,
        totalCashback: 78.90,
        registrationDate: '2024-03-05T09:15:00Z',
        networkProvider: 'Cell C',
        ricaVerified: false
      }
    );

    setCustomers(storedCustomers);
  };

  const loadTransactionData = () => {
    // Load transactions from localStorage
    const storedTransactions = localStorage.getItem('userTransactions') || '[]';
    try {
      const userTransactions = JSON.parse(storedTransactions);
      
      // Add sample transactions for demo
      const sampleTransactions = [
        {
          id: 'txn-001',
          customerId: 'admin-kevin',
          customerName: 'Kevin Chipeta',
          amount: 100.00,
          cashbackEarned: 5.00,
          network: 'Vodacom',
          status: 'completed',
          timestamp: '2024-12-14T10:00:00Z',
          transactionType: 'airtime_purchase'
        },
        {
          id: 'txn-002',
          customerId: 'cust-001',
          customerName: 'Sarah Johnson',
          amount: 50.00,
          cashbackEarned: 2.50,
          network: 'MTN',
          status: 'completed',
          timestamp: '2024-12-13T15:30:00Z',
          transactionType: 'data_bundle'
        }
      ];
      
      // Ensure all transactions have proper numeric values
      const processedTransactions = [...userTransactions, ...sampleTransactions].map(tx => ({
        ...tx,
        amount: Number(tx.amount) || 0,
        cashbackEarned: Number(tx.cashbackEarned) || 0
      }));
      
      setTransactions(processedTransactions);
    } catch (error) {
      console.error('Error loading transactions:', error);
      setTransactions([]);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const getCustomerTransactions = (customerId: string) => {
    return transactions.filter(tx => tx.customerId === customerId);
  };

  const generateCustomerReport = (customer: Customer) => {
    const doc = new jsPDF();
    const customerTransactions = getCustomerTransactions(customer.id);
    
    // Header
    doc.setFontSize(20);
    doc.text('OneCard Customer Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
    
    // Customer Info
    doc.setFontSize(16);
    doc.text('Customer Information', 20, 50);
    doc.setFontSize(11);
    doc.text(`Name: ${customer.firstName} ${customer.lastName}`, 20, 65);
    doc.text(`Email: ${customer.email}`, 20, 75);
    doc.text(`Phone: ${customer.phone}`, 20, 85);
    doc.text(`Card Number: ${customer.cardNumber}`, 20, 95);
    doc.text(`Registration Date: ${new Date(customer.registrationDate).toLocaleDateString()}`, 20, 105);
    doc.text(`Network Provider: ${customer.networkProvider}`, 20, 115);
    doc.text(`RICA Verified: ${customer.ricaVerified ? 'Yes' : 'No'}`, 20, 125);
    
    // Financial Summary
    doc.setFontSize(16);
    doc.text('Financial Summary', 20, 145);
    doc.setFontSize(11);
    doc.text(`OneCard Balance: ${formatCurrency(customer.onecardBalance)}`, 20, 160);
    doc.text(`Total Cashback Earned: ${formatCurrency(customer.totalCashback)}`, 20, 170);
    doc.text(`Total Transactions: ${customerTransactions.length}`, 20, 180);
    
    const totalSpent = customerTransactions.reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);
    doc.text(`Total Amount Spent: ${formatCurrency(totalSpent)}`, 20, 190);
    
    // Recent Transactions
    if (customerTransactions.length > 0) {
      doc.setFontSize(16);
      doc.text('Recent Transactions', 20, 210);
      doc.setFontSize(9);
      
      let yPos = 225;
      customerTransactions.slice(0, 10).forEach((tx, index) => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        doc.text(`${new Date(tx.timestamp).toLocaleDateString()} - ${tx.network} - ${formatCurrency(tx.amount)} - ${tx.status}`, 20, yPos);
        yPos += 10;
      });
    }
    
    doc.save(`OneCard_Report_${customer.firstName}_${customer.lastName}_${new Date().toISOString().split('T')[0]}.pdf`);
    
    toast({
      title: "Report Generated",
      description: `Customer report for ${customer.firstName} ${customer.lastName} has been downloaded.`,
      duration: 3000,
    });
  };

  const generateMasterReport = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('OneCard Master Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
    
    // Summary Statistics
    doc.setFontSize(16);
    doc.text('Platform Overview', 20, 50);
    doc.setFontSize(11);
    doc.text(`Total Customers: ${customers.length}`, 20, 65);
    doc.text(`Total Active Cards: ${customers.length}`, 20, 75);
    
    const totalBalance = customers.reduce((sum, customer) => sum + (Number(customer.onecardBalance) || 0), 0);
    const totalCashback = customers.reduce((sum, customer) => sum + (Number(customer.totalCashback) || 0), 0);
    const totalTransactions = transactions.length;
    const totalRevenue = transactions.reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);
    
    doc.text(`Total Platform Balance: ${formatCurrency(totalBalance)}`, 20, 85);
    doc.text(`Total Cashback Distributed: ${formatCurrency(totalCashback)}`, 20, 95);
    doc.text(`Total Transactions: ${totalTransactions}`, 20, 105);
    doc.text(`Total Revenue: ${formatCurrency(totalRevenue)}`, 20, 115);
    
    // Network Breakdown
    const networkStats = customers.reduce((stats, customer) => {
      const network = customer.networkProvider || 'Unknown';
      stats[network] = (stats[network] || 0) + 1;
      return stats;
    }, {} as Record<string, number>);
    
    doc.setFontSize(16);
    doc.text('Network Distribution', 20, 135);
    doc.setFontSize(11);
    let yPos = 150;
    Object.entries(networkStats).forEach(([network, count]) => {
      doc.text(`${network}: ${count} customers`, 20, yPos);
      yPos += 10;
    });
    
    // Customer List
    doc.addPage();
    doc.setFontSize(16);
    doc.text('Customer Directory', 20, 20);
    doc.setFontSize(9);
    
    yPos = 35;
    customers.forEach((customer, index) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(`${customer.cardNumber} - ${customer.firstName} ${customer.lastName} - ${formatCurrency(customer.onecardBalance)}`, 20, yPos);
      yPos += 8;
    });
    
    doc.save(`OneCard_Master_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    
    toast({
      title: "Master Report Generated",
      description: "Complete platform report has been downloaded.",
      duration: 3000,
    });
  };

  // Fixed formatCurrency function with proper null/undefined handling
  const formatCurrency = (amount: number | null | undefined): string => {
    const numericAmount = Number(amount) || 0;
    return `R${numericAmount.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();

  return (
    <div className="space-y-6">
      {/* Admin Dashboard Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Users className="w-8 h-8" />
            OneCard Admin Dashboard
          </CardTitle>
          <p className="text-blue-100">Complete customer management and reporting suite</p>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold">{customers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total Balance</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(customers.reduce((sum, c) => sum + (Number(c.onecardBalance) || 0), 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Total Cashback</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(customers.reduce((sum, c) => sum + (Number(c.totalCashback) || 0), 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Transactions</p>
                <p className="text-2xl font-bold">{transactions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="customers" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="customers">Customer Management</TabsTrigger>
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Customer Directory</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search customers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-64"
                    />
                  </div>
                  <Button onClick={generateMasterReport}>
                    <Download className="w-4 h-4 mr-2" />
                    Master Report
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Card Number</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Cashback</TableHead>
                    <TableHead>Network</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{customer.firstName} {customer.lastName}</p>
                          <p className="text-sm text-gray-500">{customer.email}</p>
                          <p className="text-sm text-gray-500">{customer.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono">{customer.cardNumber}</TableCell>
                      <TableCell className="font-bold text-green-600">
                        {formatCurrency(customer.onecardBalance)}
                      </TableCell>
                      <TableCell className="font-bold text-purple-600">
                        {formatCurrency(customer.totalCashback)}
                      </TableCell>
                      <TableCell>{customer.networkProvider}</TableCell>
                      <TableCell>
                        <Badge variant={customer.ricaVerified ? "default" : "secondary"}>
                          {customer.ricaVerified ? 'RICA Verified' : 'Pending RICA'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedCustomer(customer)}
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => generateCustomerReport(customer)}
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Report
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Network</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Cashback</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{formatDate(transaction.timestamp)}</TableCell>
                      <TableCell>{transaction.customerName}</TableCell>
                      <TableCell>{transaction.network}</TableCell>
                      <TableCell className="font-bold">{formatCurrency(transaction.amount)}</TableCell>
                      <TableCell className="font-bold text-green-600">
                        {formatCurrency(transaction.cashbackEarned)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.transactionType}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports & Analytics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={generateMasterReport} className="h-20">
                  <div className="text-center">
                    <Download className="w-6 h-6 mx-auto mb-2" />
                    <div>Download Master Report</div>
                    <div className="text-xs opacity-75">Complete platform overview</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-20">
                  <div className="text-center">
                    <FileText className="w-6 h-6 mx-auto mb-2" />
                    <div>Financial Summary</div>
                    <div className="text-xs opacity-75">Revenue and cashback analysis</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-20">
                  <div className="text-center">
                    <TrendingUp className="w-6 h-6 mx-auto mb-2" />
                    <div>Growth Analytics</div>
                    <div className="text-xs opacity-75">Customer acquisition trends</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-20">
                  <div className="text-center">
                    <Users className="w-6 h-6 mx-auto mb-2" />
                    <div>Customer Insights</div>
                    <div className="text-xs opacity-75">Behavioral analysis report</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <Card className="fixed inset-4 z-50 bg-white shadow-2xl rounded-lg overflow-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Customer Details: {selectedCustomer.firstName} {selectedCustomer.lastName}</CardTitle>
              <Button variant="outline" onClick={() => setSelectedCustomer(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Personal Information</h4>
                <p><strong>Name:</strong> {selectedCustomer.firstName} {selectedCustomer.lastName}</p>
                <p><strong>Email:</strong> {selectedCustomer.email}</p>
                <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
                <p><strong>Registration:</strong> {formatDate(selectedCustomer.registrationDate)}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Account Information</h4>
                <p><strong>Card Number:</strong> {selectedCustomer.cardNumber}</p>
                <p><strong>Balance:</strong> {formatCurrency(selectedCustomer.onecardBalance)}</p>
                <p><strong>Total Cashback:</strong> {formatCurrency(selectedCustomer.totalCashback)}</p>
                <p><strong>Network:</strong> {selectedCustomer.networkProvider}</p>
                <p><strong>RICA Status:</strong> {selectedCustomer.ricaVerified ? 'Verified' : 'Pending'}</p>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Recent Transactions</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Cashback</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getCustomerTransactions(selectedCustomer.id).slice(0, 5).map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell>{formatDate(tx.timestamp)}</TableCell>
                      <TableCell>{formatCurrency(tx.amount)}</TableCell>
                      <TableCell>{formatCurrency(tx.cashbackEarned)}</TableCell>
                      <TableCell>
                        <Badge variant={tx.status === 'completed' ? 'default' : 'secondary'}>
                          {tx.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminOneCardDashboard;
