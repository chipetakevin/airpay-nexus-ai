import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Shield, 
  BarChart3, 
  Activity, 
  Settings,
  UserCheck,
  FileText,
  TrendingUp,
  Clock,
  AlertTriangle
} from 'lucide-react';
import FieldWorkerPermissionManager from '@/components/admin/FieldWorkerPermissionManager';
import UserManagementDashboard from '@/components/admin/UserManagementDashboard';
import ActivityLogsPanel from '@/components/admin/ActivityLogsPanel';
import AutomatedReportingSystem from '@/components/admin/AutomatedReportingSystem';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for overview stats
  const stats = {
    totalUsers: 1247,
    fieldWorkers: 89,
    activePermissions: 234,
    recentActivities: 156,
    onboardingRate: 94.2,
    systemHealth: 'Excellent'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-slate-600">
              Comprehensive system administration and user management
            </p>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-200">
            <Activity className="w-4 h-4 mr-1" />
            System Online
          </Badge>
        </div>

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card className="bg-white/80 backdrop-blur-sm border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total Users</p>
                  <p className="text-2xl font-bold text-slate-800">{stats.totalUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <UserCheck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Field Workers</p>
                  <p className="text-2xl font-bold text-slate-800">{stats.fieldWorkers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Active Permissions</p>
                  <p className="text-2xl font-bold text-slate-800">{stats.activePermissions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Recent Activities</p>
                  <p className="text-2xl font-bold text-slate-800">{stats.recentActivities}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Onboarding Rate</p>
                  <p className="text-2xl font-bold text-slate-800">{stats.onboardingRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Activity className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">System Health</p>
                  <p className="text-lg font-bold text-emerald-600">{stats.systemHealth}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Card className="bg-white/90 backdrop-blur-sm border-slate-200">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-2 h-auto p-2 bg-slate-100/50">
              <TabsTrigger 
                value="overview" 
                className="flex items-center gap-2 text-sm font-medium"
              >
                <BarChart3 className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="permissions" 
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Shield className="w-4 h-4" />
                Field Worker Permissions
              </TabsTrigger>
              <TabsTrigger 
                value="users" 
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Users className="w-4 h-4" />
                User Management
              </TabsTrigger>
              <TabsTrigger 
                value="reports" 
                className="flex items-center gap-2 text-sm font-medium"
              >
                <FileText className="w-4 h-4" />
                Reporting System
              </TabsTrigger>
              <TabsTrigger 
                value="activity" 
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Activity className="w-4 h-4" />
                Activity Logs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border-slate-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        System Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">CPU Usage</span>
                          <span className="text-sm font-medium">34%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '34%' }}></div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Memory Usage</span>
                          <span className="text-sm font-medium">67%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Database Load</span>
                          <span className="text-sm font-medium">23%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: '23%' }}></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                        System Alerts
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-green-800">All systems operational</p>
                            <p className="text-xs text-green-600">Last checked: 2 minutes ago</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-blue-800">Database backup completed</p>
                            <p className="text-xs text-blue-600">15 minutes ago</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-amber-800">Scheduled maintenance in 3 days</p>
                            <p className="text-xs text-amber-600">Jan 10, 2025 at 2:00 AM</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-slate-200">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Button 
                        variant="outline" 
                        className="h-auto p-4 flex-col gap-2"
                        onClick={() => setActiveTab('permissions')}
                      >
                        <Shield className="w-6 h-6 text-blue-600" />
                        Manage Permissions
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-auto p-4 flex-col gap-2"
                        onClick={() => setActiveTab('users')}
                      >
                        <Users className="w-6 h-6 text-green-600" />
                        User Management
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-auto p-4 flex-col gap-2"
                        onClick={() => setActiveTab('reports')}
                      >
                        <FileText className="w-6 h-6 text-purple-600" />
                        Generate Reports
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-auto p-4 flex-col gap-2"
                        onClick={() => setActiveTab('activity')}
                      >
                        <Activity className="w-6 h-6 text-orange-600" />
                        View Activity
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="permissions" className="p-6">
              <FieldWorkerPermissionManager />
            </TabsContent>

            <TabsContent value="users" className="p-6">
              <UserManagementDashboard />
            </TabsContent>

            <TabsContent value="reports" className="p-6">
              <AutomatedReportingSystem />
            </TabsContent>

            <TabsContent value="activity" className="p-6">
              <ActivityLogsPanel />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;