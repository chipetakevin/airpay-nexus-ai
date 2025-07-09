import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileText, 
  Upload, 
  Settings, 
  BarChart3, 
  Users,
  Network,
  Shield,
  Database
} from 'lucide-react';
import TemplateManager from './TemplateManager';
import BulkOperationsManager from './BulkOperationsManager';
import MVNEDashboard from './MVNEDashboard';
import ServiceManagement from './ServiceManagement';

const MVNEPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'System overview and metrics'
    },
    {
      id: 'templates',
      label: 'Templates',
      icon: FileText,
      description: 'Manage service templates'
    },
    {
      id: 'bulk-operations',
      label: 'Bulk Operations',
      icon: Upload,
      description: 'Process bulk services'
    },
    {
      id: 'services',
      label: 'Services',
      icon: Network,
      description: 'Service management'
    },
    {
      id: 'mvnos',
      label: 'MVNOs',
      icon: Users,
      description: 'Partner management'
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: BarChart3,
      description: 'Analytics & reports'
    },
    {
      id: 'admin',
      label: 'Admin',
      icon: Settings,
      description: 'System administration'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Addex Hub Platform
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Mobile Virtual Network Enabler - Comprehensive telecommunications infrastructure management platform
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Card 
                key={item.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  isActive 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg ring-2 ring-blue-300' 
                    : 'bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50'
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                    isActive 
                      ? 'bg-white/20' 
                      : 'bg-gradient-to-br from-blue-100 to-purple-100'
                  }`}>
                    <Icon className={`h-6 w-6 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                  </div>
                  <h3 className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-gray-800'}`}>
                    {item.label}
                  </h3>
                  <p className={`text-xs mt-1 ${isActive ? 'text-white/80' : 'text-gray-600'}`}>
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="dashboard" className="m-0 border-0">
              <div className="p-6">
                <MVNEDashboard />
              </div>
            </TabsContent>

            <TabsContent value="templates" className="m-0 border-0">
              <div className="p-6">
                <TemplateManager />
              </div>
            </TabsContent>

            <TabsContent value="bulk-operations" className="m-0 border-0">
              <div className="p-6">
                <BulkOperationsManager />
              </div>
            </TabsContent>

            <TabsContent value="services" className="m-0 border-0">
              <div className="p-6">
                <ServiceManagement />
              </div>
            </TabsContent>

            <TabsContent value="mvnos" className="m-0 border-0">
              <div className="p-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-6 w-6" />
                      MVNO Partner Management
                    </CardTitle>
                    <CardDescription>
                      Manage Mobile Virtual Network Operator partnerships and configurations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-muted-foreground">
                      <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                      <h3 className="text-lg font-semibold mb-2">MVNO Management</h3>
                      <p className="mb-4">Comprehensive MVNO partner management system</p>
                      <Button>
                        <Users className="h-4 w-4 mr-2" />
                        Add New MVNO Partner
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="m-0 border-0">
              <div className="p-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-6 w-6" />
                      Analytics & Reporting
                    </CardTitle>
                    <CardDescription>
                      Comprehensive analytics, metrics, and business intelligence reports
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-muted-foreground">
                      <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                      <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
                      <p className="mb-4">Real-time business intelligence and reporting dashboard</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                        <Card className="p-4">
                          <div className="text-center">
                            <Database className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                            <h4 className="font-semibold">Data Analytics</h4>
                            <p className="text-sm text-muted-foreground">Usage patterns & trends</p>
                          </div>
                        </Card>
                        <Card className="p-4">
                          <div className="text-center">
                            <Users className="h-8 w-8 mx-auto mb-2 text-green-500" />
                            <h4 className="font-semibold">Customer Insights</h4>
                            <p className="text-sm text-muted-foreground">Subscriber behavior analysis</p>
                          </div>
                        </Card>
                        <Card className="p-4">
                          <div className="text-center">
                            <BarChart3 className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                            <h4 className="font-semibold">Revenue Reports</h4>
                            <p className="text-sm text-muted-foreground">Financial performance metrics</p>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="admin" className="m-0 border-0">
              <div className="p-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-6 w-6" />
                      System Administration
                    </CardTitle>
                    <CardDescription>
                      Platform configuration, security settings, and system management
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <Card className="p-4 hover:shadow-md transition-shadow">
                        <div className="text-center">
                          <Users className="h-12 w-12 mx-auto mb-3 text-blue-500" />
                          <h3 className="font-semibold mb-2">User Management</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Manage user accounts, roles, and permissions
                          </p>
                          <Button variant="outline" size="sm">Configure</Button>
                        </div>
                      </Card>

                      <Card className="p-4 hover:shadow-md transition-shadow">
                        <div className="text-center">
                          <Shield className="h-12 w-12 mx-auto mb-3 text-green-500" />
                          <h3 className="font-semibold mb-2">Security Settings</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Configure security policies and access controls
                          </p>
                          <Button variant="outline" size="sm">Configure</Button>
                        </div>
                      </Card>

                      <Card className="p-4 hover:shadow-md transition-shadow">
                        <div className="text-center">
                          <Database className="h-12 w-12 mx-auto mb-3 text-purple-500" />
                          <h3 className="font-semibold mb-2">System Monitoring</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Monitor system health and performance metrics
                          </p>
                          <Button variant="outline" size="sm">View Status</Button>
                        </div>
                      </Card>

                      <Card className="p-4 hover:shadow-md transition-shadow">
                        <div className="text-center">
                          <Settings className="h-12 w-12 mx-auto mb-3 text-orange-500" />
                          <h3 className="font-semibold mb-2">API Management</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Configure API endpoints and integration settings
                          </p>
                          <Button variant="outline" size="sm">Manage APIs</Button>
                        </div>
                      </Card>

                      <Card className="p-4 hover:shadow-md transition-shadow">
                        <div className="text-center">
                          <BarChart3 className="h-12 w-12 mx-auto mb-3 text-indigo-500" />
                          <h3 className="font-semibold mb-2">Audit Logs</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            View system activity and audit trails
                          </p>
                          <Button variant="outline" size="sm">View Logs</Button>
                        </div>
                      </Card>

                      <Card className="p-4 hover:shadow-md transition-shadow">
                        <div className="text-center">
                          <Network className="h-12 w-12 mx-auto mb-3 text-red-500" />
                          <h3 className="font-semibold mb-2">Network Config</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Configure network infrastructure settings
                          </p>
                          <Button variant="outline" size="sm">Configure</Button>
                        </div>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MVNEPortal;