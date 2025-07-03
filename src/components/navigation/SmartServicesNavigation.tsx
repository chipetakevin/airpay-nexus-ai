import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Phone, 
  MessageCircle, 
  CreditCard, 
  Home, 
  UserPlus, 
  ArrowRight,
  Crown,
  Wifi
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import UniversalExitTabs from '@/components/navigation/UniversalExitTabs';
import RICARegistration from '@/pages/RICARegistration';
import PortingSystem from '@/pages/PortingSystem';
import CustomerRegistration from '@/components/registration/CustomerRegistration';
import VendorRegistration from '@/components/VendorRegistration';
import AdminRegistration from '@/components/AdminRegistration';

interface SmartServicesNavigationProps {
  defaultTab?: string;
  showRegistrationForms?: boolean;
  backgroundGradient?: string;
}

const SmartServicesNavigation: React.FC<SmartServicesNavigationProps> = ({
  defaultTab = 'services',
  showRegistrationForms = false,
  backgroundGradient = 'from-blue-400 via-purple-500 to-purple-700'
}) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Quick Services Content
  const ServicesContent = () => (
    <div className="space-y-6 p-4">
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 rounded-3xl">
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Smart Mobile Services
          </h2>
          <p className="text-white/80 mb-6">
            Complete mobile service suite with AI-powered deals, RICA compliance, and seamless porting
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        <Button 
          asChild
          className="h-16 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold text-lg rounded-2xl shadow-xl"
        >
          <Link to="/ai-powered-deals">
            <CreditCard className="w-6 h-6 mr-3" />
            AI-Powered Deals
            <ArrowRight className="w-5 h-5 ml-auto" />
          </Link>
        </Button>

        <Button 
          asChild
          className="h-16 bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-bold text-lg rounded-2xl shadow-xl"
        >
          <Link to="/portal">
            <Crown className="w-6 h-6 mr-3" />
            Portal Dashboard
            <ArrowRight className="w-5 h-5 ml-auto" />
          </Link>
        </Button>

        <Button 
          asChild
          className="h-16 bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white font-bold text-lg rounded-2xl shadow-xl"
        >
          <Link to="/whatsapp-assistant">
            <Wifi className="w-6 h-6 mr-3" />
            WhatsApp Assistant
            <ArrowRight className="w-5 h-5 ml-auto" />
          </Link>
        </Button>
      </div>
    </div>
  );

  // Registration Forms Content
  const RegistrationFormsContent = () => (
    <div className="space-y-6 p-4">
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 rounded-3xl">
        <CardContent className="p-6 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            Registration Hub
          </h3>
          <p className="text-white/80">
            Choose your account type and get started
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="customer" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-1">
          <TabsTrigger 
            value="customer" 
            className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-xl py-2 text-sm font-medium"
          >
            <UserPlus className="w-4 h-4 mr-1" />
            Customer
          </TabsTrigger>
          <TabsTrigger 
            value="vendor" 
            className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-xl py-2 text-sm font-medium"
          >
            <CreditCard className="w-4 h-4 mr-1" />
            Vendor
          </TabsTrigger>
          <TabsTrigger 
            value="admin" 
            className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-xl py-2 text-sm font-medium"
          >
            <Crown className="w-4 h-4 mr-1" />
            Admin
          </TabsTrigger>
        </TabsList>

        <TabsContent value="customer" className="mt-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10">
            <CustomerRegistration />
          </div>
        </TabsContent>

        <TabsContent value="vendor" className="mt-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10">
            <VendorRegistration />
          </div>
        </TabsContent>

        <TabsContent value="admin" className="mt-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10">
            <AdminRegistration />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  const getTabCount = () => {
    return showRegistrationForms ? 5 : 4;
  };

  const getGridCols = () => {
    return showRegistrationForms ? 'grid-cols-5' : 'grid-cols-4';
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient} relative overflow-hidden pb-32`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full blur-2xl"></div>
        <div className="absolute top-40 right-10 w-24 h-24 bg-gradient-to-r from-pink-300 to-purple-400 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-r from-blue-300 to-cyan-400 rounded-full blur-3xl"></div>
      </div>

      {/* Smart Navigation */}
      <div className="relative z-10 pt-6 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid w-full ${getGridCols()} bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-1 mb-6`}>
            <TabsTrigger 
              value="services" 
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-xl py-3 px-2 text-xs font-medium transition-all"
            >
              <Home className="w-4 h-4 mr-1" />
              Services
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
              value="deals" 
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-xl py-3 px-2 text-xs font-medium transition-all"
            >
              <CreditCard className="w-4 h-4 mr-1" />
              Deals
            </TabsTrigger>
            {showRegistrationForms && (
              <TabsTrigger 
                value="register" 
                className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 rounded-xl py-3 px-2 text-xs font-medium transition-all"
              >
                <UserPlus className="w-4 h-4 mr-1" />
                Register
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="services">
            <ServicesContent />
          </TabsContent>

          <TabsContent value="rica">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 pb-32">
              <RICARegistration />
            </div>
          </TabsContent>

          <TabsContent value="port">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 pb-32">
              <PortingSystem />
            </div>
          </TabsContent>

          <TabsContent value="deals">
            <div className="space-y-6 p-4">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 rounded-3xl">
                <CardContent className="p-8 text-center">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    AI-Powered Deals
                  </h2>
                  <p className="text-white/80 mb-6">
                    Best airtime and data deals with smart recommendations
                  </p>
                  <Button 
                    asChild
                    className="w-full h-12 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold text-lg rounded-2xl shadow-xl"
                  >
                    <Link to="/portal?tab=deals">
                      Access Deals Hub
                      <ArrowRight className="w-5 h-5 ml-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {showRegistrationForms && (
            <TabsContent value="register">
              <RegistrationFormsContent />
            </TabsContent>
          )}
        </Tabs>

        {/* Universal Exit Navigation */}
        <UniversalExitTabs 
          currentService="registration"
          variant="bottom"
          showServiceSwitcher={true}
        />
      </div>
    </div>
  );
};

export default SmartServicesNavigation;