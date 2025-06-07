
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart3, TrendingUp, PieChart, Activity, 
  Users, DollarSign, Globe, Clock, 
  ArrowUp, ArrowDown, Eye, Download
} from 'lucide-react';

const BaaSAnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const analyticsMetrics = [
    { label: 'Revenue', value: 'R 125.8M', change: '+18%', icon: <DollarSign className="w-4 h-4" /> },
    { label: 'Transactions', value: '2.4M', change: '+12%', icon: <Activity className="w-4 h-4" /> },
    { label: 'Active Users', value: '45.8K', change: '+8%', icon: <Users className="w-4 h-4" /> },
    { label: 'Conversion Rate', value: '94.2%', change: '+2.1%', icon: <TrendingUp className="w-4 h-4" /> }
  ];

  const transactionData = [
    { service: 'Airtime', volume: 'R 58.2M', transactions: '1.2M', growth: '+15%' },
    { service: 'Data Bundles', volume: 'R 42.8M', transactions: '847K', growth: '+22%' },
    { service: 'Bill Payments', volume: 'R 18.4M', transactions: '234K', growth: '+8%' },
    { service: 'Insurance', volume: 'R 6.4M', transactions: '89K', growth: '+35%' }
  ];

  const userSegments = [
    { segment: 'Premium Users', count: '12,847', revenue: 'R 45.2M', percentage: '28%' },
    { segment: 'Regular Users', count: '23,156', revenue: 'R 52.8M', percentage: '51%' },
    { segment: 'New Users', count: '9,889', revenue: 'R 27.8M', percentage: '21%' }
  ];

  const geographicData = [
    { region: 'Gauteng', users: '18,247', revenue: 'R 48.2M', growth: '+12%' },
    { region: 'Western Cape', users: '12,896', revenue: 'R 35.4M', growth: '+18%' },
    { region: 'KwaZulu-Natal', users: '8,745', revenue: 'R 24.8M', growth: '+9%' },
    { region: 'Eastern Cape', users: '3,567', revenue: 'R 12.2M', growth: '+15%' },
    { region: 'Other Provinces', users: '2,437', revenue: 'R 5.2M', growth: '+8%' }
  ];

  const performanceMetrics = [
    { metric: 'API Response Time', value: '45ms', target: '<50ms', status: 'good' },
    { metric: 'Transaction Success Rate', value: '99.7%', target: '>99%', status: 'excellent' },
    { metric: 'System Uptime', value: '99.99%', target: '>99.9%', status: 'excellent' },
    { metric: 'Error Rate', value: '0.03%', target: '<0.1%', status: 'excellent' }
  ];

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Analytics Overview</h3>
        <div className="flex gap-2">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                timeRange === range 
                  ? 'bg-orange-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                    {metric.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">{metric.label}</p>
                    <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <ArrowUp className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-600">{metric.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transaction Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Service Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactionData.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{service.service}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-gray-600">{service.volume} revenue</span>
                      <span className="text-xs text-gray-600">{service.transactions} transactions</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <ArrowUp className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600">{service.growth}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              User Segmentation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userSegments.map((segment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{segment.segment}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-gray-600">{segment.count} users</span>
                      <span className="text-xs text-gray-600">{segment.revenue} revenue</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-orange-600">{segment.percentage}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geographic Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Geographic Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {geographicData.map((region, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">{region.region}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Users</span>
                    <span className="font-semibold">{region.users}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Revenue</span>
                    <span className="font-semibold">{region.revenue}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Growth</span>
                    <span className="text-green-600 font-semibold">{region.growth}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              System Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{metric.metric}</p>
                    <p className="text-xs text-gray-600">Target: {metric.target}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      metric.status === 'excellent' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {metric.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Custom Reports
              </div>
              <button className="text-sm bg-orange-600 text-white px-3 py-1 rounded-lg hover:bg-orange-700 transition-colors">
                <Download className="w-4 h-4 inline mr-1" />
                Export
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Revenue Report</h4>
                <p className="text-sm text-gray-600 mb-3">Detailed revenue analysis with breakdown by service</p>
                <button className="text-sm bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                  Generate Report
                </button>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">User Behavior Analysis</h4>
                <p className="text-sm text-gray-600 mb-3">Comprehensive user journey and engagement metrics</p>
                <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  View Analysis
                </button>
              </div>

              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Performance Dashboard</h4>
                <p className="text-sm text-gray-600 mb-3">Real-time system health and performance metrics</p>
                <button className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Open Dashboard
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BaaSAnalyticsDashboard;
