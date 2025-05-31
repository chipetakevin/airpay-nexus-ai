
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, Check } from 'lucide-react';

interface UnknownNumberTermsProps {
  phoneNumber: string;
  detectedNetwork: string;
  onAcceptTerms: () => void;
  onCancel: () => void;
}

const UnknownNumberTerms = ({ 
  phoneNumber, 
  detectedNetwork, 
  onAcceptTerms, 
  onCancel 
}: UnknownNumberTermsProps) => {
  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-600" />
          <h3 className="font-semibold text-orange-800">Unknown/Unverified Number</h3>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-orange-300 text-orange-700">
              {phoneNumber}
            </Badge>
            {detectedNetwork && detectedNetwork !== 'Unknown' && (
              <Badge variant="outline" className="border-blue-300 text-blue-700">
                Detected: {detectedNetwork}
              </Badge>
            )}
          </div>

          <div className="bg-white p-3 rounded border border-orange-200">
            <h4 className="font-medium text-orange-800 mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Terms & Conditions for Unknown Numbers
            </h4>
            <ul className="space-y-2 text-orange-700 text-xs">
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                This number may be ported, unregistered, or not RICA compliant
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                Airtime/data delivery may fail without refund if number is invalid
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                Customer accepts full liability for incorrect network selection
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                Network mismatches may result in failed transactions
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-0.5">•</span>
                OneCard cashback rewards still apply on successful transactions
              </li>
            </ul>
          </div>

          <div className="bg-green-50 p-3 rounded border border-green-200">
            <p className="text-green-800 text-xs font-medium">
              ✅ By proceeding, you acknowledge and accept all risks associated with purchasing for an unknown/unverified number.
            </p>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button 
            onClick={onAcceptTerms}
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
            size="sm"
          >
            <Check className="w-4 h-4 mr-2" />
            Accept & Continue Shopping
          </Button>
          <Button 
            onClick={onCancel}
            variant="outline"
            size="sm"
            className="border-orange-300 text-orange-700 hover:bg-orange-100"
          >
            Cancel & Change Number
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnknownNumberTerms;
