import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, Bot, Network, Zap, Activity, 
  MessageSquare, Target, TrendingUp, Shield,
  Cpu, CloudCog, Layers, Settings, BarChart3,
  PieChart, LineChart, Activity as ActivityIcon,
  Smartphone, Globe, Database, Users
} from 'lucide-react';
import { PieChart as RechartsPieChart, ResponsiveContainer, Cell, LineChart as RechartsLineChart, Line, XAxis, YAxis, AreaChart, Area, BarChart, Bar, Pie } from 'recharts';

const AgenticBaaSAIPanel = () => {
  const [activeAgent, setActiveAgent] = useState('churn-prediction');

  // Enhanced AI agents for Agentic BaaS Platform
  const aiAgents = [
    {
      id: 'churn-prediction',
      name: 'Customer Experience Agent',
      status: 'active',
      accuracy: '96.8%',
      predictions: '2,847',
      icon: <Target className="w-5 h-5" />,
      color: 'text-red-600',
      description: 'Autonomous customer journey optimization and churn prevention',
      autonomy: 'Full Autonomous',
      interventions: 156
    },
    {
      id: 'pricing-optimization',
      name: 'Revenue Optimization Agent',
      status: 'active',
      accuracy: '94.2%',
      predictions: '1,452',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-green-600',
      description: 'Dynamic pricing and revenue optimization with ML algorithms',
      autonomy: 'Semi-Autonomous',
      interventions: 87
    },
    {
      id: 'fraud-detection',
      name: 'Security Intelligence Agent',
      status: 'active',
      accuracy: '99.2%',
      predictions: '143',
      icon: <Shield className="w-5 h-5" />,
      color: 'text-orange-600',
      description: 'Real-time threat detection and automated security responses',
      autonomy: 'Full Autonomous',
      interventions: 12
    },
    {
      id: 'network-optimization',
      name: 'Network Operations Agent',
      status: 'active',
      accuracy: '92.7%',
      predictions: '624',
      icon: <Network className="w-5 h-5" />,
      color: 'text-blue-600',
      description: 'Predictive network management and capacity planning',
      autonomy: 'Full Autonomous',
      interventions: 34
    },
    {
      id: 'customer-service',
      name: 'Conversational AI Agent',
      status: 'active',
      accuracy: '91.4%',
      predictions: '5,216',
      icon: <MessageSquare className="w-5 h-5" />,
      color: 'text-purple-600',
      description: 'Multi-language customer support with WhatsApp Business integration',
      autonomy: 'Semi-Autonomous',
      interventions: 432
    },
    {
      id: 'data-intelligence',
      name: 'Data Intelligence Agent',
      status: 'active',
      accuracy: '95.1%',
      predictions: '1,178',
      icon: <Database className="w-5 h-5" />,
      color: 'text-cyan-600',
      description: 'Predictive analytics and automated insight generation',
      autonomy: 'Full Autonomous',
      interventions: 67
    }
  ];

  // Enhanced metrics for mobile-first experience
  const platformMetrics = [
    { label: 'Active AI Agents', value: '18', trend: '+6', icon: Bot, color: 'text-purple-600' },
    { label: 'Autonomous Decisions', value: '47.2K', trend: '+23%', icon: Brain, color: 'text-blue-600' },
    { label: 'ML Model Accuracy', value: '94.7%', trend: '+2.3%', icon: Target, color: 'text-green-600' },
    { label: 'Real-time Processes', value: '156K', trend: '+18%', icon: Zap, color: 'text-orange-600' }
  ];

  // Mobile-optimized automation workflows
  const automationWorkflows = [
    {
      name: 'Customer Journey Optimization',
      status: 'running',
      triggered: '2,847 decisions today',
      success_rate: '96%',
      autonomy: 'Full',
      savings: 'R2.4M monthly'
    },
    {
      name: 'Dynamic Pricing Engine',
      status: 'running',
      triggered: '1,452 adjustments today',
      success_rate: '94%',
      autonomy: 'Semi',
      savings: 'R1.8M monthly'
    },
    {
      name: 'Threat Response System',
      status: 'running',
      triggered: '143 responses today',
      success_rate: '99%',
      autonomy: 'Full',
      savings: 'R890K monthly'
    },
    {
      name: 'Network Optimization',
      status: 'running',
      triggered: '624 optimizations today',
      success_rate: '93%',
      autonomy: 'Full',
      savings: 'R1.2M monthly'
    }
  ];

  // Enhanced performance data for charts
  const performanceData = [
    { time: '00:00', accuracy: 94, decisions: 1200, efficiency: 89 },
    { time: '04:00', accuracy: 95, decisions: 800, efficiency: 92 },
    { time: '08:00', accuracy: 97, decisions: 2400, efficiency: 95 },
    { time: '12:00', accuracy: 96, decisions: 3200, efficiency: 94 },
    { time: '16:00', accuracy: 98, decisions: 2800, efficiency: 97 },
    { time: '20:00', accuracy: 95, decisions: 1600, efficiency: 91 }
  ];

  const agentDistribution = [
    { name: 'Customer Experience', value: 35, color: '#EF4444' },
    { name: 'Revenue Optimization', value: 25, color: '#10B981' },
    { name: 'Security Intelligence', value: 20, color: '#F97316' },
    { name: 'Network Operations', value: 20, color: '#3B82F6' }
  ];

  return (
    <div className="space-y-4 md:space-y-6 p-2 md:p-4">
      {/* Mobile-First Header */}
      <div className="text-center space-y-3 md:space-y-4">
        <div className="flex justify-center mb-3 md:mb-4">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-3 md:p-4 rounded-2xl">
            <Brain className="w-8 h-8 md:w-12 md:h-12 text-purple-600 animate-pulse" />
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Divinely Mobile Agentic BaaS AI Platform
        </h2>
        <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto px-4">
          Revolutionary autonomous AI agents powering intelligent operations, predictive analytics, and real-time decision making for telecommunications platforms
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <Badge className="bg-purple-100 text-purple-800 border-purple-300">18 Active Agents</Badge>
          <Badge className="bg-blue-100 text-blue-800 border-blue-300">94.7% Accuracy</Badge>
          <Badge className="bg-green-100 text-green-800 border-green-300">47.2K Decisions/Day</Badge>
        </div>
      </div>

      {/* Enhanced Mobile Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {platformMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg group">
            <CardContent className="p-3 md:p-6 text-center">
              <div className="flex flex-col items-center space-y-2 md:space-y-3">
                <div className={`p-2 md:p-3 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 ${metric.color} group-hover:scale-110 transition-transform duration-300`}>
                  <metric.icon className="w-4 h-4 md:w-6 md:h-6" />
                </div>
                <div className="space-y-1">
                  <div className="text-lg md:text-2xl font-bold text-gray-900">{metric.value}</div>
                  <div className="text-xs md:text-sm text-gray-600 font-medium">{metric.label}</div>
                  <div className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                    {metric.trend}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="agents" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-white shadow-sm mb-4 md:mb-6">
          <TabsTrigger value="agents" className="text-xs md:text-sm">AI Agents</TabsTrigger>
          <TabsTrigger value="automation" className="text-xs md:text-sm">Automation</TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs md:text-sm">Analytics</TabsTrigger>
          <TabsTrigger value="insights" className="text-xs md:text-sm">Intelligence</TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6">
            {aiAgents.map((agent) => (
              <Card key={agent.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg group">
                <CardHeader className="pb-2 md:pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 md:p-3 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 ${agent.color} group-hover:scale-110 transition-transform duration-300`}>
                        {agent.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-sm md:text-lg leading-tight">{agent.name}</CardTitle>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 text-xs">
                            {agent.status}
                          </Badge>
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300 text-xs">
                            {agent.autonomy}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 md:space-y-4 pt-0">
                  <p className="text-xs md:text-sm text-gray-600 leading-tight">{agent.description}</p>
                  <div className="grid grid-cols-3 gap-2 md:gap-4">
                    <div className="text-center p-2 md:p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                      <div className="text-sm md:text-lg font-bold text-blue-700">{agent.accuracy}</div>
                      <div className="text-xs text-blue-600">Accuracy</div>
                    </div>
                    <div className="text-center p-2 md:p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                      <div className="text-sm md:text-lg font-bold text-purple-700">{agent.predictions}</div>
                      <div className="text-xs text-purple-600">Today</div>
                    </div>
                    <div className="text-center p-2 md:p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                      <div className="text-sm md:text-lg font-bold text-green-700">{agent.interventions}</div>
                      <div className="text-xs text-green-600">Saves</div>
                    </div>
                  </div>
                  <button className="w-full px-3 py-2 md:px-4 md:py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                    View Agent Details
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4 md:space-y-6">
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center gap-3 text-lg md:text-xl">
                <Bot className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                Autonomous Workflow Engine
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="space-y-3 md:space-y-4">
                {automationWorkflows.map((workflow, index) => (
                  <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-3 md:p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-3 md:gap-4 mb-2 md:mb-0">
                      <div className={`w-3 h-3 rounded-full animate-pulse ${
                        workflow.autonomy === 'Full' ? 'bg-green-500' : 'bg-blue-500'
                      }`}></div>
                      <div>
                        <div className="font-semibold text-sm md:text-base text-gray-800">{workflow.name}</div>
                        <div className="text-xs md:text-sm text-gray-600">{workflow.triggered}</div>
                        <div className="text-xs text-green-600 font-medium mt-1">💰 {workflow.savings}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={`text-xs ${
                        workflow.autonomy === 'Full' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {workflow.autonomy} Autonomy
                      </Badge>
                      <Badge className="bg-purple-100 text-purple-800 text-xs">
                        {workflow.success_rate} success
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Performance Chart */}
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardTitle className="flex items-center gap-3 text-lg md:text-xl">
                  <LineChart className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                  AI Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Area 
                      type="monotone" 
                      dataKey="accuracy" 
                      stroke="#3B82F6" 
                      fill="url(#accuracyGradient)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Agent Distribution */}
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="flex items-center gap-3 text-lg md:text-xl">
                  <PieChart className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                  Agent Workload Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie 
                      data={agentDistribution} 
                      cx="50%" 
                      cy="50%" 
                      outerRadius={60} 
                      innerRadius={30}
                      dataKey="value"
                    >
                      {agentDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {agentDistribution.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs">
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-gray-600">{item.name}: {item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4 md:space-y-6">
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardTitle className="flex items-center gap-3 text-lg md:text-xl">
                <Brain className="w-5 h-5 md:w-6 md:h-6 text-indigo-600" />
                AI-Generated Business Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="space-y-3 md:space-y-4">
                <div className="p-3 md:p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-l-4 border-yellow-400">
                  <div className="font-semibold text-sm md:text-base text-orange-800 mb-2">🚀 Revenue Optimization Alert</div>
                  <p className="text-xs md:text-sm text-orange-700">AI detected 23% increase in premium service demand. Autonomous pricing agent increased rates by 8%, resulting in R2.4M additional revenue this week.</p>
                </div>
                <div className="p-3 md:p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border-l-4 border-red-400">
                  <div className="font-semibold text-sm md:text-base text-red-800 mb-2">⚠️ Proactive Customer Care</div>
                  <p className="text-xs md:text-sm text-red-700">Customer Experience Agent identified 1,247 at-risk customers. Automated retention campaigns deployed with 94% success rate, preventing R8.7M churn.</p>
                </div>
                <div className="p-3 md:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-l-4 border-green-400">
                  <div className="font-semibold text-sm md:text-base text-green-800 mb-2">🛡️ Security Intelligence</div>
                  <p className="text-xs md:text-sm text-green-700">Security Agent autonomously blocked 143 threat attempts and optimized fraud detection algorithms, reducing false positives by 34%.</p>
                </div>
                <div className="p-3 md:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-l-4 border-blue-400">
                  <div className="font-semibold text-sm md:text-base text-blue-800 mb-2">📊 Predictive Analytics</div>
                  <p className="text-xs md:text-sm text-blue-700">Data Intelligence Agent forecasts 18% subscriber growth next quarter. Network Operations Agent preemptively allocated resources, ensuring 99.99% uptime.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgenticBaaSAIPanel;
