
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, ChevronUp, FileText, Shield, AlertCircle } from 'lucide-react';
import SouthAfricanTerms from './SouthAfricanTerms';

interface TermsSelectorProps {
  phoneNumber: string;
  recipientName: string;
  purchaseType: 'self' | 'third_party';
  dealType: string;
  validationError?: string;
  hasAcceptedTerms: boolean;
  onAcceptTerms: () => void;
}

const TermsSelector = ({
  phoneNumber,
  recipientName,
  purchaseType,
  dealType,
  validationError,
  hasAcceptedTerms,
  onAcceptTerms
}: TermsSelectorProps) => {
  const [showTerms, setShowTerms] = useState(false);
  const [shouldPulse, setShouldPulse] = useState(true);

  // Stop pulsing once terms are accepted
  useEffect(() => {
    if (hasAcceptedTerms) {
      setShouldPulse(false);
      // Auto-close terms section after accepting
      setTimeout(() => {
        setShowTerms(false);
      }, 1000);
    }
  }, [hasAcceptedTerms]);

  // Auto-expand terms if there's a validation error
  useEffect(() => {
    if (validationError && !hasAcceptedTerms) {
      setShowTerms(true);
      setShouldPulse(true);
    }
  }, [validationError, hasAcceptedTerms]);

  const getTermsButtonStyles = () => {
    if (hasAcceptedTerms) {
      return "w-full justify-between h-auto p-3 text-left border-green-200 bg-green-50 hover:bg-green-100 transition-all duration-500 ease-in-out";
    }
    if (shouldPulse) {
      return "w-full justify-between h-auto p-3 text-left border-red-200 bg-red-50 hover:bg-red-100 animate-pulse transition-all duration-500 ease-in-out";
    }
    return "w-full justify-between h-auto p-3 text-left transition-all duration-500 ease-in-out";
  };

  const getIconColor = () => {
    if (hasAcceptedTerms) return "text-green-600";
    if (validationError || shouldPulse) return "text-red-600";
    return "text-blue-600";
  };

  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        onClick={() => setShowTerms(!showTerms)}
        className={getTermsButtonStyles()}
        disabled={hasAcceptedTerms}
      >
        <div className="flex items-center gap-2">
          {validationError && !hasAcceptedTerms ? (
            <AlertCircle className={`w-4 h-4 ${getIconColor()} animate-bounce`} />
          ) : (
            <FileText className={`w-4 h-4 ${getIconColor()}`} />
          )}
          <div>
            <div className="font-medium flex items-center gap-2">
              Terms & Conditions
              {hasAcceptedTerms && (
                <span className="text-green-600 animate-fade-in">✅</span>
              )}
            </div>
            <div className={`text-xs ${hasAcceptedTerms ? 'text-green-600' : 'text-gray-500'}`}>
              {hasAcceptedTerms ? 'Terms Accepted - Ready to Pay' : 'South African Purchase Requirements'}
            </div>
          </div>
        </div>
        {!hasAcceptedTerms && (showTerms ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
      </Button>

      {showTerms && !hasAcceptedTerms && (
        <Card className={`transition-all duration-300 ease-in-out animate-fade-in ${hasAcceptedTerms ? 'border-green-200 bg-green-50' : 'border-blue-200 bg-blue-50'}`}>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Shield className={`w-5 h-5 ${getIconColor()}`} />
              <h3 className={`font-semibold ${hasAcceptedTerms ? 'text-green-800' : 'text-blue-800'}`}>
                Purchase Terms
              </h3>
            </div>

            <div className="bg-white p-3 rounded border border-blue-200">
              <ul className="space-y-2 text-blue-700 text-xs">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  All purchases comply with RICA regulations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  Subject to Consumer Protection Act
                </li>
                {validationError && (
                  <li className="flex items-start gap-2 text-orange-600 animate-bounce">
                    <span className="text-orange-600 mt-0.5">⚠</span>
                    {validationError}
                  </li>
                )}
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  {dealType === 'data' ? 'Data bundles' : 'Airtime'} are non-refundable once loaded
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  Network delivery failures resolved within 24 hours
                </li>
              </ul>
            </div>

            <div className={`flex items-center space-x-2 p-3 rounded-lg transition-all duration-300 ${hasAcceptedTerms ? 'bg-green-100 border border-green-200' : shouldPulse ? 'bg-red-50 border border-red-200 animate-pulse' : 'bg-gray-50'}`}>
              <Checkbox
                id="acceptTerms"
                checked={hasAcceptedTerms}
                onCheckedChange={onAcceptTerms}
                className={`transition-all duration-300 ${hasAcceptedTerms ? 'border-green-500 data-[state=checked]:bg-green-600' : ''}`}
              />
              <label 
                htmlFor="acceptTerms" 
                className={`text-sm cursor-pointer font-medium transition-all duration-300 ${hasAcceptedTerms ? 'text-green-800' : 'text-blue-800'}`}
              >
                I accept the terms and conditions for this purchase
              </label>
            </div>
          </CardContent>
        </Card>
      )}

      {hasAcceptedTerms && (
        <div className="text-xs text-green-600 bg-green-50 p-3 rounded-lg flex items-center gap-2 border border-green-200 animate-fade-in">
          <span className="animate-bounce">✅</span>
          <span className="font-medium">Terms accepted - Ready to purchase!</span>
        </div>
      )}
    </div>
  );
};

export default TermsSelector;
