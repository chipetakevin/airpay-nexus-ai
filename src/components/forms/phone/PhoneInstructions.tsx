
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PhoneInstructionsProps {
  isValid?: boolean;
  hasValue?: boolean;
}

const PhoneInstructions = ({ isValid = false, hasValue = false }: PhoneInstructionsProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hasAutoCollapsed, setHasAutoCollapsed] = useState(false);

  // Auto-collapse after 2.5 seconds when valid (slightly delayed after validation message)
  useEffect(() => {
    if (hasValue && isValid && !hasAutoCollapsed) {
      const timer = setTimeout(() => {
        setIsCollapsed(true);
        setHasAutoCollapsed(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [hasValue, isValid, hasAutoCollapsed]);

  // Reset when number becomes invalid
  useEffect(() => {
    if (!isValid || !hasValue) {
      setIsCollapsed(false);
      setHasAutoCollapsed(false);
    }
  }, [isValid, hasValue]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="space-y-2">
      {!isCollapsed ? (
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 animate-fade-in">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-blue-700 font-medium">
              📱 Enter your 9-digit SA mobile number
            </p>
            {(isValid && hasValue) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleCollapse}
                className="text-blue-600 hover:text-blue-800 p-1 h-6 w-6"
              >
                <ChevronUp className="w-3 h-3" />
              </Button>
            )}
          </div>
          <div className="text-xs text-blue-600 space-y-1">
            <p>• Without country code: <span className="font-mono">832466539</span></p>
            <p>• System will save: <span className="font-mono">+27832466539</span></p>
            <p>• Numbers are permanently stored for future use</p>
          </div>
        </div>
      ) : (
        <div 
          className="bg-blue-50 p-2 rounded-lg border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors animate-fade-in"
          onClick={toggleCollapse}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-blue-700">📱 Instructions</span>
            <ChevronDown className="w-3 h-3 text-blue-600" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneInstructions;
