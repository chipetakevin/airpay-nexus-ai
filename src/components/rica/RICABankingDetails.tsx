import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Shield, CheckCircle } from 'lucide-react';
import SmartBankingFormWrapper from '@/components/banking/SmartBankingFormWrapper';

interface RICABankingDetailsProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

interface BankingData {
  bankName: string;
  accountNumber: string;
  branchCode: string;
  accountType: string;
}

const RICABankingDetails: React.FC<RICABankingDetailsProps> = ({ 
  formData, 
  setFormData, 
  onNext, 
  onPrevious 
}) => {
  const [isBankingValid, setIsBankingValid] = useState(false);
  const [bankingCompleted, setBankingCompleted] = useState(false);

  // Handle banking form completion
  const handleBankingComplete = (data: BankingData) => {
    setFormData((prev: any) => ({
      ...prev,
      bankName: data.bankName,
      accountNumber: data.accountNumber,
      branchCode: data.branchCode,
      accountType: data.accountType
    }));
    setBankingCompleted(true);
    setIsBankingValid(true);
  };

  // Handle form validation changes
  const handleFormValidation = (isValid: boolean) => {
    setIsBankingValid(isValid);
  };

  // Check if step is valid for navigation
  const isStepValid = () => {
    return isBankingValid && formData.bankName && formData.accountNumber && formData.branchCode;
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Header Card */}
      <Card className="border-green-200 bg-green-50/30">
        <CardHeader className="px-4 py-4 sm:px-6 sm:py-6">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-700 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg sm:text-xl text-green-800">
                Banking Information
              </CardTitle>
              <p className="text-sm text-green-600 mt-1">
                Secure banking details for RICA compliance and administrative transactions
              </p>
            </div>
            {bankingCompleted && (
              <CheckCircle className="w-6 h-6 text-green-600" />
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Modern Banking Form */}
      <SmartBankingFormWrapper
        onBankingComplete={handleBankingComplete}
        onFormValidation={handleFormValidation}
        title=""
        subtitle=""
        autoSave={true}
        showStorageControls={true}
        className="space-y-4"
      />

      {/* Security Notice */}
      <Card className="border-green-200 bg-green-50/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Secure Banking Protection</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• All banking details are encrypted and stored securely</li>
                <li>• Used only for RICA compliance and administrative transactions</li>
                <li>• Automatically validated against South African banking standards</li>
                <li>• Branch codes are verified and auto-assigned for accuracy</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button 
          variant="outline" 
          onClick={onPrevious} 
          className="w-full sm:flex-1 h-12 text-base order-2 sm:order-1"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!isStepValid()}
          className="w-full sm:flex-1 h-12 text-base sm:h-14 sm:text-lg order-1 sm:order-2 disabled:opacity-50"
        >
          Next: SIM Details
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default RICABankingDetails;