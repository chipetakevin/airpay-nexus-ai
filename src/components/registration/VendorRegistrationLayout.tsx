
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useVendorFormState } from '@/hooks/useVendorFormState';
import { useVendorFormValidation } from '@/hooks/useVendorFormValidation';
import { useVendorRegistrationSubmit } from '@/hooks/useVendorRegistrationSubmit';
import { useVendorRegistrationContext } from './VendorRegistrationProvider';
import VendorRegistrationForm from './VendorRegistrationForm';
import VendorBankingFormComplete from './banking/VendorBankingFormComplete';
import VendorConsentSection from './VendorConsentSection';
import VendorRegistrationButton from './VendorRegistrationButton';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, User, Building, CreditCard, Shield } from 'lucide-react';

const VendorRegistrationLayout: React.FC = () => {
  const [location, setLocation] = useState('');
  const { 
    formData, 
    showPassword, 
    togglePasswordVisibility, 
    handleInputChange, 
    handleBankSelect 
  } = useVendorFormState();
  
  const { errors, isFormValid } = useVendorFormValidation(formData);
  const { isRegistering, handleFormSubmit } = useVendorRegistrationSubmit(async (e) => {
    e.preventDefault();
    // Always allow submission, let the validation happen inside the submit handler
    return true;
  });

  // Calculate progress
  const calculateProgress = () => {
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phoneNumber', 'companyName', 
      'password', 'confirmPassword', 'agreeTerms'
    ];
    const completedFields = requiredFields.filter(field => {
      if (field === 'agreeTerms') return formData[field] === true;
      return formData[field] && formData[field].toString().trim() !== '';
    });
    
    // Add banking completion
    const bankingComplete = formData.bankName && formData.accountNumber && formData.branchCode;
    if (bankingComplete) completedFields.push('banking');
    
    return Math.round((completedFields.length / (requiredFields.length + 1)) * 100);
  };

  const progress = calculateProgress();
  const sections = [
    { icon: User, title: 'Personal Info', complete: formData.firstName && formData.lastName && formData.email },
    { icon: Building, title: 'Business Info', complete: formData.companyName && formData.phoneNumber },
    { icon: CreditCard, title: 'Banking', complete: formData.bankName && formData.accountNumber && formData.branchCode },
    { icon: Shield, title: 'Security', complete: formData.password && formData.confirmPassword && formData.agreeTerms }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Vendor Registration</h1>
          <p className="text-lg text-gray-600">Join our network of trusted business partners</p>
        </div>

        {/* Progress Section */}
        <Card className="mb-6 border-blue-200 bg-blue-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-blue-800">Registration Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-blue-700 mb-2">
                <span>Complete your vendor registration</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sections.map((section, index) => (
                <div key={index} className="flex items-center gap-2">
                  {section.complete ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <section.icon className="w-5 h-5 text-gray-400" />
                  )}
                  <span className={`text-sm ${section.complete ? 'text-green-700 font-medium' : 'text-gray-600'}`}>
                    {section.title}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Form */}
        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Personal & Business Information */}
          <VendorRegistrationForm
            formData={formData}
            errors={errors}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            handleInputChange={handleInputChange}
            handleBankSelect={handleBankSelect}
            onSubmit={handleFormSubmit}
            location={location}
            setLocation={setLocation}
          />

          {/* Enhanced Banking Section */}
          <VendorBankingFormComplete
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            onBankSelect={handleBankSelect}
            marketingConsent={formData.marketingConsent}
          />

          {/* Consent Section */}
          <VendorConsentSection
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
          />
        </form>

        {/* Registration Button */}
        <VendorRegistrationButton
          onClick={handleFormSubmit}
          isRegistering={isRegistering}
          isFormValid={isFormValid()}
        />
      </div>
    </div>
  );
};

export default VendorRegistrationLayout;
