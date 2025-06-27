
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { AuthUser } from '@/hooks/useMobileAuth';

interface WhatsAppHeaderProps {
  isAuthenticated: boolean;
  currentUser: AuthUser | null;
}

const WhatsAppHeader = ({ isAuthenticated, currentUser }: WhatsAppHeaderProps) => {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
        WhatsApp Shopping Experience
      </h1>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Experience seamless mobile commerce with our AI-powered WhatsApp assistant and mobile-optimized shopping platform
      </p>

      {isAuthenticated && currentUser && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-4">
              <Badge className="bg-green-600 text-white">
                <CheckCircle className="w-3 h-3 mr-1" />
                VIP Customer
              </Badge>
              <span className="font-medium text-green-800">
                Welcome back, {currentUser.firstName}!
              </span>
              <Badge className="bg-blue-600 text-white">
                OneCard: ****{currentUser.cardNumber?.slice(-4)}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WhatsAppHeader;
