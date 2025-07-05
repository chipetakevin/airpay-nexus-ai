
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
    <div className="relative min-h-screen">
      {/* Show blurred preview of the service */}
      <div className="blur-sm pointer-events-none opacity-40">
        {children}
      </div>
      
      {/* Overlay with registration prompt */}
      <div className="absolute inset-0 flex items-center justify-center bg-background/95 backdrop-blur-sm">
        <Card className="max-w-md mx-4 shadow-2xl border-2 border-primary/20">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary-foreground" />
            </div>
            
            <h3 className="text-xl font-bold text-foreground mb-2">
              Registration Required
            </h3>
            
            <p className="text-muted-foreground mb-4">
              To access {serviceName}, please complete your registration first.
            </p>
            
            <div className="flex flex-col gap-3">
              <Button
                onClick={onNavigateToRegistration}
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-medium"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Register Now - It's Free!
              </Button>
              
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <CreditCard className="w-4 h-4" />
                <span>Quick registration • Instant access</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border">
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
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
