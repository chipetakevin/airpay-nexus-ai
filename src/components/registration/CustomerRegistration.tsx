
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useCustomerRegistration } from '@/hooks/useCustomerRegistration';
import { User, Phone, Mail, Shield, CheckCircle } from 'lucide-react';
import EnhancedSouthAfricanBankAutocomplete from '@/components/banking/EnhancedSouthAfricanBankAutocomplete';
import UniversalCardDetailsForm from '@/components/banking/UniversalCardDetailsForm';
import { useUniversalBankingStorage } from '@/hooks/useUniversalBankingStorage';

const CustomerRegistration = () => {
  const { toast } = useToast();
  const { formData, errors, handleInputChange, handleSubmit } = useCustomerRegistration();
  const [showBankingSection, setShowBankingSection] = useState(false);
  const [showCardSection, setShowCardSection] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { bankingData, saveBankingProfile } = useUniversalBankingStorage('customer');

  // Auto-show banking section if customer wants to add banking info
  useEffect(() => {
    if (formData.agreeTerms && formData.firstName && formData.lastName) {
      setShowBankingSection(true);
    }
  }, [formData.agreeTerms, formData.firstName, formData.lastName]);

  const handleBankSelect = async (bankName: string, routing: string, branchCode: string, bankDetails?: any) => {
    handleInputChange('bankName', bankName);
    handleInputChange('branchCode', branchCode);
    handleInputChange('routingNumber', routing);

    // Auto-save banking profile
    if (bankName && branchCode) {
      try {
        await saveBankingProfile({
          bankName,
          branchCode,
          routingNumber: routing,
          accountNumber: formData.accountNumber || '',
          accountType: 'savings',
          isPrimary: true
        });
      } catch (error) {
        console.error('Error auto-saving banking profile:', error);
      }
    }
  };

  const handlePhoneChange = (value: string) => {
    // Format South African phone number
    let cleanValue = value.replace(/\D/g, '');
    
    if (cleanValue.startsWith('0')) {
      cleanValue = cleanValue.substring(1);
    }
    
    if (cleanValue.length > 9) {
      cleanValue = cleanValue.substring(0, 9);
    }
    
    handleInputChange('phoneNumber', cleanValue);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await handleSubmit(e);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      {/* Header */}
      <Card className="border-blue-200 bg-blue-50/30">
        <CardHeader className="text-center pb-3">
          <CardTitle className="text-2xl flex items-center justify-center gap-2 text-blue-800">
            <User className="w-6 h-6" />
            Customer Registration
          </CardTitle>
          <p className="text-blue-600">
            Join Addex-Hub Mobile for exclusive deals and secure payments
          </p>
        </CardHeader>
      </Card>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Personal Information */}
        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter your first name"
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
                  placeholder="Enter your last name"
                  className={errors.lastName ? 'border-red-500' : ''}
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Mobile Number *</Label>
              <div className="flex gap-2">
                <Select value={formData.countryCode} onValueChange={(value) => handleInputChange('countryCode', value)}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+27">🇿🇦 +27</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative flex-1">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="812345678"
                    className={`pl-10 ${errors.phoneNumber ? 'border-red-500' : ''}`}
                    maxLength={9}
                  />
                </div>
              </div>
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
              {formData.phoneNumber && formData.phoneNumber.length === 9 && (
                <p className="text-green-600 text-sm flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Valid South African mobile number: +27{formData.phoneNumber}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Banking Information */}
        {showBankingSection && (
          <Card className="border-green-200 bg-green-50/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between gap-2 text-green-800">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Banking Information (Optional)
                </div>
                <Badge className="bg-green-100 text-green-700">Auto-Saved</Badge>
              </CardTitle>
              <p className="text-sm text-green-600">
                Add your banking details for seamless transactions and payments
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <EnhancedSouthAfricanBankAutocomplete
                onBankSelect={handleBankSelect}
                error={errors.bankName}
                defaultValue={formData.bankName}
              />

              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                  placeholder="Enter your account number"
                  className={errors.accountNumber ? 'border-red-500' : ''}
                />
                {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="branchCode">Branch Code</Label>
                <Input
                  id="branchCode"
                  value={formData.branchCode}
                  placeholder="Auto-filled from bank selection"
                  readOnly
                  className="bg-gray-50"
                />
                <p className="text-xs text-green-600">
                  ℹ️ Branch code automatically detected from your bank selection
                </p>
              </div>

              {bankingData?.bankingProfiles && bankingData.bankingProfiles.length > 0 && (
                <div className="bg-white p-3 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      Banking Information Saved
                    </span>
                  </div>
                  <p className="text-xs text-green-700">
                    Your banking details are permanently saved and will be available for all future transactions.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Card Details Section */}
        {showBankingSection && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Payment Card Details (Optional)</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowCardSection(!showCardSection)}
              >
                {showCardSection ? 'Hide' : 'Add'} Card Details
              </Button>
            </div>
            
            {showCardSection && (
              <UniversalCardDetailsForm
                userType="customer"
                onCardSaved={(card) => {
                  toast({
                    title: "Card Added Successfully! 💳",
                    description: `Your ${card.cardType.toUpperCase()} ending in ${card.lastFourDigits} has been saved securely.`,
                  });
                }}
              />
            )}
          </div>
        )}

        {/* Terms and Conditions */}
        <Card className="border-gray-200">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => handleInputChange('agreeTerms', checked)}
                className="mt-1"
              />
              <div className="space-y-1">
                <Label htmlFor="agreeTerms" className="text-sm cursor-pointer">
                  I agree to the Terms of Service and Privacy Policy *
                </Label>
                <p className="text-xs text-gray-600">
                  By checking this box, you agree to our terms and allow us to securely store your information for seamless future transactions.
                </p>
              </div>
            </div>
            {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}

            <div className="flex items-start space-x-2">
              <Checkbox
                id="marketingConsent"
                checked={formData.marketingConsent}
                onCheckedChange={(checked) => handleInputChange('marketingConsent', checked)}
                className="mt-1"
              />
              <Label htmlFor="marketingConsent" className="text-sm cursor-pointer">
                I would like to receive promotional offers and updates about exclusive deals
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Card className="border-blue-200 bg-blue-50/30">
          <CardContent className="p-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating Your Account...
                </>
              ) : (
                <>
                  <User className="w-4 h-4 mr-2" />
                  Create Customer Account
                </>
              )}
            </Button>
            
            {formData.agreeTerms && (
              <p className="text-xs text-blue-600 text-center mt-2">
                <Shield className="w-3 h-3 inline mr-1" />
                Your information will be permanently saved for future convenience and security
              </p>
            )}
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default CustomerRegistration;
