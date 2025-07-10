
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Smartphone } from 'lucide-react';
import WhatsAppAssistant from '@/components/whatsapp/WhatsAppAssistant';
import WhatsAppRegistrationGuard from '@/components/whatsapp/WhatsAppRegistrationGuard';
import MobileLayout from '@/components/navigation/MobileLayout';
import CrossPlatformNavigation from '@/components/navigation/CrossPlatformNavigation';
import FloatingPlatformSwitcher from '@/components/navigation/FloatingPlatformSwitcher';
import { useMobileAuth } from '@/hooks/useMobileAuth';

const WhatsAppAssistantPage = () => {
  const { isAuthenticated, currentUser } = useMobileAuth();

  return (
    <MobileLayout showTopNav={true} showBottomNav={true}>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 pb-4">
        <div className="container mx-auto px-4 py-4">
          {/* Cross-Platform Navigation */}
          <CrossPlatformNavigation currentPlatform="whatsapp" />
          
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <MessageCircle className="w-8 h-8 text-green-600" />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                WhatsApp Shopping Assistant
              </h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm">
              Your intelligent mobile commerce companion - shop for airtime, data, and mobile services directly through WhatsApp
            </p>
            
            {isAuthenticated && currentUser && (
              <div className="mt-3 flex items-center justify-center gap-2">
                <Badge className="bg-green-600 text-white text-xs">
                  Welcome {currentUser.firstName}!
                </Badge>
                <Badge variant="outline" className="border-blue-600 text-blue-600 text-xs">
                  📱 {currentUser.registeredPhone}
                </Badge>
              </div>
            )}
          </div>

          <WhatsAppRegistrationGuard showPreview={!isAuthenticated}>
            <Card className="max-w-md mx-auto shadow-2xl border-2 border-green-200 rounded-3xl overflow-hidden mb-6">
              <CardContent className="p-0">
                <WhatsAppAssistant />
              </CardContent>
            </Card>
          </WhatsAppRegistrationGuard>
        </div>
        
        {/* Add Floating Platform Switcher */}
        <FloatingPlatformSwitcher currentPlatform="whatsapp" />
      </div>
    </MobileLayout>
  );
};

export default WhatsAppAssistantPage;
