
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import LocationDetector from './LocationDetector';
import PersonalInfoSection from './registration/PersonalInfoSection';
import PhoneSection from './registration/PhoneSection';
import BankingSection from './registration/BankingSection';
import ConsentSection from './registration/ConsentSection';
import { FormData, FormErrors } from '@/types/customerRegistration';
import { validateEmail, validateAccountNumber } from '@/utils/formValidation';

const CustomerRegistration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
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

  const [errors, setErrors] = useState<FormErrors>({});
  const [location, setLocation] = useState('Detecting location...');

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear errors when user starts typing
    if (errors[field as keyof FormErrors]) {
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
    const newErrors: FormErrors = {};
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
        description: `OneCard created: ****${accountNumber.slice(-4)}. Redirecting to deals...`,
      });

      // Store user data in localStorage for demo
      localStorage.setItem('onecardUser', JSON.stringify({
        ...formData,
        cardNumber: accountNumber,
        cashbackBalance: 0,
        totalEarned: 0,
        totalSpent: 0
      }));

      // Redirect to deals section after 2 seconds
      setTimeout(() => {
        navigate('/?tab=deals');
      }, 2000);
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

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <p className="text-sm text-blue-800">
            🛒 <strong>Quick Start:</strong> After registration, you'll be automatically redirected to our deals section to start shopping immediately!
          </p>
        </CardContent>
      </Card>

      <LocationDetector onLocationUpdate={setLocation} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <PersonalInfoSection 
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
        />

        <PhoneSection 
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
        />

        <BankingSection 
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
        />

        <ConsentSection 
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
        />

        <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          Register & Start Shopping 🛒
        </Button>
      </form>
    </div>
  );
};

export default CustomerRegistration;
