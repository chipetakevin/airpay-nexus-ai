import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type UserRole = 'admin' | 'manager' | 'contractor' | 'vendor' | 'customer' | 'support';
export type PermissionType = 'view' | 'edit' | 'export' | 'share' | 'manage' | 'audit';
export type ResourceType = 'reports' | 'suspicious_activity' | 'database_management' | 'user_management' | 'system_settings' | 'compliance_data';

interface UserRoleInfo {
  role: UserRole;
  department?: string;
  expires_at?: string;
}

interface Permission {
  id: string;
  role: UserRole;
  resource_type: ResourceType;
  permission_type: PermissionType;
  resource_id?: string;
  conditions?: any;
}

export const usePermissions = () => {
  const { toast } = useToast();
  const [userRoles, setUserRoles] = useState<UserRoleInfo[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Get current user and their roles
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setCurrentUser(user);

        if (user) {
          // Get user roles
          const { data: rolesData, error: rolesError } = await supabase
            .rpc('get_user_roles', { _user_id: user.id });

          if (rolesError) {
            console.error('Error fetching user roles:', rolesError);
          } else {
            setUserRoles(rolesData || []);
          }

          // Get permissions for user's roles
          if (rolesData && rolesData.length > 0) {
            const userRolesList = rolesData.map((r: any) => r.role);
            const { data: permissionsData, error: permissionsError } = await supabase
              .from('permissions')
              .select('*')
              .in('role', userRolesList);

            if (permissionsError) {
              console.error('Error fetching permissions:', permissionsError);
            } else {
              setPermissions(permissionsData || []);
            }
          }
        }
      } catch (error) {
        console.error('Error getting current user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  // Check if user has a specific permission
  const hasPermission = (
    resourceType: ResourceType,
    permissionType: PermissionType,
    resourceId?: string
  ): boolean => {
    if (!currentUser || permissions.length === 0) return false;

    return permissions.some(permission => 
      permission.resource_type === resourceType &&
      permission.permission_type === permissionType &&
      (!resourceId || !permission.resource_id || permission.resource_id === resourceId)
    );
  };

  // Check if user has any of the specified roles
  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    const rolesToCheck = Array.isArray(roles) ? roles : [roles];
    return userRoles.some(userRole => rolesToCheck.includes(userRole.role));
  };

  // Log permission activity
  const logActivity = async (
    action: string,
    resourceType: ResourceType,
    resourceId?: string,
    success: boolean = true,
    errorMessage?: string,
    metadata?: any
  ) => {
    if (!currentUser) return;

    try {
      await supabase.rpc('log_permission_activity', {
        _user_id: currentUser.id,
        _action: action,
        _resource_type: resourceType,
        _resource_id: resourceId,
        _success: success,
        _error_message: errorMessage,
        _metadata: metadata
      });
    } catch (error) {
      console.error('Error logging permission activity:', error);
    }
  };

  // Assign role to user (admin only)
  const assignRole = async (
    userId: string,
    role: UserRole,
    department?: string,
    expiresAt?: string
  ): Promise<boolean> => {
    if (!hasPermission('user_management', 'manage')) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to assign roles",
        variant: "destructive"
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role,
          department,
          expires_at: expiresAt,
          assigned_by: currentUser?.id
        });

      if (error) {
        toast({
          title: "Error",
          description: `Failed to assign role: ${error.message}`,
          variant: "destructive"
        });
        return false;
      }

      await logActivity('assign_role', 'user_management', userId, true, undefined, { role, department });
      
      toast({
        title: "Role Assigned",
        description: `Successfully assigned ${role} role`
      });
      
      return true;
    } catch (error) {
      console.error('Error assigning role:', error);
      toast({
        title: "Error",
        description: "Failed to assign role",
        variant: "destructive"
      });
      return false;
    }
  };

  // Remove role from user (admin only)
  const removeRole = async (userId: string, role: UserRole): Promise<boolean> => {
    if (!hasPermission('user_management', 'manage')) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to remove roles",
        variant: "destructive"
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ is_active: false })
        .eq('user_id', userId)
        .eq('role', role);

      if (error) {
        toast({
          title: "Error",
          description: `Failed to remove role: ${error.message}`,
          variant: "destructive"
        });
        return false;
      }

      await logActivity('remove_role', 'user_management', userId, true, undefined, { role });
      
      toast({
        title: "Role Removed",
        description: `Successfully removed ${role} role`
      });
      
      return true;
    } catch (error) {
      console.error('Error removing role:', error);
      toast({
        title: "Error",
        description: "Failed to remove role",
        variant: "destructive"
      });
      return false;
    }
  };

  // Get all users and their roles (admin only)
  const getAllUsersWithRoles = async () => {
    if (!hasPermission('user_management', 'view')) {
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select(`
          *,
          auth.users(email)
        `)
        .eq('is_active', true);

      if (error) {
        console.error('Error fetching users with roles:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching users with roles:', error);
      return [];
    }
  };

  return {
    userRoles,
    permissions,
    isLoading,
    currentUser,
    hasPermission,
    hasRole,
    logActivity,
    assignRole,
    removeRole,
    getAllUsersWithRoles
  };
};