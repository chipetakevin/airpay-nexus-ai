import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Database, 
  Shield, 
  Users, 
  Activity,
  BarChart3,
  Lock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Download,
  RefreshCw,
  Settings,
  Zap,
  FileCheck,
  Globe,
  Smartphone,
  Building,
  UserCheck,
  AlertCircle,
  TrendingUp,
  Clock
} from 'lucide-react';

const DatabaseBaaSPanel: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');

  // Mock data for demonstration
  const complianceMetrics = {
    ricaCompliance: 98.5,
    kycVerified: 2847,
    pendingVerifications: 23,
    securityScore: 94,
    dataRetention: 100,
    auditTrails: 15420
  };

  const systemMetrics = {
    totalCustomers: 2847,
    activeConnections: 1892,
    dailyTransactions: 4523,
    systemUptime: 99.97,
    dataProcessed: 15.7,
    complianceAlerts: 3
  };

  const ricaRequirements = [
    { id: 'identity', label: 'Identity Verification', status: 'active', completion: 98 },
    { id: 'address', label: 'Address Verification', status: 'active', completion: 97 },
    { id: 'sim', label: 'SIM Registration', status: 'active', completion: 100 },
    { id: 'documents', label: 'Document Storage', status: 'active', completion: 95 },
    { id: 'audit', label: 'Audit Trails', status: 'active', completion: 100 },
    { id: 'retention', label: 'Data Retention', status: 'active', completion: 100 }
  ];

  const securityControls = [
    { id: 'encryption', label: 'End-to-End Encryption', status: 'enabled', level: 'AES-256' },
    { id: 'mfa', label: 'Multi-Factor Authentication', status: 'enabled', level: 'Required' },
    { id: 'rbac', label: 'Role-Based Access Control', status: 'enabled', level: 'Strict' },
    { id: 'monitoring', label: 'Real-Time Monitoring', status: 'enabled', level: 'Active' },
    { id: 'dlp', label: 'Data Loss Prevention', status: 'enabled', level: 'Enhanced' },
    { id: 'backup', label: 'Automated Backups', status: 'enabled', level: 'Daily' }
  ];

  const recentActivities = [
    { time: '2 min ago', action: 'Customer verification completed', user: 'System AI', type: 'success' },
    { time: '5 min ago', action: 'RICA compliance check passed', user: 'Auto Validator', type: 'success' },
    { time: '8 min ago', action: 'Bulk SIM registration initiated', user: 'Admin User', type: 'info' },
    { time: '12 min ago', action: 'Security audit completed', user: 'Security Bot', type: 'success' },
    { time: '15 min ago', action: 'Document verification pending', user: 'KYC System', type: 'warning' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'enabled':
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Database (BaaS) Management System
          </h1>
          <p className="text-muted-foreground mt-2">
            Powered by Addex Hub • RICA & MVNE/MVNO Compliant • Real-time Analytics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Data
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">RICA Compliance</p>
                <p className="text-2xl font-bold text-purple-700">{complianceMetrics.ricaCompliance}%</p>
              </div>
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <Progress value={complianceMetrics.ricaCompliance} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Verified Customers</p>
                <p className="text-2xl font-bold text-green-700">{complianceMetrics.kycVerified.toLocaleString()}</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              +127 today
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Security Score</p>
                <p className="text-2xl font-bold text-blue-700">{complianceMetrics.securityScore}%</p>
              </div>
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <Badge variant="outline" className="mt-2 border-blue-300 text-blue-700">
              Enterprise Grade
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">System Uptime</p>
                <p className="text-2xl font-bold text-orange-700">{systemMetrics.systemUptime}%</p>
              </div>
              <Activity className="w-8 h-8 text-orange-600" />
            </div>
            <div className="flex items-center mt-2 text-sm text-orange-600">
              <Clock className="w-3 h-3 mr-1" />
              Last 30 days
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-muted">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="rica" className="flex items-center gap-2">
            <FileCheck className="w-4 h-4" />
            RICA Compliance
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Monitoring
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-500" />
                  System Health Monitor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Database Performance</span>
                    <Badge className="bg-green-100 text-green-700">Optimal</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">API Response Time</span>
                    <span className="text-sm text-muted-foreground">127ms avg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Active Connections</span>
                    <span className="text-sm text-muted-foreground">{systemMetrics.activeConnections}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Data Processed Today</span>
                    <span className="text-sm text-muted-foreground">{systemMetrics.dataProcessed}GB</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  Recent System Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50">
                      {getStatusIcon(activity.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.user} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rica" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* RICA Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-purple-600" />
                  RICA Compliance Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {ricaRequirements.map((req) => (
                  <div key={req.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(req.status)}
                        <span className="text-sm font-medium">{req.label}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{req.completion}%</span>
                    </div>
                    <Progress value={req.completion} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Customer Verification */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-600" />
                  Customer Verification Pipeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{complianceMetrics.kycVerified}</p>
                    <p className="text-sm text-green-700">Verified</p>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">{complianceMetrics.pendingVerifications}</p>
                    <p className="text-sm text-yellow-700">Pending</p>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                  <Zap className="w-4 h-4 mr-2" />
                  Process Pending Verifications
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Security Controls Matrix
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {securityControls.map((control) => (
                  <div key={control.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(control.status)}
                      <div>
                        <p className="font-medium">{control.label}</p>
                        <p className="text-sm text-muted-foreground">{control.level}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-green-300 text-green-700">
                      {control.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  Real-Time Monitoring Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Database className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-blue-600">{systemMetrics.dailyTransactions}</p>
                      <p className="text-sm text-blue-700">Daily Transactions</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-purple-600">{systemMetrics.activeConnections}</p>
                      <p className="text-sm text-purple-700">Active Connections</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  System Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm">High memory usage detected</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                    <Activity className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Scheduled maintenance in 2hrs</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">All systems operational</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-green-600" />
                  Compliance Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <FileCheck className="w-4 h-4 mr-2" />
                  RICA Compliance Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Security Audit Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Customer Verification Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  System Performance Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  Analytics Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Launch Advanced Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Mobile Usage Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Building className="w-4 h-4 mr-2" />
                  MVNO Performance Metrics
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DatabaseBaaSPanel;