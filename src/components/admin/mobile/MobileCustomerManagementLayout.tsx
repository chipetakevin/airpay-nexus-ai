import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Activity, 
  AlertCircle, 
  DollarSign, 
  BarChart3, 
  Headphones,
  Plus,
  Download,
  RefreshCw
} from 'lucide-react';
import MobileAdminHeader from './MobileAdminHeader';
import MobileAdminSidebar from './MobileAdminSidebar';
import MobileCustomerSearch from './MobileCustomerSearch';
import MobileCustomerCard from './MobileCustomerCard';
import MobileCustomerDetailView from './MobileCustomerDetailView';
import { cn } from '@/lib/utils';

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

interface MobileCustomerManagementLayoutProps {
  activeAdminTab: string;
  setActiveAdminTab: (tab: string) => void;
  activeProfileTab: string;
  setActiveProfileTab: (tab: string) => void;
}

const MobileCustomerManagementLayout: React.FC<MobileCustomerManagementLayoutProps> = ({
  activeAdminTab,
  setActiveAdminTab,
  activeProfileTab,
  setActiveProfileTab
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
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
        lastName: 'Mthembu',
        email: 'john@divinemobile.co.za',
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
        lastName: 'Mokwena',
        email: 'sarah@divinemobile.co.za',
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
        lastName: 'Nkomo',
        email: 'michael@divinemobile.co.za',
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

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleExport = () => {
    console.log('Exporting customer data...');
  };

  // Show customer detail view when a customer is selected
  if (selectedCustomer) {
    return (
      <MobileCustomerDetailView
        customer={selectedCustomer}
        onBack={() => setSelectedCustomer(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <MobileAdminHeader
        title="The Nerve Center Dashboard"
        subtitle={`${filteredCustomers.length} customers • Divine Mobile MVNE`}
        onMenuToggle={() => setSidebarOpen(true)}
        showSearch={true}
        onSearchToggle={() => setIsSearchFocused(!isSearchFocused)}
      />

      {/* Mobile Sidebar */}
      <MobileAdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeAdminTab}
        onTabChange={setActiveAdminTab}
        activeProfileTab={activeProfileTab}
        onProfileTabChange={setActiveProfileTab}
      />

      {/* Main Content */}
      <div className="p-4 space-y-4 pb-20">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">Total</p>
                  <p className="text-lg font-bold text-blue-600">{stats.totalCustomers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-xs text-gray-600">Active</p>
                  <p className="text-lg font-bold text-green-600">{stats.activeCustomers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-600">Revenue</p>
                  <p className="text-lg font-bold text-purple-600">R{stats.totalRevenue.toFixed(0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-orange-600" />
                <div>
                  <p className="text-xs text-gray-600">Tickets</p>
                  <p className="text-lg font-bold text-orange-600">{stats.supportTickets}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex-shrink-0"
          >
            <RefreshCw className={cn("w-4 h-4 mr-2", isLoading && "animate-spin")} />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport} className="flex-shrink-0">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="flex-shrink-0">
            <Plus className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
        </div>

        {/* Search and Filters */}
        <MobileCustomerSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filters}
          onFiltersChange={setFilters}
          isSearchFocused={isSearchFocused}
          onSearchFocus={() => setIsSearchFocused(true)}
          onSearchBlur={() => setIsSearchFocused(false)}
          resultCount={filteredCustomers.length}
        />

        {/* Customer List */}
        <div className="space-y-3">
          {filteredCustomers.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-2">No customers found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredCustomers.map((customer) => (
              <MobileCustomerCard
                key={customer.id}
                customer={customer}
                onSelect={setSelectedCustomer}
                onQuickAction={(action, customer) => {
                  console.log(`${action} for customer:`, customer.id);
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileCustomerManagementLayout;