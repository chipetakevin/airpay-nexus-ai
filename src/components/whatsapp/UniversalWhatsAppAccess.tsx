
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Phone, User } from 'lucide-react';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { useToast } from '@/hooks/use-toast';

const UniversalWhatsAppAccess = () => {
  const { isAuthenticated, currentUser } = useMobileAuth();
  const { toast } = useToast();

  const handleWhatsAppAccess = () => {
    if (!isAuthenticated || !currentUser) {
      toast({
        title: "Login Required",
        description: "Please log in to access WhatsApp Shopping Assistant.",
        variant: "destructive",
      });
      // Redirect to login/registration
      window.location.href = '/portal?tab=registration';
      return;
    }

    // Redirect to WhatsApp Assistant interface
    window.location.href = '/whatsapp-assistant';
  };

  const handleDirectWhatsApp = () => {
    if (!isAuthenticated || !currentUser) {
      toast({
        title: "Login Required",
        description: "Please log in to access WhatsApp services.",
        variant: "destructive",
      });
      return;
    }

    const phoneNumber = "27832466539";
    const userName = `${currentUser.firstName || ''} ${currentUser.lastName || ''}`.trim();
    const userPhone = currentUser.registeredPhone || currentUser.phone || '';
    
    const message = encodeURIComponent(
      `👋 Hi Devine Mobile!\n\n` +
      `I'm ${userName}\n` +
      `Phone: ${userPhone}\n\n` +
      `I'd like to access the WhatsApp Shopping Assistant for airtime and data services.\n\n` +
      `Please help me get started! 🛍️`
    );

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Redirecting to WhatsApp",
      description: `Opening WhatsApp for ${userName}...`,
      duration: 2000,
    });
  };

  if (!isAuthenticated) {
    return (
      <Card className="border-gray-200 bg-gray-50/30">
        <CardContent className="p-6 text-center">
          <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            WhatsApp Shopping Assistant
          </h3>
          <p className="text-gray-600 mb-4">
            Please log in to access your personalized shopping experience
          </p>
          <Button 
            onClick={() => window.location.href = '/portal?tab=registration'}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <User className="w-4 h-4 mr-2" />
            Login / Register
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-green-200 bg-green-50/30">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-green-800">
            WhatsApp Shopping Assistant
          </h3>
          <p className="text-sm text-green-700">
            Welcome {currentUser.firstName}! Your intelligent mobile commerce companion
          </p>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={handleWhatsAppAccess}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Access Full Interface
          </Button>
          
          <Button 
            onClick={handleDirectWhatsApp}
            variant="outline"
            className="w-full border-green-300 text-green-700 hover:bg-green-50 py-3"
          >
            <Phone className="w-5 h-5 mr-2" />
            Direct WhatsApp Chat
          </Button>
        </div>

        <div className="mt-4 text-xs text-green-600 text-center">
          ✓ Personalized for {currentUser.firstName}
          <br />
          🛍️ Shop for airtime, data, and mobile services
        </div>
      </CardContent>
    </Card>
  );
};

export default UniversalWhatsAppAccess;
