import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Database, 
  Server, 
  Users, 
  Shield, 
  Activity, 
  Signal, 
  Network, 
  Phone, 
  Key, 
  MapPin,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Settings,
  Eye,
  Zap
} from 'lucide-react';

interface HLRRecord {
  id: string;
  msisdn: string;
  imsi: string;
  currentLocation: string;
  serviceProfile: string;
  status: 'active' | 'suspended' | 'inactive';
  lastUpdate: string;
  authenticationKeys: number;
}

interface HSSProfile {
  id: string;
  subscriberId: string;
  serviceCapabilities: string[];
  authenticationStatus: 'authenticated' | 'pending' | 'failed';
  mobilityStatus: 'roaming' | 'home' | 'unknown';
  qosProfile: string;
  lastActivity: string;
}

interface AuthenticationMetric {
  timestamp: string;
  successful: number;
  failed: number;
  pending: number;
  totalRequests: number;
}

const HLRHSSIntegration = () => {
  const [connectionStatus, setConnectionStatus] = useState({
    hlr: 'connected',
    hss: 'connected',
    diameter: 'connected',
    map: 'connected'
  });

  const [selectedNetwork, setSelectedNetwork] = useState('all');
  const [processingLoad, setProcessingLoad] = useState(78);

  const [hlrRecords] = useState<HLRRecord[]>([
    {
      id: 'HLR001',
      msisdn: '+27821234567',
      imsi: '655010123456789',
      currentLocation: 'MSC-001-LAC-1234',
      serviceProfile: 'Premium Data',
      status: 'active',
      lastUpdate: '2 min ago',
      authenticationKeys: 3
    },
    {
      id: 'HLR002',
      msisdn: '+27829876543',
      imsi: '655010987654321',
      currentLocation: 'MSC-002-LAC-5678',
      serviceProfile: 'Basic Voice',
      status: 'active',
      lastUpdate: '5 min ago',
      authenticationKeys: 2
    },
    {
      id: 'HLR003',
      msisdn: '+27825555555',
      imsi: '655010555555555',
      currentLocation: 'MSC-001-LAC-9999',
      serviceProfile: 'Enterprise',
      status: 'suspended',
      lastUpdate: '1 hour ago',
      authenticationKeys: 4
    }
  ]);

  const [hssProfiles] = useState<HSSProfile[]>([
    {
      id: 'HSS001',
      subscriberId: 'SUB-001',
      serviceCapabilities: ['IMS', 'VoLTE', '5G-SA'],
      authenticationStatus: 'authenticated',
      mobilityStatus: 'home',
      qosProfile: 'Gold',
      lastActivity: '1 min ago'
    },
    {
      id: 'HSS002',
      subscriberId: 'SUB-002', 
      serviceCapabilities: ['IMS', 'VoLTE'],
      authenticationStatus: 'authenticated',
      mobilityStatus: 'roaming',
      qosProfile: 'Silver',
      lastActivity: '3 min ago'
    }
  ]);

  const authenticationData: AuthenticationMetric[] = [
    { timestamp: '00:00', successful: 450, failed: 12, pending: 8, totalRequests: 470 },
    { timestamp: '04:00', successful: 320, failed: 8, pending: 5, totalRequests: 333 },
    { timestamp: '08:00', successful: 780, failed: 15, pending: 12, totalRequests: 807 },
    { timestamp: '12:00', successful: 920, failed: 18, pending: 15, totalRequests: 953 },
    { timestamp: '16:00', successful: 850, failed: 22, pending: 18, totalRequests: 890 },
    { timestamp: '20:00', successful: 680, failed: 14, pending: 10, totalRequests: 704 },
    { timestamp: '23:59', successful: 520, failed: 9, pending: 7, totalRequests: 536 }
  ];

  const mobilityData = [
    { location: 'MSC-001', subscribers: 1250, handovers: 89, success_rate: 98.2 },
    { location: 'MSC-002', subscribers: 980, handovers: 67, success_rate: 97.8 },
    { location: 'MSC-003', subscribers: 1450, handovers: 112, success_rate: 98.9 },
    { location: 'MSC-004', subscribers: 890, handovers: 45, success_rate: 99.1 },
    { location: 'Roaming', subscribers: 234, handovers: 23, success_rate: 96.5 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
      case 'authenticated': 
        return 'text-green-600 bg-green-50 border-green-200';
      case 'pending':
      case 'suspended':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'disconnected':
      case 'inactive':
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200';
      default: 
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProcessingLoad(prev => Math.max(60, Math.min(95, prev + (Math.random() - 0.5) * 10)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
            <Database className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">HLR/HSS Core Integration</h2>
            <p className="text-muted-foreground">Subscriber management, authentication & mobility services</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Networks</SelectItem>
              <SelectItem value="2g">2G/GSM</SelectItem>
              <SelectItem value="3g">3G/UMTS</SelectItem>
              <SelectItem value="4g">4G/LTE</SelectItem>
              <SelectItem value="5g">5G/NR</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
            Live Integration
          </Badge>
        </div>
      </div>

      {/* Connection Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Database className="w-8 h-8 text-blue-600" />
              <Badge variant="outline" className={getStatusColor(connectionStatus.hlr)}>
                {connectionStatus.hlr.toUpperCase()}
              </Badge>
            </div>
            <h3 className="font-semibold text-gray-900">HLR Connection</h3>
            <p className="text-sm text-gray-600 mt-1">Home Location Register</p>
            <div className="mt-3">
              <Progress value={95} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">95% Availability</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Shield className="w-8 h-8 text-purple-600" />
              <Badge variant="outline" className={getStatusColor(connectionStatus.hss)}>
                {connectionStatus.hss.toUpperCase()}
              </Badge>
            </div>
            <h3 className="font-semibold text-gray-900">HSS Connection</h3>
            <p className="text-sm text-gray-600 mt-1">Home Subscriber Server</p>
            <div className="mt-3">
              <Progress value={97} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">97% Availability</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Network className="w-8 h-8 text-green-600" />
              <Badge variant="outline" className={getStatusColor(connectionStatus.diameter)}>
                {connectionStatus.diameter.toUpperCase()}
              </Badge>
            </div>
            <h3 className="font-semibold text-gray-900">Diameter Protocol</h3>
            <p className="text-sm text-gray-600 mt-1">Authentication & Authorization</p>
            <div className="mt-3">
              <Progress value={99} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">99% Success Rate</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Signal className="w-8 h-8 text-orange-600" />
              <Badge variant="outline" className={getStatusColor(connectionStatus.map)}>
                {connectionStatus.map.toUpperCase()}
              </Badge>
            </div>
            <h3 className="font-semibold text-gray-900">MAP Protocol</h3>
            <p className="text-sm text-gray-600 mt-1">Mobile Application Part</p>
            <div className="mt-3">
              <Progress value={94} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">94% Success Rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Processing Load Alert */}
      <Alert className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white">
        <Activity className="h-4 w-4 text-blue-600" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <span className="text-blue-800 font-medium">
              Current processing load: {processingLoad}% - System operating within normal parameters
            </span>
            <div className="flex items-center gap-2">
              <Progress value={processingLoad} className="w-20 h-2" />
              <Badge className="bg-blue-100 text-blue-800">
                {hlrRecords.length + hssProfiles.length} Active Sessions
              </Badge>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Authentication Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              Authentication Performance (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={authenticationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="successful" 
                    stackId="1"
                    stroke="#22c55e" 
                    fill="#22c55e" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="failed" 
                    stackId="1"
                    stroke="#ef4444" 
                    fill="#ef4444" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="pending" 
                    stackId="1"
                    stroke="#f59e0b" 
                    fill="#f59e0b" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Mobility Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Mobility & Location Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mobilityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="location" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="subscribers" fill="#3b82f6" />
                  <Bar dataKey="handovers" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* HLR Records */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Active HLR Records
              </CardTitle>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hlrRecords.map((record) => (
                <div key={record.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">{record.msisdn}</span>
                    </div>
                    <Badge variant="outline" className={getStatusColor(record.status)}>
                      {record.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">IMSI:</span> {record.imsi}
                    </div>
                    <div>
                      <span className="font-medium">Location:</span> {record.currentLocation}
                    </div>
                    <div>
                      <span className="font-medium">Profile:</span> {record.serviceProfile}
                    </div>
                    <div>
                      <span className="font-medium">Keys:</span> {record.authenticationKeys}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Last updated: {record.lastUpdate}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* HSS Profiles */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                HSS Subscriber Profiles
              </CardTitle>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Manage
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hssProfiles.map((profile) => (
                <div key={profile.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span className="font-medium">{profile.subscriberId}</span>
                    </div>
                    <Badge variant="outline" className={getStatusColor(profile.authenticationStatus)}>
                      {profile.authenticationStatus.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {profile.serviceCapabilities.map((capability, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {capability}
                        </Badge>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Mobility:</span> {profile.mobilityStatus}
                      </div>
                      <div>
                        <span className="font-medium">QoS:</span> {profile.qosProfile}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Last activity: {profile.lastActivity}
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

export default HLRHSSIntegration;