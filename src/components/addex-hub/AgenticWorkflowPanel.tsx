import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Workflow, 
  Play, 
  Pause, 
  Square, 
  RotateCcw,
  CheckCircle,
  Clock,
  AlertTriangle,
  Cpu,
  Zap,
  Brain,
  Settings,
  Activity,
  Target,
  TrendingUp,
  Users,
  Shield,
  Database,
  Network,
  RefreshCw,
  Eye,
  GitBranch
} from 'lucide-react';

export const AgenticWorkflowPanel: React.FC = () => {
  const { toast } = useToast();
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null);
  const [workflowFilter, setWorkflowFilter] = useState('all');

  const [workflows] = useState([
    {
      id: 'wf-001',
      name: 'Customer Onboarding Automation',
      type: 'customer',
      status: 'running',
      progress: 85,
      priority: 'high',
      description: 'AI-driven customer onboarding with automated KYC and plan recommendation',
      steps: [
        { name: 'Document Verification', status: 'completed', ai: true },
        { name: 'Risk Assessment', status: 'completed', ai: true },
        { name: 'Plan Recommendation', status: 'in_progress', ai: true },
        { name: 'Service Activation', status: 'pending', ai: false }
      ],
      metrics: {
        processed: 156,
        successful: 142,
        failed: 8,
        pending: 6,
        avgTime: '12 minutes',
        successRate: 91
      },
      aiCapabilities: ['Document OCR', 'Risk Scoring', 'Plan Matching', 'Fraud Detection']
    },
    {
      id: 'wf-002',
      name: 'Churn Prevention Campaign',
      type: 'retention',
      status: 'running',
      progress: 62,
      priority: 'high',
      description: 'Proactive identification and engagement of at-risk customers',
      steps: [
        { name: 'Churn Prediction', status: 'completed', ai: true },
        { name: 'Segment Analysis', status: 'completed', ai: true },
        { name: 'Offer Generation', status: 'in_progress', ai: true },
        { name: 'Outreach Execution', status: 'pending', ai: false }
      ],
      metrics: {
        processed: 847,
        successful: 689,
        failed: 23,
        pending: 135,
        avgTime: '8 minutes',
        successRate: 81
      },
      aiCapabilities: ['Predictive Analytics', 'Behavioral Analysis', 'Offer Optimization', 'Timing Intelligence']
    },
    {
      id: 'wf-003',
      name: 'Network Optimization',
      type: 'network',
      status: 'completed',
      progress: 100,
      priority: 'medium',
      description: 'Autonomous network resource allocation and performance optimization',
      steps: [
        { name: 'Traffic Analysis', status: 'completed', ai: true },
        { name: 'Resource Planning', status: 'completed', ai: true },
        { name: 'Auto-Scaling', status: 'completed', ai: true },
        { name: 'Performance Validation', status: 'completed', ai: true }
      ],
      metrics: {
        processed: 1,
        successful: 1,
        failed: 0,
        pending: 0,
        avgTime: '45 minutes',
        successRate: 100
      },
      aiCapabilities: ['Traffic Prediction', 'Resource Optimization', 'Auto-Scaling', 'Performance Monitoring']
    },
    {
      id: 'wf-004',
      name: 'Fraud Detection & Response',
      type: 'security',
      status: 'paused',
      progress: 30,
      priority: 'critical',
      description: 'Real-time fraud detection with automated response protocols',
      steps: [
        { name: 'Pattern Recognition', status: 'completed', ai: true },
        { name: 'Risk Scoring', status: 'in_progress', ai: true },
        { name: 'Alert Generation', status: 'pending', ai: false },
        { name: 'Response Execution', status: 'pending', ai: false }
      ],
      metrics: {
        processed: 2847,
        successful: 2823,
        failed: 12,
        pending: 12,
        avgTime: '2 minutes',
        successRate: 99.2
      },
      aiCapabilities: ['Anomaly Detection', 'Pattern Analysis', 'Risk Assessment', 'Response Orchestration']
    },
    {
      id: 'wf-005',
      name: 'Plan Migration Assistant',
      type: 'billing',
      status: 'scheduled',
      progress: 0,
      priority: 'medium',
      description: 'Intelligent plan migration with impact analysis and customer communication',
      steps: [
        { name: 'Eligibility Check', status: 'pending', ai: true },
        { name: 'Impact Analysis', status: 'pending', ai: true },
        { name: 'Customer Notification', status: 'pending', ai: false },
        { name: 'Migration Execution', status: 'pending', ai: false }
      ],
      metrics: {
        processed: 0,
        successful: 0,
        failed: 0,
        pending: 234,
        avgTime: '15 minutes',
        successRate: 0
      },
      aiCapabilities: ['Eligibility Analysis', 'Cost-Benefit Calculation', 'Communication Optimization', 'Migration Planning']
    }
  ]);

  const [agentStats] = useState({
    activeAgents: 12,
    tasksCompleted: 2847,
    avgResponseTime: '1.2s',
    successRate: 94.7,
    energySaved: '23%'
  });

  const handleWorkflowAction = (action: string, workflowId?: string) => {
    const workflow = workflowId ? workflows.find(w => w.id === workflowId) : selectedWorkflow;
    toast({
      title: `Workflow ${action}`,
      description: `${action} executed for ${workflow?.name || 'selected workflow'}`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Play className="w-4 h-4 text-green-600" />;
      case 'paused': return <Pause className="w-4 h-4 text-yellow-600" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'scheduled': return <Clock className="w-4 h-4 text-gray-600" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      case 'scheduled': return 'bg-gray-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredWorkflows = workflows.filter(workflow => {
    if (workflowFilter === 'all') return true;
    return workflow.status === workflowFilter;
  });

  return (
    <div className="space-y-6">
      {/* Agent Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Cpu className="w-6 h-6 text-blue-600" />
              <Badge className="bg-blue-500">Live</Badge>
            </div>
            <div className="text-2xl font-bold text-blue-700">{agentStats.activeAgents}</div>
            <div className="text-sm text-blue-600">Active AI Agents</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <Badge className="bg-green-500">Today</Badge>
            </div>
            <div className="text-2xl font-bold text-green-700">{agentStats.tasksCompleted.toLocaleString()}</div>
            <div className="text-sm text-green-600">Tasks Completed</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Zap className="w-6 h-6 text-purple-600" />
              <Badge className="bg-purple-500">Avg</Badge>
            </div>
            <div className="text-2xl font-bold text-purple-700">{agentStats.avgResponseTime}</div>
            <div className="text-sm text-purple-600">Response Time</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-6 h-6 text-orange-600" />
              <Badge className="bg-orange-500">Success</Badge>
            </div>
            <div className="text-2xl font-bold text-orange-700">{agentStats.successRate}%</div>
            <div className="text-sm text-orange-600">Success Rate</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-6 h-6 text-teal-600" />
              <Badge className="bg-teal-500">Efficiency</Badge>
            </div>
            <div className="text-2xl font-bold text-teal-700">{agentStats.energySaved}</div>
            <div className="text-sm text-teal-600">Energy Saved</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workflow List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Workflow className="w-6 h-6 text-blue-600" />
                Autonomous Workflows
              </CardTitle>
              <Select value={workflowFilter} onValueChange={setWorkflowFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Workflows</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredWorkflows.map((workflow) => (
                <div
                  key={workflow.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    selectedWorkflow?.id === workflow.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedWorkflow(workflow)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(workflow.status)}
                      <h4 className="font-semibold">{workflow.name}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(workflow.priority)}>
                        {workflow.priority}
                      </Badge>
                      <Badge className={getStatusColor(workflow.status)}>
                        {workflow.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{workflow.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Progress</span>
                      <span>{workflow.progress}%</span>
                    </div>
                    <Progress value={workflow.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                    <span>Success Rate: {workflow.metrics.successRate}%</span>
                    <span>Avg Time: {workflow.metrics.avgTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Workflow Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Workflow Control
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedWorkflow ? (
              <div className="space-y-6">
                {/* Workflow Header */}
                <div>
                  <h3 className="font-bold text-lg mb-2">{selectedWorkflow.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{selectedWorkflow.description}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className={getStatusColor(selectedWorkflow.status)}>
                      {selectedWorkflow.status}
                    </Badge>
                    <Badge className={getPriorityColor(selectedWorkflow.priority)}>
                      {selectedWorkflow.priority} priority
                    </Badge>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleWorkflowAction('start', selectedWorkflow.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleWorkflowAction('pause', selectedWorkflow.id)}
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleWorkflowAction('restart', selectedWorkflow.id)}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Restart
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleWorkflowAction('stop', selectedWorkflow.id)}
                  >
                    <Square className="w-4 h-4 mr-2" />
                    Stop
                  </Button>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm">{selectedWorkflow.progress}%</span>
                  </div>
                  <Progress value={selectedWorkflow.progress} className="h-3" />
                </div>

                {/* Steps */}
                <div>
                  <h4 className="font-semibold mb-3">Workflow Steps</h4>
                  <div className="space-y-2">
                    {selectedWorkflow.steps.map((step: any, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-2 rounded bg-gray-50">
                        {step.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-600" />}
                        {step.status === 'in_progress' && <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />}
                        {step.status === 'pending' && <Clock className="w-4 h-4 text-gray-400" />}
                        
                        <span className="text-sm flex-1">{step.name}</span>
                        
                        {step.ai && (
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                            <Brain className="w-3 h-3 mr-1" />
                            AI
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div>
                  <h4 className="font-semibold mb-3">Performance Metrics</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2 bg-green-50 rounded text-center">
                      <div className="text-lg font-bold text-green-700">{selectedWorkflow.metrics.successful}</div>
                      <div className="text-xs text-green-600">Successful</div>
                    </div>
                    <div className="p-2 bg-red-50 rounded text-center">
                      <div className="text-lg font-bold text-red-700">{selectedWorkflow.metrics.failed}</div>
                      <div className="text-xs text-red-600">Failed</div>
                    </div>
                    <div className="p-2 bg-blue-50 rounded text-center">
                      <div className="text-lg font-bold text-blue-700">{selectedWorkflow.metrics.pending}</div>
                      <div className="text-xs text-blue-600">Pending</div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded text-center">
                      <div className="text-lg font-bold text-gray-700">{selectedWorkflow.metrics.avgTime}</div>
                      <div className="text-xs text-gray-600">Avg Time</div>
                    </div>
                  </div>
                </div>

                {/* AI Capabilities */}
                <div>
                  <h4 className="font-semibold mb-3">AI Capabilities</h4>
                  <div className="space-y-1">
                    {selectedWorkflow.aiCapabilities.map((capability: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Brain className="w-3 h-3 text-purple-600" />
                        {capability}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Workflow className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a workflow to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};