import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Users, DollarSign, Activity, Phone, MessageSquare, Wifi } from 'lucide-react';

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mvno: string;
  status: 'active' | 'suspended' | 'inactive';
  balance: number;
  plan: string;
  joinDate: string;
  lastActivity: string;
  dataUsage: number;
  voiceUsage: number;
  smsUsage: number;
  simStatus: 'active' | 'inactive' | 'suspended';
  supportTickets: number;
}

interface CustomerAnalyticsProps {
  customers: Customer[];
}

const CustomerAnalytics: React.FC<CustomerAnalyticsProps> = ({ customers }) => {
  // Analytics data processing
  const statusData = [
    { name: 'Active', value: customers.filter(c => c.status === 'active').length, color: '#22c55e' },
    { name: 'Suspended', value: customers.filter(c => c.status === 'suspended').length, color: '#ef4444' },
    { name: 'Inactive', value: customers.filter(c => c.status === 'inactive').length, color: '#6b7280' }
  ];

  const mvnoData = [
    { name: 'Divine Mobile', customers: customers.filter(c => c.mvno === 'Divine Mobile').length },
    { name: 'Partner MVNO', customers: customers.filter(c => c.mvno === 'Partner MVNO').length },
    { name: 'Enterprise MVNO', customers: customers.filter(c => c.mvno === 'Enterprise MVNO').length }
  ];

  const planData = [
    { name: 'Basic Plan', customers: customers.filter(c => c.plan === 'Basic Plan').length },
    { name: 'Premium Data', customers: customers.filter(c => c.plan === 'Premium Data').length },
    { name: 'Enterprise', customers: customers.filter(c => c.plan === 'Enterprise').length },
    { name: 'Family Plan', customers: customers.filter(c => c.plan === 'Family Plan').length }
  ];

  const usageData = [
    {
      usage: 'Data',
      average: customers.reduce((sum, c) => sum + c.dataUsage, 0) / customers.length || 0,
      color: '#3b82f6'
    },
    {
      usage: 'Voice',
      average: customers.reduce((sum, c) => sum + c.voiceUsage, 0) / customers.length || 0,
      color: '#10b981'
    },
    {
      usage: 'SMS',
      average: customers.reduce((sum, c) => sum + c.smsUsage, 0) / customers.length || 0,
      color: '#f59e0b'
    }
  ];

  const monthlyGrowthData = [
    { month: 'Jan', customers: 120 },
    { month: 'Feb', customers: 145 },
    { month: 'Mar', customers: 180 },
    { month: 'Apr', customers: 210 },
    { month: 'May', customers: 250 },
    { month: 'Jun', customers: 290 },
    { month: 'Jul', customers: 320 },
    { month: 'Aug', customers: 350 },
    { month: 'Sep', customers: 380 },
    { month: 'Oct', customers: 410 },
    { month: 'Nov', customers: 450 },
    { month: 'Dec', customers: customers.length }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Customer Growth</p>
                <p className="text-2xl font-bold text-blue-700">+15.2%</p>
                <p className="text-xs text-blue-500">vs last month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Total ARPU</p>
                <p className="text-2xl font-bold text-green-700">
                  R{(customers.reduce((sum, c) => sum + c.balance, 0) / customers.length || 0).toFixed(0)}
                </p>
                <p className="text-xs text-green-500">average per user</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Churn Rate</p>
                <p className="text-2xl font-bold text-purple-700">2.8%</p>
                <p className="text-xs text-purple-500">monthly average</p>
              </div>
              <Activity className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Satisfaction</p>
                <p className="text-2xl font-bold text-orange-700">94.2%</p>
                <p className="text-xs text-orange-500">customer rating</p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* MVNO Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>MVNO Customer Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mvnoData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="customers" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Customer Growth Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Customer Growth Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="customers" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="w-5 h-5" />
            Average Usage Patterns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {usageData.map((item) => (
              <div key={item.usage} className="text-center">
                <div className="mb-2">
                  {item.usage === 'Data' && <Wifi className="w-8 h-8 mx-auto text-blue-600" />}
                  {item.usage === 'Voice' && <Phone className="w-8 h-8 mx-auto text-green-600" />}
                  {item.usage === 'SMS' && <MessageSquare className="w-8 h-8 mx-auto text-yellow-600" />}
                </div>
                <h3 className="text-lg font-semibold">{item.usage}</h3>
                <p className="text-3xl font-bold" style={{ color: item.color }}>
                  {Math.round(item.average)}%
                </p>
                <p className="text-sm text-gray-500">average usage</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Plan Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={planData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="customers" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerAnalytics;