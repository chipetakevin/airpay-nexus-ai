
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, TrendingDown, Users, DollarSign, Activity, 
  Shield, Globe, Smartphone, BarChart3, PieChart, Settings,
  AlertTriangle, CheckCircle, Clock, Network, Database,
  Phone, MessageSquare, Signal, Wifi, Server, Monitor
} from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, AreaChart, Area, BarChart, Bar } from 'recharts';

const MVNXBaaSDashboard = () => {
  const [activeTab, setActiveTab] = useState('executive');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');

  // Sample data for charts
  const revenueData = [
    { month: 'Jan', revenue: 2400000, growth: 12.5 },
    { month: 'Feb', revenue: 2650000, growth: 10.4 },
    { month: 'Mar', revenue: 2800000, growth: 5.7 },
    { month: 'Apr', revenue: 3100000, growth: 10.7 },
    { month: 'May', revenue: 3350000, growth: 8.1 },
    { month: 'Jun', revenue: 3600000, growth: 7.5 }
  ];

  const partnerDistribution = [
    { name: 'Enterprise', value: 45, color: '#3B82F6' },
    { name: 'SME', value: 30, color: '#10B981' },
    { name: 'Startup', value: 15, color: '#F59E0B' },
    { name: 'Government', value: 10, color: '#8B5CF6' }
  ];

  const subscriberGrowth = [
    { month: 'Jan', subscribers: 125000, active: 118000 },
    { month: 'Feb', subscribers: 142000, active: 136000 },
    { month: 'Mar', subscribers: 158000, active: 152000 },
    { month: 'Apr', subscribers: 175000, active: 168000 },
    { month: 'May', subscribers: 192000, active: 184000 },
    { month: 'Jun', subscribers: 210000, active: 201000 }
  ];

  const networkPerformance = [
    { metric: 'Call Success Rate', value: 99.7, target: 99.5, status: 'excellent' },
    { metric: 'Data Throughput', value: 98.2, target: 95.0, status: 'excellent' },
    { metric: 'SMS Delivery', value: 99.9, target: 99.0, status: 'excellent' },
    { metric: 'Network Latency', value: 12, target: 15, status: 'excellent', unit: 'ms' }
  ];

  const chartConfig = {
    revenue: { label: "Revenue", color: "#3B82F6" },
    growth: { label: "Growth", color: "#10B981" },
    subscribers: { label: "Subscribers", color: "#8B5CF6" },
    active: { label: "Active", color: "#F59E0B" }
  };

  const KPICard = ({ title, value, change, changeType, icon: Icon, trend }) => (
    <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-gradient-to-br from-white via-gray-50 to-blue-50/30">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-2 flex-1">
            <p className="text-xs sm:text-sm font-medium text-gray-600">{title}</p>
            <div className="space-y-1">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 transition-all duration-300 group-hover:text-blue-700">{value}</p>
              <div className={`flex items-center text-xs sm:text-sm transition-all duration-300 ${
                changeType === 'positive' ? 'text-green-600' : 
                changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {changeType === 'positive' && <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 animate-pulse" />}
                {changeType === 'negative' && <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1 animate-pulse" />}
                <span className="font-medium">{change}</span>
              </div>
            </div>
          </div>
          <div className={`p-3 sm:p-4 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg ${
            changeType === 'positive' ? 'bg-gradient-to-br from-green-100 to-green-200 shadow-green-200' : 
            changeType === 'negative' ? 'bg-gradient-to-br from-red-100 to-red-200 shadow-red-200' : 'bg-gradient-to-br from-blue-100 to-blue-200 shadow-blue-200'
          }`}>
            <Icon className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-300 ${
              changeType === 'positive' ? 'text-green-600' : 
              changeType === 'negative' ? 'text-red-600' : 'text-blue-600'
            }`} />
          </div>
        </div>
        {trend && (
          <div className="pt-3 border-t border-gray-100">
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span className="font-medium">7-day trend</span>
              <span className={`font-bold px-2 py-1 rounded-full ${
                changeType === 'positive' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
              }`}>
                ↗ {trend}
              </span>
            </div>
          </div>
        )}
        
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        {/* Floating particles effect */}
        <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-ping"></div>
        <div className="absolute bottom-3 left-3 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-40 group-hover:animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </CardContent>
    </Card>
  );

  const MetricGauge = ({ title, value, target, max = 100, color = "#3B82F6" }) => {
    const percentage = (value / max) * 100;
    const targetPercentage = (target / max) * 100;
    
    return (
      <Card className="group hover:shadow-xl transition-all duration-500 hover:scale-105 border-0 bg-gradient-to-br from-white to-gray-50">
        <CardContent className="p-4 sm:p-6">
          <div className="text-center space-y-4">
            <h4 className="font-semibold text-sm sm:text-base text-gray-900 group-hover:text-blue-700 transition-colors duration-300">{title}</h4>
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke={color}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(percentage * 314) / 100} 314`}
                  className="transition-all duration-1000 ease-out drop-shadow-lg"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))' }}
                />
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  fill="none"
                  stroke="#F3F4F6"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  strokeDashoffset={`${(targetPercentage * 282) / -100}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center group-hover:scale-110 transition-transform duration-300">
                  <div className="text-lg sm:text-2xl font-bold text-gray-900">{value}{max === 100 ? '%' : ''}</div>
                  <div className="text-xs text-gray-500">Target: {target}{max === 100 ? '%' : ''}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      {/* Enhanced Header with Mobile Optimization */}
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full animate-ping"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full animate-bounce"></div>
        </div>
        
        <div className="container mx-auto px-4 py-8 sm:py-12 relative z-10">
          <div className="text-center space-y-4 sm:space-y-6">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="bg-white bg-opacity-20 p-3 sm:p-4 rounded-2xl backdrop-blur-lg border border-white/20 shadow-2xl hover:scale-110 transition-transform duration-500">
                <Network className="w-8 h-8 sm:w-12 sm:h-12 animate-pulse" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              MVN-X BaaS Platform
            </h1>
            <p className="text-base sm:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Mobile Virtual Network Operator-as-a-Service Command Center
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-8">
              <Button 
                variant={selectedTimeRange === '7d' ? 'secondary' : 'outline'}
                onClick={() => setSelectedTimeRange('7d')}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 border-white/30 text-white text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-2 transition-all duration-300 hover:scale-105"
              >
                7 Days
              </Button>
              <Button 
                variant={selectedTimeRange === '30d' ? 'secondary' : 'outline'}
                onClick={() => setSelectedTimeRange('30d')}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 border-white/30 text-white text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-2 transition-all duration-300 hover:scale-105"
              >
                30 Days
              </Button>
              <Button 
                variant={selectedTimeRange === '90d' ? 'secondary' : 'outline'}
                onClick={() => setSelectedTimeRange('90d')}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 border-white/30 text-white text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-2 transition-all duration-300 hover:scale-105"
              >
                90 Days
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Mobile-Optimized Tab Navigation */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <TabsList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 w-full max-w-6xl bg-white shadow-xl rounded-2xl p-2 border-0">
              <TabsTrigger value="executive" className="flex flex-col items-center gap-1 p-2 sm:p-4 rounded-xl transition-all duration-300 hover:scale-105 data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">Executive</span>
              </TabsTrigger>
              <TabsTrigger value="partners" className="flex flex-col items-center gap-1 p-2 sm:p-4 rounded-xl transition-all duration-300 hover:scale-105 data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">Partners</span>
              </TabsTrigger>
              <TabsTrigger value="technical" className="flex flex-col items-center gap-1 p-2 sm:p-4 rounded-xl transition-all duration-300 hover:scale-105 data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg">
                <Server className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">Technical</span>
              </TabsTrigger>
              <TabsTrigger value="customer" className="flex flex-col items-center gap-1 p-2 sm:p-4 rounded-xl transition-all duration-300 hover:scale-105 data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg">
                <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">Customer</span>
              </TabsTrigger>
              <TabsTrigger value="financial" className="flex flex-col items-center gap-1 p-2 sm:p-4 rounded-xl transition-all duration-300 hover:scale-105 data-[state=active]:bg-gradient-to-br data-[state=active]:from-yellow-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">Financial</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Executive Overview */}
          <TabsContent value="executive" className="space-y-6 sm:space-y-8 animate-fade-in">
            {/* KPI Overview with Enhanced Mobile Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <KPICard
                title="Total Revenue"
                value="R 45.8M"
                change="+12.5% vs last month"
                changeType="positive"
                icon={DollarSign}
                trend="8.2%"
              />
              <KPICard
                title="Active MVNO Partners"
                value="247"
                change="+18 new partners"
                changeType="positive"
                icon={Users}
                trend="12.1%"
              />
              <KPICard
                title="Total Subscribers"
                value="2.1M"
                change="+156K this month"
                changeType="positive"
                icon={Smartphone}
                trend="15.3%"
              />
              <KPICard
                title="Platform Uptime"
                value="99.99%"
                change="SLA Exceeded"
                changeType="positive"
                icon={Shield}
                trend="0.01%"
              />
            </div>

            {/* Enhanced Charts with Mobile Optimization */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-gradient-to-br from-white to-blue-50/30">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl group-hover:text-blue-700 transition-colors duration-300">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 group-hover:animate-pulse" />
                    Revenue Growth Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-64 sm:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueData}>
                        <defs>
                          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#3B82F6" 
                          fill="url(#revenueGradient)"
                          strokeWidth={3}
                          dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-gradient-to-br from-white to-green-50/30">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl group-hover:text-green-700 transition-colors duration-300">
                    <PieChart className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 group-hover:animate-spin" />
                    Partner Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-64 sm:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <RechartsPieChart data={partnerDistribution} cx="50%" cy="50%" outerRadius={80} innerRadius={40}>
                          {partnerDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={2} />
                          ))}
                        </RechartsPieChart>
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    {partnerDistribution.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                        <div 
                          className="w-3 h-3 rounded-full shadow-sm" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs sm:text-sm text-gray-600 font-medium">{item.name}: {item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics with Enhanced Mobile Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {networkPerformance.map((metric, index) => (
                <MetricGauge
                  key={index}
                  title={metric.metric}
                  value={metric.value}
                  target={metric.target}
                  max={metric.metric === 'Network Latency' ? 50 : 100}
                  color={metric.status === 'excellent' ? '#10B981' : '#F59E0B'}
                />
              ))}
            </div>
          </TabsContent>

          {/* MVNO Partners Dashboard */}
          <TabsContent value="partners" className="space-y-6 sm:space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-purple-50/30">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl group-hover:text-purple-700 transition-colors duration-300">Subscriber Growth Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-64 sm:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={subscriberGrowth}>
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line 
                          type="monotone" 
                          dataKey="subscribers" 
                          stroke="#8B5CF6" 
                          strokeWidth={3}
                          dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="active" 
                          stroke="#F59E0B" 
                          strokeWidth={3}
                          dot={{ fill: '#F59E0B', strokeWidth: 2, r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-gray-50">
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base group-hover:text-blue-700 transition-colors duration-300">Top Performing Partners</h4>
                      <div className="space-y-3">
                        {[
                          { name: 'TechMobile SA', growth: '+24%', subscribers: '89K' },
                          { name: 'ConnectCorp', growth: '+18%', subscribers: '76K' },
                          { name: 'MobileFirst', growth: '+15%', subscribers: '65K' }
                        ].map((partner, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:shadow-md transition-all duration-300 hover:scale-105">
                            <div>
                              <p className="font-medium text-gray-900 text-xs sm:text-sm">{partner.name}</p>
                              <p className="text-xs text-gray-600">{partner.subscribers} subscribers</p>
                            </div>
                            <span className="text-green-600 font-bold text-xs sm:text-sm px-2 py-1 bg-green-100 rounded-full">{partner.growth}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Technical Operations */}
          <TabsContent value="technical" className="space-y-6 sm:space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card className="group hover:shadow-xl transition-all duration-500 hover:scale-105 border-0 bg-gradient-to-br from-white to-blue-50">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium">API Response Time</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">143ms</p>
                      <p className="text-xs sm:text-sm text-green-600 font-medium">Excellent</p>
                    </div>
                    <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 group-hover:animate-pulse" />
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-500 hover:scale-105 border-0 bg-gradient-to-br from-white to-green-50">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium">Active Connections</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300">15,247</p>
                      <p className="text-xs sm:text-sm text-blue-600 font-medium">Real-time</p>
                    </div>
                    <Network className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 group-hover:animate-bounce" />
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-500 hover:scale-105 border-0 bg-gradient-to-br from-white to-orange-50">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium">System Load</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-orange-700 transition-colors duration-300">67%</p>
                      <p className="text-xs sm:text-sm text-green-600 font-medium">Optimal</p>
                    </div>
                    <Monitor className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 group-hover:animate-pulse" />
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-500 hover:scale-105 border-0 bg-gradient-to-br from-white to-red-50">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium">Error Rate</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-red-700 transition-colors duration-300">0.003%</p>
                      <p className="text-xs sm:text-sm text-green-600 font-medium">Minimal</p>
                    </div>
                    <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 group-hover:animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Customer Experience */}
          <TabsContent value="customer" className="space-y-6 sm:space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <Card className="group hover:shadow-xl transition-all duration-500 hover:scale-105 border-0 bg-gradient-to-br from-white to-green-50">
                <CardHeader>
                  <CardTitle className="text-center text-lg sm:text-xl group-hover:text-green-700 transition-colors duration-300">Net Promoter Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-3xl sm:text-4xl font-bold text-green-600 group-hover:scale-110 transition-transform duration-300">78</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">Excellent Customer Satisfaction</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-1000 ease-out shadow-lg" 
                        style={{ width: '78%' }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-500 hover:scale-105 border-0 bg-gradient-to-br from-white to-blue-50">
                <CardHeader>
                  <CardTitle className="text-center text-lg sm:text-xl group-hover:text-blue-700 transition-colors duration-300">Customer Effort Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-3xl sm:text-4xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-300">4.2</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">Low Effort Required</div>
                    <div className="flex justify-center space-x-1">
                      {[1,2,3,4,5].map(star => (
                        <div 
                          key={star} 
                          className={`w-4 h-4 sm:w-6 sm:h-6 rounded transition-all duration-300 ${
                            star <= 4 ? 'bg-blue-600 shadow-lg' : 'bg-gray-200'
                          } hover:scale-110`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-500 hover:scale-105 border-0 bg-gradient-to-br from-white to-purple-50">
                <CardHeader>
                  <CardTitle className="text-center text-lg sm:text-xl group-hover:text-purple-700 transition-colors duration-300">Satisfaction Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-3xl sm:text-4xl font-bold text-purple-600 group-hover:scale-110 transition-transform duration-300">91%</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">Highly Satisfied</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out shadow-lg" 
                        style={{ width: '91%' }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Financial Management */}
          <TabsContent value="financial" className="space-y-6 sm:space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <KPICard
                title="Monthly Revenue"
                value="R 3.6M"
                change="+7.5% vs last month"
                changeType="positive"
                icon={DollarSign}
                trend="6.2%"
              />
              <KPICard
                title="Gross Margin"
                value="68.4%"
                change="+2.1% improvement"
                changeType="positive"
                icon={TrendingUp}
                trend="2.8%"
              />
              <KPICard
                title="ARPU"
                value="R 287"
                change="+R 15 vs last month"
                changeType="positive"
                icon={Users}
                trend="5.5%"
              />
              <KPICard
                title="Churn Rate"
                value="2.1%"
                change="-0.4% improvement"
                changeType="positive"
                icon={TrendingDown}
                trend="0.4%"
              />
            </div>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-gradient-to-br from-white to-yellow-50/30">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl group-hover:text-yellow-700 transition-colors duration-300">Revenue Breakdown by Service</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-64 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { service: 'Voice', revenue: 1250000 },
                      { service: 'Data', revenue: 1890000 },
                      { service: 'SMS', revenue: 460000 },
                      { service: 'Value Added', revenue: 320000 }
                    ]}>
                      <XAxis dataKey="service" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar 
                        dataKey="revenue" 
                        fill="url(#barGradient)" 
                        radius={[8, 8, 0, 0]} 
                        stroke="#3B82F6"
                        strokeWidth={1}
                      />
                      <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.3}/>
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MVNXBaaSDashboard;
