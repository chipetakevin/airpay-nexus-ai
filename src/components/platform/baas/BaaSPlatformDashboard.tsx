
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, Shield, Server, Activity, 
  BarChart, Zap, Settings, Globe,
  CheckCircle, TrendingUp, Users, DollarSign,
  Brain, Bot, MessageSquare, ChartLine,
  Network, Layers, CloudCog, Cpu
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
import MVNXAgenticAIPanel from './ai/MVNXAgenticAIPanel';
import DataMeshManagementPanel from './data/DataMeshManagementPanel';
import CustomerDataPlatformPanel from './cdp/CustomerDataPlatformPanel';
import WhatsAppBusinessPanel from './whatsapp/WhatsAppBusinessPanel';

const BaaSPlatformDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Enhanced tab configuration with agentic AI and data management features
  const tabConfig = [
    {
      value: 'overview',
      label: 'Overview',
      icon: <BarChart className="w-5 h-5" />,
      gradient: 'from-blue-500 via-blue-600 to-indigo-700',
      bgGradient: 'from-blue-50 via-blue-100 to-indigo-100',
      shadowColor: 'shadow-blue-500/30',
      description: 'System overview and metrics'
    },
    {
      value: 'agentic-ai',
      label: 'Agentic AI',
      icon: <Brain className="w-5 h-5" />,
      gradient: 'from-purple-500 via-violet-600 to-fuchsia-700',
      bgGradient: 'from-purple-50 via-violet-100 to-fuchsia-100',
      shadowColor: 'shadow-purple-500/30',
      description: 'AI agents and automation'
    },
    {
      value: 'data-mesh',
      label: 'Data Mesh',
      icon: <Network className="w-5 h-5" />,
      gradient: 'from-emerald-500 via-teal-600 to-cyan-700',
      bgGradient: 'from-emerald-50 via-teal-100 to-cyan-100',
      shadowColor: 'shadow-emerald-500/30',
      description: 'Decentralized data architecture'
    },
    {
      value: 'cdp',
      label: 'Customer CDP',
      icon: <Users className="w-5 h-5" />,
      gradient: 'from-pink-500 via-rose-600 to-red-700',
      bgGradient: 'from-pink-50 via-rose-100 to-red-100',
      shadowColor: 'shadow-pink-500/30',
      description: 'Customer data platform'
    },
    {
      value: 'whatsapp-business',
      label: 'WhatsApp Business',
      icon: <MessageSquare className="w-5 h-5" />,
      gradient: 'from-green-500 via-emerald-600 to-teal-700',
      bgGradient: 'from-green-50 via-emerald-100 to-teal-100',
      shadowColor: 'shadow-green-500/30',
      description: 'WhatsApp Business API'
    },
    {
      value: 'transactions',
      label: 'Transactions',
      icon: <Activity className="w-5 h-5" />,
      gradient: 'from-orange-500 via-amber-600 to-yellow-700',
      bgGradient: 'from-orange-50 via-amber-100 to-yellow-100',
      shadowColor: 'shadow-orange-500/30',
      description: 'Transaction processing'
    },
    {
      value: 'infrastructure',
      label: 'Infrastructure',
      icon: <Server className="w-5 h-5" />,
      gradient: 'from-slate-500 via-gray-600 to-zinc-700',
      bgGradient: 'from-slate-50 via-gray-100 to-zinc-100',
      shadowColor: 'shadow-slate-500/30',
      description: 'Server and resource management'
    },
    {
      value: 'security',
      label: 'Security',
      icon: <Shield className="w-5 h-5" />,
      gradient: 'from-red-500 via-rose-600 to-pink-700',
      bgGradient: 'from-red-50 via-rose-100 to-pink-100',
      shadowColor: 'shadow-red-500/30',
      description: 'Security and compliance'
    },
    {
      value: 'api',
      label: 'API Gateway',
      icon: <Globe className="w-5 h-5" />,
      gradient: 'from-indigo-500 via-blue-600 to-cyan-700',
      bgGradient: 'from-indigo-50 via-blue-100 to-cyan-100',
      shadowColor: 'shadow-indigo-500/30',
      description: 'API management'
    },
    {
      value: 'supabase',
      label: 'Supabase Core',
      icon: <Database className="w-5 h-5" />,
      gradient: 'from-teal-500 via-cyan-600 to-blue-700',
      bgGradient: 'from-teal-50 via-cyan-100 to-blue-100',
      shadowColor: 'shadow-teal-500/30',
      description: 'Supabase configuration'
    },
    {
      value: 'analytics',
      label: 'Analytics',
      icon: <TrendingUp className="w-5 h-5" />,
      gradient: 'from-violet-500 via-purple-600 to-indigo-700',
      bgGradient: 'from-violet-50 via-purple-100 to-indigo-100',
      shadowColor: 'shadow-violet-500/30',
      description: 'Analytics and insights'
    },
    {
      value: 'realtime',
      label: 'Real-time',
      icon: <Zap className="w-5 h-5" />,
      gradient: 'from-yellow-500 via-orange-600 to-red-700',
      bgGradient: 'from-yellow-50 via-orange-100 to-red-100',
      shadowColor: 'shadow-yellow-500/30',
      description: 'Real-time features'
    }
  ];

  const platformMetrics = [
    {
      label: 'AI Agents Active',
      value: '12',
      change: '+3',
      icon: <Bot className="w-5 h-5" />,
      color: 'text-purple-600'
    },
    {
      label: 'Total API Calls',
      value: '2.4M',
      change: '+12%',
      icon: <Activity className="w-5 h-5" />,
      color: 'text-blue-600'
    },
    {
      label: 'MVNO Partners',
      value: '8',
      change: '+2',
      icon: <Users className="w-5 h-5" />,
      color: 'text-green-600'
    },
    {
      label: 'System Uptime',
      value: '99.98%',
      change: '+0.02%',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'text-emerald-600'
    }
  ];

  const serviceStatus = [
    { name: 'AI Agent Orchestrator', status: 'operational', uptime: '99.98%' },
    { name: 'Data Mesh Platform', status: 'operational', uptime: '99.95%' },
    { name: 'WhatsApp Business API', status: 'operational', uptime: '99.92%' },
    { name: 'Customer Data Platform', status: 'operational', uptime: '99.89%' },
    { name: 'Real-time Analytics', status: 'operational', uptime: '99.94%' },
    { name: 'MVNX Core Services', status: 'operational', uptime: '99.96%' }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Divinely Mobile BaaS Platform
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Enterprise-grade MVNX Backend-as-a-Service platform with Agentic AI, powered by advanced data mesh architecture
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <Badge variant="outline" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-300">
              <Brain className="w-3 h-3 mr-1" />
              Agentic AI Enabled
            </Badge>
            <Badge variant="outline" className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-300">
              <Network className="w-3 h-3 mr-1" />
              Data Mesh Architecture
            </Badge>
            <Badge variant="outline" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300">
              <MessageSquare className="w-3 h-3 mr-1" />
              WhatsApp Business API
            </Badge>
          </div>
        </div>

        {/* Platform Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platformMetrics.map((metric, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2 font-medium">{metric.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</p>
                    <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                      metric.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                  <div className={`p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 ${metric.color} group-hover:scale-110 transition-transform duration-300`}>
                    {metric.icon}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Platform Tabs with Vertical Design */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Vertical Tab Navigation */}
            <div className="lg:w-80 space-y-3 max-h-[800px] overflow-y-auto">
              <TabsList className="h-auto w-full bg-transparent p-0 flex flex-col space-y-2">
                {tabConfig.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={`
                      w-full h-auto p-0 bg-transparent data-[state=active]:bg-transparent
                      border-0 shadow-none
                    `}
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
                        {/* Icon */}
                        <div className={`
                          p-3 rounded-lg transition-all duration-300 shadow-md
                          ${activeTab === tab.value 
                            ? `bg-gradient-to-br ${tab.gradient} text-white shadow-xl` 
                            : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 group-hover:from-gray-200 group-hover:to-gray-300'
                          }
                        `}>
                          {tab.icon}
                        </div>
                        
                        {/* Content */}
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

                        {/* Active indicator */}
                        {activeTab === tab.value && (
                          <div className={`
                            w-1 h-12 rounded-full bg-gradient-to-b ${tab.gradient} shadow-lg
                          `} />
                        )}
                      </div>

                      {/* Bottom indicator for active tab */}
                      {activeTab === tab.value && (
                        <div className={`
                          w-16 h-1 rounded-full bg-gradient-to-r ${tab.gradient} mt-3 mx-auto
                          shadow-lg animate-fade-in
                        `} />
                      )}
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Tab Content */}
            <div className="flex-1 min-w-0">
              <TabsContent value="overview" className="mt-0 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Service Status */}
                  <Card className="lg:col-span-2 shadow-xl border-0">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <Server className="w-6 h-6 text-blue-600" />
                        MVNX Platform Status
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
                              <span className="font-semibold text-gray-800">{service.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-600 font-medium">{service.uptime}</span>
                              <Badge className={`${getStatusColor(service.status)} font-medium px-3 py-1`}>
                                {service.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Enhanced Quick Actions */}
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
                <MVNXAgenticAIPanel />
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
        </Tabs>
      </div>
    </div>
  );
};

export default BaaSPlatformDashboard;
