import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Activity, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Smartphone,
  MessageSquare,
  Globe,
  Download,
  RefreshCw,
  Zap,
  Target
} from 'lucide-react';
import { useUSSDData } from '@/hooks/useUSSDData';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';

interface AnalyticsMetrics {
  totalSessions: number;
  activeSessions: number;
  avgSessionDuration: number;
  successRate: number;
  platformDistribution: Record<string, number>;
  topUSSDCodes: Array<{ code: string; usage: number; successRate: number }>;
  hourlyActivity: Array<{ hour: number; sessions: number }>;
  customerEngagement: {
    newUsers: number;
    returningUsers: number;
    churnRate: number;
  };
}

const AnalyticsDashboard = () => {
  const { whatsappSessions, customers, ussdCodes, loading } = useUSSDData();
  const [selectedPeriod, setSelectedPeriod] = useState('24h');
  const [metrics, setMetrics] = useState<AnalyticsMetrics>({
    totalSessions: 0,
    activeSessions: 0,
    avgSessionDuration: 0,
    successRate: 0,
    platformDistribution: {},
    topUSSDCodes: [],
    hourlyActivity: [],
    customerEngagement: {
      newUsers: 0,
      returningUsers: 0,
      churnRate: 0
    }
  });

  // Calculate metrics based on data
  useEffect(() => {
    if (loading) return;

    const now = new Date();
    let startDate: Date;

    switch (selectedPeriod) {
      case '24h':
        startDate = subDays(now, 1);
        break;
      case '7d':
        startDate = subDays(now, 7);
        break;
      case '30d':
        startDate = subDays(now, 30);
        break;
      default:
        startDate = subDays(now, 1);
    }

    // Filter sessions by period
    const periodSessions = whatsappSessions.filter(session => 
      new Date(session.start_time) >= startDate
    );

    // Filter customers by period
    const periodCustomers = customers.filter(customer => 
      new Date(customer.created_at) >= startDate
    );

    // Calculate platform distribution
    const platformDist: Record<string, number> = {};
    customers.forEach(customer => {
      const platforms = customer.registered_platforms || [];
      platforms.forEach(platform => {
        platformDist[platform] = (platformDist[platform] || 0) + 1;
      });
    });

    // Calculate hourly activity
    const hourlyData = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      sessions: periodSessions.filter(session => 
        new Date(session.start_time).getHours() === hour
      ).length
    }));

    // Calculate top USSD codes (mock data based on existing codes)
    const topCodes = ussdCodes.slice(0, 5).map((code, index) => ({
      code: code.code,
      usage: Math.floor(Math.random() * 1000) + 100,
      successRate: 85 + Math.floor(Math.random() * 15)
    }));

    // Calculate session metrics
    const activeSessions = periodSessions.filter(s => s.status === 'active').length;
    const completedSessions = periodSessions.filter(s => s.status === 'ended').length;
    const avgDuration = periodSessions.reduce((acc, session) => {
      if (session.end_time) {
        const duration = new Date(session.end_time).getTime() - new Date(session.start_time).getTime();
        return acc + (duration / 1000 / 60); // minutes
      }
      return acc;
    }, 0) / Math.max(completedSessions, 1);

    setMetrics({
      totalSessions: periodSessions.length,
      activeSessions,
      avgSessionDuration: avgDuration,
      successRate: completedSessions > 0 ? (completedSessions / periodSessions.length) * 100 : 0,
      platformDistribution: platformDist,
      topUSSDCodes: topCodes,
      hourlyActivity: hourlyData,
      customerEngagement: {
        newUsers: periodCustomers.length,
        returningUsers: customers.length - periodCustomers.length,
        churnRate: Math.random() * 10 // Mock churn rate
      }
    });
  }, [whatsappSessions, customers, ussdCodes, selectedPeriod, loading]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const StatCard = ({ title, value, change, icon: Icon, color = "default" }: {
    title: string;
    value: string | number;
    change?: number;
    icon: any;
    color?: "default" | "green" | "red" | "blue";
  }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {change !== undefined && (
              <p className={`text-xs flex items-center mt-1 ${
                change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className="w-3 h-3 mr-1" />
                {change >= 0 ? '+' : ''}{change.toFixed(1)}%
              </p>
            )}
          </div>
          <div className={`p-3 rounded-full ${
            color === 'green' ? 'bg-green-100 text-green-600' :
            color === 'red' ? 'bg-red-100 text-red-600' :
            color === 'blue' ? 'bg-blue-100 text-blue-600' :
            'bg-primary/10 text-primary'
          }`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold flex items-center">
            <BarChart3 className="w-6 h-6 mr-2" />
            Analytics Dashboard
          </h2>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Sessions"
          value={formatNumber(metrics.totalSessions)}
          change={12.5}
          icon={Activity}
          color="blue"
        />
        <StatCard
          title="Active Sessions"
          value={formatNumber(metrics.activeSessions)}
          change={8.2}
          icon={Zap}
          color="green"
        />
        <StatCard
          title="Avg Duration"
          value={`${metrics.avgSessionDuration.toFixed(1)}m`}
          change={-2.1}
          icon={Clock}
          color="default"
        />
        <StatCard
          title="Success Rate"
          value={`${metrics.successRate.toFixed(1)}%`}
          change={1.8}
          icon={Target}
          color="green"
        />
      </div>

      {/* Platform Distribution & Top USSD Codes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Platform Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(metrics.platformDistribution).map(([platform, count]) => {
                const percentage = (count / Math.max(Object.values(metrics.platformDistribution).reduce((a, b) => a + b, 0), 1)) * 100;
                const Icon = platform === 'GSM' ? Smartphone : 
                           platform === 'WhatsApp' ? MessageSquare : Globe;
                
                return (
                  <div key={platform} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{platform}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Top USSD Codes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.topUSSDCodes.map((item, index) => (
                <div key={item.code} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="font-mono">{item.code}</Badge>
                    <div>
                      <p className="font-medium">Usage: {formatNumber(item.usage)}</p>
                      <p className="text-sm text-muted-foreground">
                        Success: {item.successRate}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.successRate >= 90 ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Engagement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Customer Engagement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{formatNumber(metrics.customerEngagement.newUsers)}</p>
              <p className="text-sm text-muted-foreground">New Users</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{formatNumber(metrics.customerEngagement.returningUsers)}</p>
              <p className="text-sm text-muted-foreground">Returning Users</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">{metrics.customerEngagement.churnRate.toFixed(1)}%</p>
              <p className="text-sm text-muted-foreground">Churn Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hourly Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Hourly Activity Pattern
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between space-x-1">
            {metrics.hourlyActivity.map((data) => {
              const maxSessions = Math.max(...metrics.hourlyActivity.map(d => d.sessions));
              const height = maxSessions > 0 ? (data.sessions / maxSessions) * 100 : 0;
              
              return (
                <div key={data.hour} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-primary rounded-t"
                    style={{ height: `${height}%` }}
                    title={`${data.hour}:00 - ${data.sessions} sessions`}
                  />
                  <span className="text-xs text-muted-foreground mt-2">
                    {data.hour.toString().padStart(2, '0')}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;