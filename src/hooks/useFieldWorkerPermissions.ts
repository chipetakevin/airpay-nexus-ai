import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Permission {
  id: string;
  field_worker_id: string;
  permission_name: string;
  is_enabled: boolean;
  granted_by: string;
  granted_at: string;
}

interface UseFieldWorkerPermissionsReturn {
  permissions: Permission[];
  hasPermission: (permissionName: string) => boolean;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useFieldWorkerPermissions = (): UseFieldWorkerPermissionsReturn => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPermissions = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Not authenticated');
      }

      // Get field worker profile
      const { data: fieldWorker, error: fieldWorkerError } = await supabase
        .from('field_workers')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (fieldWorkerError) {
        if (fieldWorkerError.code === 'PGRST116') {
          // No field worker profile found
          setPermissions([]);
          return;
        }
        throw fieldWorkerError;
      }

      // Get permissions for this field worker
      const { data: permissionsData, error: permissionsError } = await supabase
        .from('field_worker_permissions')
        .select('*')
        .eq('field_worker_id', fieldWorker.id);

      if (permissionsError) throw permissionsError;

      setPermissions(permissionsData || []);
    } catch (err) {
      console.error('Error loading permissions:', err);
      setError(err instanceof Error ? err.message : 'Failed to load permissions');
      setPermissions([]);
    } finally {
      setLoading(false);
    }
  };

  const hasPermission = (permissionName: string): boolean => {
    const permission = permissions.find(p => p.permission_name === permissionName);
    return permission?.is_enabled || false;
  };

  useEffect(() => {
    loadPermissions();
  }, []);

  return {
    permissions,
    hasPermission,
    loading,
    error,
    refetch: loadPermissions
  };
};