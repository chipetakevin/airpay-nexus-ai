import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import AddexHubNerveCenter from '../addex-hub/AddexHubNerveCenter';
import AdminPlatformBranding from './AdminPlatformBranding';
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
  Zap,
  Database,
  Network,
  FileText,
  GitBranch
} from 'lucide-react';

interface AdminControlCenterProps {
  activeAdminTab: string;
  setActiveAdminTab: (tab: string) => void;
}

const AdminControlCenterFixed: React.FC<AdminControlCenterProps> = ({
  activeAdminTab,
  setActiveAdminTab
}) => {
  const { toast } = useToast();
  const [systemStats, setSystemStats] = useState({
    totalUsers: 1247,
    activeUsers: 892,
    totalTransactions: 5632,
    systemHealth: 99.2,
    alertsCount: 3,
    oneCardBalance: 0.00
  });
  const [hubActiveTab, setHubActiveTab] = useState('overview');

  const ActionCard = ({ title, description, icon: Icon, onClick, color, badge, buttonText = "Access" }) => (
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

  const adminSections = [
    {
      id: 'hub',
      label: 'Addex Hub',
      icon: Activity,
      title: 'Addex Hub Platform',
      description: 'Telecom Infrastructure Central Command - Neural Admin Portal',
      color: {
        border: 'border-l-blue-500',
        bg: 'from-blue-50 to-purple-50',
        iconBg: 'bg-gradient-to-br from-blue-100 to-purple-100',
        icon: 'text-blue-600',
        button: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
      },
      badge: { text: "NEURAL", variant: "default", className: "bg-purple-500 text-white animate-pulse" }
    },
    {
      id: 'database',
      label: 'Database',
      icon: Database,
      title: 'Database Management',
      description: 'Database monitoring, backups, and analytics',
      color: {
        border: 'border-l-purple-500',
        bg: 'from-purple-50 to-white',
        iconBg: 'bg-purple-100',
        icon: 'text-purple-600',
        button: 'bg-purple-600 hover:bg-purple-700 text-white'
      }
    },
    {
      id: 'security',
      label: 'Security',
      icon: Shield,
      title: 'Security Monitor',
      description: 'Real-time security monitoring and fraud detection',
      color: {
        border: 'border-l-red-500',
        bg: 'from-red-50 to-white',
        iconBg: 'bg-red-100',
        icon: 'text-red-600',
        button: 'bg-red-600 hover:bg-red-700 text-white'
      }
    },
    {
      id: 'access',
      label: 'Access',
      icon: Eye,
      title: 'Access Control',
      description: 'User permissions and access management',
      color: {
        border: 'border-l-cyan-500',
        bg: 'from-cyan-50 to-white',
        iconBg: 'bg-cyan-100',
        icon: 'text-cyan-600',
        button: 'bg-cyan-600 hover:bg-cyan-700 text-white'
      }
    },
    {
      id: 'balances',
      label: 'Balances',
      icon: CreditCard,
      title: 'Balance Management',
      description: 'OneCard balances and financial oversight',
      color: {
        border: 'border-l-green-500',
        bg: 'from-green-50 to-white',
        iconBg: 'bg-green-100',
        icon: 'text-green-600',
        button: 'bg-green-600 hover:bg-green-700 text-white'
      }
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'System analytics and performance metrics',
      color: {
        border: 'border-l-indigo-500',
        bg: 'from-indigo-50 to-white',
        iconBg: 'bg-indigo-100',
        icon: 'text-indigo-600',
        button: 'bg-indigo-600 hover:bg-indigo-700 text-white'
      }
    },
    {
      id: 'revenue',
      label: 'Revenue',
      icon: TrendingUp,
      title: 'Revenue Reporting',
      description: 'Financial reports and revenue analytics',
      color: {
        border: 'border-l-emerald-500',
        bg: 'from-emerald-50 to-white',
        iconBg: 'bg-emerald-100',
        icon: 'text-emerald-600',
        button: 'bg-emerald-600 hover:bg-emerald-700 text-white'
      }
    },
    {
      id: 'networks',
      label: 'Networks',
      icon: Network,
      title: 'Network Management',
      description: 'Network monitoring and configuration',
      color: {
        border: 'border-l-orange-500',
        bg: 'from-orange-50 to-white',
        iconBg: 'bg-orange-100',
        icon: 'text-orange-600',
        button: 'bg-orange-600 hover:bg-orange-700 text-white'
      }
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: FileText,
      title: 'Order Management',
      description: 'Order processing and fulfillment',
      color: {
        border: 'border-l-pink-500',
        bg: 'from-pink-50 to-white',
        iconBg: 'bg-pink-100',
        icon: 'text-pink-600',
        button: 'bg-pink-600 hover:bg-pink-700 text-white'
      }
    },
    {
      id: 'versions',
      label: 'Versions',
      icon: GitBranch,
      title: 'Version Control',
      description: 'Codebase versioning and deployment management',
      color: {
        border: 'border-l-slate-500',
        bg: 'from-slate-50 to-white',
        iconBg: 'bg-slate-100',
        icon: 'text-slate-600',
        button: 'bg-slate-600 hover:bg-slate-700 text-white'
      }
    }
  ];

  const handleSectionClick = (sectionId: string) => {
    console.log(`🔧 Admin Section clicked: ${sectionId}`);
    setActiveAdminTab(sectionId);
    toast({
      title: "Section Activated",
      description: `Switched to ${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)} section`,
    });
  };

  // If hub section is active, render the full AddexHubNerveCenter
  if (activeAdminTab === 'hub') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        {/* Enhanced Mobile/Desktop Header */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveAdminTab('')}
                  className="bg-white hover:bg-gray-50 flex-shrink-0"
                  size="sm"
                >
                  ← Back to Nerve Center
                </Button>
                <div className="hidden sm:block">
                  <AdminPlatformBranding size="small" showSubtitle={false} />
                </div>
              </div>
              
              {/* Mobile/Desktop Action Buttons */}
              <div className="flex items-center gap-2 sm:gap-3">
                <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                  <Bell className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Alerts</span>
                  <Badge className="ml-1 sm:ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5">
                    {systemStats.alertsCount}
                  </Badge>
                </Button>
                <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Monitor</span>
                </Button>
                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                  <span className="text-xs sm:text-sm">Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Platform Branding */}
        <div className="sm:hidden bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-3 border-b">
          <AdminPlatformBranding size="small" showSubtitle={false} />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <AddexHubNerveCenter 
            activeTab={hubActiveTab}
            setActiveTab={setHubActiveTab}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Enhanced Mobile/Desktop Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Top Row - Title and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg flex-shrink-0">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent leading-tight">
                    Admin The Nerve Center
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Complete system administration and oversight</p>
                </div>
              </div>
              
              {/* Desktop Action Buttons */}
              <div className="hidden sm:flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                  Close
                </Button>
                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                  Logout
                </Button>
                <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-lg">
                  <Badge className="bg-yellow-400 text-yellow-900 font-bold text-xs px-2 py-1">
                    ADMIN
                  </Badge>
                </div>
              </div>
            </div>

            {/* Mobile Description and Actions */}
            <div className="sm:hidden">
              <p className="text-xs text-muted-foreground mb-3">Complete system administration and oversight</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50 text-xs px-3">
                    Close
                  </Button>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white text-xs px-3">
                    Logout
                  </Button>
                </div>
                <div className="p-1.5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-lg">
                  <Badge className="bg-yellow-400 text-yellow-900 font-bold text-xs px-2 py-0.5">
                    ADMIN
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container with Tabs */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <Tabs value={activeAdminTab || 'overview'} onValueChange={setActiveAdminTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6 h-auto p-1 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-lg border border-gray-200/50">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-blue-200/30 rounded-lg px-4 py-3 font-medium transition-all duration-300"
            >
              The Nerve Center
            </TabsTrigger>
            <TabsTrigger 
              value="hub" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-blue-200/30 rounded-lg px-4 py-3 font-medium transition-all duration-300"
            >
              Addex Hub Platform
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 sm:space-y-6 pb-20">
            {/* Addex Hub Platform Card - Mobile Optimized */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6">
              <AdminPlatformBranding size="medium" showSubtitle={true} />
            </div>

            {/* Live System Status Indicators - Mobile Optimized */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6">
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3 sm:mb-4 text-center">System Status</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-green-700">Network Online</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-blue-700">Deals Active</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-emerald-700">System Optimal</span>
                </div>
              </div>
            </div>

            {/* Alert Section - Mobile Optimized */}
            {systemStats.alertsCount > 0 && (
              <div className="bg-white rounded-xl shadow-md border border-red-200">
                <Alert className="border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 to-orange-50 m-0 rounded-xl">
                  <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />
                  <AlertDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <span className="text-red-800 font-medium text-sm">
                      {systemStats.alertsCount} system alerts require immediate attention
                    </span>
                    <Button size="sm" variant="outline" className="border-red-300 text-red-700 hover:bg-red-100 w-full sm:w-auto flex-shrink-0">
                      <Bell className="w-4 h-4 mr-2" />
                      View Alerts
                    </Button>
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* Admin Control Grid - Enhanced Mobile Layout */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">Admin Control Center</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {adminSections.map((section) => (
                  <ActionCard
                    key={section.id}
                    title={section.title}
                    description={section.description}
                    icon={section.icon}
                    color={section.color}
                    badge={section.badge || { text: "ACTIVE", variant: "default", className: "bg-green-500 text-white" }}
                    onClick={() => handleSectionClick(section.id)}
                  />
                ))}
              </div>
            </div>

            {/* Quick Actions - Mobile Optimized */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <Zap className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Quick Actions</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <Button 
                  variant="outline" 
                  className="h-16 sm:h-20 flex flex-col items-center justify-center space-y-2 transition-all duration-300 hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-blue-200 text-blue-700"
                  onClick={() => {
                    toast({
                      title: "System Refresh Initiated",
                      description: "Refreshing system state and updating data...",
                    });
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                  }}
                >
                  <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-xs sm:text-sm font-medium">Refresh System</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-16 sm:h-20 flex flex-col items-center justify-center space-y-2 transition-all duration-300 hover:scale-105 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border-green-200 text-green-700"
                  onClick={() => {
                    toast({
                      title: "User Management",
                      description: "Opening user management interface...",
                    });
                    handleSectionClick('access');
                  }}
                >
                  <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-xs sm:text-sm font-medium">User Management</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-16 sm:h-20 flex flex-col items-center justify-center space-y-2 transition-all duration-300 hover:scale-105 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border-purple-200 text-purple-700"
                  onClick={() => {
                    toast({
                      title: "System Settings",
                      description: "Accessing system configuration panel...",
                    });
                    handleSectionClick('hub');
                  }}
                >
                  <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-xs sm:text-sm font-medium">System Settings</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-16 sm:h-20 flex flex-col items-center justify-center space-y-2 transition-all duration-300 hover:scale-105 bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 border-orange-200 text-orange-700"
                  onClick={() => {
                    toast({
                      title: "Analytics Dashboard",
                      description: "Loading analytics and reporting interface...",
                    });
                    handleSectionClick('dashboard');
                  }}
                >
                  <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-xs sm:text-sm font-medium">Analytics</span>
                </Button>
              </div>
            </div>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default AdminControlCenterFixed;