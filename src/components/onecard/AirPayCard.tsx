import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AirPayCardProps {
  cardNumber?: string;
  cardHolder?: string;
  memberSince?: string;
  validThru?: string;
  className?: string;
}

export const AirPayCard = ({ 
  cardNumber = "0CP9 1V4W W0",
  cardHolder = "KEVIN CHIPETA", 
  memberSince = "2025",
  validThru = "06/28",
  className = ""
}: AirPayCardProps) => {
  return (
    <Card className={`relative overflow-hidden bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 text-black shadow-2xl border-0 ${className}`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full translate-y-12 -translate-x-12"></div>
      
      <CardContent className="p-4 sm:p-6 relative z-10">
        {/* Header with AirPay branding */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg sm:text-xl">A</span>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-black">AirPay</h2>
              <p className="text-black/70 text-xs sm:text-sm">Powered by OneCard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">1</span>
            </div>
            <Badge className="bg-black text-white border-none text-xs font-semibold">
              CARD
            </Badge>
          </div>
        </div>

        {/* Card Number */}
        <div className="mb-8">
          <p className="text-2xl sm:text-3xl font-mono font-bold tracking-[0.3em] text-black">
            {cardNumber}
          </p>
        </div>

        {/* Card Details */}
        <div className="flex justify-between items-end">
          <div>
            <div className="mb-1">
              <p className="text-black/70 text-xs font-medium">CARD HOLDER</p>
              <p className="text-black font-bold text-sm sm:text-base">{cardHolder}</p>
            </div>
            <p className="text-black/70 text-xs">Member Since {memberSince}</p>
          </div>
          <div className="text-right">
            <p className="text-black/70 text-xs font-medium">VALID THRU</p>
            <p className="text-black font-bold text-lg">{validThru}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AirPayCard;