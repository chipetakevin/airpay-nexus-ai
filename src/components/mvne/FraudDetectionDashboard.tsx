import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Brain, 
  Target, 
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Eye,
  UserX,
  MapPin,
  DollarSign,
  BarChart3
} from 'lucide-react';

interface FraudAlert {
  id: string;
  transactionId: string;
  customerId: string;
  customerName: string;
  alertType: string;
  riskScore: number;
  confidenceScore: number;
  amount: number;
  location: string;
  detectionReason: string;
  status: 'pending' | 'investigating' | 'resolved' | 'false_positive';
  timestamp: string;
  investigatedBy?: string;
}

interface FraudRule {
  id: string;
  name: string;
  type: 'velocity' | 'pattern' | 'anomaly' | 'geographic' | 'behavioral';
  threshold: number;
  isActive: boolean;
  detectionRate: number;
  falsePositiveRate: number;
  isMLEnhanced: boolean;
}

const FraudDetectionDashboard = () => {
  const [alerts, setAlerts] = useState<FraudAlert[]>([]);
  const [rules, setRules] = useState<FraudRule[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState<FraudAlert | null>(null);

  // Mock data for demonstration
  useEffect(() => {
    setAlerts([
      {
        id: '1',
        transactionId: 'TXN001234',
        customerId: 'CUST001',
        customerName: 'John Mthembu',
        alertType: 'High Risk Transaction',
        riskScore: 95,
        confidenceScore: 87,
        amount: 15000,
        location: 'Lagos, Nigeria',
        detectionReason: 'Transaction amount exceeds customer\'s typical spending pattern by 500%',
        status: 'pending',
        timestamp: '2024-01-08 14:30:00',
      },
      {
        id: '2',
        transactionId: 'TXN001235',
        customerId: 'CUST002',
        customerName: 'Jane Smith',
        alertType: 'Velocity Anomaly',
        riskScore: 78,
        confidenceScore: 92,
        amount: 500,
        location: 'Cape Town, SA',
        detectionReason: '15 transactions within 5 minutes - unusual velocity pattern detected',
        status: 'investigating',
        timestamp: '2024-01-08 14:25:00',
        investigatedBy: 'Admin User'
      },
      {
        id: '3',
        transactionId: 'TXN001236',
        customerId: 'CUST003',
        customerName: 'Mike Johnson',
        alertType: 'Geographic Risk',
        riskScore: 65,
        confidenceScore: 74,
        amount: 2500,
        location: 'Unknown Location',
        detectionReason: 'Transaction initiated from high-risk geographic location',
        status: 'resolved',
        timestamp: '2024-01-08 14:20:00',
        investigatedBy: 'Security Team'
      },
      {
        id: '4',
        transactionId: 'TXN001237',
        customerId: 'CUST004',
        customerName: 'Sarah Wilson',
        alertType: 'Behavioral Pattern',
        riskScore: 82,
        confidenceScore: 89,
        amount: 750,
        location: 'Johannesburg, SA',
        detectionReason: 'Unusual transaction timing - activity outside normal hours',
        status: 'false_positive',
        timestamp: '2024-01-08 14:15:00'
      }
    ]);

    setRules([
      {
        id: '1',
        name: 'High Amount Threshold',
        type: 'velocity',
        threshold: 10000,
        isActive: true,
        detectionRate: 94.5,
        falsePositiveRate: 2.1,
        isMLEnhanced: true
      },
      {
        id: '2',
        name: 'Transaction Velocity',
        type: 'velocity',
        threshold: 10,
        isActive: true,
        detectionRate: 87.3,
        falsePositiveRate: 5.8,
        isMLEnhanced: true
      },
      {
        id: '3',
        name: 'Geographic Risk',
        type: 'geographic',
        threshold: 0.7,
        isActive: true,
        detectionRate: 76.2,
        falsePositiveRate: 12.4,
        isMLEnhanced: false
      },
      {
        id: '4',
        name: 'Behavioral Anomaly',
        type: 'behavioral',
        threshold: 0.8,
        isActive: true,
        detectionRate: 82.7,
        falsePositiveRate: 8.9,
        isMLEnhanced: true
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'investigating': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'false_positive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalAlerts = alerts.length;
  const pendingAlerts = alerts.filter(a => a.status === 'pending').length;
  const resolvedAlerts = alerts.filter(a => a.status === 'resolved').length;
  const avgRiskScore = alerts.reduce((sum, alert) => sum + alert.riskScore, 0) / alerts.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Fraud Detection</h1>
          <p className="text-gray-600">Advanced fraud monitoring and detection system</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Target className="w-4 h-4 mr-2" />
            Tune Models
          </Button>
          <Button>
            <Brain className="w-4 h-4 mr-2" />
            Train AI
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAlerts}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +12% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingAlerts}</div>
            <p className="text-xs text-muted-foreground">
              Requires investigation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Detection Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.3%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +2.1% improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Risk Score</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgRiskScore.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              Current period average
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="alerts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
          <TabsTrigger value="rules">Detection Rules</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-6">
          {/* Filters */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by customer name or transaction ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="false_positive">False Positive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Alerts List */}
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <Card key={alert.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <div className={`p-2 rounded-full ${alert.riskScore >= 80 ? 'bg-red-100 text-red-600' : alert.riskScore >= 60 ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                          <Shield className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{alert.alertType}</h3>
                          <p className="text-sm text-gray-600">
                            {alert.customerName} • {alert.transactionId}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">R{alert.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{alert.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{alert.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{alert.confidenceScore}% confidence</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 mb-4">{alert.detectionReason}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <span className="text-xs text-gray-500">Risk Score</span>
                            <div className="flex items-center gap-2">
                              <Progress value={alert.riskScore} className="w-20 h-2" />
                              <span className={`font-bold ${getRiskColor(alert.riskScore)}`}>
                                {alert.riskScore}%
                              </span>
                            </div>
                          </div>
                          <Badge className={getStatusColor(alert.status)}>
                            {alert.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                          {alert.status === 'pending' && (
                            <>
                              <Button variant="outline" size="sm">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button variant="destructive" size="sm">
                                <UserX className="w-4 h-4 mr-1" />
                                Block
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rules" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rules.map((rule) => (
              <Card key={rule.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{rule.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      {rule.isMLEnhanced && (
                        <Badge variant="secondary">
                          <Brain className="w-3 h-3 mr-1" />
                          AI Enhanced
                        </Badge>
                      )}
                      <Badge variant={rule.isActive ? 'default' : 'secondary'}>
                        {rule.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>
                    Type: {rule.type} • Threshold: {rule.threshold}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Detection Rate</span>
                        <span className="font-semibold">{rule.detectionRate}%</span>
                      </div>
                      <Progress value={rule.detectionRate} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>False Positive Rate</span>
                        <span className="font-semibold">{rule.falsePositiveRate}%</span>
                      </div>
                      <Progress value={rule.falsePositiveRate} className="h-2" />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Filter className="w-4 h-4 mr-1" />
                        Configure
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Analytics
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Detection Performance</CardTitle>
                <CardDescription>AI model performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Accuracy Rate</span>
                    <span className="font-bold text-green-600">94.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Precision</span>
                    <span className="font-bold text-blue-600">91.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recall</span>
                    <span className="font-bold text-purple-600">89.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>F1 Score</span>
                    <span className="font-bold text-orange-600">90.4%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Distribution</CardTitle>
                <CardDescription>Breakdown by alert type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: 'High Risk Transaction', count: 45, percentage: 35 },
                    { type: 'Velocity Anomaly', count: 32, percentage: 25 },
                    { type: 'Geographic Risk', count: 28, percentage: 22 },
                    { type: 'Behavioral Pattern', count: 23, percentage: 18 }
                  ].map((item) => (
                    <div key={item.type} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.type}</span>
                        <span>{item.count} alerts</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Model Training Status</CardTitle>
              <CardDescription>AI model training and improvement metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <Brain className="h-4 w-4" />
                <AlertDescription>
                  AI model was last updated 2 hours ago with 15,000 new transaction samples. 
                  Next scheduled training in 6 hours.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FraudDetectionDashboard;