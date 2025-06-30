
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Info, CheckCircle } from 'lucide-react';

const CollapsibleWhatsAppRegistrationInfo = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={toggleExpanded}
        variant="outline"
        className="w-full flex items-center justify-between p-4 h-auto border-2 border-red-200 hover:border-red-300"
      >
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-red-600" />
          <span className="font-medium text-red-800">Registration Required for WhatsApp Shopping</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-red-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-red-500" />
        )}
      </Button>

      {isExpanded && (
        <div className="space-y-4 animate-fade-in">
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-6">
              <p className="text-red-700 text-sm mb-4">
                To access our intelligent WhatsApp shopping experience, you need to register first. 
                Your profile will be saved permanently for seamless future shopping.
              </p>
              
              <div className="bg-white p-4 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">✨</span>
                  <h4 className="font-semibold text-gray-900">What you'll get after registration:</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      <strong>Personalized WhatsApp greetings</strong> with your name
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      <strong>Auto-filled phone number</strong> for quick purchases
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      <strong>Direct WhatsApp integration</strong> with your registered number
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      <strong>Access to customer, vendor, or admin</strong> features
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      <strong>Seamless mobile-optimized</strong> shopping experience
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CollapsibleWhatsAppRegistrationInfo;
