import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  Shield, 
  CreditCard, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Download,
  FileText,
  Database,
  Zap,
  Building,
  Smartphone
} from 'lucide-react';

interface DashboardStats {
  totalCustomers: number;
  verifiedCustomers: number;
  pendingRICA: number;
  totalVendors: number;
  verifiedVendors: number;
  activeSIMs: number;
  totalTransactions: number;
  complianceScore: number;
}

interface CustomerProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  id_number: string;
  rica_status: string;
  kyc_status: string;
  network_provider: string;
  created_at: string;
}

interface VendorProfile {
  id: string;
  business_name: string;
  contact_person_name: string;
  contact_person_email: string;
  contact_person_phone: string;
  kyc_status: string;
  verification_status: string;
  total_sales: number;
  commission_rate: number;
  created_at: string;
}

const MVNEAdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalCustomers: 0,
    verifiedCustomers: 0,
    pendingRICA: 0,
    totalVendors: 0,
    verifiedVendors: 0,
    activeSIMs: 0,
    totalTransactions: 0,
    complianceScore: 0
  });
  const [customers, setCustomers] = useState<CustomerProfile[]>([]);
  const [vendors, setVendors] = useState<VendorProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // Load dashboard statistics
      const [customersResult, vendorsResult, simsResult, transactionsResult] = await Promise.all([
        supabase.from('customer_profiles').select('*'),
        supabase.from('vendor_profiles').select('*'),
        supabase.from('sim_cards').select('*'),
        supabase.from('mvne_transactions').select('*')
      ]);

      if (customersResult.data) {
        setCustomers(customersResult.data);
        const verifiedCount = customersResult.data.filter(c => c.rica_status === 'verified').length;
        const pendingCount = customersResult.data.filter(c => c.rica_status === 'pending').length;
        
        setDashboardStats(prev => ({
          ...prev,
          totalCustomers: customersResult.data.length,
          verifiedCustomers: verifiedCount,
          pendingRICA: pendingCount
        }));
      }

      if (vendorsResult.data) {
        setVendors(vendorsResult.data);
        const verifiedVendorsCount = vendorsResult.data.filter(v => v.verification_status === 'verified').length;
        
        setDashboardStats(prev => ({
          ...prev,
          totalVendors: vendorsResult.data.length,
          verifiedVendors: verifiedVendorsCount
        }));
      }

      if (simsResult.data) {
        const activeCount = simsResult.data.filter(s => s.sim_status === 'active').length;
        setDashboardStats(prev => ({
          ...prev,
          activeSIMs: activeCount
        }));
      }

      if (transactionsResult.data) {
        setDashboardStats(prev => ({
          ...prev,
          totalTransactions: transactionsResult.data.length
        }));
      }

      // Calculate compliance score
      const totalEntities = (customersResult.data?.length || 0) + (vendorsResult.data?.length || 0);
      const compliantEntities = (customersResult.data?.filter(c => c.rica_status === 'verified').length || 0) + 
                              (vendorsResult.data?.filter(v => v.verification_status === 'verified').length || 0);
      const complianceScore = totalEntities > 0 ? Math.round((compliantEntities / totalEntities) * 100) : 0;
      
      setDashboardStats(prev => ({
        ...prev,
        complianceScore
      }));

    } catch (error) {
      toast({
        title: "Error loading dashboard data",
        description: "Failed to load admin dashboard statistics",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string, type: 'rica' | 'kyc' | 'verification') => {
    const colors = {
      verified: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
      expired: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <Badge className={colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>
    );
  };

  const exportData = async (type: 'customers' | 'vendors' | 'compliance') => {
    try {
      let data: any[] = [];
      let filename = '';

      switch (type) {
        case 'customers':
          data = customers;
          filename = 'customers_export.json';
          break;
        case 'vendors':
          data = vendors;
          filename = 'vendors_export.json';
          break;
        case 'compliance':
          // Export compliance report
          const complianceData = customers.map(c => ({
            customer_id: c.id,
            name: `${c.first_name} ${c.last_name}`,
            rica_status: c.rica_status,
            kyc_status: c.kyc_status,
            compliance_score: c.rica_status === 'verified' && c.kyc_status === 'verified' ? 100 : 50
          }));
          data = complianceData;
          filename = 'compliance_report.json';
          break;
      }

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Export completed",
        description: `${type} data exported successfully`,
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export data",
        variant: "destructive"
      });
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = searchTerm === '' || 
      customer.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'verified' && customer.rica_status === 'verified') ||
      (selectedFilter === 'pending' && customer.rica_status === 'pending') ||
      (selectedFilter === 'rejected' && customer.rica_status === 'rejected');
    
    return matchesSearch && matchesFilter;
  });

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = searchTerm === '' || 
      vendor.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.contact_person_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.contact_person_email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'verified' && vendor.verification_status === 'verified') ||
      (selectedFilter === 'pending' && vendor.verification_status === 'pending');
    
    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Zap className="w-12 h-12 mx-auto mb-4 text-blue-600 animate-pulse" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-32">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">MVNE Admin Dashboard</h1>
              <p className="text-gray-600">Divine Mobile RICA & Compliance Management</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-100 text-blue-800">
                Admin Access
              </Badge>
              <Badge className={`${dashboardStats.complianceScore >= 80 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {dashboardStats.complianceScore}% Compliant
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Dashboard Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-blue-200 bg-blue-50/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">Total Customers</p>
                  <p className="text-3xl font-bold text-blue-900">{dashboardStats.totalCustomers}</p>
                  <p className="text-xs text-blue-600">{dashboardStats.verifiedCustomers} RICA verified</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">Active Vendors</p>
                  <p className="text-3xl font-bold text-green-900">{dashboardStats.totalVendors}</p>
                  <p className="text-xs text-green-600">{dashboardStats.verifiedVendors} verified</p>
                </div>
                <Building className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">Active SIMs</p>
                  <p className="text-3xl font-bold text-purple-900">{dashboardStats.activeSIMs}</p>
                  <p className="text-xs text-purple-600">MVNE managed</p>
                </div>
                <Smartphone className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700">Compliance Score</p>
                  <p className="text-3xl font-bold text-orange-900">{dashboardStats.complianceScore}%</p>
                  <p className="text-xs text-orange-600">RICA & POPIA</p>
                </div>
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="analytics">AI Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Recent Activity & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    Compliance Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {dashboardStats.pendingRICA > 0 && (
                    <Alert className="border-yellow-200 bg-yellow-50">
                      <AlertDescription>
                        {dashboardStats.pendingRICA} customers pending RICA verification
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {dashboardStats.complianceScore < 80 && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertDescription>
                        Compliance score below 80% - review required
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {dashboardStats.complianceScore >= 80 && dashboardStats.pendingRICA === 0 && (
                    <Alert className="border-green-200 bg-green-50">
                      <AlertDescription>
                        ✅ All compliance checks passing
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Button onClick={() => exportData('compliance')} className="w-full">
                      <FileText className="w-4 h-4 mr-2" />
                      Export Report
                    </Button>
                    <Button variant="outline" onClick={loadDashboardData} className="w-full">
                      <Database className="w-4 h-4 mr-2" />
                      Refresh Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6 mt-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Customer Management</CardTitle>
                  <Button onClick={() => exportData('customers')}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="Search customers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="px-3 py-2 border rounded-md"
                  >
                    <option value="all">All Status</option>
                    <option value="verified">Verified</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                {/* Customer Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Name</th>
                        <th className="text-left p-3">Contact</th>
                        <th className="text-left p-3">RICA Status</th>
                        <th className="text-left p-3">KYC Status</th>
                        <th className="text-left p-3">Network</th>
                        <th className="text-left p-3">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCustomers.map((customer) => (
                        <tr key={customer.id} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            <div>
                              <p className="font-medium">{customer.first_name} {customer.last_name}</p>
                              <p className="text-sm text-gray-500">ID: {customer.id_number}</p>
                            </div>
                          </td>
                          <td className="p-3">
                            <div>
                              <p className="text-sm">{customer.email}</p>
                              <p className="text-sm text-gray-500">{customer.phone}</p>
                            </div>
                          </td>
                          <td className="p-3">
                            {getStatusBadge(customer.rica_status, 'rica')}
                          </td>
                          <td className="p-3">
                            {getStatusBadge(customer.kyc_status, 'kyc')}
                          </td>
                          <td className="p-3">
                            <span className="text-sm">{customer.network_provider || 'Not set'}</span>
                          </td>
                          <td className="p-3">
                            <span className="text-sm">{new Date(customer.created_at).toLocaleDateString()}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendors" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Vendor Management</CardTitle>
                  <Button onClick={() => exportData('vendors')}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="Search vendors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="px-3 py-2 border rounded-md"
                  >
                    <option value="all">All Status</option>
                    <option value="verified">Verified</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Business</th>
                        <th className="text-left p-3">Contact Person</th>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Commission</th>
                        <th className="text-left p-3">Total Sales</th>
                        <th className="text-left p-3">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVendors.map((vendor) => (
                        <tr key={vendor.id} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            <div>
                              <p className="font-medium">{vendor.business_name}</p>
                              <p className="text-sm text-gray-500">Business</p>
                            </div>
                          </td>
                          <td className="p-3">
                            <div>
                              <p className="text-sm">{vendor.contact_person_name}</p>
                              <p className="text-sm text-gray-500">{vendor.contact_person_email}</p>
                            </div>
                          </td>
                          <td className="p-3">
                            {getStatusBadge(vendor.verification_status, 'verification')}
                          </td>
                          <td className="p-3">
                            <span className="text-sm">{vendor.commission_rate}%</span>
                          </td>
                          <td className="p-3">
                            <span className="text-sm">R{vendor.total_sales.toFixed(2)}</span>
                          </td>
                          <td className="p-3">
                            <span className="text-sm">{new Date(vendor.created_at).toLocaleDateString()}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  RICA & POPIA Compliance Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <p className="text-2xl font-bold text-green-900">{dashboardStats.verifiedCustomers}</p>
                    <p className="text-sm text-green-700">RICA Verified</p>
                  </div>
                  
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                    <p className="text-2xl font-bold text-yellow-900">{dashboardStats.pendingRICA}</p>
                    <p className="text-sm text-yellow-700">Pending Verification</p>
                  </div>
                  
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <p className="text-2xl font-bold text-blue-900">{dashboardStats.complianceScore}%</p>
                    <p className="text-sm text-blue-700">Overall Score</p>
                  </div>
                </div>

                <Alert className="border-blue-200 bg-blue-50">
                  <AlertDescription>
                    <strong>MVNE Compliance Status:</strong> All customer data is securely stored with 
                    proper RICA verification and audit trails. Regular compliance checks are automated 
                    using AI-driven monitoring.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  AI-Driven Analytics & Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-purple-200 bg-purple-50">
                  <AlertDescription>
                    <strong>AI Insights:</strong> Machine learning models continuously monitor customer 
                    behavior, compliance status, and vendor performance to provide predictive analytics 
                    and automated recommendations.
                  </AlertDescription>
                </Alert>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Fraud Detection</h4>
                    <p className="text-sm text-gray-600">AI monitors transaction patterns and flags suspicious activities</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Compliance Prediction</h4>
                    <p className="text-sm text-gray-600">Predicts potential compliance issues before they occur</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Churn Analysis</h4>
                    <p className="text-sm text-gray-600">Identifies customers at risk of churning</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Vendor Performance</h4>
                    <p className="text-sm text-gray-600">Analyzes vendor sales patterns and performance metrics</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MVNEAdminDashboard;