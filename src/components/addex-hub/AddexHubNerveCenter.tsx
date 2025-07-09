import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  Brain, 
  Users, 
  Activity, 
  BarChart3, 
  Settings, 
  Search,
  Bell,
  Zap,
  Database,
  Network,
  CreditCard,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  Cpu,
  MessageSquare,
  Workflow,
  Eye,
  Target,
  Sparkles
} from 'lucide-react';
import { IntelligentCustomerManagement } from './IntelligentCustomerManagement';
import { AgenticWorkflowPanel } from './AgenticWorkflowPanel';
import { BulkOperationsHub } from './BulkOperationsHub';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { RealTimeMonitoring } from './RealTimeMonitoring';

interface AddexHubNerveCenterProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AddexHubNerveCenter: React.FC<AddexHubNerveCenterProps> = ({
  activeTab,
  setActiveTab
}) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [systemHealth, setSystemHealth] = useState({
    status: 'optimal',
    uptime: '99.9%',
    activeUsers: 2847,
    transactions: 15642,
    alerts: 2,
    agentic_tasks: 156
  });

  const [aiInsights, setAiInsights] = useState([
    {
      type: 'recommendation',
      title: 'Plan Upgrade Opportunity',
      description: '847 customers eligible for premium plans based on usage patterns',
      confidence: 92,
      action: 'Review & Execute'
    },
    {
      type: 'alert',
      title: 'Potential Churn Risk',
      description: '23 customers showing decreased engagement patterns',
      confidence: 87,
      action: 'Initiate Retention'
    },
    {
      type: 'optimization',
      title: 'Network Efficiency',
      description: 'Resource reallocation could improve performance by 15%',
      confidence: 94,
      action: 'Optimize Now'
    }
  ]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement intelligent search with fuzzy logic
    toast({
      title: "Intelligent Search Active",
      description: `Searching with AI-powered context: "${query}"`,
    });
  };

  const handleAgenticAction = (action: string) => {
    toast({
      title: "Agentic Workflow Triggered",
      description: `AI agent executing: ${action}`,
    });
  };

  const nerveCenterSections = [
    {
      id: 'overview',
      label: 'Overview',
      icon: Activity,
      title: 'System Overview',
      description: 'Real-time system status and KPIs'
    },
    {
      id: 'customers',
      label: 'Customer Intelligence',
      icon: Users,
      title: 'Intelligent Customer Management',
      description: 'AI-powered customer insights and management'
    },
    {
      id: 'workflows',
      label: 'Agentic Workflows',
      icon: Workflow,
      title: 'Autonomous Workflow Center',
      description: 'Self-managing business processes'
    },
    {
      id: 'bulk',
      label: 'Bulk Operations',
      icon: Database,
      title: 'Intelligent Bulk Operations',
      description: 'Smart batch processing and automation'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      title: 'Predictive Analytics',
      description: 'AI-driven insights and forecasting'
    },
    {
      id: 'monitoring',
      label: 'Live Monitoring',
      icon: Eye,
      title: 'Real-Time Operations',
      description: 'Live system and network monitoring'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      {/* Header with ADDEX-HUB Branding */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ADDEX-HUB Nerve Center
              </h1>
              <p className="text-gray-600 text-lg">Intelligent MVNO Management Platform</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <CheckCircle className="w-4 h-4 mr-2" />
              System Optimal
            </Badge>
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              {systemHealth.alerts} Alerts
            </Button>
          </div>
        </div>

        {/* Intelligent Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Ask anything... (Natural language queries supported)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
            className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-all duration-300"
          />
          <Button 
            size="sm" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={() => handleSearch(searchQuery)}
          >
            <Sparkles className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* AI Insights Panel */}
      <div className="mb-8">
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-blue-600" />
              AI-Powered Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiInsights.map((insight, index) => (
                <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                    <Badge variant="secondary">{insight.confidence}% Confidence</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleAgenticAction(insight.action)}
                  >
                    {insight.action}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-6 w-full h-auto p-2 bg-white rounded-xl shadow-lg">
          {nerveCenterSections.map((section) => (
            <TabsTrigger
              key={section.id}
              value={section.id}
              className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              <section.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{section.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab Content */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* System Health Cards */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <Badge className="bg-green-500">Live</Badge>
                </div>
                <h3 className="text-2xl font-bold text-green-700 mb-2">{systemHealth.uptime}</h3>
                <p className="text-green-600">System Uptime</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <Badge className="bg-blue-500">Active</Badge>
                </div>
                <h3 className="text-2xl font-bold text-blue-700 mb-2">{systemHealth.activeUsers.toLocaleString()}</h3>
                <p className="text-blue-600">Active Users</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                  <Badge className="bg-purple-500">Processing</Badge>
                </div>
                <h3 className="text-2xl font-bold text-purple-700 mb-2">{systemHealth.transactions.toLocaleString()}</h3>
                <p className="text-purple-600">Transactions Today</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Zap className="w-8 h-8 text-orange-600" />
                  </div>
                  <Badge className="bg-orange-500">Autonomous</Badge>
                </div>
                <h3 className="text-2xl font-bold text-orange-700 mb-2">{systemHealth.agentic_tasks}</h3>
                <p className="text-orange-600">AI Tasks Running</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nerveCenterSections.slice(1).map((section) => (
              <Card 
                key={section.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-l-4 border-l-blue-500 bg-gradient-to-br from-white to-blue-50"
                onClick={() => setActiveTab(section.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-blue-100 group-hover:scale-110 transition-transform duration-300">
                      <section.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <Badge variant="default" className="bg-blue-500 animate-pulse">
                      ACTIVE
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{section.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{section.description}</p>
                  <Button className="w-full group-hover:scale-105 transition-transform duration-200 bg-blue-600 hover:bg-blue-700">
                    Access Module
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="customers">
          <IntelligentCustomerManagement />
        </TabsContent>

        <TabsContent value="workflows">
          <AgenticWorkflowPanel />
        </TabsContent>

        <TabsContent value="bulk">
          <BulkOperationsHub />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="monitoring">
          <RealTimeMonitoring />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AddexHubNerveCenter;