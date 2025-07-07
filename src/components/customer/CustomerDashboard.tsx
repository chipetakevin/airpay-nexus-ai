import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Smartphone, 
  CreditCard, 
  History, 
  Wifi, 
  Phone, 
  Plus,
  ArrowUp,
  Calendar,
  User,
  Settings
} from 'lucide-react';

interface CustomerAccount {
  id: string;
  customer_name: string;
  phone_number: string;
  email: string;
  sim_iccid: string;
  sim_status: string;
  airtime_balance: number;
  data_balance_mb: number;
  last_recharge_at: string;
}

interface Transaction {
  id: string;
  transaction_type: string;
  amount: number;
  description: string;
  status: string;
  created_at: string;
}

const CustomerDashboard = () => {
  const [account, setAccount] = useState<CustomerAccount | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [rechargeType, setRechargeType] = useState<'airtime' | 'data'>('airtime');
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadCustomerData();
  }, []);

  const loadCustomerData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Load customer account
      const { data: accountData, error: accountError } = await supabase
        .from('customer_accounts')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (accountError && accountError.code !== 'PGRST116') {
        throw accountError;
      }

      if (accountData) {
        setAccount(accountData);

        // Load transactions
        const { data: transactionData, error: transactionError } = await supabase
          .from('customer_transactions')
          .select('*')
          .eq('customer_account_id', accountData.id)
          .order('created_at', { ascending: false })
          .limit(10);

        if (transactionError) throw transactionError;
        setTransactions(transactionData || []);
      }
    } catch (error) {
      console.error('Error loading customer data:', error);
      toast({
        title: "Error",
        description: "Failed to load your account information.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRecharge = async () => {
    if (!account || !rechargeAmount || parseFloat(rechargeAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid recharge amount.",
        variant: "destructive"
      });
      return;
    }

    setProcessing(true);
    try {
      const { data, error } = await supabase.rpc('process_customer_purchase', {
        p_customer_account_id: account.id,
        p_transaction_type: rechargeType,
        p_amount: parseFloat(rechargeAmount),
        p_description: `${rechargeType.charAt(0).toUpperCase() + rechargeType.slice(1)} recharge`
      });

      if (error) throw error;

      toast({
        title: "Recharge Successful! 🎉",
        description: `Your ${rechargeType} has been recharged successfully.`,
      });

      setRechargeAmount('');
      loadCustomerData(); // Reload to get updated balances
    } catch (error: any) {
      console.error('Recharge error:', error);
      toast({
        title: "Recharge Failed",
        description: error.message || "Failed to process your recharge.",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR'
    }).format(amount);
  };

  const formatDataAmount = (mb: number) => {
    if (mb >= 1024) {
      return `${(mb / 1024).toFixed(1)}GB`;
    }
    return `${mb}MB`;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading your account...</p>
        </div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="text-center p-8">
        <Smartphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No SIM Account Found</h3>
        <p className="text-gray-600 mb-4">
          You don't have a registered SIM account yet. Please contact our support team to get started.
        </p>
        <Button>Contact Support</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Account Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Airtime Balance</p>
                <p className="text-2xl font-bold">{formatCurrency(account.airtime_balance)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Wifi className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Data Balance</p>
                <p className="text-2xl font-bold">{formatDataAmount(account.data_balance_mb)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Smartphone className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">SIM Status</p>
                <Badge className={getStatusColor(account.sim_status)}>
                  {account.sim_status.toUpperCase()}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Recharge</p>
                <p className="text-sm font-medium">
                  {account.last_recharge_at 
                    ? new Date(account.last_recharge_at).toLocaleDateString()
                    : 'Never'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="recharge" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recharge">Recharge</TabsTrigger>
          <TabsTrigger value="history">Transaction History</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="recharge" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Recharge Your Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="recharge-type">Recharge Type</Label>
                  <select
                    id="recharge-type"
                    value={rechargeType}
                    onChange={(e) => setRechargeType(e.target.value as 'airtime' | 'data')}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="airtime">Airtime</option>
                    <option value="data">Data</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recharge-amount">Amount</Label>
                  <Input
                    id="recharge-amount"
                    type="number"
                    placeholder={rechargeType === 'airtime' ? 'Enter amount in ZAR' : 'Enter amount in MB'}
                    value={rechargeAmount}
                    onChange={(e) => setRechargeAmount(e.target.value)}
                    min="1"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {rechargeType === 'airtime' ? 
                  ['10', '20', '50', '100'].map(amount => (
                    <Button
                      key={amount}
                      variant="outline"
                      onClick={() => setRechargeAmount(amount)}
                      className="text-sm"
                    >
                      R{amount}
                    </Button>
                  )) :
                  ['100', '500', '1000', '2000'].map(amount => (
                    <Button
                      key={amount}
                      variant="outline"
                      onClick={() => setRechargeAmount(amount)}
                      className="text-sm"
                    >
                      {amount}MB
                    </Button>
                  ))
                }
              </div>

              <Button 
                onClick={handleRecharge} 
                disabled={processing} 
                className="w-full"
              >
                <ArrowUp className="w-4 h-4 mr-2" />
                {processing ? 'Processing...' : `Recharge ${rechargeType.charAt(0).toUpperCase() + rechargeType.slice(1)}`}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5" />
                Transaction History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {transaction.transaction_type === 'airtime' ? 
                          <Phone className="w-4 h-4 text-blue-600" /> :
                          <Wifi className="w-4 h-4 text-blue-600" />
                        }
                      </div>
                      <div>
                        <h4 className="font-semibold">{transaction.description}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(transaction.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {transaction.transaction_type === 'airtime' 
                          ? formatCurrency(transaction.amount)
                          : formatDataAmount(transaction.amount)
                        }
                      </p>
                      <Badge className={
                        transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                        transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                
                {transactions.length === 0 && (
                  <div className="text-center py-8">
                    <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Transactions Yet</h3>
                    <p className="text-gray-600">Your transaction history will appear here.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <p className="font-medium">{account.customer_name}</p>
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <p className="font-medium">{account.phone_number}</p>
                </div>
                <div>
                  <Label>Email Address</Label>
                  <p className="font-medium">{account.email || 'Not provided'}</p>
                </div>
                <div>
                  <Label>SIM ICCID</Label>
                  <p className="font-medium font-mono text-sm">{account.sim_iccid}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Update Profile Information
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerDashboard;