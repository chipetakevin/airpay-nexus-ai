
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, Shield, Loader } from 'lucide-react';

interface RicaValidatorProps {
  phoneNumber: string;
  expectedNetwork?: string;
  onValidation: (result: ValidationResult) => void;
}

interface ValidationResult {
  isValid: boolean;
  network: string;
  ricaCompliant: boolean;
  errors: string[];
  suggestions: string[];
}

const RicaValidator = ({ phoneNumber, expectedNetwork, onValidation }: RicaValidatorProps) => {
  const [validating, setValidating] = useState(false);
  const [result, setResult] = useState<ValidationResult | null>(null);

  const validateRica = async (phone: string): Promise<ValidationResult> => {
    // Simulate RICA database lookup
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const cleanPhone = phone.replace(/\D/g, '');
    const isValidFormat = cleanPhone.length >= 10;
    
    let network = 'Unknown';
    let ricaCompliant = false;
    const errors: string[] = [];
    const suggestions: string[] = [];

    if (!isValidFormat) {
      errors.push('Invalid phone number format');
      suggestions.push('Enter a valid South African mobile number');
    } else {
      // Detect network from prefix
      const prefix = cleanPhone.startsWith('27') ? cleanPhone.substring(2, 5) : cleanPhone.substring(0, 3);
      
      const networkMap: { [key: string]: string } = {
        '083': 'MTN', '084': 'MTN', '073': 'MTN', '074': 'MTN',
        '082': 'Vodacom', '071': 'Vodacom', '072': 'Vodacom',
        '076': 'Cell C',
        '081': 'Telkom', '079': 'Telkom'
      };

      network = networkMap[prefix] || 'Unknown';
      ricaCompliant = network !== 'Unknown';

      if (!ricaCompliant) {
        errors.push('Number not found in RICA database');
        suggestions.push('Please verify the number is correctly registered');
      }

      // Check network mismatch
      if (expectedNetwork && network !== expectedNetwork && ricaCompliant) {
        errors.push(`This ${network} number cannot be used for ${expectedNetwork} deals`);
        suggestions.push(`Please select a ${network} deal or use a ${expectedNetwork} number`);
      }
    }

    return {
      isValid: isValidFormat && ricaCompliant && (!expectedNetwork || network === expectedNetwork),
      network,
      ricaCompliant,
      errors,
      suggestions
    };
  };

  useEffect(() => {
    if (phoneNumber && phoneNumber.length >= 10) {
      setValidating(true);
      validateRica(phoneNumber).then(validationResult => {
        setResult(validationResult);
        setValidating(false);
        onValidation(validationResult);
      });
    } else {
      setResult(null);
    }
  }, [phoneNumber, expectedNetwork]);

  if (!phoneNumber || phoneNumber.length < 10) {
    return null;
  }

  return (
    <div className="space-y-2 mt-2">
      {validating ? (
        <div className="flex items-center gap-2">
          <Loader className="w-4 h-4 animate-spin text-blue-600" />
          <span className="text-sm text-gray-600">Validating with RICA database...</span>
        </div>
      ) : result ? (
        <div className="space-y-2">
          {/* Network Detection */}
          <div className="flex items-center gap-2">
            {result.isValid ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-600" />
            )}
            <Badge 
              variant={result.isValid ? "default" : "destructive"}
              className="text-xs"
            >
              {result.network}
            </Badge>
            {result.ricaCompliant && (
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">RICA Verified</span>
              </div>
            )}
          </div>

          {/* Errors */}
          {result.errors.length > 0 && (
            <div className="space-y-1">
              {result.errors.map((error, index) => (
                <div key={index} className="flex items-start gap-2">
                  <AlertTriangle className="w-3 h-3 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-red-600">{error}</span>
                </div>
              ))}
            </div>
          )}

          {/* Suggestions */}
          {result.suggestions.length > 0 && (
            <div className="space-y-1">
              {result.suggestions.map((suggestion, index) => (
                <div key={index} className="text-xs text-gray-600 pl-5">
                  💡 {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default RicaValidator;
