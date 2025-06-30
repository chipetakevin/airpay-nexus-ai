
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MobileShoppingHeaderProps {
  isAuthenticated: boolean;
  onExit: () => void;
}

const MobileShoppingHeader: React.FC<MobileShoppingHeaderProps> = ({
  isAuthenticated,
  onExit
}) => {
  const handleExitToHome = () => {
    // Redirect to home page instead of AI-Powered Deals
    window.location.href = '/';
  };

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
        
        {/* Exit Button redirecting to home page */}
        <div className="flex flex-col items-end gap-2">
          {isAuthenticated && (
            <Badge className="bg-yellow-500 text-yellow-900 text-xs font-bold">
              <Star className="w-3 h-3 mr-1" />
              VIP
            </Badge>
          )}
          <Button
            onClick={handleExitToHome}
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 px-3 py-2"
            title="Get Started"
          >
            <span className="text-xs text-white font-bold">Get Started</span>
            <ArrowRight className="w-3 h-3 text-white ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileShoppingHeader;
