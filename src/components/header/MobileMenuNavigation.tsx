
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Crown, Zap, Brain, MessageCircle, Scan, FileCheck, Flame
} from 'lucide-react';

interface MobileMenuNavigationProps {
  toggleMenu: () => void;
}

const MobileMenuNavigation = ({ toggleMenu }: MobileMenuNavigationProps) => {
  return (
    <div className="space-y-0">
      <Link to="/devine-baas" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 min-h-[32px] touch-manipulation" onClick={toggleMenu}>
        <Crown className="w-3 h-3 text-yellow-600 flex-shrink-0" />
        <span className="font-medium text-xs">Divinely BaaS Platform</span>
      </Link>
      <Link to="/devine-baas" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 ml-2 min-h-[32px] touch-manipulation" onClick={toggleMenu}>
        <FileCheck className="w-3 h-3 text-orange-600 flex-shrink-0" />
        <span className="font-medium text-xs">Mobile Porting & RICA</span>
      </Link>
      <Link to="/baas-platform" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 ml-2 min-h-[32px] touch-manipulation" onClick={toggleMenu}>
        <Brain className="w-3 h-3 text-purple-600 flex-shrink-0" />
        <span className="font-medium text-xs">Mobile Divinely BaaS Portal</span>
      </Link>
      
      {/* Smart Deals - Airtime and Data category */}
      <Link to="/portal?tab=deals" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-orange-50 active:bg-orange-100 transition-all duration-200 min-h-[32px] touch-manipulation" onClick={toggleMenu}>
        <Flame className="w-3 h-3 text-orange-600 flex-shrink-0" />
        <span className="font-medium text-xs">Smart Deals - Airtime and Data</span>
      </Link>
      
      <Link to="/deals" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 min-h-[32px] touch-manipulation" onClick={toggleMenu}>
        <Zap className="w-3 h-3 text-blue-600 flex-shrink-0" />
        <span className="font-medium text-xs">Smart Deals Hub</span>
      </Link>
      <Link to="/whatsapp-assistant" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 min-h-[32px] touch-manipulation" onClick={toggleMenu}>
        <MessageCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
        <span className="font-medium text-xs">WhatsApp Business</span>
      </Link>
      
      <Link to="/scan-to-text-ai" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 min-h-[32px] touch-manipulation" onClick={toggleMenu}>
        <Scan className="w-3 h-3 text-purple-600 flex-shrink-0" />
        <span className="font-medium text-xs">AI Document Scanner</span>
      </Link>
    </div>
  );
};

export default MobileMenuNavigation;
