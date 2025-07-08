
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, UserPlus, CreditCard } from 'lucide-react';

interface ServiceAccessGateProps {
  children: React.ReactNode;
  serviceName: string;
  onNavigateToRegistration: () => void;
  isAuthenticated: boolean;
}

const ServiceAccessGate: React.FC<ServiceAccessGateProps> = ({
  children,
  serviceName,
  onNavigateToRegistration,
  isAuthenticated
}) => {
  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex items-center justify-center py-8">
      {/* Registration prompt - no overlay, direct display */}
        <Card className="w-full max-w-sm shadow-2xl border-2 border-orange-200">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6 text-white" />
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Registration Required
            </h3>
            
            <p className="text-gray-600 text-sm mb-3">
              To access {serviceName}, please complete your registration first.
            </p>
            
            <div className="space-y-3">
              <Button
                onClick={onNavigateToRegistration}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium h-10"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Register Now - It's Free!
              </Button>
              
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <CreditCard className="w-3 h-3" />
                <span>Quick registration • Instant access</span>
              </div>
              
              <Badge className="bg-green-100 text-green-800 text-xs">
                ✓ Browse freely • Register to purchase
              </Badge>
            </div>
          </CardContent>
        </Card>
    </div>
  );
};

export default ServiceAccessGate;
