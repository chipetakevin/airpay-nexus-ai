
import React, { useState } from 'react';
import { MessageCircle, User, CheckCircle } from 'lucide-react';
import { useMobileAuth } from '@/hooks/useMobileAuth';

const WhatsAppFloatingButton = () => {
  const { currentUser, isAuthenticated } = useMobileAuth();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleWhatsAppClick = () => {
    // Use registered phone number if authenticated, otherwise use test number
    const phoneNumber = isAuthenticated && currentUser?.registeredPhone 
      ? currentUser.registeredPhone.replace('+', '')
      : '27832466539'; // Test number for non-authenticated users
    
    // Enhanced message for authenticated customers
    const message = isAuthenticated ? encodeURIComponent(
      `🔥 Hi Divinely Mobile AI! I'm ${currentUser?.firstName} ${currentUser?.lastName}\n\n` +
      `🎯 OneCard: ${currentUser?.cardNumber}\n` +
      `📱 Account: ${currentUser?.registeredPhone}\n\n` +
      `I'd like exclusive access to:\n` +
      `• 💎 VIP Deals & Discounts\n` +
      `• ⚡ Instant Top-ups\n` +
      `• 📊 Premium Data Bundles\n` +
      `• 🎁 Loyalty Rewards\n\n` +
      `Ready to shop! 🛒`
    ) : encodeURIComponent(
      `Hi Divinely Mobile AI! 🤖\n\nI'd like to get instant airtime & data deals. Please assist me with:\n\n• Best available deals\n• Account management\n• Top-up services\n• Balance inquiries\n\nThank you!`
    );
    
    // Open WhatsApp with the phone number and pre-filled message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-20 right-6 z-50">
      {/* Exclusive Customer Badge */}
      {isAuthenticated && (
        <div className="absolute -top-12 right-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg animate-bounce">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            VIP Access
          </div>
        </div>
      )}

      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`relative group rounded-full p-4 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 ${
          isAuthenticated 
            ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700' 
            : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
        } text-white`}
        aria-label="Chat with Divinely Mobile AI on WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6" />
          
          {/* Customer Status Indicator */}
          {isAuthenticated ? (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <User className="w-2 h-2 text-white" />
            </div>
          ) : (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          )}
        </div>
        
        {/* Enhanced Tooltip */}
        {showTooltip && (
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-4 py-3 rounded-lg text-sm opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-xl">
            {isAuthenticated ? (
              <div>
                <div className="font-bold text-green-400 flex items-center gap-1 mb-1">
                  <CheckCircle className="w-3 h-3" />
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
                <div className="font-medium">Chat with Divinely Mobile AI</div>
                <div className="text-xs opacity-75">
                  Test: +27832466539
                </div>
                <div className="text-xs text-yellow-400 mt-1">
                  Register for exclusive access!
                </div>
              </div>
            )}
            {/* Arrow pointing to button */}
            <div className="absolute top-1/2 left-full transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
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
