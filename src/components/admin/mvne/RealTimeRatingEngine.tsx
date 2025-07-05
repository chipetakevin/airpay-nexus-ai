import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Zap, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  Activity, 
  CreditCard, 
  Target, 
  BarChart3,
  RefreshCw,
  Settings,
  AlertTriangle,
  CheckCircle,
  Phone,
  Wifi,
  MessageSquare
} from 'lucide-react';

interface RatingEvent {
  id: string;
  msisdn: string;
  serviceType: 'voice' | 'sms' | 'data';
  eventTime: string;
  duration: number;
  volume: number;
  rating: number;
  tariffPlan: string;
  status: 'rated' | 'pending' | 'failed';
  processingTime: number;
}

interface TariffPlan {
  id: string;
  name: string;
  type: 'prepaid' | 'postpaid';
  voiceRatePerMin: number;
  smsRatePerMsg: number;
  dataRatePerMB: number;
  activeSubscribers: number;
  status: 'active' | 'suspended';
}

interface RatingMetric {
  timestamp: string;
  eventsProcessed: number;
  successRate: number;
  avgProcessingTime: number;
  totalRevenue: number;
}

const RealTimeRatingEngine = () => {
  const [engineStatus, setEngineStatus] = useState('active');
  const [processingRate, setProcessingRate] = useState(1247);
  const [selectedService, setSelectedService] = useState('all');

  const [recentRatingEvents] = useState<RatingEvent[]>([
    {
      id: 'RE001',
      msisdn: '+27821234567',
      serviceType: 'voice',
      eventTime: '10:45:23',
      duration: 180,
      volume: 180,
      rating: 2.70,
      tariffPlan: 'Premium Voice',
      status: 'rated',
      processingTime: 12
    },
    {
      id: 'RE002',
      msisdn: '+27829876543',
      serviceType: 'data',
      eventTime: '10:45:25',
      duration: 0,
      volume: 150,
      rating: 7.50,
      tariffPlan: 'Data Unlimited',
      status: 'rated',
      processingTime: 8
    },
    {
      id: 'RE003',
      msisdn: '+27825555555',
      serviceType: 'sms',
      eventTime: '10:45:27',
      duration: 0,
      volume: 1,
      rating: 0.50,
      tariffPlan: 'Business SMS',
      status: 'rated',
      processingTime: 5
    },
    {
      id: 'RE004',
      msisdn: '+27827777777',
      serviceType: 'voice',
      eventTime: '10:45:30',
      duration: 45,
      volume: 45,
      rating: 0.68,
      tariffPlan: 'Basic Voice',
      status: 'pending',
      processingTime: 0
    }
  ]);

  const [tariffPlans] = useState<TariffPlan[]>([
    {
      id: 'TP001',
      name: 'Premium Voice',
      type: 'postpaid',
      voiceRatePerMin: 1.50,
      smsRatePerMsg: 0.50,
      dataRatePerMB: 0.05,
      activeSubscribers: 2840,
      status: 'active'
    },
    {
      id: 'TP002',
      name: 'Data Unlimited',
      type: 'prepaid',
      voiceRatePerMin: 1.20,
      smsRatePerMsg: 0.40,
      dataRatePerMB: 0.08,
      activeSubscribers: 1560,
      status: 'active'
    },
    {
      id: 'TP003',
      name: 'Business SMS',
      type: 'postpaid',
      voiceRatePerMin: 1.80,
      smsRatePerMsg: 0.30,
      dataRatePerMB: 0.06,
      activeSubscribers: 890,
      status: 'active'
    }
  ]);

  const ratingMetrics: RatingMetric[] = [
    { timestamp: '00:00', eventsProcessed: 890, successRate: 98.2, avgProcessingTime: 15, totalRevenue: 12540 },
    { timestamp: '04:00', eventsProcessed: 650, successRate: 97.8, avgProcessingTime: 18, totalRevenue: 8920 },
    { timestamp: '08:00', eventsProcessed: 1450, successRate: 99.1, avgProcessingTime: 12, totalRevenue: 18760 },
    { timestamp: '12:00', eventsProcessed: 1680, successRate: 98.7, avgProcessingTime: 14, totalRevenue: 22140 },
    { timestamp: '16:00', eventsProcessed: 1520, successRate: 99.3, avgProcessingTime: 11, totalRevenue: 19850 },
    { timestamp: '20:00', eventsProcessed: 1180, successRate: 98.9, avgProcessingTime: 13, totalRevenue: 15670 },
    { timestamp: '23:59', eventsProcessed: 920, successRate: 99.0, avgProcessingTime: 12, totalRevenue: 13480 }
  ];

  const serviceRevenueData = [
    { service: 'Voice', revenue: 45600, events: 12450, avgRate: 3.66 },
    { service: 'Data', revenue: 78900, events: 8920, avgRate: 8.84 },
    { service: 'SMS', revenue: 8750, events: 17500, avgRate: 0.50 },
    { service: 'Roaming', revenue: 15400, events: 1280, avgRate: 12.03 },
    { service: 'VAS', revenue: 6200, events: 890, avgRate: 6.97 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'rated':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'failed':
      case 'suspended':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'voice': return <Phone className="w-4 h-4 text-blue-600" />;
      case 'data': return <Wifi className="w-4 h-4 text-green-600" />;
      case 'sms': return <MessageSquare className="w-4 h-4 text-yellow-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProcessingRate(prev => Math.max(800, Math.min(2000, prev + Math.floor((Math.random() - 0.5) * 200))));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Real-Time Rating Engine</h2>
            <p className="text-muted-foreground">Instant charging, billing & tariff management</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="voice">Voice</SelectItem>
              <SelectItem value="data">Data</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="outline" className={getStatusColor(engineStatus)}>
            <Zap className="w-4 h-4 mr-1" />
            {engineStatus.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Engine Status Alert */}
      <Alert className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <span className="text-green-800 font-medium">
              Real-time rating engine processing {processingRate.toLocaleString()} events/minute with 99.1% success rate
            </span>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">
                <Clock className="w-3 h-3 mr-1" />
                Avg: 12ms
              </Badge>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Engine Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-blue-600" />
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                Live
              </Badge>
            </div>
            <div className="text-2xl font-bold text-blue-700">{processingRate.toLocaleString()}</div>
            <div className="text-sm text-blue-600">Events per Minute</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-700">99.1%</div>
            <div className="text-sm text-green-600">Success Rate</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-purple-600" />
              <Badge variant="secondary" className="text-xs">
                Sub-second
              </Badge>
            </div>
            <div className="text-2xl font-bold text-purple-700">12ms</div>
            <div className="text-sm text-purple-600">Avg Processing Time</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-orange-600" />
              <TrendingUp className="w-4 h-4 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-orange-700">R111.0K</div>
            <div className="text-sm text-orange-600">Revenue Today</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rating Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Rating Performance (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ratingMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="eventsProcessed" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="successRate" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    dot={{ fill: '#22c55e', strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Service Revenue Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Revenue by Service Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="service" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Rating Events */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Rating Events
              </CardTitle>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRatingEvents.map((event) => (
                <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getServiceIcon(event.serviceType)}
                      <span className="font-medium">{event.msisdn}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getStatusColor(event.status)}>
                        {event.status.toUpperCase()}
                      </Badge>
                      <span className="text-sm font-medium text-green-600">R{event.rating.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Service:</span> {event.serviceType.toUpperCase()}
                    </div>
                    <div>
                      <span className="font-medium">Time:</span> {event.eventTime}
                    </div>
                    <div>
                      <span className="font-medium">Volume:</span> {event.volume} {event.serviceType === 'voice' ? 'sec' : event.serviceType === 'data' ? 'MB' : 'msg'}
                    </div>
                    <div>
                      <span className="font-medium">Plan:</span> {event.tariffPlan}
                    </div>
                  </div>
                  {event.processingTime > 0 && (
                    <div className="text-xs text-gray-500 mt-2">
                      Processed in {event.processingTime}ms
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Tariff Plans */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Active Tariff Plans
              </CardTitle>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Manage Plans
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tariffPlans.map((plan) => (
                <div key={plan.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-purple-600" />
                      <span className="font-medium">{plan.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getStatusColor(plan.status)}>
                        {plan.status.toUpperCase()}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {plan.type.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-2">
                    <div>
                      <span className="font-medium">Voice:</span> R{plan.voiceRatePerMin}/min
                    </div>
                    <div>
                      <span className="font-medium">SMS:</span> R{plan.smsRatePerMsg}/msg
                    </div>
                    <div>
                      <span className="font-medium">Data:</span> R{plan.dataRatePerMB}/MB
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Active Subscribers:</span> {plan.activeSubscribers.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RealTimeRatingEngine;