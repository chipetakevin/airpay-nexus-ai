
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import BankAutocomplete from './BankAutocomplete';
import LocationDetector from './LocationDetector';

const CustomerRegistration = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    countryCode: '+27',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    branchCode: '',
    rememberPassword: false,
    agreeTerms: false,
    marketingConsent: false
  });

  const [errors, setErrors] = useState({});
  const [location, setLocation] = useState('Detecting location...');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateAccountNumber = (accountNumber: string) => {
    return accountNumber.length >= 8 && accountNumber.length <= 12 && /^\d+$/.test(accountNumber);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Real-time validation
    if (field === 'email' && value) {
      if (!validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      }
    }

    if (field === 'accountNumber' && value) {
      if (!validateAccountNumber(value)) {
        setErrors(prev => ({ ...prev, accountNumber: 'Account number must be 8-12 digits' }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.bankName) newErrors.bankName = 'Bank selection is required';
    if (!formData.accountNumber) newErrors.accountNumber = 'Account number is required';
    if (!validateAccountNumber(formData.accountNumber)) newErrors.accountNumber = 'Invalid account number';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to terms and conditions';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Generate unique OneCard account number
      const accountNumber = 'OC' + Math.random().toString(36).substr(2, 8).toUpperCase();
      
      toast({
        title: "Registration Successful! 🎉",
        description: `OneCard created: ****${accountNumber.slice(-4)}. Welcome to AirPay!`,
      });

      // Store user data in localStorage for demo
      localStorage.setItem('onecardUser', JSON.stringify({
        ...formData,
        cardNumber: accountNumber,
        cashbackBalance: 0,
        totalEarned: 0,
        totalSpent: 0
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Customer Registration</h2>
        <p className="text-gray-600">Join AirPay and start earning OneCard rewards on every purchase!</p>
      </div>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <p className="text-sm text-green-800">
            🔒 <strong>Secure Registration:</strong> Your data is protected with bank-level encryption and PCI DSS compliance.
          </p>
        </CardContent>
      </Card>

      <LocationDetector onLocationUpdate={setLocation} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
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
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label>Phone Number *</Label>
          <div className="flex gap-2">
            <select 
              value={formData.countryCode}
              onChange={(e) => handleInputChange('countryCode', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md w-32"
            >
              <option value="+27">🇿🇦 +27</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+91">🇮🇳 +91</option>
              <option value="+234">🇳🇬 +234</option>
            </select>
            <Input
              placeholder="Enter phone number"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className={`flex-1 ${errors.phoneNumber ? 'border-red-500' : ''}`}
            />
          </div>
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
        </div>

        <BankAutocomplete 
          onBankSelect={(bank, routing) => {
            handleInputChange('bankName', bank);
            handleInputChange('routingNumber', routing);
          }}
          error={errors.bankName}
        />

        <div className="space-y-2">
          <Label htmlFor="accountNumber">Account Number *</Label>
          <Input
            id="accountNumber"
            value={formData.accountNumber}
            onChange={(e) => handleInputChange('accountNumber', e.target.value)}
            placeholder="Enter account number"
            className={errors.accountNumber ? 'border-red-500' : ''}
          />
          {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber}</p>}
          {formData.accountNumber && validateAccountNumber(formData.accountNumber) && (
            <p className="text-green-600 text-sm">✓ Valid account number format</p>
          )}
        </div>

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

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="rememberPassword"
              checked={formData.rememberPassword}
              onChange={(e) => handleInputChange('rememberPassword', e.target.checked)}
            />
            <Label htmlFor="rememberPassword">Remember my login details</Label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={formData.agreeTerms}
              onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
            />
            <Label htmlFor="agreeTerms">I agree to the Terms & Conditions and Privacy Policy *</Label>
          </div>
          {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="marketingConsent"
              checked={formData.marketingConsent}
              onChange={(e) => handleInputChange('marketingConsent', e.target.checked)}
            />
            <Label htmlFor="marketingConsent">I consent to receive marketing communications</Label>
          </div>
        </div>

        <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          Register & Create OneCard
        </Button>
      </form>
    </div>
  );
};

export default CustomerRegistration;
