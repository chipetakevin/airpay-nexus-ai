
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { useDivineMobileReceipts } from '@/hooks/useDivineMobileReceipts';

interface DivineMobilePDFDownloadProps {
  receiptData: any;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
}

export const DivineMobilePDFDownload = ({ 
  receiptData, 
  variant = 'outline',
  size = 'sm' 
}: DivineMobilePDFDownloadProps) => {
  const { downloadPDFReceipt } = useDivineMobileReceipts();

  const handleDownload = () => {
    if (!receiptData) {
      console.error('No receipt data provided for PDF download');
      return;
    }

    downloadPDFReceipt(receiptData);
  };

  return (
    <Button 
      onClick={handleDownload}
      variant={variant}
      size={size}
      className="flex items-center gap-1"
    >
      <FileText className="w-4 h-4" />
      <span className="hidden sm:inline">Divine PDF</span>
      <Download className="w-3 h-3" />
    </Button>
  );
};

export default DivineMobilePDFDownload;
