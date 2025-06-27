
import React, { useState } from 'react';
import { MessageCircle, User, CheckCircle } from 'lucide-react';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { useNavigate } from 'react-router-dom';

const WhatsAppFloatingButton = () => {
  const { currentUser, isAuthenticated } = useMobileAuth();
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

  const handleWhatsAppClick = () => {
    // Navigate to WhatsApp Assistant page
    navigate('/whatsapp-assistant');
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Exclusive Customer Badge */}
      {isAuthenticated && (
        <div className="absolute -top-8 left-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg animate-bounce">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-2 h-2" />
            VIP
          </div>
        </div>
      )}

      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`relative group rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 ${
          isAuthenticated 
            ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700' 
            : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
        } text-white`}
        aria-label="Chat with Divine Mobile AI on WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5" />
          
          {/* Customer Status Indicator */}
          {isAuthenticated ? (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <User className="w-1.5 h-1.5 text-white" />
            </div>
          ) : (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          )}
        </div>
        
        {/* Enhanced Tooltip */}
        {showTooltip && (
          <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-xl">
            {isAuthenticated ? (
              <div>
                <div className="font-bold text-green-400 flex items-center gap-1 mb-1">
                  <CheckCircle className="w-2 h-2" />
                  Exclusive WhatsApp Shopping
                </div>
                <div className="text-xs opacity-90 mb-1">
                  Welcome back, {currentUser?.firstName}!
                </div>
                <div className="text-xs opacity-75">
                  OneCard: ****{currentUser?.cardNumber?.slice(-4)}
                </div>
                <div className="text-xs opacity-75">
                  📱 {currentUser?.registeredPhone}
                </div>
              </div>
            ) : (
              <div>
                <div className="font-medium">Start WhatsApp Shopping</div>
                <div className="text-xs opacity-75">
                  AI-powered assistant ready
                </div>
                <div className="text-xs text-yellow-400 mt-1">
                  Register for exclusive access!
                </div>
              </div>
            )}
            {/* Arrow pointing to button */}
            <div className="absolute top-1/2 right-full transform -translate-y-1/2 w-0 h-0 border-r-4 border-r-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </div>
        )}
        
        {/* Enhanced ripple effect */}
        <div className={`absolute inset-0 rounded-full opacity-75 animate-ping ${
          isAuthenticated ? 'bg-emerald-400' : 'bg-green-400'
        }`}></div>
      </button>
    </div>
  );
};

export default WhatsAppFloatingButton;
