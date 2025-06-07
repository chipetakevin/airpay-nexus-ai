
import React, { useState, useEffect } from 'react';
import { MessageSquare, Zap, BarChart3, Users, Settings, TrendingUp, Smartphone, Wifi } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SpazaAIChat from './SpazaAIChat';
import SpazaFloatingButton from './SpazaFloatingButton';

const SpazaAIAssistant = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Platform data simulation
  const [platformData] = useState({
    totalSales: 'R 2,847,392',
    activeAgents: 1247,
    lowStockItems: 3,
    todayTransactions: 892,
    networkStatus: 'All Systems Operational'
  });

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
              Sophisticated AI-powered business intelligence for your AirPay ecosystem
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsChatOpen(true)}
                className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                Start Conversation
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Overview */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Real-time Platform Intelligence
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get instant insights and intelligent assistance for your entire AirPay ecosystem
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Sales</p>
                  <p className="text-2xl font-bold text-gray-900">{platformData.totalSales}</p>
                  <p className="text-sm text-green-600">↑ 12% from last month</p>
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
                  <p className="text-2xl font-bold text-gray-900">{platformData.activeAgents}</p>
                  <p className="text-sm text-blue-600">↑ 5% growth rate</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Today's Transactions</p>
                  <p className="text-2xl font-bold text-gray-900">{platformData.todayTransactions}</p>
                  <p className="text-sm text-purple-600">Real-time updates</p>
                </div>
                <Smartphone className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Alerts</p>
                  <p className="text-2xl font-bold text-orange-600">{platformData.lowStockItems}</p>
                  <p className="text-sm text-orange-600">Items need attention</p>
                </div>
                <Zap className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                Smart Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                AI-powered insights into sales trends, agent performance, and market opportunities.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Real-time sales analysis</li>
                <li>• Predictive demand forecasting</li>
                <li>• Performance benchmarking</li>
                <li>• Custom report generation</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="w-6 h-6 text-green-600" />
                Agent Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Comprehensive tools for managing your agent network and optimizing operations.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Agent onboarding automation</li>
                <li>• Commission calculations</li>
                <li>• Performance tracking</li>
                <li>• Territory optimization</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-purple-600" />
                Inventory Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Smart inventory management with predictive reordering and optimization.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Automated stock alerts</li>
                <li>• Demand prediction</li>
                <li>• Distribution optimization</li>
                <li>• Supplier management</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Demo Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              Experience the Power of Devine Mobile AI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-gray-600 mb-6">
                Click the AI assistant button to start exploring intelligent business insights
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <Wifi className="w-6 h-6 text-blue-600 mb-2 mx-auto" />
                  <h4 className="font-medium text-gray-900 mb-1">Network Status</h4>
                  <p className="text-sm text-gray-600">{platformData.networkStatus}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-green-600 mb-2 mx-auto" />
                  <h4 className="font-medium text-gray-900 mb-1">Performance</h4>
                  <p className="text-sm text-gray-600">Above target by 12%</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600 mb-2 mx-auto" />
                  <h4 className="font-medium text-gray-900 mb-1">Agent Network</h4>
                  <p className="text-sm text-gray-600">Growing by 5% monthly</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating AI Button */}
      <SpazaFloatingButton onClick={() => setIsChatOpen(true)} />

      {/* AI Chat Interface */}
      {isChatOpen && (
        <SpazaAIChat
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          platformData={platformData}
        />
      )}
    </div>
  );
};

export default SpazaAIAssistant;
