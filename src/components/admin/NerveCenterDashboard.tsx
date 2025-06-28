import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Crown, 
  Server, 
  Database, 
  Globe, 
  Shield, 
  Users, 
  Eye, 
  Settings,
  Phone,
  Smartphone,
  Package,
  Network,
  Wifi,
  Target,
  TrendingUp,
  Brain,
  Gauge,
  DollarSign,
  UserCheck,
  Zap,
  Lock,
  FileCheck,
  AlertTriangle,
  FileText,
  Activity,
  Cog,
  BarChart3,
  MessageSquare,
  Calendar,
  HelpCircle,
  Briefcase,
  ScanLine,
  BarChart4,
  UserCog
} from 'lucide-react';

const NerveCenterDashboard = () => {
  const [activeTab, setActiveTab] = useState('dm-baas');

  const tabCategories = [
    {
      id: 'dm-baas',
      label: 'DM BaaS',
      icon: <Crown className="w-4 h-4" />,
      color: 'blue',
      count: 8,
      items: [
        { name: 'DM BaaS Platform', desc: 'AI-Driven MVNX', icon: <Crown className="w-5 h-5" />, status: 'active' },
        { name: 'Cellular Services', desc: 'GSM Core & Bulk', icon: <Phone className="w-5 h-5" />, status: 'active' },
        { name: 'BSS/OSS Suite', desc: 'CRM & Billing', icon: <Database className="w-5 h-5" />, status: 'active' },
        { name: 'API Gateway', desc: 'Integration Hub', icon: <Globe className="w-5 h-5" />, status: 'active' },
        { name: 'RICA Compliance', desc: 'Regulatory', icon: <FileCheck className="w-5 h-5" />, status: 'active' },
        { name: 'White-Label Portal', desc: 'Custom Branding', icon: <Settings className="w-5 h-5" />, status: 'active' },
        { name: 'Consumer Services', desc: 'Multi-Channel', icon: <Users className="w-5 h-5" />, status: 'active' },
        { name: 'Exit Management', desc: 'Migration & Data', icon: <Eye className="w-5 h-5" />, status: 'active' }
      ]
    },
    {
      id: 'mvno-services',
      label: 'MVNO Services',
      icon: <Network className="w-4 h-4" />,
      color: 'green',
      count: 6,
      items: [
        { name: 'SIM Management', desc: 'Physical/eSIM', icon: <Smartphone className="w-5 h-5" />, status: 'active' },
        { name: 'Device Catalog', desc: 'Handsets & IoT', icon: <Package className="w-5 h-5" />, status: 'active' },
        { name: 'Service Packages', desc: 'Plans & Bundles', icon: <Target className="w-5 h-5" />, status: 'active' },
        { name: 'Network Interface', desc: 'Multi-MNO', icon: <Network className="w-5 h-5" />, status: 'active' },
        { name: 'Cellular Capacity', desc: 'Bulk GSM', icon: <Wifi className="w-5 h-5" />, status: 'active' },
        { name: 'Quality Monitoring', desc: 'Service Quality', icon: <Gauge className="w-5 h-5" />, status: 'active' }
      ]
    },
    {
      id: 'ai-analytics',
      label: 'AI & Analytics',
      icon: <Brain className="w-4 h-4" />,
      color: 'purple',
      count: 6,
      items: [
        { name: 'Predictive Analytics', desc: 'ML Insights', icon: <TrendingUp className="w-5 h-5" />, status: 'active' },
        { name: 'Customer Intelligence', desc: 'Behavioral AI', icon: <Brain className="w-5 h-5" />, status: 'active' },
        { name: 'Performance Monitor', desc: 'Real-time KPIs', icon: <Gauge className="w-5 h-5" />, status: 'active' },
        { name: 'Business Intelligence', desc: 'Executive Dashboards', icon: <BarChart3 className="w-5 h-5" />, status: 'active' },
        { name: 'Revenue Optimization', desc: 'Dynamic Pricing', icon: <DollarSign className="w-5 h-5" />, status: 'active' },
        { name: 'Churn Prevention', desc: 'Retention AI', icon: <UserCheck className="w-5 h-5" />, status: 'active' }
      ]
    },
    {
      id: 'dgx-station',
      label: 'DGX Station',
      icon: <Server className="w-4 h-4" />,
      color: 'indigo',
      count: 3,
      items: [
        { name: 'DGX Control Center', desc: 'GPU Clusters', icon: <Server className="w-5 h-5" />, status: 'active' },
        { name: 'Agentic Workflows', desc: 'AI Automation', icon: <Zap className="w-5 h-5" />, status: 'active' },
        { name: 'Resource Management', desc: 'Compute Allocation', icon: <Settings className="w-5 h-5" />, status: 'active' }
      ]
    },
    {
      id: 'security-compliance',
      label: 'Security & Compliance',
      icon: <Shield className="w-4 h-4" />,
      color: 'red',
      count: 5,
      items: [
        { name: 'Security Framework', desc: 'E2E Encryption', icon: <Shield className="w-5 h-5" />, status: 'active' },
        { name: 'POPIA Protection', desc: 'Data Privacy', icon: <Lock className="w-5 h-5" />, status: 'active' },
        { name: 'Threat Detection', desc: 'AI Security', icon: <AlertTriangle className="w-5 h-5" />, status: 'active' },
        { name: 'Audit & Compliance', desc: 'Regulatory Reports', icon: <FileText className="w-5 h-5" />, status: 'active' },
        { name: 'RICA Automation', desc: 'Auto Compliance', icon: <FileCheck className="w-5 h-5" />, status: 'active' }
      ]
    },
    {
      id: 'operations',
      label: 'Operations',
      icon: <Activity className="w-4 h-4" />,
      color: 'orange',
      count: 5,
      items: [
        { name: 'Service Quality', desc: 'SLA Management', icon: <Gauge className="w-5 h-5" />, status: 'active' },
        { name: 'Incident Management', desc: 'Auto Resolution', icon: <AlertTriangle className="w-5 h-5" />, status: 'active' },
        { name: 'Change Management', desc: 'Version Control', icon: <Cog className="w-5 h-5" />, status: 'active' },
        { name: 'Performance Optimization', desc: 'AI Enhancement', icon: <TrendingUp className="w-5 h-5" />, status: 'active' },
        { name: 'Automated Operations', desc: 'Zero-Touch', icon: <Zap className="w-5 h-5" />, status: 'active' }
      ]
    },
    {
      id: 'smart-deals',
      label: 'Smart Deals',
      icon: <Target className="w-4 h-4" />,
      color: 'yellow',
      count: 3,
      items: [
        { name: 'Airtime & Data', desc: 'Live Deals', icon: <Phone className="w-5 h-5" />, status: 'active' },
        { name: 'Deals Hub', desc: 'Marketplace', icon: <Target className="w-5 h-5" />, status: 'active' },
        { name: 'WhatsApp Business', desc: 'Chat Commerce', icon: <MessageSquare className="w-5 h-5" />, status: 'active' }
      ]
    },
    {
      id: 'support-systems',
      label: 'Support Systems',
      icon: <HelpCircle className="w-4 h-4" />,
      color: 'slate',
      count: 4,
      items: [
        { name: 'DM Payroll System', desc: 'HR Management', icon: <Briefcase className="w-5 h-5" />, status: 'active' },
        { name: 'AI Document Scanner', desc: 'OCR Intelligence', icon: <ScanLine className="w-5 h-5" />, status: 'active' },
        { name: 'Master Dashboard', desc: 'System Overview', icon: <BarChart4 className="w-5 h-5" />, status: 'active' },
        { name: 'Admin Portal', desc: 'User Management', icon: <UserCog className="w-5 h-5" />, status: 'active' }
      ]
    }
  ];

  const getTabColor = (color: string) => {
    const colors = {
      blue: 'data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white bg-blue-50 border-blue-200 hover:bg-blue-100',
      green: 'data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white bg-green-50 border-green-200 hover:bg-green-100',
      purple: 'data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white bg-purple-50 border-purple-200 hover:bg-purple-100',
      indigo: 'data-[state=active]:bg-gradient-to-br data-[state=active]:from-indigo-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white bg-indigo-50 border-indigo-200 hover:bg-indigo-100',
      red: 'data-[state=active]:bg-gradient-to-br data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white bg-red-50 border-red-200 hover:bg-red-100',
      orange: 'data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white bg-orange-50 border-orange-200 hover:bg-orange-100',
      yellow: 'data-[state=active]:bg-gradient-to-br data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-600 data-[state=active]:text-white bg-yellow-50 border-yellow-200 hover:bg-yellow-100',
      slate: 'data-[state=active]:bg-gradient-to-br data-[state=active]:from-slate-500 data-[state=active]:to-slate-600 data-[state=active]:text-white bg-slate-50 border-slate-200 hover:bg-slate-100'
    };
    return colors[color] || colors.blue;
  };

  const ServiceCard = ({ item, color }) => (
    <Card className={`hover:shadow-lg transition-all duration-300 border-l-4 border-l-${color}-500 hover:scale-105 cursor-pointer group`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg bg-${color}-100 group-hover:bg-${color}-200 transition-colors`}>
            {item.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-gray-900 mb-1 truncate">{item.name}</h3>
            <p className="text-xs text-gray-600 mb-2">{item.desc}</p>
            <div className="flex items-center justify-between">
              <Badge variant={item.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                {item.status === 'active' ? '🟢 Active' : '🟡 Pending'}
              </Badge>
              <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                Configure
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Crown className="w-8 h-8 text-yellow-300" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">The Nerve Center</h1>
              <p className="text-blue-100">MVNE powered Platform by Addex-Hub</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <div className="text-2xl font-bold text-green-300">99.9%</div>
              <div className="text-xs text-gray-300">System Uptime</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <div className="text-2xl font-bold text-cyan-300">36</div>
              <div className="text-xs text-gray-300">Active Services</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <div className="text-2xl font-bold text-yellow-300">AI</div>
              <div className="text-xs text-gray-300">Powered</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <div className="text-2xl font-bold text-purple-300">MVNE</div>
              <div className="text-xs text-gray-300">Platform</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Mobile-Optimized Tab Navigation */}
        <div className="w-full mb-6">
          <TabsList className="w-full max-w-full bg-gradient-to-r from-gray-50 to-gray-100 p-1">
            {/* Mobile: 2x4 Grid */}
            <div className="grid grid-cols-2 gap-1 w-full sm:hidden">
              {tabCategories.map((tab) => (
                <TabsTrigger 
                  key={tab.id}
                  value={tab.id} 
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-300 min-h-[60px] border text-xs ${getTabColor(tab.color)}`}
                >
                  {tab.icon}
                  <div className="text-center">
                    <div className="font-semibold leading-tight text-xs">{tab.label}</div>
                    <Badge variant="outline" className="text-xs mt-1">({tab.count})</Badge>
                  </div>
                </TabsTrigger>
              ))}
            </div>

            {/* Tablet: 2x4 Grid */}
            <div className="hidden sm:grid lg:hidden grid-cols-4 gap-2 w-full">
              {tabCategories.map((tab) => (
                <TabsTrigger 
                  key={tab.id}
                  value={tab.id} 
                  className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-300 min-h-[70px] border text-xs ${getTabColor(tab.color)}`}
                >
                  {tab.icon}
                  <div className="text-center">
                    <div className="font-semibold text-xs">{tab.label}</div>
                    <Badge variant="outline" className="text-xs mt-1">({tab.count})</Badge>
                  </div>
                </TabsTrigger>
              ))}
            </div>

            {/* Desktop: Single Row */}
            <div className="hidden lg:grid grid-cols-8 gap-2 w-full">
              {tabCategories.map((tab) => (
                <TabsTrigger 
                  key={tab.id}
                  value={tab.id} 
                  className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-300 min-h-[80px] border text-xs ${getTabColor(tab.color)}`}
                >
                  {tab.icon}
                  <div className="text-center">
                    <div className="font-semibold text-sm">{tab.label}</div>
                    <Badge variant="outline" className="text-xs mt-1">({tab.count})</Badge>
                  </div>
                </TabsTrigger>
              ))}
            </div>
          </TabsList>
        </div>

        {/* Tab Content */}
        {tabCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-xl bg-${category.color}-100`}>
                  {category.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{category.label}</h2>
                  <p className="text-gray-600 text-sm">{category.count} active services</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {category.items.map((item, index) => (
                  <ServiceCard key={index} item={item} color={category.color} />
                ))}
              </div>

              {/* Category-specific actions */}
              <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure All
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
                <Button variant="outline" size="sm">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Documentation
                </Button>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default NerveCenterDashboard;
