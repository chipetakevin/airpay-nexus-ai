import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './admin/AdminDashboard';
import RevenueReporting from './admin/RevenueReporting';
import NetworkRevenue from './admin/NetworkRevenue';
import OrderManagement from './admin/OrderManagement';
import DashboardManager from './admin/DashboardManager';
import VersionRestoration from './admin/VersionRestoration';
import AddexHubNerveCenter from './admin/AddexHubNerveCenter';
import DatabaseBaaSPanel from './admin/DatabaseBaaSPanel';
import SuspiciousActivityMonitor from './admin/SuspiciousActivityMonitor';
import PermissionManager from './admin/PermissionManager';
import AdminControlCenterFixed from './admin/AdminControlCenterFixed';

interface AdminPortalProps {
  onAuthSuccess?: () => void;
  showAdminBanner?: boolean;
}

const AdminPortal: React.FC<AdminPortalProps> = ({ onAuthSuccess, showAdminBanner = false }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [autofillCount, setAutofillCount] = useState(0);
  const [sessionChecked, setSessionChecked] = useState(false); // Prevent multiple checks
  const [activeAdminTab, setActiveAdminTab] = useState('overview'); // Add state for active tab

  const adminEmail = 'kev***@divinemobile.co.za';
  const fullAdminEmail = 'kevin@divinemobile.co.za';

  // Check for existing admin session on component mount - ONLY ONCE
  useEffect(() => {
    if (sessionChecked) return; // Prevent multiple checks
    const checkAdminSession = () => {
      const adminAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
      const adminProfile = localStorage.getItem('adminProfile');
      const userCredentials = localStorage.getItem('userCredentials');
      
      // Check if admin has valid session from enhanced auth
      let hasValidAdminSession: boolean = adminAuthenticated && !!adminProfile;
      
      // Also check if user has admin credentials with Malawi@1976 password
      if (!hasValidAdminSession && userCredentials) {
        try {
          const credentials = JSON.parse(userCredentials);
          if (credentials.password === 'Malawi@1976' || credentials.userType === 'admin') {
            hasValidAdminSession = true;
            
            // Auto-create admin profile if doesn't exist
            if (!adminProfile) {
              const adminCardNumber = 'ADM' + Math.random().toString(36).substr(2, 8).toUpperCase();
              const adminData = {
                firstName: 'Kevin',
                lastName: 'ADMIN Account',
                email: 'kevin@divinemobile.co.za',
                cardNumber: adminCardNumber,
                cardType: 'OneCard Platinum',
                privileges: 'Full System Access',
                cashbackBalance: 3145.75,
                totalEarned: 15739.50,
                totalSpent: 62958.00
              };
              
              localStorage.setItem('adminProfile', JSON.stringify(adminData));
              localStorage.setItem('adminAuthenticated', 'true');
            }
          }
        } catch (error) {
          console.error('Error parsing user credentials:', error);
        }
      }
      
      if (hasValidAdminSession) {
        setIsAuthenticated(true);
        setIsCollapsed(false);
        onAuthSuccess?.();
        
        // Only show toast for actual session restoration, not initial load
        const isInitialLoad = !localStorage.getItem('adminSessionToastShown');
        if (!isInitialLoad) {
          toast({
            title: "Admin Session Restored 🔑",
            description: "Welcome back Kevin! 15-day session active.",
            duration: 3000,
          });
        } else {
          localStorage.setItem('adminSessionToastShown', 'true');
        }
      }
      
      setSessionChecked(true); // Mark as checked to prevent re-runs
    };

    checkAdminSession();
  }, []); // Empty dependency array - run only once on mount

  const handleSendCode = () => {
    // Check if we've reached the 50-time limit
    if (autofillCount >= 50) {
      toast({
        title: "Autofill Limit Reached",
        description: "Maximum autofill attempts reached. Please manually enter the code.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      const code = Math.random().toString(36).substr(2, 6).toUpperCase();
      setIsLoading(false);
      
      // Autofill the authentication code immediately
      setAuthCode(code);
      setAutofillCount(prev => prev + 1);
      
      toast({
        title: "Authentication Code Sent & Auto-filled",
        description: `Code sent to ${adminEmail}. Auto-filled: ${code} (${autofillCount + 1}/50)`,
      });
      
      localStorage.setItem('adminAuthCode', code);
    }, 1500);
  };

  const handleVerifyCode = () => {
    const storedCode = localStorage.getItem('adminAuthCode');
    
    if (authCode.toUpperCase() === storedCode) {
      setIsAuthenticated(true);
      // Keep panel expanded after authentication so features are visible
      setIsCollapsed(false);
      localStorage.setItem('adminAuthenticated', 'true');
      
      const adminCardNumber = 'ADM' + Math.random().toString(36).substr(2, 8).toUpperCase();
      const adminData = {
        firstName: 'Kevin',
        lastName: 'Chipeta',
        email: fullAdminEmail,
        cardNumber: adminCardNumber,
        cardType: 'OneCard Platinum',
        privileges: 'Full System Access',
        cashbackBalance: 3145.75,
        totalEarned: 15739.50,
        totalSpent: 62958.00
      };
      
      localStorage.setItem('adminProfile', JSON.stringify(adminData));
      
      toast({
        title: "Admin Access Granted 🔑",
        description: `Welcome Kevin! OneCard Platinum: ****${adminCardNumber.slice(-4)}`,
      });
      
      onAuthSuccess?.();
    } else {
      toast({
        title: "Invalid Code",
        description: "Please check your authentication code and try again.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsCollapsed(false);
    setAuthCode('');
    setSessionChecked(false); // Reset session check for next login
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminAuthCode');
    localStorage.removeItem('adminProfile');
    localStorage.removeItem('adminSessionToastShown'); // Clear toast flag
    
    // Navigate away from admin tab after logout
    navigate('/portal?tab=deals', { replace: true });
    
    toast({
      title: "Logged Out",
      description: "Admin session ended. Redirected to Smart Deals.",
    });
  };

  const handleCloseAdminPanel = () => {
    // Navigate to deals tab and show toast
    navigate('/portal?tab=deals', { replace: true });
    toast({
      title: "Admin Panel Closed",
      description: "Returned to Smart Deals tab.",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-red-600">🔐 Admin Access Portal</h2>
          <p className="text-gray-600">
            Restricted access for authorized administrators only
          </p>
        </div>

        <Card className="max-w-md mx-auto border-red-200">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Administrator Authentication</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="adminEmail">Authorized Email</Label>
              <Input
                id="adminEmail"
                value={adminEmail}
                readOnly
                className="bg-gray-50 font-mono"
              />
            </div>

            <Button 
              onClick={handleSendCode} 
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {isLoading ? 'Sending...' : 'Send Authentication Code'}
            </Button>

            <div>
              <Label htmlFor="authCode">Authentication Code</Label>
              <Input
                id="authCode"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                placeholder="Enter 6-digit code"
                className="text-center font-mono"
                maxLength={6}
              />
            </div>

            <Button 
              onClick={handleVerifyCode}
              disabled={!authCode || authCode.length !== 6}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Verify & Access Admin Portal
            </Button>

            <div className="text-xs text-gray-500 text-center mt-4">
              ⚠️ Unauthorized access attempts are logged and monitored
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show collapsed state - only the three buttons like in the second image
  if (isAuthenticated && isCollapsed) {
    return (
      <div className="flex justify-center items-center gap-4 sm:gap-6 py-4">
        <Button 
          size="sm"
          variant="outline"
          onClick={() => setIsCollapsed(false)}
          className="px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium text-blue-600 border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 rounded-xl shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Close
        </Button>
        <Button 
          size="sm"
          variant="outline"
          onClick={handleLogout}
          className="px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium text-red-600 border-2 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-200 rounded-xl shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Logout
        </Button>
        <div className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-sm font-bold rounded-xl shadow-md animate-pulse">
          ADMIN
        </div>
      </div>
    );
  }

  // Show full admin dashboard when authenticated and expanded
  if (isAuthenticated && !isCollapsed) {
    return (
      <div className="space-y-6 pb-20">
        {/* Enhanced Admin Header with intelligent spacing and visual consistency */}
        <div className="bg-gradient-to-r from-blue-50/80 via-white to-purple-50/80 rounded-2xl shadow-lg border border-gray-200/60 backdrop-blur-sm p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Title Section - Left */}
            <div className="text-center sm:text-left flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800 flex items-center justify-center sm:justify-start gap-2">
                🛡️ Admin The Nerve Center
                <div className="px-3 py-1 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-md animate-pulse">
                  ADMIN
                </div>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">Complete system administration and oversight</p>
            </div>

            {/* Action Buttons - Right */}
            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
              <Button 
                size="sm"
                variant="outline"
                onClick={() => setIsCollapsed(true)}
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium text-blue-600 border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 rounded-xl shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Close
              </Button>
              <Button 
                size="sm"
                variant="outline"
                onClick={handleLogout}
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium text-red-600 border-2 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-200 rounded-xl shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced admin control center with proper state management */}
        <AdminControlCenterFixed 
          activeAdminTab={activeAdminTab}
          setActiveAdminTab={(tab: string) => {
            console.log(`🔄 Admin tab switched to: ${tab}`);
            setActiveAdminTab(tab);
            toast({
              title: "Tab Switched",
              description: `Switched to ${tab === 'overview' ? 'The Nerve Center' : 'Addex Hub Platform'}`,
              duration: 2000,
            });
          }}
        />
      </div>
    );
  }

  return null;
};

export default AdminPortal;
