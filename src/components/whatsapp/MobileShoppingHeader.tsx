
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Star, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MobileShoppingHeaderProps {
  isAuthenticated: boolean;
  onExit: () => void;
}

const MobileShoppingHeader: React.FC<MobileShoppingHeaderProps> = ({
  isAuthenticated,
  onExit
}) => {
  return (
    <div className="bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 text-white p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20"></div>
      <div className="relative flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity flex-1">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            <Smartphone className="w-7 h-7 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">Divinely Mobile</h3>
            <p className="text-xs opacity-90 flex items-center gap-1">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              Mobile Services • Always Available
            </p>
          </div>
        </Link>
        
        {/* Exit Button */}
        <div className="flex flex-col items-end gap-2">
          {isAuthenticated && (
            <Badge className="bg-yellow-500 text-yellow-900 text-xs font-bold">
              <Star className="w-3 h-3 mr-1" />
              VIP
            </Badge>
          )}
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
      </div>
    </div>
  );
};

export default MobileShoppingHeader;
