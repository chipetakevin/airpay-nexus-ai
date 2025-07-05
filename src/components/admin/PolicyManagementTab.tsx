import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  FileText, 
  Send, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  Download, 
  Eye,
  Edit,
  Plus,
  RefreshCcw,
  Calendar,
  Mail,
  BarChart3
} from 'lucide-react';

interface PolicyDocument {
  id: string;
  title: string;
  version: string;
  category: string;
  content: any;
  status: string;
  effective_date: string;
  created_at: string;
  updated_at: string;
}

interface StakeholderContact {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  user_type: string;
  department: string;
  is_active: boolean;
}

interface PolicyDistribution {
  id: string;
  policy_id: string;
  distribution_date: string;
  total_recipients: number;
  total_acknowledged: number;
  email_sent_count: number;
  email_failed_count: number;
  distribution_status: string;
}

const PolicyManagementTab: React.FC = () => {
  const { toast } = useToast();
  const [policies, setPolicies] = useState<PolicyDocument[]>([]);
  const [stakeholders, setStakeholders] = useState<StakeholderContact[]>([]);
  const [distributions, setDistributions] = useState<PolicyDistribution[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyDocument | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newPolicy, setNewPolicy] = useState({
    title: '',
    version: '1.0',
    category: 'ict',
    content: {
      summary: '',
      sections: [],
      requirements: []
    }
  });

  useEffect(() => {
    loadPolicies();
    loadStakeholders();
    loadDistributions();
  }, []);

  const loadPolicies = async () => {
    try {
      const { data, error } = await supabase
        .from('policy_documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPolicies(data || []);
    } catch (error) {
      console.error('Error loading policies:', error);
      toast({
        title: "Error",
        description: "Failed to load policies",
        variant: "destructive"
      });
    }
  };

  const loadStakeholders = async () => {
    try {
      const { data, error } = await supabase
        .from('stakeholder_contacts')
        .select('*')
        .eq('is_active', true)
        .order('last_name');

      if (error) throw error;
      setStakeholders(data || []);
    } catch (error) {
      console.error('Error loading stakeholders:', error);
    }
  };

  const loadDistributions = async () => {
    try {
      const { data, error } = await supabase
        .from('policy_distributions')
        .select('*')
        .order('distribution_date', { ascending: false })
        .limit(10);

      if (error) throw error;
      setDistributions(data || []);
    } catch (error) {
      console.error('Error loading distributions:', error);
    }
  };

  const createPolicy = async () => {
    if (!newPolicy.title.trim()) {
      toast({
        title: "Error",
        description: "Policy title is required",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('policy_documents')
        .insert([{
          ...newPolicy,
          created_by: user.id,
          status: 'draft'
        }])
        .select()
        .single();

      if (error) throw error;

      setPolicies(prev => [data, ...prev]);
      setIsCreating(false);
      setNewPolicy({
        title: '',
        version: '1.0',
        category: 'ict',
        content: { summary: '', sections: [], requirements: [] }
      });

      toast({
        title: "Success",
        description: "Policy created successfully"
      });
    } catch (error) {
      console.error('Error creating policy:', error);
      toast({
        title: "Error",
        description: "Failed to create policy",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const distributePolicy = async (policyId: string) => {
    try {
      setLoading(true);
      const policy = policies.find(p => p.id === policyId);
      if (!policy) throw new Error('Policy not found');

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Create distribution record
      const { data: distribution, error: distError } = await supabase
        .from('policy_distributions')
        .insert([{
          policy_id: policyId,
          total_recipients: stakeholders.length,
          created_by: user.id,
          distribution_status: 'sending'
        }])
        .select()
        .single();

      if (distError) throw distError;

      // Prepare recipient data
      const recipients = stakeholders.map(s => ({
        email: s.email,
        firstName: s.first_name,
        lastName: s.last_name,
        role: s.role,
        userType: s.user_type
      }));

      // Call edge function to send emails
      const { data: emailResult, error: emailError } = await supabase.functions.invoke('send-policy-email', {
        body: {
          policyId: policy.id,
          policyTitle: policy.title,
          policyVersion: policy.version,
          policyCategory: policy.category,
          recipients: recipients
        }
      });

      if (emailError) throw emailError;

      toast({
        title: "Distribution Complete",
        description: `Policy sent to ${emailResult.successCount} recipients`,
      });

      loadDistributions();
    } catch (error) {
      console.error('Error distributing policy:', error);
      toast({
        title: "Error",
        description: "Failed to distribute policy",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cybersecurity': return '🔒';
      case 'ict': return '💻';
      case 'sop': return '📋';
      case 'training': return '🎓';
      default: return '📄';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-100">
            <FileText className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Policy Management Center</h2>
            <p className="text-gray-600 text-sm">Automated policy distribution and compliance tracking</p>
          </div>
        </div>
        <Button onClick={() => setIsCreating(true)} className="bg-amber-600 hover:bg-amber-700">
          <Plus className="w-4 h-4 mr-2" />
          New Policy
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Policies</p>
                <p className="text-2xl font-bold">{policies.length}</p>
              </div>
              <FileText className="w-8 h-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Stakeholders</p>
                <p className="text-2xl font-bold">{stakeholders.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Distributions</p>
                <p className="text-2xl font-bold">{distributions.length}</p>
              </div>
              <Send className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Acknowledgment Rate</p>
                <p className="text-2xl font-bold">
                  {distributions.length > 0 
                    ? Math.round((distributions.reduce((acc, d) => acc + d.total_acknowledged, 0) / 
                        distributions.reduce((acc, d) => acc + d.total_recipients, 0)) * 100)
                    : 0}%
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Policy Creation Modal */}
      {isCreating && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle>Create New Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Policy Title</label>
                <Input
                  value={newPolicy.title}
                  onChange={(e) => setNewPolicy(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter policy title..."
                />
              </div>
              <div>
                <label className="text-sm font-medium">Version</label>
                <Input
                  value={newPolicy.version}
                  onChange={(e) => setNewPolicy(prev => ({ ...prev, version: e.target.value }))}
                  placeholder="1.0"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Category</label>
              <Select value={newPolicy.category} onValueChange={(value) => setNewPolicy(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ict">ICT Policy</SelectItem>
                  <SelectItem value="cybersecurity">Cybersecurity Policy</SelectItem>
                  <SelectItem value="sop">Standard Operating Procedures</SelectItem>
                  <SelectItem value="training">Training Materials</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Policy Summary</label>
              <Textarea
                value={newPolicy.content.summary}
                onChange={(e) => setNewPolicy(prev => ({ 
                  ...prev, 
                  content: { ...prev.content, summary: e.target.value }
                }))}
                placeholder="Brief summary of the policy..."
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={createPolicy} disabled={loading}>
                {loading ? <RefreshCcw className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                Create Policy
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Policies List */}
      <Card>
        <CardHeader>
          <CardTitle>Policy Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {policies.map((policy) => (
              <div key={policy.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{getCategoryIcon(policy.category)}</div>
                  <div>
                    <h3 className="font-semibold">{policy.title}</h3>
                    <p className="text-sm text-gray-600">Version {policy.version} • {policy.category}</p>
                    <p className="text-xs text-gray-500">
                      Created: {new Date(policy.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(policy.status)}>
                    {policy.status.toUpperCase()}
                  </Badge>
                  
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => distributePolicy(policy.id)}
                    disabled={loading || policy.status !== 'active'}
                  >
                    <Send className="w-4 h-4 mr-1" />
                    Distribute
                  </Button>
                </div>
              </div>
            ))}

            {policies.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No policies created yet</p>
                <p className="text-sm">Create your first policy to get started</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Distributions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Policy Distributions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {distributions.map((dist) => (
              <div key={dist.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Policy Distribution</p>
                  <p className="text-sm text-gray-600">
                    {new Date(dist.distribution_date).toLocaleDateString()} • 
                    {dist.total_recipients} recipients
                  </p>
                </div>
                <div className="text-right">
                  <Badge className={
                    dist.distribution_status === 'completed' ? 'bg-green-100 text-green-800' :
                    dist.distribution_status === 'sending' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }>
                    {dist.distribution_status.toUpperCase()}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">
                    {dist.email_sent_count} sent • {dist.total_acknowledged} acknowledged
                  </p>
                </div>
              </div>
            ))}

            {distributions.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                <Mail className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No distributions yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PolicyManagementTab;