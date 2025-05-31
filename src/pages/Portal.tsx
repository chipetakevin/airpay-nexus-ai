import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import CustomerRegistration from '../components/CustomerRegistration';
import VendorRegistration from '../components/VendorRegistration';
import AdminRegistration from '../components/AdminRegistration';
import OneCardDashboard from '../components/OneCardDashboard';
import AdminPortal from '../components/AdminPortal';

type UserType = 'customer' | 'vendor' | 'admin' | null;

const Portal = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('registration');
  const [userType, setUserType] = useState<UserType>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuthenticated');
    if (adminAuth === 'true') {
      setIsAdminAuthenticated(true);
      setUserType('admin');
    }

    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
      
      // Set user type based on tab
      if (tabParam === 'registration') {
        setUserType('customer');
      } else if (tabParam === 'vendor') {
        setUserType('vendor');
      } else if (tabParam === 'admin-reg' || tabParam === 'admin') {
        setUserType('admin');
      }
    }
  }, [searchParams]);

  const showAdminTab = isAdminAuthenticated || searchParams.get('tab') === 'admin';

  const isTabAllowed = (tabValue: string): boolean => {
    if (userType === 'admin') return true;
    
    if (userType === 'customer') {
      return ['registration', 'onecard'].includes(tabValue);
    }
    
    if (userType === 'vendor') {
      return tabValue === 'vendor';
    }
    
    return true; // No restriction if no user type selected yet
  };

  const handleTabChange = (value: string) => {
    // If user type is not selected yet, set it based on tab selection
    if (!userType) {
      if (value === 'registration') {
        setUserType('customer');
      } else if (value === 'vendor') {
        setUserType('vendor');
      } else if (value === 'admin-reg') {
        setUserType('admin');
      }
    }

    // Check if user has access to the tab
    if (!isTabAllowed(value)) {
      toast({
        title: "Access Restricted",
        description: "You can only access tabs relevant to your registration type.",
        variant: "destructive"
      });
      return;
    }

    // Check admin portal access
    if (value === 'admin' && !isAdminAuthenticated) {
      toast({
        title: "Access Denied",
        description: "Please complete admin registration to access the admin portal.",
        variant: "destructive"
      });
      return;
    }
    
    setActiveTab(value);
  };

  const getTabClassName = (tabValue: string) => {
    let baseClass = "text-xs sm:text-sm py-3 sm:py-4 px-1 sm:px-4 transition-all duration-200";
    
    // Check if tab is allowed
    const allowed = isTabAllowed(tabValue);
    
    if (!allowed) {
      baseClass += " opacity-30 cursor-not-allowed bg-gray-100 text-gray-400";
    } else {
      switch (tabValue) {
        case 'vendor':
          baseClass += " text-yellow-600 hover:bg-yellow-50";
          break;
        case 'admin-reg':
        case 'admin':
          baseClass += ` text-red-600 hover:bg-red-50 ${tabValue === 'admin' ? 'font-bold' : ''}`;
          break;
        default:
          baseClass += " hover:bg-blue-50";
      }
    }
    
    return baseClass;
  };

  const resetUserType = () => {
    setUserType(null);
    setActiveTab('registration');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-teal-500">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-white/20 p-2">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
          
          <div className="text-center text-white">
            <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-shadow">🚀 AirPay Portal</h1>
            <p className="text-sm sm:text-xl opacity-90 hidden sm:block">Digital Airtime & Data Platform with OneCard Rewards</p>
            {userType && userType !== 'admin' && (
              <Button 
                onClick={resetUserType}
                variant="ghost" 
                className="mt-2 text-white hover:bg-white/20 text-xs"
              >
                Change Registration Type
              </Button>
            )}
          </div>
          
          <div className="w-20"></div>
        </div>

        <Card className="max-w-6xl mx-auto bg-white/95 backdrop-blur-sm shadow-2xl">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className={`grid w-full ${showAdminTab ? 'grid-cols-5' : 'grid-cols-4'} bg-gray-100 h-auto`}>
              <TabsTrigger 
                value="registration" 
                className={getTabClassName('registration')}
                disabled={!isTabAllowed('registration')}
              >
                <span className="hidden sm:inline">Customer Registration</span>
                <span className="sm:hidden">Customer</span>
              </TabsTrigger>
              <TabsTrigger 
                value="vendor" 
                className={getTabClassName('vendor')}
                disabled={!isTabAllowed('vendor')}
              >
                <span className="hidden sm:inline">Become a Vendor</span>
                <span className="sm:hidden">Vendor</span>
              </TabsTrigger>
              <TabsTrigger 
                value="onecard" 
                className={getTabClassName('onecard')}
                disabled={!isTabAllowed('onecard')}
              >
                <span className="hidden sm:inline">OneCard Rewards</span>
                <span className="sm:hidden">OneCard</span>
              </TabsTrigger>
              <TabsTrigger 
                value="admin-reg" 
                className={getTabClassName('admin-reg')}
                disabled={!isTabAllowed('admin-reg')}
              >
                <span className="hidden sm:inline">Admin</span>
                <span className="sm:hidden">Admin</span>
              </TabsTrigger>
              {showAdminTab && (
                <TabsTrigger 
                  value="admin" 
                  className={getTabClassName('admin')}
                  disabled={!isTabAllowed('admin')}
                >
                  <span className="hidden sm:inline">Admin Portal</span>
                  <span className="sm:hidden">Portal</span>
                </TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="registration" className="p-4 sm:p-6">
              <CustomerRegistration />
            </TabsContent>
            
            <TabsContent value="vendor" className="p-4 sm:p-6">
              <VendorRegistration />
            </TabsContent>
            
            <TabsContent value="onecard" className="p-4 sm:p-6">
              <OneCardDashboard />
            </TabsContent>
            
            <TabsContent value="admin-reg" className="p-4 sm:p-6">
              <AdminRegistration />
            </TabsContent>
            
            {showAdminTab && (
              <TabsContent value="admin" className="p-4 sm:p-6">
                <AdminPortal onAuthSuccess={() => setIsAdminAuthenticated(true)} />
              </TabsContent>
            )}
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Portal;
