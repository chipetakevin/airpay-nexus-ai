import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  CreditCard, 
  Plus, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight,
  Wallet,
  History,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mvno: string;
  status: 'active' | 'suspended' | 'inactive';
  balance: number;
  plan: string;
  joinDate: string;
  lastActivity: string;
  dataUsage: number;
  voiceUsage: number;
  smsUsage: number;
  simStatus: 'active' | 'inactive' | 'suspended';
  supportTickets: number;
}

interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  type: 'topup' | 'usage' | 'refund' | 'adjustment';
  amount: number;
  description: string;
  timestamp: string;
  balanceBefore: number;
  balanceAfter: number;
  method: string;
  status: 'completed' | 'pending' | 'failed';
}

interface BalanceManagementPanelProps {
  customers: Customer[];
}

const BalanceManagementPanel: React.FC<BalanceManagementPanelProps> = ({ customers }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'TXN001',
      customerId: 'CUST001',
      customerName: 'John Doe',
      type: 'topup',
      amount: 100.00,
      description: 'Account top-up via card payment',
      timestamp: '2024-12-30T10:30:00Z',
      balanceBefore: 50.50,
      balanceAfter: 150.50,
      method: 'Credit Card',
      status: 'completed'
    },
    {
      id: 'TXN002',
      customerId: 'CUST002',
      customerName: 'Sarah Johnson',
      type: 'usage',
      amount: -25.75,
      description: 'Data usage charges',
      timestamp: '2024-12-29T16:45:00Z',
      balanceBefore: 115.00,
      balanceAfter: 89.25,
      method: 'Auto-deduction',
      status: 'completed'
    },
    {
      id: 'TXN003',
      customerId: 'CUST003',
      customerName: 'Michael Brown',
      type: 'adjustment',
      amount: 5.00,
      description: 'Customer service credit adjustment',
      timestamp: '2024-12-28T14:20:00Z',
      balanceBefore: 7.75,
      balanceAfter: 12.75,
      method: 'Manual Adjustment',
      status: 'completed'
    }
  ]);

  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [topUpMethod, setTopUpMethod] = useState('');

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'topup':
        return <ArrowUpRight className="w-4 h-4 text-green-600" />;
      case 'usage':
        return <ArrowDownRight className="w-4 h-4 text-red-600" />;
      case 'refund':
        return <RefreshCw className="w-4 h-4 text-blue-600" />;
      case 'adjustment':
        return <Wallet className="w-4 h-4 text-purple-600" />;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = {
    totalBalance: customers.reduce((sum, c) => sum + c.balance, 0),
    lowBalanceCustomers: customers.filter(c => c.balance < 50).length,
    todayTopUps: transactions.filter(t => t.type === 'topup' && new Date(t.timestamp).toDateString() === new Date().toDateString()).length,
    todayRevenue: transactions
      .filter(t => t.type === 'topup' && new Date(t.timestamp).toDateString() === new Date().toDateString())
      .reduce((sum, t) => sum + t.amount, 0)
  };

  const handleTopUp = () => {
    if (!selectedCustomer || !topUpAmount) return;
    
    const newTransaction: Transaction = {
      id: `TXN${String(transactions.length + 1).padStart(3, '0')}`,
      customerId: selectedCustomer.id,
      customerName: `${selectedCustomer.firstName} ${selectedCustomer.lastName}`,
      type: 'topup',
      amount: parseFloat(topUpAmount),
      description: `Account top-up via ${topUpMethod}`,
      timestamp: new Date().toISOString(),
      balanceBefore: selectedCustomer.balance,
      balanceAfter: selectedCustomer.balance + parseFloat(topUpAmount),
      method: topUpMethod,
      status: 'completed'
    };

    setTransactions([newTransaction, ...transactions]);
    setIsTopUpOpen(false);
    setSelectedCustomer(null);
    setTopUpAmount('');
    setTopUpMethod('');
  };

  const lowBalanceCustomers = customers.filter(c => c.balance < 50);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-green-600" />
            Balance & Usage Management
          </h2>
          <p className="text-gray-600">Real-time balance monitoring and top-up processing</p>
        </div>
        <Dialog open={isTopUpOpen} onOpenChange={setIsTopUpOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Process Top-Up
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Process Customer Top-Up</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Customer</label>
                <Select onValueChange={(value) => {
                  const customer = customers.find(c => c.id === value);
                  setSelectedCustomer(customer || null);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map(customer => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.firstName} {customer.lastName} - R{customer.balance.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedCustomer && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm"><strong>Current Balance:</strong> R{selectedCustomer.balance.toFixed(2)}</p>
                  <p className="text-sm"><strong>Plan:</strong> {selectedCustomer.plan}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium">Top-Up Amount</label>
                <Input 
                  type="number" 
                  placeholder="0.00" 
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Payment Method</label>
                <Select value={topUpMethod} onValueChange={setTopUpMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Debit Card">Debit Card</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Voucher">Voucher</SelectItem>
                    <SelectItem value="Manual Adjustment">Manual Adjustment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {selectedCustomer && topUpAmount && (
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800">
                    <strong>New Balance:</strong> R{(selectedCustomer.balance + parseFloat(topUpAmount || '0')).toFixed(2)}
                  </p>
                </div>
              )}
              <div className="flex gap-2 pt-4">
                <Button 
                  className="flex-1" 
                  onClick={handleTopUp}
                  disabled={!selectedCustomer || !topUpAmount || !topUpMethod}
                >
                  Process Top-Up
                </Button>
                <Button variant="outline" onClick={() => setIsTopUpOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Total Platform Balance</p>
                <p className="text-2xl font-bold text-green-700">R{stats.totalBalance.toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 font-medium">Low Balance Alerts</p>
                <p className="text-2xl font-bold text-red-700">{stats.lowBalanceCustomers}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Today's Top-Ups</p>
                <p className="text-2xl font-bold text-blue-700">{stats.todayTopUps}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Today's Revenue</p>
                <p className="text-2xl font-bold text-purple-700">R{stats.todayRevenue.toFixed(2)}</p>
              </div>
              <Wallet className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Balance Alert */}
      {lowBalanceCustomers.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="w-5 h-5" />
              Low Balance Alerts ({lowBalanceCustomers.length} customers)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lowBalanceCustomers.map(customer => (
                <div key={customer.id} className="p-3 bg-white rounded-lg border border-red-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{customer.firstName} {customer.lastName}</p>
                      <p className="text-sm text-gray-600">{customer.phone}</p>
                      <p className="text-lg font-bold text-red-600">R{customer.balance.toFixed(2)}</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-red-300">
                      Top Up
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Balance Change</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{transaction.customerName}</p>
                        <p className="text-sm text-gray-500">{transaction.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTransactionIcon(transaction.type)}
                        <span className="capitalize">{transaction.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={transaction.amount > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                        {transaction.amount > 0 ? '+' : ''}R{Math.abs(transaction.amount).toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>R{transaction.balanceBefore.toFixed(2)} → R{transaction.balanceAfter.toFixed(2)}</div>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.method}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(transaction.timestamp)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BalanceManagementPanel;