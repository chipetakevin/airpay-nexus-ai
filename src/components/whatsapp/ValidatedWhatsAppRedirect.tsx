import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, ArrowRight, AlertCircle, Star, Crown, Lock, Globe } from 'lucide-react';
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
  const [currentLanguage, setCurrentLanguage] = useState('english');

  // South African language support for registration notices
  const registrationNotices = {
    english: "Please register to access shopping features",
    afrikaans: "Registreer asseblief om toegang tot inkopie-kenmerke te kry",
    zulu: "Sicela ubhalise ukuze uthole ukufinyelela ezinhlobo zokuthenga",
    xhosa: "Nceda ubhalise ukuze ufikelele kwiimpawu zokuthenga",
    sotho: "Ka kopo, ngodisa ho fumana phihlelo ho theheseleletso tsa ho reka",
    tswana: "Tsweetswee, kwala go bona ditsela tsa go reka",
    pedi: "Hle ngwadišo go hwetša mekgwa ya go reka",
    venda: "Ri humbela uri ni ṅwalise u wana zwiitisi zwa u renga",
    tsonga: "Hi kombela leswaku mi tsarisa ku kuma swiaki swa ku xava",
    ndebele: "Siyacela ubhalise ukuze uthole izici zokuthenga",
    swati: "Sicela ubhalishe kutsi utfole tincumo tekuthenga"
  };

  const languages = [
    { code: 'english', name: 'English', flag: '🇬🇧' },
    { code: 'afrikaans', name: 'Afrikaans', flag: '🇿🇦' },
    { code: 'zulu', name: 'isiZulu', flag: '🇿🇦' },
    { code: 'xhosa', name: 'isiXhosa', flag: '🇿🇦' },
    { code: 'sotho', name: 'Sesotho', flag: '🇿🇦' },
    { code: 'tswana', name: 'Setswana', flag: '🇿🇦' }
  ];

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
      <div className={`relative overflow-hidden rounded-2xl border-2 shadow-xl transition-all duration-300 ${className}`}>
        {/* Mobile-Optimized Header with High Contrast Text */}
        <div className="bg-gradient-to-r from-green-500 via-emerald-600 to-green-700 p-3 sm:p-6 relative">
          {/* Dark overlay for maximum text contrast */}
          <div className="absolute inset-0 bg-black/20"></div>
          
          <div className="relative flex flex-col sm:flex-row items-stretch gap-3 sm:gap-6">
            {/* Left Tab - Quick Shopping */}
            <div 
              className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 flex-1 relative min-h-[60px] sm:min-h-[80px] ${
                isAuthenticated 
                  ? 'bg-white/90 backdrop-blur-md border-2 border-white cursor-pointer hover:bg-white shadow-2xl hover:scale-[1.02] active:scale-[0.98]' 
                  : 'bg-gray-800/80 cursor-not-allowed border-2 border-gray-600'
              }`}
              onClick={isAuthenticated ? () => {/* Quick shop action */} : undefined}
            >
              <MessageCircle className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 ${isAuthenticated ? 'text-green-700' : 'text-gray-400'}`} />
              <div className="flex-1 text-left">
                <div className={`text-sm sm:text-base font-bold leading-tight ${isAuthenticated ? 'text-green-800' : 'text-gray-400'}`}>
                  Quick
                </div>
                <div className={`text-sm sm:text-base font-bold leading-tight ${isAuthenticated ? 'text-green-800' : 'text-gray-400'}`}>
                  Shopping?
                </div>
              </div>
              {!isAuthenticated && (
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
              )}
            </div>

            {/* Right Tab - WhatsApp Chat */}
            <div 
              className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 flex-1 relative min-h-[60px] sm:min-h-[80px] ${
                isAuthenticated 
                  ? 'bg-white/90 backdrop-blur-md border-2 border-white cursor-pointer hover:bg-white shadow-2xl hover:scale-[1.02] active:scale-[0.98]' 
                  : 'bg-gray-800/80 cursor-not-allowed border-2 border-gray-600'
              }`}
              onClick={isAuthenticated ? handleWhatsAppRedirect : undefined}
            >
              <MessageCircle className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 ${isAuthenticated ? 'text-green-700' : 'text-gray-400'}`} />
              <div className="flex-1 text-left">
                <div className={`text-sm sm:text-base font-bold leading-tight ${isAuthenticated ? 'text-green-800' : 'text-gray-400'}`}>
                  WhatsApp
                </div>
                <div className={`text-sm sm:text-base font-bold leading-tight ${isAuthenticated ? 'text-green-800' : 'text-gray-400'}`}>
                  Chat
                </div>
              </div>
              <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${isAuthenticated ? 'text-green-700' : 'text-gray-400'}`} />
              {!isAuthenticated && (
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white p-4">
          {isAuthenticated && currentUser ? (
            /* Enhanced Registered Customer Experience */
            <div className="space-y-3">
              {/* Premium Welcome Banner */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Crown className="w-5 h-5 text-yellow-300" />
                  <span className="font-bold text-lg">Welcome {currentUser.firstName}!</span>
                  <Badge className="bg-yellow-400 text-green-800 text-xs ml-auto">
                    VIP Customer
                  </Badge>
                </div>
                <p className="text-sm text-green-100">
                  Your premium shopping experience is ready 🎯
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-3 rounded-lg text-center border border-blue-200">
                  <div className="text-lg font-bold text-blue-700">50K+</div>
                  <div className="text-xs text-blue-600">Happy Customers</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-3 rounded-lg text-center border border-green-200">
                  <div className="text-lg font-bold text-green-700">99.9%</div>
                  <div className="text-xs text-green-600">Success Rate</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-3 rounded-lg text-center border border-purple-200">
                  <div className="text-lg font-bold text-purple-700">24/7</div>
                  <div className="text-xs text-purple-600">Support</div>
                </div>
              </div>

              {/* Enhanced Features */}
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">Instant Smart Deals</div>
                    <div className="text-xs text-gray-600">AI-powered personalized offers</div>
                  </div>
                  <Badge className="bg-green-600 text-white text-xs">Active</Badge>
                </div>
                
                <div className="flex items-center gap-3 p-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">Priority WhatsApp Support</div>
                    <div className="text-xs text-gray-600">Instant responses, VIP treatment</div>
                  </div>
                  <Badge className="bg-blue-600 text-white text-xs">Premium</Badge>
                </div>
              </div>

              {validation.isValid && (
                <div className="text-center text-xs text-gray-500 flex items-center justify-center gap-3">
                  <span>🔒 Bank-level Security</span>
                  <span>⚡ Instant Processing</span>
                  <span>🎁 Exclusive Rewards</span>
                </div>
              )}
            </div>
          ) : (
            /* Multilingual Registration Notice for Unregistered Users */
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto opacity-60">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-700">Registration Required</h3>
              </div>

              {/* Language Selection */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 justify-center">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-600">Choose your language:</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setCurrentLanguage(lang.code)}
                      className={`flex items-center gap-2 p-2 rounded-lg border transition-all duration-200 ${
                        currentLanguage === lang.code
                          ? 'bg-green-100 border-green-300 text-green-700'
                          : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Registration Notice in Selected Language */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  <span className="font-semibold text-orange-800">
                    {languages.find(l => l.code === currentLanguage)?.flag} {languages.find(l => l.code === currentLanguage)?.name}
                  </span>
                </div>
                <p className="text-sm text-orange-700 mb-3">
                  {registrationNotices[currentLanguage as keyof typeof registrationNotices]}
                </p>
                
                <Button
                  onClick={() => navigate('/registration')}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-lg"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  {currentLanguage === 'english' ? 'Register Now' : 
                   currentLanguage === 'afrikaans' ? 'Registreer Nou' :
                   currentLanguage === 'zulu' ? 'Bhalisa Manje' :
                   currentLanguage === 'xhosa' ? 'Bhalisa Ngoku' :
                   currentLanguage === 'sotho' ? 'Ngodisa Hona Joale' :
                   'Register Now'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
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