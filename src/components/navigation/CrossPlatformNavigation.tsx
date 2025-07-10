
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, CreditCard, ArrowRight, Smartphone, BarChart3 } from 'lucide-react';
import { useCrossPlatformNavigation } from '@/hooks/useCrossPlatformNavigation';
import ValidatedWhatsAppRedirect from '@/components/whatsapp/ValidatedWhatsAppRedirect';

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
    <ValidatedWhatsAppRedirect variant="floating" showBadge={false} className="mb-4" />
  );
};

export default CrossPlatformNavigation;
