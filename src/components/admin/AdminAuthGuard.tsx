import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Shield, Lock, UserCheck, AlertTriangle } from 'lucide-react';

interface AdminProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role_level: string;
  permissions: any;
  department: string;
}

interface AdminAuthGuardProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
}

const AdminAuthGuard: React.FC<AdminAuthGuardProps> = ({ 
  children, 
  requiredPermissions = [] 
}) => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    checkAdminAuthentication();
  }, []);

  const checkAdminAuthentication = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setIsAuthenticated(false);
        setShowLoginForm(true);
        setIsLoading(false);
        return;
      }

      // Check if user has admin profile
      const { data: adminData, error } = await supabase
        .from('admin_profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (error || !adminData) {
        toast({
          title: "Access Denied",
          description: "Admin privileges required to access this dashboard",
          variant: "destructive"
        });
        setIsAuthenticated(false);
        setShowLoginForm(true);
        setIsLoading(false);
        return;
      }

      // Check specific permissions if required
      if (requiredPermissions.length > 0) {
        const userPermissions = adminData.permissions || {};
        const hasPermissions = requiredPermissions.every(
          permission => userPermissions[permission] === true
        );

        if (!hasPermissions) {
          toast({
            title: "Insufficient Permissions",
            description: "You don't have the required permissions for this action",
            variant: "destructive"
          });
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }
      }

      setAdminProfile(adminData);
      setIsAuthenticated(true);
      setShowLoginForm(false);

      // Update last login timestamp
      await supabase
        .from('admin_profiles')
        .update({ last_login: new Date().toISOString() })
        .eq('id', adminData.id);

    } catch (error) {
      console.error('Admin authentication error:', error);
      setIsAuthenticated(false);
      setShowLoginForm(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      // Recheck authentication after successful login
      await checkAdminAuthentication();
      
      toast({
        title: "Admin Login Successful",
        description: "Welcome to the MVNE admin dashboard",
      });

    } catch (error) {
      toast({
        title: "Login Error",
        description: "An unexpected error occurred during login",
        variant: "destructive"
      });
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setAdminProfile(null);
      setShowLoginForm(true);
      
      toast({
        title: "Logged Out",
        description: "Admin session ended successfully",
      });
    } catch (error) {
      toast({
        title: "Logout Error",
        description: "Error during logout process",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 text-blue-600 animate-pulse" />
          <p className="text-gray-600">Verifying admin credentials...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || showLoginForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Admin Access Required
            </CardTitle>
            <p className="text-gray-600 mt-2">
              MVNE/MVNO Administrative Dashboard
            </p>
          </CardHeader>
          <CardContent>
            <Alert className="border-yellow-200 bg-yellow-50 mb-6">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <AlertDescription>
                <strong>Restricted Access:</strong> This dashboard requires verified admin 
                credentials for RICA compliance and MVNE operations management.
              </AlertDescription>
            </Alert>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Admin Email</label>
                <Input
                  type="email"
                  placeholder="admin@divinemobile.co.za"
                  value={loginData.email}
                  onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">
                <Shield className="w-4 h-4 mr-2" />
                Access Admin Dashboard
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Divine Mobile MVNE Platform • Admin Portal
              </p>
              <p className="text-xs text-gray-500 mt-1">
                RICA & POPIA Compliant • South Africa
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render admin header with profile info and logout
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Admin Header */}
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="font-semibold text-gray-900">Admin Dashboard</h2>
              <p className="text-xs text-gray-600">MVNE/MVNO Management Portal</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {adminProfile?.first_name} {adminProfile?.last_name}
              </p>
              <p className="text-xs text-gray-600">
                {adminProfile?.role_level} • {adminProfile?.department}
              </p>
            </div>
            <UserCheck className="w-8 h-8 text-green-600" />
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Protected Content */}
      {children}
    </div>
  );
};

export default AdminAuthGuard;