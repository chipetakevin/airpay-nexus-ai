
import React, { useState, useEffect, useMemo } from 'react';
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
import { useIntelligentReporting } from '@/hooks/useIntelligentReporting';
import IntelligentReporting from '@/components/feedback/IntelligentReporting';
import EnhancedPhoneInput from '@/components/forms/EnhancedPhoneInput';

const CustomerRegistration = () => {
  const { toast } = useToast();
  const { formData, errors, handleInputChange, handleSubmit } = useCustomerRegistration();
  const [showBankingSection, setShowBankingSection] = useState(false);
  const [showCardSection, setShowCardSection] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bankingDataLoaded, setBankingDataLoaded] = useState(false);
  
  const { bankingData, saveBankingProfile, loadBankingData } = useUniversalBankingStorage('customer');
  const { activeReport, showSuccessReport, showErrorReport, clearReport } = useIntelligentReporting();

  // Prevent flickering by memoizing conditional rendering logic
  const shouldShowBankingSection = useMemo(() => {
    return formData.agreeTerms && formData.firstName && formData.lastName;
  }, [formData.agreeTerms, formData.firstName, formData.lastName]);

  // Stable banking data loading
  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      if (!bankingDataLoaded) {
        await loadBankingData();
        if (isMounted) {
          setBankingDataLoaded(true);
        }
      }
    };
    
    loadData();
    
    return () => {
      isMounted = false;
    };
  }, [loadBankingData, bankingDataLoaded]);

  // Stable banking section visibility
  useEffect(() => {
    if (shouldShowBankingSection && !showBankingSection) {
      // Add small delay to prevent flickering
      const timer = setTimeout(() => {
        setShowBankingSection(true);
      }, 100);
      
      return () => clearTimeout(timer);
    } else if (!shouldShowBankingSection && showBankingSection) {
      setShowBankingSection(false);
    }
  }, [shouldShowBankingSection, showBankingSection]);

  const handleBankSelect = async (bankName: string, routing: string, branchCode: string, bankDetails?: any) => {
    handleInputChange('bankName', bankName);
    handleInputChange('branchCode', branchCode);
    handleInputChange('routingNumber', routing);

    // Auto-save banking profile without causing flicker
    if (bankName && branchCode && bankingDataLoaded) {
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

  // Check if form is valid for submission
  const isFormValid = () => {
    const hasRequiredFields = formData.firstName.trim() && 
                             formData.lastName.trim() && 
                             formData.email.trim() && 
                             formData.phoneNumber.trim() && 
                             formData.phoneNumber.length === 9 &&
                             formData.agreeTerms;
    
    const hasNoErrors = Object.keys(errors).length === 0;
    
    const isValid = hasRequiredFields && hasNoErrors;
    
    // Debug logging to help identify validation issues
    console.log('🔍 Form validation status:', {
      isValid,
      formData: {
        firstName: `"${formData.firstName}" (${formData.firstName.length} chars)`,
        lastName: `"${formData.lastName}" (${formData.lastName.length} chars)`,
        email: `"${formData.email}" (${formData.email.length} chars)`,
        phoneNumber: `"${formData.phoneNumber}" (${formData.phoneNumber.length} digits)`,
        agreeTerms: formData.agreeTerms
      },
      validation: {
        hasFirstName: !!formData.firstName.trim(),
        hasLastName: !!formData.lastName.trim(),
        hasEmail: !!formData.email.trim(),
        hasPhone: !!formData.phoneNumber.trim(),
        phoneIs9Digits: formData.phoneNumber.length === 9,
        termsAgreed: formData.agreeTerms,
        hasRequiredFields,
        hasNoErrors,
        errorsCount: Object.keys(errors).length
      },
      errors: errors
    });
    
    return isValid;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Check if form is actually valid before showing error
      if (!isFormValid()) {
        console.log('🔍 Form validation failed:', {
          firstName: `"${formData.firstName}" (length: ${formData.firstName.length})`,
          lastName: `"${formData.lastName}" (length: ${formData.lastName.length})`,
          email: `"${formData.email}" (length: ${formData.email.length})`,
          phoneNumber: `"${formData.phoneNumber}" (length: ${formData.phoneNumber.length})`,
          agreeTerms: formData.agreeTerms,
          errors: errors,
          validation: {
            hasFirstName: !!formData.firstName.trim(),
            hasLastName: !!formData.lastName.trim(),
            hasEmail: !!formData.email.trim(),
            hasPhone: !!formData.phoneNumber.trim(),
            phoneIs9Digits: formData.phoneNumber.length === 9,
            termsAgreed: formData.agreeTerms,
            noErrors: Object.keys(errors).length === 0
          }
        });
        
        // Don't show the error report if form is actually complete
        const missingFields = [];
        if (!formData.firstName.trim()) missingFields.push('First Name');
        if (!formData.lastName.trim()) missingFields.push('Last Name');
        if (!formData.email.trim()) missingFields.push('Email');
        if (!formData.phoneNumber.trim()) missingFields.push('Phone Number');
        if (!formData.agreeTerms) missingFields.push('Terms Agreement');
        
        if (missingFields.length > 0) {
          toast({
            title: "Please Complete Required Fields",
            description: `Missing: ${missingFields.join(', ')}`,
            variant: "destructive"
          });
        }
        return;
      }

      await handleSubmit(e);
      showSuccessReport('Customer registration completed successfully! Welcome to Addex-Hub Mobile.');
      
    } catch (error) {
      console.error('Registration error:', error);
      showErrorReport(
        'Registration failed. Please check your information and try again.',
        '/portal?tab=registration',
        'Try Again'
      );
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

            {/* Enhanced Phone Input */}
            <div className="space-y-2">
              <EnhancedPhoneInput
                value={formData.phoneNumber}
                onChange={(value) => handleInputChange('phoneNumber', value)}
                onCountryCodeChange={(code) => handleInputChange('countryCode', code)}
                userType="customer"
                error={errors.phoneNumber}
                countryCode={formData.countryCode}
                autoFill={true}
                showSuggestions={true}
                label="Mobile Number *"
                placeholder="832466539"
              />
              {formData.phoneNumber && formData.phoneNumber.length === 9 && (
                <p className="text-green-600 text-sm flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Valid South African mobile number: +27{formData.phoneNumber}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Banking Information - Conditionally rendered without flickering */}
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

              {bankingDataLoaded && bankingData?.bankingProfiles && bankingData.bankingProfiles.length > 0 && (
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

        {/* Card Details Section - Stable rendering */}
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
              disabled={isSubmitting || !isFormValid()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 disabled:opacity-50"
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

      {/* Intelligent Reporting */}
      {activeReport && (
        <IntelligentReporting
          report={activeReport}
          onClose={clearReport}
        />
      )}
    </div>
  );
};

export default CustomerRegistration;
