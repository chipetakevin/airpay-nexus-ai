
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MessageSquare, Users, FileText } from 'lucide-react';

const NotificationAnalytics = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4 text-center">
          <Mail className="w-6 h-6 mx-auto text-blue-600 mb-2" />
          <div className="text-lg font-bold text-blue-600">2,456</div>
          <div className="text-xs text-gray-600">Emails Sent</div>
        </CardContent>
      </Card>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4 text-center">
          <MessageSquare className="w-6 h-6 mx-auto text-green-600 mb-2" />
          <div className="text-lg font-bold text-green-600">1,892</div>
          <div className="text-xs text-gray-600">WhatsApp Sent</div>
        </CardContent>
      </Card>

      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-4 text-center">
          <Users className="w-6 h-6 mx-auto text-purple-600 mb-2" />
          <div className="text-lg font-bold text-purple-600">98.5%</div>
          <div className="text-xs text-gray-600">Delivery Rate</div>
        </CardContent>
      </Card>

      <Card className="bg-orange-50 border-orange-200">
        <CardContent className="p-4 text-center">
          <FileText className="w-6 h-6 mx-auto text-orange-600 mb-2" />
          <div className="text-lg font-bold text-orange-600">456</div>
          <div className="text-xs text-gray-600">Reports Generated</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationAnalytics;
