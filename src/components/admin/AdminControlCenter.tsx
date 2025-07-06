import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomerManagementDashboard from './CustomerManagementDashboard';
import MVNEDataExtractionPanel from './MVNEDataExtractionPanel';
import MVNEDailyRechargePanel from './MVNEDailyRechargePanel';
import ModernAdminTabs from './ModernAdminTabs';
import OrdersSection from './OrdersSection';
import MobileCustomerManagementLayout from './mobile/MobileCustomerManagementLayout';
import { adminTabs, profileTabs, dataTabs } from './AdminTabsConfig';
import { useIsMobile } from '@/hooks/use-mobile';
import VersionRestoration from './VersionRestoration';
import { 
  Shield, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  Activity, 
  CreditCard, 
  RefreshCw,
  Bell,
  ChevronRight,
  BarChart3,
  Settings,
  Eye,
  Zap
} from 'lucide-react';

interface AdminControlCenterProps {
  activeAdminTab: string;
  setActiveAdminTab: (tab: string) => void;
  activeProfileTab: string;
  setActiveProfileTab: (tab: string) => void;
  activeDataTab: string;
  setActiveDataTab: (tab: string) => void;
}

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  onClick: () => void;
  color: {
    border: string;
    bg: string;
    iconBg: string;
    icon: string;
    button: string;
  };
  badge?: {
    text: string;
    variant: "default" | "destructive" | "outline" | "secondary";
    className: string;
  };
  buttonText?: string;
}

