import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreditCard, Wallet, TrendingUp, Gift, Shield, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useOneCardSystem } from '@/hooks/useOneCardSystem';
import { motion, AnimatePresence } from 'framer-motion';

interface OneCardDigitalWalletProps {
  userId: string;
  userType: 'customer' | 'vendor' | 'admin' | 'field_worker' | 'support';
  showBalance?: boolean;
}

const OneCardDigitalWallet: React.FC<OneCardDigitalWalletProps> = ({
  userId,
  userType,
  showBalance = true
}) => {
  const { oneCardAccount, initializeOneCardSystem, isLoading } = useOneCardSystem();
  const [showFullBalance, setShowFullBalance] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (userId) {
      initializeOneCardSystem(userId, userType);
    }
  }, [userId, userType, initializeOneCardSystem]);

  const getCardTypeConfig = (type: string) => {
    switch (type) {
      case 'platinum':
        return {
          gradient: 'from-gray-800 via-gray-900 to-black',
          accent: 'from-yellow-400 to-yellow-600',
          textColor: 'text-white',
          badgeColor: 'bg-yellow-500 text-black',
          icon: '💎'
        };
      case 'gold':
        return {
          gradient: 'from-yellow-600 via-yellow-700 to-amber-800',
          accent: 'from-yellow-300 to-yellow-500',
          textColor: 'text-white',
          badgeColor: 'bg-yellow-400 text-yellow-900',
          icon: '🏆'
        };
      case 'enterprise':
        return {
          gradient: 'from-blue-800 via-blue-900 to-indigo-900',
          accent: 'from-blue-400 to-blue-600',
          textColor: 'text-white',
          badgeColor: 'bg-blue-500 text-white',
          icon: '🏢'
        };
      default:
        return {
          gradient: 'from-green-600 via-green-700 to-emerald-800',
          accent: 'from-green-400 to-green-600',
          textColor: 'text-white',
          badgeColor: 'bg-green-500 text-white',
          icon: '💳'
        };
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR'
    }).format(amount);
  };

  const formatCardNumber = (cardNumber: string) => {
    if (!cardNumber) return '';
    
    if (showFullBalance) {
      return cardNumber.replace(/(.{2})(.{4})(.{4})(.+)/, '$1 $2 $3 $4');
    }
    
    const lastFour = cardNumber.slice(-4);
    return `**** **** **** ${lastFour}`;
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!oneCardAccount) {
    return (
      <Card className="w-full max-w-md border-dashed border-2 border-gray-300">
        <CardContent className="p-6 text-center">
          <CreditCard className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">OneCard not found</p>
          <Button onClick={() => initializeOneCardSystem(userId, userType)}>
            Create OneCard
          </Button>
        </CardContent>
      </Card>
    );
  }

  const config = getCardTypeConfig(oneCardAccount.onecard_type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <motion.div
        whileHover={{ scale: 1.02, rotateY: 5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative"
      >
        <Card className={`overflow-hidden bg-gradient-to-br ${config.gradient} border-0 shadow-2xl`}>
          <CardContent className="p-0">
            {/* Card Header with Sparkle Effect */}
            <div className="relative p-6 pb-4">
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute top-2 right-2"
                  >
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{config.icon}</span>
                  <Badge className={config.badgeColor}>
                    {oneCardAccount.onecard_type.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-green-400">SECURED</span>
                </div>
              </div>

              {/* OneCard Branding */}
              <div className="mb-6">
                <h3 className={`text-2xl font-bold ${config.textColor} mb-1`}>
                  OneCard
                </h3>
                <p className={`text-sm opacity-80 ${config.textColor}`}>
                  Digital Wallet & Rewards
                </p>
              </div>

              {/* Card Number */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className={`text-xs opacity-60 ${config.textColor}`}>
                    CARD NUMBER
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFullBalance(!showFullBalance)}
                    className={`p-1 h-auto ${config.textColor} hover:bg-white/10`}
                  >
                    {showFullBalance ? (
                      <EyeOff className="w-3 h-3" />
                    ) : (
                      <Eye className="w-3 h-3" />
                    )}
                  </Button>
                </div>
                <p className={`text-lg font-mono ${config.textColor} tracking-wider`}>
                  {formatCardNumber(oneCardAccount.onecard_number)}
                </p>
              </div>
            </div>

            {/* Balance Section */}
            {showBalance && (
              <div className={`bg-gradient-to-r ${config.accent} p-4`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-white" />
                    <span className="text-white font-medium">Cashback Balance</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFullBalance(!showFullBalance)}
                    className="p-1 h-auto text-white hover:bg-white/20"
                  >
                    {showFullBalance ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                <motion.div
                  key={showFullBalance ? 'visible' : 'hidden'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <p className="text-2xl font-bold text-white">
                    {showFullBalance 
                      ? formatCurrency(oneCardAccount.cashback_balance || 0)
                      : '••••••'
                    }
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-white/80">Total Earned</p>
                      <p className="font-semibold text-white">
                        {showFullBalance 
                          ? formatCurrency(oneCardAccount.total_earned || 0)
                          : '••••••'
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-white/80">Total Spent</p>
                      <p className="font-semibold text-white">
                        {showFullBalance 
                          ? formatCurrency(oneCardAccount.total_spent || 0)
                          : '••••••'
                        }
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Status Indicators */}
            <div className="flex items-center justify-between p-4 bg-black/20">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  oneCardAccount.is_active ? 'bg-green-400' : 'bg-red-400'
                } animate-pulse`}></div>
                <span className={`text-xs ${config.textColor} opacity-80`}>
                  {oneCardAccount.is_active ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </div>

              <div className="flex items-center gap-1">
                {oneCardAccount.is_verified && (
                  <>
                    <Shield className="w-3 h-3 text-green-400" />
                    <span className="text-xs text-green-400">VERIFIED</span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-blue-400" />
                <span className={`text-xs ${config.textColor} opacity-80`}>
                  {oneCardAccount.verification_level?.toUpperCase() || 'BASIC'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Gift className="w-4 h-4" />
          Redeem
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          History
        </Button>
      </div>
    </motion.div>
  );
};

export default OneCardDigitalWallet;