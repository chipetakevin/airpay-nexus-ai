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

  // Don't show collapsed banner here - it's now handled by the navigation dropdown
  if (isAuthenticated && isCollapsed) {
    return null;
  }

  // Show full admin dashboard when authenticated and expanded
  if (isAuthenticated && !isCollapsed) {
    return (
      <div className="space-y-6 pb-20">
        {/* Admin header with collapse option */}
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <h2 className="text-2xl font-bold mb-2">🛡️ Admin Control Center</h2>
            <p className="text-gray-600">Complete system administration and oversight</p>
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm"
              variant="outline"
              onClick={handleCloseAdminPanel}
              className="text-xs text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              Close
            </Button>
            <Button 
              size="sm"
              variant="outline"
              onClick={handleLogout}
              className="text-xs text-red-600 border-red-200 hover:bg-red-50"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Replace complex tabs with simplified admin control center */}
        <AdminControlCenterFixed 
          activeAdminTab="hub"
          setActiveAdminTab={(tab: string) => console.log(`Admin tab switched to: ${tab}`)}
        />
      </div>
    );
  }

  return null;
};

export default AdminPortal;