const AdminControlCenter: React.FC<AdminControlCenterProps> = ({
  activeAdminTab,
  setActiveAdminTab,
  activeProfileTab,
  setActiveProfileTab,
  activeDataTab,
  setActiveDataTab
}) => {
  const isMobile = useIsMobile();
  const [systemStats, setSystemStats] = useState({
    totalUsers: 1247,
    activeUsers: 892,
    totalTransactions: 5632,
    systemHealth: 99.2,
    alertsCount: 3,
    oneCardBalance: 0.00
  });

  const [liveStats, setLiveStats] = useState({
    networkStatus: 'online',
    dealUpdates: 'active',
    systemHealth: 'optimal',
    lastUpdate: new Date().toLocaleTimeString()
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        lastUpdate: new Date().toLocaleTimeString()
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Mobile-first Customer Management View
  if (isMobile && activeAdminTab === 'dashboard' && activeProfileTab === 'customer-profiles') {
    return (
      <MobileCustomerManagementLayout
        activeAdminTab={activeAdminTab}
        setActiveAdminTab={setActiveAdminTab}
        activeProfileTab={activeProfileTab}
        setActiveProfileTab={setActiveProfileTab}
      />
    );
  }

  const StatusCard = ({ title, value, trend, icon: Icon, color, description }) => (
    <Card className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 ${color.border} bg-gradient-to-br ${color.bg}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl ${color.iconBg} group-hover:scale-110 transition-transform duration-300`}>
              <Icon className={`w-6 h-6 ${color.icon}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            </div>
          </div>
          <div className={`text-2xl ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend > 0 ? '↗' : '↘'}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ActionCard: React.FC<ActionCardProps> = ({ title, description, icon: Icon, onClick, color, badge, buttonText = "Access" }) => (
    <Card className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-l-4 ${color.border} bg-gradient-to-br ${color.bg}`} onClick={onClick}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${color.iconBg} group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-8 h-8 ${color.icon}`} />
          </div>
          {badge && (
            <Badge variant={badge.variant} className={`${badge.className} animate-pulse`}>
              {badge.text}
            </Badge>
          )}
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{description}</p>
        <Button className={`w-full group-hover:scale-105 transition-transform duration-200 ${color.button}`}>
          {buttonText}
          <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8 pb-20 overflow-y-visible">
      {/* Enhanced Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Admin Control Center
            </h1>
            <p className="text-muted-foreground">Complete system administration and oversight</p>
          </div>
        </div>

        {/* Live System Status Indicators */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-green-700">Network Online</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-blue-700">Deals Active</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-emerald-700">System Optimal</span>
          </div>
        </div>
      </div>

      {/* Enhanced Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusCard
          title="Total Users"
          value={systemStats.totalUsers.toLocaleString()}
          trend={5.2}
          icon={Users}
          description="Active registrations"
          color={{
            border: 'border-l-blue-500',
            bg: 'from-blue-50 to-white',
            iconBg: 'bg-blue-100',
            icon: 'text-blue-600'
          }}
        />
        <StatusCard
          title="Live Transactions"
          value={systemStats.totalTransactions.toLocaleString()}
          trend={12.8}
          icon={Activity}
          description="Today's activity"
          color={{
            border: 'border-l-green-500',
            bg: 'from-green-50 to-white',
            iconBg: 'bg-green-100',
            icon: 'text-green-600'
          }}
        />
        <StatusCard
          title="System Health"
          value={`${systemStats.systemHealth}%`}
          trend={0.3}
          icon={TrendingUp}
          description="Uptime performance"
          color={{
            border: 'border-l-emerald-500',
            bg: 'from-emerald-50 to-white',
            iconBg: 'bg-emerald-100',
            icon: 'text-emerald-600'
          }}
        />
        <StatusCard
          title="Active Alerts"
          value={systemStats.alertsCount}
          trend={-2}
          icon={AlertTriangle}
          description="Requires attention"
          color={{
            border: 'border-l-orange-500',
            bg: 'from-orange-50 to-white',
            iconBg: 'bg-orange-100',
            icon: 'text-orange-600'
          }}
        />
      </div>

      {/* Alert Section */}
      {systemStats.alertsCount > 0 && (
        <Alert className="border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 to-orange-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="flex items-center justify-between">
            <span className="text-red-800 font-medium">
              {systemStats.alertsCount} system alerts require immediate attention
            </span>
            <Button size="sm" variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
              <Bell className="w-4 h-4 mr-2" />
              View Alerts
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Enhanced Navigation Tabs */}
      <Tabs value={activeAdminTab} onValueChange={setActiveAdminTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 h-12 bg-muted/50 rounded-xl p-1">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Eye className="w-4 h-4 mr-2" />
            Monitor
          </TabsTrigger>
          <TabsTrigger value="onecard" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <CreditCard className="w-4 h-4 mr-2" />
            OneCard
          </TabsTrigger>
          <TabsTrigger value="orders" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Settings className="w-4 h-4 mr-2" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="version-control" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Versions
          </TabsTrigger>
          <TabsTrigger value="system" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Zap className="w-4 h-4 mr-2" />
            System
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab Content */}
        <TabsContent value="dashboard" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <ActionCard
              title="Addex Hub Nerve Center"
              description="System Central Command Portal - All Systems"
              icon={Activity}
              badge={{ text: "ACTIVE", variant: "default", className: "bg-green-500 text-white" }}
              buttonText="Expand"
              color={{
                border: 'border-l-blue-500',
                bg: 'from-blue-50 to-white',
                iconBg: 'bg-blue-100',
                icon: 'text-blue-600',
                button: 'bg-blue-600 hover:bg-blue-700 text-white'
              }}
              onClick={() => {}}
            />
            
            <ActionCard
              title="Suspicious Activity Monitor"
              description="Real-time security monitoring • Automated alerts • Fraud detection reporting"
              icon={AlertTriangle}
              badge={{ text: "LIVE", variant: "destructive", className: "bg-red-500 text-white animate-pulse" }}
              buttonText="Send Test Alert"
              color={{
                border: 'border-l-red-500',
                bg: 'from-red-50 to-white',
                iconBg: 'bg-red-100',
                icon: 'text-red-600',
                button: 'bg-red-600 hover:bg-red-700 text-white'
              }}
              onClick={() => {}}
            />

            <ActionCard
              title="OneCard Balance Management Dashboard"
              description="Comprehensive oversight of all OneCard cashback rewards"
              icon={CreditCard}
              badge={{ text: "R0.00", variant: "secondary", className: "bg-blue-100 text-blue-800" }}
              color={{
                border: 'border-l-purple-500',
                bg: 'from-purple-50 to-white',
                iconBg: 'bg-purple-100',
                icon: 'text-purple-600',
                button: 'bg-purple-600 hover:bg-purple-700 text-white'
              }}
              onClick={() => {}}
            />

            <ActionCard
              title="Customer Management"
              description="Manage customer accounts, view balances, and handle support tickets"
              icon={Users}
              badge={{ text: "MANAGE", variant: "default", className: "bg-green-100 text-green-800" }}
              color={{
                border: 'border-l-green-500',
                bg: 'from-green-50 to-white',
                iconBg: 'bg-green-100',
                icon: 'text-green-600',
                button: 'bg-green-600 hover:bg-green-700 text-white'
              }}
              onClick={() => setActiveProfileTab('customer-profiles')}
            />

            <ActionCard
              title="Vendor Management"
              description="Manage vendor accounts, commissions, and business operations"
              icon={Users}
              badge={{ text: "PARTNER", variant: "secondary", className: "bg-indigo-100 text-indigo-800" }}
              color={{
                border: 'border-l-indigo-500',
                bg: 'from-indigo-50 to-white',
                iconBg: 'bg-indigo-100',
                icon: 'text-indigo-600',
                button: 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }}
              onClick={() => setActiveProfileTab('vendor-profiles')}
            />

            <ActionCard
              title="System Analytics"
              description="View system analytics, transaction reports, and performance metrics"
              icon={BarChart3}
              badge={{ text: "INSIGHTS", variant: "outline", className: "bg-cyan-100 text-cyan-800" }}
              color={{
                border: 'border-l-cyan-500',
                bg: 'from-cyan-50 to-white',
                iconBg: 'bg-cyan-100',
                icon: 'text-cyan-600',
                button: 'bg-cyan-600 hover:bg-cyan-700 text-white'
              }}
              onClick={() => {}}
            />
          </div>

          {/* Profile Management Section */}
          {activeProfileTab && (
            <div className="mt-8">
              <Tabs value={activeProfileTab} onValueChange={setActiveProfileTab}>
                <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
                  <TabsTrigger value="customer-profiles">Customers</TabsTrigger>
                  <TabsTrigger value="vendor-profiles">Vendors</TabsTrigger>
                  <TabsTrigger value="admin-profile">Admins</TabsTrigger>
                </TabsList>

                <TabsContent value="customer-profiles" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-6 h-6 text-blue-600" />
                        Customer Management
                      </CardTitle>
                      <p className="text-muted-foreground">Manage customer accounts, view balances, and handle support tickets</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <CustomerManagementDashboard />
                        
                        {/* Divine Mobile Data Extraction Center */}
                        <div className="mt-8 space-y-4">
                          <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                            <Activity className="w-5 h-5 text-blue-600" />
                            Divine Mobile Data Extraction Center
                          </h3>
                          
                          <Tabs value={activeDataTab} onValueChange={setActiveDataTab}>
                            <TabsList>
                              <TabsTrigger value="sim-data">SIM Data</TabsTrigger>
                              <TabsTrigger value="recharge-data">Recharge Data</TabsTrigger>
                            </TabsList>
                            <TabsContent value="sim-data" className="mt-6">
                              <MVNEDataExtractionPanel />
                            </TabsContent>
                            <TabsContent value="recharge-data" className="mt-6">
                              <MVNEDailyRechargePanel />
                            </TabsContent>
                          </Tabs>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="vendor-profiles" className="mt-6">
                  <ActionCard
                    title="Vendor Management Portal"
                    description="Comprehensive vendor account management, commission tracking, and business operations oversight"
                    icon={Users}
                    badge={{ text: "VENDORS", variant: "secondary", className: "bg-indigo-100 text-indigo-800" }}
                    color={{
                      border: 'border-l-indigo-500',
                      bg: 'from-indigo-50 to-white',
                      iconBg: 'bg-indigo-100',
                      icon: 'text-indigo-600',
                      button: 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }}
                    onClick={() => {}}
                  />
                </TabsContent>

                <TabsContent value="admin-profile" className="mt-6">
                  <ActionCard
                    title="Admin Profile Management"
                    description="System administration settings, admin account management, and security configurations"
                    icon={Shield}
                    badge={{ text: "ADMIN", variant: "outline", className: "bg-gray-100 text-gray-800" }}
                    color={{
                      border: 'border-l-gray-500',
                      bg: 'from-gray-50 to-white',
                      iconBg: 'bg-gray-100',
                      icon: 'text-gray-600',
                      button: 'bg-gray-600 hover:bg-gray-700 text-white'
                    }}
                    onClick={() => {}}
                  />
                </TabsContent>
              </Tabs>
            </div>
          )}
        </TabsContent>

        {/* Other Tab Contents */}
        <TabsContent value="security" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActionCard
              title="Security Monitoring"
              description="Real-time threat detection and security event monitoring"
              icon={Shield}
              badge={{ text: "SECURE", variant: "default", className: "bg-green-500 text-white" }}
              color={{
                border: 'border-l-green-500',
                bg: 'from-green-50 to-white',
                iconBg: 'bg-green-100',
                icon: 'text-green-600',
                button: 'bg-green-600 hover:bg-green-700 text-white'
              }}
              onClick={() => {}}
            />
            <ActionCard
              title="Access Control"
              description="User permissions, role management, and authentication settings"
              icon={Users}
              badge={{ text: "CONTROL", variant: "outline", className: "bg-blue-100 text-blue-800" }}
              color={{
                border: 'border-l-blue-500',
                bg: 'from-blue-50 to-white',
                iconBg: 'bg-blue-100',
                icon: 'text-blue-600',
                button: 'bg-blue-600 hover:bg-blue-700 text-white'
              }}
              onClick={() => {}}
            />
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="mt-6">
          <ActionCard
            title="System Monitoring Dashboard"
            description="Real-time system performance, resource usage, and health monitoring"
            icon={Activity}
            badge={{ text: "MONITORING", variant: "default", className: "bg-blue-500 text-white animate-pulse" }}
            color={{
              border: 'border-l-blue-500',
              bg: 'from-blue-50 to-white',
              iconBg: 'bg-blue-100',
              icon: 'text-blue-600',
              button: 'bg-blue-600 hover:bg-blue-700 text-white'
            }}
            onClick={() => {}}
          />
        </TabsContent>

        <TabsContent value="onecard" className="mt-6">
          <div className="space-y-6">
            <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <CreditCard className="w-12 h-12 text-purple-600" />
                  <div>
                    <h2 className="text-2xl font-bold">OneCard Balance Management Dashboard</h2>
                    <p className="text-muted-foreground">Comprehensive oversight of all OneCard cashback rewards</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="text-4xl font-bold text-blue-600 mb-2">R{systemStats.oneCardBalance.toFixed(2)}</div>
                  <p className="text-muted-foreground">Total System Balance</p>
                </div>
              </CardContent>
            </Card>
            <ActionCard
              title="OneCard Administration"
              description="Monitor cashback allocations, card status, and reward distributions"
              icon={CreditCard}
              badge={{ text: "ADMIN", variant: "secondary", className: "bg-purple-100 text-purple-800" }}
              color={{
                border: 'border-l-purple-500',
                bg: 'from-purple-50 to-white',
                iconBg: 'bg-purple-100',
                icon: 'text-purple-600',
                button: 'bg-purple-600 hover:bg-purple-700 text-white'
              }}
              onClick={() => {}}
            />
          </div>
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <OrdersSection />
        </TabsContent>

        <TabsContent value="system" className="mt-6">
          <ActionCard
            title="System Configuration"
            description="Configure system settings, parameters, and operational preferences"
            icon={Settings}
            badge={{ text: "CONFIG", variant: "outline", className: "bg-gray-100 text-gray-800" }}
            color={{
              border: 'border-l-gray-500',
              bg: 'from-gray-50 to-white',
              iconBg: 'bg-gray-100',
              icon: 'text-gray-600',
              button: 'bg-gray-600 hover:bg-gray-700 text-white'
            }}
            onClick={() => {}}
          />
        </TabsContent>

        <TabsContent value="version-control" className="mt-6">
          <VersionRestoration />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminControlCenter;
