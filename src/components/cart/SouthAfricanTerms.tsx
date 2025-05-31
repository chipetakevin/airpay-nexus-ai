
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, Check, FileText } from 'lucide-react';

interface SouthAfricanTermsProps {
  phoneNumber: string;
  recipientName: string;
  purchaseType: 'self' | 'third_party';
  dealType: string; // Added to handle both airtime and data
  onAcceptTerms: () => void;
  onCancel: () => void;
}

const SouthAfricanTerms = ({ 
  phoneNumber, 
  recipientName,
  purchaseType,
  dealType,
  onAcceptTerms, 
  onCancel 
}: SouthAfricanTermsProps) => {
  const isDataPurchase = dealType?.toLowerCase() === 'data';
  const productType = isDataPurchase ? 'Data Bundle' : 'Airtime';
  
  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-blue-800">South African {productType} Purchase Terms</h3>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-blue-300 text-blue-700">
              {phoneNumber}
            </Badge>
            <Badge variant="outline" className="border-green-300 text-green-700">
              {purchaseType === 'self' ? 'Self Purchase' : 'Third Party Purchase'}
            </Badge>
            <Badge variant="outline" className="border-purple-300 text-purple-700">
              {productType}
            </Badge>
          </div>

          <div className="bg-white p-3 rounded border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              South African Regulatory Compliance (RICA & Consumer Protection)
            </h4>
            <ul className="space-y-2 text-blue-700 text-xs">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                All {productType.toLowerCase()} purchases comply with RICA (Regulation of Interception of Communications Act)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                {purchaseType === 'self' 
                  ? 'You confirm this is your registered mobile number'
                  : `You confirm authorization to purchase ${productType.toLowerCase()} for ${recipientName || 'the recipient'}`
                }
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                All transactions are subject to South African Consumer Protection Act regulations
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                {isDataPurchase 
                  ? 'Data bundles are non-refundable once successfully loaded to the network'
                  : 'Airtime vouchers are non-refundable once successfully loaded to the network'
                }
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                Network delivery failures will be investigated and resolved within 24 hours
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                {purchaseType === 'third_party' 
                  ? 'Third-party purchases require recipient consent and valid authorization'
                  : 'Self-purchases require confirmation of number ownership'
                }
              </li>
              {isDataPurchase && (
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  Data bundle validity periods are as specified by the network provider
                </li>
              )}
            </ul>
          </div>

          <div className="bg-green-50 p-3 rounded border border-green-200">
            <p className="text-green-800 text-xs font-medium">
              ✅ By proceeding, you acknowledge compliance with South African telecommunications regulations and consumer protection laws for {productType.toLowerCase()} purchases.
            </p>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button 
            onClick={onAcceptTerms}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            size="sm"
          >
            <Check className="w-4 h-4 mr-2" />
            Accept Terms & Continue
          </Button>
          <Button 
            onClick={onCancel}
            variant="outline"
            size="sm"
            className="border-blue-300 text-blue-700 hover:bg-blue-100"
          >
            Cancel Purchase
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SouthAfricanTerms;
