
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import AdminRegistrationForm from './registration/AdminRegistrationForm';
import { useToast } from '@/hooks/use-toast';

const AdminRegistration = () => {
  const [isFormCollapsed, setIsFormCollapsed] = useState(false);
  const [existingRegistration, setExistingRegistration] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkExistingRegistration = () => {
      const credentials = localStorage.getItem('userCredentials');
      const adminData = localStorage.getItem('onecardAdmin');
      
      if (credentials && adminData) {
        try {
          const parsedCredentials = JSON.parse(credentials);
          const parsedAdminData = JSON.parse(adminData);
          
          if (parsedCredentials.userType === 'admin' && parsedAdminData.firstName) {
            setExistingRegistration({
              firstName: parsedAdminData.firstName,
              lastName: parsedAdminData.lastName,
              email: parsedAdminData.email,
              phone: parsedAdminData.phone || parsedAdminData.phoneNumber,
              adminId: parsedAdminData.adminId,
              department: parsedAdminData.department || 'System Administration',
              registrationDate: parsedAdminData.registrationDate || new Date().toISOString()
            });
            // Automatically collapse when existing registration is found
            setIsFormCollapsed(true);
          }
        } catch (error) {
          console.error('Error checking existing admin registration:', error);
        }
      }
    };

    checkExistingRegistration();

    // Listen for successful registration events
    const handleRegistrationSuccess = () => {
      setTimeout(() => {
        checkExistingRegistration();
      }, 1000);
    };

    // Listen for storage changes (registration completion)
    window.addEventListener('storage', handleRegistrationSuccess);
    
    return () => {
      window.removeEventListener('storage', handleRegistrationSuccess);
    };
  }, []);

  const handleNewRegistration = () => {
    // Clear existing data and expand form
    localStorage.removeItem('userCredentials');
    localStorage.removeItem('onecardAdmin');
    localStorage.removeItem('userAuthenticated');
    localStorage.removeItem('adminAuthenticated');
    setIsFormCollapsed(false);
    setExistingRegistration(null);
    toast({
      title: "New Registration",
      description: "Starting fresh admin registration process.",
    });
  };

  const handleFormToggle = () => {
    setIsFormCollapsed(!isFormCollapsed);
  };

  // Auto-collapse interface after successful registration
  if (existingRegistration && isFormCollapsed) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <Card className="border-red-200 bg-red-50/30">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2 text-red-800">
                <CheckCircle className="w-5 h-5" />
                Admin Registration Complete
              </CardTitle>
              <Badge className="bg-red-100 text-red-700">
                <Shield className="w-3 h-3 mr-1" />
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-gray-600">Administrator</label>
                <p className="font-semibold text-gray-900">
                  {existingRegistration.firstName} {existingRegistration.lastName}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-600">Admin ID</label>
                <p className="font-mono text-sm text-red-600 font-semibold">
                  {existingRegistration.adminId}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-600">Department</label>
                <p className="text-sm text-gray-700">
                  {existingRegistration.department}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-600">Registration Date</label>
                <p className="text-sm text-gray-700">
                  {new Date(existingRegistration.registrationDate).toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs text-gray-600">Email Address</label>
                <p className="text-sm text-gray-700">
                  {existingRegistration.email}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-red-200">
              <Button
                onClick={handleFormToggle}
                variant="outline"
                className="flex items-center gap-2 border-red-300 text-red-700 hover:bg-red-100"
              >
                <ChevronDown className="w-4 h-4" />
                Edit Registration Details
              </Button>
              <Button
                onClick={handleNewRegistration}
                variant="outline"
                className="flex items-center gap-2 border-green-300 text-green-700 hover:bg-green-100"
              >
                <Shield className="w-4 h-4" />
                Register New Admin
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full">
      <AdminRegistrationForm />
    </div>
  );
};

export default AdminRegistration;
