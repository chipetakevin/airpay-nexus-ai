import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { User, CreditCard, MapPin, Shield, Building, Users, UserCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import BankCardManager from '@/components/banking/BankCardManager';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  user_type: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  physical_address?: string;
  business_name?: string;
  verification_status?: string;
  rica_status?: string;
  kyc_status?: string;
  created_at: string;
}

interface UserProfileCardProps {
  userId: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ userId }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('comprehensive_user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        // If no profile exists, create a basic one
        if (error.code === 'PGRST116') {
          const { data: authUser } = await supabase.auth.getUser();
          if (authUser.user) {
            const newProfile = {
              user_id: userId,
              user_type: 'customer',
              email: authUser.user.email,
              verification_status: 'pending',
              rica_status: 'pending',
              kyc_status: 'pending'
            };

            const { data: created, error: createError } = await supabase
              .from('comprehensive_user_profiles')
              .insert([newProfile])
              .select()
              .single();

            if (createError) throw createError;
            setProfile(created);
          }
        } else {
          throw error;
        }
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to load user profile",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getUserTypeIcon = (userType: string) => {
    switch (userType) {
      case 'admin':
        return <Shield className="w-5 h-5" />;
      case 'vendor':
        return <Building className="w-5 h-5" />;
      case 'field_worker':
        return <Users className="w-5 h-5" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };

  const getUserTypeBadgeColor = (userType: string) => {
    switch (userType) {
      case 'admin':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'vendor':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'field_worker':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-300';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'verified':
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">Profile not found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getUserTypeIcon(profile.user_type)}
              <div>
                <CardTitle className="text-xl">
                  {profile.full_name || profile.first_name || profile.business_name || 'User Profile'}
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  {profile.email}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Badge className={getUserTypeBadgeColor(profile.user_type)}>
                {profile.user_type.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Verification Status</p>
                <Badge className={getStatusBadgeColor(profile.verification_status || 'pending')}>
                  {profile.verification_status || 'Pending'}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">RICA Status</p>
                <Badge className={getStatusBadgeColor(profile.rica_status || 'pending')}>
                  {profile.rica_status || 'Pending'}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">KYC Status</p>
                <Badge className={getStatusBadgeColor(profile.kyc_status || 'pending')}>
                  {profile.kyc_status || 'Pending'}
                </Badge>
              </div>
            </div>
          </div>

          {profile.phone && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-gray-600">
                <strong>Phone:</strong> {profile.phone}
              </p>
            </div>
          )}
          
          {profile.physical_address && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                {profile.physical_address}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs defaultValue="banking" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="banking" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Bank Cards
          </TabsTrigger>
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="banking" className="mt-6">
          <BankCardManager userId={userId} userType={profile.user_type} />
        </TabsContent>

        <TabsContent value="personal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.user_type === 'vendor' && profile.business_name && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Business Name</label>
                  <p className="text-gray-900">{profile.business_name}</p>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.first_name && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    <p className="text-gray-900">{profile.first_name}</p>
                  </div>
                )}
                
                {profile.last_name && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    <p className="text-gray-900">{profile.last_name}</p>
                  </div>
                )}
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <p className="text-gray-900">{profile.email}</p>
              </div>
              
              {profile.phone && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <p className="text-gray-900">{profile.phone}</p>
                </div>
              )}
              
              {profile.physical_address && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Physical Address</label>
                  <p className="text-gray-900">{profile.physical_address}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <UserCheck className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium">Identity Verification</h3>
                  </div>
                  <Badge className={getStatusBadgeColor(profile.verification_status || 'pending')}>
                    {profile.verification_status || 'Pending'}
                  </Badge>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <h3 className="font-medium">RICA Compliance</h3>
                  </div>
                  <Badge className={getStatusBadgeColor(profile.rica_status || 'pending')}>
                    {profile.rica_status || 'Pending'}
                  </Badge>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <UserCheck className="w-5 h-5 text-purple-600" />
                    <h3 className="font-medium">KYC Status</h3>
                  </div>
                  <Badge className={getStatusBadgeColor(profile.kyc_status || 'pending')}>
                    {profile.kyc_status || 'Pending'}
                  </Badge>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800 mb-2">Data Protection</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• All personal data encrypted with AES-256 encryption</li>
                      <li>• Banking information stored with PCI DSS compliance</li>
                      <li>• POPIA compliant data processing and storage</li>
                      <li>• Regular security audits and monitoring</li>
                      <li>• Automated key rotation for enhanced security</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfileCard;