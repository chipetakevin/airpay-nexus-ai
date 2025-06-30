
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import EnhancedPhoneInput from './EnhancedPhoneInput';

interface VendorPhoneSectionProps {
  formData: any;
  errors: any;
  onInputChange: (field: string, value: any) => void;
}

const VendorPhoneSection: React.FC<VendorPhoneSectionProps> = ({
  formData,
  errors,
  onInputChange
}) => {
  const { toast } = useToast();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const isPhoneValid = formData.phoneNumber && 
                      formData.phoneNumber.length >= 10 && 
                      !errors.phoneNumber;

  // Auto-collapse when phone is valid
  useEffect(() => {
    if (isPhoneValid && !isCollapsed) {
      const timer = setTimeout(() => {
        setIsCollapsed(true);
        toast({
          title: "Phone Validated! 📱",
          description: "Phone number validated and section collapsed for better navigation.",
          duration: 2000
        });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isPhoneValid, isCollapsed, toast]);

  // Auto-expand if phone becomes invalid
  useEffect(() => {
    if (!isPhoneValid && isCollapsed) {
      setIsCollapsed(false);
    }
  }, [isPhoneValid, isCollapsed]);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Card className="border-green-200 bg-green-50/30">
      <CardHeader 
        className="pb-3 cursor-pointer hover:bg-green-50/50 transition-colors"
        onClick={handleToggle}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2 text-green-800">
            <Phone className="w-5 h-5" />
            Phone Number
            {isPhoneValid && (
              <div className="flex items-center gap-1 ml-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600 font-medium">Validated</span>
              </div>
            )}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-green-600 hover:text-green-800"
          >
            {isCollapsed ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronUp className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      
      {!isCollapsed && (
        <CardContent className="space-y-4">
          <EnhancedPhoneInput
            formData={formData}
            errors={errors}
            onInputChange={onInputChange}
            userType="vendor"
          />
          
          {isPhoneValid && (
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Phone Number Validated!
                </span>
              </div>
              <p className="text-xs text-green-700">
                This section will automatically collapse to improve navigation flow.
              </p>
            </div>
          )}
        </CardContent>
      )}
      
      {isCollapsed && isPhoneValid && (
        <CardContent className="pt-0 pb-4">
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-sm font-medium text-green-800">
                    Phone Validated
                  </span>
                  <p className="text-xs text-green-700 mt-0.5">
                    {formData.phoneNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default VendorPhoneSection;
