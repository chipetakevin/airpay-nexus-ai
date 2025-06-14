
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, Bot, Users, BarChart, 
  CheckCircle, Clock, TrendingUp, Send,
  MessageCircle, Smartphone, Globe, Zap
} from 'lucide-react';

const WhatsAppBusinessPanel = () => {
  const whatsappMetrics = [
    { label: 'Messages Sent', value: '156K', trend: '+23%' },
    { label: 'Response Rate', value: '94.2%', trend: '+5.1%' },
    { label: 'Active Conversations', value: '2,847', trend: '+18%' },
    { label: 'Automation Rate', value: '78%', trend: '+12%' }
  ];

  const messageTemplates = [
    {
      name: 'Welcome Message',
      category: 'Onboarding',
      status: 'approved',
      usage: '1,234 sent',
      language: 'EN/AF'
    },
    {
      name: 'Payment Reminder',
      category: 'Billing',
      status: 'approved', 
      usage: '892 sent',
      language: 'EN/ZU'
    },
    {
      name: 'Data Bundle Offer',
      category: 'Marketing',
      status: 'pending',
      usage: '0 sent',
      language: 'EN'
    },
    {
      name: 'Support Ticket Created',
      category: 'Support',
      status: 'approved',
      usage: '456 sent',
      language: 'EN/XH'
    },
    {
      name: 'Account Verification',
      category: 'Security',
      status: 'approved',
      usage: '2,134 sent',
      language: 'EN/AF'
    }
  ];

  const conversationFlows = [
    {
      name: 'Airtime Top-up Flow',
      completion_rate: '89%',
      avg_duration: '2.3 min',
      interactions: '1,247',
      status: 'active'
    },
    {
      name: 'Support Request Flow',
      completion_rate: '76%',
      avg_duration: '4.1 min', 
      interactions: '678',
      status: 'active'
    },
    {
      name: 'Plan Upgrade Flow',
      completion_rate: '92%',
      avg_duration: '3.8 min',
      interactions: '423',
      status: 'optimized'
    },
    {
      name: 'RICA Verification Flow',
      completion_rate: '94%',
      avg_duration: '5.2 min',
      interactions: '234',
      status: 'active'
    }
  ];

  const automationRules = [
    {
      name: 'Business Hours Auto-Reply',
      trigger: 'Outside business hours',
      action: 'Send operating hours message',
      status: 'active',
      triggered: '145 times today'
    },
    {
      name: 'High Priority Escalation',
      trigger: 'Keywords: urgent, emergency, problem',
      action: 'Route to human agent',
      status: 'active',
      triggered: '23 times today'
    },
    {
      name: 'Balance Inquiry Response',
      trigger: 'Keywords: balance, credit, data',
      action: 'Send account balance',
      status: 'active',
      triggered: '567 times today'
    },
    {
      name: 'Payment Confirmation',
      trigger: 'Payment received webhook',
      action: 'Send confirmation message',
      status: 'active',
      triggered: '89 times today'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'optimized': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          WhatsApp Business API Platform
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Comprehensive WhatsApp Business integration with automated messaging, intelligent chatbots, and seamless customer engagement
        </p>
      </div>

      {/* WhatsApp Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {whatsappMetrics.map((metric, index) => (
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

      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="templates">Message Templates</TabsTrigger>
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="integration">Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-green-600" />
                Message Templates Management
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {messageTemplates.map((template, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 text-green-700">
                        <Send className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{template.name}</div>
                        <div className="text-sm text-gray-600">{template.category} • {template.language}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-800">{template.usage}</div>
                        <div className="text-xs text-gray-600">Usage</div>
                      </div>
                      <Badge className={getStatusColor(template.status)}>
                        {template.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300">
                  Create New Template
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversations" className="space-y-6">
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardTitle className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-blue-600" />
                Conversation Flows Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {conversationFlows.map((flow, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-700">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{flow.name}</div>
                        <div className="text-sm text-gray-600">{flow.interactions} interactions</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-sm font-bold text-green-700">{flow.completion_rate}</div>
                        <div className="text-xs text-gray-600">Completion</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-blue-700">{flow.avg_duration}</div>
                        <div className="text-xs text-gray-600">Avg Duration</div>
                      </div>
                      <Badge className={getStatusColor(flow.status)}>
                        {flow.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
              <CardTitle className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-purple-600" />
                Automation Rules & Triggers
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {automationRules.map((rule, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <div className="font-semibold text-gray-800">{rule.name}</div>
                      </div>
                      <Badge className={getStatusColor(rule.status)}>
                        {rule.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Trigger:</span> {rule.trigger}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Action:</span> {rule.action}
                    </div>
                    <div className="text-xs text-blue-600 font-medium">
                      {rule.triggered}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                <CardTitle className="flex items-center gap-3">
                  <BarChart className="w-6 h-6 text-orange-600" />
                  Message Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <span className="font-medium">Delivery Rate</span>
                    <span className="font-bold text-green-700">98.7%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <span className="font-medium">Read Rate</span>
                    <span className="font-bold text-blue-700">87.2%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                    <span className="font-medium">Response Rate</span>
                    <span className="font-bold text-purple-700">64.8%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                    <span className="font-medium">Avg Response Time</span>
                    <span className="font-bold text-orange-700">4.2 min</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <CardTitle className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                  Customer Satisfaction
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <span className="font-medium">CSAT Score</span>
                    <span className="font-bold text-green-700">4.6/5</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <span className="font-medium">Resolution Rate</span>
                    <span className="font-bold text-blue-700">91.3%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                    <span className="font-medium">First Contact Resolution</span>
                    <span className="font-bold text-purple-700">78.9%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                    <span className="font-medium">Escalation Rate</span>
                    <span className="font-bold text-orange-700">8.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integration" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50">
                <CardTitle className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-cyan-600" />
                  API Integration Status
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <span className="font-medium">Meta Business API</span>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <span className="font-medium">Webhook Endpoints</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <span className="font-medium">CRM Integration</span>
                    <Badge className="bg-green-100 text-green-800">Synced</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
                    <span className="font-medium">Payment Gateway</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Configuring</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-pink-50 to-red-50">
                <CardTitle className="flex items-center gap-3">
                  <Smartphone className="w-6 h-6 text-pink-600" />
                  Mobile Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <span className="font-medium">WhatsApp Web SDK</span>
                    <span className="font-bold text-blue-700">v2.2.3</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <span className="font-medium">Mobile App Integration</span>
                    <span className="font-bold text-green-700">Active</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                    <span className="font-medium">Deep Link Support</span>
                    <span className="font-bold text-purple-700">Enabled</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                    <span className="font-medium">Push Notifications</span>
                    <span className="font-bold text-orange-700">Configured</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WhatsAppBusinessPanel;
