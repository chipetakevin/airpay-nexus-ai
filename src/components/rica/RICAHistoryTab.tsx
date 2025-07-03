import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  XCircle, 
  Download,
  Eye,
  Phone,
  User,
  Shield
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import { useToast } from '@/hooks/use-toast';

interface RICARegistration {
  id: string;
  reference_number: string;
  full_name: string;
  mobile_number: string;
  registration_status: string;
  created_at: string;
  completed_at?: string;
  user_type: string;
}

const RICAHistoryTab = () => {
  const { currentUser, isAuthenticated, userType } = useMobileAuth();
  const { toast } = useToast();
  const [registrations, setRegistrations] = useState<RICARegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('own');

  useEffect(() => {
    if (isAuthenticated) {
      loadRegistrations();
    }
  }, [isAuthenticated, currentUser, selectedTab]);

  const loadRegistrations = async () => {
    if (!currentUser) return;

    setLoading(true);
    try {
      let query = supabase
        .from('rica_registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (selectedTab === 'own' || userType !== 'admin') {
        query = query.eq('user_id', currentUser.id);
      }

      const { data, error } = await query;

      if (error) throw error;
      setRegistrations(data || []);
    } catch (error) {
      console.error('Error loading registrations:', error);
      toast({
        title: "Error Loading History",
        description: "Failed to load RICA registration history.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-amber-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Approved & Active';
      case 'processing':
        return 'Under Review';
      case 'pending':
        return 'Submitted';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  const getUserTypeIcon = (type: string) => {
    switch (type) {
      case 'admin':
        return <Shield className="w-4 h-4 text-purple-600" />;
      case 'vendor':
        return <User className="w-4 h-4 text-blue-600" />;
      case 'customer':
        return <User className="w-4 h-4 text-green-600" />;
      default:
        return <User className="w-4 h-4 text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            RICA Registration History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userType === 'admin' && (
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="own">My Registrations</TabsTrigger>
                <TabsTrigger value="all">All Registrations</TabsTrigger>
              </TabsList>
            </Tabs>
          )}

          {registrations.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Registrations Found</h3>
              <p className="text-gray-600">
                {selectedTab === 'all' ? 'No RICA registrations have been submitted yet.' : 'You haven\'t submitted any RICA registrations yet.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {registrations.map((registration) => (
                <Card key={registration.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getUserTypeIcon(registration.user_type)}
                          <h4 className="font-semibold text-gray-900">
                            {registration.full_name}
                          </h4>
                          <Badge className={`${getStatusColor(registration.registration_status)} text-xs`}>
                            {getStatusIcon(registration.registration_status)}
                            <span className="ml-1">{getStatusLabel(registration.registration_status)}</span>
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Phone className="w-3 h-3" />
                            <span>{registration.mobile_number}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            <span>Submitted: {new Date(registration.created_at).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Ref:</span>
                            <span className="font-mono text-xs">{registration.reference_number}</span>
                          </div>
                          {registration.completed_at && (
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-green-600" />
                              <span>Completed: {new Date(registration.completed_at).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        <Button size="sm" variant="outline" className="h-8 text-xs">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        {registration.registration_status === 'approved' && (
                          <Button size="sm" variant="outline" className="h-8 text-xs">
                            <Download className="w-3 h-3 mr-1" />
                            Certificate
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Status specific information */}
                    {registration.registration_status === 'approved' && (
                      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 text-green-800">
                          <CheckCircle className="w-4 h-4" />
                          <span className="font-medium">SIM Card Active & RICA Compliant</span>
                        </div>
                        <p className="text-xs text-green-600 mt-1">
                          Your SIM card is fully activated and complies with South African RICA regulations.
                        </p>
                      </div>
                    )}

                    {registration.registration_status === 'processing' && (
                      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center gap-2 text-blue-800">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">Under Review (24-48 hours)</span>
                        </div>
                        <p className="text-xs text-blue-600 mt-1">
                          Our team is verifying your documents and information.
                        </p>
                      </div>
                    )}

                    {registration.registration_status === 'rejected' && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-2 text-red-800">
                          <XCircle className="w-4 h-4" />
                          <span className="font-medium">Registration Rejected</span>
                        </div>
                        <p className="text-xs text-red-600 mt-1">
                          Please contact support for assistance or submit a new registration.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RICAHistoryTab;