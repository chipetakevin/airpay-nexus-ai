
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MessageCircle, Shield, User } from 'lucide-react';
import { useSessionManager } from '@/hooks/useSessionManager';

const SessionStatusIndicator = () => {
  const { sessionInfo, getRemainingTime, sendWhatsAppLogoutNotification } = useSessionManager();
  const [timeDisplay, setTimeDisplay] = useState<string>('');
  const [isExpiringSoon, setIsExpiringSoon] = useState(false);

  useEffect(() => {
    if (!sessionInfo) return;

    const updateTimeDisplay = () => {
      const remaining = getRemainingTime();
      if (!remaining) {
        setTimeDisplay('Expired');
        return;
      }

      const { hours, minutes } = remaining;
      setTimeDisplay(`${hours}h ${minutes}m`);
      
      // Mark as expiring soon if less than 30 minutes remain
      setIsExpiringSoon(remaining.totalMs < 30 * 60 * 1000);
    };

    updateTimeDisplay();
    const interval = setInterval(updateTimeDisplay, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [sessionInfo, getRemainingTime]);

  if (!sessionInfo) return null;

  return (
    <Card className={`mb-4 border-l-4 ${isExpiringSoon ? 'border-l-red-500 bg-red-50' : 'border-l-blue-500 bg-blue-50'}`}>
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Shield className={`w-4 h-4 ${isExpiringSoon ? 'text-red-600' : 'text-blue-600'}`} />
            <span className="font-semibold text-sm">24-Hour Session Active</span>
            {isExpiringSoon && (
              <Badge variant="destructive" className="text-xs px-2 py-0.5">
                Expiring Soon
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <Clock className={`w-3 h-3 ${isExpiringSoon ? 'text-red-600' : 'text-blue-600'}`} />
            <span className={`text-xs font-mono ${isExpiringSoon ? 'text-red-600' : 'text-blue-600'}`}>
              {timeDisplay}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center space-x-2">
            <User className="w-3 h-3" />
            <span>{sessionInfo.userName} ({sessionInfo.userType})</span>
          </div>
          
          <Button
            onClick={sendWhatsAppLogoutNotification}
            variant="outline"
            size="sm"
            className="h-6 px-2 text-xs"
          >
            <MessageCircle className="w-3 h-3 mr-1" />
            Test WhatsApp
          </Button>
        </div>
        
        {isExpiringSoon && (
          <div className="mt-2 p-2 bg-red-100 rounded text-xs text-red-700">
            📣 WhatsApp notification will be sent to +27832466539 when session expires
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SessionStatusIndicator;
