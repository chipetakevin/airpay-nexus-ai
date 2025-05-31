
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, ChevronUp, FileText, Shield } from 'lucide-react';
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

  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        onClick={() => setShowTerms(!showTerms)}
        className="w-full justify-between h-auto p-3 text-left"
      >
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-600" />
          <div>
            <div className="font-medium">Terms & Conditions</div>
            <div className="text-xs text-gray-500">South African Purchase Requirements</div>
          </div>
        </div>
        {showTerms ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </Button>

      {showTerms && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-800">Purchase Terms</h3>
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
                  <li className="flex items-start gap-2 text-orange-600">
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

            <div className="flex items-center space-x-2">
              <Checkbox
                id="acceptTerms"
                checked={hasAcceptedTerms}
                onCheckedChange={onAcceptTerms}
              />
              <label htmlFor="acceptTerms" className="text-sm text-blue-800 cursor-pointer">
                I accept the terms and conditions for this purchase
              </label>
            </div>
          </CardContent>
        </Card>
      )}

      {hasAcceptedTerms && (
        <div className="text-xs text-green-600 bg-green-50 p-2 rounded flex items-center gap-2">
          ✅ Terms accepted - Ready to purchase
        </div>
      )}
    </div>
  );
};

export default TermsSelector;
