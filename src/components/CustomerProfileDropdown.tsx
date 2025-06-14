
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  User, CreditCard, Smartphone, ChevronDown, ChevronUp,
  MessageCircle, Zap, Gift, TrendingUp, Star, LogOut, AlertTriangle
} from 'lucide-react';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const CustomerProfileDropdown = () => {
  const { currentUser, isAuthenticated } = useMobileAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { toast } = useToast();

  if (!isAuthenticated || !currentUser) {
    return null;
  }

  // Disable all functionality - component is now read-only
  return (
    <>
      <div className="relative">
        {/* Profile Summary Card - Disabled */}
        <Card className="bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300 shadow-sm opacity-50 cursor-not-allowed">
          <CardContent className="p-3">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white font-bold">
                  {currentUser.firstName?.charAt(0)}{currentUser.lastName?.charAt(0)}
                </div>
                
                {/* Customer Info */}
                <div className="text-left">
                  <div className="font-semibold text-gray-600 text-sm">
                    {currentUser.firstName} {currentUser.lastName}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-gray-200 text-gray-600 text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      Profile Disabled
                    </Badge>
                  </div>
                </div>
              </div>
              
              {/* Disabled indicator */}
              <div className="flex items-center gap-2">
                <Badge className="bg-gray-200 text-gray-600">
                  Disabled
                </Badge>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CustomerProfileDropdown;
