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
  Sparkles,
  MapPin
} from 'lucide-react';
import { IntelligentCustomerManagement } from './IntelligentCustomerManagement';
import { AgenticWorkflowPanel } from './AgenticWorkflowPanel';
import { BulkOperationsHub } from './BulkOperationsHub';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { RealTimeMonitoring } from './RealTimeMonitoring';
import { SubscriberDetailsTabs } from './mvne/SubscriberDetailsTabs';
import { BulkServicesInterface } from './mvne/BulkServicesInterface';
import { FinancialManagementHub } from './mvne/FinancialManagementHub';
import { AddressManagementSystem } from './mvne/AddressManagementSystem';

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
      id: 'subscriber',
      label: 'Subscriber Management',
      icon: Users,
      title: 'Comprehensive Subscriber Management',
      description: 'Complete subscriber lifecycle and details management'
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
      id: 'bulkservices',
      label: 'Bulk Services',
      icon: FileText,
      title: 'Bulk Service Operations',
      description: 'Mass service provisioning and management'
    },
    {
      id: 'financial',
      label: 'Financial Hub',
      icon: CreditCard,
      title: 'Financial Management Center',
      description: 'Billing, credits, and financial controls'
    },
    {
      id: 'address',
      label: 'Address Management',
      icon: MapPin,
      title: 'Address & Contact System',
      description: 'Physical and postal address management'
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
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-3 sm:p-6">
      {/* Header with ADDEX-HUB Branding */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2.5 sm:p-3 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg shrink-0">
              <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
                ADDEX-HUB Nerve Center
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                Intelligent MVNO Management Platform
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 px-2 py-1">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
              <span className="text-xs sm:text-sm font-medium">System Optimal</span>
            </Badge>
            <Button variant="outline" size="sm" className="px-2 sm:px-3">
              <Bell className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">{systemHealth.alerts}</span>
            </Button>
          </div>
        </div>

        {/* Enhanced Intelligent Search Bar */}
        <div className="relative max-w-3xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              placeholder="Ask anything... (Natural language queries supported)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
              className="pl-10 sm:pl-12 pr-12 sm:pr-16 py-3 sm:py-4 text-base sm:text-lg border-2 border-border/50 rounded-xl focus:border-primary shadow-sm focus:shadow-md transition-all duration-300 bg-background/80 backdrop-blur-sm"
            />
            <Button 
              size="sm" 
              className="absolute right-1.5 sm:right-2 top-1/2 transform -translate-y-1/2 px-2 sm:px-3 py-1.5 sm:py-2"
              onClick={() => handleSearch(searchQuery)}
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced AI Insights Panel */}
      <div className="mb-6 sm:mb-8">
        <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold">
                AI-Powered Insights
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {aiInsights.map((insight, index) => (
                <div key={index} className="p-4 sm:p-5 bg-card rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-foreground text-sm sm:text-base leading-tight">{insight.title}</h4>
                    <Badge variant="secondary" className="text-xs font-medium shrink-0 ml-2">
                      {insight.confidence}%
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">{insight.description}</p>
                  <Button 
                    size="sm" 
                    className="w-full text-xs sm:text-sm py-2 hover:scale-105 transition-transform duration-200"
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

      {/* Enhanced Main Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
        <div className="overflow-x-auto">
          <TabsList className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 min-w-max h-auto p-1.5 sm:p-2 bg-card/80 backdrop-blur-sm rounded-xl shadow-lg border border-border/50">
            {nerveCenterSections.map((section) => (
              <TabsTrigger
                key={section.id}
                value={section.id}
                className="flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-4 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-sm min-w-max transition-all duration-300 hover:scale-105"
              >
                <section.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 shrink-0" />
                <span className="text-xs sm:text-sm font-medium leading-tight text-center">{section.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

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

        <TabsContent value="subscriber">
          <SubscriberDetailsTabs />
        </TabsContent>

        <TabsContent value="workflows">
          <AgenticWorkflowPanel />
        </TabsContent>

        <TabsContent value="bulk">
          <BulkOperationsHub />
        </TabsContent>

        <TabsContent value="bulkservices">
          <BulkServicesInterface />
        </TabsContent>

        <TabsContent value="financial">
          <FinancialManagementHub />
        </TabsContent>

        <TabsContent value="address">
          <AddressManagementSystem />
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