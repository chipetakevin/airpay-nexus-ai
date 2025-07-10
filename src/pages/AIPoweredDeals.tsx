
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Crown, Shield, ArrowRight, Phone, MessageCircle, Home, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import MobileLayout from '@/components/navigation/MobileLayout';
import UniversalExitTabs from '@/components/navigation/UniversalExitTabs';
import RICARegistration from './RICARegistration';
import PortingSystem from './PortingSystem';

const AIPoweredDeals = () => {
  const [activeTab, setActiveTab] = useState('deals');

  const DealsContent = () => (
    <div className="relative z-10 px-6 py-8">
      {/* Hero Card */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 rounded-3xl mb-8">
        <CardContent className="p-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Airtime & Data
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-6">
            AI-Powered Deals
          </h2>
        </CardContent>
      </Card>

      {/* Description Card */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 rounded-3xl mb-8">
        <CardContent className="p-8 text-center">
          <p className="text-lg text-white/90 leading-relaxed">
            Best airtime and data deals with our AI-driven platform. Earn 
            OneCard rewards on every purchase and save more with 
            recommendations.
          </p>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-4">
        <Button 
          asChild
          className="w-full h-14 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold text-lg rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Link to="/portal?tab=deals">
            Get Started
            <ArrowRight className="w-5 h-5 ml-3" />
          </Link>
        </Button>

        <Button 
          asChild
          variant="outline"
          className="w-full h-14 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 font-bold text-lg rounded-2xl"
        >
          <Link to="/whatsapp-assistant">
            <Shield className="w-6 h-6 mr-3 text-green-400" />
            Secure Transactions
            <ArrowRight className="w-5 h-5 ml-3" />
          </Link>
        </Button>
      </div>

      {/* Quick Access */}
      <div className="mt-12 text-center">
        <p className="text-white/70 text-sm mb-4">Quick Access</p>
        <div className="flex justify-center gap-4">
          <Link 
            to="/portal" 
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-all"
          >
            <Crown className="w-6 h-6 text-white" />
          </Link>
          <Link 
            to="/whatsapp-assistant" 
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-all"
          >
            <Shield className="w-6 h-6 text-white" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <MobileLayout showTopNav={false} showBottomNav={false}>
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-purple-700 relative overflow-hidden pb-32">
        {/* Header */}
        <div className="flex items-center justify-between p-4 relative z-10">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <Crown className="w-7 h-7 text-blue-600" />
          </div>
          <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <div className="space-y-1">
              <div className="w-5 h-0.5 bg-white"></div>
              <div className="w-5 h-0.5 bg-white"></div>
              <div className="w-5 h-0.5 bg-white"></div>
            </div>
          </button>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full blur-2xl"></div>
          <div className="absolute top-40 right-10 w-24 h-24 bg-gradient-to-r from-pink-300 to-purple-400 rounded-full blur-xl"></div>
          <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-r from-blue-300 to-cyan-400 rounded-full blur-3xl"></div>
        </div>

        {/* Enhanced Navigation Tabs */}
        <div className="relative z-10 px-4 py-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-1">
              <TabsTrigger 
                value="deals" 
                className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-xl py-3 px-2 text-xs font-medium transition-all"
              >
                <CreditCard className="w-4 h-4 mr-1" />
                Deals
              </TabsTrigger>
              <TabsTrigger 
                value="rica" 
                className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-xl py-3 px-2 text-xs font-medium transition-all"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                RICA
              </TabsTrigger>
              <TabsTrigger 
                value="port" 
                className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-xl py-3 px-2 text-xs font-medium transition-all"
              >
                <Phone className="w-4 h-4 mr-1" />
                Port
              </TabsTrigger>
              <TabsTrigger 
                value="portal" 
                className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-xl py-3 px-2 text-xs font-medium transition-all"
              >
                <Home className="w-5 h-5 mr-1" />
                Portal
              </TabsTrigger>
            </TabsList>

            <TabsContent value="deals" className="mt-4">
              <DealsContent />
            </TabsContent>

            <TabsContent value="rica" className="mt-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 pb-32">
                <RICARegistration />
              </div>
            </TabsContent>

            <TabsContent value="port" className="mt-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 pb-32">
                <PortingSystem />
              </div>
            </TabsContent>

            <TabsContent value="portal" className="mt-4">
              <div className="relative z-10 px-6 py-8">
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 rounded-3xl mb-8">
                  <CardContent className="p-8 text-center">
                    <h1 className="text-3xl font-bold text-white mb-4">
                      Portal Access
                    </h1>
                    <p className="text-white/80 mb-6">
                      Access your complete account dashboard with all services
                    </p>
                    <Button 
                      asChild
                      className="w-full h-12 bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-bold text-lg rounded-2xl shadow-xl"
                    >
                      <Link to="/portal">
                        Open Portal
                        <ArrowRight className="w-5 h-5 ml-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Universal Exit Navigation for Deals */}
          <UniversalExitTabs 
            currentService="deals"
            variant="bottom"
            showServiceSwitcher={true}
          />
        </div>
      </div>
    </MobileLayout>
  );
};

export default AIPoweredDeals;
