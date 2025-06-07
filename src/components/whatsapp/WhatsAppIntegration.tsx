
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageCircle, Smartphone, TrendingUp, Users,
  Settings, Activity, Shield, Zap,
  BarChart, Globe, CheckCircle, Clock
} from 'lucide-react';
import WhatsAppAssistant from './WhatsAppAssistant';

const WhatsAppIntegration = () => {
  const [activeTab, setActiveTab] = useState('assistant');

  const integrationMetrics = [
    {
      label: 'Active Conversations',
      value: '2,847',
      change: '+12%',
      icon: <MessageCircle className="w-4 h-4" />
    },
    {
      label: 'Transactions Today',
      value: '1,456',
      change: '+18%',
      icon: <Activity className="w-4 h-4" />
    },
    {
      label: 'Success Rate',
      value: '99.2%',
      change: '+0.3%',
      icon: <CheckCircle className="w-4 h-4" />
    },
    {
      label: 'Avg Response Time',
      value: '1.2s',
      change: '-0.5s',
      icon: <Clock className="w-4 h-4" />
    }
  ];

  const whatsAppFeatures = [
    {
      title: 'AI-Powered Conversations',
      description: 'Natural language processing for seamless customer interactions',
      icon: <Zap className="w-5 h-5" />,
      status: 'Active'
    },
    {
      title: 'Secure Payment Processing',
      description: 'Bank-grade encryption for all WhatsApp transactions',
      icon: <Shield className="w-5 h-5" />,
      status: 'Active'
    },
    {
      title: 'Real-time Transaction Updates',
      description: 'Instant confirmation and status updates via WhatsApp',
      icon: <Activity className="w-5 h-5" />,
      status: 'Active'
    },
    {
      title: 'Multi-language Support',
      description: 'Support for English, Afrikaans, and local languages',
      icon: <Globe className="w-5 h-5" />,
      status: 'Coming Soon'
    }
  ];

  const recentConversations = [
    {
      id: 'WA001',
      customer: '+27821234567',
      service: 'Data Bundle Purchase',
      amount: 'R49',
      status: 'completed',
      timestamp: '2 mins ago'
    },
    {
      id: 'WA002',
      customer: '+27827654321',
      service: 'Airtime Top-up',
      amount: 'R100',
      status: 'processing',
      timestamp: '5 mins ago'
    },
    {
      id: 'WA003',
      customer: '+27834567890',
      service: 'Balance Inquiry',
      amount: 'Free',
      status: 'completed',
      timestamp: '8 mins ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Coming Soon': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Devine Mobile WhatsApp Assistant
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          AI-powered WhatsApp integration for seamless airtime and data purchases
        </p>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {integrationMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-green-50 rounded-lg text-green-600">
                    {metric.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">{metric.label}</p>
                    <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  metric.change.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {metric.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="assistant">WhatsApp Chat</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="assistant" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* WhatsApp Assistant Interface */}
            <div className="lg:col-span-2">
              <Card className="h-[600px]">
                <CardContent className="p-0 h-full">
                  <WhatsAppAssistant />
                </CardContent>
              </Card>
            </div>

            {/* Recent Conversations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Recent Conversations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentConversations.map((conversation) => (
                    <div key={conversation.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{conversation.customer}</span>
                        <Badge className={getStatusColor(conversation.status)}>
                          {conversation.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>{conversation.service}</span>
                        <span className="font-medium">{conversation.amount}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{conversation.timestamp}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="w-5 h-5" />
                  Conversation Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Conversations</span>
                    <span className="font-bold">8,432</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Successful Transactions</span>
                    <span className="font-bold text-green-600">7,892</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Customer Satisfaction</span>
                    <span className="font-bold text-blue-600">4.8/5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Avg Session Duration</span>
                    <span className="font-bold">3m 24s</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Revenue Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Today's Revenue</span>
                    <span className="font-bold">R 124,567</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Weekly Revenue</span>
                    <span className="font-bold text-green-600">R 892,340</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Monthly Revenue</span>
                    <span className="font-bold text-blue-600">R 3.2M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Growth Rate</span>
                    <span className="font-bold text-purple-600">+18.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whatsAppFeatures.map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-50 rounded-lg text-green-600">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{feature.title}</h3>
                        <Badge className={getStatusColor(feature.status)}>
                          {feature.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                WhatsApp Integration Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Business Account Settings</h4>
                <div className="p-3 bg-gray-50 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Business Number:</span>
                    <span className="text-sm font-medium">+27 11 123 4567</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Verification Status:</span>
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">API Status:</span>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Automation Settings</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Auto-reply: Enabled
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="w-4 h-4 mr-2" />
                    Transaction Confirmations: Enabled
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Fraud Alerts: Enabled
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WhatsAppIntegration;
