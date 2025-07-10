import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Share, 
  CheckCircle, 
  Smartphone, 
  Save, 
  Cloud, 
  FileText,
  Copy 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ReceiptData {
  transactionId: string;
  customerName: string;
  customerPhone: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    network?: string;
    type?: string;
    amount?: number;
  }>;
  total: number;
  timestamp: string;
  paymentMethod: string;
  status: string;
}

interface EnhancedReceiptManagerProps {
  receiptData: ReceiptData;
  onClose: () => void;
}

const EnhancedReceiptManager: React.FC<EnhancedReceiptManagerProps> = ({
  receiptData,
  onClose
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveOptions, setSaveOptions] = useState({
    device: false,
    cloud: false,
    whatsapp: false
  });
  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-ZA', {
      timeZone: 'Africa/Johannesburg',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const generateReceiptText = () => {
    const itemsList = receiptData.items.map(item => 
      `${item.name} (${item.quantity}x) - R${item.price * item.quantity}`
    ).join('\n');

    return `🌟 SECURE TRANSACTION COMPLETED 📱

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ RECEIPT CONFIRMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Transaction ID: ${receiptData.transactionId}
Customer: ${receiptData.customerName}
Phone: ${receiptData.customerPhone}
Date: ${formatDate(receiptData.timestamp)} SAST

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛒 ITEMS PURCHASED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${itemsList}

Total: R${receiptData.total}
Payment Method: ${receiptData.paymentMethod}
Status: ${receiptData.status} ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📞 SUPPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Support: +27 100 2827
Website: www.addex-hub.co.za

🌟 Thank you for your purchase! 🌟
⚡ Fast • 🔒 Secure • 🎯 Reliable`;
  };

  const handleSendToWhatsApp = () => {
    const receiptMessage = generateReceiptText();
    const whatsappUrl = `https://wa.me/${receiptData.customerPhone.replace('+', '')}?text=${encodeURIComponent(receiptMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    setSaveOptions(prev => ({ ...prev, whatsapp: true }));
    
    toast({
      title: "📱 WhatsApp Opened",
      description: "Receipt ready to send via WhatsApp",
      duration: 3000
    });
  };

  const handleDownloadReceipt = () => {
    const receiptContent = generateReceiptText();
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `Receipt_${receiptData.transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setSaveOptions(prev => ({ ...prev, device: true }));
    
    toast({
      title: "📥 Receipt Downloaded",
      description: "Receipt saved to your device",
      duration: 3000
    });
  };

  const handleSaveToCloud = async () => {
    setIsSaving(true);
    try {
      const receiptContent = generateReceiptText();
      const blob = new Blob([receiptContent], { type: 'text/plain' });
      
      const fileName = `receipt_${receiptData.transactionId}_${Date.now()}.txt`;
      const { data, error } = await supabase.storage
        .from('documents')
        .upload(`receipts/${fileName}`, blob);

      if (error) throw error;

      // Also save metadata to localStorage for quick access
      const savedReceipts = JSON.parse(localStorage.getItem('cloudReceipts') || '[]');
      savedReceipts.push({
        ...receiptData,
        cloudPath: data.path,
        savedAt: new Date().toISOString(),
        id: `receipt_${Date.now()}`
      });
      localStorage.setItem('cloudReceipts', JSON.stringify(savedReceipts));

      setSaveOptions(prev => ({ ...prev, cloud: true }));
      
      toast({
        title: "☁️ Cloud Save Successful",
        description: "Receipt securely saved to cloud storage",
        duration: 3000
      });
    } catch (error) {
      toast({
        title: "❌ Cloud Save Failed",
        description: "Unable to save to cloud. Receipt saved locally instead.",
        variant: "destructive",
        duration: 3000
      });
      
      // Fallback to local storage
      const savedReceipts = JSON.parse(localStorage.getItem('receipts') || '[]');
      savedReceipts.push({
        ...receiptData,
        savedAt: new Date().toISOString(),
        id: `receipt_${Date.now()}`
      });
      localStorage.setItem('receipts', JSON.stringify(savedReceipts));
      setSaveOptions(prev => ({ ...prev, device: true }));
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyReceipt = () => {
    const receiptContent = generateReceiptText();
    navigator.clipboard.writeText(receiptContent).then(() => {
      toast({
        title: "📋 Receipt Copied",
        description: "Receipt copied to clipboard",
        duration: 2000
      });
    });
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    
    // Save to device
    handleDownloadReceipt();
    
    // Save to cloud
    await handleSaveToCloud();
    
    // Open WhatsApp
    handleSendToWhatsApp();
    
    setIsSaving(false);
    
    toast({
      title: "🎉 All Options Complete",
      description: "Receipt saved everywhere and WhatsApp opened",
      duration: 4000
    });
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Card className="border-2 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="w-6 h-6" />
            Transaction Completed
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Receipt Preview */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-mono font-bold">{receiptData.transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Customer:</span>
              <span className="font-medium">{receiptData.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium">{receiptData.customerPhone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{formatDate(receiptData.timestamp)}</span>
            </div>
            
            <div className="border-t pt-3">
              {receiptData.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.name} ({item.quantity}x)</span>
                  <span>R{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total:</span>
                <span className="text-green-600">R{receiptData.total}</span>
              </div>
            </div>
          </div>

          {/* Save Options Status */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className={`flex items-center gap-1 p-2 rounded ${saveOptions.whatsapp ? 'bg-green-50 text-green-700' : 'bg-gray-50'}`}>
              <Smartphone className="w-3 h-3" />
              <span>WhatsApp</span>
              {saveOptions.whatsapp && <CheckCircle className="w-3 h-3" />}
            </div>
            <div className={`flex items-center gap-1 p-2 rounded ${saveOptions.device ? 'bg-green-50 text-green-700' : 'bg-gray-50'}`}>
              <Download className="w-3 h-3" />
              <span>Device</span>
              {saveOptions.device && <CheckCircle className="w-3 h-3" />}
            </div>
            <div className={`flex items-center gap-1 p-2 rounded ${saveOptions.cloud ? 'bg-green-50 text-green-700' : 'bg-gray-50'}`}>
              <Cloud className="w-3 h-3" />
              <span>Cloud</span>
              {saveOptions.cloud && <CheckCircle className="w-3 h-3" />}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          onClick={handleSaveAll}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : '🚀 Save Everywhere & Send WhatsApp'}
        </Button>
        
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            onClick={handleSendToWhatsApp}
            className="flex items-center gap-2"
          >
            <Smartphone className="w-4 h-4" />
            WhatsApp
          </Button>
          <Button 
            variant="outline" 
            onClick={handleDownloadReceipt}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            onClick={handleSaveToCloud}
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            <Cloud className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Cloud Save'}
          </Button>
          <Button 
            variant="outline" 
            onClick={handleCopyReceipt}
            className="flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy
          </Button>
        </div>

        <Button variant="ghost" onClick={onClose} className="w-full">
          Close
        </Button>
      </div>

      {/* Status Message */}
      <div className="text-center text-sm text-gray-600">
        <p>🔒 Secure • ⚡ Instant • 📱 Mobile Optimized</p>
      </div>
    </div>
  );
};

export default EnhancedReceiptManager;