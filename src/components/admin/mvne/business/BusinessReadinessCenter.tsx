import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building, 
  Users, 
  CreditCard, 
  HeadphonesIcon, 
  CheckCircle, 
  Clock,
  TrendingUp,
  DollarSign,
  Phone,
  Settings,
  FileText,
  UserPlus
} from 'lucide-react';

interface BusinessMetric {
  category: string;
  metric: string;
  current: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'good' | 'warning' | 'critical';
}

interface OnboardingStep {
  id: string;
  step: string;
  status: 'completed' | 'in-progress' | 'pending';
  duration: string;
  assignee: string;
  priority: 'high' | 'medium' | 'low';
}

const BusinessReadinessCenter = () => {
  const [readinessScore, setReadinessScore] = useState(92);
  const [activePartnerships, setActivePartnerships] = useState(8);
  const [customerSupportReady, setCustomerSupportReady] = useState(true);

  const businessMetrics: BusinessMetric[] = [
    {
      category: 'MVNO Onboarding',
      metric: 'Partner Onboarding Time',
      current: 14,
      target: 7,
      unit: 'days',
      trend: 'down',
      status: 'warning'
    },
    {
      category: 'Customer Service',
      metric: 'Support Ticket Resolution',
      current: 4.2,
      target: 8.0,
      unit: 'hours',
      trend: 'up',
      status: 'good'
    },
    {
      category: 'Billing',
      metric: 'Invoice Processing Time',
      current: 2.1,
      target: 24.0,
      unit: 'hours',
      trend: 'stable',
      status: 'good'
    },
    {
      category: 'SLA Management',
      metric: 'SLA Compliance Rate',
      current: 98.5,
      target: 99.0,
      unit: '%',
      trend: 'up',
      status: 'good'
    },
    {
      category: 'Business Intelligence',
      metric: 'Report Generation Speed',
      current: 45,
      target: 60,
      unit: 'seconds',
      trend: 'down',
      status: 'good'
    },
    {
      category: 'Revenue Assurance',
      metric: 'Billing Accuracy',
      current: 99.8,
      target: 99.9,
      unit: '%',
      trend: 'stable',
      status: 'good'
    }
  ];

  const onboardingSteps: OnboardingStep[] = [
    {
      id: 'OB001',
      step: 'Contract & Legal Documentation',
      status: 'completed',
      duration: '2-3 days',
      assignee: 'Legal Team',
      priority: 'high'
    },
    {
      id: 'OB002',
      step: 'Technical Integration Setup',
      status: 'completed',
      duration: '3-5 days',
      assignee: 'Tech Team',
      priority: 'high'
    },
    {
      id: 'OB003',
      step: 'Billing System Configuration',
      status: 'in-progress',
      duration: '1-2 days',
      assignee: 'Billing Team',
      priority: 'high'
    },
    {
      id: 'OB004',
      step: 'SIM Provisioning Setup',
      status: 'in-progress',
      duration: '2-3 days',
      assignee: 'Operations',
      priority: 'medium'
    },
    {
      id: 'OB005',
      step: 'Customer Portal Access',
      status: 'pending',
      duration: '1 day',
      assignee: 'IT Support',
      priority: 'medium'
    },
    {
      id: 'OB006',
      step: 'Go-Live Testing',
      status: 'pending',
      duration: '2-3 days',
      assignee: 'QA Team',
      priority: 'high'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'good':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'in-progress':
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'pending':
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      case 'stable':
        return <TrendingUp className="w-4 h-4 text-gray-600 rotate-90" />;
      default:
        return <TrendingUp className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-gray-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setReadinessScore(prev => Math.min(100, prev + Math.random() * 0.5));
      setActivePartnerships(prev => prev + Math.floor(Math.random() * 2));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg">
            <Building className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Business Readiness Center</h2>
            <p className="text-muted-foreground">MVNO onboarding, customer service & business intelligence</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <UserPlus className="w-4 h-4 mr-2" />
            Onboard Partner
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            BI Report
          </Button>
          <Badge className="bg-green-100 text-green-800">
            <Building className="w-4 h-4 mr-1" />
            {readinessScore}% Ready
          </Badge>
        </div>
      </div>

      {/* Business Readiness Alert */}
      <Alert className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <span className="text-green-800 font-medium">
              Business operations {readinessScore}% ready - {activePartnerships} MVNO partnerships active
            </span>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800">
                <HeadphonesIcon className="w-3 h-3 mr-1" />
                Support Ready
              </Badge>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Business Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-600" />
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                Active
              </Badge>
            </div>
            <div className="text-2xl font-bold text-blue-700">{activePartnerships}</div>
            <div className="text-sm text-blue-600">MVNO Partners</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <HeadphonesIcon className="w-8 h-8 text-green-600" />
              <Badge variant="outline" className="bg-green-100 text-green-700">
                24/7
              </Badge>
            </div>
            <div className="text-2xl font-bold text-green-700">4.2h</div>
            <div className="text-sm text-green-600">Avg Resolution</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <CreditCard className="w-8 h-8 text-purple-600" />
              <Badge variant="outline" className="bg-purple-100 text-purple-700">
                Automated
              </Badge>
            </div>
            <div className="text-2xl font-bold text-purple-700">2.1h</div>
            <div className="text-sm text-purple-600">Billing Speed</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-orange-600" />
              <Badge variant="outline" className="bg-orange-100 text-orange-700">
                SLA
              </Badge>
            </div>
            <div className="text-2xl font-bold text-orange-700">98.5%</div>
            <div className="text-sm text-orange-600">Compliance</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="metrics" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
          <TabsTrigger value="sla">SLA</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-6">
          {/* Business Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Business Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {businessMetrics.map((metric, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getTrendIcon(metric.trend)}
                        <span className="font-medium">{metric.metric}</span>
                        <Badge variant="secondary" className="text-xs">
                          {metric.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(metric.status)}>
                          {metric.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Current:</span>
                        <div className="font-medium">{metric.current} {metric.unit}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Target:</span>
                        <div className="font-medium">{metric.target} {metric.unit}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Progress:</span>
                        <div className="mt-1">
                          <Progress 
                            value={Math.min(100, (metric.current / metric.target) * 100)} 
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

        <TabsContent value="onboarding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                MVNO Partner Onboarding Process
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {onboardingSteps.map((step) => (
                  <div key={step.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(step.status)}
                        <span className="font-medium">{step.step}</span>
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
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Duration:</span> {step.duration}
                      </div>
                      <div>
                        <span className="font-medium">Assignee:</span> {step.assignee}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Support System</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Self-Service Portal</span>
                    <Badge className="bg-green-100 text-green-800">Live</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Ticketing System</span>
                    <Badge className="bg-green-100 text-green-800">Integrated</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Live Chat</span>
                    <Badge className="bg-green-100 text-green-800">24/7</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Knowledge Base</span>
                    <Badge className="bg-blue-100 text-blue-800">Updated</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Support Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">First Response Time</span>
                    <Badge className="bg-green-100 text-green-800">&lt; 1 hour</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Resolution Time</span>
                    <Badge className="bg-green-100 text-green-800">4.2 hours</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Customer Satisfaction</span>
                    <Badge className="bg-green-100 text-green-800">4.8/5.0</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Escalation Rate</span>
                    <Badge className="bg-green-100 text-green-800">2.1%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sla" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>SLA Commitments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Network Uptime</span>
                    <Badge className="bg-green-100 text-green-800">99.9%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Call Success Rate</span>
                    <Badge className="bg-green-100 text-green-800">99.5%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SMS Delivery</span>
                    <Badge className="bg-green-100 text-green-800">99.8%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Billing Accuracy</span>
                    <Badge className="bg-green-100 text-green-800">99.9%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SLA Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Current Period</span>
                    <Badge className="bg-green-100 text-green-800">98.5%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">YTD Average</span>
                    <Badge className="bg-green-100 text-green-800">98.8%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Penalty Credits</span>
                    <Badge variant="secondary">R 0</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Bonus Eligible</span>
                    <Badge className="bg-blue-100 text-blue-800">Yes</Badge>
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

export default BusinessReadinessCenter;