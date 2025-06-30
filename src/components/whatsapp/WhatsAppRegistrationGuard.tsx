
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, UserPlus, MessageCircle, AlertTriangle } from 'lucide-react';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { useNavigate } from 'react-router-dom';
import CollapsibleWhatsAppRegistrationInfo from './CollapsibleWhatsAppRegistrationInfo';

interface WhatsAppRegistrationGuardProps {
  children: React.ReactNode;
  showPreview?: boolean;
}

const WhatsAppRegistrationGuard = ({ 
  children, 
  showPreview = true 
}: WhatsAppRegistrationGuardProps) => {
  const { isAuthenticated, currentUser } = useMobileAuth();
  const navigate = useNavigate();

  if (isAuthenticated && currentUser) {
    return <>{children}</>;
  }

  return (
    <div className="max-w-md mx-auto">
      {showPreview && (
        <Card className="mb-6 border-blue-200 bg-blue-50/30">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <MessageCircle className="w-16 h-16 mx-auto mb-3 text-blue-600" />
              <h3 className="text-lg font-bold text-blue-800 mb-2">
                WhatsApp Shopping Preview
              </h3>
              <p className="text-blue-700 text-sm">
                This is how your personalized WhatsApp shopping experience will look once registered
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Devine Mobile Assistant</h4>
                  <p className="text-xs text-gray-600">Online • Ready to help</p>
                </div>
                <Badge className="bg-green-600 text-white text-xs">AI</Badge>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-sm text-gray-700 mb-2">
                  👋 Welcome <strong>[Your Name]</strong>!
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  📱 Phone: <strong>[Your Number]</strong>
                </p>
                <p className="text-sm text-gray-600">
                  Ready to help you with airtime & data! What can I do for you today?
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Collapsible Registration Information */}
      <CollapsibleWhatsAppRegistrationInfo />
      
      <Card className="mt-4 border-red-200 bg-red-50">
        <CardContent className="p-6 text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => navigate('/portal?tab=registration')}
              className="w-full bg-red-600 hover:bg-red-700 h-12 text-base font-semibold"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Register Now for WhatsApp Shopping
            </Button>
            
            <p className="text-xs text-red-600 flex items-center justify-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Your profile information is permanently saved for convenience
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppRegistrationGuard;
