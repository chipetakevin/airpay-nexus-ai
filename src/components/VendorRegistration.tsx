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

interface VendorFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  companyName: string;
  businessType: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  branchCode: string;
  promoCode: string;
  rememberPassword: boolean;
  agreeTerms: boolean;
  marketingConsent: boolean;
}

const VendorRegistration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<VendorFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    countryCode: '+27',
    companyName: '',
    businessType: '',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    branchCode: '',
    promoCode: 'ONECARD2024',
    rememberPassword: true, // Enforced to true
    agreeTerms: false,
    marketingConsent: false
  });

  const [errors, setErrors] = useState<any>({});
  const [location, setLocation] = useState('Detecting location...');

  // Auto-save functionality
  useEffect(() => {
    const savedData = localStorage.getItem('vendorRegistrationDraft');
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
      localStorage.setItem('vendorRegistrationDraft', JSON.stringify(formData));
    }, 1000); // Save after 1 second of inactivity

    return () => clearTimeout(timeoutId);
  }, [formData]);

  const handleInputChange = (field: keyof VendorFormData, value: any) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: value,
      rememberPassword: true // Always enforce remember password
    }));
    
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: '' }));
    }

    if (field === 'email' && value) {
      if (!validateEmail(value)) {
        setErrors((prev: any) => ({ ...prev, email: 'Please enter a valid email address' }));
      }
    }

    if (field === 'accountNumber' && value) {
      if (!validateAccountNumber(value)) {
        setErrors((prev: any) => ({ ...prev, accountNumber: 'Account number must be 8-12 digits' }));
      }
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
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.bankName) newErrors.bankName = 'Bank selection is required';
    if (!formData.accountNumber) newErrors.accountNumber = 'Account number is required';
    if (!validateAccountNumber(formData.accountNumber)) newErrors.accountNumber = 'Invalid account number';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to terms and conditions';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const vendorId = 'VND' + Math.random().toString(36).substr(2, 8).toUpperCase();
      
      const vendorData = {
        ...formData,
        vendorId,
        cardType: 'OneCard Gold',
        cashbackBalance: 0,
        totalEarned: 0,
        totalSpent: 0,
        commissionRate: 10.00,
        rememberPassword: true // Enforce remember password
      };

      // Store vendor data with enhanced autofill
      localStorage.setItem('onecardVendor', JSON.stringify(vendorData));
      
      // Store credentials for autofill
      localStorage.setItem('userCredentials', JSON.stringify({
        email: formData.email,
        rememberPassword: true,
        userType: 'vendor'
      }));

      // Set authentication flag for Smart Deals
      localStorage.setItem('userAuthenticated', 'true');

      // Clear draft after successful registration
      localStorage.removeItem('vendorRegistrationDraft');
      
      toast({
        title: "Vendor Registration Successful! 🎉",
        description: `OneCard Gold created: ****${vendorId.slice(-4)}. Redirecting to OneCard Dashboard now!`,
      });

      // IMMEDIATE redirect to OneCard Rewards Dashboard
      navigate('/?tab=onecard');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Vendor Registration</h2>
        <p className="text-gray-600">Join AirPay as a business partner and start earning with OneCard Gold rewards!</p>
      </div>

      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <p className="text-sm text-yellow-800">
            🏆 <strong>Smart Business Registration:</strong> Auto-save enabled and credentials remembered for faster future access.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <p className="text-sm text-blue-800">
            🏆 <strong>Instant OneCard Gold Access:</strong> After registration, you'll be immediately redirected to your OneCard Rewards Dashboard!
          </p>
        </CardContent>
      </Card>

      <LocationDetector onLocationUpdate={setLocation} />

      <form onSubmit={handleSubmit} className="space-y-6" autoComplete="on">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Personal Information</h3>
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
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
                placeholder="Enter phone number"
                className={`flex-1 ${errors.phoneNumber ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
          </div>
        </div>

        {/* Business Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Business Information</h3>
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name * (Will appear on OneCard Gold)</Label>
            <Input
              id="companyName"
              name="companyName"
              autoComplete="organization"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              placeholder="Enter your business name"
              className={errors.companyName ? 'border-red-500' : ''}
            />
            {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessType">Business Type</Label>
            <Input
              id="businessType"
              name="businessType"
              value={formData.businessType}
              onChange={(e) => handleInputChange('businessType', e.target.value)}
              placeholder="e.g., Retail, Restaurant, Service Provider"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="promoCode">Promo Code (Auto-generated)</Label>
            <Input
              id="promoCode"
              value={formData.promoCode}
              readOnly
              className="bg-gray-50"
            />
            <p className="text-sm text-gray-600">✓ Extracted from OneCard Global System</p>
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
            <Label htmlFor="accountNumber">Business Account Number *</Label>
            <Input
              id="accountNumber"
              name="accountNumber"
              autoComplete="off"
              value={formData.accountNumber}
              onChange={(e) => handleInputChange('accountNumber', e.target.value)}
              placeholder="Enter business account number"
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
              <p className="text-sm text-gray-600">✓ Automatically detected from selected bank</p>
            </div>
          </div>
        </div>

        {/* Consent Section */}
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
              ✓ Remember my login details (Enabled for faster shopping)
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={formData.agreeTerms}
              onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
            />
            <Label htmlFor="agreeTerms">I agree to the Business Terms & Conditions and Privacy Policy *</Label>
          </div>
          {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="marketingConsent"
              checked={formData.marketingConsent}
              onChange={(e) => handleInputChange('marketingConsent', e.target.checked)}
            />
            <Label htmlFor="marketingConsent">I consent to receive business communications and updates</Label>
          </div>
        </div>

        <Button type="submit" className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800">
          Register & Access OneCard Gold 🏆
        </Button>
      </form>
    </div>
  );
};

export default VendorRegistration;
