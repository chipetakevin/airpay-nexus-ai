
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, Target, MessageSquare, BarChart, 
  Shield, Clock, TrendingUp, Heart,
  UserCheck, Settings, Eye, Zap
} from 'lucide-react';

const CustomerDataPlatformPanel = () => {
  const customerSegments = [
    {
      name: 'High Value Customers',
      count: '2,456',
      growth: '+12%',
      avgValue: 'R485',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-100'
    },
    {
      name: 'At-Risk Customers',
      count: '892',
      growth: '-8%',
      avgValue: 'R234',
      color: 'from-red-500 to-pink-600',
      bgColor: 'from-red-50 to-pink-100'
    },
    {
      name: 'New Customers',
      count: '1,234',
      growth: '+24%',
      avgValue: 'R156',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-100'
    },
    {
      name: 'Loyal Customers',
      count: '3,789',
      growth: '+6%',
      avgValue: 'R342',
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'from-purple-50 to-indigo-100'
    }
  ];

  const cdpMetrics = [
    { label: 'Unified Profiles', value: '124K', trend: '+8.2%' },
    { label: 'Active Journeys', value: '45', trend: '+12' },
    { label: 'Real-time Events', value: '2.4M/day', trend: '+15%' },
    { label: 'Data Sources', value: '18', trend: '+3' }
  ];

  const customerJourneys = [
    {
      name: 'Onboarding Journey',
      completion_rate: '87%',
      avg_time: '3.2 days',
      touchpoints: 8,
      status: 'optimized'
    },
    {
      name: 'Churn Prevention',
      completion_rate: '94%',
      avg_time: '24 hours',
      touchpoints: 5,
      status: 'active'
    },
    {
      name: 'Upsell Campaign',
      completion_rate: '76%',
      avg_time: '5.1 days',
      touchpoints: 12,
      status: 'testing'
    },
    {
      name: 'Win-back Campaign',
      completion_rate: '68%',
      avg_time: '7.3 days',
      touchpoints: 10,
      status: 'active'
    }
  ];

  const personalizationMetrics = [
    { metric: 'Content Relevance Score', value: '8.7/10', change: '+0.3' },
    { metric: 'Click-through Rate', value: '12.4%', change: '+2.1%' },
    { metric: 'Conversion Rate', value: '4.8%', change: '+0.9%' },
    { metric: 'Customer Satisfaction', value: '4.6/5', change: '+0.2' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimized': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'testing': return 'bg-orange-100 text-orange-800';
      case 'paused': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
          Customer Data Platform (CDP)
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Unified customer profiles with 360-degree view, real-time personalization, and intelligent journey orchestration
        </p>
      </div>

      {/* CDP Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {cdpMetrics.map((metric, index) => (
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

      <Tabs defaultValue="profiles" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profiles">Customer Profiles</TabsTrigger>
          <TabsTrigger value="segmentation">Segmentation</TabsTrigger>
          <TabsTrigger value="journeys">Customer Journeys</TabsTrigger>
          <TabsTrigger value="personalization">Personalization</TabsTrigger>
          <TabsTrigger value="privacy">Privacy & Consent</TabsTrigger>
        </TabsList>

        <TabsContent value="profiles" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardTitle className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-blue-600" />
                  Customer Profile Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <span className="font-medium">Total Profiles</span>
                    <span className="font-bold text-green-700">124,567</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <span className="font-medium">Active Profiles</span>
                    <span className="font-bold text-blue-700">98,234</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                    <span className="font-medium">Profile Completeness</span>
                    <span className="font-bold text-purple-700">87.3%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                    <span className="font-medium">Real-time Updates</span>
                    <span className="font-bold text-orange-700">2.4M/day</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="flex items-center gap-3">
                  <BarChart className="w-6 h-6 text-purple-600" />
                  Data Sources Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <span className="text-sm font-medium">Mobile App</span>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <span className="text-sm font-medium">WhatsApp Business</span>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                    <span className="text-sm font-medium">Billing System</span>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                    <span className="text-sm font-medium">Support Portal</span>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-lg">
                    <span className="text-sm font-medium">Social Media</span>
                    <Badge className="bg-orange-100 text-orange-800">Partial</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="segmentation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {customerSegments.map((segment, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${segment.bgColor}`}>
                        <Target className="w-5 h-5 text-gray-700" />
                      </div>
                      <CardTitle className="text-lg">{segment.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">{segment.count}</div>
                      <div className="text-xs text-gray-600">Customers</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                      <div className="text-lg font-bold text-blue-700">{segment.growth}</div>
                      <div className="text-xs text-blue-600">Growth</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                      <div className="text-lg font-bold text-green-700">{segment.avgValue}</div>
                      <div className="text-xs text-green-600">Avg Value</div>
                    </div>
                  </div>
                  <button className={`w-full px-4 py-2 bg-gradient-to-r ${segment.color} text-white rounded-lg hover:opacity-90 transition-all duration-300`}>
                    View Segment Details
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="journeys" className="space-y-6">
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardTitle className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
                Customer Journey Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {customerJourneys.map((journey, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{journey.name}</div>
                        <div className="text-sm text-gray-600">{journey.touchpoints} touchpoints</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-sm font-bold text-green-700">{journey.completion_rate}</div>
                        <div className="text-xs text-gray-600">Completion</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-blue-700">{journey.avg_time}</div>
                        <div className="text-xs text-gray-600">Avg Time</div>
                      </div>
                      <Badge className={getStatusColor(journey.status)}>
                        {journey.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="personalization" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-pink-50 to-red-50">
                <CardTitle className="flex items-center gap-3">
                  <Heart className="w-6 h-6 text-pink-600" />
                  Personalization Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {personalizationMetrics.map((metric, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                      <span className="font-medium text-gray-800">{metric.metric}</span>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{metric.value}</div>
                        <div className="text-xs text-green-600">{metric.change}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50">
                <CardTitle className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-yellow-600" />
                  Real-time Personalization
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <span className="font-medium">Active Campaigns</span>
                    <span className="font-bold text-blue-700">24</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <span className="font-medium">Recommendations/day</span>
                    <span className="font-bold text-green-700">47K</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                    <span className="font-medium">Response Time</span>
                    <span className="font-bold text-purple-700">12ms</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                    <span className="font-medium">Success Rate</span>
                    <span className="font-bold text-orange-700">94.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-green-600" />
                  Privacy Compliance
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <span className="font-medium">POPIA Compliance</span>
                    <Badge className="bg-green-100 text-green-800">100%</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <span className="font-medium">Consent Rate</span>
                    <span className="font-bold text-blue-700">87.3%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                    <span className="font-medium">Data Requests</span>
                    <span className="font-bold text-purple-700">23</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                    <span className="font-medium">Auto-deletions</span>
                    <span className="font-bold text-orange-700">456</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardTitle className="flex items-center gap-3">
                  <UserCheck className="w-6 h-6 text-blue-600" />
                  Consent Management
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <span className="font-medium">Marketing Consent</span>
                    <span className="font-bold text-green-700">78%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <span className="font-medium">Analytics Consent</span>
                    <span className="font-bold text-blue-700">92%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                    <span className="font-medium">Data Sharing</span>
                    <span className="font-bold text-purple-700">65%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                    <span className="font-medium">Profile Tracking</span>
                    <span className="font-bold text-orange-700">89%</span>
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

export default CustomerDataPlatformPanel;
