import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import AddexHubNerveCenter from '../addex-hub/AddexHubNerveCenter';
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
      label: 'Hub',
      icon: Activity,
      title: 'Addex Hub Nerve Center',
      description: 'System Central Command Portal - All Systems',
      color: {
        border: 'border-l-blue-500',
        bg: 'from-blue-50 to-white',
        iconBg: 'bg-blue-100',
        icon: 'text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700 text-white'
      }
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
      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => setActiveAdminTab('')}
            className="bg-white hover:bg-gray-50"
          >
            ← Back to Admin Control
          </Button>
          <h2 className="text-2xl font-bold text-gray-900">Addex Hub Nerve Center</h2>
        </div>
        <AddexHubNerveCenter 
          activeTab={hubActiveTab}
          setActiveTab={setHubActiveTab}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Enhanced Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
             <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
               The Nerve Center
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

      {/* Admin Control Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {adminSections.map((section) => (
          <ActionCard
            key={section.id}
            title={section.title}
            description={section.description}
            icon={section.icon}
            color={section.color}
            badge={{ text: "ACTIVE", variant: "default", className: "bg-green-500 text-white" }}
            onClick={() => handleSectionClick(section.id)}
          />
        ))}
      </div>

      {/* Quick Actions - Enhanced with Functionality */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center justify-center space-y-3 transition-all duration-300 hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-blue-200 text-blue-700"
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
              <RefreshCw className="w-8 h-8" />
              <span className="text-sm font-medium">Refresh System</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center justify-center space-y-3 transition-all duration-300 hover:scale-105 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border-green-200 text-green-700"
              onClick={() => {
                toast({
                  title: "User Management",
                  description: "Opening user management interface...",
                });
                handleSectionClick('access');
              }}
            >
              <Users className="w-8 h-8" />
              <span className="text-sm font-medium">User Management</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center justify-center space-y-3 transition-all duration-300 hover:scale-105 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border-purple-200 text-purple-700"
              onClick={() => {
                toast({
                  title: "System Settings",
                  description: "Accessing system configuration panel...",
                });
                handleSectionClick('hub');
              }}
            >
              <Settings className="w-8 h-8" />
              <span className="text-sm font-medium">System Settings</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center justify-center space-y-3 transition-all duration-300 hover:scale-105 bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 border-orange-200 text-orange-700"
              onClick={() => {
                toast({
                  title: "Analytics Dashboard",
                  description: "Loading analytics and reporting interface...",
                });
                handleSectionClick('dashboard');
              }}
            >
              <BarChart3 className="w-8 h-8" />
              <span className="text-sm font-medium">Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminControlCenterFixed;