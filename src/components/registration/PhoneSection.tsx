
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Phone, History, Check } from 'lucide-react';
import { FormData } from '@/types/customerRegistration';
import { usePhoneAutofill } from '@/hooks/usePhoneAutofill';
import { useToast } from '@/hooks/use-toast';

interface PhoneSectionProps {
  formData: FormData;
  errors: Partial<Record<keyof FormData, string>>;
  onInputChange: (field: keyof FormData, value: any) => void;
}

const PhoneSection = ({ formData, errors, onInputChange }: PhoneSectionProps) => {
  const [showSavedNumbers, setShowSavedNumbers] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false);
  const { 
    detectedPhone, 
    savedPhoneNumbers, 
    savePhoneNumber, 
    normalizePhoneNumber, 
    formatPhoneForDisplay 
  } = usePhoneAutofill();
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

  // Validate phone number
  useEffect(() => {
    const isValid = formData.phoneNumber && 
                   formData.phoneNumber.length === 9 && 
                   /^[0-9]+$/.test(formData.phoneNumber);
    setIsValidPhone(isValid);
  }, [formData.phoneNumber]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Normalize the input to handle both 0 and +27 formats
    const normalizedValue = normalizePhoneNumber(value);
    
    // Limit to 9 digits (SA mobile numbers without country code/leading zero)
    if (normalizedValue.length > 9) {
      return; // Don't update if too long
    }
    
    onInputChange('phoneNumber', normalizedValue);
    
    // Auto-save when user types a complete number
    if (normalizedValue.length === 9) {
      savePhoneNumber(normalizedValue);
    }
  };

  const handleSavedNumberSelect = (savedNumber: string) => {
    onInputChange('phoneNumber', savedNumber);
    setShowSavedNumbers(false);
    toast({
      title: "Number Selected! ✅",
      description: "Using your saved phone number.",
    });
  };

  const handleInputPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const normalizedPhone = normalizePhoneNumber(pastedText);
    
    if (normalizedPhone.length <= 9) {
      onInputChange('phoneNumber', normalizedPhone);
      if (normalizedPhone.length === 9) {
        savePhoneNumber(normalizedPhone);
      }
    }
  };

  return (
    <Card className="border-blue-200 bg-blue-50/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-blue-800">
          <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
          Phone Number (Required for All Services)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-sm font-medium text-blue-700">
            Mobile Number *
          </Label>
          
          {/* Saved Numbers Dropdown */}
          {savedPhoneNumbers.length > 0 && (
            <div className="relative">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowSavedNumbers(!showSavedNumbers)}
                className="mb-2 text-xs sm:text-sm w-full sm:w-auto"
              >
                <History className="w-3 h-3 mr-1" />
                Saved Numbers ({savedPhoneNumbers.length})
              </Button>
              
              {showSavedNumbers && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-32 overflow-y-auto">
                  {savedPhoneNumbers.map((number, index) => (
                    <button
                      key={index}
                      type="button"
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm border-b last:border-b-0 transition-colors"
                      onClick={() => handleSavedNumberSelect(number)}
                    >
                      {formatPhoneForDisplay(number)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex">
            <div className="flex items-center px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
              <span className="text-sm font-medium text-gray-700">🇿🇦 +27</span>
            </div>
            <div className="relative flex-1">
              <Input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                onPaste={handleInputPaste}
                placeholder="812345678"
                className={`rounded-l-none pr-10 ${errors.phoneNumber ? 'border-red-500' : isValidPhone ? 'border-green-500' : 'border-gray-300'}`}
                maxLength={11}
                autoComplete="tel"
              />
              {isValidPhone && (
                <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
              )}
            </div>
          </div>
          
          {formData.phoneNumber && isValidPhone && (
            <div className="text-xs text-green-600 bg-green-50 p-2 rounded border border-green-200">
              ✅ Full Number: {formatPhoneForDisplay(formData.phoneNumber)}
              <br />
              💾 Auto-saved for future use
            </div>
          )}
          
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <span className="text-red-500">⚠️</span>
              {errors.phoneNumber}
            </p>
          )}
          
          <div className="bg-blue-50 p-2 rounded border border-blue-200">
            <p className="text-xs text-blue-600">
              <strong>📱 Flexible Input:</strong> Enter your number in any format:
            </p>
            <ul className="text-xs text-blue-600 mt-1 space-y-1">
              <li>• 812345678 (preferred)</li>
              <li>• 0812345678 (with leading zero)</li>
              <li>• +27812345678 (with country code)</li>
            </ul>
            <p className="text-xs text-blue-500 mt-2">
              Numbers are automatically normalized and saved for convenience.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhoneSection;
