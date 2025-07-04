import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { usePermissions, UserRole, ResourceType, PermissionType } from '@/hooks/usePermissions';
import { Shield, Users, Activity, Settings, Database, FileText, UserPlus, UserMinus, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface UserWithRoles {
  user_id: string;
  email: string;
  roles: {
    role: UserRole;
    department?: string;
    expires_at?: string;
    is_active: boolean;
  }[];
}

const PermissionManager: React.FC = () => {
  const { hasPermission, assignRole, removeRole, logActivity } = usePermissions();
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Check if user has admin permissions
  const canManageUsers = hasPermission('user_management', 'manage');
  const canViewAuditLogs = hasPermission('system_settings', 'audit');

  useEffect(() => {
    if (canManageUsers) {
      fetchUsersWithRoles();
    }
    if (canViewAuditLogs) {
      fetchAuditLogs();
    }
  }, [canManageUsers, canViewAuditLogs]);

  const fetchUsersWithRoles = async () => {
    try {
      setIsLoading(true);
      
      // Get all users from auth.users (admin only can access this)
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        console.error('Error fetching auth users:', authError);
        return;
      }

      // Get all user roles
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('is_active', true);

      if (rolesError) {
        console.error('Error fetching roles:', rolesError);
        return;
      }

      // Combine the data
      const usersWithRoles: UserWithRoles[] = authUsers.users.map(user => ({
        user_id: user.id,
        email: user.email || 'No email',
        roles: rolesData?.filter(role => role.user_id === user.id).map(role => ({
          role: role.role,
          department: role.department,
          expires_at: role.expires_at,
          is_active: role.is_active
        })) || []
      }));

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users with roles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('permission_audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error fetching audit logs:', error);
        return;
      }

      setAuditLogs(data || []);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
    }
  };

  const handleAssignRole = async () => {
    if (!selectedUser || !selectedRole) return;

    const success = await assignRole(selectedUser, selectedRole, selectedDepartment);
    if (success) {
      setSelectedUser('');
      setSelectedRole('customer');
      setSelectedDepartment('');
      fetchUsersWithRoles();
    }
  };

  const handleRemoveRole = async (userId: string, role: UserRole) => {
    const success = await removeRole(userId, role);
    if (success) {
      fetchUsersWithRoles();
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin': return <Shield className="w-4 h-4 text-red-600" />;
      case 'manager': return <Users className="w-4 h-4 text-blue-600" />;
      case 'support': return <Settings className="w-4 h-4 text-green-600" />;
      case 'contractor': return <Activity className="w-4 h-4 text-orange-600" />;
      case 'vendor': return <Database className="w-4 h-4 text-purple-600" />;
      case 'customer': return <Eye className="w-4 h-4 text-gray-600" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'manager': return 'default';
      case 'support': return 'secondary';
      default: return 'outline';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (!canManageUsers && !canViewAuditLogs) {
    return (
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          You don't have permission to access the Permission Manager.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Permission Manager
          </h1>
          <p className="text-muted-foreground mt-2">
            Role-Based Access Control • User Management • Audit Logs
          </p>
        </div>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted">
          <TabsTrigger value="users" disabled={!canManageUsers}>
            User Management
          </TabsTrigger>
          <TabsTrigger value="permissions">
            Permission Matrix
          </TabsTrigger>
          <TabsTrigger value="audit" disabled={!canViewAuditLogs}>
            Audit Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          {canManageUsers && (
            <>
              {/* Assign Role Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="w-5 h-5" />
                    Assign Role to User
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="user-select">User</Label>
                      <Select value={selectedUser} onValueChange={setSelectedUser}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select user" />
                        </SelectTrigger>
                        <SelectContent>
                          {users.map((user) => (
                            <SelectItem key={user.user_id} value={user.user_id}>
                              {user.email}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="role-select">Role</Label>
                      <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="support">Support</SelectItem>
                          <SelectItem value="contractor">Contractor</SelectItem>
                          <SelectItem value="vendor">Vendor</SelectItem>
                          <SelectItem value="customer">Customer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="department">Department (Optional)</Label>
                      <Input
                        id="department"
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        placeholder="IT, Finance, etc."
                      />
                    </div>
                    <div className="flex items-end">
                      <Button 
                        onClick={handleAssignRole}
                        disabled={!selectedUser || !selectedRole || isLoading}
                        className="w-full"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Assign Role
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Users Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Users and Roles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Roles</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.user_id}>
                          <TableCell className="font-medium">{user.email}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {user.roles.length > 0 ? (
                                user.roles.map((roleInfo, index) => (
                                  <Badge 
                                    key={index} 
                                    variant={getRoleBadgeVariant(roleInfo.role)}
                                    className="flex items-center gap-1"
                                  >
                                    {getRoleIcon(roleInfo.role)}
                                    {roleInfo.role}
                                  </Badge>
                                ))
                              ) : (
                                <Badge variant="outline">No roles assigned</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {user.roles.find(r => r.department)?.department || '-'}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {user.roles.map((roleInfo, index) => (
                                <Button
                                  key={index}
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleRemoveRole(user.user_id, roleInfo.role)}
                                >
                                  <UserMinus className="w-3 h-3 mr-1" />
                                  Remove {roleInfo.role}
                                </Button>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Permission Matrix
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role</TableHead>
                      <TableHead>Reports</TableHead>
                      <TableHead>Suspicious Activity</TableHead>
                      <TableHead>Database Management</TableHead>
                      <TableHead>User Management</TableHead>
                      <TableHead>System Settings</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Admin</TableCell>
                      <TableCell><Badge className="bg-green-100 text-green-800">Full Access</Badge></TableCell>
                      <TableCell><Badge className="bg-green-100 text-green-800">Full Access</Badge></TableCell>
                      <TableCell><Badge className="bg-green-100 text-green-800">Full Access</Badge></TableCell>
                      <TableCell><Badge className="bg-green-100 text-green-800">Full Access</Badge></TableCell>
                      <TableCell><Badge className="bg-green-100 text-green-800">Full Access</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Manager</TableCell>
                      <TableCell><Badge className="bg-blue-100 text-blue-800">View, Edit, Export</Badge></TableCell>
                      <TableCell><Badge className="bg-blue-100 text-blue-800">View</Badge></TableCell>
                      <TableCell><Badge variant="outline">No Access</Badge></TableCell>
                      <TableCell><Badge variant="outline">No Access</Badge></TableCell>
                      <TableCell><Badge variant="outline">No Access</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Support</TableCell>
                      <TableCell><Badge className="bg-yellow-100 text-yellow-800">View</Badge></TableCell>
                      <TableCell><Badge className="bg-blue-100 text-blue-800">View, Edit</Badge></TableCell>
                      <TableCell><Badge variant="outline">No Access</Badge></TableCell>
                      <TableCell><Badge className="bg-yellow-100 text-yellow-800">View</Badge></TableCell>
                      <TableCell><Badge variant="outline">No Access</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Contractor</TableCell>
                      <TableCell><Badge className="bg-yellow-100 text-yellow-800">View Only</Badge></TableCell>
                      <TableCell><Badge variant="outline">No Access</Badge></TableCell>
                      <TableCell><Badge variant="outline">No Access</Badge></TableCell>
                      <TableCell><Badge variant="outline">No Access</Badge></TableCell>
                      <TableCell><Badge variant="outline">No Access</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Vendor</TableCell>
                      <TableCell><Badge className="bg-yellow-100 text-yellow-800">View Only</Badge></TableCell>
                      <TableCell><Badge variant="outline">No Access</Badge></TableCell>
                      <TableCell><Badge variant="outline">No Access</Badge></TableCell>
                      <TableCell><Badge variant="outline">No Access</Badge></TableCell>
                      <TableCell><Badge variant="outline">No Access</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Customer</TableCell>
                      <TableCell><Badge className="bg-yellow-100 text-yellow-800">View Only</Badge></TableCell>
                      <TableCell><Badge variant="outline">No Access</Badge></TableCell>
                      <TableCell><Badge variant="outline">No Access</Badge></TableCell>
                      <TableCell><Badge variant="outline">No Access</Badge></TableCell>
                      <TableCell><Badge variant="outline">No Access</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          {canViewAuditLogs && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Permission Audit Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>User Role</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Resource</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{formatDate(log.created_at)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="flex items-center gap-1 w-fit">
                            {log.user_role && getRoleIcon(log.user_role)}
                            {log.user_role || 'Unknown'}
                          </Badge>
                        </TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>{log.resource_type}</TableCell>
                        <TableCell>
                          <Badge variant={log.success ? 'default' : 'destructive'}>
                            {log.success ? 'Success' : 'Failed'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PermissionManager;