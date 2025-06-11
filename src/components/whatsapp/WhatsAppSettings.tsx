
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, CheckCircle, Activity, Shield
} from 'lucide-react';

const WhatsAppSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          WhatsApp Business Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">Business Account Settings</h4>
          <div className="p-3 bg-gray-50 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Business Number:</span>
              <span className="text-sm font-medium">+27 11 123 4567</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Verification Status:</span>
              <Badge className="bg-green-100 text-green-800">Verified</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">API Status:</span>
              <Badge className="bg-green-100 text-green-800">Connected</Badge>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Business Tools</h4>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <CheckCircle className="w-4 h-4 mr-2" />
              Auto-replies: Enabled
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Activity className="w-4 h-4 mr-2" />
              Transaction Confirmations: Enabled
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Shield className="w-4 h-4 mr-2" />
              Payment Security: Enhanced
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WhatsAppSettings;
