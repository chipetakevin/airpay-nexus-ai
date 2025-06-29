
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Smartphone } from 'lucide-react';
import WhatsAppAssistant from '@/components/whatsapp/WhatsAppAssistant';
import WhatsAppRegistrationGuard from '@/components/whatsapp/WhatsAppRegistrationGuard';
import MobileLayout from '@/components/navigation/MobileLayout';
import { useMobileAuth } from '@/hooks/useMobileAuth';

const WhatsAppAssistantPage = () => {
  const { isAuthenticated, currentUser } = useMobileAuth();

  return (
    <MobileLayout showTopNav={true} showBottomNav={true}>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MessageCircle className="w-8 h-8 text-green-600" />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                WhatsApp Shopping Assistant
              </h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your intelligent mobile commerce companion - shop for airtime, data, and mobile services directly through WhatsApp
            </p>
            
            {isAuthenticated && currentUser && (
              <div className="mt-4 flex items-center justify-center gap-2">
                <Badge className="bg-green-600 text-white">
                  Welcome {currentUser.firstName}!
                </Badge>
                <Badge variant="outline" className="border-blue-600 text-blue-600">
                  📱 {currentUser.registeredPhone}
                </Badge>
              </div>
            )}
          </div>

          <WhatsAppRegistrationGuard showPreview={!isAuthenticated}>
            <Card className="max-w-md mx-auto shadow-2xl border-2 border-green-200 rounded-3xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Smartphone className="w-7 h-7 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-bold text-lg">
                      Devine Mobile Shopping
                    </h2>
                    <div className="flex items-center gap-2 text-sm opacity-90">
                      <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                      <span>Personalized for {currentUser?.firstName || 'You'}</span>
                    </div>
                  </div>
                  <Badge className="bg-green-800 text-green-100 px-3 py-1">
                    Full Interface
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-0">
                <WhatsAppAssistant />
              </CardContent>
            </Card>
          </WhatsAppRegistrationGuard>
        </div>
      </div>
    </MobileLayout>
  );
};

export default WhatsAppAssistantPage;
