
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Zap, Radio, MessageSquare, Users, Activity, 
  Globe, CheckCircle, AlertTriangle, Clock,
  Wifi, Signal, Broadcast, Bell
} from 'lucide-react';

const BaaSRealtimePanel = () => {
  const [selectedChannel, setSelectedChannel] = useState('transactions');

  const realtimeChannels = [
    {
      id: 'transactions',
      name: 'Transaction Updates',
      type: 'broadcast',
      connections: '12,847',
      messages: '45.2K/min',
      latency: '12ms',
      status: 'active',
      icon: <Activity className="w-5 h-5" />
    },
    {
      id: 'notifications',
      name: 'Push Notifications',
      type: 'pubsub',
      connections: '8,956',
      messages: '28.7K/min',
      latency: '8ms',
      status: 'active',
      icon: <Bell className="w-5 h-5" />
    },
    {
      id: 'chat',
      name: 'Customer Support',
      type: 'websocket',
      connections: '2,384',
      messages: '12.1K/min',
      latency: '15ms',
      status: 'active',
      icon: <MessageSquare className="w-5 h-5" />
    },
    {
      id: 'presence',
      name: 'User Presence',
      type: 'presence',
      connections: '15,642',
      messages: '6.8K/min',
      latency: '5ms',
      status: 'active',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 'system',
      name: 'System Status',
      type: 'broadcast',
      connections: '892',
      messages: '1.2K/min',
      latency: '10ms',
      status: 'monitoring',
      icon: <Signal className="w-5 h-5" />
    },
    {
      id: 'analytics',
      name: 'Live Analytics',
      type: 'stream',
      connections: '1,567',
      messages: '89.4K/min',
      latency: '3ms',
      status: 'active',
      icon: <Globe className="w-5 h-5" />
    }
  ];

  const realtimeMetrics = [
    { label: 'Active Connections', value: '42.3K', change: '+8%', icon: <Wifi className="w-4 h-4" /> },
    { label: 'Messages/Minute', value: '183.4K', change: '+12%', icon: <Radio className="w-4 h-4" /> },
    { label: 'Avg Latency', value: '9ms', change: '-2ms', icon: <Zap className="w-4 h-4" /> },
    { label: 'Uptime', value: '99.98%', change: '+0.01%', icon: <CheckCircle className="w-4 h-4" /> }
  ];

  const connectionsByRegion = [
    { region: 'South Africa', connections: '18,247', latency: '5ms', percentage: '43%' },
    { region: 'Sub-Saharan Africa', connections: '12,896', latency: '12ms', percentage: '30%' },
    { region: 'Europe', connections: '6,745', latency: '45ms', percentage: '16%' },
    { region: 'North America', connections: '3,567', latency: '78ms', percentage: '8%' },
    { region: 'Asia Pacific', connections: '1,237', latency: '89ms', percentage: '3%' }
  ];

  const recentEvents = [
    { type: 'connection', message: 'New WebSocket connection from mobile app', time: '2 seconds ago', status: 'info' },
    { type: 'transaction', message: 'R 1,250 airtime purchase completed', time: '5 seconds ago', status: 'success' },
    { type: 'notification', message: 'Push notification sent to 2,847 users', time: '12 seconds ago', status: 'info' },
    { type: 'error', message: 'Connection timeout for user session', time: '45 seconds ago', status: 'warning' },
    { type: 'broadcast', message: 'System maintenance alert broadcast', time: '2 minutes ago', status: 'info' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'monitoring': return 'text-orange-600 bg-orange-50';
      case 'inactive': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'monitoring': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'connection': return <Wifi className="w-4 h-4" />;
      case 'transaction': return <Activity className="w-4 h-4" />;
      case 'notification': return <Bell className="w-4 h-4" />;
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      case 'broadcast': return <Broadcast className="w-4 h-4" />;
      default: return <Radio className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {realtimeMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-cyan-50 rounded-lg text-cyan-600">
                    {metric.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">{metric.label}</p>
                    <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  metric.change.startsWith('+') || (metric.change.startsWith('-') && metric.label === 'Avg Latency')
                    ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Real-time Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {realtimeChannels.map((channel) => (
          <Card 
            key={channel.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedChannel === channel.id ? 'ring-2 ring-cyan-500 shadow-lg' : ''
            }`}
            onClick={() => setSelectedChannel(channel.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-50 rounded-lg text-cyan-600">
                    {channel.icon}
                  </div>
                  <div>
                    <CardTitle className="text-base">{channel.name}</CardTitle>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span>{channel.type}</span>
                      <span>•</span>
                      <span>{channel.connections} connections</span>
                    </div>
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${getStatusColor(channel.status)}`}>
                  {getStatusIcon(channel.status)}
                  <span className="capitalize">{channel.status}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600">Messages/min</p>
                  <p className="text-sm font-semibold">{channel.messages}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Latency</p>
                  <p className="text-sm font-semibold text-green-600">{channel.latency}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Geographic Distribution & Real-time Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Global Connections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {connectionsByRegion.map((region, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{region.region}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-gray-600">{region.connections} connections</span>
                      <span className="text-xs text-gray-600">{region.latency} latency</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-cyan-600">{region.percentage}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Real-time Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentEvents.map((event, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-1.5 rounded-lg ${
                    event.status === 'success' ? 'bg-green-100 text-green-600' :
                    event.status === 'warning' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {getEventIcon(event.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{event.message}</p>
                    <p className="text-xs text-gray-600">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Channel Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio className="w-5 h-5" />
            Channel Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Broadcasting</h4>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm bg-cyan-50 hover:bg-cyan-100 text-cyan-700 rounded-lg transition-colors">
                  Send Global Message
                </button>
                <button className="w-full text-left px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors">
                  Channel Broadcast
                </button>
                <button className="w-full text-left px-3 py-2 text-sm bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors">
                  System Alert
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Monitoring</h4>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  Connection Logs
                </button>
                <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  Message Analytics
                </button>
                <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  Performance Metrics
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Configuration</h4>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors">
                  Channel Settings
                </button>
                <button className="w-full text-left px-3 py-2 text-sm bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg transition-colors">
                  Rate Limiting
                </button>
                <button className="w-full text-left px-3 py-2 text-sm bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors">
                  Emergency Stop
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BaaSRealtimePanel;
