
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, Cloud, Shield, Zap, Network, Users, Activity, 
  BarChart3, Settings, Globe, Lock, CheckCircle, AlertCircle,
  Server, Code, Smartphone, Cpu, HardDrive
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import BaaSInfrastructurePanel from './infrastructure/BaaSInfrastructurePanel';
import BaaSSecurityPanel from './security/BaaSSecurityPanel';
import BaaSAPIManagement from './api/BaaSAPIManagement';
import BaaSAnalyticsDashboard from './analytics/BaaSAnalyticsDashboard';
import BaaSMicroservicesPanel from './microservices/BaaSMicroservicesPanel';
import BaaSRealtimePanel from './realtime/BaaSRealtimePanel';

const BaaSPlatformDashboard = () => {
  const isMobile = useIsMobile();

  // Enterprise BaaS metrics
  const baasMetrics = {
    totalAPIRequests: '2.4M',
    activeServices: 127,
    systemUptime: '99.99%',
    dataProcessed: '15.2TB',
    activeUsers: 45892,
    transactionVolume: 'R 125.8M',
    responseTime: '45ms',
    errorRate: '0.02%'
  };

  const serviceCategories = [
    {
      value: "infrastructure",
      label: "Infrastructure & Core",
      icon: <Server className="w-5 h-5" />,
      description: "Database, storage, compute & networking services",
      color: "blue",
      count: 12
    },
    {
      value: "security",
      label: "Security & Auth",
      icon: <Shield className="w-5 h-5" />,
      description: "Authentication, authorization & security layers",
      color: "green",
      count: 8
    },
    {
      value: "api",
      label: "API Management",
      icon: <Code className="w-5 h-5" />,
      description: "REST, GraphQL, webhooks & API gateway",
      color: "purple",
      count: 15
    },
    {
      value: "analytics",
      label: "Analytics & BI",
      icon: <BarChart3 className="w-5 h-5" />,
      description: "Real-time analytics, reporting & insights",
      color: "orange",
      count: 9
    },
    {
      value: "microservices",
      label: "Microservices",
      icon: <Network className="w-5 h-5" />,
      description: "Service mesh, containers & orchestration",
      color: "indigo",
      count: 18
    },
    {
      value: "realtime",
      label: "Real-time Services",
      icon: <Zap className="w-5 h-5" />,
      description: "WebSockets, pub/sub & live updates",
      color: "cyan",
      count: 6
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* BaaS Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="text-center">
            <div className="flex justify-center mb-4 md:mb-6">
              <div className="bg-white bg-opacity-20 p-3 md:p-4 rounded-2xl">
                <Cloud className="w-8 h-8 md:w-12 md:h-12" />
              </div>
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
              Devine Mobile BaaS Platform
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-blue-100 mb-6 md:mb-8 max-w-4xl mx-auto px-4">
              Enterprise-grade Backend-as-a-Service platform for scalable airtime & data services
            </p>
            
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 max-w-6xl mx-auto">
              <div className="bg-white bg-opacity-10 p-3 md:p-4 rounded-lg backdrop-blur-sm">
                <div className="text-lg md:text-2xl font-bold">{baasMetrics.totalAPIRequests}</div>
                <div className="text-xs md:text-sm text-blue-200">API Requests/Month</div>
              </div>
              <div className="bg-white bg-opacity-10 p-3 md:p-4 rounded-lg backdrop-blur-sm">
                <div className="text-lg md:text-2xl font-bold">{baasMetrics.activeServices}</div>
                <div className="text-xs md:text-sm text-blue-200">Active Services</div>
              </div>
              <div className="bg-white bg-opacity-10 p-3 md:p-4 rounded-lg backdrop-blur-sm">
                <div className="text-lg md:text-2xl font-bold">{baasMetrics.systemUptime}</div>
                <div className="text-xs md:text-sm text-blue-200">System Uptime</div>
              </div>
              <div className="bg-white bg-opacity-10 p-3 md:p-4 rounded-lg backdrop-blur-sm">
                <div className="text-lg md:text-2xl font-bold">{baasMetrics.responseTime}</div>
                <div className="text-xs md:text-sm text-blue-200">Avg Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Status Overview */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Platform Status & Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Users</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-900">{baasMetrics.activeUsers.toLocaleString()}</p>
                    <p className="text-sm text-green-600">↑ 12% from last week</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Transaction Volume</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-900">{baasMetrics.transactionVolume}</p>
                    <p className="text-sm text-green-600">↑ 8% growth</p>
                  </div>
                  <Activity className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Data Processed</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-900">{baasMetrics.dataProcessed}</p>
                    <p className="text-sm text-blue-600">Last 24 hours</p>
                  </div>
                  <HardDrive className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Error Rate</p>
                    <p className="text-xl md:text-2xl font-bold text-green-600">{baasMetrics.errorRate}</p>
                    <p className="text-sm text-green-600">Excellent performance</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* BaaS Service Management Tabs */}
        <Tabs defaultValue="infrastructure" className="w-full" orientation="vertical">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Vertical Tabs Navigation */}
            <div className="w-full lg:w-80 lg:flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-4 lg:p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">BaaS Services</h3>
                  <p className="text-sm text-gray-500 mt-1">Manage platform components</p>
                </div>
                
                <TabsList className="flex flex-col w-full h-auto bg-transparent p-3 lg:p-4 space-y-2">
                  {serviceCategories.map((category) => (
                    <TabsTrigger 
                      key={category.value}
                      value={category.value} 
                      className={`
                        w-full justify-start text-left py-4 lg:py-5 px-4 lg:px-5 h-auto rounded-xl
                        data-[state=active]:bg-gradient-to-r data-[state=active]:from-${category.color}-50 data-[state=active]:to-${category.color}-100 
                        data-[state=active]:text-${category.color}-700 data-[state=active]:border data-[state=active]:border-${category.color}-200 
                        data-[state=active]:shadow-lg hover:bg-gray-50 transition-all duration-300 group
                        border border-transparent hover:border-gray-200
                      `}
                    >
                      <div className="flex items-center gap-3 lg:gap-4 w-full">
                        <div className={`
                          p-2.5 lg:p-3 rounded-xl bg-gray-100 
                          group-data-[state=active]:bg-white group-data-[state=active]:shadow-md 
                          group-data-[state=active]:text-${category.color}-600
                          transition-all duration-300
                        `}>
                          {category.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm lg:text-base text-gray-900 group-data-[state=active]:text-inherit">
                              {category.label}
                            </span>
                            <span className={`
                              px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600
                              group-data-[state=active]:bg-${category.color}-100 group-data-[state=active]:text-${category.color}-700
                            `}>
                              {category.count}
                            </span>
                          </div>
                          <div className="text-xs lg:text-sm text-gray-500 mt-0.5 lg:mt-1 leading-relaxed group-data-[state=active]:text-inherit group-data-[state=active]:opacity-80">
                            {category.description}
                          </div>
                        </div>
                        <div className="opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300">
                          <div className={`w-2 h-2 rounded-full bg-${category.color}-500`}></div>
                        </div>
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>
            
            {/* Tab Content Container */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 min-h-[700px]">
                <TabsContent value="infrastructure" className="space-y-6 mt-0 p-6 lg:p-8">
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-3 bg-blue-50 rounded-xl">
                        <Server className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Infrastructure & Core Services</h3>
                        <p className="text-gray-600 mt-1">Manage database, storage, compute and networking infrastructure</p>
                      </div>
                    </div>
                  </div>
                  <BaaSInfrastructurePanel />
                </TabsContent>

                <TabsContent value="security" className="space-y-6 mt-0 p-6 lg:p-8">
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-3 bg-green-50 rounded-xl">
                        <Shield className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Security & Authentication</h3>
                        <p className="text-gray-600 mt-1">Comprehensive security layer with authentication and authorization</p>
                      </div>
                    </div>
                  </div>
                  <BaaSSecurityPanel />
                </TabsContent>

                <TabsContent value="api" className="space-y-6 mt-0 p-6 lg:p-8">
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-3 bg-purple-50 rounded-xl">
                        <Code className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-900">API Management & Gateway</h3>
                        <p className="text-gray-600 mt-1">REST, GraphQL APIs with comprehensive management tools</p>
                      </div>
                    </div>
                  </div>
                  <BaaSAPIManagement />
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6 mt-0 p-6 lg:p-8">
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-3 bg-orange-50 rounded-xl">
                        <BarChart3 className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Analytics & Business Intelligence</h3>
                        <p className="text-gray-600 mt-1">Real-time analytics, reporting and business insights</p>
                      </div>
                    </div>
                  </div>
                  <BaaSAnalyticsDashboard />
                </TabsContent>

                <TabsContent value="microservices" className="space-y-6 mt-0 p-6 lg:p-8">
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-3 bg-indigo-50 rounded-xl">
                        <Network className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Microservices Architecture</h3>
                        <p className="text-gray-600 mt-1">Service mesh, containerization and orchestration</p>
                      </div>
                    </div>
                  </div>
                  <BaaSMicroservicesPanel />
                </TabsContent>

                <TabsContent value="realtime" className="space-y-6 mt-0 p-6 lg:p-8">
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-3 bg-cyan-50 rounded-xl">
                        <Zap className="w-6 h-6 text-cyan-600" />
                      </div>
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Real-time Services</h3>
                        <p className="text-gray-600 mt-1">WebSockets, pub/sub messaging and live data updates</p>
                      </div>
                    </div>
                  </div>
                  <BaaSRealtimePanel />
                </TabsContent>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default BaaSPlatformDashboard;
