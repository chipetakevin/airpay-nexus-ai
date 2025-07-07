import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  Download,
  Search,
  Filter,
  MapPin,
  Phone,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  Target,
  Award
} from 'lucide-react';

interface FieldWorker {
  id: string;
  full_name: string;
  registration_status: string;
  total_activations: number;
  total_commissions_earned: number;
  current_month_activations: number;
  region_assignment: string;
  last_activity_at: string;
}

interface Activation {
  id: string;
  customer_name: string;
  customer_phone: string;
  network_provider: string;
  activation_date: string;
  rica_status: string;
  commission_amount: number;
  commission_status: string;
}

interface CommissionStatement {
  id: string;
  statement_month: number;
  statement_year: number;
  total_activations: number;
  gross_commission: number;
  net_commission: number;
  payment_status: string;
  payment_date: string;
}

const FieldWorkerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [fieldWorker, setFieldWorker] = useState<FieldWorker | null>(null);
  const [activations, setActivations] = useState<Activation[]>([]);
  const [statements, setStatements] = useState<CommissionStatement[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    loadFieldWorkerData();
  }, []);

  const loadFieldWorkerData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Load field worker profile
      const { data: workerData, error: workerError } = await supabase
        .from('field_workers')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (workerError) throw workerError;
      setFieldWorker(workerData);

      if (workerData) {
        // Load activations
        const { data: activationsData, error: activationsError } = await supabase
          .from('field_worker_activations')
          .select('*')
          .eq('field_worker_id', workerData.id)
          .order('activation_date', { ascending: false });

        if (activationsError) throw activationsError;
        setActivations(activationsData || []);

        // Load commission statements
        const { data: statementsData, error: statementsError } = await supabase
          .from('field_worker_commission_statements')
          .select('*')
          .eq('field_worker_id', workerData.id)
          .order('statement_year', { ascending: false })
          .order('statement_month', { ascending: false });

        if (statementsError) throw statementsError;
        setStatements(statementsData || []);
      }
    } catch (error) {
      console.error('Error loading field worker data:', error);
      toast({
        title: "Error Loading Data",
        description: "Failed to load your field worker information.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateCommissionStatement = async (month: number, year: number) => {
    if (!fieldWorker) return;

    try {
      const { data, error } = await supabase.rpc('calculate_field_worker_commission', {
        p_field_worker_id: fieldWorker.id,
        p_month: month,
        p_year: year
      });

      if (error) throw error;

      toast({
        title: "Statement Generated",
        description: `Commission statement for ${month}/${year} has been generated.`,
      });

      loadFieldWorkerData(); // Reload data
    } catch (error) {
      console.error('Error generating statement:', error);
      toast({
        title: "Error",
        description: "Failed to generate commission statement.",
        variant: "destructive"
      });
    }
  };

  const filteredActivations = activations.filter(activation => {
    const matchesSearch = activation.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activation.customer_phone.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || activation.rica_status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const todayActivations = activations.filter(a => 
    new Date(a.activation_date).toDateString() === new Date().toDateString()
  ).length;

  const monthlyTarget = 20; // Example target
  const monthProgress = fieldWorker ? (fieldWorker.current_month_activations / monthlyTarget) * 100 : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!fieldWorker) {
    return (
      <div className="text-center p-8">
        <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Field Worker Profile Not Found</h3>
        <p className="text-gray-600 mb-4">
          You need to complete your field worker registration first.
        </p>
        <Button onClick={() => window.location.reload()}>
          Refresh Page
        </Button>
      </div>
    );
  }

  // Show Customer Onboarding Tab if approved
  if (fieldWorker.registration_status === 'approved') {
    const CustomerOnboardingTab = React.lazy(() => import('./CustomerOnboardingTab'));
    
    return (
      <div className="space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-800">Registration Approved!</span>
          </div>
          <p className="text-green-700 mt-1">You can now start onboarding customers.</p>
        </div>
        
        <React.Suspense fallback={
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        }>
          <CustomerOnboardingTab />
        </React.Suspense>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Banner */}
      <Card className={`border-l-4 ${
        fieldWorker.registration_status === 'approved' ? 'border-l-green-500 bg-green-50' :
        fieldWorker.registration_status === 'pending' ? 'border-l-yellow-500 bg-yellow-50' :
        'border-l-red-500 bg-red-50'
      }`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Welcome, {fieldWorker.full_name}!</h3>
              <p className="text-sm text-gray-600">Region: {fieldWorker.region_assignment}</p>
            </div>
            <Badge variant={
              fieldWorker.registration_status === 'approved' ? 'default' :
              fieldWorker.registration_status === 'pending' ? 'secondary' : 'destructive'
            }>
              {fieldWorker.registration_status.toUpperCase()}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Today's Activations</p>
                <p className="text-2xl font-bold">{todayActivations}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold">{fieldWorker.current_month_activations}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold">R{fieldWorker.total_commissions_earned.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Award className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Activations</p>
                <p className="text-2xl font-bold">{fieldWorker.total_activations}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Monthly Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Activations: {fieldWorker.current_month_activations} / {monthlyTarget}</span>
              <span>{Math.round(monthProgress)}%</span>
            </div>
            <Progress value={monthProgress} className="w-full" />
            <p className="text-sm text-gray-600">
              {monthlyTarget - fieldWorker.current_month_activations} more activations to reach your monthly target!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="activations">Customer Activations</TabsTrigger>
          <TabsTrigger value="commissions">Commission Statements</TabsTrigger>
          <TabsTrigger value="profile">My Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="activations" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Customers</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by name or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="filter">Filter by Status</Label>
              <select
                id="filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>

          {/* Activations List */}
          <div className="space-y-3">
            {filteredActivations.map((activation) => (
              <Card key={activation.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{activation.customer_name}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {activation.customer_phone}
                          </span>
                          <span>{activation.network_provider}</span>
                          <span>{new Date(activation.activation_date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={
                        activation.rica_status === 'completed' ? 'default' :
                        activation.rica_status === 'pending' ? 'secondary' : 'destructive'
                      }>
                        {activation.rica_status}
                      </Badge>
                      <p className="text-sm font-semibold mt-1">R{activation.commission_amount}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredActivations.length === 0 && (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Activations Found</h3>
                <p className="text-gray-600">Start onboarding customers to see them here!</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="commissions" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Commission Statements</h3>
            <Button onClick={() => generateCommissionStatement(new Date().getMonth() + 1, new Date().getFullYear())}>
              Generate Current Month
            </Button>
          </div>

          <div className="space-y-3">
            {statements.map((statement) => (
              <Card key={statement.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">
                        {new Date(2024, statement.statement_month - 1).toLocaleString('default', { month: 'long' })} {statement.statement_year}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{statement.total_activations} activations</span>
                        <span>Gross: R{statement.gross_commission}</span>
                        <span className="font-semibold">Net: R{statement.net_commission}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        statement.payment_status === 'paid' ? 'default' :
                        statement.payment_status === 'processed' ? 'secondary' : 'outline'
                      }>
                        {statement.payment_status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {statements.length === 0 && (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Statements Yet</h3>
                <p className="text-gray-600">Commission statements will appear here once generated.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Field Worker Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <p className="font-medium">{fieldWorker.full_name}</p>
                </div>
                <div>
                  <Label>Region Assignment</Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <p className="font-medium">{fieldWorker.region_assignment}</p>
                  </div>
                </div>
                <div>
                  <Label>Registration Status</Label>
                  <Badge variant={
                    fieldWorker.registration_status === 'approved' ? 'default' :
                    fieldWorker.registration_status === 'pending' ? 'secondary' : 'destructive'
                  }>
                    {fieldWorker.registration_status}
                  </Badge>
                </div>
                <div>
                  <Label>Last Activity</Label>
                  <p className="text-sm text-gray-600">
                    {fieldWorker.last_activity_at ? 
                      new Date(fieldWorker.last_activity_at).toLocaleString() : 
                      'No recent activity'
                    }
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-2">Performance Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{fieldWorker.total_activations}</p>
                    <p className="text-sm text-gray-600">Total Activations</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">R{fieldWorker.total_commissions_earned.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">Total Earnings</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{fieldWorker.current_month_activations}</p>
                    <p className="text-sm text-gray-600">This Month</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FieldWorkerDashboard;