import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, Network, Smartphone, BarChart3, Users, Zap, 
  TrendingUp, AlertTriangle, CheckCircle, Clock, Globe,
  DollarSign, Activity, Shield, Settings, Gamepad2, CreditCard
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
    { name: 'Virtual Services', value: 'R 4.8M', growth: '+31%', icon: <Gamepad2 className="w-6 h-6" /> }
  ];

  const tabItems = [
    {
      value: "prepaid",
      label: "Prepaid Services",
      shortLabel: "Prepaid",
      icon: <Smartphone className="w-4 h-4" />,
      description: "Mobile airtime, data, SMS & voice services",
      color: "blue"
    },
    {
      value: "insurance",
      label: "Insurance Products", 
      shortLabel: "Insurance",
      icon: <Shield className="w-4 h-4" />,
      description: "Device, life, funeral & credit protection",
      color: "green"
    },
    {
      value: "virtual",
      label: "Virtual Services",
      shortLabel: "Virtual", 
      icon: <Gamepad2 className="w-4 h-4" />,
      description: "Gaming, utilities & financial services",
      color: "purple"
    },
    {
      value: "analytics",
      label: "Analytics & Reports",
      shortLabel: "Analytics",
      icon: <BarChart3 className="w-4 h-4" />,
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
              Comprehensive prepaid services, insurance, and value-added services distribution platform
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
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

        {/* Enhanced Vertical Tabs Layout with Mobile-First Design */}
        <Tabs defaultValue="prepaid" className="w-full" orientation={isMobile ? "horizontal" : "vertical"}>
          <div className={`${isMobile ? 'space-y-6' : 'flex gap-8'}`}>
            {/* Vertical Tabs Sidebar */}
            <div className={`${isMobile ? 'w-full' : 'w-80 flex-shrink-0'}`}>
              <TabsList className={`
                ${isMobile 
                  ? 'flex w-full bg-white shadow-lg border rounded-xl p-2 overflow-x-auto scrollbar-hide' 
                  : 'flex flex-col h-auto w-full bg-white shadow-lg border rounded-xl p-3 space-y-2'
                }
              `}>
                {tabItems.map((tab) => (
                  <TabsTrigger 
                    key={tab.value}
                    value={tab.value} 
                    className={`
                      ${isMobile 
                        ? `flex-shrink-0 min-w-[140px] h-20 flex flex-col items-center justify-center text-xs py-3 px-3 
                           data-[state=active]:bg-gradient-to-br data-[state=active]:from-${tab.color}-50 data-[state=active]:to-${tab.color}-100 
                           data-[state=active]:text-${tab.color}-700 data-[state=active]:border data-[state=active]:border-${tab.color}-200 
                           data-[state=active]:shadow-md hover:bg-gray-50 rounded-lg transition-all duration-300` 
                        : `w-full justify-start text-left py-6 px-6 h-auto rounded-lg
                           data-[state=active]:bg-gradient-to-r data-[state=active]:from-${tab.color}-50 data-[state=active]:to-${tab.color}-100 
                           data-[state=active]:text-${tab.color}-700 data-[state=active]:border-l-4 data-[state=active]:border-${tab.color}-500 
                           data-[state=active]:shadow-lg hover:bg-gray-50 transition-all duration-300 group`
                      }
                    `}
                  >
                    <div className={`flex items-center ${isMobile ? 'flex-col gap-1' : 'gap-4'}`}>
                      <div className={`
                        ${isMobile 
                          ? 'p-2 rounded-lg bg-gray-100 group-data-[state=active]:bg-white group-data-[state=active]:shadow-sm' 
                          : 'p-3 rounded-xl bg-gray-100 group-data-[state=active]:bg-white group-data-[state=active]:shadow-md'
                        }
                        transition-all duration-300
                      `}>
                        {tab.icon}
                      </div>
                      <div className={`${isMobile ? 'text-center' : 'text-left flex-1'}`}>
                        <div className={`font-semibold ${isMobile ? 'text-xs leading-tight' : 'text-sm'}`}>
                          {isMobile ? tab.shortLabel : tab.label}
                        </div>
                        {!isMobile && (
                          <div className="text-xs text-gray-500 mt-1 leading-relaxed">
                            {tab.description}
                          </div>
                        )}
                      </div>
                      {!isMobile && (
                        <div className="opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300">
                          <div className={`w-2 h-2 rounded-full bg-${tab.color}-500`}></div>
                        </div>
                      )}
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {/* Tab Content Container */}
            <div className={`${isMobile ? 'w-full' : 'flex-1 min-w-0'}`}>
              <div className="bg-white rounded-xl shadow-lg border p-6 md:p-8">
                <TabsContent value="prepaid" className="space-y-6 mt-0">
                  <div className="border-b border-gray-200 pb-4 mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Smartphone className="w-5 h-5 text-blue-600" />
                      </div>
                      Prepaid Services Management
                    </h3>
                    <p className="text-gray-600 mt-2">Manage mobile airtime, data bundles, SMS packages and voice services</p>
                  </div>
                  <PrepaidServicesPanel />
                </TabsContent>

                <TabsContent value="insurance" className="space-y-6 mt-0">
                  <div className="border-b border-gray-200 pb-4 mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <Shield className="w-5 h-5 text-green-600" />
                      </div>
                      Insurance Products Management
                    </h3>
                    <p className="text-gray-600 mt-2">Oversee device protection, life insurance, funeral cover and credit protection</p>
                  </div>
                  <InsuranceServicesPanel />
                </TabsContent>

                <TabsContent value="virtual" className="space-y-6 mt-0">
                  <div className="border-b border-gray-200 pb-4 mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <Gamepad2 className="w-5 h-5 text-purple-600" />
                      </div>
                      Virtual Services Management
                    </h3>
                    <p className="text-gray-600 mt-2">Control gaming services, utility payments and financial products</p>
                  </div>
                  <VirtualServicesPanel />
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6 mt-0">
                  <div className="border-b border-gray-200 pb-4 mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <div className="p-2 bg-orange-50 rounded-lg">
                        <BarChart3 className="w-5 h-5 text-orange-600" />
                      </div>
                      Analytics & Reports Dashboard
                    </h3>
                    <p className="text-gray-600 mt-2">Comprehensive performance metrics and business insights</p>
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
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedEnterpriseDashboard;
