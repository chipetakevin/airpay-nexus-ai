import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, ArrowRight, AlertCircle, Star } from 'lucide-react';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface ValidatedWhatsAppRedirectProps {
  variant?: 'default' | 'express' | 'floating';
  className?: string;
  showBadge?: boolean;
}

const ValidatedWhatsAppRedirect = ({ 
  variant = 'default', 
  className = '',
  showBadge = true 
}: ValidatedWhatsAppRedirectProps) => {
  const { isAuthenticated, currentUser } = useMobileAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Validate user completion status
  const validateUserProfile = () => {
    if (!isAuthenticated || !currentUser) {
      return {
        isValid: false,
        missingFields: ['Authentication required'],
        completionScore: 0
      };
    }

    const missingFields = [];
    let score = 0;
    const totalFields = 6;

    // Check essential fields
    if (!currentUser.firstName || !currentUser.lastName) {
      missingFields.push('Full name');
    } else {
      score += 1;
    }

    if (!currentUser.email) {
      missingFields.push('Email address');
    } else {
      score += 1;
    }

    if (!currentUser.registeredPhone) {
      missingFields.push('Phone number');
    } else {
      score += 1;
    }

    // Check OneCard/financial info
    if (!currentUser.cardNumber) {
      missingFields.push('OneCard details');
    } else {
      score += 1;
    }

    // Assume bank details are available if user is authenticated (can be expanded)
    if (currentUser.userType === 'customer' || currentUser.userType === 'vendor') {
      score += 1; // Bank info assumed complete
    }

    // Check user type validity
    if (['customer', 'vendor', 'admin', 'field_worker'].includes(currentUser.userType)) {
      score += 1;
    } else {
      missingFields.push('Valid user type');
    }

    const completionScore = Math.round((score / totalFields) * 100);

    return {
      isValid: missingFields.length === 0,
      missingFields,
      completionScore
    };
  };

  const handleWhatsAppRedirect = () => {
    const validation = validateUserProfile();

    if (!validation.isValid) {
      toast({
        title: "Profile Incomplete",
        description: `Please complete your profile: ${validation.missingFields.join(', ')}`,
        variant: "destructive",
      });
      
      // Redirect to registration/profile completion
      navigate('/registration');
      return;
    }

    // If validation passes, redirect to WhatsApp Assistant
    toast({
      title: "Redirecting to WhatsApp Shopping",
      description: `Welcome ${currentUser?.firstName}! Opening your personalized shopping experience...`,
    });

    // Redirect to WhatsApp Assistant with user context
    navigate('/whatsapp-assistant');
  };

  const validation = validateUserProfile();

  if (variant === 'express') {
    return (
      <Card className={`relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 border-2 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
        <CardContent className="p-6">
          {showBadge && (
            <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-semibold">
              <Star className="w-3 h-3 mr-1" />
              Most Popular
            </Badge>
          )}
          
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-gray-900">WhatsApp Express Shop</h3>
                {validation.isValid && (
                  <Badge className="bg-green-100 text-green-700 text-xs">Ready</Badge>
                )}
              </div>
              
              <p className="text-gray-600 mb-4">
                Shop instantly via WhatsApp - No app needed!
              </p>
              
              {!validation.isValid && (
                <div className="flex items-center gap-1 mb-3 text-orange-600">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">Profile {validation.completionScore}% complete</span>
                </div>
              )}
              
              <Button
                onClick={handleWhatsAppRedirect}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg"
              >
                {validation.isValid ? 'Tap to access smart deals' : 'Complete Profile & Shop'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              {validation.isValid && (
                <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-500">
                  <span>🔒 Secure</span>
                  <span>⚡ Instant</span>
                  <span>🎯 Smart Deals</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'floating') {
    return (
      <div className={`bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-xl border-2 border-green-200 ${className}`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              Quick Shopping?
            </span>
          </div>
          <Button
            onClick={handleWhatsAppRedirect}
            variant="outline"
            size="sm"
            className="bg-white hover:bg-green-50 border-green-300 text-green-700 font-medium"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            WhatsApp Chat
            <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
        
        {isAuthenticated && currentUser && (
          <div className="mt-2 flex items-center gap-2">
            <Badge className="bg-green-600 text-white text-xs">
              Welcome {currentUser.firstName}!
            </Badge>
            {!validation.isValid && (
              <Badge variant="outline" className="border-orange-300 text-orange-600 text-xs">
                Profile {validation.completionScore}% complete
              </Badge>
            )}
          </div>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <Button
      onClick={handleWhatsAppRedirect}
      className={`bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 ${className}`}
    >
      <MessageCircle className="w-4 h-4 mr-2" />
      {validation.isValid ? 'WhatsApp Chat' : 'Complete Profile & Chat'}
      <ArrowRight className="w-4 h-4 ml-2" />
    </Button>
  );
};

export default ValidatedWhatsAppRedirect;