import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Users, 
  CreditCard, 
  Headphones, 
  BarChart3,
  Download,
  RefreshCw,
  Plus,
  Eye,
  Edit,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Activity,
  AlertCircle
} from 'lucide-react';
import CustomerSearchFilters from './CustomerSearchFilters';
import CustomerTable from './CustomerTable';
import CustomerAnalytics from './CustomerAnalytics';
import SupportTicketsPanel from './SupportTicketsPanel';
import BalanceManagementPanel from './BalanceManagementPanel';

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

const CustomerManagementDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    mvno: 'all',
    status: 'all',
    plan: 'all'
  });

  // Mock data for demonstration
  useEffect(() => {
    const mockCustomers: Customer[] = [
      {
        id: 'CUST001',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        phone: '+27821234567',
        mvno: 'Divine Mobile',
        status: 'active',
        balance: 150.50,
        plan: 'Premium Data',
        joinDate: '2024-01-15',
        lastActivity: '2024-12-30',
        dataUsage: 85,
        voiceUsage: 65,
        smsUsage: 45,
        simStatus: 'active',
        supportTickets: 0
      },
      {
        id: 'CUST002', 
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.j@email.com',
        phone: '+27829876543',
        mvno: 'Divine Mobile',
        status: 'active',
        balance: 89.25,
        plan: 'Basic Plan',
        joinDate: '2024-02-20',
        lastActivity: '2024-12-29',
        dataUsage: 92,
        voiceUsage: 78,
        smsUsage: 23,
        simStatus: 'active',
        supportTickets: 1
      },
      {
        id: 'CUST003',
        firstName: 'Michael',
        lastName: 'Brown',
        email: 'mike.brown@email.com',
        phone: '+27825555555',
        mvno: 'Partner MVNO',
        status: 'suspended',
        balance: 12.75,
        plan: 'Enterprise',
        joinDate: '2023-11-10',
        lastActivity: '2024-12-25',
        dataUsage: 15,
        voiceUsage: 30,
        smsUsage: 5,
        simStatus: 'suspended',
        supportTickets: 2
      }
    ];
    setCustomers(mockCustomers);
  }, []);

  const stats = {
    totalCustomers: customers.length,
    activeCustomers: customers.filter(c => c.status === 'active').length,
    suspendedCustomers: customers.filter(c => c.status === 'suspended').length,
    totalRevenue: customers.reduce((sum, c) => sum + c.balance, 0),
    averageArpu: customers.length ? customers.reduce((sum, c) => sum + c.balance, 0) / customers.length : 0,
    supportTickets: customers.reduce((sum, c) => sum + c.supportTickets, 0)
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleExport = () => {
    console.log('Exporting customer data...');
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = searchTerm === '' || 
      customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesMvno = filters.mvno === 'all' || customer.mvno === filters.mvno;
    const matchesStatus = filters.status === 'all' || customer.status === filters.status;
    const matchesPlan = filters.plan === 'all' || customer.plan === filters.plan;

    return matchesSearch && matchesMvno && matchesStatus && matchesPlan;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Management System</h2>
          <p className="text-gray-600">Divine Mobile MVNE - Multi-tenant customer lifecycle management</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={handleExport} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-xl font-bold text-blue-600">{stats.totalCustomers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-xl font-bold text-green-600">{stats.activeCustomers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Suspended</p>
                <p className="text-xl font-bold text-red-600">{stats.suspendedCustomers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-xl font-bold text-purple-600">R{stats.totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Avg ARPU</p>
                <p className="text-xl font-bold text-yellow-600">R{stats.averageArpu.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Headphones className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Open Tickets</p>
                <p className="text-xl font-bold text-orange-600">{stats.supportTickets}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Customer Overview</TabsTrigger>
          <TabsTrigger value="balances">Balance Management</TabsTrigger>
          <TabsTrigger value="support">Support Tickets</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="provisioning">Provisioning</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Customer Search & Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by name, email, phone, or customer ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <CustomerSearchFilters filters={filters} onFiltersChange={setFilters} />
              </div>
            </CardContent>
          </Card>

          {/* Customer Table */}
          <CustomerTable 
            customers={filteredCustomers}
            onCustomerSelect={setSelectedCustomer}
          />
        </TabsContent>

        <TabsContent value="balances">
          <BalanceManagementPanel customers={filteredCustomers} />
        </TabsContent>

        <TabsContent value="support">
          <SupportTicketsPanel customers={filteredCustomers} />
        </TabsContent>

        <TabsContent value="analytics">
          <CustomerAnalytics customers={customers} />
        </TabsContent>

        <TabsContent value="provisioning">
          <Card>
            <CardHeader>
              <CardTitle>Service Provisioning</CardTitle>
              <p className="text-gray-600">Manage customer service activation, plan changes, and SIM management</p>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-500">Provisioning features coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerManagementDashboard;