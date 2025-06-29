
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Smartphone, Star, UserPlus } from 'lucide-react';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { useSearchParams } from 'react-router-dom';
import WhatsAppAssistant from './WhatsAppAssistant';
import MobileShoppingInterface from '../mobile/MobileShoppingInterface';
import WhatsAppHeader from './WhatsAppHeader';
import WhatsAppQuickActions from './WhatsAppQuickActions';
import WhatsAppFeatures from './WhatsAppFeatures';
import WhatsAppRegistration from './WhatsAppRegistration';

const WhatsAppIntegration = () => {
  const { currentUser, isAuthenticated } = useMobileAuth();
  const [activeTab, setActiveTab] = useState('assistant');
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const startShopping = searchParams.get('start-shopping');
    const register = searchParams.get('register');
    
    if (startShopping === 'true') {
      setActiveTab('mobile');
    } else if (register === 'true') {
      setActiveTab('registration');
    }
  }, [searchParams]);

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 p-2 sm:p-4">
      <WhatsAppHeader 
        isAuthenticated={isAuthenticated} 
        currentUser={currentUser} 
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto p-1">
          <TabsTrigger value="assistant" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-2">
            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">WhatsApp AI</span>
            <span className="sm:hidden">AI</span>
          </TabsTrigger>
          <TabsTrigger value="registration" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-2">
            <UserPlus className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Register</span>
            <span className="sm:hidden">Sign Up</span>
          </TabsTrigger>
          <TabsTrigger value="mobile" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-2">
            <Smartphone className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Shopping</span>
            <span className="sm:hidden">Shop</span>
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-2">
            <Star className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Features</span>
            <span className="sm:hidden">Info</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="assistant" className="space-y-4 sm:space-y-6 mt-4">
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

        <TabsContent value="registration" className="space-y-4 sm:space-y-6 mt-4">
          <div className="max-w-md mx-auto">
            <WhatsAppRegistration />
          </div>
        </TabsContent>

        <TabsContent value="mobile" className="space-y-4 sm:space-y-6 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
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

        <TabsContent value="features" className="space-y-4 sm:space-y-6 mt-4">
          <WhatsAppFeatures />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WhatsAppIntegration;
