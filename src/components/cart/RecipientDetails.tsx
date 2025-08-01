
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import NetworkDetector from '../NetworkDetector';
import UnknownNumberTerms from './UnknownNumberTerms';
import SouthAfricanTerms from './SouthAfricanTerms';

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
  acceptedUnknownNumber?: boolean;
  requiresTermsAcceptance?: boolean;
  acceptedSATerms?: boolean;
  cartItems?: any[]; // Added to determine deal type
  onRecipientDataChange: (data: any) => void;
  onCustomerPhoneChange: (phone: string) => void;
  onPhoneValidation: (phone: string) => void;
  onAcceptUnknownTerms?: () => void;
  onAcceptSATerms?: () => void;
}

const RecipientDetails = ({
  purchaseMode,
  recipientData,
  customerPhone,
  currentUser,
  detectedNetwork,
  isValidating,
  validationError,
  acceptedUnknownNumber,
  requiresTermsAcceptance,
  acceptedSATerms,
  cartItems = [],
  onRecipientDataChange,
  onCustomerPhoneChange,
  onPhoneValidation,
  onAcceptUnknownTerms,
  onAcceptSATerms
}: RecipientDetailsProps) => {
  const targetPhone = purchaseMode === 'self' ? customerPhone : recipientData.phone;
  const showUnknownTerms = validationError && !acceptedUnknownNumber && onAcceptUnknownTerms;
  const showSATerms = requiresTermsAcceptance && !acceptedSATerms && onAcceptSATerms;
  
  // Determine deal type from cart items
  const dealType = cartItems.length > 0 ? cartItems[0].dealType : 'airtime';

  return (
    <div className="space-y-4">
      {purchaseMode === 'self' ? (
        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold text-sm">Your Details</h3>
            
            <div className="space-y-2">
              <Label htmlFor="customerPhone">Your Phone Number</Label>
              <Input
                id="customerPhone"
                value={customerPhone}
                onChange={(e) => {
                  onCustomerPhoneChange(e.target.value);
                  onPhoneValidation(e.target.value);
                }}
                placeholder="Enter your phone number"
                className={validationError && !acceptedUnknownNumber ? 'border-red-500' : ''}
              />
              
              <NetworkDetector
                phoneNumber={customerPhone}
                onNetworkDetected={() => {}}
              />
            </div>

            {showUnknownTerms && (
              <UnknownNumberTerms
                phoneNumber={customerPhone}
                detectedNetwork={detectedNetwork}
                onAcceptTerms={onAcceptUnknownTerms}
                onCancel={() => onCustomerPhoneChange('')}
              />
            )}

            {showSATerms && (
              <SouthAfricanTerms
                phoneNumber={customerPhone}
                recipientName="Self"
                purchaseType="self"
                dealType={dealType}
                onAcceptTerms={onAcceptSATerms}
                onCancel={() => onCustomerPhoneChange('')}
              />
            )}

            {validationError && acceptedUnknownNumber && (
              <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
                ⚠️ Proceeding with unknown number - terms accepted
              </div>
            )}

            {acceptedSATerms && (
              <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                ✅ South African purchase terms accepted
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold text-sm">Recipient Details</h3>
            
            <div className="space-y-2">
              <Label htmlFor="recipientName">Recipient Name</Label>
              <Input
                id="recipientName"
                value={recipientData.name}
                onChange={(e) => onRecipientDataChange({ ...recipientData, name: e.target.value })}
                placeholder="Enter recipient's name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipientPhone">Recipient Phone Number</Label>
              <Input
                id="recipientPhone"
                value={recipientData.phone}
                onChange={(e) => {
                  const newPhone = e.target.value;
                  onRecipientDataChange({ ...recipientData, phone: newPhone });
                  onPhoneValidation(newPhone);
                }}
                placeholder="Enter recipient's phone number"
                className={validationError && !acceptedUnknownNumber ? 'border-red-500' : ''}
              />
              
              <NetworkDetector
                phoneNumber={recipientData.phone}
                onNetworkDetected={() => {}}
              />
            </div>

            {showUnknownTerms && (
              <UnknownNumberTerms
                phoneNumber={recipientData.phone}
                detectedNetwork={detectedNetwork}
                onAcceptTerms={onAcceptUnknownTerms}
                onCancel={() => onRecipientDataChange({ ...recipientData, phone: '' })}
              />
            )}

            {showSATerms && (
              <SouthAfricanTerms
                phoneNumber={recipientData.phone}
                recipientName={recipientData.name}
                purchaseType="third_party"
                dealType={dealType}
                onAcceptTerms={onAcceptSATerms}
                onCancel={() => onRecipientDataChange({ ...recipientData, phone: '' })}
              />
            )}

            {validationError && acceptedUnknownNumber && (
              <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
                ⚠️ Proceeding with unknown number - terms accepted
              </div>
            )}

            {acceptedSATerms && (
              <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                ✅ South African purchase terms accepted
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="relationship">Relationship</Label>
              <Input
                id="relationship"
                value={recipientData.relationship}
                onChange={(e) => onRecipientDataChange({ ...recipientData, relationship: e.target.value })}
                placeholder="e.g., Family, Friend, Colleague"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RecipientDetails;
