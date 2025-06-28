
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Shield, Loader2 } from 'lucide-react';

interface PaymentStepTwoProps {
  formData: any;
  errors: Record<string, string>;
  addressSuggestions: string[];
  onInputChange: (field: string, value: string) => void;
  onAddressSuggestionClick: (suggestion: string) => void;
  onPrevStep: () => void;
  onSubmit: () => void;
  isProcessing: boolean;
  total: number;
}

const PaymentStepTwo = ({
  formData,
  errors,
  addressSuggestions,
  onInputChange,
  onAddressSuggestionClick,
  onPrevStep,
  onSubmit,
  isProcessing,
  total
}: PaymentStepTwoProps) => {
  return (
    <>
      {/* Billing Address */}
      <div>
        <label className="block text-sm font-medium mb-1">
          <MapPin className="w-4 h-4 inline mr-1" />
          Street Address
        </label>
        <Input
          type="text"
          placeholder="Start typing your address..."
          value={formData.address}
          onChange={(e) => onInputChange('address', e.target.value)}
          className={errors.address ? 'border-red-500' : ''}
        />
        {addressSuggestions.length > 0 && (
          <div className="mt-1 bg-white border rounded-md shadow-sm">
            {addressSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => onAddressSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
        {errors.address && (
          <p className="text-xs text-red-500 mt-1">{errors.address}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <Input
            type="text"
            placeholder="Cape Town"
            value={formData.city}
            onChange={(e) => onInputChange('city', e.target.value)}
            className={errors.city ? 'border-red-500' : ''}
          />
          {errors.city && (
            <p className="text-xs text-red-500 mt-1">{errors.city}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Postal Code</label>
          <Input
            type="text"
            placeholder="8001"
            value={formData.postalCode}
            onChange={(e) => onInputChange('postalCode', e.target.value)}
            className={errors.postalCode ? 'border-red-500' : ''}
          />
          {errors.postalCode && (
            <p className="text-xs text-red-500 mt-1">{errors.postalCode}</p>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Button 
          variant="outline"
          onClick={onPrevStep}
          className="flex-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={onSubmit}
          disabled={isProcessing}
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Shield className="w-4 h-4 mr-2" />
              Pay R{total}
            </>
          )}
        </Button>
      </div>
    </>
  );
};

export default PaymentStepTwo;
