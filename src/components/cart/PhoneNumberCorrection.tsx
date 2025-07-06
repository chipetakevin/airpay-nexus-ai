import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Phone, CheckCircle, AlertTriangle, User } from 'lucide-react';
import { validateSouthAfricanMobile } from '@/utils/phoneValidation';

interface PhoneNumberCorrectionProps {
  isVisible: boolean;
  currentPhone: string;
  onPhoneUpdate: (phone: string) => void;
  onSaveAndContinue: () => void;
  onCancel: () => void;
}

const PhoneNumberCorrection = ({
  isVisible,
  currentPhone,
  onPhoneUpdate,
  onSaveAndContinue,
  onCancel
}: PhoneNumberCorrectionProps) => {
  const [phoneNumber, setPhoneNumber] = useState(currentPhone);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setPhoneNumber(currentPhone);
  }, [currentPhone]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Clean and normalize input - allow only digits
    value = value.replace(/\D/g, '');
    
    // Handle different formats intelligently
    if (value.startsWith('27')) {
      // International format
      value = value.substring(2);
    } else if (value.startsWith('0')) {
      // National format
      value = value.substring(1);
    }
    
    // Limit to 9 digits for SA mobile
    if (value.length > 9) {
      return;
    }
    
    setPhoneNumber(value);
    
    // Real-time validation
    if (value.length > 0) {
      const validation = validateSouthAfricanMobile(value);
      setIsValid(validation.isValid);
      setError(validation.error || '');
    } else {
      setIsValid(false);
      setError('Phone number is required');
    }
  };

  const handleSaveAndContinue = async () => {
    if (!isValid || !phoneNumber) return;

    setIsSaving(true);
    
    try {
      // Update phone in parent component
      onPhoneUpdate(phoneNumber);
      
      // Save to localStorage for persistence
      const credentials = localStorage.getItem('userCredentials');
      if (credentials) {
        const parsed = JSON.parse(credentials);
        parsed.phone = phoneNumber;
        parsed.phoneNumber = phoneNumber;
        localStorage.setItem('userCredentials', JSON.stringify(parsed));
      }
      
      // Continue with purchase
      setTimeout(() => {
        onSaveAndContinue();
        setIsSaving(false);
      }, 500); // Brief delay for smooth UX
      
    } catch (error) {
      console.error('Error saving phone number:', error);
      setIsSaving(false);
    }
  };

  const formatPhoneForDisplay = (phone: string) => {
    if (!phone) return '';
    const clean = phone.replace(/\D/g, '');
    return `+27 ${clean.substring(0, 3)} ${clean.substring(3, 6)} ${clean.substring(6)}`;
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl border-2 border-red-200 animate-in slide-in-from-top-4 duration-300">
        <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-white font-bold">Phone Number Required</CardTitle>
              <p className="text-red-100 text-sm">Complete your profile to continue</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="w-4 h-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              We need your phone number to process the purchase and send you receipts.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Mobile Number *
              </label>
              
              <div className="flex">
                <div className="flex items-center px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                  <span className="text-sm font-medium text-gray-700">🇿🇦 +27</span>
                </div>
                
                <div className="relative flex-1">
                  <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="832466539 (9 digits)"
                    className={`rounded-l-none pr-10 ${
                      error ? 'border-red-500' : 
                      isValid ? 'border-green-500' : 'border-gray-300'
                    }`}
                    maxLength={9}
                    autoComplete="tel"
                    autoFocus
                  />
                  {isValid && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                  )}
                  {error && !isValid && (
                    <AlertTriangle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
                  )}
                </div>
              </div>
              
              {phoneNumber && isValid && (
                <div className="mt-2 text-sm text-green-600 bg-green-50 p-2 rounded border border-green-200">
                  <CheckCircle className="w-4 h-4 inline mr-1" />
                  Valid: {formatPhoneForDisplay(phoneNumber)}
                </div>
              )}
              
              {error && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" />
                  {error}
                </p>
              )}
            </div>

            <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded">
              <p><strong>Accepted formats:</strong></p>
              <p>• 832466539 (9 digits)</p>
              <p>• 0832466539 (with leading 0)</p>
              <p>• +27832466539 (international)</p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1"
              disabled={isSaving}
            >
              Cancel
            </Button>
            
            <Button
              onClick={handleSaveAndContinue}
              disabled={!isValid || !phoneNumber || isSaving}
              className={`flex-1 font-semibold ${
                isValid && phoneNumber 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {isSaving ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Save & Continue
                </div>
              )}
            </Button>
          </div>

          <p className="text-xs text-center text-gray-600">
            Your phone number will be saved securely for future purchases
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhoneNumberCorrection;