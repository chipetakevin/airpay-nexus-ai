
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Phone, History } from 'lucide-react';
import { VendorFormData, VendorFormErrors } from '@/types/vendorRegistration';
import { usePhoneAutofill } from '@/hooks/usePhoneAutofill';
import { useToast } from '@/hooks/use-toast';

interface VendorPhoneSectionProps {
  formData: VendorFormData;
  errors: VendorFormErrors;
  onInputChange: (field: keyof VendorFormData, value: any) => void;
}

const VendorPhoneSection = ({ formData, errors, onInputChange }: VendorPhoneSectionProps) => {
  const [showSavedNumbers, setShowSavedNumbers] = useState(false);
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
        title: "Business Phone Auto-filled! 📱",
        description: "Using your previously saved number.",
      });
    }
  }, [detectedPhone, formData.phoneNumber, onInputChange, toast]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Normalize the input to handle both 0 and +27 formats
    const normalizedValue = normalizePhoneNumber(value);
    
    // Intelligently prevent invalid patterns
    if (normalizedValue.length > 0) {
      // First digit cannot be 0
      if (normalizedValue[0] === '0') {
        return; // Silently ignore
      }
      
      // Second digit cannot be 0
      if (normalizedValue.length > 1 && normalizedValue[1] === '0') {
        return; // Silently ignore
      }
    }
    
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
      title: "Business Number Selected! ✅",
      description: "Using your saved business phone number.",
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
        <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
          <Phone className="w-5 h-5" />
          Business Phone Number
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-sm font-medium text-blue-700">
            Business Mobile Number *
          </Label>
          
          {/* Saved Numbers Dropdown */}
          {savedPhoneNumbers.length > 0 && (
            <div className="relative">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowSavedNumbers(!showSavedNumbers)}
                className="mb-2 text-xs"
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
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm border-b last:border-b-0"
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
            <Input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
              onPaste={handleInputPaste}
              placeholder="812345678 (accepts 0812345678 or +27812345678)"
              className={`rounded-l-none ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
              maxLength={11} // Allow extra chars for pasting, but normalize on change
              autoComplete="tel"
            />
          </div>
          
          {formData.phoneNumber && (
            <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
              ✅ Full Number: {formatPhoneForDisplay(formData.phoneNumber)}
              <br />
              💾 Auto-saved for future use
            </div>
          )}
          
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
          )}
          
          <p className="text-xs text-blue-600">
            Enter business number in any format: 812345678, 0812345678, or +27812345678. 
            Numbers are automatically saved and normalized for vendor services.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorPhoneSection;
