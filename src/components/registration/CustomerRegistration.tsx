import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  User, Clock, Shield, ChevronDown, ChevronUp, 
  CheckCircle, AlertCircle, Smartphone, CreditCard 
} from 'lucide-react';
import { useCustomerRegistration } from '@/hooks/useCustomerRegistration';
import { useToast } from '@/hooks/use-toast';

const CustomerRegistration = () => {
  const [isFormCollapsed, setIsFormCollapsed] = useState(false);
  const [existingRegistration, setExistingRegistration] = useState(null);
  const { toast } = useToast();
  const { formData, errors, handleInputChange, handleSubmit } = useCustomerRegistration();

  useEffect(() => {
    // Check for existing customer registration
    const checkExistingRegistration = () => {
      const credentials = localStorage.getItem('userCredentials');
      const userData = localStorage.getItem('onecardUser');
      
      if (credentials && userData) {
        try {
          const parsedCredentials = JSON.parse(credentials);
          const parsedUserData = JSON.parse(userData);
          
          if (parsedCredentials.userType === 'customer' && parsedUserData.firstName) {
            setExistingRegistration({
              firstName: parsedUserData.firstName,
              lastName: parsedUserData.lastName,
              email: parsedUserData.email,
              cardNumber: parsedUserData.cardNumber,
              registrationDate: parsedUserData.registrationDate || new Date().toISOString()
            });
            setIsFormCollapsed(true);
          }
        } catch (error) {
          console.error('Error checking existing registration:', error);
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
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                Customer Registration Complete
              </CardTitle>
              <Badge className="bg-green-100 text-green-700">
                <CreditCard className="w-3 h-3 mr-1" />
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs text-gray-600">Customer Name</Label>
                <p className="font-semibold text-gray-900">
                  {existingRegistration.firstName} {existingRegistration.lastName}
                </p>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-gray-600">OneCard Number</Label>
                <p className="font-mono text-sm text-blue-600 font-semibold">
                  {existingRegistration.cardNumber}
                </p>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-gray-600">Email Address</Label>
                <p className="text-sm text-gray-700">
                  {existingRegistration.email}
                </p>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-gray-600">Registration Date</Label>
                <p className="text-sm text-gray-700">
                  {new Date(existingRegistration.registrationDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-green-200">
              <Button
                onClick={handleFormToggle}
                variant="outline"
                className="flex items-center gap-2 border-green-300 text-green-700 hover:bg-green-100"
              >
                <ChevronDown className="w-4 h-4" />
                Edit Registration Details
              </Button>
              <Button
                onClick={handleNewRegistration}
                variant="outline"
                className="flex items-center gap-2 border-blue-300 text-blue-700 hover:bg-blue-100"
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
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Header */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
              <User className="w-5 h-5" />
              Customer Registration
            </CardTitle>
            {existingRegistration && (
              <Button
                onClick={handleFormToggle}
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-800"
              >
                <ChevronUp className="w-4 h-4" />
                Collapse Form
              </Button>
            )}
          </div>
          <p className="text-sm text-blue-700">
            Create your OneCard account with persistent login
          </p>
        </CardHeader>
      </Card>

      {/* Device Registration Notice */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-800 mb-1">Device Registration</h3>
              <p className="text-sm text-green-700">
                Your profile will be permanently saved on this device for seamless future access and 24-hour persistent login.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Registration Form */}
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={errors.firstName ? 'border-red-500' : ''}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={errors.lastName ? 'border-red-500' : ''}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={errors.email ? 'border-red-500' : ''}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
                <p className="text-xs text-gray-600 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Used for password reset via OTP
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <div className="flex space-x-2">
                  <Input
                    value={formData.countryCode}
                    className="w-20"
                    readOnly
                  />
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    placeholder="123 456 789"
                    className={`flex-1 ${errors.phoneNumber ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Banking Information (Optional) */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Banking Information (Optional)
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input
                    id="bankName"
                    value={formData.bankName}
                    onChange={(e) => handleInputChange('bankName', e.target.value)}
                    placeholder="Select your bank"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                    placeholder="Account number"
                  />
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => handleInputChange('agreeTerms', checked)}
                />
                <Label htmlFor="agreeTerms" className="text-sm leading-relaxed">
                  I agree to the Terms of Service and Privacy Policy *
                </Label>
              </div>
              {errors.agreeTerms && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.agreeTerms}
                </p>
              )}

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="marketingConsent"
                  checked={formData.marketingConsent}
                  onCheckedChange={(checked) => handleInputChange('marketingConsent', checked)}
                />
                <Label htmlFor="marketingConsent" className="text-sm leading-relaxed">
                  I consent to receiving marketing communications and promotional offers
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Create OneCard Account
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerRegistration;
