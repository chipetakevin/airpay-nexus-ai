import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  MessageSquare, 
  Send, 
  Inbox, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  TrendingUp,
  Activity,
  Server,
  Database,
  RefreshCw,
  Settings,
  Eye,
  Filter,
  Search
} from 'lucide-react';

interface SMSMessage {
  id: string;
  sender: string;
  recipient: string;
  content: string;
  timestamp: string;
  status: 'delivered' | 'pending' | 'failed' | 'expired';
  messageType: 'MT' | 'MO' | 'DR';
  priority: 'high' | 'normal' | 'low';
  retryCount: number;
}

interface SMSCStats {
  timestamp: string;
  messagesReceived: number;
  messagesDelivered: number;
  messagesFailed: number;
  queueSize: number;
  throughput: number;
}

interface RoutingRule {
  id: string;
  name: string;
  sourcePattern: string;
  destinationPattern: string;
  priority: number;
  status: 'active' | 'suspended';
  messagesRouted: number;
}

const SMSCManagement = () => {
  const [smscStatus, setSMSCStatus] = useState('operational');
  const [throughput, setThroughput] = useState(1247);
  const [queueSize, setQueueSize] = useState(89);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const [recentMessages] = useState<SMSMessage[]>([
    {
      id: 'SMS001',
      sender: '+27821234567',
      recipient: '+27829876543',
      content: 'Your OTP is 123456. Valid for 5 minutes.',
      timestamp: '14:45:23',
      status: 'delivered',
      messageType: 'MT',
      priority: 'high',
      retryCount: 0
    },
    {
      id: 'SMS002',
      sender: '+27825555555',
      recipient: '12345',
      content: 'BALANCE',
      timestamp: '14:45:25',
      status: 'delivered',
      messageType: 'MO',
      priority: 'normal',
      retryCount: 0
    },
    {
      id: 'SMS003',
      sender: '+27827777777',
      recipient: '+27821111111',
      content: 'Meeting confirmed for tomorrow at 10 AM',
      timestamp: '14:45:27',
      status: 'pending',
      messageType: 'MT',
      priority: 'normal',
      retryCount: 1
    },
    {
      id: 'SMS004',
      sender: '+27829999999',
      recipient: '+27823333333',
      content: 'Your payment has been processed successfully',
      timestamp: '14:45:30',
      status: 'failed',
      messageType: 'MT',
      priority: 'high',
      retryCount: 3
    }
  ]);

  const [routingRules] = useState<RoutingRule[]>([
    {
      id: 'RR001',
      name: 'Vodacom Mobile Terminated',
      sourcePattern: '*',
      destinationPattern: '+2782*',
      priority: 1,
      status: 'active',
      messagesRouted: 45670
    },
    {
      id: 'RR002',
      name: 'MTN Mobile Terminated',
      sourcePattern: '*',
      destinationPattern: '+2783*',
      priority: 1,
      status: 'active',
      messagesRouted: 38940
    },
    {
      id: 'RR003',
      name: 'Cell C Mobile Terminated',
      sourcePattern: '*',
      destinationPattern: '+2784*',
      priority: 1,
      status: 'active',
      messagesRouted: 28560
    },
    {
      id: 'RR004',
      name: 'Short Code Services',
      sourcePattern: '*',
      destinationPattern: '12345',
      priority: 2,
      status: 'active',
      messagesRouted: 15680
    }
  ]);

  const smscStats: SMSCStats[] = [
    { timestamp: '00:00', messagesReceived: 1200, messagesDelivered: 1180, messagesFailed: 20, queueSize: 45, throughput: 950 },
    { timestamp: '04:00', messagesReceived: 800, messagesDelivered: 785, messagesFailed: 15, queueSize: 32, throughput: 750 },
    { timestamp: '08:00', messagesReceived: 1800, messagesDelivered: 1765, messagesFailed: 35, queueSize: 78, throughput: 1420 },
    { timestamp: '12:00', messagesReceived: 2200, messagesDelivered: 2145, messagesFailed: 55, queueSize: 95, throughput: 1680 },
    { timestamp: '16:00', messagesReceived: 1950, messagesDelivered: 1910, messagesFailed: 40, queueSize: 67, throughput: 1520 },
    { timestamp: '20:00', messagesReceived: 1600, messagesDelivered: 1580, messagesFailed: 20, queueSize: 48, throughput: 1200 },
    { timestamp: '23:59', messagesReceived: 1100, messagesDelivered: 1085, messagesFailed: 15, queueSize: 38, throughput: 890 }
  ];

  const networkPerformanceData = [
    { network: 'Vodacom', delivered: 45670, failed: 890, success_rate: 98.1 },
    { network: 'MTN', delivered: 38940, failed: 720, success_rate: 98.2 },
    { network: 'Cell C', delivered: 28560, failed: 680, success_rate: 97.7 },
    { network: 'Telkom', delivered: 19450, failed: 520, success_rate: 97.4 },
    { network: 'International', delivered: 8940, failed: 450, success_rate: 95.2 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
      case 'operational':
      case 'active':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'failed':
      case 'expired':
      case 'suspended':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'MT': return 'bg-blue-100 text-blue-800';
      case 'MO': return 'bg-green-100 text-green-800';
      case 'DR': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setThroughput(prev => Math.max(800, Math.min(2000, prev + Math.floor((Math.random() - 0.5) * 200))));
      setQueueSize(prev => Math.max(0, Math.min(200, prev + Math.floor((Math.random() - 0.5) * 20))));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">SMSC Management</h2>
            <p className="text-muted-foreground">SMS Center operations, routing & delivery management</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Messages</SelectItem>
              <SelectItem value="MT">Mobile Terminated</SelectItem>
              <SelectItem value="MO">Mobile Originated</SelectItem>
              <SelectItem value="DR">Delivery Reports</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="outline" className={getStatusColor(smscStatus)}>
            <MessageSquare className="w-4 h-4 mr-1" />
            {smscStatus.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* SMSC Status Alert */}
      <Alert className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <span className="text-green-800 font-medium">
              SMSC operational - Processing {throughput.toLocaleString()} messages/minute with queue size of {queueSize}
            </span>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">
                <TrendingUp className="w-3 h-3 mr-1" />
                98.1% Success Rate
              </Badge>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* SMSC Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-blue-600" />
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                Live
              </Badge>
            </div>
            <div className="text-2xl font-bold text-blue-700">{throughput.toLocaleString()}</div>
            <div className="text-sm text-blue-600">Messages per Minute</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-700">98.1%</div>
            <div className="text-sm text-green-600">Delivery Success Rate</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Inbox className="w-8 h-8 text-purple-600" />
              <Badge variant="secondary" className="text-xs">
                Queue
              </Badge>
            </div>
            <div className="text-2xl font-bold text-purple-700">{queueSize}</div>
            <div className="text-sm text-purple-600">Messages in Queue</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Server className="w-8 h-8 text-orange-600" />
              <Badge variant="outline" className="bg-orange-100 text-orange-700">
                Active
              </Badge>
            </div>
            <div className="text-2xl font-bold text-orange-700">{routingRules.filter(r => r.status === 'active').length}</div>
            <div className="text-sm text-orange-600">Routing Rules</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SMS Traffic Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              SMS Traffic Analytics (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={smscStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="messagesDelivered" 
                    stackId="1"
                    stroke="#22c55e" 
                    fill="#22c55e" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="messagesFailed" 
                    stackId="1"
                    stroke="#ef4444" 
                    fill="#ef4444" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Network Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Network Delivery Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={networkPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="network" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="delivered" fill="#3b82f6" />
                  <Bar dataKey="success_rate" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent SMS Messages */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Recent SMS Messages
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4 text-orange-600" />
                      <span className="font-medium">{message.sender}</span>
                      <span className="text-gray-400">→</span>
                      <span className="text-sm text-gray-600">{message.recipient}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getMessageTypeColor(message.messageType)}>
                        {message.messageType}
                      </Badge>
                      <Badge className={getPriorityColor(message.priority)}>
                        {message.priority.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(message.status)}>
                        {message.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 mb-2 bg-gray-50 p-2 rounded">
                    {message.content}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Time: {message.timestamp}</span>
                    {message.retryCount > 0 && (
                      <span className="text-yellow-600">Retries: {message.retryCount}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Routing Rules */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                SMS Routing Rules
              </CardTitle>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Manage Rules
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {routingRules.map((rule) => (
                <div key={rule.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-purple-600" />
                      <span className="font-medium">{rule.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        Priority {rule.priority}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(rule.status)}>
                        {rule.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2">
                    <div>
                      <span className="font-medium">Source:</span> {rule.sourcePattern}
                    </div>
                    <div>
                      <span className="font-medium">Destination:</span> {rule.destinationPattern}
                    </div>
                    <div>
                      <span className="font-medium">Messages Routed:</span> {rule.messagesRouted.toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Priority:</span> {rule.priority}
                    </div>
                  </div>
                  <Progress value={(rule.messagesRouted / 50000) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SMSCManagement;