
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle } from 'lucide-react';

const RecentConversations = () => {
  const recentConversations = [
    {
      id: 'WA001',
      customer: '+27821234567',
      service: 'Data Bundle Purchase',
      amount: 'R49',
      status: 'completed',
      timestamp: '2 mins ago'
    },
    {
      id: 'WA002',
      customer: '+27827654321',
      service: 'Airtime Top-up',
      amount: 'R100',
      status: 'processing',
      timestamp: '5 mins ago'
    },
    {
      id: 'WA003',
      customer: '+27834567890',
      service: 'Balance Inquiry',
      amount: 'Free',
      status: 'completed',
      timestamp: '8 mins ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Recent Conversations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentConversations.map((conversation) => (
            <div key={conversation.id} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{conversation.customer}</span>
                <Badge className={getStatusColor(conversation.status)}>
                  {conversation.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>{conversation.service}</span>
                <span className="font-medium">{conversation.amount}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{conversation.timestamp}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentConversations;
