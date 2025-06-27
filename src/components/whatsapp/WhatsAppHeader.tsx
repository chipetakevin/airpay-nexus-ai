
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface WhatsAppHeaderProps {
  cartCount: number;
}

const WhatsAppHeader: React.FC<WhatsAppHeaderProps> = ({ cartCount }) => {
  return (
    <div className="bg-gray-50 p-1 sticky top-0 z-10">
      <div className="flex items-center justify-between px-2">
        <div className="text-xs font-medium text-gray-700">Divinely Mobile</div>
        {cartCount > 0 && (
          <Badge className="bg-green-600 text-white text-xs">
            {cartCount} items
          </Badge>
        )}
      </div>
    </div>
  );
};

export default WhatsAppHeader;
