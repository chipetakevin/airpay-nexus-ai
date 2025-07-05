import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePermissions } from '@/hooks/usePermissions';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Calendar,
  Bell,
  TrendingUp,
  Users,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComplianceRecord {
  id: string;
  contractorId: string;
  contractorName: string;
  type: 'training' | 'certification' | 'document' | 'assessment';
  title: string;
  status: 'compliant' | 'overdue' | 'expiring' | 'pending';
  dueDate: string;
  completedDate?: string;
  expiryDate?: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

interface ComplianceMetrics {
  totalRecords: number;
  compliant: number;
  overdue: number;
  expiring: number;
  pending: number;
  complianceRate: number;
}

const MOCK_COMPLIANCE_RECORDS: ComplianceRecord[] = [
  {
    id: '1',
    contractorId: 'c1',
    contractorName: 'John Doe',
    type: 'training',
    title: 'Health & Safety Training',
    status: 'compliant',
    dueDate: '2024-02-01',
    completedDate: '2024-01-15',
    priority: 'high',
    category: 'Safety'
  },
  {
    id: '2',
    contractorId: 'c2',
    contractorName: 'Jane Smith',
    type: 'certification',
    title: 'RICA Compliance Certificate',
    status: 'expiring',
    dueDate: '2024-01-30',
    expiryDate: '2024-01-30',
    priority: 'high',
    category: 'Regulatory'
  },
  {
    id: '3',
    contractorId: 'c1',
    contractorName: 'John Doe',
    type: 'document',
    title: 'ID Document Verification',
    status: 'overdue',
    dueDate: '2024-01-01',
    priority: 'medium',
    category: 'Documentation'
  },
  {
    id: '4',
    contractorId: 'c3',
    contractorName: 'Mike Johnson',
    type: 'assessment',
    title: 'Field Work Assessment',
    status: 'pending',
    dueDate: '2024-02-15',
    priority: 'medium',
    category: 'Performance'
  }
];

export const ComplianceTrackingSystem: React.FC = () => {
  const { hasRole, currentUser } = usePermissions();
  const { toast } = useToast();
  const [complianceRecords, setComplianceRecords] = useState<ComplianceRecord[]>(MOCK_COMPLIANCE_RECORDS);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [metrics, setMetrics] = useState<ComplianceMetrics>({
    totalRecords: 0,
    compliant: 0,
    overdue: 0,
    expiring: 0,
    pending: 0,
    complianceRate: 0
  });

  const isAdmin = hasRole(['admin', 'manager']);
  const isContractor = hasRole('contractor') || currentUser?.userType === 'vendor';

  useEffect(() => {
    calculateMetrics();
  }, [complianceRecords]);

  const calculateMetrics = () => {
    const total = complianceRecords.length;
    const compliant = complianceRecords.filter(r => r.status === 'compliant').length;
    const overdue = complianceRecords.filter(r => r.status === 'overdue').length;
    const expiring = complianceRecords.filter(r => r.status === 'expiring').length;
    const pending = complianceRecords.filter(r => r.status === 'pending').length;
    const complianceRate = total > 0 ? (compliant / total) * 100 : 0;

    setMetrics({
      totalRecords: total,
      compliant,
      overdue,
      expiring,
      pending,
      complianceRate
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle2 className="h-4 w-4 text-toggle-enabled" />;
      case 'expiring':
        return <Clock className="h-4 w-4 text-feature-pending-text" />;
      case 'overdue':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'bg-feature-enabled-bg border-feature-enabled-border text-feature-enabled-text';
      case 'expiring':
        return 'bg-feature-pending-bg border-feature-pending-border text-feature-pending-text';
      case 'overdue':
        return 'bg-destructive/10 border-destructive text-destructive';
      case 'pending':
        return 'bg-muted border-muted-foreground/20 text-muted-foreground';
      default:
        return 'bg-muted border-muted-foreground/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'training':
        return <FileText className="h-4 w-4" />;
      case 'certification':
        return <Shield className="h-4 w-4" />;
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'assessment':
        return <Target className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const sendComplianceReminder = async (recordId: string) => {
    console.log('Sending compliance reminder for record:', recordId);
    toast({
      title: "Reminder Sent",
      description: "Compliance reminder has been sent to the contractor",
    });
  };

  const filteredRecords = complianceRecords.filter(record => {
    if (selectedFilter === 'all') return true;
    return record.status === selectedFilter;
  });

  const contractorRecords = isContractor 
    ? complianceRecords.filter(r => r.contractorId === currentUser?.id)
    : complianceRecords;

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center space-x-2">
            <Shield className="h-6 w-6" />
            <span>Compliance Tracking</span>
          </h1>
          <p className="text-muted-foreground">
            {isAdmin ? 'Monitor contractor compliance status and requirements' : 'Track your compliance requirements and deadlines'}
          </p>
        </div>
        
        {isAdmin && (
          <Button onClick={() => console.log('Send bulk reminders')}>
            <Bell className="h-4 w-4 mr-2" />
            Send Reminders
          </Button>
        )}
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{metrics.totalRecords}</div>
            <div className="text-sm text-muted-foreground">Total Records</div>
          </CardContent>
        </Card>
        <Card className="bg-feature-enabled-bg border-feature-enabled-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-feature-enabled-text">{metrics.compliant}</div>
            <div className="text-sm text-feature-enabled-text">Compliant</div>
          </CardContent>
        </Card>
        <Card className="bg-destructive/10 border-destructive">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">{metrics.overdue}</div>
            <div className="text-sm text-destructive">Overdue</div>
          </CardContent>
        </Card>
        <Card className="bg-feature-pending-bg border-feature-pending-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-feature-pending-text">{metrics.expiring}</div>
            <div className="text-sm text-feature-pending-text">Expiring Soon</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{Math.round(metrics.complianceRate)}%</div>
            <div className="text-sm text-muted-foreground">Compliance Rate</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="records" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Records</span>
          </TabsTrigger>
          {isAdmin && (
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Compliance Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Overall Compliance Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Compliance Rate</span>
                    <span className="text-sm text-muted-foreground">{Math.round(metrics.complianceRate)}%</span>
                  </div>
                  <Progress value={metrics.complianceRate} className="h-3" />
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center p-3 bg-feature-enabled-bg rounded-lg">
                      <div className="text-lg font-bold text-feature-enabled-text">{metrics.compliant}</div>
                      <div className="text-xs text-feature-enabled-text">Compliant</div>
                    </div>
                    <div className="text-center p-3 bg-destructive/10 rounded-lg">
                      <div className="text-lg font-bold text-destructive">{metrics.overdue}</div>
                      <div className="text-xs text-destructive">Overdue</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Compliance Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {complianceRecords.slice(0, 5).map(record => (
                    <div key={record.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/30">
                      {getTypeIcon(record.type)}
                      <div className="flex-1">
                        <div className="font-medium text-sm">{record.title}</div>
                        <div className="text-xs text-muted-foreground">{record.contractorName}</div>
                      </div>
                      <Badge variant="outline" className={cn("text-xs", getStatusColor(record.status))}>
                        {record.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="records" className="mt-6">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            {['all', 'compliant', 'overdue', 'expiring', 'pending'].map(filter => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            ))}
          </div>

          {/* Records List */}
          <div className="space-y-3">
            {filteredRecords.map(record => (
              <Card key={record.id} className={cn("transition-all", getStatusColor(record.status))}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getStatusIcon(record.status)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium">{record.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {record.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {record.category}
                          </Badge>
                        </div>
                        
                        {isAdmin && (
                          <p className="text-sm text-muted-foreground mb-2">
                            Contractor: {record.contractorName}
                          </p>
                        )}
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>Due: {new Date(record.dueDate).toLocaleDateString()}</span>
                          </div>
                          
                          {record.completedDate && (
                            <div className="flex items-center space-x-1">
                              <CheckCircle2 className="h-3 w-3" />
                              <span>Completed: {new Date(record.completedDate).toLocaleDateString()}</span>
                            </div>
                          )}
                          
                          {record.expiryDate && (
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>Expires: {new Date(record.expiryDate).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {isAdmin && record.status !== 'compliant' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => sendComplianceReminder(record.id)}
                        className="ml-4"
                      >
                        <Bell className="h-3 w-3 mr-1" />
                        Remind
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredRecords.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">No compliance records found for the selected filter.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {isAdmin && (
          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['Safety', 'Regulatory', 'Documentation', 'Performance'].map(category => {
                      const categoryRecords = complianceRecords.filter(r => r.category === category);
                      const compliantInCategory = categoryRecords.filter(r => r.status === 'compliant').length;
                      const categoryRate = categoryRecords.length > 0 ? (compliantInCategory / categoryRecords.length) * 100 : 0;
                      
                      return (
                        <div key={category}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{category}</span>
                            <span className="text-sm text-muted-foreground">{Math.round(categoryRate)}%</span>
                          </div>
                          <Progress value={categoryRate} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Compliance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <Alert>
                    <TrendingUp className="h-4 w-4" />
                    <AlertDescription>
                      Compliance rate has improved by 15% over the last month. 
                      Continue monitoring overdue items for best results.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};