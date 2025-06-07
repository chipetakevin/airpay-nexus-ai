
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, Network, Smartphone, BarChart3, Users, Zap, 
  TrendingUp, AlertTriangle, CheckCircle, Clock, Globe,
  DollarSign, Activity, Shield, Settings, Gamepad2, CreditCard
} from 'lucide-react';
import PrepaidServicesPanel from './services/PrepaidServicesPanel';
import InsuranceServicesPanel from './services/InsuranceServicesPanel';
import VirtualServicesPanel from './services/VirtualServicesPanel';

const EnhancedEnterpriseDashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState('overview');

  // Enhanced enterprise data
  const enterpriseData = {
    totalRevenue: 'R 45,892,347',
    activeAgents: 15247,
    dailyTransactions: 89423,
    networkUptime: '99.97%',
    bulkOperations: 2847,
    apiCalls: '1.2M',
    systemAlerts: 3,
    pendingSettlements: 'R 2,847,392',
    insurancePolicies: 52847,
    virtualServices: 24392,
    customerSatisfaction: '94.2%'
  };

  const serviceMetrics = [
    { name: 'Prepaid Services', value: 'R 28.4M', growth: '+15%', icon: <Smartphone className="w-6 h-6" /> },
    { name: 'Insurance Products', value: 'R 12.7M', growth: '+23%', icon: <Shield className="w-6 h-6" /> },
    { name: 'Virtual Services', value: 'R 4.8M', growth: '+31%', icon: <Gamepad2 className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white bg-opacity-20 p-4 rounded-2xl">
                <Database className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Devine Mobile Platform
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Comprehensive prepaid services, insurance, and value-added services distribution platform
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <div className="text-2xl font-bold">{enterpriseData.totalRevenue}</div>
                <div className="text-sm text-blue-200">Total Revenue</div>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <div className="text-2xl font-bold">{enterpriseData.activeAgents.toLocaleString()}</div>
                <div className="text-sm text-blue-200">Active Agents</div>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <div className="text-2xl font-bold">{enterpriseData.insurancePolicies.toLocaleString()}</div>
                <div className="text-sm text-blue-200">Insurance Policies</div>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <div className="text-2xl font-bold">{enterpriseData.customerSatisfaction}</div>
                <div className="text-sm text-blue-200">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="container mx-auto px-4 py-12">
        {/* Service Metrics Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Performance Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{metric.name}</p>
                      <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                      <p className="text-sm text-green-600">{metric.growth} from last month</p>
                    </div>
                    <div className="text-blue-500">
                      {metric.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Service Categories Tabs */}
        <Tabs defaultValue="prepaid" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm mb-6">
            <TabsTrigger value="prepaid" className="text-sm">Prepaid Services</TabsTrigger>
            <TabsTrigger value="insurance" className="text-sm">Insurance Products</TabsTrigger>
            <TabsTrigger value="virtual" className="text-sm">Virtual Services</TabsTrigger>
            <TabsTrigger value="analytics" className="text-sm">Analytics & Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="prepaid" className="space-y-6">
            <PrepaidServicesPanel />
          </TabsContent>

          <TabsContent value="insurance" className="space-y-6">
            <InsuranceServicesPanel />
          </TabsContent>

          <TabsContent value="virtual" className="space-y-6">
            <VirtualServicesPanel />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">API Calls</p>
                      <p className="text-2xl font-bold text-gray-900">{enterpriseData.apiCalls}</p>
                      <p className="text-sm text-blue-600">Last 24 hours</p>
                    </div>
                    <Network className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Daily Transactions</p>
                      <p className="text-2xl font-bold text-gray-900">{enterpriseData.dailyTransactions.toLocaleString()}</p>
                      <p className="text-sm text-green-600">↑ 18% from yesterday</p>
                    </div>
                    <Activity className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">System Alerts</p>
                      <p className="text-2xl font-bold text-orange-600">{enterpriseData.systemAlerts}</p>
                      <p className="text-sm text-orange-600">Requires attention</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Network Uptime</p>
                      <p className="text-2xl font-bold text-green-600">{enterpriseData.networkUptime}</p>
                      <p className="text-sm text-green-600">Excellent performance</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Performance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Service Availability</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Prepaid Services</span>
                        <span className="text-sm font-medium text-green-600">99.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Insurance Platform</span>
                        <span className="text-sm font-medium text-green-600">99.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Virtual Services</span>
                        <span className="text-sm font-medium text-green-600">99.9%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Transaction Success</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Airtime/Data</span>
                        <span className="text-sm font-medium text-green-600">98.7%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Insurance Claims</span>
                        <span className="text-sm font-medium text-blue-600">96.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Bill Payments</span>
                        <span className="text-sm font-medium text-green-600">99.1%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Customer Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Satisfaction Score</span>
                        <span className="text-sm font-medium text-purple-600">94.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Retention Rate</span>
                        <span className="text-sm font-medium text-blue-600">87.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Support Resolution</span>
                        <span className="text-sm font-medium text-green-600">92.8%</span>
                      </div>
                    </div>
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

export default EnhancedEnterpriseDashboard;
