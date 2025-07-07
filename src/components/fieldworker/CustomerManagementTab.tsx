import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useFieldWorkerPermissions } from '@/hooks/useFieldWorkerPermissions';
import { 
  Users, 
  Search, 
  Filter, 
  Phone, 
  Smartphone,
  Calendar,
  TrendingUp,
  MessageSquare,
  Mail,
  Target,
  BarChart3,
  Settings
} from 'lucide-react';

interface AssignedCustomer {
  id: string;
  customer_name: string;
  phone_number: string;
  email: string;
  sim_iccid: string;
  sim_status: string;
  airtime_balance: number;
  data_balance_mb: number;
  last_recharge_at: string;
  assigned_at: string;
}

interface CustomerSalesData {
  customer_id: string;
  total_transactions: number;
  total_revenue: number;
  last_transaction: string;
}

interface Permission {
  permission_name: string;
  is_enabled: boolean;
}

const CustomerManagementTab = () => {
  const [customers, setCustomers] = useState<AssignedCustomer[]>([]);
  const [salesData, setSalesData] = useState<CustomerSalesData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const { toast } = useToast();
  const { hasPermission, loading: permissionsLoading } = useFieldWorkerPermissions();

  useEffect(() => {
    loadCustomerData();
  }, []);

  const loadCustomerData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get field worker ID
      const { data: fieldWorker } = await supabase
        .from('field_workers')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!fieldWorker) return;

      // Load assigned customers
      const { data: customerData, error: customerError } = await supabase
        .from('field_worker_customers')
        .select(`
          customer_account_id,
          assigned_at,
          customer_accounts!inner (
            id,
            customer_name,
            phone_number,
            email,
            sim_iccid,
            sim_status,
            airtime_balance,
            data_balance_mb,
            last_recharge_at
          )
        `)
        .eq('field_worker_id', fieldWorker.id)
        .eq('is_active', true);

      if (customerError) throw customerError;

      // Transform the data
      const transformedCustomers = customerData?.map(item => ({
        id: item.customer_accounts.id,
        customer_name: item.customer_accounts.customer_name,
        phone_number: item.customer_accounts.phone_number,
        email: item.customer_accounts.email,
        sim_iccid: item.customer_accounts.sim_iccid,
        sim_status: item.customer_accounts.sim_status,
        airtime_balance: item.customer_accounts.airtime_balance,
        data_balance_mb: item.customer_accounts.data_balance_mb,
        last_recharge_at: item.customer_accounts.last_recharge_at,
        assigned_at: item.assigned_at
      })) || [];

      setCustomers(transformedCustomers);

      // Load sales data for each customer
      if (transformedCustomers.length > 0) {
        const salesPromises = transformedCustomers.map(async (customer) => {
          const { data: transactions } = await supabase
            .from('customer_transactions')
            .select('amount, created_at')
            .eq('customer_account_id', customer.id);

          return {
            customer_id: customer.id,
            total_transactions: transactions?.length || 0,
            total_revenue: transactions?.reduce((sum, t) => sum + Number(t.amount), 0) || 0,
            last_transaction: transactions?.[0]?.created_at || ''
          };
        });

        const salesResults = await Promise.all(salesPromises);
        setSalesData(salesResults);
      }
    } catch (error) {
      console.error('Error loading customer data:', error);
      toast({
        title: "Error",
        description: "Failed to load customer information.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone_number.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || customer.sim_status === filterStatus;
    return matchesSearch && matchesFilter;
  });

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

  const getCustomerSalesData = (customerId: string) => {
    return salesData.find(s => s.customer_id === customerId) || {
      total_transactions: 0,
      total_revenue: 0,
      last_transaction: ''
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading your customers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Permissions Check */}
      {!hasPermission('manage_sales') && !hasPermission('manage_marketing') && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-yellow-600" />
              <span className="font-semibold text-yellow-800">Limited Access</span>
            </div>
            <p className="text-yellow-700 mt-1">
              You don't have permissions to manage customer sales or marketing activities. 
              Please contact your administrator to request access.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Customer Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold">{customers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active SIMs</p>
                <p className="text-2xl font-bold">
                  {customers.filter(c => c.sim_status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(salesData.reduce((sum, s) => sum + s.total_revenue, 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Target className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg. per Customer</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(customers.length > 0 
                    ? salesData.reduce((sum, s) => sum + s.total_revenue, 0) / customers.length 
                    : 0
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="customers" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="customers">Customer Management</TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            disabled={!hasPermission('view_analytics')}
          >
            Sales Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search customers by name or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Customer List */}
          <div className="space-y-3">
            {filteredCustomers.map((customer) => {
              const salesInfo = getCustomerSalesData(customer.id);
              return (
                <Card key={customer.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Smartphone className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{customer.customer_name}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {customer.phone_number}
                            </span>
                            <span>Balance: {formatCurrency(customer.airtime_balance)}</span>
                            <span>Data: {formatDataAmount(customer.data_balance_mb)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <Badge className={getStatusColor(customer.sim_status)}>
                            {customer.sim_status}
                          </Badge>
                          {hasPermission('manage_sales') && (
                            <p className="text-sm text-gray-600 mt-1">
                              Revenue: {formatCurrency(salesInfo.total_revenue)}
                            </p>
                          )}
                        </div>
                        {(hasPermission('manage_sales') || hasPermission('manage_marketing')) && (
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Mail className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            
            {filteredCustomers.length === 0 && (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Customers Found</h3>
                <p className="text-gray-600">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'No customers match your search criteria.'
                    : 'You have no assigned customers yet.'
                  }
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          {hasPermission('view_analytics') ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Sales Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Top Performing Customers</h4>
                    <div className="space-y-2">
                      {salesData
                        .sort((a, b) => b.total_revenue - a.total_revenue)
                        .slice(0, 5)
                        .map((sale) => {
                          const customer = customers.find(c => c.id === sale.customer_id);
                          return customer ? (
                            <div key={sale.customer_id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <span className="font-medium">{customer.customer_name}</span>
                              <span className="text-green-600">{formatCurrency(sale.total_revenue)}</span>
                            </div>
                          ) : null;
                        })}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Customer Activity</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Active Customers:</span>
                        <span className="font-semibold">{customers.filter(c => c.sim_status === 'active').length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Transactions:</span>
                        <span className="font-semibold">{salesData.reduce((sum, s) => sum + s.total_transactions, 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Revenue:</span>
                        <span className="font-semibold">
                          {formatCurrency(customers.length > 0 
                            ? salesData.reduce((sum, s) => sum + s.total_revenue, 0) / customers.length 
                            : 0
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Analytics Access Required</h3>
                <p className="text-gray-600">
                  You need analytics permissions to view this section. Contact your administrator.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerManagementTab;