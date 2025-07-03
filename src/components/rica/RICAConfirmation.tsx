import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, MessageCircle, Phone, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RICAConfirmation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto p-4 space-y-6 mt-8">
      {/* Success Message */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6 text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              Registration Submitted!
            </h2>
            <p className="text-green-700 mb-4">
              Thank you! Your SIM card registration has been successfully submitted for processing.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Status Information */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-blue-600">1</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Processing (0-24 hours)</p>
                <p className="text-sm text-gray-600">Our team will verify your documents and information</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-blue-600">2</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">SMS Confirmation</p>
                <p className="text-sm text-gray-600">You'll receive an SMS when your SIM is activated</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Ready to Use</p>
                <p className="text-sm text-gray-600">Your SIM will be fully activated and RICA compliant</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reference Information */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <h4 className="font-medium text-blue-900 mb-2">Registration Reference</h4>
          <p className="text-sm text-blue-800 mb-1">
            <strong>Reference Number:</strong> RICA-{Date.now().toString().slice(-8)}
          </p>
          <p className="text-sm text-blue-800">
            <strong>Submitted:</strong> {new Date().toLocaleDateString('en-ZA')} at {new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          onClick={() => navigate('/whatsapp-assistant')}
          className="w-full h-12 bg-green-600 hover:bg-green-700"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Continue to WhatsApp Shopping
        </Button>
        
        <Button 
          variant="outline"
          onClick={() => navigate('/portal')}
          className="w-full h-12"
        >
          <Phone className="w-4 h-4 mr-2" />
          Check Registration Status
        </Button>
        
        <Button 
          variant="ghost"
          onClick={() => navigate('/')}
          className="w-full h-12"
        >
          <Home className="w-4 h-4 mr-2" />
          Return to Home
        </Button>
      </div>

      {/* Support Information */}
      <Card className="border-gray-200">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Need help or have questions about your registration?
          </p>
          <p className="text-sm font-medium text-blue-600">
            Contact Support: support@divinemobile.co.za
          </p>
          <p className="text-sm text-gray-500">
            WhatsApp: +27 XX XXX XXXX
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RICAConfirmation;