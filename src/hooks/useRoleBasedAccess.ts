import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export type UserRole = 'admin' | 'vendor' | 'customer' | 'manager' | 'support' | 'contractor';

interface RolePermissions {
  role: UserRole | null;
  isAdmin: boolean;
  isVendor: boolean;
  isCustomer: boolean;
  canAccessAdminFeatures: boolean;
  canAccessVendorFeatures: boolean;
  canAccessReports: boolean;
  canManageUsers: boolean;
  canViewAllTransactions: boolean;
}

export const useRoleBasedAccess = () => {
  const [user, setUser] = useState<User | null>(null);
  const [permissions, setPermissions] = useState<RolePermissions>({
    role: null,
    isAdmin: false,
    isVendor: false,
    isCustomer: false,
    canAccessAdminFeatures: false,
    canAccessVendorFeatures: false,
    canAccessReports: false,
    canManageUsers: false,
    canViewAllTransactions: false,
  });
  const [loading, setLoading] = useState(true);

  // Function to fetch user role and permissions
  const fetchUserRole = useCallback(async (userId: string) => {
    try {
      console.log('🔍 Fetching user role for:', userId);
      
      // Get user's role from database
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('is_active', true)
        .single();

      if (roleError) {
        console.log('❌ Role fetch error:', roleError);
        return null;
      }

      console.log('✅ User role fetched:', roleData?.role);
      return roleData?.role as UserRole;
    } catch (error) {
      console.error('Error fetching user role:', error);
      return null;
    }
  }, []);

  // Function to calculate permissions based on role
  const calculatePermissions = useCallback((role: UserRole | null): RolePermissions => {
    const isAdmin = role === 'admin';
    const isVendor = role === 'vendor';
    const isCustomer = role === 'customer';

    return {
      role,
      isAdmin,
      isVendor,
      isCustomer,
      canAccessAdminFeatures: isAdmin,
      canAccessVendorFeatures: isAdmin || isVendor,
      canAccessReports: isAdmin,
      canManageUsers: isAdmin,
      canViewAllTransactions: isAdmin,
    };
  }, []);

  // Initialize role-based access
  useEffect(() => {
    const initializeRoleAccess = async () => {
      try {
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        const currentUser = session?.user || null;
        
        setUser(currentUser);

        if (currentUser) {
          console.log('🔍 Initializing role access for user:', currentUser.id);
          const userRole = await fetchUserRole(currentUser.id);
          const newPermissions = calculatePermissions(userRole);
          
          console.log('✅ Role-based permissions calculated:', newPermissions);
          setPermissions(newPermissions);
        } else {
          console.log('👤 No authenticated user');
          setPermissions(calculatePermissions(null));
        }
      } catch (error) {
        console.error('Error initializing role access:', error);
        setPermissions(calculatePermissions(null));
      } finally {
        setLoading(false);
      }
    };

    initializeRoleAccess();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state changed:', event);
        const currentUser = session?.user || null;
        setUser(currentUser);

        if (currentUser && event === 'SIGNED_IN') {
          console.log('🔍 User signed in, fetching role...');
          const userRole = await fetchUserRole(currentUser.id);
          const newPermissions = calculatePermissions(userRole);
          setPermissions(newPermissions);
        } else if (event === 'SIGNED_OUT') {
          console.log('👋 User signed out');
          setPermissions(calculatePermissions(null));
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [fetchUserRole, calculatePermissions]);

  // Function to check if user has access to specific tab
  const hasTabAccess = useCallback((tabValue: string): boolean => {
    const { role, isAdmin, isVendor, isCustomer } = permissions;

    // If no role assigned, only allow basic tabs
    if (!role) {
      return ['deals', 'registration', 'vendor', 'admin-reg'].includes(tabValue);
    }

    // Admin access - full access to everything
    if (isAdmin) {
      return true;
    }

    // Vendor access - limited access
    if (isVendor) {
      return [
        'deals',           // Can view and manage deals
        'onecard',         // Can view OneCard
        'vendor',          // Can access vendor features
        'registration',    // Can view registration (for reference)
      ].includes(tabValue);
    }

    // Customer access - most limited
    if (isCustomer) {
      return [
        'deals',           // Can view deals
        'onecard',         // Can view their OneCard
        'registration',    // Can register
      ].includes(tabValue);
    }

    // Default: very limited access for unrecognized roles
    return ['deals', 'registration'].includes(tabValue);
  }, [permissions]);

  // Function to get user-friendly role name
  const getRoleDisplayName = useCallback((role: UserRole | null): string => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'vendor': return 'Vendor Partner';
      case 'customer': return 'Customer';
      case 'manager': return 'Manager';
      case 'support': return 'Support';
      case 'contractor': return 'Contractor';
      default: return 'Guest';
    }
  }, []);

  return {
    user,
    permissions,
    loading,
    hasTabAccess,
    getRoleDisplayName,
    fetchUserRole,
  };
};