import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, Phone, MessageCircle, User, Clock, Receipt, Download, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { openReceiptPDFInNewTab, downloadReceiptPDF } from '@/utils/receiptPDFGenerator';

interface ReceiptData {
  transactionId: string;
  customerName: string;
  customerPhone: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  timestamp: string;
  status: string;
}

interface WhatsAppReceiptDeliveryFlowProps {
  receiptData: ReceiptData;
  onComplete: () => void;
}

const WhatsAppReceiptDeliveryFlow: React.FC<WhatsAppReceiptDeliveryFlowProps> = ({
  receiptData,
  onComplete
}) => {
  const [step, setStep] = useState<'preparing' | 'delivery-options' | 'alternate-number' | 'sending' | 'completed'>('preparing');
  const [alternateNumber, setAlternateNumber] = useState('');
  const [selectedOption, setSelectedOption] = useState<'registered' | 'alternate' | null>(null);
  const { toast } = useToast();

  // Auto-progress from preparing to delivery options
  useEffect(() => {
    if (step === 'preparing') {
      const timer = setTimeout(() => {
        setStep('delivery-options');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleRegisteredNumber = async () => {
    setSelectedOption('registered');
    setStep('sending');
    
    try {
      // Generate and open PDF receipt automatically
      await openReceiptPDFInNewTab(receiptData);
      
      // Show completion after PDF generation
      setTimeout(() => {
        setStep('completed');
        toast({
          title: "Receipt Generated! 📄",
          description: "PDF receipt opened in new tab. WhatsApp message also prepared.",
        });
      }, 1500);
    } catch (error) {
      toast({
        title: "PDF Generation Failed",
        description: "WhatsApp receipt will be sent instead.",
        variant: "destructive"
      });
      setTimeout(() => {
        setStep('completed');
      }, 1500);
    }
  };

  const handleAlternateNumber = () => {
    setSelectedOption('alternate');
    setStep('alternate-number');
  };

  const handleSendToAlternate = async () => {
    if (!alternateNumber.trim()) {
      toast({
        title: "Please enter a valid WhatsApp number",
        variant: "destructive"
      });
      return;
    }

    setStep('sending');
    
    try {
      // Generate and open PDF receipt automatically
      await openReceiptPDFInNewTab(receiptData);
      
      // Show completion after PDF generation
      setTimeout(() => {
        setStep('completed');
        toast({
          title: "Receipt Generated! 📄",
          description: "PDF receipt opened in new tab. WhatsApp message also prepared.",
        });
      }, 1500);
    } catch (error) {
      toast({
        title: "PDF Generation Failed",
        description: "WhatsApp receipt will be sent instead.",
        variant: "destructive"
      });
      setTimeout(() => {
        setStep('completed');
      }, 1500);
    }
  };

  const generateWhatsAppUrl = (phoneNumber: string) => {
    const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
    const receiptMessage = `🧾 *Divine Mobile Receipt*

*Secure Transaction Completed*
Thank you for your purchase!

*Transaction ID:* ${receiptData.transactionId}
*Customer:* ${receiptData.customerName}
*Phone:* ${receiptData.customerPhone}
*Date:* ${new Date(receiptData.timestamp).toLocaleString()}

*Items:*
${receiptData.items.map(item => `${item.name} (${item.quantity}x) - R${(item.price * item.quantity).toFixed(2)}`).join('\n')}

*Total:* R${receiptData.total.toFixed(2)}

✅ *Status:* ${receiptData.status}

Thanks for choosing Divine Mobile! 🚀`;

    return `https://wa.me/${cleanNumber.replace('+', '')}?text=${encodeURIComponent(receiptMessage)}`;
  };

  const openWhatsApp = (phoneNumber: string) => {
    const url = generateWhatsAppUrl(phoneNumber);
    window.open(url, '_blank');
  };

  if (step === 'preparing') {
    return (
      <div className="bg-white rounded-t-3xl overflow-hidden flex flex-col h-[600px] p-6">
        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
          <div className="relative">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-green-600">Payment Successful!</h2>
            <p className="text-gray-600">Preparing your receipt...</p>
          </div>

          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'delivery-options') {
    return (
      <div className="bg-white rounded-t-3xl overflow-hidden flex flex-col h-[600px] p-6">
        <div className="flex-1 flex flex-col justify-center space-y-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <MessageCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Receipt Ready!</h2>
              <p className="text-gray-600">Hi {receiptData.customerName}, your payment of R{receiptData.total} was successful.</p>
              <p className="text-gray-600 mt-2">Would you like to receive your receipt on WhatsApp?</p>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleRegisteredNumber}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl flex items-center justify-center space-x-3"
            >
              <Phone className="w-5 h-5" />
              <span>Send to my registered number</span>
              <span className="text-green-200 text-sm">({receiptData.customerPhone})</span>
            </Button>

            <Button
              onClick={handleAlternateNumber}
              variant="outline"
              className="w-full border-2 border-green-200 text-green-700 hover:bg-green-50 py-4 rounded-2xl flex items-center justify-center space-x-3"
            >
              <User className="w-5 h-5" />
              <span>Send to a different number</span>
            </Button>
          </div>

          <div className="text-center">
            <Button
              onClick={onComplete}
              variant="ghost"
              className="text-gray-500 hover:text-gray-700"
            >
              Skip for now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'alternate-number') {
    return (
      <div className="bg-white rounded-t-3xl overflow-hidden flex flex-col h-[600px] p-6">
        <div className="flex-1 flex flex-col justify-center space-y-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Phone className="w-8 h-8 text-blue-600" />
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Enter WhatsApp Number</h2>
              <p className="text-gray-600">Please enter the WhatsApp number where you want the receipt sent.</p>
            </div>
          </div>

          <div className="space-y-4">
            <Input
              type="tel"
              placeholder="+27 82 123 4567"
              value={alternateNumber}
              onChange={(e) => setAlternateNumber(e.target.value)}
              className="py-4 text-lg text-center rounded-2xl border-2 border-gray-200 focus:border-blue-500"
            />

            <Button
              onClick={handleSendToAlternate}
              disabled={!alternateNumber.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl"
            >
              Send Receipt
            </Button>
          </div>

          <div className="text-center">
            <Button
              onClick={() => setStep('delivery-options')}
              variant="ghost"
              className="text-gray-500 hover:text-gray-700"
            >
              Back to options
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'sending') {
    return (
      <div className="bg-white rounded-t-3xl overflow-hidden flex flex-col h-[600px] p-6">
        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
          <div className="relative">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <MessageCircle className="w-12 h-12 text-green-600 animate-pulse" />
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold text-gray-900">Generating PDF Receipt...</h2>
            <p className="text-gray-600">
              Creating professional receipt for {selectedOption === 'registered' ? receiptData.customerPhone : alternateNumber}
            </p>
            <p className="text-sm text-gray-500">This will open automatically in a new tab</p>
          </div>

          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'completed') {
    const finalPhoneNumber = selectedOption === 'registered' ? receiptData.customerPhone : alternateNumber;
    
    return (
      <div className="bg-white rounded-t-3xl overflow-hidden flex flex-col h-[600px] p-6">
        <div className="flex-1 flex flex-col justify-center space-y-6">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">Secure Transaction Completed</h2>
              <p className="text-gray-600">Thank you for your purchase!</p>
            </div>
          </div>

          <Card className="p-6 border-2 border-green-200 bg-green-50">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Transaction ID:</span>
                <span className="font-mono">{receiptData.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Customer:</span>
                <span>{receiptData.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Phone:</span>
                <span>{receiptData.customerPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Date:</span>
                <span>{new Date(receiptData.timestamp).toLocaleDateString()} at {new Date(receiptData.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              
              <div className="border-t border-green-300 pt-3 mt-3">
                <h4 className="font-bold mb-2">Items:</h4>
                {receiptData.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{item.name} ({item.quantity}x)</span>
                    <span>R{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-green-300 pt-3 mt-3 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span className="text-green-600">R{receiptData.total.toFixed(2)}</span>
              </div>
            </div>
          </Card>

          <div className="flex items-center justify-center space-x-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Status: Completed</span>
          </div>

          <div className="space-y-3">
            <Button
              onClick={async () => {
                try {
                  await openReceiptPDFInNewTab(receiptData);
                  toast({
                    title: "PDF Receipt Opened! 📄",
                    description: "Professional receipt opened in new tab",
                  });
                } catch (error) {
                  toast({
                    title: "Failed to open PDF",
                    description: "Please try downloading instead",
                    variant: "destructive"
                  });
                }
              }}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl flex items-center justify-center space-x-3"
            >
              <FileText className="w-5 h-5" />
              <span>View PDF Receipt</span>
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={async () => {
                  try {
                    await downloadReceiptPDF(receiptData);
                    toast({
                      title: "PDF Downloaded! 📄",
                      description: "Receipt saved to your device",
                    });
                  } catch (error) {
                    toast({
                      title: "Download failed",
                      variant: "destructive"
                    });
                  }
                }}
                variant="outline"
                className="border-2 border-green-200 text-green-700 hover:bg-green-50 py-3 rounded-2xl flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </Button>

              <Button
                onClick={() => openWhatsApp(finalPhoneNumber)}
                variant="outline"
                className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 py-3 rounded-2xl flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </Button>
            </div>

            <Button
              onClick={onComplete}
              variant="ghost"
              className="w-full text-gray-500 hover:text-gray-700 py-3"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default WhatsAppReceiptDeliveryFlow;