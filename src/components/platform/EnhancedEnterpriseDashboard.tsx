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
      description: "Mobile airtime, data, SMS & voice services"
    },
    {
      value: "insurance",
      label: "Insurance Products", 
      shortLabel: "Insurance",
      icon: <Shield className="w-4 h-4" />,
      description: "Device, life, funeral & credit protection"
    },
    {
      value: "virtual",
      label: "Virtual Services",
      shortLabel: "Virtual", 
      icon: <Gamepad2 className="w-4 h-4" />,
      description: "Gaming, utilities & financial services"
    },
    {
      value: "analytics",
      label: "Analytics & Reports",
      shortLabel: "Analytics",
      icon: <BarChart3 className="w-4 h-4" />,
      description: "Performance metrics & insights"
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

        {/* Enhanced Vertical Tabs Layout */}
        <Tabs defaultValue="prepaid" className="w-full" orientation={isMobile ? "horizontal" : "vertical"}>
          <div className={`${isMobile ? 'mb-4' : 'flex gap-6'}`}>
            <TabsList className={`
              ${isMobile 
                ? 'flex w-full bg-white shadow-sm border rounded-lg p-1 overflow-x-auto' 
                : 'flex flex-col h-fit w-64 bg-white shadow-sm border rounded-lg p-2 space-y-1'
              }
            `}>
              {tabItems.map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  className={`
                    ${isMobile 
                      ? 'flex-shrink-0 min-w-[120px] text-xs py-3 px-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600' 
                      : 'w-full justify-start text-left text-sm py-4 px-4 h-auto data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-l-2 data-[state=active]:border-blue-600'
                    }
                    transition-all duration-200 hover:bg-gray-50 flex items-center gap-3
                  `}
                >
                  <div className="flex items-center gap-2">
                    {tab.icon}
                    <div className={`${isMobile ? 'text-center' : 'text-left'}`}>
                      <div className={`font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {isMobile ? tab.shortLabel : tab.label}
                      </div>
                      {!isMobile && (
                        <div className="text-xs text-gray-500 mt-1">
                          {tab.description}
                        </div>
                      )}
                    </div>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {/* Tab Content Container */}
            <div className={`${isMobile ? 'w-full' : 'flex-1'}`}>
              <TabsContent value="prepaid" className="space-y-4 md:space-y-6 mt-0">
                <PrepaidServicesPanel />
              </TabsContent>

              <TabsContent value="insurance" className="space-y-4 md:space-y-6 mt-0">
                <InsuranceServicesPanel />
              </TabsContent>

              <TabsContent value="virtual" className="space-y-4 md:space-y-6 mt-0">
                <VirtualServicesPanel />
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4 md:space-y-6 mt-0">
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
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedEnterpriseDashboard;
