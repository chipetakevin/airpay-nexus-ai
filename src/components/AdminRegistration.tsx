import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import LocationDetector from './LocationDetector';
import BankAutocomplete from './BankAutocomplete';
import { validateEmail, validateAccountNumber } from '@/utils/formValidation';

interface AdminFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  adminRole: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  branchCode: string;
  rememberPassword: boolean;
  agreeTerms: boolean;
  twoFactorAuth: boolean;
}

const AdminRegistration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AdminFormData>({
    firstName: 'Kevin',
    lastName: 'Chipeta',
    email: 'chipetakevin@gmail.com',
    phoneNumber: '',
    countryCode: '+27',
    adminRole: 'Super Administrator',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    branchCode: '',
    rememberPassword: true, // Enforced to true
    agreeTerms: false,
    twoFactorAuth: true
  });

  const [errors, setErrors] = useState<any>({});
  const [location, setLocation] = useState('Detecting location...');

  // Auto-save functionality
  useEffect(() => {
    const savedData = localStorage.getItem('adminRegistrationDraft');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(prev => ({
          ...prev,
          ...parsedData,
          rememberPassword: true // Always enforce remember password
        }));
      } catch (error) {
        console.log('Failed to load saved registration data');
      }
    }
  }, []);

  // Auto-save on form changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('adminRegistrationDraft', JSON.stringify(formData));
    }, 1000); // Save after 1 second of inactivity

    return () => clearTimeout(timeoutId);
  }, [formData]);

  // Auto-fill functionality
  useEffect(() => {
    const detectUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation('Johannesburg, Gauteng, South Africa');
          },
          () => {
            setLocation('Johannesburg, Gauteng, South Africa');
          }
        );
      }
    };

    detectUserLocation();

    // Auto-fill additional details
    setFormData(prev => ({
      ...prev,
      phoneNumber: '0123456789',
    }));
  }, []);

  const handleInputChange = (field: keyof AdminFormData, value: any) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: value,
      rememberPassword: true // Always enforce remember password
    }));
    
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: '' }));
    }
  };

  const handleBankSelect = (bankName: string, routing: string, branchCode: string) => {
    setFormData(prev => ({ 
      ...prev, 
      bankName, 
      routingNumber: routing,
      branchCode 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: any = {};
    
    // Validate admin email
    const allowedEmails = ['chipetakevin@gmail.com', 'admin@myonecard.ai'];
    if (!allowedEmails.includes(formData.email)) {
      newErrors.email = 'Unauthorized email. Only approved admin emails are allowed.';
    }
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.bankName) newErrors.bankName = 'Bank selection is required';
    if (!formData.accountNumber) newErrors.accountNumber = 'Account number is required';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to terms and conditions';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const adminId = 'ADM' + Math.random().toString(36).substr(2, 8).toUpperCase();
      
      const adminData = {
        ...formData,
        adminId,
        cardType: 'OneCard Platinum',
        accessLevel: 'Full System Access',
        cashbackBalance: 0,
        totalCustomers: 0,
        totalVendors: 0,
        systemCommission: 5.00,
        rememberPassword: true // Enforce remember password
      };

      // Store admin data with enhanced autofill
      localStorage.setItem('onecardAdmin', JSON.stringify(adminData));
      
      // Store credentials for autofill
      localStorage.setItem('userCredentials', JSON.stringify({
        email: formData.email,
        rememberPassword: true,
        userType: 'admin'
      }));

      // Set authentication flag for Smart Deals
      localStorage.setItem('userAuthenticated', 'true');
      localStorage.setItem('adminAuthenticated', 'true');

      // Clear draft after successful registration
      localStorage.removeItem('adminRegistrationDraft');

      toast({
        title: "Admin Registration Successful! 🔑",
        description: `OneCard Platinum created: ****${adminId.slice(-4)}. Redirecting to Smart Deals now!`,
      });

      // IMMEDIATE redirect to Smart Deals section
      navigate('/?tab=deals');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-red-600">🔐 Admin Registration</h2>
        <p className="text-gray-600">Restricted registration for authorized administrators only</p>
      </div>

      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-4">
          <p className="text-sm text-red-800">
            🔐 <strong>Secure Admin Registration:</strong> Auto-save enabled and credentials remembered for seamless admin access.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <p className="text-sm text-blue-800">
            🚀 <strong>Instant Admin Access:</strong> After registration, you'll be immediately redirected to the admin portal to start managing the system!
          </p>
        </CardContent>
      </Card>

      <LocationDetector onLocationUpdate={setLocation} />

      <form onSubmit={handleSubmit} className="space-y-6" autoComplete="on">
        {/* Administrator Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Administrator Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                name="firstName"
                autoComplete="given-name"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className={errors.firstName ? 'border-red-500' : ''}
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                name="lastName"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className={errors.lastName ? 'border-red-500' : ''}
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Authorized Admin Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`font-mono ${errors.email ? 'border-red-500' : 'bg-gray-50'}`}
              placeholder="chipetakevin@gmail.com or admin@myonecard.ai"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            <p className="text-xs text-gray-600">Only pre-approved administrator emails are accepted</p>
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
                name="phoneNumber"
                autoComplete="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                placeholder="Auto-filled"
                className={`flex-1 ${errors.phoneNumber ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="adminRole">Administrator Role</Label>
            <Input
              id="adminRole"
              value={formData.adminRole}
              readOnly
              className="bg-gray-50 font-semibold"
            />
          </div>
        </div>

        {/* Banking Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Banking Information</h3>
          <BankAutocomplete 
            onBankSelect={handleBankSelect}
            error={errors.bankName}
          />

          <div className="space-y-2">
            <Label htmlFor="accountNumber">Administrator Account Number *</Label>
            <Input
              id="accountNumber"
              name="accountNumber"
              autoComplete="off"
              value={formData.accountNumber}
              onChange={(e) => handleInputChange('accountNumber', e.target.value)}
              placeholder="Enter account number"
              className={errors.accountNumber ? 'border-red-500' : ''}
            />
            {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="routingNumber">Routing Number</Label>
              <Input
                id="routingNumber"
                value={formData.routingNumber}
                placeholder="Auto-filled based on bank selection"
                readOnly
                className="bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="branchCode">Branch Code</Label>
              <Input
                id="branchCode"
                value={formData.branchCode}
                placeholder="Auto-detected branch code"
                readOnly
                className="bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Security & Consent */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="rememberPassword"
              checked={formData.rememberPassword}
              onChange={(e) => handleInputChange('rememberPassword', e.target.checked)}
              disabled // Disabled because it's enforced
            />
            <Label htmlFor="rememberPassword" className="text-gray-600">
              ✓ Remember my admin credentials (Enforced for security)
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="twoFactorAuth"
              checked={formData.twoFactorAuth}
              onChange={(e) => handleInputChange('twoFactorAuth', e.target.checked)}
            />
            <Label htmlFor="twoFactorAuth">Enable Two-Factor Authentication (Recommended)</Label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={formData.agreeTerms}
              onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
            />
            <Label htmlFor="agreeTerms">I agree to the Administrator Terms & Conditions and Privacy Policy *</Label>
          </div>
          {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}
        </div>

        <Button type="submit" className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
          Register & Access Portal 🚀
        </Button>
      </form>
    </div>
  );
};

export default AdminRegistration;
