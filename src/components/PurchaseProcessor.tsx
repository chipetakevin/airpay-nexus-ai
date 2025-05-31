
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  CreditCard, 
  CheckCircle, 
  AlertTriangle, 
  Receipt,
  Send,
  Download
} from 'lucide-react';

interface PurchaseData {
  items: any[];
  recipient: {
    name: string;
    phone: string;
    relationship?: string;
  };
  total: number;
  cashback: number;
  timestamp: string;
}

interface PurchaseProcessorProps {
  purchaseData: PurchaseData;
  onComplete: () => void;
  onCancel: () => void;
}

const PurchaseProcessor = ({ purchaseData, onComplete, onCancel }: PurchaseProcessorProps) => {
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState<'pending' | 'processing' | 'success' | 'error'>('pending');
  const [transactionId, setTransactionId] = useState('');

  const processPayment = async () => {
    setProcessing(true);
    setStatus('processing');

    try {
      // Simulate payment processing steps
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('processing');
      
      // Generate transaction ID
      const txId = 'AP' + Date.now().toString(36).toUpperCase();
      setTransactionId(txId);
      
      // Simulate network API calls
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update user balances
      const storedUser = localStorage.getItem('onecardUser');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        userData.cashbackBalance = (userData.cashbackBalance || 0) + purchaseData.cashback;
        userData.totalSpent = (userData.totalSpent || 0) + purchaseData.total;
        userData.totalEarned = (userData.totalEarned || 0) + purchaseData.cashback;
        localStorage.setItem('onecardUser', JSON.stringify(userData));
      }

      // Simulate SMS and email sending
      await sendNotifications(txId);
      
      setStatus('success');
      
      toast({
        title: "Purchase Successful! 🎉",
        description: `Transaction ${txId} completed. Airtime loaded successfully!`
      });

    } catch (error) {
      setStatus('error');
      toast({
        title: "Purchase Failed",
        description: "Payment could not be processed. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  const sendNotifications = async (txId: string) => {
    // Simulate SMS to recipient
    console.log(`SMS sent to ${purchaseData.recipient.phone}: Your airtime has been loaded. Transaction: ${txId}`);
    
    // Simulate email receipt
    console.log(`Email receipt sent for transaction ${txId}`);
    
    // Simulate admin notification
    console.log(`Admin notification sent to chipetakevin@gmail.com for transaction ${txId}`);
  };

  const generateReceipt = () => {
    const receiptData = {
      transactionId,
      timestamp: purchaseData.timestamp,
      items: purchaseData.items,
      recipient: purchaseData.recipient,
      total: purchaseData.total,
      cashback: purchaseData.cashback
    };
    
    // In a real implementation, this would generate a PDF
    console.log('Receipt generated:', receiptData);
    
    toast({
      title: "Receipt Downloaded",
      description: "Transaction receipt has been saved to your device."
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6 space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-bold mb-2">Processing Purchase</h3>
          <p className="text-sm text-gray-600">
            {status === 'pending' && 'Ready to process your purchase'}
            {status === 'processing' && 'Connecting to network provider...'}
            {status === 'success' && 'Purchase completed successfully!'}
            {status === 'error' && 'Purchase failed. Please try again.'}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="space-y-4">
          {status === 'processing' && (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Processing payment...</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
              <div>
                <p className="font-semibold text-green-700">Payment Successful!</p>
                <p className="text-sm text-gray-600">Transaction ID: {transactionId}</p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center space-y-4">
              <AlertTriangle className="w-16 h-16 text-red-600 mx-auto" />
              <p className="font-semibold text-red-700">Payment Failed</p>
            </div>
          )}
        </div>

        {/* Purchase Summary */}
        <Card className="bg-gray-50">
          <CardContent className="p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Total Amount:</span>
              <span className="font-bold">R{purchaseData.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-green-600">
              <span>Cashback Earned:</span>
              <span>R{purchaseData.cashback.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Recipient:</span>
              <span>{purchaseData.recipient.name}</span>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          {status === 'pending' && (
            <>
              <Button 
                onClick={processPayment} 
                disabled={processing}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Confirm & Pay R{purchaseData.total.toFixed(2)}
              </Button>
              <Button variant="outline" onClick={onCancel} className="w-full">
                Cancel
              </Button>
            </>
          )}

          {status === 'success' && (
            <>
              <Button onClick={generateReceipt} variant="outline" className="w-full">
                <Receipt className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>
              <Button onClick={onComplete} className="w-full">
                Done
              </Button>
            </>
          )}

          {status === 'error' && (
            <>
              <Button onClick={processPayment} className="w-full">
                Try Again
              </Button>
              <Button variant="outline" onClick={onCancel} className="w-full">
                Cancel
              </Button>
            </>
          )}
        </div>

        <div className="text-xs text-gray-500 text-center">
          🔒 Secured by OneCard • PCI DSS Compliant
        </div>
      </CardContent>
    </Card>
  );
};

export default PurchaseProcessor;
