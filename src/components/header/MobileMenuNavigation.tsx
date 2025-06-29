
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Crown, Zap, Brain, Scan, FileCheck, Flame, Database, Sparkles, Globe
} from 'lucide-react';

interface MobileMenuNavigationProps {
  toggleMenu: () => void;
}

const MobileMenuNavigation = ({ toggleMenu }: MobileMenuNavigationProps) => {
  return (
    <div className="space-y-0">
      {/* Main Portal Access */}
      <Link to="/portal" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 min-h-[32px] touch-manipulation" onClick={toggleMenu}>
        <Crown className="w-3 h-3 text-blue-600 flex-shrink-0" />
        <span className="font-medium text-xs">Portal Dashboard</span>
      </Link>

      {/* Smart Deals - Consolidated */}
      <Link to="/portal?tab=deals" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-orange-50 active:bg-orange-100 transition-all duration-200 min-h-[32px] touch-manipulation" onClick={toggleMenu}>
        <Flame className="w-3 h-3 text-orange-600 flex-shrink-0" />
        <span className="font-medium text-xs">Smart Deals - Airtime & Data</span>
      </Link>
      
      {/* BaaS Platform Services */}
      <div className="ml-2 space-y-0 border-l-2 border-gray-200 pl-2">
        <Link to="/devine-baas" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-purple-50 active:bg-purple-100 transition-all duration-200 min-h-[32px] touch-manipulation" onClick={toggleMenu}>
          <Globe className="w-3 h-3 text-purple-600 flex-shrink-0" />
          <span className="font-medium text-xs">Divinely BaaS Platform</span>
        </Link>
        <Link to="/baas-platform" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-cyan-50 active:bg-cyan-100 transition-all duration-200 min-h-[32px] touch-manipulation" onClick={toggleMenu}>
          <Database className="w-3 h-3 text-cyan-600 flex-shrink-0" />
          <span className="font-medium text-xs">BaaS Portal Access</span>
        </Link>
        <Link to="/platform-dashboard" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-green-50 active:bg-green-100 transition-all duration-200 min-h-[32px] touch-manipulation" onClick={toggleMenu}>
          <Sparkles className="w-3 h-3 text-green-600 flex-shrink-0" />
          <span className="font-medium text-xs">Platform Dashboard</span>
        </Link>
      </div>

      {/* Mobile & RICA Services */}
      <Link to="/devine-baas" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 min-h-[32px] touch-manipulation" onClick={toggleMenu}>
        <FileCheck className="w-3 h-3 text-blue-600 flex-shrink-0" />
        <span className="font-medium text-xs">Mobile Porting & RICA</span>
      </Link>
      
      {/* AI & Assistant Services - WhatsApp Business Assistant removed */}
      <Link to="/scan-to-text-ai" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-purple-50 active:bg-purple-100 transition-all duration-200 min-h-[32px] touch-manipulation" onClick={toggleMenu}>
        <Scan className="w-3 h-3 text-purple-600 flex-shrink-0" />
        <span className="font-medium text-xs">AI Document Scanner</span>
      </Link>

      <Link to="/spaza-ai" className="flex items-center gap-2 p-1.5 rounded-md hover:bg-orange-50 active:bg-orange-100 transition-all duration-200 min-h-[32px] touch-manipulation" onClick={toggleMenu}>
        <Brain className="w-3 h-3 text-orange-600 flex-shrink-0" />
        <span className="font-medium text-xs">Spaza AI Assistant</span>
      </Link>
    </div>
  );
};

export default MobileMenuNavigation;
