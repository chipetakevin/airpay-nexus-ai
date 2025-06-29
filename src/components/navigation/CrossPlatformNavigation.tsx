
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, CreditCard, ArrowRight, Smartphone, BarChart3 } from 'lucide-react';
import { useCrossPlatformNavigation } from '@/hooks/useCrossPlatformNavigation';

interface CrossPlatformNavigationProps {
  currentPlatform: 'whatsapp' | 'portal';
  showFullOptions?: boolean;
}

const CrossPlatformNavigation: React.FC<CrossPlatformNavigationProps> = ({ 
  currentPlatform, 
  showFullOptions = true 
}) => {
  const { 
    navigateToWhatsAppAssistant, 
    navigateToPortalDeals, 
    navigateToPortalDashboard,
    isAuthenticated,
    currentUser 
  } = useCrossPlatformNavigation();

  if (currentPlatform === 'whatsapp') {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border border-blue-200 mb-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">
              Need More Options?
            </span>
          </div>
          <Button
            onClick={navigateToPortalDeals}
            variant="outline"
            size="sm"
            className="bg-white hover:bg-blue-50 border-blue-300 text-blue-700 font-medium"
          >
            <CreditCard className="w-4 h-4 mr-1" />
            Portal Deals
            <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
        {showFullOptions && (
          <div className="mt-2 text-xs text-blue-600">
            Access comprehensive deals dashboard, advanced filters, and detailed analytics
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200 mb-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">
            Quick Shopping?
          </span>
        </div>
        <Button
          onClick={navigateToWhatsAppAssistant}
          variant="outline"
          size="sm"
          className="bg-white hover:bg-green-50 border-green-300 text-green-700 font-medium"
        >
          <Smartphone className="w-4 h-4 mr-1" />
          WhatsApp Chat
          <ArrowRight className="w-3 h-3 ml-1" />
        </Button>
      </div>
      {showFullOptions && isAuthenticated && currentUser && (
        <div className="mt-2 flex items-center gap-2">
          <Badge className="bg-green-600 text-white text-xs">
            Welcome {currentUser.firstName}!
          </Badge>
          <span className="text-xs text-green-600">
            Chat-based shopping experience ready
          </span>
        </div>
      )}
    </div>
  );
};

export default CrossPlatformNavigation;
