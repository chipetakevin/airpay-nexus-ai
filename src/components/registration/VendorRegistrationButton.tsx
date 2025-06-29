
import React from 'react';
import { Button } from '@/components/ui/button';

interface VendorRegistrationButtonProps {
  onClick: (e: React.FormEvent) => void;
  isRegistering: boolean;
  isFormValid: boolean;
}

const VendorRegistrationButton: React.FC<VendorRegistrationButtonProps> = ({
  onClick,
  isRegistering,
  isFormValid
}) => {
  return (
    <div className="fixed-register-button enhanced-register-tab">
      <div className="register-button-container">
        <Button 
          onClick={onClick}
          type="submit"
          className={`mobile-submit-button transition-all duration-300 ${
            isFormValid 
              ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg' 
              : 'bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800'
          }`}
          disabled={isRegistering}
        >
          {isRegistering ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Completing Registration...
            </div>
          ) : (
            <>
              {isFormValid ? 'Register & Start Shopping 🛒' : 'Complete Form to Continue 📝'}
            </>
          )}
        </Button>
        
        {isFormValid && !isRegistering && (
          <div className="text-xs text-center mt-2 text-green-600 bg-green-50 p-2 rounded-lg border border-green-200">
            ✅ Ready to register! You'll be redirected to your personalized shopping experience.
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorRegistrationButton;
