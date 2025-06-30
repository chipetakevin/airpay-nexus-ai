
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

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
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg border p-4">
        <Button 
          onClick={onClick}
          type="submit"
          className={`w-full h-14 text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
            isFormValid 
              ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg text-white' 
              : 'bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white'
          }`}
          disabled={isRegistering}
        >
          {isRegistering ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="text-white font-medium">Completing Registration...</span>
            </div>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              <span className="text-white font-medium">
                {isFormValid ? 'Register & Start Shopping' : 'Complete Form to Continue'}
              </span>
            </>
          )}
        </Button>
        
        {isFormValid && !isRegistering && (
          <div className="text-center mt-3 px-2">
            <p className="text-sm text-green-700 bg-green-50 p-2 rounded-lg border border-green-200 font-medium">
              ✅ Ready to register! You'll be redirected to your personalized shopping experience.
            </p>
          </div>
        )}
        
        {!isFormValid && !isRegistering && (
          <div className="text-center mt-3 px-2">
            <p className="text-sm text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200">
              📝 Please complete all required fields to proceed with registration.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorRegistrationButton;
