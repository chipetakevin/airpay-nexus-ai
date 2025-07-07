import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  Search, 
  Settings, 
  Shield, 
  Eye, 
  Edit,
  Save,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface FieldWorker {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  registration_status: string;
  region_assignment: string;
  is_active: boolean;
}

interface Permission {
  id: string;
  field_worker_id: string;
  permission_name: string;
  is_enabled: boolean;
  granted_by: string;
  granted_at: string;
}

interface FieldWorkerWithPermissions extends FieldWorker {
  permissions: Permission[];
}

const AVAILABLE_PERMISSIONS = [
  { key: 'manage_sales', label: 'Manage Customer Sales', description: 'Track and manage customer sales activities' },
  { key: 'manage_marketing', label: 'Access Marketing Tools', description: 'Access marketing campaigns and customer outreach' },
  { key: 'view_analytics', label: 'View Analytics', description: 'Access sales and performance analytics' },
  { key: 'export_data', label: 'Export Data', description: 'Export customer and sales data' }
];

const FieldWorkerPermissionManager = () => {
  const [fieldWorkers, setFieldWorkers] = useState<FieldWorkerWithPermissions[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null);
  const [savingPermissions, setSavingPermissions] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadFieldWorkers();
  }, []);

  const loadFieldWorkers = async () => {
    try {
      // Load field workers
      const { data: workers, error: workersError } = await supabase
        .from('field_workers')
        .select('*')
        .order('full_name');

      if (workersError) throw workersError;

      // Load permissions for each worker
      const workersWithPermissions = await Promise.all(
        (workers || []).map(async (worker) => {
          const { data: permissions, error: permissionsError } = await supabase
            .from('field_worker_permissions')
            .select('*')
            .eq('field_worker_id', worker.id);

          if (permissionsError) throw permissionsError;

          return {
            ...worker,
            permissions: permissions || []
          };
        })
      );

      setFieldWorkers(workersWithPermissions);
    } catch (error) {
      console.error('Error loading field workers:', error);
      toast({
        title: "Error Loading Data",
        description: "Failed to load field worker information.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePermission = async (workerId: string, permissionName: string, isEnabled: boolean) => {
    setSavingPermissions(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      if (isEnabled) {
        // Grant permission
        const { error } = await supabase
          .from('field_worker_permissions')
          .upsert({
            field_worker_id: workerId,
            permission_name: permissionName,
            is_enabled: true,
            granted_by: user.id,
            granted_at: new Date().toISOString()
          });

        if (error) throw error;
      } else {
        // Revoke permission
        const { error } = await supabase
          .from('field_worker_permissions')
          .upsert({
            field_worker_id: workerId,
            permission_name: permissionName,
            is_enabled: false,
            granted_by: user.id,
            granted_at: new Date().toISOString()
          });

        if (error) throw error;
      }

      // Reload data
      await loadFieldWorkers();

      toast({
        title: isEnabled ? "Permission Granted" : "Permission Revoked",
        description: `${permissionName} has been ${isEnabled ? 'enabled' : 'disabled'} for the field worker.`,
      });
    } catch (error) {
      console.error('Error updating permission:', error);
      toast({
        title: "Error",
        description: "Failed to update permission.",
        variant: "destructive"
      });
    } finally {
      setSavingPermissions(false);
    }
  };

  const getPermissionStatus = (worker: FieldWorkerWithPermissions, permissionName: string) => {
    const permission = worker.permissions.find(p => p.permission_name === permissionName);
    return permission?.is_enabled || false;
  };

  const filteredWorkers = fieldWorkers.filter(worker =>
    worker.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.region_assignment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading field worker permissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Field Worker Permissions</h2>
          <p className="text-gray-600">Manage access permissions for field workers</p>
        </div>
        <Button onClick={loadFieldWorkers} variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search field workers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Field Workers List */}
      <div className="space-y-4">
        {filteredWorkers.map((worker) => (
          <Card key={worker.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{worker.full_name}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span>{worker.email}</span>
                    <span>{worker.phone}</span>
                    <span>{worker.region_assignment}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={worker.is_active ? 'default' : 'secondary'}>
                    {worker.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                  <Badge variant={
                    worker.registration_status === 'approved' ? 'default' :
                    worker.registration_status === 'pending' ? 'secondary' : 'destructive'
                  }>
                    {worker.registration_status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">Permissions</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {AVAILABLE_PERMISSIONS.map((permission) => {
                    const isEnabled = getPermissionStatus(worker, permission.key);
                    return (
                      <div key={permission.key} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Label htmlFor={`${worker.id}-${permission.key}`} className="font-medium">
                              {permission.label}
                            </Label>
                            {isEnabled && <CheckCircle className="w-4 h-4 text-green-600" />}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{permission.description}</p>
                        </div>
                        <Switch
                          id={`${worker.id}-${permission.key}`}
                          checked={isEnabled}
                          onCheckedChange={(checked) => togglePermission(worker.id, permission.key, checked)}
                          disabled={savingPermissions || worker.registration_status !== 'approved'}
                        />
                      </div>
                    );
                  })}
                </div>

                {worker.registration_status !== 'approved' && (
                  <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm text-yellow-800">
                      Permissions can only be granted to approved field workers.
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredWorkers.length === 0 && (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Field Workers Found</h3>
            <p className="text-gray-600">No field workers match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldWorkerPermissionManager;