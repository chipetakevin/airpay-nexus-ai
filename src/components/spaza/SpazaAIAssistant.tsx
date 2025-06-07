
import React, { useState, useEffect } from 'react';
import { MessageSquare, Zap, BarChart3, Users, Settings, TrendingUp, Smartphone, Wifi, Shield, Gamepad2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EnhancedSpazaAIChat from './EnhancedSpazaAIChat';
import SpazaFloatingButton from './SpazaFloatingButton';

const SpazaAIAssistant = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Enhanced platform data simulation
  const [platformData] = useState({
    totalSales: 'R 45,892,347',
    activeAgents: 15247,
    lowStockItems: 3,
    todayTransactions: 89423,
    networkStatus: 'All Systems Operational',
    insurancePolicies: 52847,
    virtualServices: 24392
  });

  const enhancedServiceMetrics = [
    {
      title: 'Prepaid Services',
      value: 'R 28.4M',
      growth: '+15%',
      icon: <Smartphone className="w-8 h-8 text-blue-600" />,
      description: 'Airtime, data, SMS, voice services'
    },
    {
      title: 'Insurance Products',
      value: 'R 12.7M',
      growth: '+23%',
      icon: <Shield className="w-8 h-8 text-green-600" />,
      description: 'Device, life, funeral, credit insurance'
    },
    {
      title: 'Virtual Services',
      value: 'R 4.8M',
      growth: '+31%',
      icon: <Gamepad2 className="w-8 h-8 text-purple-600" />,
      description: 'Utilities, gaming, financial services'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white bg-opacity-20 p-4 rounded-2xl">
                <MessageSquare className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Devine Mobile AI Assistant
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Comprehensive AI-powered management for prepaid services, insurance products, and value-added services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsChatOpen(true)}
                className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                Start AI Conversation
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Explore Platform
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Platform Overview */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Complete Platform Intelligence
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            AI-powered insights across all service categories with real-time monitoring and intelligent automation
          </p>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">{platformData.totalSales}</p>
                  <p className="text-sm text-green-600">↑ 18% from last month</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Agents</p>
                  <p className="text-2xl font-bold text-gray-900">{platformData.activeAgents.toLocaleString()}</p>
                  <p className="text-sm text-blue-600">↑ 8% growth rate</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Insurance Policies</p>
                  <p className="text-2xl font-bold text-gray-900">{platformData.insurancePolicies.toLocaleString()}</p>
                  <p className="text-sm text-purple-600">Active coverage</p>
                </div>
                <Shield className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">System Health</p>
                  <p className="text-2xl font-bold text-green-600">99.8%</p>
                  <p className="text-sm text-green-600">All systems operational</p>
                </div>
                <Wifi className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Service Categories Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {enhancedServiceMetrics.map((service, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {service.icon}
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">{service.value}</span>
                    <span className="text-sm font-medium text-green-600">{service.growth}</span>
                  </div>
                  <p className="text-gray-600">{service.description}</p>
                  <div className="pt-2">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View Details →
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Capabilities Showcase */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              Devine Mobile AI Capabilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <p className="text-gray-600">
                Experience intelligent automation across all service categories
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <Smartphone className="w-6 h-6 text-blue-600 mb-2 mx-auto" />
                <h4 className="font-medium text-gray-900 mb-1">Prepaid Intelligence</h4>
                <p className="text-sm text-gray-600">Smart inventory management and network optimization</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <Shield className="w-6 h-6 text-green-600 mb-2 mx-auto" />
                <h4 className="font-medium text-gray-900 mb-1">Insurance Analytics</h4>
                <p className="text-sm text-gray-600">Risk assessment and claims processing automation</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <Gamepad2 className="w-6 h-6 text-purple-600 mb-2 mx-auto" />
                <h4 className="font-medium text-gray-900 mb-1">Virtual Services</h4>
                <p className="text-sm text-gray-600">Multi-service integration and performance tracking</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <BarChart3 className="w-6 h-6 text-orange-600 mb-2 mx-auto" />
                <h4 className="font-medium text-gray-900 mb-1">Predictive Analytics</h4>
                <p className="text-sm text-gray-600">AI-driven insights and forecasting</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating AI Button */}
      <SpazaFloatingButton onClick={() => setIsChatOpen(true)} />

      {/* Enhanced AI Chat Interface */}
      {isChatOpen && (
        <EnhancedSpazaAIChat
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          platformData={platformData}
        />
      )}
    </div>
  );
};

export default SpazaAIAssistant;
