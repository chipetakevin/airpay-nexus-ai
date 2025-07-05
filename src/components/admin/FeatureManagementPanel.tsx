import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useFeatureAccess, ContractorFeature } from '@/hooks/useFeatureAccess';
import { supabase } from '@/integrations/supabase/client';
import { Settings, Users, Activity, Search, Filter, Plus, Save } from 'lucide-react';

interface ContractorProfile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  user_type: string;
}

export const FeatureManagementPanel: React.FC = () => {
  const { toast } = useToast();
  const { 
    features, 
    isLoading, 
    toggleFeatureAccess, 
    bulkToggleFeatureAccess, 
    getContractorFeatureAccess,
    getFeatureAccessLogs,
    loadFeatures 
  } = useFeatureAccess();

  const [contractors, setContractors] = useState<ContractorProfile[]>([]);
  const [selectedContractors, setSelectedContractors] = useState<string[]>([]);
  const [contractorFeatures, setContractorFeatures] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [loadingContractors, setLoadingContractors] = useState(true);
  const [accessLogs, setAccessLogs] = useState<any[]>([]);

  // New feature form
  const [newFeature, setNewFeature] = useState({
    feature_key: '',
    feature_name: '',
    feature_description: '',
    category: 'general'
  });

  useEffect(() => {
    loadContractors();
    loadAccessLogs();
  }, []);

  const loadContractors = async () => {
    try {
      // Get contractors from user_roles table
      const { data, error } = await supabase
        .from('user_roles')
        .select(`
          user_id,
          auth.users(email, raw_user_meta_data)
        `)
        .eq('role', 'contractor')
        .eq('is_active', true);

      if (error) {
        console.error('Error loading contractors:', error);
        return;
      }

      const contractorProfiles = data?.map((item: any) => ({
        id: item.user_id,
        email: item.auth?.users?.email || '',
        first_name: item.auth?.users?.raw_user_meta_data?.first_name || '',
        last_name: item.auth?.users?.raw_user_meta_data?.last_name || '',
        user_type: 'contractor'
      })) || [];

      setContractors(contractorProfiles);
      
      // Load feature access for all contractors
      const accessPromises = contractorProfiles.map(contractor => 
        getContractorFeatureAccess(contractor.id)
      );
      
      const accessResults = await Promise.all(accessPromises);
      const flatResults = accessResults.flat();
      setContractorFeatures(flatResults);
      
    } catch (error) {
      console.error('Error loading contractors:', error);
    } finally {
      setLoadingContractors(false);
    }
  };

  const loadAccessLogs = async () => {
    const logs = await getFeatureAccessLogs();
    setAccessLogs(logs);
  };

  const handleToggleFeature = async (contractorId: string, featureKey: string, enabled: boolean) => {
    const success = await toggleFeatureAccess(contractorId, featureKey, enabled);
    if (success) {
      await loadContractors();
      await loadAccessLogs();
    }
  };

  const handleBulkToggle = async (featureKey: string, enabled: boolean) => {
    if (selectedContractors.length === 0) {
      toast({
        title: "Error",
        description: "Please select contractors first",
        variant: "destructive"
      });
      return;
    }

    const success = await bulkToggleFeatureAccess(selectedContractors, featureKey, enabled);
    if (success) {
      await loadContractors();
      await loadAccessLogs();
      setSelectedContractors([]);
    }
  };

  const handleCreateFeature = async () => {
    if (!newFeature.feature_key || !newFeature.feature_name) {
      toast({
        title: "Error",
        description: "Feature key and name are required",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('contractor_features')
        .insert(newFeature);

      if (error) {
        console.error('Error creating feature:', error);
        toast({
          title: "Error",
          description: "Failed to create feature",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Feature created successfully"
      });

      setNewFeature({
        feature_key: '',
        feature_name: '',
        feature_description: '',
        category: 'general'
      });

      await loadFeatures();
    } catch (error) {
      console.error('Error creating feature:', error);
    }
  };

  const filteredFeatures = features.filter(feature => {
    const matchesSearch = feature.feature_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feature.feature_key.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || feature.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredContractors = contractors.filter(contractor => 
    contractor.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contractor.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contractor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(features.map(f => f.category))];

  const getContractorFeatureStatus = (contractorId: string, featureKey: string) => {
    return contractorFeatures.find(cf => 
      cf.contractor_id === contractorId && cf.feature_key === featureKey
    )?.is_enabled || false;
  };

  if (isLoading || loadingContractors) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse">Loading feature management...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Feature Management</h1>
          <p className="text-muted-foreground">
            Manage feature access for field contractors
          </p>
        </div>
        <Badge variant="default" className="flex items-center gap-1">
          <Settings className="h-3 w-3" />
          Admin Panel
        </Badge>
      </div>

      <Tabs defaultValue="contractor-features" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="contractor-features" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Contractor Access</span>
          </TabsTrigger>
          <TabsTrigger value="bulk-management" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Bulk Management</span>
          </TabsTrigger>
          <TabsTrigger value="feature-admin" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Feature Admin</span>
          </TabsTrigger>
          <TabsTrigger value="access-logs" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Access Logs</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contractor-features" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Contractor Feature Access</CardTitle>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search contractors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Contractor</th>
                      {filteredFeatures.map(feature => (
                        <th key={feature.id} className="text-left p-2 min-w-32">
                          <div className="text-xs">
                            <div className="font-medium">{feature.feature_name}</div>
                            <Badge variant="outline" className="text-xs">
                              {feature.category}
                            </Badge>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContractors.map(contractor => (
                      <tr key={contractor.id} className="border-b">
                        <td className="p-2">
                          <div>
                            <div className="font-medium">
                              {contractor.first_name} {contractor.last_name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {contractor.email}
                            </div>
                          </div>
                        </td>
                        {filteredFeatures.map(feature => (
                          <td key={feature.id} className="p-2">
                            <Switch
                              checked={getContractorFeatureStatus(contractor.id, feature.feature_key)}
                              onCheckedChange={(checked) => 
                                handleToggleFeature(contractor.id, feature.feature_key, checked)
                              }
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk-management" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Feature Management</CardTitle>
              <p className="text-sm text-muted-foreground">
                Select contractors and features to enable/disable in bulk
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm font-medium">Select Contractors</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                  {contractors.map(contractor => (
                    <div key={contractor.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={contractor.id}
                        checked={selectedContractors.includes(contractor.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedContractors([...selectedContractors, contractor.id]);
                          } else {
                            setSelectedContractors(selectedContractors.filter(id => id !== contractor.id));
                          }
                        }}
                        className="rounded border-input"
                      />
                      <Label htmlFor={contractor.id} className="text-sm">
                        {contractor.first_name} {contractor.last_name}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <Badge variant="secondary">
                    {selectedContractors.length} contractor{selectedContractors.length !== 1 ? 's' : ''} selected
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium">Bulk Actions</Label>
                {features.map(feature => (
                  <div key={feature.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{feature.feature_name}</div>
                      <div className="text-sm text-muted-foreground">{feature.feature_description}</div>
                      <Badge variant="outline" className="text-xs mt-1">
                        {feature.category}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBulkToggle(feature.feature_key, true)}
                        disabled={selectedContractors.length === 0}
                      >
                        Enable All
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBulkToggle(feature.feature_key, false)}
                        disabled={selectedContractors.length === 0}
                      >
                        Disable All
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feature-admin" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Feature</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="feature_key">Feature Key</Label>
                  <Input
                    id="feature_key"
                    value={newFeature.feature_key}
                    onChange={(e) => setNewFeature({...newFeature, feature_key: e.target.value})}
                    placeholder="e.g., advanced_reporting"
                  />
                </div>
                <div>
                  <Label htmlFor="feature_name">Feature Name</Label>
                  <Input
                    id="feature_name"
                    value={newFeature.feature_name}
                    onChange={(e) => setNewFeature({...newFeature, feature_name: e.target.value})}
                    placeholder="e.g., Advanced Reporting"
                  />
                </div>
                <div>
                  <Label htmlFor="feature_description">Description</Label>
                  <Textarea
                    id="feature_description"
                    value={newFeature.feature_description}
                    onChange={(e) => setNewFeature({...newFeature, feature_description: e.target.value})}
                    placeholder="Describe what this feature does..."
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={newFeature.category} 
                    onValueChange={(value) => setNewFeature({...newFeature, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="core">Core</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="reporting">Reporting</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="location">Location</SelectItem>
                      <SelectItem value="field_work">Field Work</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleCreateFeature} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Create Feature
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Existing Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {features.map(feature => (
                    <div key={feature.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{feature.feature_name}</div>
                          <div className="text-sm text-muted-foreground">
                            Key: {feature.feature_key}
                          </div>
                          {feature.feature_description && (
                            <div className="text-sm text-muted-foreground mt-1">
                              {feature.feature_description}
                            </div>
                          )}
                        </div>
                        <Badge variant="outline">
                          {feature.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="access-logs" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Feature Access Logs</CardTitle>
              <p className="text-sm text-muted-foreground">
                Recent feature access changes
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {accessLogs.slice(0, 50).map(log => (
                  <div key={log.id} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <div>
                      <div className="font-medium">
                        Feature: {log.feature_key}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Action: {log.action} | {new Date(log.created_at).toLocaleString()}
                      </div>
                    </div>
                    <Badge variant={log.action === 'enabled' ? 'default' : 'secondary'}>
                      {log.action}
                    </Badge>
                  </div>
                ))}
                {accessLogs.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No access logs available
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};