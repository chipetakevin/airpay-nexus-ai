
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, BarChart3, X, ArrowLeftRight } from 'lucide-react';
import { useCrossPlatformNavigation } from '@/hooks/useCrossPlatformNavigation';

interface FloatingPlatformSwitcherProps {
  currentPlatform: 'whatsapp' | 'portal';
}

const FloatingPlatformSwitcher: React.FC<FloatingPlatformSwitcherProps> = ({ currentPlatform }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { navigateToWhatsAppAssistant, navigateToPortalDeals } = useCrossPlatformNavigation();

  if (!isExpanded) {
    return (
      <div className="fixed bottom-20 right-4 z-50">
        <Button
          onClick={() => setIsExpanded(true)}
          className="rounded-full w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg"
          size="icon"
        >
          <ArrowLeftRight className="w-5 h-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <Card className="w-64 shadow-2xl border-2 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm text-gray-800">Switch Platform</h3>
            <Button
              onClick={() => setIsExpanded(false)}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            {currentPlatform === 'portal' ? (
              <Button
                onClick={() => {
                  navigateToWhatsAppAssistant();
                  setIsExpanded(false);
                }}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                size="sm"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Assistant
              </Button>
            ) : (
              <Button
                onClick={() => {
                  navigateToPortalDeals();
                  setIsExpanded(false);
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                size="sm"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Portal Deals
              </Button>
            )}
          </div>
          
          <div className="mt-3 text-xs text-gray-500 text-center">
            {currentPlatform === 'portal' 
              ? 'Switch to chat-based shopping' 
              : 'Switch to comprehensive deals view'
            }
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FloatingPlatformSwitcher;
