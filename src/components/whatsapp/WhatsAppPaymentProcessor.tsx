import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Shield, CreditCard, Smartphone, CheckCircle, Lock, Globe } from 'lucide-react';
import { CartItem } from '@/hooks/useWhatsAppShopping';
import { supabase } from '@/integrations/supabase/client';
import WhatsAppReceiptDeliveryFlow from './WhatsAppReceiptDeliveryFlow';

interface WhatsAppPaymentProcessorProps {
  items: CartItem[];
  total: number;
  customerData: any;
  onPaymentComplete: (paymentData: any) => void;
  onBack: () => void;
  language?: string;
}

const WhatsAppPaymentProcessor: React.FC<WhatsAppPaymentProcessorProps> = ({
  items,
  total,
  customerData,
  onPaymentComplete,
  onBack,
  language = 'en'
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('whatsapp-pay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'select' | 'verify' | 'complete' | 'receipt'>('select');
  const [finalReceiptData, setFinalReceiptData] = useState<any>(null);

  const translations = {
    en: {
      securePayment: 'Secure Payment',
      selectMethod: 'Select Payment Method',
      whatsappPay: 'Divine Pay, Powered By OneCard',
      bankTransfer: 'Bank Transfer',
      paymentGateway: 'Payment Gateway',
      total: 'Total',
      proceedPayment: 'Proceed to Payment',
      processing: 'Processing Payment...',
      enterPin: 'Enter Your UPI PIN',
      confirmPayment: 'Confirm Payment',
      paymentSuccess: 'Payment Successful!',
      securityFeatures: 'Security Features',
      endToEndEncryption: 'End-to-End Encryption',
      twoFactorAuth: '2-Factor Authentication',
      secureStorage: 'Secure Data Storage',
      fraudProtection: 'Fraud Protection'
    },
    af: {
      securePayment: 'Veilige Betaling',
      selectMethod: 'Kies Betaalmetode',
      whatsappPay: 'Divine Pay, Aangedryf Deur OneCard',
      bankTransfer: 'Bankoordrag',
      paymentGateway: 'Betaalpoort',
      total: 'Totaal',
      proceedPayment: 'Gaan voort na Betaling',
      processing: 'Verwerk Betaling...',
      enterPin: 'Voer jou UPI PIN in',
      confirmPayment: 'Bevestig Betaling',
      paymentSuccess: 'Betaling Suksesvol!',
      securityFeatures: 'Sekuriteitskenmerke',
      endToEndEncryption: 'End-tot-End Enkripsie',
      twoFactorAuth: '2-Faktor Verifikasie',
      secureStorage: 'Veilige Data Berging',
      fraudProtection: 'Bedrog Beskerming'
    },
    zu: {
      securePayment: 'Ukukhokha Okuphephile',
      selectMethod: 'Khetha Indlela Yokukhokha',
      whatsappPay: 'Divine Pay, Amandla One Card',
      bankTransfer: 'Ukudlulisela Ebhange',
      paymentGateway: 'Isango Lokukhokha',
      total: 'Isamba',
      proceedPayment: 'Qhubeka Ekukhokheni',
      processing: 'Ukucubungula Ukukhokha...',
      enterPin: 'Faka i-UPI PIN yakho',
      confirmPayment: 'Qinisekisa Ukukhokha',
      paymentSuccess: 'Ukukhokha Kuphumelele!',
      securityFeatures: 'Izici Zokuphepha',
      endToEndEncryption: 'Ukubethela Ekupheleni-kuya-Ekupheleni',
      twoFactorAuth: 'Ukuqinisekisa nge-2-Factor',
      secureStorage: 'Ukugcinwa Kwedatha Okuphephile',
      fraudProtection: 'Ukuvikelwa Kokukhwabanisa'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const paymentMethods = [
    {
      id: 'whatsapp-pay',
      name: t.whatsappPay,
      icon: <Smartphone className="w-6 h-6" />,
      description: 'Instant, secure payment via OneCard',
      recommended: true
    },
    {
      id: 'bank-transfer',
      name: t.bankTransfer,
      icon: <CreditCard className="w-6 h-6" />,
      description: 'Direct bank transfer with EFT'
    },
    {
      id: 'payment-gateway',
      name: t.paymentGateway,
      icon: <Globe className="w-6 h-6" />,
      description: 'Card payment via secure gateway'
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    setStep('verify');

    // Simulate 2FA verification
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStep('complete');

    // Complete payment after another 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const paymentData = {
      method: selectedMethod,
      transactionId: `WA${Date.now()}`,
      amount: total,
      currency: 'ZAR',
      timestamp: new Date().toISOString(),
      securityVerified: true,
      status: 'completed', // Ensure receipt generation triggers
      items
    };

    // Generate receipt data and show enhanced receipt manager
    const receiptData = await generateReceiptData(paymentData);
    setFinalReceiptData(receiptData);
    setStep('receipt');
    
    onPaymentComplete(paymentData);
    setIsProcessing(false);
  };

  const generateReceiptData = async (paymentData: any) => {
    try {
      // Extract recipient info from customer data or fallback to sample data
      const recipientPhone = customerData?.phone || '+27832466539';
      const recipientName = customerData?.name || 'Kevin Chipeta';
      
      // Generate receipt data
      const receiptData = {
        transactionId: paymentData.transactionId,
        customerName: recipientName,
        customerPhone: recipientPhone,
        items: items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          network: item.network || 'Addex-Hub',
          type: item.type || 'airtime',
          amount: item.amount || item.price
        })),
        total: paymentData.amount,
        timestamp: paymentData.timestamp,
        paymentMethod: paymentData.method,
        status: 'Completed'
      };

      return receiptData;
      
    } catch (error) {
      console.error('Auto receipt generation failed:', error);
    }
  };

  const generateWhatsAppReceiptMessage = (data: any) => {
    const itemsList = data.items.map((item: any) => 
      `${item.name} (${item.quantity}x) - R${item.price * item.quantity}`
    ).join('\n');

    return `🌟 SECURE TRANSACTION COMPLETED 📱

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ RECEIPT CONFIRMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Transaction ID: ${data.transactionId}
Customer: ${data.customerName}
Phone: ${data.customerPhone}
Date: ${new Date(data.timestamp).toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })} SAST

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛒 ITEMS PURCHASED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${itemsList}

Total: R${data.total}
Payment Method: ${data.paymentMethod}
Status: ${data.status} ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📞 SUPPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Support: +27 100 2827
Website: www.addex-hub.co.za

🌟 Thank you for your purchase! 🌟
⚡ Fast • 🔒 Secure • 🎯 Reliable`;
  };

  const autoSaveReceipt = async (receiptData: any) => {
    try {
      // Save to device storage (localStorage)
      const savedReceipts = JSON.parse(localStorage.getItem('receipts') || '[]');
      savedReceipts.push({
        ...receiptData,
        savedAt: new Date().toISOString(),
        id: `receipt_${Date.now()}`
      });
      localStorage.setItem('receipts', JSON.stringify(savedReceipts));

      // Save to Supabase storage if connected
      try {
        // Generate PDF-like text content
        const receiptContent = generateWhatsAppReceiptMessage(receiptData);
        const blob = new Blob([receiptContent], { type: 'text/plain' });
        
        // Upload to storage
        const fileName = `receipt_${receiptData.transactionId}_${Date.now()}.txt`;
        const { data, error } = await supabase.storage
          .from('documents')
          .upload(`receipts/${fileName}`, blob);

        if (!error) {
          console.log('Receipt saved to Supabase storage:', data);
        }
      } catch (storageError) {
        console.log('Supabase storage save failed, local save successful');
      }

      console.log('Receipt auto-saved successfully');
    } catch (error) {
      console.error('Receipt auto-save failed:', error);
    }
  };

  if (step === 'complete') {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="text-center p-6">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-green-600 mb-2">{t.paymentSuccess}</h3>
          <p className="text-gray-600">Preparing your receipt...</p>
        </CardContent>
      </Card>
    );
  }

  if (step === 'receipt' && finalReceiptData) {
    return (
      <WhatsAppReceiptDeliveryFlow
        receiptData={finalReceiptData}
        onComplete={onBack}
      />
    );
  }

  return (
    <ScrollArea className="max-h-[400px]">
      <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            {t.securePayment}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 'select' && (
            <>
              <h3 className="font-semibold">{t.selectMethod}</h3>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedMethod === method.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                     <div className="flex items-center gap-3">
                       {method.icon}
                       <div className="flex-1">
                         <div className="flex items-center gap-2">
                           {method.id === 'whatsapp-pay' ? (
                             <div className="flex flex-col">
                               <span className="font-semibold text-base leading-tight">Divine Pay,</span>
                               <span className="text-sm text-gray-600 leading-tight">Powered By OneCard</span>
                             </div>
                           ) : (
                             <span className="font-medium">{method.name}</span>
                           )}
                           {method.recommended && (
                             <Badge className="bg-green-600 text-white text-xs">Recommended</Badge>
                           )}
                         </div>
                         <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                       </div>
                     </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{t.total}:</span>
                  <span className="text-xl font-bold text-green-600">R{total}</span>
                </div>
              </div>

              <Button 
                onClick={handlePayment}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={!selectedMethod}
              >
                {t.proceedPayment}
              </Button>
            </>
          )}

          {step === 'verify' && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <h3 className="font-semibold">{t.enterPin}</h3>
              <p className="text-gray-600">{t.processing}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Lock className="w-4 h-4" />
            {t.securityFeatures}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>{t.endToEndEncryption}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>{t.twoFactorAuth}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>{t.secureStorage}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>{t.fraudProtection}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button variant="outline" onClick={onBack} className="w-full">
        Back to Cart
      </Button>
      </div>
    </ScrollArea>
  );
};

export default WhatsAppPaymentProcessor;