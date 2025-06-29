
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Smartphone } from 'lucide-react';
import CustomerRegistration from '../registration/CustomerRegistration';

const WhatsAppRegistration = () => {
  return (
    <div className="max-w-md mx-auto space-y-4">
      <Card className="border-green-200 bg-green-50/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-green-800">
            <MessageCircle className="w-5 h-5" />
            WhatsApp Registration
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-green-600">
            <Smartphone className="w-4 h-4" />
            <span>Mobile-Optimized Experience</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-white rounded-lg p-1">
            <CustomerRegistration />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppRegistration;
