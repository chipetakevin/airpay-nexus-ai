
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface RecipientDetailsProps {
  purchaseMode: 'self' | 'other';
  recipientData: {
    name: string;
    phone: string;
    relationship: string;
  };
  customerPhone: string;
  currentUser: any;
  detectedNetwork: string;
  isValidating: boolean;
  validationError: string;
  onRecipientDataChange: (data: { name: string; phone: string; relationship: string }) => void;
  onCustomerPhoneChange: (phone: string) => void;
  onPhoneValidation: (phone: string) => void;
}

const RecipientDetails = ({
  purchaseMode,
  recipientData,
  customerPhone,
  currentUser,
  detectedNetwork,
  isValidating,
  validationError,
  onRecipientDataChange,
  onCustomerPhoneChange,
  onPhoneValidation
}: RecipientDetailsProps) => {
  const handlePhoneChange = (phone: string) => {
    if (purchaseMode === 'self') {
      onCustomerPhoneChange(phone);
    } else {
      onRecipientDataChange({ ...recipientData, phone });
    }
    if (phone.length >= 10) {
      onPhoneValidation(phone);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm">
        {purchaseMode === 'self' ? 'Your Details' : 'Recipient Details'}
      </h3>
      
      {purchaseMode === 'other' && (
        <>
          <div>
            <Label htmlFor="recipientName" className="text-xs">Recipient Name</Label>
            <Input
              id="recipientName"
              value={recipientData.name}
              onChange={(e) => onRecipientDataChange({ ...recipientData, name: e.target.value })}
              placeholder="Enter recipient name"
              className="h-9"
            />
          </div>
          <div>
            <Label htmlFor="relationship" className="text-xs">Relationship</Label>
            <Input
              id="relationship"
              value={recipientData.relationship}
              onChange={(e) => onRecipientDataChange({ ...recipientData, relationship: e.target.value })}
              placeholder="e.g., Family, Friend, Colleague"
              className="h-9"
            />
          </div>
        </>
      )}

      <div>
        <Label htmlFor="phone" className="text-xs">
          {purchaseMode === 'self' ? 'Your Phone Number' : 'Recipient Phone Number'}
        </Label>
        <div className="relative">
          <Input
            id="phone"
            value={purchaseMode === 'self' ? customerPhone : recipientData.phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder="+27 XX XXX XXXX"
            className="h-9"
            disabled={purchaseMode === 'self' && !currentUser}
          />
          {isValidating && (
            <div className="absolute right-2 top-2">
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        
        {detectedNetwork && (
          <div className="flex items-center gap-2 mt-1">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-xs text-green-600">Detected: {detectedNetwork}</span>
          </div>
        )}
        
        {validationError && (
          <div className="flex items-center gap-2 mt-1">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span className="text-xs text-red-600">{validationError}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipientDetails;
