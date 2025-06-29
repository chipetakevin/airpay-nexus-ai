
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import StaticWhatsAppAssistant from '@/components/whatsapp/StaticWhatsAppAssistant';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import ExitToHomeButton from '@/components/ExitToHomeButton';

const WhatsAppAssistant = () => {
  const { isAuthenticated, currentUser } = useMobileAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <CardTitle className="text-2xl text-gray-900">
              Access Restricted
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Please log in to access the WhatsApp Shopping Assistant
            </p>
            <div className="space-y-2">
              <Button 
                onClick={() => window.location.href = '/portal?tab=registration'}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Login / Register
              </Button>
              <Link to="/">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <ExitToHomeButton />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <MessageCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              WhatsApp Shopping Assistant
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Welcome {currentUser?.firstName}! Your intelligent mobile commerce companion
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-green-700">
              <span>📱 Personalized Experience</span>
              <span>•</span>
              <span>🛍️ Instant Shopping</span>
              <span>•</span>
              <span>🔒 Secure Transactions</span>
            </div>
          </div>

          {/* Main Assistant Interface */}
          <Card className="shadow-2xl border-2 border-green-200">
            <CardContent className="p-0">
              <StaticWhatsAppAssistant />
            </CardContent>
          </Card>

          {/* Features */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl mb-2">⚡</div>
                <h3 className="font-semibold text-gray-800">Instant Service</h3>
                <p className="text-sm text-gray-600">Get airtime and data instantly</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl mb-2">🌍</div>
                <h3 className="font-semibold text-gray-800">All Networks</h3>
                <p className="text-sm text-gray-600">Vodacom, MTN, Cell C, Telkom</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl mb-2">🔒</div>
                <h3 className="font-semibold text-gray-800">Secure</h3>
                <p className="text-sm text-gray-600">Bank-grade security</p>
              </CardContent>
            </Card>
          </div>

          {/* Navigation */}
          <div className="mt-8 text-center">
            <Link to="/">
              <Button variant="outline" className="mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppAssistant;
