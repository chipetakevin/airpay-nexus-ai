import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Database, 
  Upload, 
  Download, 
  Play, 
  Pause, 
  CheckCircle,
  AlertTriangle,
  Clock,
  FileText,
  BarChart3,
  Filter,
  Search,
  RefreshCw,
  Brain,
  Zap,
  Target,
  TrendingUp,
  Activity,
  Settings,
  Eye,
  Users,
  CreditCard,
  Smartphone,
  Network
} from 'lucide-react';

export const BulkOperationsHub: React.FC = () => {
  const { toast } = useToast();
  const [selectedOperation, setSelectedOperation] = useState<any>(null);
  const [operationFilter, setOperationFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [bulkOperations] = useState([
    {
      id: 'bulk-001',
      name: 'Bulk SIM Activation',
      type: 'activation',
      status: 'completed',
      progress: 100,
      priority: 'high',
      description: 'Mass activation of SIM cards for new customer batch',
      file: 'Divine Stuff BulkActivationsTemplate.xlsx',
      createdBy: 'Mike',
      createdAt: '2025-07-03 14:27:39',
      completedAt: '2025-07-03 14:27:52',
      metrics: {
        totalRecords: 1,
        processed: 1,
        successful: 1,
        failed: 0,
        successRate: 100,
        estimatedTime: '15 minutes',
        actualTime: '13 seconds'
      },
      aiInsights: [
        'All activations successful with zero failures',
        'Processing time 98% faster than estimated',
        'Recommend similar batch sizes for optimal performance'
      ]
    },
    {
      id: 'bulk-002',
      name: 'Bulk Service Provisioning',
      type: 'service',
      status: 'in_progress',
      progress: 67,
      priority: 'high',
      description: 'R75 Divine service provisioning for Cullinan & Nellmapius regions',
      file: '080725 Bulk Services Cullinan & Nellmapius.xlsx',
      createdBy: 'System',
      createdAt: '2025-07-08 15:27:00',
      completedAt: null,
      metrics: {
        totalRecords: 32,
        processed: 21,
        successful: 21,
        failed: 0,
        successRate: 100,
        estimatedTime: '45 minutes',
        actualTime: '28 minutes'
      },
      aiInsights: [
        'Processing ahead of schedule by 38%',
        'Zero failure rate maintained throughout operation',
        'Geographic clustering optimization detected'
      ]
    },
    {
      id: 'bulk-003',
      name: 'Plan Migration Campaign',
      type: 'migration',
      status: 'scheduled',
      progress: 0,
      priority: 'medium',
      description: 'Automated migration of customers from legacy plans to new packages',
      file: 'Plan_Migration_Q1_2025.xlsx',
      createdBy: 'AI Agent',
      createdAt: '2025-01-08 09:00:00',
      completedAt: null,
      metrics: {
        totalRecords: 847,
        processed: 0,
        successful: 0,
        failed: 0,
        successRate: 0,
        estimatedTime: '2.5 hours',
        actualTime: 'N/A'
      },
      aiInsights: [
        'Optimal migration window identified for minimal customer impact',
        'Predictive model suggests 94% customer acceptance rate',
        'Revenue impact estimated at +15% monthly recurring'
      ]
    },
    {
      id: 'bulk-004',
      name: 'Bulk Balance Adjustment',
      type: 'billing',
      status: 'failed',
      progress: 23,
      priority: 'high',
      description: 'Promotional balance credits for loyalty program participants',
      file: 'Loyalty_Credits_Dec2024.xlsx',
      createdBy: 'Finance Team',
      createdAt: '2024-12-15 16:30:00',
      completedAt: null,
      metrics: {
        totalRecords: 1456,
        processed: 334,
        successful: 298,
        failed: 36,
        successRate: 89,
        estimatedTime: '1.8 hours',
        actualTime: '2.1 hours'
      },
      aiInsights: [
        'Failure pattern identified in account validation step',
        'Recommended retry with enhanced data validation',
        'Similar operations suggest 96% success rate on retry'
      ]
    }
  ]);

  const [operationStats] = useState({
    totalOperations: 156,
    activeOperations: 3,
    completedToday: 12,
    averageSuccessRate: 94.7,
    totalRecordsProcessed: 45672,
    estimatedSavings: '89%'
  });

  const handleOperationAction = (action: string, operationId?: string) => {
    const operation = operationId ? bulkOperations.find(op => op.id === operationId) : selectedOperation;
    toast({
      title: `Operation ${action}`,
      description: `${action} executed for ${operation?.name || 'selected operation'}`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_progress': return <Play className="w-4 h-4 text-blue-600" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'scheduled': return <Clock className="w-4 h-4 text-gray-600" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'paused': return <Pause className="w-4 h-4 text-yellow-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'scheduled': return 'bg-gray-500';
      case 'failed': return 'bg-red-500';
      case 'paused': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'activation': return <Smartphone className="w-4 h-4" />;
      case 'service': return <Network className="w-4 h-4" />;
      case 'migration': return <TrendingUp className="w-4 h-4" />;
      case 'billing': return <CreditCard className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const filteredOperations = bulkOperations.filter(operation => {
    const matchesFilter = operationFilter === 'all' || operation.status === operationFilter;
    const matchesSearch = operation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         operation.file.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         operation.createdBy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Database className="w-6 h-6 text-blue-600" />
              <Badge className="bg-blue-500">Total</Badge>
            </div>
            <div className="text-2xl font-bold text-blue-700">{operationStats.totalOperations}</div>
            <div className="text-sm text-blue-600">Operations</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-6 h-6 text-green-600" />
              <Badge className="bg-green-500">Live</Badge>
            </div>
            <div className="text-2xl font-bold text-green-700">{operationStats.activeOperations}</div>
            <div className="text-sm text-green-600">Active</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-6 h-6 text-purple-600" />
              <Badge className="bg-purple-500">Today</Badge>
            </div>
            <div className="text-2xl font-bold text-purple-700">{operationStats.completedToday}</div>
            <div className="text-sm text-purple-600">Completed</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-6 h-6 text-orange-600" />
              <Badge className="bg-orange-500">Success</Badge>
            </div>
            <div className="text-2xl font-bold text-orange-700">{operationStats.averageSuccessRate}%</div>
            <div className="text-sm text-orange-600">Success Rate</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-6 h-6 text-teal-600" />
              <Badge className="bg-teal-500">Processed</Badge>
            </div>
            <div className="text-2xl font-bold text-teal-700">{operationStats.totalRecordsProcessed.toLocaleString()}</div>
            <div className="text-sm text-teal-600">Records</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Zap className="w-6 h-6 text-indigo-600" />
              <Badge className="bg-indigo-500">Efficiency</Badge>
            </div>
            <div className="text-2xl font-bold text-indigo-700">{operationStats.estimatedSavings}</div>
            <div className="text-sm text-indigo-600">Time Saved</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Operations List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="flex items-center gap-2">
                <Database className="w-6 h-6 text-blue-600" />
                Intelligent Bulk Operations
              </CardTitle>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Upload className="w-4 h-4 mr-2" />
                New Operation
              </Button>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search operations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={operationFilter} onValueChange={setOperationFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredOperations.map((operation) => (
                <div
                  key={operation.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    selectedOperation?.id === operation.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedOperation(operation)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(operation.status)}
                      {getTypeIcon(operation.type)}
                      <h4 className="font-semibold">{operation.name}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(operation.status)}>
                        {operation.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{operation.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Progress</span>
                      <span>{operation.progress}%</span>
                    </div>
                    <Progress value={operation.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {operation.file}
                    </span>
                    <span>{operation.metrics.totalRecords} records</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Operation Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Operation Control
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedOperation ? (
              <div className="space-y-6">
                {/* Operation Header */}
                <div>
                  <h3 className="font-bold text-lg mb-2">{selectedOperation.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{selectedOperation.description}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className={getStatusColor(selectedOperation.status)}>
                      {selectedOperation.status}
                    </Badge>
                    <Badge variant="outline">
                      {selectedOperation.type}
                    </Badge>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleOperationAction('start', selectedOperation.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOperationAction('pause', selectedOperation.id)}
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOperationAction('retry', selectedOperation.id)}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retry
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOperationAction('download', selectedOperation.id)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm">{selectedOperation.progress}%</span>
                  </div>
                  <Progress value={selectedOperation.progress} className="h-3" />
                </div>

                {/* File Info */}
                <div className="p-3 bg-gray-50 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium">Source File</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{selectedOperation.file}</p>
                  <p className="text-xs text-gray-500">Created by {selectedOperation.createdBy} on {selectedOperation.createdAt}</p>
                </div>

                {/* Metrics */}
                <div>
                  <h4 className="font-semibold mb-3">Performance Metrics</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2 bg-blue-50 rounded text-center">
                      <div className="text-lg font-bold text-blue-700">{selectedOperation.metrics.totalRecords}</div>
                      <div className="text-xs text-blue-600">Total Records</div>
                    </div>
                    <div className="p-2 bg-green-50 rounded text-center">
                      <div className="text-lg font-bold text-green-700">{selectedOperation.metrics.successful}</div>
                      <div className="text-xs text-green-600">Successful</div>
                    </div>
                    <div className="p-2 bg-red-50 rounded text-center">
                      <div className="text-lg font-bold text-red-700">{selectedOperation.metrics.failed}</div>
                      <div className="text-xs text-red-600">Failed</div>
                    </div>
                    <div className="p-2 bg-purple-50 rounded text-center">
                      <div className="text-lg font-bold text-purple-700">{selectedOperation.metrics.successRate}%</div>
                      <div className="text-xs text-purple-600">Success Rate</div>
                    </div>
                  </div>
                </div>

                {/* Timing */}
                <div>
                  <h4 className="font-semibold mb-3">Timing Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Time:</span>
                      <span className="font-medium">{selectedOperation.metrics.estimatedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Actual Time:</span>
                      <span className="font-medium">{selectedOperation.metrics.actualTime}</span>
                    </div>
                    {selectedOperation.completedAt && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Completed:</span>
                        <span className="font-medium">{selectedOperation.completedAt}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* AI Insights */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-purple-600" />
                    AI Insights
                  </h4>
                  <div className="space-y-2">
                    {selectedOperation.aiInsights.map((insight: string, index: number) => (
                      <div key={index} className="p-2 bg-purple-50 rounded text-sm">
                        {insight}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select an operation to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};