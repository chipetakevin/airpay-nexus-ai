import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Search, Filter, Users, RotateCcw, Save } from 'lucide-react';

interface ContractorProfile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  user_type: string;
}

export const FeatureToggleMatrix: React.FC = () => {
  const { toast } = useToast();
  const { 
    features, 
    isLoading, 
    toggleFeatureAccess, 
    getContractorFeatureAccess,
    bulkToggleFeatureAccess 
  } = useFeatureAccess();

  const [contractors, setContractors] = useState<ContractorProfile[]>([]);
  const [contractorFeatures, setContractorFeatures] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedFeature, setSelectedFeature] = useState('all');
  const [pendingChanges, setPendingChanges] = useState<Map<string, boolean>>(new Map());
  const [loadingContractors, setLoadingContractors] = useState(true);

  useEffect(() => {
    loadContractors();
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

  const getContractorFeatureStatus = (contractorId: string, featureKey: string) => {
    const key = `${contractorId}-${featureKey}`;
    if (pendingChanges.has(key)) {
      return pendingChanges.get(key);
    }
    return contractorFeatures.find(cf => 
      cf.contractor_id === contractorId && cf.feature_key === featureKey
    )?.is_enabled || false;
  };

  const handleToggle = async (contractorId: string, featureKey: string, enabled: boolean) => {
    const key = `${contractorId}-${featureKey}`;
    setPendingChanges(new Map(pendingChanges.set(key, enabled)));
    
    const success = await toggleFeatureAccess(contractorId, featureKey, enabled);
    if (success) {
      // Remove from pending changes and reload data
      const newPending = new Map(pendingChanges);
      newPending.delete(key);
      setPendingChanges(newPending);
      await loadContractors();
    }
  };

  const handleBulkToggleFeature = async (featureKey: string, enabled: boolean) => {
    const contractorIds = filteredContractors.map(c => c.id);
    const success = await bulkToggleFeatureAccess(contractorIds, featureKey, enabled);
    if (success) {
      await loadContractors();
    }
  };

  const handleBulkToggleContractor = async (contractorId: string, enabled: boolean) => {
    const promises = filteredFeatures.map(feature => 
      toggleFeatureAccess(contractorId, feature.feature_key, enabled)
    );
    
    const results = await Promise.all(promises);
    if (results.every(r => r)) {
      toast({
        title: "Success",
        description: `All features ${enabled ? 'enabled' : 'disabled'} for contractor`,
      });
      await loadContractors();
    }
  };

  const resetPendingChanges = () => {
    setPendingChanges(new Map());
  };

  const filteredContractors = contractors.filter(contractor =>
    contractor.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contractor.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contractor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFeatures = features.filter(feature => {
    const matchesCategory = categoryFilter === 'all' || feature.category === categoryFilter;
    const matchesFeature = selectedFeature === 'all' || feature.feature_key === selectedFeature;
    return matchesCategory && matchesFeature;
  });

  const categories = [...new Set(features.map(f => f.category))];

  const getContractorEnabledCount = (contractorId: string) => {
    return filteredFeatures.filter(feature => 
      getContractorFeatureStatus(contractorId, feature.feature_key)
    ).length;
  };

  const getFeatureEnabledCount = (featureKey: string) => {
    return filteredContractors.filter(contractor => 
      getContractorFeatureStatus(contractor.id, featureKey)
    ).length;
  };

  if (isLoading || loadingContractors) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse">Loading feature matrix...</div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold">Feature Toggle Matrix</h2>
          <p className="text-sm text-muted-foreground">
            Quick overview and bulk management of all contractor features
          </p>
        </div>
        {pendingChanges.size > 0 && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {pendingChanges.size} pending changes
            </Badge>
            <Button variant="outline" size="sm" onClick={resetPendingChanges}>
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contractors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
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
            <Select value={selectedFeature} onValueChange={setSelectedFeature}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by feature" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Features</SelectItem>
                {features.map(feature => (
                  <SelectItem key={feature.id} value={feature.feature_key}>
                    {feature.feature_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {filteredContractors.length} contractors
              </Badge>
              <Badge variant="outline">
                {filteredFeatures.length} features
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Matrix */}
      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-3 border-b font-medium min-w-48">
                    Contractor
                  </th>
                  {filteredFeatures.map(feature => (
                    <th key={feature.id} className="text-center p-3 border-b min-w-32">
                      <div className="space-y-1">
                        <div className="font-medium text-xs">
                          {feature.feature_name}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {feature.category}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          {getFeatureEnabledCount(feature.feature_key)}/{filteredContractors.length}
                        </div>
                        <div className="flex gap-1 justify-center">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 px-2 text-xs"
                            onClick={() => handleBulkToggleFeature(feature.feature_key, true)}
                          >
                            All On
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 px-2 text-xs"
                            onClick={() => handleBulkToggleFeature(feature.feature_key, false)}
                          >
                            All Off
                          </Button>
                        </div>
                      </div>
                    </th>
                  ))}
                  <th className="text-center p-3 border-b">
                    <div className="space-y-1">
                      <div className="font-medium text-xs">Actions</div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredContractors.map(contractor => (
                  <tr key={contractor.id} className="border-b hover:bg-muted/30">
                    <td className="p-3">
                      <div>
                        <div className="font-medium">
                          {contractor.first_name} {contractor.last_name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {contractor.email}
                        </div>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {getContractorEnabledCount(contractor.id)}/{filteredFeatures.length} enabled
                        </Badge>
                      </div>
                    </td>
                    {filteredFeatures.map(feature => (
                      <td key={feature.id} className="p-3 text-center">
                        <Switch
                          checked={getContractorFeatureStatus(contractor.id, feature.feature_key)}
                          onCheckedChange={(checked) => 
                            handleToggle(contractor.id, feature.feature_key, checked)
                          }
                          disabled={pendingChanges.has(`${contractor.id}-${feature.feature_key}`)}
                        />
                      </td>
                    ))}
                    <td className="p-3 text-center">
                      <div className="flex gap-1 justify-center">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 text-xs"
                          onClick={() => handleBulkToggleContractor(contractor.id, true)}
                        >
                          Enable All
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 text-xs"
                          onClick={() => handleBulkToggleContractor(contractor.id, false)}
                        >
                          Disable All
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {contractors.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Contractors</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {features.length}
              </div>
              <div className="text-sm text-muted-foreground">Available Features</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {contractorFeatures.filter(cf => cf.is_enabled).length}
              </div>
              <div className="text-sm text-muted-foreground">Enabled Assignments</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {Math.round((contractorFeatures.filter(cf => cf.is_enabled).length / (contractors.length * features.length)) * 100) || 0}%
              </div>
              <div className="text-sm text-muted-foreground">Feature Adoption</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};