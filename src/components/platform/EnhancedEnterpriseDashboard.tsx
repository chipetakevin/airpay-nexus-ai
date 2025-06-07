
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, Network, Smartphone, BarChart3, Users, Zap, 
  TrendingUp, AlertTriangle, CheckCircle, Clock, Globe,
  DollarSign, Activity, Shield, Settings, Gamepad2, CreditCard,
  Cloud, Code
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import PrepaidServicesPanel from './services/PrepaidServicesPanel';
import InsuranceServicesPanel from './services/InsuranceServicesPanel';
import VirtualServicesPanel from './services/VirtualServicesPanel';

const EnhancedEnterpriseDashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const isMobile = useIsMobile();

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

  // Enhanced service metrics
  const serviceMetrics = [
    { name: 'Prepaid Services', value: 'R 28.4M', growth: '+15%', icon: <Smartphone className="w-6 h-6" /> },
    { name: 'Insurance Products', value: 'R 12.7M', growth: '+23%', icon: <Shield className="w-6 h-6" /> },
    { name: 'Virtual Services', value: 'R 4.8M', growth: '+31%', icon: <Gamepad2 className="w-6 h-6" /> },
    { name: 'BaaS Platform', value: 'R 8.2M', growth: '+42%', icon: <Cloud className="w-6 h-6" /> }
  ];

  const tabItems = [
    {
      value: "prepaid",
      label: "Prepaid Services",
      icon: <Smartphone className="w-5 h-5" />,
      description: "Mobile airtime, data, SMS & voice services",
      color: "blue"
    },
    {
      value: "insurance",
      label: "Insurance Products", 
      icon: <Shield className="w-5 h-5" />,
      description: "Device, life, funeral & credit protection",
      color: "green"
    },
    {
      value: "virtual",
      label: "Virtual Services",
      icon: <Gamepad2 className="w-5 h-5" />,
      description: "Gaming, utilities & financial services",
      color: "purple"
    },
    {
      value: "baas",
      label: "BaaS Platform",
      icon: <Cloud className="w-5 h-5" />,
      description: "Backend-as-a-Service infrastructure",
      color: "indigo"
    },
    {
      value: "analytics",
      label: "Analytics & Reports",
      icon: <BarChart3 className="w-5 h-5" />,
      description: "Performance metrics & insights",
      color: "orange"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="text-center">
            <div className="flex justify-center mb-4 md:mb-6">
              <div className="bg-white bg-opacity-20 p-3 md:p-4 rounded-2xl">
                <Database className="w-8 h-8 md:w-12 md:h-12" />
              </div>
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
              Devine Mobile Platform
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-blue-100 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
              Comprehensive prepaid services, insurance, value-added services & BaaS platform
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 max-w-6xl mx-auto">
              <div className="bg-white bg-opacity-10 p-3 md:p-4 rounded-lg">
                <div className="text-lg md:text-2xl font-bold">{enterpriseData.totalRevenue}</div>
                <div className="text-xs md:text-sm text-blue-200">Total Revenue</div>
              </div>
              <div className="bg-white bg-opacity-10 p-3 md:p-4 rounded-lg">
                <div className="text-lg md:text-2xl font-bold">{enterpriseData.activeAgents.toLocaleString()}</div>
                <div className="text-xs md:text-sm text-blue-200">Active Agents</div>
              </div>
              <div className="bg-white bg-opacity-10 p-3 md:p-4 rounded-lg">
                <div className="text-lg md:text-2xl font-bold">{enterpriseData.insurancePolicies.toLocaleString()}</div>
                <div className="text-xs md:text-sm text-blue-200">Insurance Policies</div>
              </div>
              <div className="bg-white bg-opacity-10 p-3 md:p-4 rounded-lg">
                <div className="text-lg md:text-2xl font-bold">{enterpriseData.customerSatisfaction}</div>
                <div className="text-xs md:text-sm text-blue-200">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="container mx-auto px-4 py-6 md:py-12">
        {/* Service Metrics Overview */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Service Performance Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {serviceMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{metric.name}</p>
                      <p className="text-xl md:text-2xl font-bold text-gray-900">{metric.value}</p>
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

        {/* Enhanced Vertical Tabs Layout - Mobile First */}
        <Tabs defaultValue="prepaid" className="w-full" orientation="vertical">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Vertical Tabs Navigation */}
            <div className="w-full lg:w-80 lg:flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-4 lg:p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">Service Categories</h3>
                  <p className="text-sm text-gray-500 mt-1">Select a service to manage</p>
                </div>
                
                <TabsList className="flex flex-col w-full h-auto bg-transparent p-3 lg:p-4 space-y-2">
                  {tabItems.map((tab) => (
                    <TabsTrigger 
                      key={tab.value}
                      value={tab.value} 
                      className={`
                        w-full justify-start text-left py-4 lg:py-5 px-4 lg:px-5 h-auto rounded-xl
                        data-[state=active]:bg-gradient-to-r data-[state=active]:from-${tab.color}-50 data-[state=active]:to-${tab.color}-100 
                        data-[state=active]:text-${tab.color}-700 data-[state=active]:border data-[state=active]:border-${tab.color}-200 
                        data-[state=active]:shadow-lg hover:bg-gray-50 transition-all duration-300 group
                        border border-transparent hover:border-gray-200
                      `}
                    >
                      <div className="flex items-center gap-3 lg:gap-4 w-full">
                        <div className={`
                          p-2.5 lg:p-3 rounded-xl bg-gray-100 
                          group-data-[state=active]:bg-white group-data-[state=active]:shadow-md 
                          group-data-[state=active]:text-${tab.color}-600
                          transition-all duration-300
                        `}>
                          {tab.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm lg:text-base text-gray-900 group-data-[state=active]:text-inherit">
                            {tab.label}
                          </div>
                          <div className="text-xs lg:text-sm text-gray-500 mt-0.5 lg:mt-1 leading-relaxed group-data-[state=active]:text-inherit group-data-[state=active]:opacity-80">
                            {tab.description}
                          </div>
                        </div>
                        <div className="opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300">
                          <div className={`w-2 h-2 rounded-full bg-${tab.color}-500`}></div>
                        </div>
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>
            
            {/* Tab Content Container */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 min-h-[600px]">
                <TabsContent value="prepaid" className="space-y-6 mt-0 p-6 lg:p-8">
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-3 bg-blue-50 rounded-xl">
                        <Smartphone className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Prepaid Services Management</h3>
                        <p className="text-gray-600 mt-1">Manage mobile airtime, data bundles, SMS packages and voice services</p>
                      </div>
                    </div>
                  </div>
                  <PrepaidServicesPanel />
                </TabsContent>

                <TabsContent value="insurance" className="space-y-6 mt-0 p-6 lg:p-8">
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-3 bg-green-50 rounded-xl">
                        <Shield className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Insurance Products Management</h3>
                        <p className="text-gray-600 mt-1">Oversee device protection, life insurance, funeral cover and credit protection</p>
                      </div>
                    </div>
                  </div>
                  <InsuranceServicesPanel />
                </TabsContent>

                <TabsContent value="virtual" className="space-y-6 mt-0 p-6 lg:p-8">
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-3 bg-purple-50 rounded-xl">
                        <Gamepad2 className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Virtual Services Management</h3>
                        <p className="text-gray-600 mt-1">Control gaming services, utility payments and financial products</p>
                      </div>
                    </div>
                  </div>
                  <VirtualServicesPanel />
                </TabsContent>

                <TabsContent value="baas" className="space-y-6 mt-0 p-6 lg:p-8">
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-3 bg-indigo-50 rounded-xl">
                        <Cloud className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Backend-as-a-Service Platform</h3>
                        <p className="text-gray-600 mt-1">Enterprise-grade BaaS infrastructure with Supabase integration</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* BaaS Platform Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <Card>
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">API Requests</p>
                            <p className="text-xl md:text-2xl font-bold text-gray-900">2.4M/day</p>
                            <p className="text-sm text-blue-600">+12% growth</p>
                          </div>
                          <Code className="w-6 md:w-8 h-6 md:h-8 text-indigo-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Active Services</p>
                            <p className="text-xl md:text-2xl font-bold text-gray-900">127</p>
                            <p className="text-sm text-green-600">All operational</p>
                          </div>
                          <Network className="w-6 md:w-8 h-6 md:h-8 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">System Uptime</p>
                            <p className="text-xl md:text-2xl font-bold text-green-600">99.99%</p>
                            <p className="text-sm text-green-600">Excellent</p>
                          </div>
                          <CheckCircle className="w-6 md:w-8 h-6 md:h-8 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Response Time</p>
                            <p className="text-xl md:text-2xl font-bold text-gray-900">45ms</p>
                            <p className="text-sm text-blue-600">Average</p>
                          </div>
                          <Zap className="w-6 md:w-8 h-6 md:h-8 text-blue-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* BaaS Services Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg md:text-xl">Core BaaS Services</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-600">Infrastructure & Core</span>
                            <span className="text-sm font-medium text-green-600">12 Services Active</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-600">Security & Authentication</span>
                            <span className="text-sm font-medium text-green-600">8 Services Active</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-600">API Management</span>
                            <span className="text-sm font-medium text-green-600">15 Endpoints</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-600">Real-time Services</span>
                            <span className="text-sm font-medium text-green-600">6 Channels Active</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg md:text-xl">Platform Actions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <button className="w-full text-left px-4 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">Access Full BaaS Platform</span>
                              <span className="text-sm">→</span>
                            </div>
                            <p className="text-xs text-indigo-600 mt-1">Comprehensive BaaS management dashboard</p>
                          </button>
                          <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">API Documentation</span>
                              <span className="text-sm">→</span>
                            </div>
                            <p className="text-xs text-blue-600 mt-1">Complete API reference and guides</p>
                          </button>
                          <button className="w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">System Health</span>
                              <span className="text-sm">→</span>
                            </div>
                            <p className="text-xs text-green-600 mt-1">Real-time monitoring and alerts</p>
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6 mt-0 p-6 lg:p-8">
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-3 bg-orange-50 rounded-xl">
                        <BarChart3 className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Analytics & Reports Dashboard</h3>
                        <p className="text-gray-600 mt-1">Comprehensive performance metrics and business insights</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced analytics and reports content */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <Card>
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">API Calls</p>
                            <p className="text-xl md:text-2xl font-bold text-gray-900">{enterpriseData.apiCalls}</p>
                            <p className="text-sm text-blue-600">Last 24 hours</p>
                          </div>
                          <Network className="w-6 md:w-8 h-6 md:h-8 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Daily Transactions</p>
                            <p className="text-xl md:text-2xl font-bold text-gray-900">{enterpriseData.dailyTransactions.toLocaleString()}</p>
                            <p className="text-sm text-green-600">↑ 18% from yesterday</p>
                          </div>
                          <Activity className="w-6 md:w-8 h-6 md:h-8 text-blue-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">System Alerts</p>
                            <p className="text-xl md:text-2xl font-bold text-orange-600">{enterpriseData.systemAlerts}</p>
                            <p className="text-sm text-orange-600">Requires attention</p>
                          </div>
                          <AlertTriangle className="w-6 md:w-8 h-6 md:h-8 text-orange-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Network Uptime</p>
                            <p className="text-xl md:text-2xl font-bold text-green-600">{enterpriseData.networkUptime}</p>
                            <p className="text-sm text-green-600">Excellent performance</p>
                          </div>
                          <CheckCircle className="w-6 md:w-8 h-6 md:h-8 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Performance Summary Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg md:text-xl">Platform Performance Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">BaaS Platform</span>
                              <span className="text-sm font-medium text-green-600">99.99%</span>
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
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">API Requests</span>
                              <span className="text-sm font-medium text-green-600">99.94%</span>
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
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedEnterpriseDashboard;
