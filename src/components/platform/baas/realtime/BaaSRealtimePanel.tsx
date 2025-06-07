import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, Radio, MessageCircle, Users, Activity, 
  Webhook, Settings, CheckCircle, AlertTriangle,
  TrendingUp, Globe
} from 'lucide-react';

const BaaSRealtimePanel = () => {
  const [selectedChannel, setSelectedChannel] = useState('transactions');

  const realtimeChannels = [
    {
      id: 'transactions',
      name: 'Transaction Updates',
      type: 'database',
      status: 'active',
      connections: 12847,
      messages: '45.2K/min',
      latency: '12ms',
      icon: <Activity className="w-5 h-5" />,
      description: 'Real-time airtime and data transaction updates'
    },
    {
      id: 'notifications',
      name: 'Push Notifications',
      type: 'broadcast',
      status: 'active',
      connections: 8934,
      messages: '23.1K/min',
      latency: '8ms',
      icon: <MessageCircle className="w-5 h-5" />,
      description: 'Live notification delivery system'
    },
    {
      id: 'presence',
      name: 'User Presence',
      type: 'presence',
      status: 'active',
      connections: 5672,
      messages: '12.5K/min',
      latency: '15ms',
      icon: <Users className="w-5 h-5" />,
      description: 'Track online users and activity status'
    },
    {
      id: 'analytics',
      name: 'Analytics Stream',
      type: 'database',
      status: 'maintenance',
      connections: 2847,
      messages: '67.8K/min',
      latency: '25ms',
      icon: <TrendingUp className="w-5 h-5" />,
      description: 'Real-time analytics and metrics streaming'
    }
  ];

  const realtimeMetrics = [
    { label: 'Active Connections', value: '30.3K', change: '+8%', icon: <Globe className="w-4 h-4" /> },
    { label: 'Messages/Minute', value: '148.6K', change: '+15%', icon: <MessageCircle className="w-4 h-4" /> },
    { label: 'Avg Latency', value: '15ms', change: '-12%', icon: <Zap className="w-4 h-4" /> },
    { label: 'Uptime', value: '99.98%', change: '+0.1%', icon: <CheckCircle className="w-4 h-4" /> }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'maintenance': return <AlertTriangle className="w-4 h-4" />;
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'database': return <Activity className="w-4 h-4" />;
      case 'broadcast': return <Radio className="w-4 h-4" />;
      case 'presence': return <Users className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Real-time Metrics Overview */}
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
                  metric.change.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Real-time Channels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    <CardTitle className="text-lg">{channel.name}</CardTitle>
                    <p className="text-sm text-gray-600">{channel.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getStatusColor(channel.status)}>
                        {getStatusIcon(channel.status)}
                        <span className="ml-1 capitalize">{channel.status}</span>
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getTypeIcon(channel.type)}
                        <span className="capitalize">{channel.type}</span>
                      </Badge>
                    </div>
                  </div>
                </div>
                <Settings className="w-4 h-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-600">Connections</p>
                    <p className="text-sm font-semibold">{channel.connections.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Messages/min</p>
                    <p className="text-sm font-semibold">{channel.messages}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Latency</p>
                    <p className="text-sm font-semibold">{channel.latency}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <button className="flex-1 px-3 py-1 text-xs bg-cyan-50 text-cyan-700 rounded hover:bg-cyan-100 transition-colors">
                    <Radio className="w-3 h-3 inline mr-1" />
                    Monitor
                  </button>
                  <button className="flex-1 px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors">
                    <Webhook className="w-3 h-3 inline mr-1" />
                    Configure
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Channel Management Panel */}
      {selectedChannel && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Webhook className="w-5 h-5" />
              Channel Management - {realtimeChannels.find(c => c.id === selectedChannel)?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Configuration</h4>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    Channel Settings
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    Rate Limiting
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    Authentication
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Monitoring</h4>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    Connection Stats
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
                <h4 className="font-medium text-gray-900 mb-3">Operations</h4>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm bg-cyan-50 hover:bg-cyan-100 text-cyan-700 rounded-lg transition-colors">
                    Broadcast Message
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors">
                    Create Webhook
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg transition-colors">
                    Channel Cleanup
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BaaSRealtimePanel;
