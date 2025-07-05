import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ContractorFeature {
  id: string;
  feature_key: string;
  feature_name: string;
  feature_description?: string;
  category: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContractorFeatureAccess {
  id: string;
  contractor_id: string;
  feature_key: string;
  is_enabled: boolean;
  enabled_by?: string;
  enabled_at?: string;
  disabled_at?: string;
  created_at: string;
  updated_at: string;
}

export interface FeatureAccessLog {
  id: string;
  contractor_id: string;
  feature_key: string;
  action: 'enabled' | 'disabled';
  changed_by: string;
  reason?: string;
  metadata?: any;
  created_at: string;
}

export const useFeatureAccess = () => {
  const { toast } = useToast();
  const [features, setFeatures] = useState<ContractorFeature[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFeatures();
  }, []);

  const loadFeatures = async () => {
    try {
      const { data, error } = await supabase
        .from('contractor_features')
        .select('*')
        .eq('is_active', true)
        .order('category, feature_name');

      if (error) {
        console.error('Error loading features:', error);
        toast({
          title: "Error",
          description: "Failed to load features",
          variant: "destructive"
        });
      } else {
        setFeatures(data || []);
      }
    } catch (error) {
      console.error('Error loading features:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkFeatureAccess = async (contractorId: string, featureKey: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .rpc('contractor_has_feature_access', {
          _contractor_id: contractorId,
          _feature_key: featureKey
        });

      if (error) {
        console.error('Error checking feature access:', error);
        return false;
      }

      return data || false;
    } catch (error) {
      console.error('Error checking feature access:', error);
      return false;
    }
  };

  const getContractorFeatureAccess = async (contractorId: string) => {
    try {
      const { data, error } = await supabase
        .from('contractor_feature_access')
        .select(`
          *,
          contractor_features!inner(*)
        `)
        .eq('contractor_id', contractorId);

      if (error) {
        console.error('Error loading contractor feature access:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error loading contractor feature access:', error);
      return [];
    }
  };

  const toggleFeatureAccess = async (
    contractorId: string,
    featureKey: string,
    enabled: boolean,
    reason?: string
  ) => {
    try {
      const { error } = await supabase
        .from('contractor_feature_access')
        .upsert({
          contractor_id: contractorId,
          feature_key: featureKey,
          is_enabled: enabled,
          enabled_by: enabled ? (await supabase.auth.getUser()).data.user?.id : undefined,
          enabled_at: enabled ? new Date().toISOString() : undefined,
          disabled_at: !enabled ? new Date().toISOString() : undefined,
        });

      if (error) {
        console.error('Error toggling feature access:', error);
        toast({
          title: "Error",
          description: "Failed to update feature access",
          variant: "destructive"
        });
        return false;
      }

      toast({
        title: "Success",
        description: `Feature ${enabled ? 'enabled' : 'disabled'} successfully`,
      });

      return true;
    } catch (error) {
      console.error('Error toggling feature access:', error);
      toast({
        title: "Error",
        description: "Failed to update feature access",
        variant: "destructive"
      });
      return false;
    }
  };

  const bulkToggleFeatureAccess = async (
    contractorIds: string[],
    featureKey: string,
    enabled: boolean,
    reason?: string
  ) => {
    try {
      const userId = (await supabase.auth.getUser()).data.user?.id;
      const updates = contractorIds.map(contractorId => ({
        contractor_id: contractorId,
        feature_key: featureKey,
        is_enabled: enabled,
        enabled_by: enabled ? userId : undefined,
        enabled_at: enabled ? new Date().toISOString() : undefined,
        disabled_at: !enabled ? new Date().toISOString() : undefined,
      }));

      const { error } = await supabase
        .from('contractor_feature_access')
        .upsert(updates);

      if (error) {
        console.error('Error bulk toggling feature access:', error);
        toast({
          title: "Error",
          description: "Failed to bulk update feature access",
          variant: "destructive"
        });
        return false;
      }

      toast({
        title: "Success",
        description: `Feature ${enabled ? 'enabled' : 'disabled'} for ${contractorIds.length} contractors`,
      });

      return true;
    } catch (error) {
      console.error('Error bulk toggling feature access:', error);
      toast({
        title: "Error",
        description: "Failed to bulk update feature access",
        variant: "destructive"
      });
      return false;
    }
  };

  const getFeatureAccessLogs = async (contractorId?: string, featureKey?: string) => {
    try {
      let query = supabase
        .from('feature_access_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (contractorId) {
        query = query.eq('contractor_id', contractorId);
      }

      if (featureKey) {
        query = query.eq('feature_key', featureKey);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error loading feature access logs:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error loading feature access logs:', error);
      return [];
    }
  };

  return {
    features,
    isLoading,
    checkFeatureAccess,
    getContractorFeatureAccess,
    toggleFeatureAccess,
    bulkToggleFeatureAccess,
    getFeatureAccessLogs,
    loadFeatures
  };
};