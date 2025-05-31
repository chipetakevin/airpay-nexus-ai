
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CustomerRegistration from '../components/CustomerRegistration';
import OneCardDashboard from '../components/OneCardDashboard';
import AdminPortal from '../components/AdminPortal';

const Portal = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('registration');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    // Check if admin is authenticated (from localStorage)
    const adminAuth = localStorage.getItem('adminAuthenticated');
    if (adminAuth === 'true') {
      setIsAdminAuthenticated(true);
    }

    // Check URL parameters for tab
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Only show admin tab if admin is authenticated
  const showAdminTab = isAdminAuthenticated || searchParams.get('tab') === 'admin';

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
          </div>
          
          <div className="w-20"></div> {/* Spacer for center alignment */}
        </div>

        <Card className="max-w-6xl mx-auto bg-white/95 backdrop-blur-sm shadow-2xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className={`grid w-full ${showAdminTab ? 'grid-cols-3' : 'grid-cols-2'} bg-gray-100 h-auto`}>
              <TabsTrigger 
                value="registration" 
                className="text-xs sm:text-lg py-3 sm:py-4 px-2 sm:px-4"
              >
                <span className="hidden sm:inline">Registration</span>
                <span className="sm:hidden">Register</span>
              </TabsTrigger>
              <TabsTrigger 
                value="onecard" 
                className="text-xs sm:text-lg py-3 sm:py-4 px-2 sm:px-4"
              >
                <span className="hidden sm:inline">OneCard Rewards</span>
                <span className="sm:hidden">OneCard</span>
              </TabsTrigger>
              {showAdminTab && (
                <TabsTrigger 
                  value="admin" 
                  className="text-xs sm:text-lg py-3 sm:py-4 px-2 sm:px-4 text-red-600"
                >
                  <span className="hidden sm:inline">Admin Portal</span>
                  <span className="sm:hidden">Admin</span>
                </TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="registration" className="p-4 sm:p-6">
              <CustomerRegistration />
            </TabsContent>
            
            <TabsContent value="onecard" className="p-4 sm:p-6">
              <OneCardDashboard />
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
