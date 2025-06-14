import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, Shield, Server, Activity, 
  BarChart, Zap, Settings, Globe,
  CheckCircle, TrendingUp, Users, DollarSign,
  Brain, Bot, MessageSquare, ChartLine,
  Network, Layers, CloudCog, Cpu, Smartphone
} from 'lucide-react';

// Import all the panel components
import BaaSInfrastructurePanel from './infrastructure/BaaSInfrastructurePanel';
import BaaSSecurityPanel from './security/BaaSSecurityPanel';
import BaaSAPIManagement from './api/BaaSAPIManagement';
import BaaSAnalyticsDashboard from './analytics/BaaSAnalyticsDashboard';
import BaaSMicroservicesPanel from './microservices/BaaSMicroservicesPanel';
import BaaSRealtimePanel from './realtime/BaaSRealtimePanel';
import SupabaseConfigPanel from './core/SupabaseConfigPanel';
import TransactionProcessorPanel from './core/TransactionProcessorPanel';
import AgenticBaaSAIPanel from './ai/MVNXAgenticAIPanel';
import DataMeshManagementPanel from './data/DataMeshManagementPanel';
import CustomerDataPlatformPanel from './cdp/CustomerDataPlatformPanel';
import WhatsAppBusinessPanel from './whatsapp/WhatsAppBusinessPanel';

const BaaSPlatformDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Enhanced tab configuration for Agentic BaaS Platform
  const tabConfig = [
    {
      value: 'overview',
      label: 'Overview',
      icon: <BarChart className="w-4 h-4 md:w-5 md:h-5" />,
      gradient: 'from-blue-500 via-blue-600 to-indigo-700',
      bgGradient: 'from-blue-50 via-blue-100 to-indigo-100',
      shadowColor: 'shadow-blue-500/30',
      description: 'Platform overview and metrics'
    },
    {
      value: 'agentic-ai',
      label: 'Agentic AI',
      icon: <Brain className="w-4 h-4 md:w-5 md:h-5" />,
      gradient: 'from-purple-500 via-violet-600 to-fuchsia-700',
      bgGradient: 'from-purple-50 via-violet-100 to-fuchsia-100',
      shadowColor: 'shadow-purple-500/30',
      description: 'Autonomous AI agents and automation'
    },
    {
      value: 'data-mesh',
      label: 'Data Mesh',
      icon: <Network className="w-4 h-4 md:w-5 md:h-5" />,
      gradient: 'from-emerald-500 via-teal-600 to-cyan-700',
      bgGradient: 'from-emerald-50 via-teal-100 to-cyan-100',
      shadowColor: 'shadow-emerald-500/30',
      description: 'Decentralized data architecture'
    },
    {
      value: 'cdp',
      label: 'Customer CDP',
      icon: <Users className="w-4 h-4 md:w-5 md:h-5" />,
      gradient: 'from-pink-500 via-rose-600 to-red-700',
      bgGradient: 'from-pink-50 via-rose-100 to-red-100',
      shadowColor: 'shadow-pink-500/30',
      description: 'Customer data platform and analytics'
    },
    {
      value: 'whatsapp-business',
      label: 'WhatsApp Business',
      icon: <MessageSquare className="w-4 h-4 md:w-5 md:h-5" />,
      gradient: 'from-green-500 via-emerald-600 to-teal-700',
      bgGradient: 'from-green-50 via-emerald-100 to-teal-100',
      shadowColor: 'shadow-green-500/30',
      description: 'WhatsApp Business API integration'
    },
    {
      value: 'transactions',
      label: 'Transactions',
      icon: <Activity className="w-4 h-4 md:w-5 md:h-5" />,
      gradient: 'from-orange-500 via-amber-600 to-yellow-700',
      bgGradient: 'from-orange-50 via-amber-100 to-yellow-100',
      shadowColor: 'shadow-orange-500/30',
      description: 'Transaction processing engine'
    },
    {
      value: 'infrastructure',
      label: 'Infrastructure',
      icon: <Server className="w-4 h-4 md:w-5 md:h-5" />,
      gradient: 'from-slate-500 via-gray-600 to-zinc-700',
      bgGradient: 'from-slate-50 via-gray-100 to-zinc-100',
      shadowColor: 'shadow-slate-500/30',
      description: 'Cloud infrastructure management'
    },
    {
      value: 'security',
      label: 'Security',
      icon: <Shield className="w-4 h-4 md:w-5 md:h-5" />,
      gradient: 'from-red-500 via-rose-600 to-pink-700',
      bgGradient: 'from-red-50 via-rose-100 to-pink-100',
      shadowColor: 'shadow-red-500/30',
      description: 'Security and compliance monitoring'
    },
    {
      value: 'api',
      label: 'API Gateway',
      icon: <Globe className="w-4 h-4 md:w-5 md:h-5" />,
      gradient: 'from-indigo-500 via-blue-600 to-cyan-700',
      bgGradient: 'from-indigo-50 via-blue-100 to-cyan-100',
      shadowColor: 'shadow-indigo-500/30',
      description: 'API management and routing'
    },
    {
      value: 'supabase',
      label: 'Database Core',
      icon: <Database className="w-4 h-4 md:w-5 md:h-5" />,
      gradient: 'from-teal-500 via-cyan-600 to-blue-700',
      bgGradient: 'from-teal-50 via-cyan-100 to-blue-100',
      shadowColor: 'shadow-teal-500/30',
      description: 'Database configuration and management'
    },
    {
      value: 'analytics',
      label: 'Analytics',
      icon: <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />,
      gradient: 'from-violet-500 via-purple-600 to-indigo-700',
      bgGradient: 'from-violet-50 via-purple-100 to-indigo-100',
      shadowColor: 'shadow-violet-500/30',
      description: 'Business intelligence and insights'
    },
    {
      value: 'realtime',
      label: 'Real-time',
      icon: <Zap className="w-4 h-4 md:w-5 md:h-5" />,
      gradient: 'from-yellow-500 via-orange-600 to-red-700',
      bgGradient: 'from-yellow-50 via-orange-100 to-red-100',
      shadowColor: 'shadow-yellow-500/30',
      description: 'Real-time processing and streaming'
    }
  ];

  // Enhanced platform metrics for mobile experience
  const platformMetrics = [
    {
      label: 'Autonomous Agents',
      value: '18',
      change: '+6',
      icon: <Brain className="w-4 h-4 md:w-5 md:h-5" />,
      color: 'text-purple-600'
    },
    {
      label: 'API Requests',
      value: '4.7M',
      change: '+23%',
      icon: <Activity className="w-4 h-4 md:w-5 md:h-5" />,
      color: 'text-blue-600'
    },
    {
      label: 'Active MVNOs',
      value: '12',
      change: '+4',
      icon: <Smartphone className="w-4 h-4 md:w-5 md:h-5" />,
      color: 'text-green-600'
    },
    {
      label: 'Platform Uptime',
      value: '99.99%',
      change: '+0.01%',
      icon: <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />,
      color: 'text-emerald-600'
    }
  ];

  // Enhanced service status for Agentic BaaS
  const serviceStatus = [
    { name: 'AI Agent Orchestrator', status: 'operational', uptime: '99.99%', requests: '156K/min' },
    { name: 'Data Mesh Platform', status: 'operational', uptime: '99.97%', requests: '234K/min' },
    { name: 'WhatsApp Business API', status: 'operational', uptime: '99.94%', requests: '87K/min' },
    { name: 'Customer Data Platform', status: 'operational', uptime: '99.92%', requests: '145K/min' },
    { name: 'Real-time Analytics', status: 'operational', uptime: '99.96%', requests: '298K/min' },
    { name: 'Security Intelligence', status: 'operational', uptime: '99.98%', requests: '67K/min' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800';
      case 'degraded': return 'bg-orange-100 text-orange-800';
      case 'offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 p-2 md:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6 lg:space-y-8">
        {/* Mobile-First Header */}
        <div className="text-center space-y-3 md:space-y-4">
          <div className="flex justify-center mb-3 md:mb-4">
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-3 md:p-4 rounded-2xl">
              <Brain className="w-8 h-8 md:w-12 md:h-12 text-purple-600 animate-pulse" />
            </div>
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent px-4">
            Divinely Mobile Agentic BaaS Platform
          </h1>
          <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Revolutionary Backend-as-a-Service platform with autonomous AI agents, powered by advanced data mesh architecture for telecommunications excellence
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-xs md:text-sm">
            <Badge variant="outline" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-300">
              <Brain className="w-3 h-3 mr-1" />
              18 Autonomous Agents
            </Badge>
            <Badge variant="outline" className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-300">
              <Network className="w-3 h-3 mr-1" />
              Data Mesh Architecture
            </Badge>
            <Badge variant="outline" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300">
              <MessageSquare className="w-3 h-3 mr-1" />
              WhatsApp Business Ready
            </Badge>
          </div>
        </div>

        {/* Enhanced Mobile Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {platformMetrics.map((metric, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-3 md:p-6">
                <div className="flex flex-col items-center text-center space-y-2 md:space-y-3">
                  <div className={`p-2 md:p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 ${metric.color} group-hover:scale-110 transition-transform duration-300`}>
                    {metric.icon}
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-600 mb-1 md:mb-2 font-medium">{metric.label}</p>
                    <p className="text-xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">{metric.value}</p>
                    <span className={`text-xs md:text-sm px-2 md:px-3 py-1 rounded-full font-medium ${
                      metric.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile-Optimized Tab System */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Mobile Navigation - Horizontal Scroll */}
          <div className="block lg:hidden mb-4">
            <TabsList className="grid grid-cols-4 w-full bg-white shadow-sm">
              <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
              <TabsTrigger value="agentic-ai" className="text-xs">AI</TabsTrigger>
              <TabsTrigger value="data-mesh" className="text-xs">Data</TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs">Analytics</TabsTrigger>
            </TabsList>
            <div className="flex gap-1 mt-2 overflow-x-auto pb-2">
              {tabConfig.slice(4).map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`
                    flex-shrink-0 px-3 py-2 text-xs rounded-lg transition-all duration-300
                    ${activeTab === tab.value 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className="flex items-center gap-1">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Navigation - Vertical */}
          <div className="hidden lg:flex gap-6">
            <div className="w-80 space-y-3 max-h-[800px] overflow-y-auto">
              <TabsList className="h-auto w-full bg-transparent p-0 flex flex-col space-y-2">
                {tabConfig.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="w-full h-auto p-0 bg-transparent data-[state=active]:bg-transparent border-0 shadow-none"
                    onClick={() => setActiveTab(tab.value)}
                  >
                    <div className={`
                      w-full p-4 rounded-xl transition-all duration-300 group cursor-pointer
                      border-2 shadow-lg ${tab.shadowColor}
                      ${activeTab === tab.value 
                        ? `bg-gradient-to-br ${tab.bgGradient} border-transparent shadow-2xl scale-105 ring-2 ring-white/50` 
                        : `bg-white/80 backdrop-blur-sm border-gray-200/50 hover:border-gray-300/70 hover:bg-white/90 hover:shadow-xl hover:scale-102`
                      }
                      hover:-translate-y-1
                    `}>
                      <div className="flex items-center gap-4">
                        <div className={`
                          p-3 rounded-lg transition-all duration-300 shadow-md
                          ${activeTab === tab.value 
                            ? `bg-gradient-to-br ${tab.gradient} text-white shadow-xl` 
                            : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 group-hover:from-gray-200 group-hover:to-gray-300'
                          }
                        `}>
                          {tab.icon}
                        </div>
                        
                        <div className="flex-1 text-left">
                          <div className={`font-bold text-base leading-tight ${
                            activeTab === tab.value ? 'text-gray-800' : 'text-gray-600 group-hover:text-gray-800'
                          }`}>
                            {tab.label}
                          </div>
                          <div className={`text-sm leading-tight mt-1 transition-colors duration-300 ${
                            activeTab === tab.value ? 'text-gray-600' : 'text-gray-500 group-hover:text-gray-600'
                          }`}>
                            {tab.description}
                          </div>
                        </div>

                        {activeTab === tab.value && (
                          <div className={`w-1 h-12 rounded-full bg-gradient-to-b ${tab.gradient} shadow-lg`} />
                        )}
                      </div>

                      {activeTab === tab.value && (
                        <div className={`w-16 h-1 rounded-full bg-gradient-to-r ${tab.gradient} mt-3 mx-auto shadow-lg animate-fade-in`} />
                      )}
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Desktop Tab Content */}
            <div className="flex-1 min-w-0">
              {/* Tab contents remain the same */}
              <TabsContent value="overview" className="mt-0 space-y-6">
                {/* ... keep existing code for overview content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2 shadow-xl border-0">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <Server className="w-6 h-6 text-blue-600" />
                        Agentic BaaS Platform Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {serviceStatus.map((service, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300">
                            <div className="flex items-center gap-4">
                              <div className={`w-4 h-4 rounded-full shadow-lg ${
                                service.status === 'operational' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                              }`}></div>
                              <div>
                                <span className="font-semibold text-gray-800">{service.name}</span>
                                <div className="text-xs text-gray-500">{service.requests}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-600 font-medium">{service.uptime}</span>
                              <Badge className={`${getStatusColor(service.status)} text-xs px-2 py-1`}>
                                {service.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-xl border-0">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <Settings className="w-6 h-6 text-purple-600" />
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <button 
                          onClick={() => setActiveTab('agentic-ai')}
                          className="w-full text-left p-4 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 text-purple-700 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                        >
                          <Brain className="w-5 h-5 inline mr-3" />
                          <span className="font-semibold">Agentic AI Hub</span>
                        </button>
                        <button 
                          onClick={() => setActiveTab('data-mesh')}
                          className="w-full text-left p-4 bg-gradient-to-r from-cyan-50 to-cyan-100 hover:from-cyan-100 hover:to-cyan-200 text-cyan-700 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                        >
                          <Network className="w-5 h-5 inline mr-3" />
                          <span className="font-semibold">Data Mesh</span>
                        </button>
                        <button 
                          onClick={() => setActiveTab('whatsapp-business')}
                          className="w-full text-left p-4 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 text-green-700 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                        >
                          <MessageSquare className="w-5 h-5 inline mr-3" />
                          <span className="font-semibold">WhatsApp Business</span>
                        </button>
                        <button 
                          onClick={() => setActiveTab('cdp')}
                          className="w-full text-left p-4 bg-gradient-to-r from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200 text-pink-700 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                        >
                          <Users className="w-5 h-5 inline mr-3" />
                          <span className="font-semibold">Customer CDP</span>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="agentic-ai" className="mt-0">
                <AgenticBaaSAIPanel />
              </TabsContent>

              <TabsContent value="data-mesh" className="mt-0">
                <DataMeshManagementPanel />
              </TabsContent>

              <TabsContent value="cdp" className="mt-0">
                <CustomerDataPlatformPanel />
              </TabsContent>

              <TabsContent value="whatsapp-business" className="mt-0">
                <WhatsAppBusinessPanel />
              </TabsContent>

              <TabsContent value="supabase" className="mt-0">
                <SupabaseConfigPanel />
              </TabsContent>

              <TabsContent value="transactions" className="mt-0">
                <TransactionProcessorPanel />
              </TabsContent>

              <TabsContent value="infrastructure" className="mt-0">
                <BaaSInfrastructurePanel />
              </TabsContent>

              <TabsContent value="security" className="mt-0">
                <BaaSSecurityPanel />
              </TabsContent>

              <TabsContent value="api" className="mt-0">
                <BaaSAPIManagement />
              </TabsContent>

              <TabsContent value="analytics" className="mt-0">
                <BaaSAnalyticsDashboard />
              </TabsContent>

              <TabsContent value="realtime" className="mt-0">
                <BaaSRealtimePanel />
              </TabsContent>
            </div>
          </div>

          {/* Mobile Tab Content */}
          <div className="block lg:hidden">
            <TabsContent value="overview" className="mt-0 space-y-4">
              {/* Mobile overview content */}
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                  <CardTitle className="flex items-center gap-3">
                    <Server className="w-5 h-5 text-blue-600" />
                    Platform Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {serviceStatus.slice(0, 3).map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            service.status === 'operational' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                          }`}></div>
                          <div>
                            <div className="font-semibold text-sm text-gray-800">{service.name}</div>
                            <div className="text-xs text-gray-500">{service.uptime}</div>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(service.status)} text-xs px-2 py-1`}>
                          {service.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="agentic-ai" className="mt-0">
              <AgenticBaaSAIPanel />
            </TabsContent>

            <TabsContent value="data-mesh" className="mt-0">
              <DataMeshManagementPanel />
            </TabsContent>

            <TabsContent value="analytics" className="mt-0">
              <BaaSAnalyticsDashboard />
            </TabsContent>

            {/* Other mobile tab contents */}
            <TabsContent value="cdp" className="mt-0">
              <CustomerDataPlatformPanel />
            </TabsContent>

            <TabsContent value="whatsapp-business" className="mt-0">
              <WhatsAppBusinessPanel />
            </TabsContent>

            <TabsContent value="transactions" className="mt-0">
              <TransactionProcessorPanel />
            </TabsContent>

            <TabsContent value="infrastructure" className="mt-0">
              <BaaSInfrastructurePanel />
            </TabsContent>

            <TabsContent value="security" className="mt-0">
              <BaaSSecurityPanel />
            </TabsContent>

            <TabsContent value="api" className="mt-0">
              <BaaSAPIManagement />
            </TabsContent>

            <TabsContent value="supabase" className="mt-0">
              <SupabaseConfigPanel />
            </TabsContent>

            <TabsContent value="realtime" className="mt-0">
              <BaaSRealtimePanel />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default BaaSPlatformDashboard;
