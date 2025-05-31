
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';

interface NotificationHistoryItem {
  id: string;
  type: string;
  recipient: string;
  channel: string;
  status: string;
  timestamp: string;
  content: string;
}

interface NotificationHistoryProps {
  notifications: NotificationHistoryItem[];
}

const NotificationHistory = ({ notifications }: NotificationHistoryProps) => {
  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <Card key={notification.id} className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-semibold text-sm">{notification.type}</div>
                <div className="text-xs text-gray-600">{notification.recipient}</div>
              </div>
              <div className="flex gap-2">
                <Badge className="bg-green-100 text-green-800 text-xs">
                  {notification.status}
                </Badge>
                <span className="text-xs text-gray-500">{notification.timestamp}</span>
              </div>
            </div>
            <div className="text-sm text-gray-700 mb-2">{notification.content}</div>
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="text-xs">
                {notification.channel}
              </Badge>
              <Button size="sm" variant="ghost">
                <Share2 className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NotificationHistory;
