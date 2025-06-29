
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X } from 'lucide-react';

interface WhatsAppShoppingHeaderProps {
  onExit: () => void;
}

const WhatsAppShoppingHeader: React.FC<WhatsAppShoppingHeaderProps> = ({ onExit }) => {
  return (
    <div className="bg-green-600 text-white p-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MessageCircle className="w-6 h-6" />
        <h2 className="text-lg font-semibold">WhatsApp Shopping</h2>
      </div>
      <Button
        onClick={onExit}
        variant="ghost"
        size="sm"
        className="w-8 h-8 p-0 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
        title="Exit to AI Deals"
      >
        <X className="w-4 h-4 text-white" />
      </Button>
    </div>
  );
};

export default WhatsAppShoppingHeader;
