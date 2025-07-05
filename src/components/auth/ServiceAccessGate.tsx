
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
    <div className="relative">
      {/* Show blurred preview of the service */}
      <div className="blur-sm pointer-events-none opacity-60">
        {children}
      </div>
      
      {/* Overlay with registration prompt */}
      <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm">
        <Card className="max-w-md mx-4 shadow-2xl border-2 border-orange-200">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Registration Required
            </h3>
            
            <p className="text-gray-600 mb-4">
              To access {serviceName}, please complete your registration first.
            </p>
            
            <div className="flex flex-col gap-3">
              <Button
                onClick={onNavigateToRegistration}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Register Now - It's Free!
              </Button>
              
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <CreditCard className="w-4 h-4" />
                <span>Quick registration • Instant access</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <Badge className="bg-green-100 text-green-800">
                ✓ Browse freely • Register to purchase
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceAccessGate;
