import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import ComplianceFormsSystem from './database/ComplianceFormsSystem';
import DataMigrationEngine from './database/DataMigrationEngine';

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
        return <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>;
      case 'warning':
        return <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs">!</div>;
      case 'error':
        return <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">×</div>;
      default:
        return <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">●</div>;
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
            Sync Data
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
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
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">RC</span>
              </div>
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
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <span className="mr-1">↗</span>
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
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">🔒</span>
              </div>
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
              <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">●</span>
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm text-orange-600">
              <span className="mr-1">⏰</span>
              Last 30 days
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-muted">
          <TabsTrigger value="overview">
            Overview
          </TabsTrigger>
          <TabsTrigger value="forms">
            RICA Forms
          </TabsTrigger>
          <TabsTrigger value="migration">
            Data Migration
          </TabsTrigger>
          <TabsTrigger value="security">
            Security
          </TabsTrigger>
          <TabsTrigger value="reports">
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full"></div>
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
                  <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
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

        <TabsContent value="forms" className="space-y-6">
          <ComplianceFormsSystem />
        </TabsContent>

        <TabsContent value="migration" className="space-y-6">
          <DataMigrationEngine />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-5 h-5 bg-blue-600 rounded-full"></div>
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

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-600 rounded-full"></div>
                  Compliance Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <span className="mr-2">📋</span>
                  RICA Compliance Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <span className="mr-2">🛡️</span>
                  Security Audit Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <span className="mr-2">👥</span>
                  Customer Verification Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <span className="mr-2">📊</span>
                  System Performance Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-purple-600 rounded-full"></div>
                  Analytics Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                  <span className="mr-2">📈</span>
                  Launch Advanced Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <span className="mr-2">📱</span>
                  Mobile Usage Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <span className="mr-2">🏢</span>
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