import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Lock, 
  Key, 
  UserCheck, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  RefreshCw,
  Settings,
  Users,
  FileText
} from 'lucide-react';

interface SecurityMetric {
  category: string;
  score: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  issues: number;
}

interface AuthSession {
  id: string;
  userId: string;
  userRole: string;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
  lastActivity: string;
  status: 'active' | 'expired' | 'revoked';
}

interface SecurityEvent {
  id: string;
  type: 'login' | 'logout' | 'failed_auth' | 'permission_denied' | 'suspicious_activity';
  userId?: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  ipAddress: string;
}

const SecurityLayer = () => {
  const [securityScore, setSecurityScore] = useState(94);
  const [threatsBlocked, setThreatsBlocked] = useState(1247);

  const securityMetrics: SecurityMetric[] = [
    { category: 'Authentication', score: 98, status: 'excellent', issues: 0 },
    { category: 'Authorization', score: 95, status: 'excellent', issues: 2 },
    { category: 'Data Encryption', score: 97, status: 'excellent', issues: 1 },
    { category: 'Network Security', score: 89, status: 'good', issues: 3 },
    { category: 'Audit Logging', score: 100, status: 'excellent', issues: 0 },
    { category: 'Compliance', score: 92, status: 'good', issues: 4 }
  ];

  const activeSessions: AuthSession[] = [
    {
      id: 'SES001',
      userId: 'ADM001',
      userRole: 'admin',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      createdAt: '2 hours ago',
      lastActivity: '5 min ago',
      status: 'active'
    },
    {
      id: 'SES002',
      userId: 'OPR001',
      userRole: 'operator',
      ipAddress: '10.0.0.45',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X)',
      createdAt: '30 min ago',
      lastActivity: '2 min ago',
      status: 'active'
    },
    {
      id: 'SES003',
      userId: 'SUP001',
      userRole: 'support',
      ipAddress: '172.16.0.22',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
      createdAt: '1 hour ago',
      lastActivity: '15 min ago',
      status: 'active'
    }
  ];

  const securityEvents: SecurityEvent[] = [
    {
      id: 'EVT001',
      type: 'failed_auth',
      userId: 'unknown',
      description: 'Multiple failed login attempts from 203.0.113.42',
      severity: 'high',
      timestamp: '2 min ago',
      ipAddress: '203.0.113.42'
    },
    {
      id: 'EVT002',
      type: 'login',
      userId: 'ADM001',
      description: 'Admin user logged in successfully',
      severity: 'low',
      timestamp: '2 hours ago',
      ipAddress: '192.168.1.100'
    },
    {
      id: 'EVT003',
      type: 'suspicious_activity',
      userId: 'OPR002',
      description: 'Unusual API access pattern detected',
      severity: 'medium',
      timestamp: '1 hour ago',
      ipAddress: '10.0.0.67'
    },
    {
      id: 'EVT004',
      type: 'permission_denied',
      userId: 'SUP003',
      description: 'Attempted access to restricted resource',
      severity: 'medium',
      timestamp: '45 min ago',
      ipAddress: '172.16.0.33'
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
      case 'active':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'good':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'warning':
      case 'expired':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical':
      case 'revoked':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'login': return <UserCheck className="w-4 h-4 text-green-600" />;
      case 'logout': return <Eye className="w-4 h-4 text-blue-600" />;
      case 'failed_auth': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'permission_denied': return <Lock className="w-4 h-4 text-orange-600" />;
      case 'suspicious_activity': return <Shield className="w-4 h-4 text-purple-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setThreatsBlocked(prev => prev + Math.floor(Math.random() * 3));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Security Layer</h2>
            <p className="text-muted-foreground">Authentication, authorization & threat protection</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Shield className="w-4 h-4 mr-1" />
            SECURE
          </Badge>
        </div>
      </div>

      {/* Security Status Alert */}
      <Alert className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <span className="text-green-800 font-medium">
              Security systems operational - {threatsBlocked.toLocaleString()} threats blocked today
            </span>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">
                <Shield className="w-3 h-3 mr-1" />
                Score: {securityScore}%
              </Badge>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Security Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Shield className="w-8 h-8 text-green-600" />
              <Badge variant="outline" className="bg-green-100 text-green-700">
                Overall
              </Badge>
            </div>
            <div className={`text-2xl font-bold ${getScoreColor(securityScore)}`}>{securityScore}%</div>
            <div className="text-sm text-green-600">Security Score</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500 bg-gradient-to-br from-red-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <Badge variant="outline" className="bg-red-100 text-red-700">
                Today
              </Badge>
            </div>
            <div className="text-2xl font-bold text-red-700">{threatsBlocked.toLocaleString()}</div>
            <div className="text-sm text-red-600">Threats Blocked</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-600" />
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                Active
              </Badge>
            </div>
            <div className="text-2xl font-bold text-blue-700">{activeSessions.length}</div>
            <div className="text-sm text-blue-600">User Sessions</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-8 h-8 text-purple-600" />
              <Badge variant="outline" className="bg-purple-100 text-purple-700">
                Compliant
              </Badge>
            </div>
            <div className="text-2xl font-bold text-purple-700">100%</div>
            <div className="text-sm text-purple-600">Audit Coverage</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="events">Security Events</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Security Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{metric.category}</CardTitle>
                    <Badge variant="outline" className={getStatusColor(metric.status)}>
                      {metric.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Security Score</span>
                      <span className={`font-medium ${getScoreColor(metric.score)}`}>
                        {metric.score}%
                      </span>
                    </div>
                    <Progress value={metric.score} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Issues Found:</span>
                    <span className={`font-medium ${metric.issues > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                      {metric.issues}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Active User Sessions
                </CardTitle>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeSessions.map((session) => (
                  <div key={session.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">{session.userId}</span>
                        <Badge variant="secondary" className="text-xs">
                          {session.userRole}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(session.status)}>
                          {session.status.toUpperCase()}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <EyeOff className="w-3 h-3 mr-1" />
                          Revoke
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">IP Address:</span> {session.ipAddress}
                      </div>
                      <div>
                        <span className="font-medium">Created:</span> {session.createdAt}
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">User Agent:</span> {session.userAgent}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Last activity: {session.lastActivity}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Security Events
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityEvents.map((event) => (
                  <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getEventIcon(event.type)}
                        <span className="font-medium capitalize">{event.type.replace('_', ' ')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getSeverityColor(event.severity)}>
                          {event.severity.toUpperCase()}
                        </Badge>
                        <span className="text-sm text-gray-500">{event.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{event.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                      <div>
                        <span className="font-medium">IP Address:</span> {event.ipAddress}
                      </div>
                      {event.userId && (
                        <div>
                          <span className="font-medium">User ID:</span> {event.userId}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  Authentication Policies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">JWT Token Expiry</span>
                    <Badge variant="secondary">24 hours</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Multi-Factor Authentication</span>
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Password Complexity</span>
                    <Badge className="bg-green-100 text-green-800">Strong</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Session Timeout</span>
                    <Badge variant="secondary">2 hours</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Authorization Policies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Role-Based Access Control</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Rate Limiting</span>
                    <Badge className="bg-green-100 text-green-800">1000/hour</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Resource-Level Permissions</span>
                    <Badge className="bg-green-100 text-green-800">Enforced</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Audit Trail</span>
                    <Badge className="bg-green-100 text-green-800">Complete</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityLayer;