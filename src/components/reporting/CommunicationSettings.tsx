
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquare } from 'lucide-react';

interface CommunicationSettingsProps {
  emailEnabled: boolean;
  whatsappEnabled: boolean;
  smsEnabled: boolean;
  onEmailToggle: (enabled: boolean) => void;
  onWhatsappToggle: (enabled: boolean) => void;
  onSmsToggle: (enabled: boolean) => void;
  onTestNotification: (channel: string) => void;
}

const CommunicationSettings = ({
  emailEnabled,
  whatsappEnabled,
  smsEnabled,
  onEmailToggle,
  onWhatsappToggle,
  onSmsToggle,
  onTestNotification
}: CommunicationSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Communication Channels</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-600" />
            <span className="text-sm">Email Notifications</span>
          </div>
          <Switch 
            checked={emailEnabled} 
            onCheckedChange={onEmailToggle}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-green-600" />
            <span className="text-sm">WhatsApp Messages</span>
          </div>
          <Switch 
            checked={whatsappEnabled} 
            onCheckedChange={onWhatsappToggle}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-purple-600" />
            <span className="text-sm">SMS Notifications</span>
          </div>
          <Switch 
            checked={smsEnabled} 
            onCheckedChange={onSmsToggle}
          />
        </div>

        <div className="pt-2 space-y-2">
          <Button size="sm" variant="outline" onClick={() => onTestNotification('Email')}>
            Test Email
          </Button>
          <Button size="sm" variant="outline" onClick={() => onTestNotification('WhatsApp')}>
            Test WhatsApp
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunicationSettings;
