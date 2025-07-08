
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, Send, CheckCircle, Clock, AlertTriangle, 
  Hash, MessageSquare, ArrowRight, Smartphone
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface USSDPaymentProps {
  deal: {
    id: string;
    network: string;
    amount: number;
    price: number;
    type: 'airtime' | 'data';
  };
  recipientPhone: string;
  onPaymentComplete: (success: boolean, sessionId: string) => void;
}

const USSDPaymentProcessor = ({ deal, recipientPhone, onPaymentComplete }: USSDPaymentProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [ussdCode, setUssdCode] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success' | 'failed'>('pending');

  useEffect(() => {
    // Generate USSD code based on deal network
    const generateUSSDCode = () => {
      const codes = {
        mtn: '*141#',
        vodacom: '*136#',
        'divine mobile': '*180*2827#',
        telkom: '*180#'
      };
      return codes[deal.network.toLowerCase() as keyof typeof codes] || '*100#';
    };

    setUssdCode(generateUSSDCode());
    setSessionId(`DM${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`);
  }, [deal.network]);

  const startUSSDPayment = async () => {
    setCurrentStep(2);
    setPaymentStatus('processing');
    
    toast({
      title: "USSD Payment Initiated",
      description: `Dial ${ussdCode} on your phone to complete payment`,
    });

    // Simulate USSD payment processing
    setTimeout(() => {
      setCurrentStep(3);
      setPaymentStatus('success');
      onPaymentComplete(true, sessionId);
      
      toast({
        title: "Payment Successful! 🎉",
        description: "Your airtime/data has been delivered instantly",
      });
    }, 15000); // 15 seconds simulation
  };

  const steps = [
    {
      number: 1,
      title: "Confirm Purchase",
      description: "Review your order details",
      icon: <CheckCircle className="w-5 h-5" />
    },
    {
      number: 2,
      title: "USSD Payment",
      description: "Dial the USSD code on your phone",
      icon: <Phone className="w-5 h-5" />
    },
    {
      number: 3,
      title: "Payment Complete",
      description: "Receive confirmation and receipt",
      icon: <MessageSquare className="w-5 h-5" />
    }
  ];

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-6">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              currentStep >= step.number 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 text-gray-500'
            }`}>
              {currentStep > step.number ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                step.icon
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-1 mx-2 ${
                currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {currentStep === 1 && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-center text-blue-800">Confirm Your Purchase</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Product:</span>
                <Badge className="bg-blue-100 text-blue-800">
                  {deal.type === 'airtime' ? '📞' : '📊'} {deal.network} {deal.type}
                </Badge>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Amount:</span>
                <span className="text-lg font-bold">R{deal.amount}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Price:</span>
                <span className="text-lg font-bold text-green-600">R{deal.price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Recipient:</span>
                <span className="font-medium">{recipientPhone}</span>
              </div>
            </div>
            
            <Button 
              onClick={startUSSDPayment}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12"
            >
              <Phone className="w-5 h-5 mr-2" />
              Start USSD Payment
            </Button>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card className="border-2 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-center text-orange-800 flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 animate-spin" />
              Processing Payment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-6xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2">Dial USSD Code Now</h3>
              <div className="bg-white p-4 rounded-lg border-2 border-orange-200 mb-4">
                <div className="text-3xl font-bold text-orange-600 mb-2">{ussdCode}</div>
                <p className="text-sm text-gray-600">Dial this code on your {deal.network} line</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Hash className="w-4 h-4" />
                USSD Steps:
              </h4>
              <ol className="text-sm space-y-1 text-gray-700">
                <li>1. Dial {ussdCode} on your phone</li>
                <li>2. Select "Airtime & Data"</li>
                <li>3. Choose "Buy for Others"</li>
                <li>4. Enter: {recipientPhone}</li>
                <li>5. Select R{deal.amount} {deal.type}</li>
                <li>6. Enter your PIN to confirm</li>
              </ol>
            </div>

            <div className="text-center">
              <Badge className="bg-orange-100 text-orange-800">
                Session ID: {sessionId}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 3 && paymentStatus === 'success' && (
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-center text-green-800 flex items-center justify-center gap-2">
              <CheckCircle className="w-6 h-6" />
              Payment Successful!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-bold mb-2">Transaction Complete</h3>
            <p className="text-gray-700 mb-4">
              Your {deal.type} has been delivered to {recipientPhone}
            </p>
            
            <div className="bg-white p-4 rounded-lg border space-y-2">
              <div className="flex justify-between">
                <span>Session ID:</span>
                <span className="font-mono text-sm">{sessionId}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-bold">R{deal.amount}</span>
              </div>
              <div className="flex justify-between">
                <span>Network:</span>
                <span className="font-medium">{deal.network}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Badge className="bg-green-100 text-green-800 text-sm px-3 py-1">
                📧 Email receipt sent
              </Badge>
              <Badge className="bg-green-100 text-green-800 text-sm px-3 py-1">
                💬 WhatsApp receipt sent
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default USSDPaymentProcessor;
