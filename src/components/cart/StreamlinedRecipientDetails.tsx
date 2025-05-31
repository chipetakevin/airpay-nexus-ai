
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Phone } from 'lucide-react';
import NetworkDetector from '../NetworkDetector';
import TermsSelector from './TermsSelector';

interface StreamlinedRecipientDetailsProps {
  purchaseMode: 'self' | 'other';
  recipientData: {
    name: string;
    phone: string;
    relationship: string;
  };
  customerPhone: string;
  detectedNetwork: string;
  validationError: string;
  acceptedSATerms: boolean;
  cartItems: any[];
  onRecipientDataChange: (data: any) => void;
  onCustomerPhoneChange: (phone: string) => void;
  onPhoneValidation: (phone: string) => void;
  onAcceptSATerms: () => void;
}

const StreamlinedRecipientDetails = ({
  purchaseMode,
  recipientData,
  customerPhone,
  detectedNetwork,
  validationError,
  acceptedSATerms,
  cartItems = [],
  onRecipientDataChange,
  onCustomerPhoneChange,
  onPhoneValidation,
  onAcceptSATerms
}: StreamlinedRecipientDetailsProps) => {
  const targetPhone = purchaseMode === 'self' ? customerPhone : recipientData.phone;
  const dealType = cartItems.length > 0 ? cartItems[0].dealType : 'airtime';

  return (
    <Card className="border-gray-200">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <User className="w-4 h-4 text-blue-600" />
          <h3 className="font-semibold text-sm">
            {purchaseMode === 'self' ? 'Your Details' : 'Recipient Details'}
          </h3>
        </div>
        
        {purchaseMode === 'self' ? (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="customerPhone" className="text-sm font-medium">
                Your Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="customerPhone"
                  value={customerPhone}
                  onChange={(e) => {
                    onCustomerPhoneChange(e.target.value);
                    onPhoneValidation(e.target.value);
                  }}
                  placeholder="Enter your phone number"
                  className="pl-10"
                />
              </div>
              
              {detectedNetwork && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {detectedNetwork}
                  </Badge>
                  <NetworkDetector
                    phoneNumber={customerPhone}
                    onNetworkDetected={() => {}}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="recipientName" className="text-sm font-medium">
                Recipient Name
              </Label>
              <Input
                id="recipientName"
                value={recipientData.name}
                onChange={(e) => onRecipientDataChange({ ...recipientData, name: e.target.value })}
                placeholder="Enter recipient's name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipientPhone" className="text-sm font-medium">
                Recipient Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="recipientPhone"
                  value={recipientData.phone}
                  onChange={(e) => {
                    const newPhone = e.target.value;
                    onRecipientDataChange({ ...recipientData, phone: newPhone });
                    onPhoneValidation(newPhone);
                  }}
                  placeholder="Enter recipient's phone number"
                  className="pl-10"
                />
              </div>
              
              {detectedNetwork && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {detectedNetwork}
                  </Badge>
                  <NetworkDetector
                    phoneNumber={recipientData.phone}
                    onNetworkDetected={() => {}}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="relationship" className="text-sm font-medium">
                Relationship
              </Label>
              <Input
                id="relationship"
                value={recipientData.relationship}
                onChange={(e) => onRecipientDataChange({ ...recipientData, relationship: e.target.value })}
                placeholder="e.g., Family, Friend, Colleague"
              />
            </div>
          </div>
        )}

        <TermsSelector
          phoneNumber={targetPhone}
          recipientName={purchaseMode === 'self' ? 'Self' : recipientData.name}
          purchaseType={purchaseMode === 'self' ? 'self' : 'third_party'}
          dealType={dealType}
          validationError={validationError}
          hasAcceptedTerms={acceptedSATerms}
          onAcceptTerms={onAcceptSATerms}
        />
      </CardContent>
    </Card>
  );
};

export default StreamlinedRecipientDetails;
