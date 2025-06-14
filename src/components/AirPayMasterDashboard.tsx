
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AirtimeDealsSystem from './AirtimeDealsSystem';
import BillingDashboard from './billing/BillingDashboard';
import SpazaMarketplace from './spaza/SpazaMarketplace';
import DealAlertSystem from './alerts/DealAlertSystem';
import NotificationCenter from './reporting/NotificationCenter';
import AdminPortal from './AdminPortal';
import { Smartphone, Activity, TrendingUp, Users } from 'lucide-react';

const AirPayMasterDashboard = () => {
  const [activeTab, setActiveTab] = useState('deals');

  // Enhanced stats for the dashboard header
  const dashboardStats = [
    {
      label: 'Active Deals',
      value: '24',
      change: '+6',
      icon: <Activity className="w-4 h-4 md:w-5 md:h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Total Users',
      value: '12.5K',
      change: '+23%',
      icon: <Users className="w-4 h-4 md:w-5 md:h-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Revenue',
      value: 'R450K',
      change: '+15%',
      icon: <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      label: 'Uptime',
      value: '99.9%',
      change: '+0.1%',
      icon: <Smartphone className="w-4 h-4 md:w-5 md:h-5" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      {/* Enhanced Header Section */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200/50 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          {/* Header with Logo and Title */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Smartphone className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Divinely Mobile
                </h1>
                <p className="text-sm md:text-base text-gray-600">Master Dashboard</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="hidden md:flex items-center gap-2 bg-white/80 hover:bg-white/90"
            >
              Click to exit
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {dashboardStats.map((stat, index) => (
              <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 md:p-3 rounded-xl ${stat.bgColor} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                      {stat.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs md:text-sm text-gray-600 mb-1 font-medium truncate">{stat.label}</p>
                      <p className="text-lg md:text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Enhanced Tab Navigation */}
          <TabsList className="w-full bg-white/90 backdrop-blur-sm shadow-lg mb-6 sticky top-24 z-40 rounded-2xl border-2 border-gray-100 p-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 w-full">
              <TabsTrigger 
                value="deals" 
                className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 hover:bg-gray-50"
              >
                <span className="text-2xl">🔥</span>
                <div className="text-center">
                  <span className="text-xs font-bold">Smart Deals</span>
                  <div className="text-xs opacity-75 mt-1">AI-Powered</div>
                </div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="billing" 
                className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 hover:bg-gray-50"
              >
                <span className="text-2xl">💳</span>
                <div className="text-center">
                  <span className="text-xs font-bold">Billing</span>
                  <div className="text-xs opacity-75 mt-1">Payments</div>
                </div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="spaza" 
                className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 hover:bg-gray-50"
              >
                <span className="text-2xl">🏪</span>
                <div className="text-center">
                  <span className="text-xs font-bold">Spaza Market</span>
                  <div className="text-xs opacity-75 mt-1">24/7 Open</div>
                </div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="alerts" 
                className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-br data-[state=active]:from-yellow-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 hover:bg-gray-50"
              >
                <span className="text-2xl">🔔</span>
                <div className="text-center">
                  <span className="text-xs font-bold">Deal Alerts</span>
                  <div className="text-xs opacity-75 mt-1">Real-time</div>
                </div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="notifications" 
                className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 hover:bg-gray-50"
              >
                <span className="text-2xl">💬</span>
                <div className="text-center">
                  <span className="text-xs font-bold">Communications</span>
                  <div className="text-xs opacity-75 mt-1">Center</div>
                </div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="admin" 
                className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-br data-[state=active]:from-gray-500 data-[state=active]:to-slate-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 hover:bg-gray-50"
              >
                <span className="text-2xl">⚙️</span>
                <div className="text-center">
                  <span className="text-xs font-bold">Admin Portal</span>
                  <div className="text-xs opacity-75 mt-1">Control</div>
                </div>
              </TabsTrigger>
            </div>
          </TabsList>

          {/* Enhanced Tab Content with consistent spacing */}
          <div className="space-y-6">
            <TabsContent value="deals" className="space-y-6 animate-fade-in">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl">
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">🔥</span>
                    Smart Airtime & Data Deals
                    <Badge className="bg-blue-600 text-white">AI-Powered</Badge>
                  </CardTitle>
                  <p className="text-gray-600">AI-powered deal discovery from top SA retailers</p>
                </CardHeader>
                <CardContent className="p-6">
                  <AirtimeDealsSystem />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-6 animate-fade-in">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-xl">
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">💳</span>
                    Billing Dashboard
                    <Badge className="bg-green-600 text-white">Live</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <BillingDashboard />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="spaza" className="space-y-6 animate-fade-in">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-xl">
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">🏪</span>
                    Spaza Marketplace
                    <Badge className="bg-orange-600 text-white">24/7</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <SpazaMarketplace />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6 animate-fade-in">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-t-xl">
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">🔔</span>
                    Deal Alert System
                    <Badge className="bg-yellow-600 text-white">Real-time</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <DealAlertSystem />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6 animate-fade-in">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-t-xl">
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">💬</span>
                    Communications Center
                    <Badge className="bg-cyan-600 text-white">Active</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <NotificationCenter />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="admin" className="space-y-6 animate-fade-in">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-t-xl">
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">⚙️</span>
                    Admin Portal
                    <Badge className="bg-gray-600 text-white">Secure</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
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
