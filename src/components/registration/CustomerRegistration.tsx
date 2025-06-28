
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Mail, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import EnhancedForgotPassword from '../auth/EnhancedForgotPassword';
import { useEnhancedAuth } from '@/hooks/useEnhancedAuth';
import { useDeviceStorage } from '@/hooks/useDeviceStorage';

const CustomerRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    marketingConsent: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { createPersistentSession } = useEnhancedAuth();
  const { getDeviceProfiles } = useDeviceStorage();

  useEffect(() => {
    // Load any existing profile data for this device
    const profiles = getDeviceProfiles();
    const customerProfile = profiles.find(p => p.userType === 'customer');
    
    if (customerProfile) {
      setFormData(prev => ({
        ...prev,
        firstName: customerProfile.firstName,
        lastName: customerProfile.lastName,
        email: customerProfile.email,
        phoneNumber: customerProfile.phoneNumber
      }));
      
      toast({
        title: "Profile Data Loaded",
        description: "Your previous registration data has been loaded from this device.",
      });
    }
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phoneNumber || !formData.password) {
      toast({
        title: "All Fields Required",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please ensure both passwords are identical.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.agreeTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      const cardNumber = `OC${Math.random().toString().substr(2, 8)}`;
      
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        cardNumber,
        registeredPhone: formData.phoneNumber,
        balance: 0,
        registrationDate: new Date().toISOString()
      };
      
      const userCredentials = {
        email: formData.email,
        password: formData.password,
        userType: 'customer' as const,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phoneNumber
      };
      
      // Store in legacy format for compatibility
      localStorage.setItem('userCredentials', JSON.stringify(userCredentials));
      localStorage.setItem('onecardUser', JSON.stringify(userData));
      
      // Create persistent session (this will also save profile permanently)
      createPersistentSession(userData, userCredentials);
      
      toast({
        title: "Registration Successful! 🎉",
        description: "Your profile is permanently saved on this device for seamless future access.",
      });
      
      setTimeout(() => {
        window.location.href = '/portal?tab=onecard&registered=true';
      }, 2000);
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm border">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Customer Registration</h2>
          <p className="text-sm text-gray-600">Create your OneCard account with persistent login</p>
        </div>

        {/* Persistent Session Info */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 text-green-700">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Device Registration</span>
          </div>
          <p className="text-xs text-green-600 mt-1">
            Your profile will be permanently saved on this device for seamless future access and 24-hour persistent login.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="John"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number *</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="+27 123 456 789"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Minimum 8 characters"
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password *</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="Confirm your password"
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => handleInputChange('agreeTerms', checked)}
              />
              <Label htmlFor="agreeTerms" className="text-sm leading-5">
                I agree to the Terms and Conditions and Privacy Policy *
              </Label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="marketingConsent"
                checked={formData.marketingConsent}
                onCheckedChange={(checked) => handleInputChange('marketingConsent', checked)}
              />
              <Label htmlFor="marketingConsent" className="text-sm leading-5">
                I consent to receiving marketing communications and offers
              </Label>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors"
            >
              <Mail className="w-4 h-4" />
              Already registered? Reset Password
            </button>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Account...
              </div>
            ) : (
              'Create OneCard Account'
            )}
          </Button>
        </form>
      </div>

      <EnhancedForgotPassword 
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        userType="customer"
      />
    </>
  );
};

export default CustomerRegistration;
