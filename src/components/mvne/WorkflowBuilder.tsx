import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Play, 
  Save, 
  GitBranch, 
  Settings, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Database,
  MessageSquare,
  Mail,
  Webhook,
  Zap,
  ArrowRight,
  Trash2
} from 'lucide-react';

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'notification';
  title: string;
  description: string;
  icon: React.ReactNode;
  config: Record<string, any>;
  position: { x: number; y: number };
  connections: string[];
}

interface WorkflowTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  nodes: WorkflowNode[];
  estimatedDuration: number;
  complexity: 'beginner' | 'intermediate' | 'advanced';
}

const WorkflowBuilder = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<WorkflowTemplate | null>(null);
  const [workflowName, setWorkflowName] = useState('');
  const [workflowDescription, setWorkflowDescription] = useState('');
  const [activeTab, setActiveTab] = useState('templates');

  // Pre-built workflow templates
  const workflowTemplates: WorkflowTemplate[] = [
    {
      id: 'customer-onboarding',
      name: 'Customer Onboarding',
      category: 'onboarding',
      description: 'Automated customer registration and activation process',
      estimatedDuration: 15,
      complexity: 'beginner',
      nodes: [
        {
          id: 'trigger-1',
          type: 'trigger',
          title: 'Customer Registration',
          description: 'Triggered when new customer registers',
          icon: <Zap className="w-4 h-4" />,
          config: { event: 'customer_registered' },
          position: { x: 100, y: 100 },
          connections: ['action-1']
        },
        {
          id: 'action-1',
          type: 'action',
          title: 'Validate KYC',
          description: 'Perform KYC validation checks',
          icon: <CheckCircle className="w-4 h-4" />,
          config: { validation_type: 'kyc' },
          position: { x: 300, y: 100 },
          connections: ['condition-1']
        },
        {
          id: 'condition-1',
          type: 'condition',
          title: 'KYC Approved?',
          description: 'Check if KYC validation passed',
          icon: <GitBranch className="w-4 h-4" />,
          config: { condition: 'kyc_status == approved' },
          position: { x: 500, y: 100 },
          connections: ['action-2', 'notification-1']
        },
        {
          id: 'action-2',
          type: 'action',
          title: 'Provision SIM',
          description: 'Automatically provision and activate SIM',
          icon: <Database className="w-4 h-4" />,
          config: { sim_type: 'digital' },
          position: { x: 700, y: 50 },
          connections: ['notification-2']
        },
        {
          id: 'notification-1',
          type: 'notification',
          title: 'KYC Failed Alert',
          description: 'Send KYC failure notification',
          icon: <AlertTriangle className="w-4 h-4" />,
          config: { type: 'kyc_failed' },
          position: { x: 700, y: 150 },
          connections: []
        },
        {
          id: 'notification-2',
          type: 'notification',
          title: 'Welcome Message',
          description: 'Send welcome SMS and email',
          icon: <MessageSquare className="w-4 h-4" />,
          config: { channels: ['sms', 'email'] },
          position: { x: 900, y: 50 },
          connections: []
        }
      ]
    },
    {
      id: 'billing-automation',
      name: 'Automated Billing',
      category: 'billing',
      description: 'Process recurring billing and payment collection',
      estimatedDuration: 30,
      complexity: 'intermediate',
      nodes: [
        {
          id: 'trigger-2',
          type: 'trigger',
          title: 'Billing Cycle',
          description: 'Triggered on billing cycle date',
          icon: <Clock className="w-4 h-4" />,
          config: { schedule: 'monthly' },
          position: { x: 100, y: 100 },
          connections: ['action-3']
        },
        {
          id: 'action-3',
          type: 'action',
          title: 'Generate Invoice',
          description: 'Create customer invoices',
          icon: <Database className="w-4 h-4" />,
          config: { template: 'standard_invoice' },
          position: { x: 300, y: 100 },
          connections: ['action-4']
        },
        {
          id: 'action-4',
          type: 'action',
          title: 'Process Payment',
          description: 'Attempt automatic payment collection',
          icon: <Webhook className="w-4 h-4" />,
          config: { payment_method: 'auto_debit' },
          position: { x: 500, y: 100 },
          connections: ['condition-2']
        },
        {
          id: 'condition-2',
          type: 'condition',
          title: 'Payment Success?',
          description: 'Check payment processing result',
          icon: <GitBranch className="w-4 h-4" />,
          config: { condition: 'payment_status == success' },
          position: { x: 700, y: 100 },
          connections: ['notification-3', 'notification-4']
        },
        {
          id: 'notification-3',
          type: 'notification',
          title: 'Payment Confirmation',
          description: 'Send payment success notification',
          icon: <Mail className="w-4 h-4" />,
          config: { type: 'payment_success' },
          position: { x: 900, y: 50 },
          connections: []
        },
        {
          id: 'notification-4',
          type: 'notification',
          title: 'Payment Failed Alert',
          description: 'Send payment failure notification',
          icon: <AlertTriangle className="w-4 h-4" />,
          config: { type: 'payment_failed' },
          position: { x: 900, y: 150 },
          connections: []
        }
      ]
    },
    {
      id: 'fraud-investigation',
      name: 'Fraud Investigation',
      category: 'compliance',
      description: 'Automated fraud detection and investigation workflow',
      estimatedDuration: 45,
      complexity: 'advanced',
      nodes: [
        {
          id: 'trigger-3',
          type: 'trigger',
          title: 'Fraud Alert',
          description: 'Triggered when fraud is detected',
          icon: <AlertTriangle className="w-4 h-4" />,
          config: { event: 'fraud_detected' },
          position: { x: 100, y: 100 },
          connections: ['action-5']
        },
        {
          id: 'action-5',
          type: 'action',
          title: 'Freeze Account',
          description: 'Temporarily freeze customer account',
          icon: <Database className="w-4 h-4" />,
          config: { freeze_type: 'temporary' },
          position: { x: 300, y: 100 },
          connections: ['action-6']
        },
        {
          id: 'action-6',
          type: 'action',
          title: 'Create Investigation Ticket',
          description: 'Generate fraud investigation case',
          icon: <Settings className="w-4 h-4" />,
          config: { priority: 'high' },
          position: { x: 500, y: 100 },
          connections: ['notification-5']
        },
        {
          id: 'notification-5',
          type: 'notification',
          title: 'Notify Compliance Team',
          description: 'Alert compliance team of investigation',
          icon: <Mail className="w-4 h-4" />,
          config: { recipients: ['compliance_team'] },
          position: { x: 700, y: 100 },
          connections: []
        }
      ]
    }
  ];

  const getNodeTypeColor = (type: string) => {
    switch (type) {
      case 'trigger': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'action': return 'bg-green-100 border-green-300 text-green-800';
      case 'condition': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'notification': return 'bg-purple-100 border-purple-300 text-purple-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const handleTemplateSelect = (template: WorkflowTemplate) => {
    setSelectedTemplate(template);
    setWorkflowName(template.name);
    setWorkflowDescription(template.description);
    setActiveTab('builder');
  };

  const renderWorkflowCanvas = () => {
    if (!selectedTemplate) return null;

    return (
      <div className="relative bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 min-h-[600px] overflow-auto">
        <div className="relative">
          {selectedTemplate.nodes.map((node) => (
            <div
              key={node.id}
              className={`absolute w-48 p-3 rounded-lg border-2 ${getNodeTypeColor(node.type)} shadow-sm`}
              style={{ left: node.position.x, top: node.position.y }}
            >
              <div className="flex items-center gap-2 mb-2">
                {node.icon}
                <span className="font-semibold text-sm">{node.title}</span>
              </div>
              <p className="text-xs opacity-80">{node.description}</p>
              <div className="mt-2 flex justify-between">
                <Badge variant="outline" className="text-xs">
                  {node.type}
                </Badge>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Settings className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
          
          {/* Connection lines */}
          <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
            {selectedTemplate.nodes.map((node) =>
              node.connections.map((targetId) => {
                const targetNode = selectedTemplate.nodes.find(n => n.id === targetId);
                if (!targetNode) return null;
                
                return (
                  <line
                    key={`${node.id}-${targetId}`}
                    x1={node.position.x + 192}
                    y1={node.position.y + 40}
                    x2={targetNode.position.x}
                    y2={targetNode.position.y + 40}
                    stroke="#6b7280"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                );
              })
            )}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="10"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workflow Builder</h1>
          <p className="text-gray-600">Create and manage automated MVNE workflows</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Save Template
          </Button>
          <Button>
            <Play className="w-4 h-4 mr-2" />
            Deploy Workflow
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="builder">Workflow Builder</TabsTrigger>
          <TabsTrigger value="execution">Execution History</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowTemplates.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant={template.complexity === 'beginner' ? 'default' : template.complexity === 'intermediate' ? 'secondary' : 'destructive'}>
                      {template.complexity}
                    </Badge>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Category:</span>
                      <Badge variant="outline">{template.category}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{template.estimatedDuration} minutes</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Steps:</span>
                      <span className="font-medium">{template.nodes.length} nodes</span>
                    </div>
                    <Button 
                      className="w-full mt-4" 
                      onClick={() => handleTemplateSelect(template)}
                    >
                      Use Template
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Create Custom Workflow</CardTitle>
              <CardDescription>Start from scratch with a blank workflow</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Create Blank Workflow
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="builder" className="space-y-6">
          {selectedTemplate ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Workflow Configuration</CardTitle>
                  <CardDescription>Configure your workflow settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Workflow Name</label>
                      <Input 
                        value={workflowName} 
                        onChange={(e) => setWorkflowName(e.target.value)}
                        placeholder="Enter workflow name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <Select defaultValue={selectedTemplate.category}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="onboarding">Onboarding</SelectItem>
                          <SelectItem value="billing">Billing</SelectItem>
                          <SelectItem value="support">Support</SelectItem>
                          <SelectItem value="compliance">Compliance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <Textarea 
                        value={workflowDescription}
                        onChange={(e) => setWorkflowDescription(e.target.value)}
                        placeholder="Describe your workflow"
                        rows={3}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Visual Workflow Designer</CardTitle>
                  <CardDescription>Drag and drop workflow components</CardDescription>
                </CardHeader>
                <CardContent>
                  {renderWorkflowCanvas()}
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Workflow
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Save className="w-4 h-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button>
                    <Play className="w-4 h-4 mr-2" />
                    Test Workflow
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <GitBranch className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Workflow Selected</h3>
                <p className="text-gray-600 mb-4">Select a template or create a new workflow to get started</p>
                <Button onClick={() => setActiveTab('templates')}>
                  Browse Templates
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="execution" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Executions</CardTitle>
              <CardDescription>Monitor workflow execution history and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, workflow: 'Customer Onboarding', status: 'completed', duration: '12s', timestamp: '2 minutes ago' },
                  { id: 2, workflow: 'Automated Billing', status: 'running', duration: '45s', timestamp: '5 minutes ago' },
                  { id: 3, workflow: 'Fraud Investigation', status: 'failed', duration: '23s', timestamp: '10 minutes ago' },
                  { id: 4, workflow: 'Customer Onboarding', status: 'completed', duration: '15s', timestamp: '15 minutes ago' }
                ].map((execution) => (
                  <div key={execution.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        execution.status === 'completed' ? 'bg-green-100 text-green-600' :
                        execution.status === 'running' ? 'bg-blue-100 text-blue-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {execution.status === 'completed' ? <CheckCircle className="w-4 h-4" /> :
                         execution.status === 'running' ? <Clock className="w-4 h-4" /> :
                         <AlertTriangle className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className="font-semibold">{execution.workflow}</h4>
                        <p className="text-sm text-gray-600">{execution.timestamp}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={execution.status === 'completed' ? 'default' : execution.status === 'running' ? 'secondary' : 'destructive'}>
                        {execution.status}
                      </Badge>
                      <div className="text-sm text-gray-600 mt-1">{execution.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkflowBuilder;