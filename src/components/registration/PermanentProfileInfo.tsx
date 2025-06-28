
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Shield, CheckCircle, Info, Smartphone } from 'lucide-react';

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
        className="w-full flex items-center justify-between p-3 sm:p-4 h-auto bg-gradient-to-r from-blue-50 to-green-50 border-blue-200 hover:from-blue-100 hover:to-green-100 transition-all duration-300"
        type="button"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-blue-800 text-sm sm:text-base">
              Permanent Profile & Banking Save
            </div>
            <div className="text-xs text-blue-600">
              Click to view encryption & storage details
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-blue-600 sm:hidden" />
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          ) : (
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          )}
        </div>
      </Button>

      {isExpanded && (
        <div className="space-y-4 animate-fade-in">
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-1 text-sm sm:text-base">
                      Permanent Profile & Banking Save
                    </h3>
                    <p className="text-xs sm:text-sm text-blue-700">
                      Your complete profile, phone number, and banking information are permanently encrypted and stored for instant future payments, RICA services, and porting. No need to re-enter information.
                    </p>
                  </div>

                  {/* Mobile-optimized benefits */}
                  <div className="bg-white/60 p-2 sm:p-3 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                      <span className="text-xs sm:text-sm font-medium text-blue-800">
                        Key Benefits
                      </span>
                    </div>
                    <div className="text-xs text-gray-700 space-y-1">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                        <span>Instant future transactions</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                        <span>WhatsApp & mobile compatibility</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                        <span>Bank-grade encryption</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                        <span>Cross-device synchronization</span>
                      </div>
                    </div>
                  </div>

                  {showBankingDetails && (
                    <div className="bg-white/60 p-2 sm:p-3 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                        <span className="text-xs sm:text-sm font-medium text-blue-800">
                          Sample Banking Details Format
                        </span>
                      </div>
                      <div className="text-xs text-gray-700 space-y-1">
                        <div className="flex justify-between items-center">
                          <span>Bank:</span>
                          <span className="text-green-600 font-medium">First National Bank (FNB)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Branch:</span>  
                          <span className="text-green-600 font-medium">Rosebank</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Location:</span>
                          <span className="text-green-600 font-medium">Rosebank, Gauteng</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Branch Code:</span>
                          <span className="text-green-600 font-medium">250655</span>
                        </div>
                        <div className="bg-blue-50 p-2 rounded mt-2">
                          <div className="flex items-center gap-1">
                            <Info className="w-3 h-3 text-blue-600 flex-shrink-0" />
                            <span className="text-xs text-blue-700 font-medium">
                              South African banks use branch codes, not routing numbers
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mobile-specific notice */}
                  <div className="bg-green-50 p-2 sm:p-3 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Smartphone className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                      <span className="text-xs sm:text-sm font-medium text-green-800">
                        Mobile & WhatsApp Optimized
                      </span>
                    </div>
                    <p className="text-xs text-green-700">
                      Your saved profile works seamlessly across all devices, including mobile phones and WhatsApp integration for instant service access.
                    </p>
                  </div>
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
