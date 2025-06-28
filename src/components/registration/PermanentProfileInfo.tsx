
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Shield, CheckCircle, Info } from 'lucide-react';

interface PermanentProfileInfoProps {
  showBankingDetails?: boolean;
}

const PermanentProfileInfo = ({ showBankingDetails = false }: PermanentProfileInfoProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={toggleExpanded}
        variant="outline"
        className="w-full flex items-center justify-between p-4 h-auto bg-gradient-to-r from-blue-50 to-green-50 border-blue-200 hover:from-blue-100 hover:to-green-100"
        type="button"
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-blue-800">Permanent Profile & Banking Save</div>
            <div className="text-xs text-blue-600">Click to view encryption & storage details</div>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-blue-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-blue-600" />
        )}
      </Button>

      {isExpanded && (
        <div className="space-y-4 animate-fade-in">
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-1">Permanent Profile & Banking Save</h3>
                    <p className="text-sm text-blue-700">
                      Your complete profile, phone number, and banking information are permanently encrypted and stored for instant future payments, RICA services, and porting. No need to re-enter information.
                    </p>
                  </div>

                  {showBankingDetails && (
                    <div className="bg-white/60 p-3 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-medium text-blue-800">Sample Banking Details Format</span>
                      </div>
                      <div className="text-xs text-gray-700 space-y-1">
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>Bank: First National Bank (FNB)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>Branch: Rosebank</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>Location: Rosebank, Gauteng</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>Branch Code: 250655</span>
                        </div>
                        <div className="bg-blue-50 p-2 rounded mt-2">
                          <div className="flex items-center gap-1">
                            <Info className="w-3 h-3 text-blue-600" />
                            <span className="text-xs text-blue-700 font-medium">
                              South African banks use branch codes, not routing numbers
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PermanentProfileInfo;
