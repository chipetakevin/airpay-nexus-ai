import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import AirtimeDealsSystem from './AirtimeDealsSystem';
import BillingDashboard from './billing/BillingDashboard';
import SpazaMarketplace from './spaza/SpazaMarketplace';
import DealAlertSystem from './alerts/DealAlertSystem';
import NotificationCenter from './reporting/NotificationCenter';
import AdminPortal from './AdminPortal';
import { Smartphone, Activity, TrendingUp, Users, ShoppingBag, Bell, MessageSquare, Settings2 } from 'lucide-react';

const AirPayMasterDashboard = () => {
  const [activeTab, setActiveTab] = useState('deals');

  // Enhanced stats for better visibility
  const dashboardStats = [
    {
      label: 'Active Deals',
      value: '24',
      change: '+6',
      icon: <Activity className="w-4 h-4 md:w-5 md:h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      label: 'Total Users',
      value: '12.5K',
      change: '+23%',
      icon: <Users className="w-4 h-4 md:w-5 md:h-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      label: 'Revenue',
      value: 'R450K',
      change: '+15%',
      icon: <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      label: 'Uptime',
      value: '99.9%',
      change: '+0.1%',
      icon: <Smartphone className="w-4 h-4 md:w-5 md:h-5" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
  ];

  // Enhanced navigation with better UX
  const navigationTabs = [
    {
      id: 'deals',
      label: 'Smart Deals',
      emoji: '🔥',
      description: 'AI-Powered Offers',
      gradient: 'from-blue-500 to-purple-600',
      bgGradient: 'from-blue-50 to-purple-50',
      icon: <ShoppingBag className="w-4 h-4" />
    },
    {
      id: 'billing',
      label: 'Billing',
      emoji: '💳',
      description: 'Secure Payments',
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50',
      icon: <Activity className="w-4 h-4" />
    },
    {
      id: 'spaza',
      label: 'Spaza Market',
      emoji: '🏪',
      description: '24/7 Shopping',
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-50 to-red-50',
      icon: <ShoppingBag className="w-4 h-4" />
    },
    {
      id: 'alerts',
      label: 'Deal Alerts',
      emoji: '🔔',
      description: 'Real-time Notifications',
      gradient: 'from-yellow-500 to-orange-600',
      bgGradient: 'from-yellow-50 to-orange-50',
      icon: <Bell className="w-4 h-4" />
    },
    {
      id: 'notifications',
      label: 'Communications',
      emoji: '💬',
      description: 'Message Center',
      gradient: 'from-cyan-500 to-blue-600',
      bgGradient: 'from-cyan-50 to-blue-50',
      icon: <MessageSquare className="w-4 h-4" />
    },
    {
      id: 'admin',
      label: 'Admin Portal',
      emoji: '⚙️',
      description: 'System Control',
      gradient: 'from-gray-500 to-slate-600',
      bgGradient: 'from-gray-50 to-slate-50',
      icon: <Settings2 className="w-4 h-4" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      {/* Compact Header with smaller, more appealing design */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg">
        <div className="max-w-7xl mx-auto p-3 md:p-4">
          {/* Compact Header with improved branding */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg ring-2 ring-white/50">
                <Smartphone className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                  Divinely Mobile
                </h1>
                <p className="text-xs md:text-sm text-gray-600 font-medium">Customer Shopping Hub</p>
                <p className="text-xs text-gray-500 hidden sm:block">Smart Deals • Instant Service • Cashback Rewards</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <Badge className="bg-green-100 text-green-700 text-xs px-2 py-1">
                🟢 All Systems Operational
              </Badge>
              <Button 
                variant="outline" 
                className="bg-white/80 hover:bg-white/90 border-2 border-gray-200 text-xs"
              >
                Need Help?
              </Button>
            </div>
          </div>

          {/* Compact Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 mb-4">
            {dashboardStats.map((stat, index) => (
              <Card key={index} className={`relative overflow-hidden group hover:shadow-md transition-all duration-300 border ${stat.borderColor} shadow-sm hover:scale-105`}>
                <CardContent className="p-2 md:p-3">
                  <div className={`absolute inset-0 ${stat.bgColor} opacity-40`}></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-1">
                      <div className={`p-1.5 rounded-lg ${stat.bgColor} ${stat.color} ring-1 ring-white shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                        {stat.icon}
                      </div>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                        stat.change.startsWith('+') ? 'bg-green-100 text-green-700 ring-1 ring-green-200' : 'bg-red-100 text-red-700 ring-1 ring-red-200'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-0.5 font-semibold uppercase tracking-wide">{stat.label}</p>
                      <p className="text-sm md:text-lg font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area with Tabs */}
      <div className="max-w-7xl mx-auto p-3 md:p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Mobile-First Navigation */}
          <div className="mb-6">
            {/* Mobile Navigation - Improved Horizontal Scroll */}
            <div className="block w-full">
              <ScrollArea className="w-full">
                <div className="flex justify-start lg:justify-center pb-2">
                  <div className="flex space-x-2 p-2 bg-white/90 backdrop-blur-md rounded-xl md:rounded-2xl shadow-lg border border-gray-100 min-w-fit">
                    {navigationTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                          flex-shrink-0 p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-300 min-w-[80px] md:min-w-[100px]
                          ${activeTab === tab.id 
                            ? `bg-gradient-to-br ${tab.gradient} text-white shadow-lg scale-105` 
                            : `bg-gradient-to-br ${tab.bgGradient} hover:bg-white text-gray-700 hover:shadow-md hover:scale-105`
                          }
                        `}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <div className={`text-lg md:text-xl ${activeTab === tab.id ? 'animate-bounce' : 'group-hover:animate-pulse'}`}>
                            {tab.emoji}
                          </div>
                          <div className="text-center">
                            <div className="text-xs md:text-sm font-bold leading-tight">
                              {tab.label}
                            </div>
                            <div className={`text-xs mt-0.5 hidden md:block ${activeTab === tab.id ? 'text-white/80' : 'text-gray-500'}`}>
                              {tab.description}
                            </div>
                          </div>
                          {activeTab === tab.id && (
                            <div className="flex items-center gap-1">
                              {tab.icon}
                              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                            </div>
                          )}
                        </div>
                        
                        {/* Active indicator */}
                        {activeTab === tab.id && (
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-white rounded-full shadow-lg"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-4 md:space-y-6">
            <TabsContent value="deals" className="space-y-4 md:space-y-6 animate-fade-in m-0">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl ring-1 ring-gray-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 rounded-t-xl border-b border-gray-100 p-4 md:p-6">
                  <CardTitle className="flex items-center gap-3 md:gap-4 text-lg md:text-xl">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-xl md:text-2xl">🔥</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 md:gap-3">
                        Smart Airtime & Data Deals
                        <Badge className="bg-blue-600 text-white px-2 py-1 text-xs">Live AI</Badge>
                        <Badge className="bg-green-600 text-white px-2 py-1 text-xs">Cashback</Badge>
                      </div>
                      <p className="text-gray-600 text-sm md:text-base font-normal mt-1 md:mt-2">Discover the best deals from top SA retailers with AI-powered recommendations</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <AirtimeDealsSystem />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-4 md:space-y-6 animate-fade-in m-0">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl ring-1 ring-gray-200">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-xl border-b border-gray-100 p-4 md:p-6">
                  <CardTitle className="flex items-center gap-3 md:gap-4 text-lg md:text-xl">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-xl md:text-2xl">💳</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 md:gap-3">
                        Billing Dashboard
                        <Badge className="bg-green-600 text-white px-2 py-1 text-xs">Secure</Badge>
                      </div>
                      <p className="text-gray-600 text-sm md:text-base font-normal mt-1 md:mt-2">Manage payments, view transactions, and track your spending</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <BillingDashboard />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="spaza" className="space-y-4 md:space-y-6 animate-fade-in m-0">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl ring-1 ring-gray-200">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-xl border-b border-gray-100 p-4 md:p-6">
                  <CardTitle className="flex items-center gap-3 md:gap-4 text-lg md:text-xl">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-xl md:text-2xl">🏪</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 md:gap-3">
                        Spaza Marketplace
                        <Badge className="bg-orange-600 text-white px-2 py-1 text-xs">24/7 Open</Badge>
                      </div>
                      <p className="text-gray-600 text-sm md:text-base font-normal mt-1 md:mt-2">Your neighborhood digital marketplace - always open for business</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <SpazaMarketplace />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-4 md:space-y-6 animate-fade-in m-0">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl ring-1 ring-gray-200">
                <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-t-xl border-b border-gray-100 p-4 md:p-6">
                  <CardTitle className="flex items-center gap-3 md:gap-4 text-lg md:text-xl">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-xl md:text-2xl">🔔</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 md:gap-3">
                        Deal Alert System
                        <Badge className="bg-yellow-600 text-white px-2 py-1 text-xs">Live</Badge>
                      </div>
                      <p className="text-gray-600 text-sm md:text-base font-normal mt-1 md:mt-2">Never miss a great deal with real-time notifications</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <DealAlertSystem />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4 md:space-y-6 animate-fade-in m-0">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl ring-1 ring-gray-200">
                <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-t-xl border-b border-gray-100 p-4 md:p-6">
                  <CardTitle className="flex items-center gap-3 md:gap-4 text-lg md:text-xl">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-xl md:text-2xl">💬</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 md:gap-3">
                        Communications Center
                        <Badge className="bg-cyan-600 text-white px-2 py-1 text-xs">Active</Badge>
                      </div>
                      <p className="text-gray-600 text-sm md:text-base font-normal mt-1 md:mt-2">Stay connected with updates, support, and community</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <NotificationCenter />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="admin" className="space-y-4 md:space-y-6 animate-fade-in m-0">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl ring-1 ring-gray-200">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-t-xl border-b border-gray-100 p-4 md:p-6">
                  <CardTitle className="flex items-center gap-3 md:gap-4 text-lg md:text-xl">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-gray-500 to-slate-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-xl md:text-2xl">⚙️</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 md:gap-3">
                        Admin Portal
                        <Badge className="bg-gray-600 text-white px-2 py-1 text-xs">Secure</Badge>
                      </div>
                      <p className="text-gray-600 text-sm md:text-base font-normal mt-1 md:mt-2">Advanced controls and system management</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <AdminPortal />
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AirPayMasterDashboard;
