
import React, { useState, useEffect } from 'react';
import { Check, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PhoneValidationMessageProps {
  value: string;
  isValid: boolean;
  fullNumber: string;
  error?: string;
}

const PhoneValidationMessage = ({
  value,
  isValid,
  fullNumber,
  error
}: PhoneValidationMessageProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hasAutoCollapsed, setHasAutoCollapsed] = useState(false);

  // Auto-collapse after 2 seconds when valid
  useEffect(() => {
    if (value && isValid && !hasAutoCollapsed) {
      const timer = setTimeout(() => {
        setIsCollapsed(true);
        setHasAutoCollapsed(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [value, isValid, hasAutoCollapsed]);

  // Reset when number becomes invalid
  useEffect(() => {
    if (!isValid) {
      setIsCollapsed(false);
      setHasAutoCollapsed(false);
    }
  }, [isValid]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Validation Messages */}
      {value && isValid && (
        <div className="space-y-2">
          {!isCollapsed ? (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg border border-green-200 animate-fade-in">
              <Check className="w-4 h-4" />
              <div className="flex-1">
                <p className="font-medium">Valid South African mobile number:</p>
                <p className="font-mono text-sm">{fullNumber}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleCollapse}
                className="text-green-600 hover:text-green-800 p-1 h-6 w-6"
              >
                <ChevronUp className="w-3 h-3" />
              </Button>
            </div>
          ) : (
            <div 
              className="flex items-center gap-2 text-green-600 bg-green-50 p-2 rounded-lg border border-green-200 cursor-pointer hover:bg-green-100 transition-colors animate-fade-in"
              onClick={toggleCollapse}
            >
              <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium">Number Validated</span>
              <div className="flex-1 text-right">
                <span className="font-mono text-xs text-green-700">{fullNumber}</span>
              </div>
              <ChevronDown className="w-3 h-3" />
            </div>
          )}
        </div>
      )}
      
      {error && (
        <p className="text-red-500 text-sm mt-1 flex items-center gap-2 bg-red-50 p-2 rounded border border-red-200">
          <Phone className="w-4 h-4" />
          {error}
        </p>
      )}
    </>
  );
};

export default PhoneValidationMessage;
