
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, Shield, Loader } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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
    setValidating(true);
    
    try {
      // Check RICA database
      const { data: ricaData, error } = await supabase
        .from('rica_validations')
        .select('*')
        .eq('phone_number', phone)
        .eq('status', 'verified')
        .single();

      const cleanPhone = phone.replace(/\D/g, '');
      const isValidFormat = cleanPhone.length >= 10;
      
      let network = 'Unknown';
      let ricaCompliant = false;
      const errors: string[] = [];
      const suggestions: string[] = [];

      if (!isValidFormat) {
        errors.push('Invalid phone number format');
        suggestions.push('Enter a valid South African mobile number');
      } else if (ricaData && !error) {
        // Found in RICA database
        network = ricaData.network_provider;
        ricaCompliant = true;
      } else {
        // Fallback to prefix detection
        const prefix = cleanPhone.startsWith('27') ? cleanPhone.substring(2, 5) : cleanPhone.substring(0, 3);
        
        const networkMap: { [key: string]: string } = {
          '083': 'MTN', '084': 'MTN', '073': 'MTN', '074': 'MTN',
          '082': 'Vodacom', '071': 'Vodacom', '072': 'Vodacom',
          '060': 'Vodacom', '061': 'Vodacom', '062': 'Vodacom',
          '063': 'Vodacom', '064': 'Vodacom', '065': 'Vodacom',
          '066': 'Vodacom', '067': 'Vodacom', '068': 'Vodacom', '069': 'Vodacom',
          '076': 'Cell C',
          '081': 'Telkom', '079': 'Telkom',
          '087': 'Rain'
        };

        network = networkMap[prefix] || 'Unknown';
        
        if (network === 'Unknown') {
          ricaCompliant = false;
          errors.push('Number not found in RICA database');
          suggestions.push('Please verify the number is correctly registered');
        } else {
          ricaCompliant = true;
        }
      }

      // Check network mismatch
      if (expectedNetwork && network !== expectedNetwork && ricaCompliant) {
        errors.push(`This ${network} number cannot be used for ${expectedNetwork} deals`);
        suggestions.push(`Please select a ${network} deal or use a ${expectedNetwork} number`);
      }

      return {
        isValid: isValidFormat && ricaCompliant && (!expectedNetwork || network === expectedNetwork),
        network,
        ricaCompliant,
        errors,
        suggestions
      };
    } catch (error) {
      console.error('RICA validation error:', error);
      return {
        isValid: false,
        network: 'Unknown',
        ricaCompliant: false,
        errors: ['Unable to validate with RICA database'],
        suggestions: ['Please try again later']
      };
    } finally {
      setValidating(false);
    }
  };

  useEffect(() => {
    if (phoneNumber && phoneNumber.length >= 10) {
      validateRica(phoneNumber).then(validationResult => {
        setResult(validationResult);
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
