
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Smartphone, Star } from 'lucide-react';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { useSearchParams } from 'react-router-dom';
import WhatsAppAssistant from './WhatsAppAssistant';
import MobileShoppingInterface from '../mobile/MobileShoppingInterface';
import WhatsAppHeader from './WhatsAppHeader';
import WhatsAppQuickActions from './WhatsAppQuickActions';
import WhatsAppFeatures from './WhatsAppFeatures';

const WhatsAppIntegration = () => {
  const { currentUser, isAuthenticated } = useMobileAuth();
  const [activeTab, setActiveTab] = useState('assistant');
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const startShopping = searchParams.get('start-shopping');
    if (startShopping === 'true') {
      setActiveTab('mobile');
    }
  }, [searchParams]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <WhatsAppHeader 
        isAuthenticated={isAuthenticated} 
        currentUser={currentUser} 
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="assistant" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            WhatsApp AI
          </TabsTrigger>
          <TabsTrigger value="mobile" className="flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            Mobile Shopping
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            Features
          </TabsTrigger>
        </TabsList>

        <TabsContent value="assistant" className="space-y-6">
          <WhatsAppQuickActions
            showQuickActions={showQuickActions}
            onToggleQuickActions={setShowQuickActions}
            onTabChange={setActiveTab}
          />

          <Card className="max-w-md mx-auto">
            <CardContent className="p-0">
              <WhatsAppAssistant />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mobile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-blue-600" />
                Mobile Shopping Interface
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-w-md mx-auto">
                <MobileShoppingInterface />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <WhatsAppFeatures />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WhatsAppIntegration;
