
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CreditCard, AlertTriangle, Phone, Mail, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminDataPoolManagerProps {
  onPoolUpdate: (amount: number) => void;
}

export const AdminDataPoolManager = ({ onPoolUpdate }: AdminDataPoolManagerProps) => {
  const [topUpAmount, setTopUpAmount] = useState(100);
  const [isProcessing, setIsProcessing] = useState(false);
  const [poolBalance, setPoolBalance] = useState(0);
  const [lowBalanceAlert, setLowBalanceAlert] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const balance = JSON.parse(localStorage.getItem('adminDataPoolBalance') || '0');
    setPoolBalance(balance);
    setLowBalanceAlert(balance < 50);
  }, []);

  const processAdminPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate card payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newBalance = poolBalance + topUpAmount;
      setPoolBalance(newBalance);
      localStorage.setItem('adminDataPoolBalance', JSON.stringify(newBalance));
      
      // Send notifications to admin
      await sendAdminNotifications(topUpAmount, newBalance);
      
      onPoolUpdate(topUpAmount);
      
      toast({
        title: "💳 Payment Successful",
        description: `R${topUpAmount} added to data pool. Notifications sent to admin.`,
      });
      
      setLowBalanceAlert(false);
      
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Unable to process payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const sendAdminNotifications = async (amount: number, newBalance: number) => {
    // Simulate WhatsApp notification
    console.log(`WhatsApp sent to Admin: Data pool topped up with R${amount}. New balance: R${newBalance}`);
    
    // Simulate Email notification
    console.log(`Email sent to chipetakevin@gmail.com: Data pool replenishment confirmation - R${amount} added`);
  };

  return (
    <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-800">
          <CreditCard className="w-5 h-5" />
          Admin Data Pool Manager
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-orange-600 font-medium">Current Pool Balance</p>
            <p className="text-2xl font-bold text-orange-800">R{poolBalance.toFixed(2)}</p>
          </div>
          {lowBalanceAlert && (
            <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-300">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Low Balance
            </Badge>
          )}
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700">Top-up Amount (R)</label>
            <Input
              type="number"
              value={topUpAmount}
              onChange={(e) => setTopUpAmount(Number(e.target.value))}
              min="10"
              step="10"
              className="mt-1"
            />
          </div>

          <Button
            onClick={processAdminPayment}
            disabled={isProcessing || topUpAmount < 10}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing Payment...
              </div>
            ) : (
              <>
                <CreditCard className="w-4 h-4 mr-2" />
                Top-up Data Pool (R{topUpAmount})
              </>
            )}
          </Button>
        </div>

        <div className="text-xs text-gray-600 bg-blue-50 p-2 rounded space-y-1">
          <div className="flex items-center gap-1">
            <Phone className="w-3 h-3" />
            <span>WhatsApp notifications sent to admin</span>
          </div>
          <div className="flex items-center gap-1">
            <Mail className="w-3 h-3" />
            <span>Email alerts to chipetakevin@gmail.com</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
