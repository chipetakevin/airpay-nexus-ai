
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Smartphone, ArrowLeft } from 'lucide-react';

interface WhatsAppShoppingHeaderProps {
  isAuthenticated: boolean;
  onExit: () => void;
}

const WhatsAppShoppingHeader: React.FC<WhatsAppShoppingHeaderProps> = ({ 
  isAuthenticated, 
  onExit 
}) => {
  return (
    <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Smartphone className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Divine Mobile Shop</h2>
            <div className="flex items-center gap-2 text-sm opacity-90">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              <span>WhatsApp Shopping</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <Badge className="bg-green-800 text-green-100 px-2 py-1 text-xs">
              Registered ✓
            </Badge>
          )}
          <Button
            onClick={onExit}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppShoppingHeader;
