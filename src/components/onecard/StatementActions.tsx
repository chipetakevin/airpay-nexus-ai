
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Download, Mail, MessageCircle, Send } from 'lucide-react';

interface Transaction {
  customer_id: string;
  vendor_id: string;
  deal_id: string;
  recipient_phone: string;
  recipient_name: string;
  recipient_relationship: string | null;
  amount: number;
  original_price: number;
  discounted_price: number;
  network: string;
  transaction_type: string;
  cashback_earned: number;
  admin_fee: number;
  vendor_commission: number;
  status: string;
  timestamp: string;
}

interface StatementActionsProps {
  transaction: Transaction;
}

export const StatementActions = ({ transaction }: StatementActionsProps) => {
  const { toast } = useToast();
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isWhatsAppDialogOpen, setIsWhatsAppDialogOpen] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isSending, setIsSending] = useState(false);

  const generateTransactionId = (timestamp: string) => {
    return 'AP' + timestamp.replace(/[^0-9]/g, '').slice(-8);
  };

  const sendEmailStatement = async () => {
    if (!emailAddress) {
      toast({
        title: "Email Required",
        description: "Please enter an email address",
        variant: "destructive"
      });
      return;
    }

    setIsSending(true);
    
    try {
      // Get customer details from localStorage
      const credentials = localStorage.getItem('userCredentials');
      let customerName = 'Valued Customer';
      let customerPhone = '';
      
      if (credentials) {
        const parsedCredentials = JSON.parse(credentials);
        customerName = `${parsedCredentials.firstName || ''} ${parsedCredentials.lastName || ''}`.trim();
        customerPhone = parsedCredentials.phone || '';
      }

      const receiptData = {
        customerName,
        customerEmail: emailAddress,
        customerPhone,
        recipientPhone: transaction.recipient_phone,
        recipientName: transaction.recipient_name,
        transactionId: generateTransactionId(transaction.timestamp),
        items: [{
          network: transaction.network,
          amount: transaction.amount,
          price: transaction.discounted_price,
          type: 'airtime'
        }],
        total: transaction.amount,
        cashbackEarned: transaction.cashback_earned,
        timestamp: transaction.timestamp,
        purchaseType: transaction.transaction_type === 'self_purchase' ? 'self' : 'other'
      };

      const { data, error } = await supabase.functions.invoke('send-receipt', {
        body: receiptData
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Statement Sent",
        description: `Transaction statement sent to ${emailAddress}`,
      });
      
      setIsEmailDialogOpen(false);
      setEmailAddress('');
      
    } catch (error) {
      console.error('Error sending email statement:', error);
      toast({
        title: "Send Failed",
        description: "Could not send email statement. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  const sendWhatsAppReceipt = async () => {
    if (!whatsappNumber) {
      toast({
        title: "WhatsApp Number Required",
        description: "Please enter a WhatsApp number",
        variant: "destructive"
      });
      return;
    }

    setIsSending(true);
    
    try {
      // Get customer details from localStorage
      const credentials = localStorage.getItem('userCredentials');
      let customerName = 'Valued Customer';
      let customerPhone = '';
      
      if (credentials) {
        const parsedCredentials = JSON.parse(credentials);
        customerName = `${parsedCredentials.firstName || ''} ${parsedCredentials.lastName || ''}`.trim();
        customerPhone = parsedCredentials.phone || '';
      }

      const receiptData = {
        customerName,
        customerEmail: '', // Not needed for WhatsApp
        customerPhone: whatsappNumber, // Use the provided WhatsApp number
        recipientPhone: transaction.recipient_phone,
        recipientName: transaction.recipient_name,
        transactionId: generateTransactionId(transaction.timestamp),
        items: [{
          network: transaction.network,
          amount: transaction.amount,
          price: transaction.discounted_price,
          type: 'airtime'
        }],
        total: transaction.amount,
        cashbackEarned: transaction.cashback_earned,
        timestamp: transaction.timestamp,
        purchaseType: transaction.transaction_type === 'self_purchase' ? 'self' : 'other'
      };

      const { data, error } = await supabase.functions.invoke('send-receipt', {
        body: receiptData
      });

      if (error) {
        throw error;
      }

      // Open WhatsApp with receipt if URL provided
      if (data?.whatsappUrl) {
        window.open(data.whatsappUrl, '_blank');
      }

      toast({
        title: "Receipt Sent",
        description: `Transaction receipt sent to WhatsApp ${whatsappNumber}`,
      });
      
      setIsWhatsAppDialogOpen(false);
      setWhatsappNumber('');
      
    } catch (error) {
      console.error('Error sending WhatsApp receipt:', error);
      toast({
        title: "Send Failed",
        description: "Could not send WhatsApp receipt. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex gap-2">
      {/* Email Statement Dialog */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" className="text-xs">
            <Mail className="w-3 h-3 mr-1" />
            Email
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Email Transaction Statement</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsEmailDialogOpen(false)}
                disabled={isSending}
              >
                Cancel
              </Button>
              <Button onClick={sendEmailStatement} disabled={isSending}>
                {isSending ? (
                  <>
                    <Send className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Statement
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* WhatsApp Receipt Dialog */}
      <Dialog open={isWhatsAppDialogOpen} onOpenChange={setIsWhatsAppDialogOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" className="text-xs">
            <MessageCircle className="w-3 h-3 mr-1" />
            WhatsApp
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Receipt to WhatsApp</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp Number</Label>
              <Input
                id="whatsapp"
                type="tel"
                placeholder="e.g., +27123456789"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsWhatsAppDialogOpen(false)}
                disabled={isSending}
              >
                Cancel
              </Button>
              <Button onClick={sendWhatsAppReceipt} disabled={isSending}>
                {isSending ? (
                  <>
                    <Send className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Receipt
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
