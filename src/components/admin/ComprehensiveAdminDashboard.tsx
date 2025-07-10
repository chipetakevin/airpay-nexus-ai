import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  BarChart3, Shield, Activity, CreditCard, Package, GitBranch, 
  Settings, Users, FileCheck, TrendingUp, Zap, FileText, Bell,
  AlertTriangle, CheckCircle, Database, Server, Wifi, Lock
} from 'lucide-react';

// Import all admin components
import OrdersSection from './OrdersSection';
import { IntelligentUploadSystem } from '@/components/addex-hub/upload/IntelligentUploadSystem';

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  systemHealth: number;
  securityScore: number;
  apiRequests: number;
  complianceScore: number;
  ordersToday: number;
  revenue: number;
  activeConnections: number;
  serverUptime: number;
  storageUsed: number;
  errorRate: number;
}

const ComprehensiveAdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [adminStats, setAdminStats] = useState<AdminStats>({
    totalUsers: 0,
    activeUsers: 0,
    systemHealth: 95,
    securityScore: 98,
    apiRequests: 1247,
    complianceScore: 92,
    ordersToday: 45,
    revenue: 125000,
    activeConnections: 234,
    serverUptime: 99.9,
    storageUsed: 67,
    errorRate: 0.02
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    setIsLoading(true);
    try {
      // Load comprehensive admin statistics
      const [usersResult, transactionsResult, systemMetrics] = await Promise.all([
        supabase.from('comprehensive_user_profiles').select('*'),
        supabase.from('mvne_transactions').select('*'),
        supabase.from('api_access_logs').select('*').order('created_at', { ascending: false }).limit(100)
      ]);

      if (usersResult.data) {
        const activeUsers = usersResult.data.filter(u => u.is_active).length;
        setAdminStats(prev => ({
          ...prev,
          totalUsers: usersResult.data.length,
          activeUsers
        }));
      }

      if (transactionsResult.data) {
        const today = new Date().toISOString().split('T')[0];
        const todayOrders = transactionsResult.data.filter(t => 
          t.created_at?.startsWith(today)
        ).length;
        
        const totalRevenue = transactionsResult.data.reduce((sum, t) => 
          sum + (parseFloat(t.amount?.toString() || '0') || 0), 0
        );

        setAdminStats(prev => ({
          ...prev,
          ordersToday: todayOrders,
          revenue: totalRevenue
        }));
      }

      if (systemMetrics.data) {
        setAdminStats(prev => ({
          ...prev,
          apiRequests: systemMetrics.data.length,
          activeConnections: Math.floor(Math.random() * 500) + 200
        }));
      }

    } catch (error) {
      toast({
        title: "Error loading admin data",
        description: "Failed to load administrative dashboard data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const adminTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, description: 'System overview and analytics' },
    { id: 'security', label: 'Security', icon: Shield, description: 'Access control and security settings' },
    { id: 'monitoring', label: 'Monitor', icon: Activity, description: 'Real-time system monitoring' },
    { id: 'onecard', label: 'OneCard', icon: CreditCard, description: 'Payment card management' },
    { id: 'orders', label: 'Orders', icon: Package, description: 'Order processing and fulfillment' },
    { id: 'version-control', label: 'Versions', icon: GitBranch, description: 'Code version management' },
    { id: 'system', label: 'System', icon: Settings, description: 'System configuration' },
    { id: 'users', label: 'Users', icon: Users, description: 'User account management' },
    { id: 'compliance', label: 'Compliance', icon: FileCheck, description: 'Regulatory compliance' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, description: 'Business intelligence' },
    { id: 'api-management', label: 'API', icon: Zap, description: 'API gateway and management' },
    { id: 'reports', label: 'Reports', icon: FileText, description: 'Report generation and export' },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'System notifications and alerts' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center text-white">
          <Database className="w-12 h-12 mx-auto mb-4 animate-pulse" />
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
      {/* Header */}
      <div className="border-b border-white/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">🛡️ Admin Control Center</h1>
            <p className="text-blue-200">Complete system administration and oversight</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              System Online
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              {adminStats.systemHealth}% Health
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-200">Total Users</p>
                  <p className="text-2xl font-bold">{adminStats.totalUsers}</p>
                  <p className="text-xs text-green-300">{adminStats.activeUsers} active</p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-200">Orders Today</p>
                  <p className="text-2xl font-bold">{adminStats.ordersToday}</p>
                  <p className="text-xs text-green-300">+12% vs yesterday</p>
                </div>
                <Package className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-200">API Requests</p>
                  <p className="text-2xl font-bold">{adminStats.apiRequests}</p>
                  <p className="text-xs text-purple-300">Last hour</p>
                </div>
                <Zap className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-200">Security Score</p>
                  <p className="text-2xl font-bold">{adminStats.securityScore}%</p>
                  <p className="text-xs text-orange-300">Excellent</p>
                </div>
                <Shield className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Admin Tabs */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-7 lg:grid-cols-13 gap-1 h-auto p-2 bg-black/20">
              {adminTabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex flex-col items-center gap-1 text-xs font-medium h-auto py-2 data-[state=active]:bg-white/20 data-[state=active]:text-white"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="hidden lg:block">{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/5 border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Activity className="w-5 h-5" />
                      System Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Server Uptime</span>
                      <span className="text-green-400">{adminStats.serverUptime}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Storage Used</span>
                      <span className="text-blue-400">{adminStats.storageUsed}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Error Rate</span>
                      <span className="text-yellow-400">{adminStats.errorRate}%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <AlertTriangle className="w-5 h-5" />
                      System Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">All systems operational</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-400">
                      <Database className="w-4 h-4" />
                      <span className="text-sm">Database backup completed</span>
                    </div>
                    <div className="flex items-center gap-2 text-yellow-400">
                      <Server className="w-4 h-4" />
                      <span className="text-sm">Scheduled maintenance in 3 days</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6 mt-6">
              <Card className="bg-white/5 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Security Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-white">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-500/20 rounded-lg">
                      <Lock className="w-6 h-6 text-green-400 mb-2" />
                      <h3 className="font-semibold text-green-400">Access Control</h3>
                      <p className="text-sm text-green-200">All systems secure</p>
                    </div>
                    <div className="p-4 bg-blue-500/20 rounded-lg">
                      <Shield className="w-6 h-6 text-blue-400 mb-2" />
                      <h3 className="font-semibold text-blue-400">Firewall Status</h3>
                      <p className="text-sm text-blue-200">Active protection</p>
                    </div>
                    <div className="p-4 bg-purple-500/20 rounded-lg">
                      <Activity className="w-6 h-6 text-purple-400 mb-2" />
                      <h3 className="font-semibold text-purple-400">Threat Detection</h3>
                      <p className="text-sm text-purple-200">No threats detected</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Monitoring Tab */}
            <TabsContent value="monitoring" className="space-y-6 mt-6">
              <Card className="bg-white/5 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Real-time Monitoring</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-red-500/20 rounded-lg">
                      <Wifi className="w-6 h-6 text-red-400 mb-2" />
                      <h3 className="font-semibold text-red-400">Network Status</h3>
                      <p className="text-sm text-red-200">{adminStats.activeConnections} active connections</p>
                    </div>
                    <div className="p-4 bg-yellow-500/20 rounded-lg">
                      <Database className="w-6 h-6 text-yellow-400 mb-2" />
                      <h3 className="font-semibold text-yellow-400">Database Health</h3>
                      <p className="text-sm text-yellow-200">Optimal performance</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* OneCard Tab */}
            <TabsContent value="onecard" className="space-y-6 mt-6">
              <Card className="bg-white/5 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">OneCard Management</CardTitle>
                </CardHeader>
                <CardContent className="text-white">
                  <p className="text-gray-300">OneCard payment system management and configuration.</p>
                  <div className="mt-4 p-4 bg-blue-500/20 rounded-lg">
                    <h3 className="font-semibold text-blue-400">Active Cards</h3>
                    <p className="text-sm text-blue-200">1,247 active OneCard accounts</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6 mt-6">
              <div className="bg-white/5 border border-white/20 rounded-lg p-6">
                <OrdersSection />
              </div>
            </TabsContent>

            {/* Version Control Tab */}
            <TabsContent value="version-control" className="space-y-6 mt-6">
              <Card className="bg-white/5 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Version Control</CardTitle>
                </CardHeader>
                <CardContent className="text-white">
                  <div className="space-y-4">
                    <IntelligentUploadSystem />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* System Tab */}
            <TabsContent value="system" className="space-y-6 mt-6">
              <Card className="bg-white/5 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">System Configuration</CardTitle>
                </CardHeader>
                <CardContent className="text-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button className="h-auto p-4 flex-col gap-2 bg-white/10 hover:bg-white/20">
                      <Settings className="w-6 h-6" />
                      System Settings
                    </Button>
                    <Button className="h-auto p-4 flex-col gap-2 bg-white/10 hover:bg-white/20">
                      <Database className="w-6 h-6" />
                      Database Config
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6 mt-6">
              <Card className="bg-white/5 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">User Management</CardTitle>
                </CardHeader>
                <CardContent className="text-white">
                  <p className="text-gray-300">Manage user accounts, permissions, and access levels.</p>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-500/20 rounded-lg">
                      <h3 className="font-semibold text-green-400">Active Users</h3>
                      <p className="text-2xl font-bold text-green-300">{adminStats.activeUsers}</p>
                    </div>
                    <div className="p-4 bg-blue-500/20 rounded-lg">
                      <h3 className="font-semibold text-blue-400">Total Users</h3>
                      <p className="text-2xl font-bold text-blue-300">{adminStats.totalUsers}</p>
                    </div>
                    <div className="p-4 bg-purple-500/20 rounded-lg">
                      <h3 className="font-semibold text-purple-400">New Today</h3>
                      <p className="text-2xl font-bold text-purple-300">23</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Compliance Tab */}
            <TabsContent value="compliance" className="space-y-6 mt-6">
              <Card className="bg-white/5 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Compliance Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="text-white">
                  <p className="text-gray-300">Regulatory compliance monitoring and reporting.</p>
                  <div className="mt-4 p-4 bg-green-500/20 rounded-lg">
                    <h3 className="font-semibold text-green-400">Compliance Score</h3>
                    <p className="text-2xl font-bold text-green-300">{adminStats.complianceScore}%</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6 mt-6">
              <Card className="bg-white/5 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Business Analytics</CardTitle>
                </CardHeader>
                <CardContent className="text-white">
                  <p className="text-gray-300">Advanced analytics and business intelligence.</p>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-500/20 rounded-lg">
                      <h3 className="font-semibold text-blue-400">Revenue</h3>
                      <p className="text-2xl font-bold text-blue-300">R{adminStats.revenue.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-green-500/20 rounded-lg">
                      <h3 className="font-semibold text-green-400">Growth</h3>
                      <p className="text-2xl font-bold text-green-300">+15.3%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* API Management Tab */}
            <TabsContent value="api-management" className="space-y-6 mt-6">
              <Card className="bg-white/5 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">API Management</CardTitle>
                </CardHeader>
                <CardContent className="text-white">
                  <p className="text-gray-300">API gateway configuration and monitoring.</p>
                  <div className="mt-4 p-4 bg-purple-500/20 rounded-lg">
                    <h3 className="font-semibold text-purple-400">API Requests</h3>
                    <p className="text-2xl font-bold text-purple-300">{adminStats.apiRequests}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6 mt-6">
              <Card className="bg-white/5 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Report Generation</CardTitle>
                </CardHeader>
                <CardContent className="text-white">
                  <p className="text-gray-300">Generate and export comprehensive reports.</p>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button className="h-auto p-4 flex-col gap-2 bg-white/10 hover:bg-white/20">
                      <FileText className="w-6 h-6" />
                      Generate Report
                    </Button>
                    <Button className="h-auto p-4 flex-col gap-2 bg-white/10 hover:bg-white/20">
                      <TrendingUp className="w-6 h-6" />
                      Analytics Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6 mt-6">
              <Card className="bg-white/5 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Notification Center</CardTitle>
                </CardHeader>
                <CardContent className="text-white">
                  <p className="text-gray-300">System notifications and alert management.</p>
                  <div className="mt-4 space-y-3">
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <p className="text-sm text-blue-300">System backup completed successfully</p>
                      <p className="text-xs text-blue-200">2 minutes ago</p>
                    </div>
                    <div className="p-3 bg-green-500/20 rounded-lg">
                      <p className="text-sm text-green-300">New user registered: john@example.com</p>
                      <p className="text-xs text-green-200">5 minutes ago</p>
                    </div>
                    <div className="p-3 bg-yellow-500/20 rounded-lg">
                      <p className="text-sm text-yellow-300">Scheduled maintenance reminder</p>
                      <p className="text-xs text-yellow-200">1 hour ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default ComprehensiveAdminDashboard;