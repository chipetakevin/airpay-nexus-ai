
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAdminRegistration } from '@/hooks/useAdminRegistration';
import AdminRegistrationForm from './registration/AdminRegistrationForm';
import AdminRegistrationStatus from './admin/AdminRegistrationStatus';
import AdminControlCenter from './admin/AdminControlCenter';

interface AdminData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  adminId: string;
  department: string;
  registrationDate: string;
}

const AdminRegistration = () => {
  const [isFormCollapsed, setIsFormCollapsed] = useState(false);
  const [existingRegistration, setExistingRegistration] = useState<AdminData | null>(null);
  const [activeDataTab, setActiveDataTab] = useState('sim-data');
  const [activeAdminTab, setActiveAdminTab] = useState('dashboard');
  const [activeProfileTab, setActiveProfileTab] = useState('customer-profiles');
  const { toast } = useToast();
  
  // Admin registration hook
  const {
    formData,
    errors,
    showPassword,
    togglePasswordVisibility,
    handleInputChange,
    handleSubmit
  } = useAdminRegistration();

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
            setIsFormCollapsed(true);
          }
        } catch (error) {
          console.error('Error checking existing admin registration:', error);
        }
      }
    };

    checkExistingRegistration();

    const handleRegistrationSuccess = () => {
      setTimeout(() => {
        checkExistingRegistration();
      }, 1000);
    };

    window.addEventListener('storage', handleRegistrationSuccess);
    
    return () => {
      window.removeEventListener('storage', handleRegistrationSuccess);
    };
  }, []);

  const handleNewRegistration = () => {
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
      <div className="w-full min-h-screen overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6 p-4">
          <AdminRegistrationStatus 
            existingRegistration={existingRegistration}
            onToggle={handleFormToggle}
          />
          
          <AdminControlCenter
            activeAdminTab={activeAdminTab}
            setActiveAdminTab={setActiveAdminTab}
            activeProfileTab={activeProfileTab}
            setActiveProfileTab={setActiveProfileTab}
            activeDataTab={activeDataTab}
            setActiveDataTab={setActiveDataTab}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <AdminRegistrationForm 
        formData={formData}
        errors={errors}
        showPassword={showPassword}
        togglePasswordVisibility={togglePasswordVisibility}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AdminRegistration;
