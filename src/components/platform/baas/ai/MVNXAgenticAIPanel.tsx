
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, Bot, Network, Zap, Activity, 
  MessageSquare, Target, TrendingUp, Shield,
  Cpu, CloudCog, Layers, Settings
} from 'lucide-react';

const MVNXAgenticAIPanel = () => {
  const [activeAgent, setActiveAgent] = useState('churn-prediction');

  const aiAgents = [
    {
      id: 'churn-prediction',
      name: 'Churn Prediction Agent',
      status: 'active',
      accuracy: '94.2%',
      predictions: '1,247',
      icon: <Target className="w-5 h-5" />,
      color: 'text-red-600',
      description: 'Predicts customer churn and triggers retention campaigns'
    },
    {
      id: 'pricing-optimization',
      name: 'Dynamic Pricing Agent',
      status: 'active',
      accuracy: '91.8%',
      predictions: '852',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-green-600',
      description: 'Optimizes pricing based on market conditions and demand'
    },
    {
      id: 'fraud-detection',
      name: 'Fraud Detection Agent',
      status: 'active',
      accuracy: '98.5%',
      predictions: '43',
      icon: <Shield className="w-5 h-5" />,
      color: 'text-orange-600',
      description: 'Real-time fraud detection and prevention'
    },
    {
      id: 'network-optimization',
      name: 'Network Optimization Agent',
      status: 'active',
      accuracy: '89.3%',
      predictions: '324',
      icon: <Network className="w-5 h-5" />,
      color: 'text-blue-600',
      description: 'Optimizes network performance and capacity'
    },
    {
      id: 'customer-service',
      name: 'Customer Service Agent',
      status: 'active',
      accuracy: '87.9%',
      predictions: '2,156',
      icon: <MessageSquare className="w-5 h-5" />,
      color: 'text-purple-600',
      description: 'Automated customer support with intelligent routing'
    },
    {
      id: 'demand-forecasting',
      name: 'Demand Forecasting Agent',
      status: 'active',
      accuracy: '92.4%',
      predictions: '678',
      icon: <Activity className="w-5 h-5" />,
      color: 'text-cyan-600',
      description: 'Predicts demand patterns for capacity planning'
    }
  ];

  const mlOpsMetrics = [
    { label: 'Active Models', value: '24', trend: '+3' },
    { label: 'Training Jobs', value: '12', trend: '+2' },
    { label: 'Avg Accuracy', value: '92.1%', trend: '+1.2%' },
    { label: 'Data Points', value: '2.4M', trend: '+15%' }
  ];

  const automationWorkflows = [
    {
      name: 'Churn Prevention Pipeline',
      status: 'running',
      triggered: '156 times today',
      success_rate: '94%'
    },
    {
      name: 'Fraud Alert System',
      status: 'running',
      triggered: '12 times today',
      success_rate: '98%'
    },
    {
      name: 'Pricing Adjustment',
      status: 'running',
      triggered: '87 times today',
      success_rate: '91%'
    },
    {
      name: 'Network Load Balancing',
      status: 'running',
      triggered: '234 times today',
      success_rate: '96%'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          MVNX Agentic AI Platform
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Intelligent AI agents powering autonomous operations, predictive analytics, and real-time decision making for MVNO platforms
        </p>
      </div>

      {/* MLOps Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {mlOpsMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</div>
              <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
              <div className="text-xs text-green-600 font-medium">
                {metric.trend}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="agents" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="agents">AI Agents</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="mlops">MLOps</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {aiAgents.map((agent) => (
              <Card key={agent.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 ${agent.color}`}>
                        {agent.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{agent.name}</CardTitle>
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                          {agent.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{agent.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                      <div className="text-lg font-bold text-blue-700">{agent.accuracy}</div>
                      <div className="text-xs text-blue-600">Accuracy</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                      <div className="text-lg font-bold text-purple-700">{agent.predictions}</div>
                      <div className="text-xs text-purple-600">Today</div>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                    View Details
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center gap-3">
                <Bot className="w-6 h-6 text-purple-600" />
                Automated Workflows
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {automationWorkflows.map((workflow, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div>
                        <div className="font-semibold text-gray-800">{workflow.name}</div>
                        <div className="text-sm text-gray-600">{workflow.triggered}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-800">
                        {workflow.success_rate} success
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mlops" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardTitle className="flex items-center gap-3">
                  <Cpu className="w-6 h-6 text-blue-600" />
                  Model Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <span className="font-medium">Training Accuracy</span>
                    <span className="font-bold text-green-700">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <span className="font-medium">Validation Score</span>
                    <span className="font-bold text-blue-700">91.8%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                    <span className="font-medium">Model Drift</span>
                    <span className="font-bold text-purple-700">0.02%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                <CardTitle className="flex items-center gap-3">
                  <CloudCog className="w-6 h-6 text-orange-600" />
                  Infrastructure
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <span className="font-medium">GPU Utilization</span>
                    <span className="font-bold text-green-700">78%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <span className="font-medium">Memory Usage</span>
                    <span className="font-bold text-blue-700">64GB</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                    <span className="font-medium">Active Nodes</span>
                    <span className="font-bold text-purple-700">12</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardTitle className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-indigo-600" />
                AI-Generated Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-l-4 border-yellow-400">
                  <div className="font-semibold text-orange-800 mb-2">Revenue Optimization Opportunity</div>
                  <p className="text-sm text-orange-700">AI detected 15% increase in demand for data bundles during evening hours. Consider dynamic pricing strategy.</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border-l-4 border-red-400">
                  <div className="font-semibold text-red-800 mb-2">Churn Risk Alert</div>
                  <p className="text-sm text-red-700">247 customers identified as high churn risk. Automated retention campaigns initiated.</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-l-4 border-green-400">
                  <div className="font-semibold text-green-800 mb-2">Network Performance</div>
                  <p className="text-sm text-green-700">AI optimization reduced network latency by 23% in high-traffic areas.</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-l-4 border-blue-400">
                  <div className="font-semibold text-blue-800 mb-2">Customer Satisfaction</div>
                  <p className="text-sm text-blue-700">Sentiment analysis shows 12% improvement in customer satisfaction after AI-powered support implementation.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MVNXAgenticAIPanel;
