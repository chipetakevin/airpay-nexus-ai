
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Crown, Zap, Brain, MessageCircle, Scan, ShoppingCart, Terminal, 
  Settings, FileCheck, LogOut
} from 'lucide-react';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { useToast } from '@/hooks/use-toast';

const NavigationMenu = () => {
  const { isAuthenticated } = useMobileAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('userAuthenticated');
    localStorage.removeItem('userCredentials');
    
    toast({
      title: "Logged Out Successfully",
      description: "Your account information has been saved for future logins.",
      duration: 3000,
    });
    
    window.location.href = '/';
  };

  return (
    <nav className="hidden md:flex items-center space-x-6">
      {/* Services Dropdown */}
      <div className="relative group">
        <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
          <span>Services</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="p-2">
            <div className="relative group/submenu">
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group cursor-pointer">
                <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg">
                  <Crown className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 group-hover:text-blue-600">Divinely BaaS Platform</div>
                  <div className="text-xs text-gray-500">AI-Powered Backend Services</div>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="absolute top-0 left-full ml-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transition-all duration-200">
                <div className="p-2">
                  <Link to="/devine-baas" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Brain className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-blue-600">Main Platform</div>
                      <div className="text-xs text-gray-500">Full BaaS dashboard & services</div>
                    </div>
                  </Link>
                  <Link to="/devine-baas" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <FileCheck className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-blue-600">Mobile Porting & RICA</div>
                      <div className="text-xs text-gray-500">SIM porting & RICA registration</div>
                    </div>
                  </Link>
                  <Link to="/baas-platform" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Brain className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-blue-600">Mobile Divinely BaaS Portal</div>
                      <div className="text-xs text-gray-500">Advanced BaaS management portal</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <Link to="/portal?tab=onecard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Zap className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900 group-hover:text-blue-600">Smart Deals Portal</div>
                <div className="text-xs text-gray-500">Exclusive airtime & data deals</div>
              </div>
            </Link>
            <Link to="/whatsapp-assistant" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
              <div className="p-2 bg-green-100 rounded-lg">
                <MessageCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900 group-hover:text-blue-600">WhatsApp Business</div>
                <div className="text-xs text-gray-500">AI-powered business assistant</div>
              </div>
            </Link>
            {/* Logout Option - Only show if authenticated */}
            {isAuthenticated && (
              <>
                <div className="border-t border-gray-200 my-2"></div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors group w-full text-left"
                >
                  <div className="p-2 bg-red-100 rounded-lg">
                    <LogOut className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="pt-1">
                    <div className="font-medium text-gray-900 group-hover:text-red-600">Logout</div>
                    <div className="text-xs text-gray-500">Sign out of your account</div>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Platforms Dropdown */}
      <div className="relative group">
        <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
          <span>Platforms</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="p-2">
            <Link to="/scan-to-text-ai" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Scan className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900 group-hover:text-blue-600">AI Document Scanner</div>
                <div className="text-xs text-gray-500">Intelligent text extraction</div>
              </div>
            </Link>
            <Link to="/baas-platform" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Brain className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900 group-hover:text-blue-600">BaaS Platform</div>
                <div className="text-xs text-gray-500">Backend-as-a-Service</div>
              </div>
            </Link>
            <Link to="/ussd-system" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Terminal className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900 group-hover:text-blue-600">USSD System</div>
                <div className="text-xs text-gray-500">Mobile service codes</div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Dashboards Dropdown */}
      <div className="relative group">
        <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
          <span>Dashboards</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="p-2">
            <Link to="/master-dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
              <div className="p-2 bg-red-100 rounded-lg">
                <Settings className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900 group-hover:text-blue-600">Master Dashboard</div>
                <div className="text-xs text-gray-500">System overview & control</div>
              </div>
            </Link>
            <Link to="/platform-dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
              <div className="p-2 bg-green-100 rounded-lg">
                <Brain className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900 group-hover:text-blue-600">Platform Dashboard</div>
                <div className="text-xs text-gray-500">Analytics & insights</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;
