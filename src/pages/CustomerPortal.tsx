import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  User, 
  CreditCard, 
  Smartphone, 
  Settings, 
  LogOut, 
  Bell,
  TrendingUp,
  Wifi,
  DollarSign,
  FileText,
  Shield,
  Phone,
  MessageSquare,
  Plus,
  Eye,
  Download,
  AlertCircle
} from 'lucide-react';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

interface CustomerProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string | null;
  gender: string | null;
  nationality: string;
  email: string;
  phone: string;
  alternative_phone: string | null;
  id_number: string;
  id_type: string;
  passport_number: string | null;
  passport_country: string | null;
  physical_address: string;
  postal_address: string | null;
  city: string;
  province: string;
  postal_code: string;
  country: string;
  rica_status: string;
  rica_reference_number: string | null;
  rica_verified_at: string | null;
  rica_expires_at: string | null;
  kyc_status: string;
  kyc_verified_at: string | null;
  verification_level: string;
  id_document_url: string | null;
  proof_of_address_url: string | null;
  selfie_url: string | null;
  additional_documents: any[];
  biometric_data_hash: string | null;
  security_questions: any[];
  two_factor_enabled: boolean;
  account_status: string;
  preferred_language: string;
  marketing_consent: boolean;
  sms_consent: boolean;
  email_consent: boolean;
  primary_network: string | null;
  service_preferences: Record<string, any>;
  usage_limits: Record<string, any>;
  credit_limit: number;
  outstanding_balance: number;
  payment_method_id: string | null;
  onecard_number: string | null;
  cashback_balance: number;
  total_cashback_earned: number;
  aml_status: string;
  risk_score: number;
  compliance_notes: string | null;
  onboarding_completed: boolean;
  onboarding_step: number;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

const CustomerPortal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Initialize auth state and load profile
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate('/customer-auth');
      }
    });

    // Check for existing session and load profile
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        loadCustomerProfile(session.user.id);
      } else {
        navigate('/customer-auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadCustomerProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('customer_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error loading profile:', error);
        toast({
          title: "Profile Error",
          description: "Unable to load your profile. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setProfile(data as unknown as CustomerProfile);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      navigate('/customer-auth');
    } catch (error) {
      toast({
        title: "Logout Error",
        description: "There was an error logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getVerificationStatus = () => {
    if (!profile) return { status: 'pending', color: 'bg-gray-500', text: 'Loading...' };
    
    if (profile.rica_status === 'verified' && profile.kyc_status === 'verified') {
      return { status: 'verified', color: 'bg-green-500', text: 'Verified' };
    } else if (profile.rica_status === 'in_progress' || profile.kyc_status === 'in_progress') {
      return { status: 'in_progress', color: 'bg-yellow-500', text: 'In Progress' };
    } else {
      return { status: 'pending', color: 'bg-orange-500', text: 'Verification Required' };
    }
  };

  const getOnboardingProgress = () => {
    if (!profile) return 0;
    return Math.min((profile.onboarding_step / 5) * 100, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your portal...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Profile Not Found</h2>
            <p className="text-gray-600 mb-4">We couldn't load your customer profile.</p>
            <Button onClick={() => navigate('/customer-auth')} variant="outline">
              Return to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const verificationStatus = getVerificationStatus();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Divine Mobile</h1>
                <p className="text-sm text-gray-600">Customer Portal</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {profile.first_name} {profile.last_name}
                </span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="onecard">OneCard</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Welcome Section */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Welcome back, {profile.first_name}!
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Here's your account overview
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className={`${verificationStatus.color} text-white`}>
                      {verificationStatus.text}
                    </Badge>
                    <p className="text-sm text-gray-500 mt-1">Account Status</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">OneCard Balance</p>
                      <p className="text-2xl font-bold text-green-600">
                        R{profile.cashback_balance.toFixed(2)}
                      </p>
                    </div>
                    <CreditCard className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Outstanding Balance</p>
                      <p className="text-2xl font-bold text-red-600">
                        R{profile.outstanding_balance.toFixed(2)}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Primary Network</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {profile.primary_network || 'Not Set'}
                      </p>
                    </div>
                    <Wifi className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Onboarding Progress */}
            {!profile.onboarding_completed && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Complete Your Setup
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Setup Progress</span>
                        <span>{Math.round(getOnboardingProgress())}%</span>
                      </div>
                      <Progress value={getOnboardingProgress()} className="w-full" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline">
                        <Shield className="w-4 h-4 mr-2" />
                        Complete RICA
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        Upload Documents
                      </Button>
                      <Button size="sm" variant="outline">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Setup Payment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-16 flex-col">
                    <Plus className="w-6 h-6 mb-2" />
                    Top Up
                  </Button>
                  <Button variant="outline" className="h-16 flex-col">
                    <Smartphone className="w-6 h-6 mb-2" />
                    Buy Data
                  </Button>
                  <Button variant="outline" className="h-16 flex-col">
                    <MessageSquare className="w-6 h-6 mb-2" />
                    Support
                  </Button>
                  <Button variant="outline" className="h-16 flex-col">
                    <FileText className="w-6 h-6 mb-2" />
                    Statements
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Airtime Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Manage your airtime and voice services</p>
                  <Button className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Buy Airtime
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Purchase data bundles and manage usage</p>
                  <Button className="w-full">
                    <Wifi className="w-4 h-4 mr-2" />
                    Buy Data
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* OneCard Tab */}
          <TabsContent value="onecard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-yellow-600" />
                  OneCard Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">OneCard Number</p>
                    <p className="text-lg font-mono">{profile.onecard_number}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Current Balance</p>
                      <p className="text-2xl font-bold text-green-600">
                        R{profile.cashback_balance.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Earned</p>
                      <p className="text-2xl font-bold text-blue-600">
                        R{profile.total_cashback_earned.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">View your billing history and manage payments</p>
                <div className="mt-4 space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="w-4 h-4 mr-2" />
                    View Statements
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Download Receipts
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Payment Methods
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-6 h-6" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">First Name</p>
                      <p className="font-medium">{profile.first_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Last Name</p>
                      <p className="font-medium">{profile.last_name}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone Number</p>
                    <p className="font-medium">{profile.phone}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">RICA Status</p>
                      <Badge variant="outline">{profile.rica_status}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">KYC Status</p>
                      <Badge variant="outline">{profile.kyc_status}</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerPortal;