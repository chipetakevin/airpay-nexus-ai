
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
    <Card className="relative overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <div className={`flex items-center text-sm ${
                changeType === 'positive' ? 'text-green-600' : 
                changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {changeType === 'positive' && <TrendingUp className="w-4 h-4 mr-1" />}
                {changeType === 'negative' && <TrendingDown className="w-4 h-4 mr-1" />}
                <span>{change}</span>
              </div>
            </div>
          </div>
          <div className={`p-3 rounded-xl ${
            changeType === 'positive' ? 'bg-green-100' : 
            changeType === 'negative' ? 'bg-red-100' : 'bg-blue-100'
          }`}>
            <Icon className={`w-8 h-8 ${
              changeType === 'positive' ? 'text-green-600' : 
              changeType === 'negative' ? 'text-red-600' : 'text-blue-600'
            }`} />
          </div>
        </div>
        {trend && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Trend (7 days)</span>
              <span className="font-medium">↗ {trend}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const MetricGauge = ({ title, value, target, max = 100, color = "#3B82F6" }) => {
    const percentage = (value / max) * 100;
    const targetPercentage = (target / max) * 100;
    
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h4 className="font-semibold text-gray-900">{title}</h4>
            <div className="relative w-32 h-32 mx-auto">
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
                  className="transition-all duration-1000 ease-out"
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
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{value}{max === 100 ? '%' : ''}</div>
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-6">
              <div className="bg-white bg-opacity-20 p-4 rounded-2xl">
                <Network className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              MVN-X BaaS Platform
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Mobile Virtual Network Operator-as-a-Service Command Center
            </p>
            <div className="flex justify-center gap-4 mt-8">
              <Button 
                variant={selectedTimeRange === '7d' ? 'secondary' : 'outline'}
                onClick={() => setSelectedTimeRange('7d')}
                className="bg-white bg-opacity-20 hover:bg-opacity-30"
              >
                7 Days
              </Button>
              <Button 
                variant={selectedTimeRange === '30d' ? 'secondary' : 'outline'}
                onClick={() => setSelectedTimeRange('30d')}
                className="bg-white bg-opacity-20 hover:bg-opacity-30"
              >
                30 Days
              </Button>
              <Button 
                variant={selectedTimeRange === '90d' ? 'secondary' : 'outline'}
                onClick={() => setSelectedTimeRange('90d')}
                className="bg-white bg-opacity-20 hover:bg-opacity-30"
              >
                90 Days
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-5 w-full max-w-4xl bg-white shadow-lg">
              <TabsTrigger value="executive" className="flex flex-col items-center gap-1 p-4">
                <BarChart3 className="w-5 h-5" />
                <span className="text-xs">Executive</span>
              </TabsTrigger>
              <TabsTrigger value="partners" className="flex flex-col items-center gap-1 p-4">
                <Users className="w-5 h-5" />
                <span className="text-xs">Partners</span>
              </TabsTrigger>
              <TabsTrigger value="technical" className="flex flex-col items-center gap-1 p-4">
                <Server className="w-5 h-5" />
                <span className="text-xs">Technical</span>
              </TabsTrigger>
              <TabsTrigger value="customer" className="flex flex-col items-center gap-1 p-4">
                <Smartphone className="w-5 h-5" />
                <span className="text-xs">Customer</span>
              </TabsTrigger>
              <TabsTrigger value="financial" className="flex flex-col items-center gap-1 p-4">
                <DollarSign className="w-5 h-5" />
                <span className="text-xs">Financial</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Executive Overview */}
          <TabsContent value="executive" className="space-y-8">
            {/* KPI Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

            {/* Revenue and Growth Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    Revenue Growth Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueData}>
                        <defs>
                          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#3B82F6" 
                          fill="url(#revenueGradient)"
                          strokeWidth={3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-green-600" />
                    Partner Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <RechartsPieChart data={partnerDistribution} cx="50%" cy="50%" outerRadius={100}>
                          {partnerDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </RechartsPieChart>
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    {partnerDistribution.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <TabsContent value="partners" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Subscriber Growth Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={subscriberGrowth}>
                        <XAxis dataKey="month" />
                        <YAxis />
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
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Top Performing Partners</h4>
                      <div className="space-y-3">
                        {[
                          { name: 'TechMobile SA', growth: '+24%', subscribers: '89K' },
                          { name: 'ConnectCorp', growth: '+18%', subscribers: '76K' },
                          { name: 'MobileFirst', growth: '+15%', subscribers: '65K' }
                        ].map((partner, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">{partner.name}</p>
                              <p className="text-sm text-gray-600">{partner.subscribers} subscribers</p>
                            </div>
                            <span className="text-green-600 font-semibold">{partner.growth}</span>
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
          <TabsContent value="technical" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">API Response Time</p>
                      <p className="text-2xl font-bold text-gray-900">143ms</p>
                      <p className="text-sm text-green-600">Excellent</p>
                    </div>
                    <Activity className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Connections</p>
                      <p className="text-2xl font-bold text-gray-900">15,247</p>
                      <p className="text-sm text-blue-600">Real-time</p>
                    </div>
                    <Network className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">System Load</p>
                      <p className="text-2xl font-bold text-gray-900">67%</p>
                      <p className="text-sm text-green-600">Optimal</p>
                    </div>
                    <Monitor className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Error Rate</p>
                      <p className="text-2xl font-bold text-gray-900">0.003%</p>
                      <p className="text-sm text-green-600">Minimal</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Customer Experience */}
          <TabsContent value="customer" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Net Promoter Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-green-600">78</div>
                    <div className="text-sm text-gray-600">Excellent Customer Satisfaction</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Customer Effort Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-blue-600">4.2</div>
                    <div className="text-sm text-gray-600">Low Effort Required</div>
                    <div className="flex justify-center space-x-1">
                      {[1,2,3,4,5].map(star => (
                        <div key={star} className={`w-6 h-6 rounded ${star <= 4 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Satisfaction Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-purple-600">91%</div>
                    <div className="text-sm text-gray-600">Highly Satisfied</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '91%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Financial Management */}
          <TabsContent value="financial" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown by Service</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { service: 'Voice', revenue: 1250000 },
                      { service: 'Data', revenue: 1890000 },
                      { service: 'SMS', revenue: 460000 },
                      { service: 'Value Added', revenue: 320000 }
                    ]}>
                      <XAxis dataKey="service" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
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
