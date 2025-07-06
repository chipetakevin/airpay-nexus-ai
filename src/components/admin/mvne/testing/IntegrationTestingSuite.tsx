import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TestTube, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  Network,
  Shield,
  Zap,
  Database
} from 'lucide-react';

interface TestSuite {
  id: string;
  name: string;
  category: 'integration' | 'load' | 'security' | 'end-to-end';
  status: 'passed' | 'failed' | 'running' | 'pending';
  progress: number;
  duration: string;
  lastRun: string;
  coverage: number;
  issues: number;
}

interface TestResult {
  id: string;
  testName: string;
  category: string;
  status: 'passed' | 'failed' | 'warning';
  duration: number;
  timestamp: string;
  details: string;
}

const IntegrationTestingSuite = () => {
  const [overallProgress, setOverallProgress] = useState(87);
  const [runningTests, setRunningTests] = useState(2);
  const [passRate, setPassRate] = useState(94.5);

  const testSuites: TestSuite[] = [
    {
      id: 'TS001',
      name: 'MSC/GMSC Integration',
      category: 'integration',
      status: 'passed',
      progress: 100,
      duration: '12m 34s',
      lastRun: '2 hours ago',
      coverage: 95,
      issues: 0
    },
    {
      id: 'TS002',
      name: 'Inter-Carrier Testing',
      category: 'end-to-end',
      status: 'running',
      progress: 67,
      duration: '8m 12s',
      lastRun: 'Running',
      coverage: 89,
      issues: 2
    },
    {
      id: 'TS003',
      name: 'Load Testing - 1M Subscribers',
      category: 'load',
      status: 'passed',
      progress: 100,
      duration: '45m 22s',
      lastRun: '6 hours ago',
      coverage: 92,
      issues: 1
    },
    {
      id: 'TS004',
      name: 'Security Penetration Test',
      category: 'security',
      status: 'running',
      progress: 34,
      duration: '15m 45s',
      lastRun: 'Running',
      coverage: 88,
      issues: 0
    },
    {
      id: 'TS005',
      name: 'Roaming Integration',
      category: 'integration',
      status: 'failed',
      progress: 100,
      duration: '18m 56s',
      lastRun: '4 hours ago',
      coverage: 78,
      issues: 3
    },
    {
      id: 'TS006',
      name: 'Billing System Integration',
      category: 'integration',
      status: 'passed',
      progress: 100,
      duration: '9m 34s',
      lastRun: '1 hour ago',
      coverage: 96,
      issues: 0
    }
  ];

  const recentResults: TestResult[] = [
    {
      id: 'TR001',
      testName: 'HLR Location Update',
      category: 'Integration',
      status: 'passed',
      duration: 234,
      timestamp: '2 min ago',
      details: 'All location updates processed successfully'
    },
    {
      id: 'TR002',
      testName: 'SMS Routing',
      category: 'End-to-End',
      status: 'passed',
      duration: 145,
      timestamp: '3 min ago',
      details: 'SMS delivery confirmed across all networks'
    },
    {
      id: 'TR003',
      testName: 'Call Setup Time',
      category: 'Performance',
      status: 'warning',
      duration: 567,
      timestamp: '5 min ago',
      details: 'Setup time slightly above target (3.2s vs 3.0s)'
    },
    {
      id: 'TR004',
      testName: 'Authentication Flow',
      category: 'Security',
      status: 'failed',
      duration: 89,
      timestamp: '8 min ago',
      details: 'Timeout during RADIUS authentication'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'running':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'pending':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'integration':
        return <Network className="w-4 h-4 text-blue-600" />;
      case 'load':
        return <TrendingUp className="w-4 h-4 text-purple-600" />;
      case 'security':
        return <Shield className="w-4 h-4 text-red-600" />;
      case 'end-to-end':
        return <Zap className="w-4 h-4 text-green-600" />;
      default:
        return <TestTube className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'running':
        return <Play className="w-4 h-4 text-blue-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-gray-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOverallProgress(prev => Math.min(100, prev + Math.random() * 2));
      setPassRate(prev => prev + (Math.random() - 0.5) * 0.5);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl shadow-lg">
            <TestTube className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Integration Testing Suite</h2>
            <p className="text-muted-foreground">End-to-end testing, inter-carrier validation & load testing</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Play className="w-4 h-4 mr-2" />
            Run All
          </Button>
          <Button variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Badge className="bg-green-100 text-green-800">
            <TestTube className="w-4 h-4 mr-1" />
            {passRate.toFixed(1)}% Pass Rate
          </Badge>
        </div>
      </div>

      {/* Testing Progress Alert */}
      <Alert className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white">
        <TestTube className="h-4 w-4 text-blue-600" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <span className="text-blue-800 font-medium">
              Testing suite {overallProgress.toFixed(0)}% complete - {runningTests} tests currently running
            </span>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800">
                <Play className="w-3 h-3 mr-1" />
                Active Testing
              </Badge>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Testing Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <Badge variant="outline" className="bg-green-100 text-green-700">
                Passed
              </Badge>
            </div>
            <div className="text-2xl font-bold text-green-700">{passRate.toFixed(1)}%</div>
            <div className="text-sm text-green-600">Pass Rate</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Play className="w-8 h-8 text-blue-600" />
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                Running
              </Badge>
            </div>
            <div className="text-2xl font-bold text-blue-700">{runningTests}</div>
            <div className="text-sm text-blue-600">Active Tests</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              <Badge variant="outline" className="bg-purple-100 text-purple-700">
                Coverage
              </Badge>
            </div>
            <div className="text-2xl font-bold text-purple-700">{overallProgress}%</div>
            <div className="text-sm text-purple-600">Test Coverage</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Database className="w-8 h-8 text-orange-600" />
              <Badge variant="outline" className="bg-orange-100 text-orange-700">
                Scale
              </Badge>
            </div>
            <div className="text-2xl font-bold text-orange-700">1M+</div>
            <div className="text-sm text-orange-600">Subscribers</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="suites" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="suites">Test Suites</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="load-testing">Load Testing</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="suites" className="space-y-6">
          {/* Test Suites */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="w-5 h-5" />
                Test Suite Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testSuites.map((suite) => (
                  <div key={suite.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(suite.category)}
                        <span className="font-medium">{suite.name}</span>
                        <Badge variant="secondary" className="text-xs capitalize">
                          {suite.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(suite.status)}>
                          {suite.status.toUpperCase()}
                        </Badge>
                        {suite.status === 'running' ? (
                          <Button variant="outline" size="sm">
                            <Pause className="w-3 h-3 mr-1" />
                            Pause
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm">
                            <Play className="w-3 h-3 mr-1" />
                            Run
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm mb-2">
                      <div>
                        <span className="text-gray-500">Duration:</span>
                        <div className="font-medium">{suite.duration}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Coverage:</span>
                        <div className="font-medium">{suite.coverage}%</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Issues:</span>
                        <div className={`font-medium ${suite.issues > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {suite.issues}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Last Run:</span>
                        <div className="font-medium">{suite.lastRun}</div>
                      </div>
                    </div>
                    {suite.status === 'running' && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{suite.progress}%</span>
                        </div>
                        <Progress value={suite.progress} className="h-2" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Recent Test Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentResults.map((result) => (
                  <div key={result.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(result.status)}
                        <span className="font-medium">{result.testName}</span>
                        <Badge variant="secondary" className="text-xs">
                          {result.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{result.duration}ms</span>
                        <span className="text-sm text-gray-500">{result.timestamp}</span>
                        <Badge variant="outline" className={getStatusColor(result.status)}>
                          {result.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{result.details}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="load-testing" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Load Test Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Concurrent Users</span>
                    <Badge className="bg-green-100 text-green-800">1M</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg Response Time</span>
                    <Badge variant="secondary">45ms</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Throughput</span>
                    <Badge className="bg-blue-100 text-blue-800">10K/sec</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Error Rate</span>
                    <Badge className="bg-green-100 text-green-800">0.02%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Benchmarks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Call Setup Time</span>
                    <Badge className="bg-green-100 text-green-800">< 3s</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SMS Delivery</span>
                    <Badge className="bg-green-100 text-green-800">< 5s</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">HLR Query</span>
                    <Badge className="bg-green-100 text-green-800">< 100ms</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Billing Update</span>
                    <Badge className="bg-yellow-100 text-yellow-800">< 500ms</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Tests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Penetration Testing</span>
                    <Badge className="bg-green-100 text-green-800">Passed</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Vulnerability Scan</span>
                    <Badge className="bg-green-100 text-green-800">Clean</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Authentication Tests</span>
                    <Badge className="bg-yellow-100 text-yellow-800">1 Issue</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Encryption Validation</span>
                    <Badge className="bg-green-100 text-green-800">Passed</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Checks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">GDPR Compliance</span>
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">ICASA Standards</span>
                    <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Audit Trails</span>
                    <Badge className="bg-green-100 text-green-800">Complete</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Retention</span>
                    <Badge className="bg-green-100 text-green-800">Configured</Badge>
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

export default IntegrationTestingSuite;