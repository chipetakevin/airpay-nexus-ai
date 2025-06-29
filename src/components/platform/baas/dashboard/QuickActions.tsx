
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Brain, Network, MessageSquare, Users } from 'lucide-react';

interface QuickActionsProps {
  onTabChange?: (value: string) => void;
}

const QuickActions = ({ onTabChange }: QuickActionsProps) => {
  const handleTabClick = (tabValue: string) => {
    if (onTabChange) {
      onTabChange(tabValue);
    }
  };

  return (
    <Card className="shadow-xl border-0">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardTitle className="flex items-center gap-3 text-xl">
          <Settings className="w-6 h-6 text-purple-600" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <Button 
            onClick={() => handleTabClick('agentic-ai')}
            className="w-full text-left p-4 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 text-purple-700 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 border-0 justify-start h-auto"
            variant="ghost"
          >
            <Brain className="w-5 h-5 inline mr-3" />
            <span className="font-semibold">Agentic AI Hub</span>
          </Button>
          <Button 
            onClick={() => handleTabClick('data-mesh')}
            className="w-full text-left p-4 bg-gradient-to-r from-cyan-50 to-cyan-100 hover:from-cyan-100 hover:to-cyan-200 text-cyan-700 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 border-0 justify-start h-auto"
            variant="ghost"
          >
            <Network className="w-5 h-5 inline mr-3" />
            <span className="font-semibold">Data Mesh</span>
          </Button>
          <Button 
            onClick={() => handleTabClick('whatsapp-business')}
            className="w-full text-left p-4 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 text-green-700 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 border-0 justify-start h-auto"
            variant="ghost"
          >
            <MessageSquare className="w-5 h-5 inline mr-3" />
            <span className="font-semibold">WhatsApp Business</span>
          </Button>
          <Button 
            onClick={() => handleTabClick('cdp')}
            className="w-full text-left p-4 bg-gradient-to-r from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200 text-pink-700 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 border-0 justify-start h-auto"
            variant="ghost"
          >
            <Users className="w-5 h-5 inline mr-3" />
            <span className="font-semibold">Customer CDP</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
