
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Phone } from 'lucide-react';
import { FormData } from '@/types/customerRegistration';
import { usePhoneAutofill } from '@/hooks/usePhoneAutofill';
import { usePhoneValidation } from '@/hooks/usePhoneValidation';
import { useToast } from '@/hooks/use-toast';
import PhoneInput from './PhoneInput';
import SavedPhoneNumbers from './SavedPhoneNumbers';
import PhoneValidationInfo from './PhoneValidationInfo';

interface RefactoredPhoneSectionProps {
  formData: FormData;
  errors: Partial<Record<keyof FormData, string>>;
  onInputChange: (field: keyof FormData, value: any) => void;
}

const RefactoredPhoneSection = ({ formData, errors, onInputChange }: RefactoredPhoneSectionProps) => {
  const [showSavedNumbers, setShowSavedNumbers] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false);
  const { 
    detectedPhone, 
    savedPhoneNumbers, 
    savePhoneNumber, 
    normalizePhoneNumber, 
    formatPhoneForDisplay 
  } = usePhoneAutofill();
  const { validateSouthAfricanMobile } = usePhoneValidation();
  const { toast } = useToast();

  // Auto-fill on component mount
  useEffect(() => {
    if (detectedPhone && !formData.phoneNumber) {
      onInputChange('phoneNumber', detectedPhone);
      toast({
        title: "Phone Number Auto-filled! 📱",
        description: "Using your previously saved number.",
      });
    }
  }, [detectedPhone, formData.phoneNumber, onInputChange, toast]);

  // Validate phone number with South African standards
  useEffect(() => {
    if (formData.phoneNumber) {
      const validation = validateSouthAfricanMobile(formData.phoneNumber);
      setIsValidPhone(validation.isValid);
    } else {
      setIsValidPhone(false);
    }
  }, [formData.phoneNumber, validateSouthAfricanMobile]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Allow only digits, plus, and spaces for better UX
    value = value.replace(/[^\d+\s]/g, '');
    
    onInputChange('phoneNumber', value);
    
    // Validate and auto-save when user types a complete number
    if (value.length >= 9) {
      const validation = validateSouthAfricanMobile(value);
      if (validation.isValid) {
        const normalizedValue = normalizePhoneNumber(value);
        savePhoneNumber(normalizedValue);
      }
    }
  };

  const handleSavedNumberSelect = (savedNumber: string) => {
    onInputChange('phoneNumber', formatPhoneForDisplay(savedNumber));
    setShowSavedNumbers(false);
    toast({
      title: "Number Selected! ✅",
      description: "Using your saved phone number.",
    });
  };

  const handleInputPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    
    // Validate pasted number
    const validation = validateSouthAfricanMobile(pastedText);
    if (validation.isValid) {
      onInputChange('phoneNumber', pastedText);
      const normalizedPhone = normalizePhoneNumber(pastedText);
      savePhoneNumber(normalizedPhone);
    } else {
      toast({
        title: "Invalid Phone Number",
        description: validation.error || "Please enter a valid South African mobile number",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="border-blue-200 bg-blue-50/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-blue-800">
          <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
          South African Mobile Number (Required)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-sm font-medium text-blue-700">
            Mobile Number *
          </Label>
          
          <SavedPhoneNumbers
            savedPhoneNumbers={savedPhoneNumbers}
            showSavedNumbers={showSavedNumbers}
            onToggleShow={() => setShowSavedNumbers(!showSavedNumbers)}
            onSelectNumber={handleSavedNumberSelect}
            formatPhoneForDisplay={formatPhoneForDisplay}
          />

          <PhoneInput
            phoneNumber={formData.phoneNumber}
            onPhoneChange={handlePhoneChange}
            onPhonePaste={handleInputPaste}
            isValidPhone={isValidPhone}
            error={errors.phoneNumber}
          />
          
          <PhoneValidationInfo
            phoneNumber={formData.phoneNumber}
            isValidPhone={isValidPhone}
            error={errors.phoneNumber}
            formatPhoneForDisplay={formatPhoneForDisplay}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RefactoredPhoneSection;
