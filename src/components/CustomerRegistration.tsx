import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import CustomerRegistrationForm from './registration/CustomerRegistration';
import { useToast } from '@/hooks/use-toast';

// Main export component that wraps the registration form
const CustomerRegistration = () => {
  const [isFormCollapsed, setIsFormCollapsed] = useState(false);
  const [existingRegistration, setExistingRegistration] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing customer registration
    const checkExistingRegistration = () => {
      const credentials = localStorage.getItem('userCredentials');
      const customerData = localStorage.getItem('onecardUser');
      
      if (credentials && customerData) {
        try {
          const parsedCredentials = JSON.parse(credentials);
          const parsedCustomerData = JSON.parse(customerData);
          
          if (parsedCredentials.userType === 'customer' && parsedCustomerData.firstName) {
            setExistingRegistration({
              firstName: parsedCustomerData.firstName,
              lastName: parsedCustomerData.lastName,
              email: parsedCustomerData.email,
              phone: parsedCustomerData.phone,
              customerId: parsedCustomerData.customerId,
              registrationDate: parsedCustomerData.registrationDate || new Date().toISOString()
            });
            setIsFormCollapsed(true);
          }
        } catch (error) {
          console.error('Error checking existing customer registration:', error);
        }
      }
    };

    checkExistingRegistration();
  }, []);

  const handleNewRegistration = () => {
    setIsFormCollapsed(false);
    setExistingRegistration(null);
    toast({
      title: "New Registration",
      description: "Starting fresh customer registration process.",
    });
  };

  const handleFormToggle = () => {
    setIsFormCollapsed(!isFormCollapsed);
  };

  if (existingRegistration && isFormCollapsed) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Existing Registration Summary */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
                <CheckCircle className="w-5 h-5" />
                Customer Registration Complete
              </CardTitle>
              <Badge className="bg-blue-100 text-blue-700">
                <User className="w-3 h-3 mr-1" />
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-gray-600">Customer Name</label>
                <p className="font-semibold text-gray-900">
                  {existingRegistration.firstName} {existingRegistration.lastName}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-600">Customer ID</label>
                <p className="font-mono text-sm text-blue-600 font-semibold">
                  {existingRegistration.customerId}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-600">Phone Number</label>
                <p className="text-sm text-gray-700">
                  +27{existingRegistration.phone}
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

            <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-blue-200">
              <Button
                onClick={handleFormToggle}
                variant="outline"
                className="flex items-center gap-2 border-blue-300 text-blue-700 hover:bg-blue-100"
              >
                <ChevronDown className="w-4 h-4" />
                Edit Registration Details
              </Button>
              <Button
                onClick={handleNewRegistration}
                variant="outline"
                className="flex items-center gap-2 border-green-300 text-green-700 hover:bg-green-100"
              >
                <User className="w-4 h-4" />
                Register New Customer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full">
      <CustomerRegistrationForm />
    </div>
  );
};

export default CustomerRegistration;
