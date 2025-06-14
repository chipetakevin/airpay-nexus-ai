
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Smartphone, Wifi } from 'lucide-react';
import { useCustomerEligibility } from '@/hooks/useCustomerEligibility';

export const EligibilityChecker = () => {
  const {
    isEligible,
    customerAirtimeBalance,
    customerDataBalance,
    eligibilityReason
  } = useCustomerEligibility();

  return (
    <Card className={`border-2 ${isEligible ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5">
            {isEligible ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-600" />
            )}
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant={isEligible ? "default" : "destructive"} className={isEligible ? "bg-green-100 text-green-800" : ""}>
                {isEligible ? "Eligible" : "Not Eligible"}
              </Badge>
            </div>
            
            <p className="text-sm text-gray-700">{eligibilityReason}</p>
            
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="flex items-center gap-2 text-xs">
                <Smartphone className="w-3 h-3" />
                <span>Airtime: R{customerAirtimeBalance.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Wifi className="w-3 h-3" />
                <span>Data: {customerDataBalance}MB</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
