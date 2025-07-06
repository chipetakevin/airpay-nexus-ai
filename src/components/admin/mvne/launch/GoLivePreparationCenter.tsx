import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Rocket, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Users,
  FileText,
  Settings,
  TrendingUp,
  Shield,
  Database,
  Activity,
  PlayCircle
} from 'lucide-react';

interface LaunchStep {
  id: string;
  category: string;
  task: string;
  status: 'completed' | 'in-progress' | 'pending' | 'blocked';
  priority: 'critical' | 'high' | 'medium' | 'low';
  assignee: string;
  dueDate: string;
  dependencies: string[];
}

interface PerformanceBenchmark {
  metric: string;
  current: number;
  target: number;
  unit: string;
  status: 'pass' | 'warning' | 'fail';
  category: string;
}

const GoLivePreparationCenter = () => {
  const [launchReadiness, setLaunchReadiness] = useState(89);
  const [criticalTasks, setCriticalTasks] = useState(3);
  const [daysToLaunch, setDaysToLaunch] = useState(12);

  const launchSteps: LaunchStep[] = [
    {
      id: 'GL001',
      category: 'Production Deployment',
      task: 'Final production configuration deployment',
      status: 'completed',
      priority: 'critical',
      assignee: 'DevOps Team',
      dueDate: '2025-01-10',
      dependencies: []
    },
    {
      id: 'GL002',
      category: 'Performance Testing',
      task: 'Load testing at commercial scale',
      status: 'in-progress',
      priority: 'critical',
      assignee: 'QA Team',
      dueDate: '2025-01-12',
      dependencies: ['GL001']
    },
    {
      id: 'GL003',
      category: 'Staff Training',
      task: 'NOC team final training completion',
      status: 'in-progress',
      priority: 'high',
      assignee: 'HR Team',
      dueDate: '2025-01-14',
      dependencies: []
    },
    {
      id: 'GL004',
      category: 'Documentation',
      task: 'Operations runbooks finalization',
      status: 'in-progress',
      priority: 'high',
      assignee: 'Tech Writing',
      dueDate: '2025-01-13',
      dependencies: []
    },
    {
      id: 'GL005',
      category: 'Emergency Procedures',
      task: 'Incident response procedures validation',
      status: 'pending',
      priority: 'critical',
      assignee: 'Operations',
      dueDate: '2025-01-15',
      dependencies: ['GL002']
    },
    {
      id: 'GL006',
      category: 'Rollback Testing',
      task: 'Complete rollback procedure validation',
      status: 'pending',
      priority: 'high',
      assignee: 'DevOps Team',
      dueDate: '2025-01-16',
      dependencies: ['GL002']
    },
    {
      id: 'GL007',
      category: 'Customer Communication',
      task: 'Launch announcement preparation',
      status: 'pending',
      priority: 'medium',
      assignee: 'Marketing',
      dueDate: '2025-01-18',
      dependencies: []
    },
    {
      id: 'GL008',
      category: 'Final Sign-off',
      task: 'Stakeholder approval for go-live',
      status: 'pending',
      priority: 'critical',
      assignee: 'Management',
      dueDate: '2025-01-20',
      dependencies: ['GL002', 'GL005', 'GL006']
    }
  ];

  const performanceBenchmarks: PerformanceBenchmark[] = [
    {
      metric: 'System Response Time',
      current: 45,
      target: 50,
      unit: 'ms',
      status: 'pass',
      category: 'Performance'
    },
    {
      metric: 'Concurrent User Capacity',
      current: 950000,
      target: 1000000,
      unit: 'users',
      status: 'warning',
      category: 'Scale'
    },
    {
      metric: 'Network Uptime',
      current: 99.7,
      target: 99.9,
      unit: '%',
      status: 'warning',
      category: 'Reliability'
    },
    {
      metric: 'Call Success Rate',
      current: 99.6,
      target: 99.5,
      unit: '%',
      status: 'pass',
      category: 'Quality'
    },
    {
      metric: 'Security Score',
      current: 96,
      target: 95,
      unit: '%',
      status: 'pass',
      category: 'Security'
    },
    {
      metric: 'Recovery Time',
      current: 3.2,
      target: 4.0,
      unit: 'hours',
      status: 'pass',
      category: 'DR'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'pass':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'in-progress':
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'pending':
      case 'fail':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'blocked':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in-progress':
        return <PlayCircle className="w-4 h-4 text-blue-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-gray-600" />;
      case 'blocked':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const completedTasks = launchSteps.filter(step => step.status === 'completed').length;
      const newReadiness = Math.round((completedTasks / launchSteps.length) * 100);
      setLaunchReadiness(newReadiness);
      
      const criticalPending = launchSteps.filter(step => 
        step.priority === 'critical' && step.status !== 'completed'
      ).length;
      setCriticalTasks(criticalPending);
    }, 5000);

    return () => clearInterval(interval);
  }, [launchSteps]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl shadow-lg">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Go-Live Preparation Center</h2>
            <p className="text-muted-foreground">Production deployment, staff training & final benchmarking</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Launch Plan
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Final Config
          </Button>
          <Badge className="bg-green-100 text-green-800">
            <Rocket className="w-4 h-4 mr-1" />
            {launchReadiness}% Ready
          </Badge>
        </div>
      </div>

      {/* Launch Readiness Alert */}
      <Alert className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white">
        <Rocket className="h-4 w-4 text-blue-600" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <span className="text-blue-800 font-medium">
              Launch readiness at {launchReadiness}% - {criticalTasks} critical tasks remaining, {daysToLaunch} days to go-live
            </span>
            <div className="flex items-center gap-2">
              <Badge className="bg-orange-100 text-orange-800">
                <Clock className="w-3 h-3 mr-1" />
                T-{daysToLaunch} Days
              </Badge>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Launch Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Rocket className="w-8 h-8 text-blue-600" />
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                Progress
              </Badge>
            </div>
            <div className="text-2xl font-bold text-blue-700">{launchReadiness}%</div>
            <div className="text-sm text-blue-600">Launch Ready</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500 bg-gradient-to-br from-red-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <Badge variant="outline" className="bg-red-100 text-red-700">
                Critical
              </Badge>
            </div>
            <div className="text-2xl font-bold text-red-700">{criticalTasks}</div>
            <div className="text-sm text-red-600">Critical Tasks</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-orange-600" />
              <Badge variant="outline" className="bg-orange-100 text-orange-700">
                Countdown
              </Badge>
            </div>
            <div className="text-2xl font-bold text-orange-700">{daysToLaunch}</div>
            <div className="text-sm text-orange-600">Days to Launch</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-green-600" />
              <Badge variant="outline" className="bg-green-100 text-green-700">
                Trained
              </Badge>
            </div>
            <div className="text-2xl font-bold text-green-700">95%</div>
            <div className="text-sm text-green-600">Staff Ready</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tasks">Launch Tasks</TabsTrigger>
          <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
          <TabsTrigger value="procedures">Procedures</TabsTrigger>
          <TabsTrigger value="signoff">Sign-off</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-6">
          {/* Launch Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Go-Live Task Checklist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {launchSteps.map((step) => (
                  <div key={step.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(step.status)}
                        <span className="font-medium">{step.task}</span>
                        <Badge variant="secondary" className="text-xs">
                          {step.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getPriorityColor(step.priority)}>
                          {step.priority.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(step.status)}>
                          {step.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Assignee:</span> {step.assignee}
                      </div>
                      <div>
                        <span className="font-medium">Due Date:</span> {step.dueDate}
                      </div>
                      <div>
                        <span className="font-medium">Dependencies:</span> {step.dependencies.length || 'None'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benchmarks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Performance Benchmarks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceBenchmarks.map((benchmark, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">{benchmark.metric}</span>
                        <Badge variant="secondary" className="text-xs">
                          {benchmark.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(benchmark.status)}>
                          {benchmark.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Current:</span>
                        <div className="font-medium">{benchmark.current.toLocaleString()} {benchmark.unit}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Target:</span>
                        <div className="font-medium">{benchmark.target.toLocaleString()} {benchmark.unit}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Performance:</span>
                        <div className="mt-1">
                          <Progress 
                            value={Math.min(100, (benchmark.current / benchmark.target) * 100)} 
                            className="h-2" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="procedures" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Deployment Procedures</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Production Deployment Script</span>
                    <Badge className="bg-green-100 text-green-800">Ready</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database Migration Plan</span>
                    <Badge className="bg-green-100 text-green-800">Validated</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Config Management</span>
                    <Badge className="bg-green-100 text-green-800">Automated</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Health Checks</span>
                    <Badge className="bg-green-100 text-green-800">Configured</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Procedures</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Rollback Procedures</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Testing</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Incident Response Plan</span>
                    <Badge className="bg-green-100 text-green-800">Documented</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Escalation Matrix</span>
                    <Badge className="bg-green-100 text-green-800">Approved</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Communication Plan</span>
                    <Badge className="bg-blue-100 text-blue-800">Draft</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="signoff" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Stakeholder Approvals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Technical Director</span>
                    <Badge className="bg-green-100 text-green-800">Approved</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Operations Manager</span>
                    <Badge className="bg-green-100 text-green-800">Approved</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Security Officer</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">CEO</span>
                    <Badge className="bg-gray-100 text-gray-800">Scheduled</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Final Checklist</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">All Tests Passed</span>
                    <Badge className="bg-yellow-100 text-yellow-800">89%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Staff Training Complete</span>
                    <Badge className="bg-green-100 text-green-800">95%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Documentation Updated</span>
                    <Badge className="bg-yellow-100 text-yellow-800">85%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Go/No-Go Decision</span>
                    <Badge className="bg-gray-100 text-gray-800">Pending</Badge>
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

export default GoLivePreparationCenter;