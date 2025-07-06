import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Zap, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Users,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Calendar,
  CreditCard,
  Wallet,
  ArrowRight,
  Play,
  Pause,
  BarChart3,
  Activity,
  Timer
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PayrollProcessing {
  id: string;
  employee_count: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  start_time: string;
  estimated_completion: string;
  total_amount: number;
}

interface OnDemandRequest {
  id: string;
  employee_id: string;
  employee_name: string;
  amount_requested: number;
  earned_amount: number;
  fee: number;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  request_date: string;
  payout_date?: string;
}

interface RealTimeMetrics {
  processing_speed: number;
  queue_size: number;
  success_rate: number;
  average_processing_time: number;
  daily_volume: number;
  errors_today: number;
}

const RealTimePayroll = () => {
  const [currentProcessing, setCurrentProcessing] = useState<PayrollProcessing | null>(null);
  const [onDemandRequests, setOnDemandRequests] = useState<OnDemandRequest[]>([]);
  const [metrics, setMetrics] = useState<RealTimeMetrics>({
    processing_speed: 0,
    queue_size: 0,
    success_rate: 0,
    average_processing_time: 0,
    daily_volume: 0,
    errors_today: 0
  });
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadRealTimeData();
    
    // Set up real-time updates
    const interval = setInterval(() => {
      if (isRealTimeEnabled) {
        updateRealTimeMetrics();
        updateProcessingStatus();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isRealTimeEnabled]);

  const loadRealTimeData = () => {
    // Mock real-time processing data
    setCurrentProcessing({
      id: '1',
      employee_count: 1247,
      status: 'processing',
      progress: 67,
      start_time: new Date().toISOString(),
      estimated_completion: new Date(Date.now() + 1800000).toISOString(), // 30 minutes
      total_amount: 12450000
    });

    // Mock on-demand pay requests
    setOnDemandRequests([
      {
        id: '1',
        employee_id: 'EMP001',
        employee_name: 'John Smith',
        amount_requested: 5000,
        earned_amount: 8500,
        fee: 50,
        status: 'pending',
        request_date: new Date().toISOString()
      },
      {
        id: '2',
        employee_id: 'EMP045',
        employee_name: 'Sarah Johnson',
        amount_requested: 3500,
        earned_amount: 12000,
        fee: 35,
        status: 'approved',
        request_date: new Date(Date.now() - 3600000).toISOString(),
        payout_date: new Date(Date.now() + 3600000).toISOString()
      },
      {
        id: '3',
        employee_id: 'EMP089',
        employee_name: 'Mike Wilson',
        amount_requested: 7500,
        earned_amount: 15000,
        fee: 75,
        status: 'paid',
        request_date: new Date(Date.now() - 7200000).toISOString(),
        payout_date: new Date(Date.now() - 1800000).toISOString()
      }
    ]);

    setMetrics({
      processing_speed: 1247,
      queue_size: 23,
      success_rate: 99.2,
      average_processing_time: 3.7,
      daily_volume: 15847,
      errors_today: 2
    });
  };

  const updateRealTimeMetrics = () => {
    setMetrics(prev => ({
      ...prev,
      processing_speed: prev.processing_speed + Math.floor(Math.random() * 10) - 5,
      queue_size: Math.max(0, prev.queue_size + Math.floor(Math.random() * 6) - 3),
      daily_volume: prev.daily_volume + Math.floor(Math.random() * 5)
    }));
  };

  const updateProcessingStatus = () => {
    if (currentProcessing && currentProcessing.status === 'processing') {
      setCurrentProcessing(prev => prev ? {
        ...prev,
        progress: Math.min(100, prev.progress + Math.random() * 2)
      } : null);
    }
  };

  const processOnDemandRequest = (requestId: string, action: 'approve' | 'reject') => {
    setOnDemandRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: action === 'approve' ? 'approved' : 'rejected' }
          : req
      )
    );

    toast({
      title: `Request ${action === 'approve' ? 'Approved' : 'Rejected'}`,
      description: `On-demand pay request has been ${action}d successfully.`,
    });
  };

  const startInstantPayroll = () => {
    toast({
      title: "Instant Payroll Started",
      description: "Real-time payroll processing has been initiated.",
    });
    
    setCurrentProcessing({
      id: Date.now().toString(),
      employee_count: 1247,
      status: 'processing',
      progress: 0,
      start_time: new Date().toISOString(),
      estimated_completion: new Date(Date.now() + 1800000).toISOString(),
      total_amount: 12450000
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Real-Time Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-600" />
            Real-Time Payroll Processing
          </h2>
          <p className="text-gray-600 text-sm">Instant payroll updates and on-demand pay</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isRealTimeEnabled ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-sm">{isRealTimeEnabled ? 'Live' : 'Offline'}</span>
          </div>
          <Button 
            onClick={() => setIsRealTimeEnabled(!isRealTimeEnabled)}
            variant={isRealTimeEnabled ? 'outline' : 'default'}
          >
            {isRealTimeEnabled ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isRealTimeEnabled ? 'Pause' : 'Resume'}
          </Button>
          <Button onClick={startInstantPayroll}>
            <Zap className="w-4 h-4 mr-2" />
            Start Instant Payroll
          </Button>
        </div>
      </div>

      {/* Real-Time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Processing Speed</p>
                <p className="text-2xl font-bold text-blue-800">{metrics.processing_speed}/min</p>
              </div>
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Queue Size</p>
                <p className="text-2xl font-bold text-green-800">{metrics.queue_size}</p>
              </div>
              <Timer className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Success Rate</p>
                <p className="text-2xl font-bold text-purple-800">{metrics.success_rate}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Avg Time</p>
                <p className="text-2xl font-bold text-orange-800">{metrics.average_processing_time}s</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-teal-700">Daily Volume</p>
                <p className="text-2xl font-bold text-teal-800">{metrics.daily_volume.toLocaleString()}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Errors Today</p>
                <p className="text-2xl font-bold text-red-800">{metrics.errors_today}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Processing Status */}
      {currentProcessing && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className={`w-5 h-5 text-blue-600 ${currentProcessing.status === 'processing' ? 'animate-spin' : ''}`} />
              Current Payroll Processing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Processing {currentProcessing.employee_count.toLocaleString()} employees</p>
                  <p className="text-sm text-gray-600">Total Amount: R{currentProcessing.total_amount.toLocaleString()}</p>
                </div>
                <Badge className={
                  currentProcessing.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                  currentProcessing.status === 'completed' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }>
                  {currentProcessing.status.toUpperCase()}
                </Badge>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{Math.round(currentProcessing.progress)}%</span>
                </div>
                <Progress value={currentProcessing.progress} className="w-full h-3" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Started:</span>
                  <span className="ml-2 font-medium">{new Date(currentProcessing.start_time).toLocaleTimeString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">ETA:</span>
                  <span className="ml-2 font-medium">{new Date(currentProcessing.estimated_completion).toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="instant" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="instant">Instant Processing</TabsTrigger>
          <TabsTrigger value="ondemand">On-Demand Pay</TabsTrigger>
          <TabsTrigger value="monitoring">Live Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="instant" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-600" />
                Instant Payroll Processing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Real-time payroll processing is active. All changes are reflected immediately.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Processing Features</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <Zap className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-blue-900">Instant Calculations</p>
                          <p className="text-sm text-blue-700">Real-time PAYE, UIF, and SDL calculations</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-900">Auto-Validation</p>
                          <p className="text-sm text-green-700">Immediate compliance and error checking</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                        <Users className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="font-medium text-purple-900">Batch Processing</p>
                          <p className="text-sm text-purple-700">Process multiple employees simultaneously</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Processing Status</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span className="font-medium">PAYE Calculations</span>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span className="font-medium">UIF Processing</span>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span className="font-medium">Banking Integration</span>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Connected
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ondemand" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">On-Demand Pay Requests</h3>
            <div className="flex gap-2">
              <Badge variant="outline">
                {onDemandRequests.filter(r => r.status === 'pending').length} Pending
              </Badge>
              <Badge variant="outline">
                {onDemandRequests.filter(r => r.status === 'approved').length} Approved
              </Badge>
            </div>
          </div>

          <div className="grid gap-4">
            {onDemandRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{request.employee_name}</h4>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Requested:</span>
                          <p className="font-medium">R{request.amount_requested.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Earned:</span>
                          <p className="font-medium">R{request.earned_amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Fee:</span>
                          <p className="font-medium">R{request.fee}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Requested:</span>
                          <p className="font-medium">{new Date(request.request_date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      {request.payout_date && (
                        <p className="text-sm text-green-600">
                          Payout: {new Date(request.payout_date).toLocaleString()}
                        </p>
                      )}
                    </div>
                    
                    {request.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => processOnDemandRequest(request.id, 'approve')}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => processOnDemandRequest(request.id, 'reject')}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                    
                    {request.status === 'approved' && (
                      <Button size="sm">
                        <CreditCard className="w-4 h-4 mr-1" />
                        Process Payment
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Processing Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="font-medium">Payroll Processing</span>
                    </div>
                    <span className="text-sm text-green-700">{metrics.processing_speed}/min</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                      <span className="font-medium">Queue Management</span>
                    </div>
                    <span className="text-sm text-blue-700">{metrics.queue_size} waiting</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
                      <span className="font-medium">Compliance Checks</span>
                    </div>
                    <span className="text-sm text-purple-700">{metrics.success_rate}% success</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Processing Speed</span>
                      <span>{metrics.processing_speed}/min</span>
                    </div>
                    <Progress value={(metrics.processing_speed / 2000) * 100} className="w-full" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Success Rate</span>
                      <span>{metrics.success_rate}%</span>
                    </div>
                    <Progress value={metrics.success_rate} className="w-full" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>System Load</span>
                      <span>{Math.round((metrics.queue_size / 100) * 100)}%</span>
                    </div>
                    <Progress value={(metrics.queue_size / 100) * 100} className="w-full" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Daily Throughput</span>
                      <span>{((metrics.daily_volume / 20000) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(metrics.daily_volume / 20000) * 100} className="w-full" />
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

export default RealTimePayroll;