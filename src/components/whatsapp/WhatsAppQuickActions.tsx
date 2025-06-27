
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  MessageCircle, Phone, Wifi, Gift, CreditCard,
  ChevronDown, ChevronRight
} from 'lucide-react';

interface QuickAction {
  icon: React.ReactNode;
  title: string;
  description: string;
  number: string;
  action: () => void;
}

interface WhatsAppQuickActionsProps {
  showQuickActions: boolean;
  onToggleQuickActions: (show: boolean) => void;
  onTabChange: (tab: string) => void;
}

const WhatsAppQuickActions = ({ 
  showQuickActions, 
  onToggleQuickActions, 
  onTabChange 
}: WhatsAppQuickActionsProps) => {
  const quickActions: QuickAction[] = [
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: "Buy Airtime",
      description: "Instant top-ups for all networks",
      number: "1",
      action: () => onTabChange('mobile')
    },
    {
      icon: <Wifi className="w-5 h-5" />,
      title: "Purchase Data Bundles", 
      description: "High-speed internet packages",
      number: "2",
      action: () => onTabChange('mobile')
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Check Balance",
      description: "View your current balance",
      number: "3",
      action: () => onTabChange('mobile')
    },
    {
      icon: <Gift className="w-5 h-5" />,
      title: "Gift Airtime/Data",
      description: "Send to friends & family",
      number: "4",
      action: () => onTabChange('mobile')
    }
  ];

  return (
    <Collapsible open={showQuickActions} onOpenChange={onToggleQuickActions}>
      <Card>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-green-600" />
                Quick WhatsApp Actions
              </div>
              {showQuickActions ? (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-500" />
              )}
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <div 
                  key={index} 
                  onClick={action.action}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                    {action.number}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{action.title}</div>
                    <div className="text-sm text-gray-600">{action.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default WhatsAppQuickActions;
