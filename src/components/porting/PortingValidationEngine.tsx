import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  FileText, 
  Shield, 
  Phone,
  User,
  Building,
  CreditCard,
  Zap
} from 'lucide-react';

interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
  suggestion?: string;
}

interface PortingValidationProps {
  formData: any;
  onValidationComplete: (isValid: boolean, errors: ValidationError[]) => void;
}

const PortingValidationEngine: React.FC<PortingValidationProps> = ({ 
  formData, 
  onValidationComplete 
}) => {
  const { toast } = useToast();
  const [validationResults, setValidationResults] = useState<ValidationError[]>([]);
  const [isValidating, setIsValidating] = useState(false);

  // ICASA-compliant validation rules
  const validatePortingRequest = useCallback(async () => {
    setIsValidating(true);
    const errors: ValidationError[] = [];

    // 1. Phone Number Validation (ICASA Format)
    if (!formData.phoneNumber) {
      errors.push({
        field: 'phoneNumber',
        message: 'Phone number is required for porting',
        severity: 'error',
        suggestion: 'Enter your 10-digit South African mobile number'
      });
    } else {
      const cleanNumber = formData.phoneNumber.replace(/\s/g, '');
      if (!/^0[6-8][0-9]{8}$/.test(cleanNumber)) {
        errors.push({
          field: 'phoneNumber',
          message: 'Invalid South African mobile number format',
          severity: 'error',
          suggestion: 'Use format: 0XX XXX XXXX (e.g., 072 123 4567)'
        });
      } else {
        // Simulate network lookup for porting eligibility
        try {
          const networkCheck = await simulateNetworkLookup(cleanNumber);
          if (!networkCheck.active) {
            errors.push({
              field: 'phoneNumber',
              message: 'Number appears to be inactive or suspended',
              severity: 'error',
              suggestion: 'Only active numbers can be ported. Contact your current provider to reactivate.'
            });
          }
          if (networkCheck.contractStatus === 'outstanding_debt') {
            errors.push({
              field: 'phoneNumber',
              message: 'Outstanding contractual obligations detected',
              severity: 'warning',
              suggestion: 'Settle any outstanding payments with your current provider before porting.'
            });
          }
        } catch (error) {
          errors.push({
            field: 'phoneNumber',
            message: 'Unable to verify number status',
            severity: 'warning',
            suggestion: 'Network verification failed. Please try again or contact support.'
          });
        }
      }
    }

    // 2. Personal Information Validation
    if (!formData.fullName || formData.fullName.length < 3) {
      errors.push({
        field: 'fullName',
        message: 'Full name must match ID document exactly',
        severity: 'error',
        suggestion: 'Enter your full name as it appears on your South African ID'
      });
    }

    if (!formData.idNumber) {
      errors.push({
        field: 'idNumber',
        message: 'South African ID number is required',
        severity: 'error',
        suggestion: 'Enter your 13-digit SA ID number for RICA compliance'
      });
    } else if (!/^[0-9]{13}$/.test(formData.idNumber)) {
      errors.push({
        field: 'idNumber',
        message: 'Invalid South African ID number format',
        severity: 'error',
        suggestion: 'ID number must be exactly 13 digits'
      });
    } else {
      // Validate ID number checksum (Luhn algorithm for SA ID)
      const isValidSAID = validateSouthAfricanID(formData.idNumber);
      if (!isValidSAID) {
        errors.push({
          field: 'idNumber',
          message: 'Invalid South African ID number',
          severity: 'error',
          suggestion: 'Please check your ID number and try again'
        });
      }
    }

    // 3. Current Provider Information
    if (!formData.currentNetwork) {
      errors.push({
        field: 'currentNetwork',
        message: 'Current network provider is required',
        severity: 'error',
        suggestion: 'Select your current mobile network provider'
      });
    }

    if (!formData.targetNetwork) {
      errors.push({
        field: 'targetNetwork',
        message: 'Target network provider is required',
        severity: 'error',
        suggestion: 'Select Divine Mobile as your new provider'
      });
    }

    // 4. Network Compatibility Check
    if (formData.currentNetwork && formData.targetNetwork) {
      const compatibility = validateNetworkCompatibility(
        formData.currentNetwork, 
        formData.targetNetwork
      );
      if (!compatibility.compatible) {
        errors.push({
          field: 'networkCompatibility',
          message: 'Network porting compatibility issue',
          severity: 'warning',
          suggestion: compatibility.additionalSteps.join('. ') + '. Additional authorization may be required.'
        });
      }
    }

    // 5. Required Documents Validation
    if (!formData.documents || formData.documents.length === 0) {
      errors.push({
        field: 'documents',
        message: 'Letter of Authorization and ID copy are required',
        severity: 'error',
        suggestion: 'Upload your signed Letter of Authorization and copy of ID document'
      });
    } else {
      const requiredDocs = ['letter_of_authorization', 'id_copy', 'proof_of_address'];
      const uploadedDocTypes = formData.documents.map((doc: any) => doc.type);
      
      requiredDocs.forEach(docType => {
        if (!uploadedDocTypes.includes(docType)) {
          errors.push({
            field: 'documents',
            message: `Missing required document: ${docType.replace('_', ' ')}`,
            severity: 'error',
            suggestion: `Upload your ${docType.replace('_', ' ')} to complete the porting request`
          });
        }
      });
    }

    // 6. Contact Information Validation
    if (!formData.contactEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      errors.push({
        field: 'contactEmail',
        message: 'Valid email address is required for porting updates',
        severity: 'error',
        suggestion: 'Provide a valid email for OTP and status notifications'
      });
    }

    // 7. Consent Validation (POPIA Compliance)
    if (!formData.consentDataProcessing) {
      errors.push({
        field: 'consent',
        message: 'Data processing consent is required (POPIA compliance)',
        severity: 'error',
        suggestion: 'Accept data processing terms to proceed with porting'
      });
    }

    if (!formData.consentOwnership) {
      errors.push({
        field: 'consent',
        message: 'Number ownership confirmation is required',
        severity: 'error',
        suggestion: 'Confirm that you are the rightful owner of this number'
      });
    }

    setValidationResults(errors);
    setIsValidating(false);
    
    const isValid = errors.filter(e => e.severity === 'error').length === 0;
    onValidationComplete(isValid, errors);

    // Show validation summary
    if (isValid) {
      toast({
        title: "✅ Validation Passed",
        description: "Your porting request meets all ICASA requirements",
      });
    } else {
      const errorCount = errors.filter(e => e.severity === 'error').length;
      toast({
        title: "❌ Validation Issues Found",
        description: `${errorCount} error(s) must be resolved before submitting`,
        variant: "destructive"
      });
    }
  }, [formData, onValidationComplete, toast]);

  // Helper function to validate South African ID numbers
  const validateSouthAfricanID = (idNumber: string): boolean => {
    if (idNumber.length !== 13) return false;
    
    // Basic format validation
    const birthDate = idNumber.substring(0, 6);
    const genderDigit = parseInt(idNumber.substring(6, 10));
    const citizenship = parseInt(idNumber.substring(10, 11));
    const checkDigit = parseInt(idNumber.substring(12, 13));
    
    // Validate date
    const year = parseInt(birthDate.substring(0, 2));
    const month = parseInt(birthDate.substring(2, 4));
    const day = parseInt(birthDate.substring(4, 6));
    
    if (month < 1 || month > 12 || day < 1 || day > 31) return false;
    
    // Luhn algorithm for checksum
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      let digit = parseInt(idNumber.charAt(i));
      if (i % 2 === 1) {
        digit *= 2;
        if (digit > 9) digit = Math.floor(digit / 10) + (digit % 10);
      }
      sum += digit;
    }
    
    const calculatedCheckDigit = (10 - (sum % 10)) % 10;
    return calculatedCheckDigit === checkDigit;
  };

  // Network lookup simulation
  const simulateNetworkLookup = async (phoneNumber: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      active: Math.random() > 0.1, // 90% active rate
      network: detectNetwork(phoneNumber),
      contractStatus: Math.random() > 0.8 ? 'outstanding_debt' : 'clear',
      portingEligible: Math.random() > 0.05 // 95% eligible
    };
  };

  const detectNetwork = (phoneNumber: string) => {
    const patterns = {
      'MTN': /^0(83|63|73|78)/,
      'Vodacom': /^0(82|72|79)/,
      'Cell C': /^0(84|74)/,
      'Telkom Mobile': /^0(81|71)/,
      'Rain': /^0(87|67)/
    };

    for (const [network, pattern] of Object.entries(patterns)) {
      if (pattern.test(phoneNumber)) return network;
    }
    return 'Unknown';
  };

  const validateNetworkCompatibility = (from: string, to: string) => {
    // Simplified compatibility matrix
    const incompatibleCombinations = [
      ['MakroCall', 'MTN'],
      ['FNB Connect', 'Cell C']
    ];
    
    const isIncompatible = incompatibleCombinations.some(
      ([f, t]) => f === from && t === to
    );
    
    return {
      compatible: !isIncompatible,
      additionalSteps: isIncompatible ? 
        ['Contact current provider for special authorization', 'May require manual intervention'] : 
        []
    };
  };

  const getErrorIcon = (severity: string) => {
    switch (severity) {
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'warning': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <CheckCircle className="w-4 h-4 text-blue-500" />;
    }
  };

  const getErrorColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          ICASA Compliance Validation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={validatePortingRequest}
          disabled={isValidating}
          className="w-full"
        >
          {isValidating ? (
            <>
              <Clock className="w-4 h-4 mr-2 animate-spin" />
              Validating...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Validate Porting Request
            </>
          )}
        </Button>

        {validationResults.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Validation Results:</h4>
            {validationResults.map((error, index) => (
              <Alert key={index} className={getErrorColor(error.severity)}>
                <div className="flex items-start gap-2">
                  {getErrorIcon(error.severity)}
                  <div className="flex-1">
                    <AlertDescription>
                      <div className="font-medium">{error.message}</div>
                      {error.suggestion && (
                        <div className="text-sm text-gray-600 mt-1">
                          💡 {error.suggestion}
                        </div>
                      )}
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        )}

        {/* Validation Summary */}
        {validationResults.length > 0 && (
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-red-600">
                    {validationResults.filter(e => e.severity === 'error').length}
                  </div>
                  <div className="text-xs text-gray-600">Errors</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-yellow-600">
                    {validationResults.filter(e => e.severity === 'warning').length}
                  </div>
                  <div className="text-xs text-gray-600">Warnings</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">
                    {validationResults.filter(e => e.severity === 'error').length === 0 ? '✓' : '✗'}
                  </div>
                  <div className="text-xs text-gray-600">ICASA Ready</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default PortingValidationEngine;