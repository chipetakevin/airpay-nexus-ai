
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import AdminRegistrationForm from './registration/AdminRegistrationForm';
import MVNEDataExtractionPanel from './admin/MVNEDataExtractionPanel';
import MVNEDailyRechargePanel from './admin/MVNEDailyRechargePanel';
import { useToast } from '@/hooks/use-toast';

const AdminRegistration = () => {
  const [isFormCollapsed, setIsFormCollapsed] = useState(false);
  const [existingRegistration, setExistingRegistration] = useState(null);
  const [activeDataTab, setActiveDataTab] = useState('sim-data');
  const { toast } = useToast();

  const dataTabs = [
    { id: 'sim-data', label: 'SIM Card Identifiers' },
    { id: 'recharge-data', label: 'Daily Recharge Records' }
  ];

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
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Admin Registration Status - Compact */}
        <Card className="border-red-200 bg-red-50/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-red-600" />
                <div>
                  <h3 className="font-semibold text-red-800">Admin Registration Complete</h3>
                  <p className="text-sm text-gray-600">{existingRegistration.firstName} {existingRegistration.lastName}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleFormToggle}
                  variant="outline"
                  size="sm"
                  className="border-red-300 text-red-700 hover:bg-red-100"
                >
                  <ChevronDown className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admin Control Center */}
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">🛡️</span>
              Admin Control Center
            </h1>
            <p className="text-gray-600">Complete system administration and oversight</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center">
            <div className="inline-flex h-auto items-center justify-center rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 p-1.5 shadow-lg border border-gray-200/50 backdrop-blur-sm">
              <div className="flex gap-1">
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 bg-white text-foreground shadow-lg shadow-blue-100/50 border border-blue-200/30">
                  Dashboard
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 hover:bg-white/70 hover:shadow-md text-gray-600">
                  Balances
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 hover:bg-white/70 hover:shadow-md text-gray-600">
                  Revenue
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 hover:bg-white/70 hover:shadow-md text-gray-600">
                  Networks
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 hover:bg-white/70 hover:shadow-md text-gray-600">
                  Orders
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 hover:bg-white/70 hover:shadow-md text-gray-600">
                  Versions
                </button>
              </div>
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="grid gap-6">
            {/* Customer Management Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-xl">🏢</span>
                  Customer Management
                </CardTitle>
                <p className="text-gray-600">Manage customer accounts, view balances, and handle support tickets</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-3 p-3 bg-black text-white rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
                    <span className="text-lg">👥</span>
                    <span className="text-lg font-semibold">Manage Customers</span>
                  </div>
                  
                  {/* Divine Mobile Data Extraction Center */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                      Divine Mobile Data Extraction Center
                    </h3>
                    
                    {/* Data Extraction Tabs */}
                    <div className="w-full">
                      <div className="inline-flex h-auto items-center justify-center rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-1.5 text-muted-foreground shadow-lg border border-blue-200 backdrop-blur-sm w-full">
                        <div className="grid w-full grid-cols-2 gap-1">
                          {dataTabs.map((tab) => (
                            <button
                              key={tab.id}
                              onClick={() => {
                                console.log('Data tab clicked:', tab.id);
                                setActiveDataTab(tab.id);
                              }}
                              className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-3 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[48px] flex-1 min-w-0 cursor-pointer ${
                                activeDataTab === tab.id
                                  ? tab.id === 'sim-data' 
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'bg-purple-500 text-white shadow-lg'
                                  : 'hover:bg-white/70 hover:shadow-md'
                              }`}
                            >
                              {tab.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Data Tab Content */}
                      <div className="mt-6">
                        {activeDataTab === 'sim-data' && <MVNEDataExtractionPanel />}
                        {activeDataTab === 'recharge-data' && <MVNEDailyRechargePanel />}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* OneCard Administration Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-xl">💳</span>
                  OneCard Administration
                </CardTitle>
                <p className="text-gray-600">Monitor cashback allocations, card status, and reward distributions</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 p-3 bg-black text-white rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
                  <span className="text-lg">💳</span>
                  <span className="text-lg font-semibold">Manage OneCards</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
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
