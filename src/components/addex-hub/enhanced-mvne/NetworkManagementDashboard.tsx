import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Network,
  Layers,
  Signal,
  Globe,
  Settings,
  AlertTriangle,
  TrendingUp,
  Activity,
  Zap,
  Shield,
  Radio,
  MonitorSpeaker
} from 'lucide-react';

export default function NetworkManagementDashboard() {
  const [selectedNetwork, setSelectedNetwork] = useState('5g');

  const networkStats = {
    '5g': { coverage: 85, capacity: 78, quality: 92, subscribers: 245000 },
    '4g': { coverage: 98, capacity: 65, quality: 88, subscribers: 1200000 },
    '3g': { coverage: 99, capacity: 45, quality: 75, subscribers: 350000 },
    '2g': { coverage: 100, capacity: 30, quality: 70, subscribers: 80000 }
  };

  const networkSlices = [
    { id: 'eMBB', name: 'Enhanced Mobile Broadband', subscribers: 850000, bandwidth: '2.5 Gbps', latency: '15ms', status: 'optimal' },
    { id: 'URLLC', name: 'Ultra Reliable Low Latency', subscribers: 25000, bandwidth: '500 Mbps', latency: '1ms', status: 'optimal' },
    { id: 'mMTC', name: 'Massive Machine Type Communications', subscribers: 2500000, bandwidth: '100 Mbps', latency: '100ms', status: 'congested' }
  ];

  const qosPolicies = [
    { name: 'Premium Voice', priority: 1, bandwidth: '64 kbps', jitter: '<5ms', status: 'active' },
    { name: 'Video Streaming', priority: 2, bandwidth: '10 Mbps', jitter: '<20ms', status: 'active' },
    { name: 'IoT Data', priority: 3, bandwidth: '1 Mbps', jitter: '<100ms', status: 'active' },
    { name: 'Best Effort', priority: 4, bandwidth: 'Variable', jitter: 'Variable', status: 'active' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Network Management</h2>
          <p className="text-muted-foreground">Advanced network slicing and QoS management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
          <Button size="sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="slicing">Network Slicing</TabsTrigger>
          <TabsTrigger value="qos">QoS Policies</TabsTrigger>
          <TabsTrigger value="capacity">Capacity Planning</TabsTrigger>
          <TabsTrigger value="monitoring">Real-time Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(networkStats).map(([network, stats]) => (
              <Card key={network} className={`cursor-pointer transition-all ${selectedNetwork === network ? 'ring-2 ring-primary' : ''}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium uppercase">{network}</CardTitle>
                  <Radio className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.subscribers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Active Subscribers</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Coverage</span>
                      <span>{stats.coverage}%</span>
                    </div>
                    <Progress value={stats.coverage} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Network Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Overall Performance</span>
                  <Badge variant="default">Optimal</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Latency</span>
                    <span>12ms</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Throughput</span>
                    <span>2.8 Gbps</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Availability</span>
                    <span>99.98%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Active Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    High traffic on mMTC slice - Consider scaling
                  </AlertDescription>
                </Alert>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Planned maintenance: Core Network - 02:00 UTC
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="slicing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Layers className="w-5 h-5 mr-2" />
                5G Network Slices
              </CardTitle>
              <CardDescription>
                Manage and monitor network slice performance and allocation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {networkSlices.map((slice) => (
                  <div key={slice.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{slice.name}</h4>
                        <p className="text-sm text-muted-foreground">ID: {slice.id}</p>
                      </div>
                      <Badge variant={slice.status === 'optimal' ? 'default' : 'destructive'}>
                        {slice.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Subscribers</span>
                        <p className="font-medium">{slice.subscribers.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Bandwidth</span>
                        <p className="font-medium">{slice.bandwidth}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Latency</span>
                        <p className="font-medium">{slice.latency}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Configure</Button>
                        <Button variant="outline" size="sm">Monitor</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="qos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Quality of Service Policies
              </CardTitle>
              <CardDescription>
                Dynamic QoS management and policy enforcement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {qosPolicies.map((policy, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{policy.name}</h4>
                        <p className="text-sm text-muted-foreground">Priority Level: {policy.priority}</p>
                      </div>
                      <Badge variant="default">{policy.status}</Badge>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Bandwidth</span>
                        <p className="font-medium">{policy.bandwidth}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Jitter</span>
                        <p className="font-medium">{policy.jitter}</p>
                      </div>
                      <div className="flex gap-2 col-span-2">
                        <Button variant="outline" size="sm">Edit Policy</Button>
                        <Button variant="outline" size="sm">View Analytics</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="capacity" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Capacity Forecasting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current Utilization</span>
                    <span>67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Predicted (30 days)</span>
                    <span>82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>
                    Recommended: Scale network capacity by 25% within 2 weeks
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Geographic Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Urban Areas</span>
                    <div className="flex items-center gap-2">
                      <Progress value={85} className="w-20 h-2" />
                      <span className="text-sm">85%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Suburban</span>
                    <div className="flex items-center gap-2">
                      <Progress value={72} className="w-20 h-2" />
                      <span className="text-sm">72%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Rural</span>
                    <div className="flex items-center gap-2">
                      <Progress value={45} className="w-20 h-2" />
                      <span className="text-sm">45%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MonitorSpeaker className="w-5 h-5 mr-2" />
                  Real-time Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">2,847</div>
                  <p className="text-sm text-muted-foreground">Active Sessions</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">15.2ms</div>
                  <p className="text-sm text-muted-foreground">Avg Latency</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">99.97%</div>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Signal className="w-5 h-5 mr-2" />
                  Signal Quality
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>RSRP</span>
                    <span>-95 dBm</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>RSRQ</span>
                    <span>-8 dB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>SINR</span>
                    <span>18 dB</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Network Security</span>
                  <Badge variant="default">Secure</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Threat Level</span>
                  <Badge variant="default">Low</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Firewall Status</span>
                  <Badge variant="default">Active</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}