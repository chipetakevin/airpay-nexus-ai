
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const redirectToSection = (section: string) => {
    if (section === 'USSD Management') {
      // Navigate to USSD System page
      navigate('/ussd-system');
      toast({
        title: `Accessing ${section}`,
        description: `Redirecting to ${section} management section`,
      });
    } else {
      toast({
        title: `Accessing ${section}`,
        description: `${section} management section - feature coming soon`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🏦 Customer Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Manage customer accounts, view balances, and handle support tickets
            </p>
            <Button 
              className="w-full" 
              onClick={() => redirectToSection('Customer Management')}
            >
              Manage Customers
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              💳 OneCard Administration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Monitor cashback allocations, card status, and reward distributions
            </p>
            <Button 
              className="w-full" 
              onClick={() => redirectToSection('OneCard Administration')}
            >
              Manage OneCards
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📊 Analytics & Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              View system analytics, transaction reports, and performance metrics
            </p>
            <Button 
              className="w-full" 
              onClick={() => redirectToSection('Analytics & Reports')}
            >
              View Reports
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⚙️ System Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Configure USSD settings, cashback rates, and system parameters
            </p>
            <Button 
              className="w-full" 
              onClick={() => redirectToSection('System Configuration')}
            >
              System Settings
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔐 Security Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Manage admin users, audit logs, and security policies
            </p>
            <Button 
              className="w-full" 
              onClick={() => redirectToSection('Security Management')}
            >
              Security Settings
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📱 USSD Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Configure USSD codes, menu structures, and service availability
            </p>
            <Button 
              className="w-full" 
              onClick={() => redirectToSection('USSD Management')}
            >
              Manage USSD
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
