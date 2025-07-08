import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  Smartphone,
  CheckCircle,
  AlertCircle,
  Clock,
  Search,
  Filter,
  RefreshCw,
  Send,
  MessageSquare,
  Globe,
  Users,
  Activity,
  Shield,
  FileCheck,
  Phone
} from 'lucide-react';

interface SIMActivationRequest {
  id: string;
  phone_number: string;
  sim_iccid: string;
  activation_status: string;
  rica_status: string;
  language_preference: string;
  activation_attempts: number;
  created_at: string;
  last_attempt_at: string | null;
  error_message: string | null;
  metadata?: any;
}

interface UserPreference {
  id: string;
  phone_number: string;
  preferred_language: string;
  is_opted_in: boolean;
  activation_status: string;
  rica_status: string;
  sim_iccid: string;
  last_interaction_at: string;
}

const SIMActivationManager = () => {
  const { toast } = useToast();
  const [activationRequests, setActivationRequests] = useState<SIMActivationRequest[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreference[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchActivationRequests();
    fetchUserPreferences();
  }, []);

  const fetchActivationRequests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('sim_activation_requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setActivationRequests(data || []);
    } catch (error) {
      console.error('Error fetching activation requests:', error);
      toast({
        title: "Error",
        description: "Failed to fetch activation requests.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPreferences = async () => {
    try {
      const { data, error } = await supabase
        .from('ussd_user_preferences')
        .select('*')
        .order('last_interaction_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setUserPreferences(data || []);
    } catch (error) {
      console.error('Error fetching user preferences:', error);
    }
  };

  const sendActivationUSSD = async (phoneNumber: string, language: string = 'en') => {
    try {
      // Validation: Check if phone number is valid
      if (!/^\+?[1-9]\d{10,14}$/.test(phoneNumber.replace(/\s/g, ''))) {
        toast({
          title: "Invalid Phone Number",
          description: "Please provide a valid phone number.",
          variant: "destructive"
        });
        return;
      }

      // Send USSD with confirmation flow
      const { error } = await supabase.functions.invoke('notify-sim-activation', {
        body: {
          phone_number: phoneNumber,
          language: language,
          activation_type: 'ussd_push',
          message_template: {
            [language]: `Welcome to Divine Mobile! Press 1 to activate your SIM, 2 to cancel. Press 9 for other languages.`
          },
          requires_confirmation: true
        }
      });

      if (error) throw error;

      // Log compliance activity
      await supabase.from('ussd_notification_logs').insert({
        phone_number: phoneNumber,
        message_type: 'ussd',
        message_content: `SIM activation prompt sent in ${getLanguageDisplay(language)}`,
        language_used: language,
        delivery_status: 'sent',
        metadata: {
          activation_type: 'ussd_push',
          requires_confirmation: true,
          compliance_checked: true
        }
      });

      // Update the activation attempt with enhanced tracking
      const currentRequest = activationRequests.find(req => req.phone_number === phoneNumber);
      await supabase
        .from('sim_activation_requests')
        .update({
          activation_attempts: (currentRequest?.activation_attempts || 0) + 1,
          last_attempt_at: new Date().toISOString(),
          language_preference: language,
          metadata: {
            ...currentRequest?.metadata,
            last_ussd_sent: new Date().toISOString(),
            confirmation_required: true,
            compliance_verified: true
          }
        })
        .eq('phone_number', phoneNumber);

      await fetchActivationRequests();

      toast({
        title: "USSD Sent",
        description: `Activation USSD with confirmation prompt sent to ${phoneNumber} in ${getLanguageDisplay(language)}`,
      });
    } catch (error) {
      console.error('Error sending USSD:', error);
      
      // Log error for compliance
      await supabase.from('ussd_notification_logs').insert({
        phone_number: phoneNumber,
        message_type: 'ussd',
        message_content: 'Failed to send activation USSD',
        language_used: language,
        delivery_status: 'failed',
        error_message: error.message,
        metadata: { error_type: 'ussd_send_failure' }
      });

      toast({
        title: "Error",
        description: "Failed to send activation USSD. Error logged for review.",
        variant: "destructive"
      });
    }
  };

  const sendBulkActivationUSSD = async () => {
    const pendingRequests = activationRequests.filter(req => 
      req.activation_status === 'initiated' || req.activation_status === 'failed'
    );

    if (pendingRequests.length === 0) {
      toast({
        title: "No Pending Requests",
        description: "No pending activation requests found.",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      
      // Process in batches of 10 for better performance
      const batchSize = 10;
      for (let i = 0; i < pendingRequests.length; i += batchSize) {
        const batch = pendingRequests.slice(i, i + batchSize);
        
        await Promise.all(
          batch.map(request => 
            sendActivationUSSD(request.phone_number, request.language_preference)
          )
        );

        // Add delay between batches to avoid overwhelming the system
        if (i + batchSize < pendingRequests.length) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      toast({
        title: "Bulk USSD Sent",
        description: `Activation USSD sent to ${pendingRequests.length} users`,
      });
    } catch (error) {
      console.error('Error sending bulk USSD:', error);
      toast({
        title: "Error",
        description: "Failed to send bulk activation USSD.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'failed': return 'bg-red-500';
      case 'initiated': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getRicaStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'verified': return 'bg-emerald-500';
      case 'pending': return 'bg-yellow-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredRequests = activationRequests.filter(request => {
    const matchesSearch = request.phone_number.includes(searchTerm) || 
                         request.sim_iccid.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || request.activation_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getLanguageDisplay = (code: string) => {
    const languages: Record<string, string> = {
      'en': 'English',
      'zu': 'isiZulu',
      'xh': 'isiXhosa',
      'af': 'Afrikaans',
      'st': 'Sesotho',
      'tn': 'Setswana',
      'nso': 'Sepedi',
      'ts': 'Xitsonga',
      've': 'Tshivenda',
      'nr': 'isiNdebele'
    };
    return languages[code] || code;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-xl p-4 md:p-6 border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold">SIM Activation Manager</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Monitor and manage SIM activations with USSD notifications
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white/50 rounded-lg p-3 text-center">
            <div className="font-bold text-lg text-green-600">
              {activationRequests.filter(r => r.activation_status === 'completed').length}
            </div>
            <div className="text-muted-foreground">Completed</div>
          </div>
          <div className="bg-white/50 rounded-lg p-3 text-center">
            <div className="font-bold text-lg text-blue-600">
              {activationRequests.filter(r => r.activation_status === 'in_progress').length}
            </div>
            <div className="text-muted-foreground">In Progress</div>
          </div>
          <div className="bg-white/50 rounded-lg p-3 text-center">
            <div className="font-bold text-lg text-yellow-600">
              {activationRequests.filter(r => r.activation_status === 'initiated').length}
            </div>
            <div className="text-muted-foreground">Pending</div>
          </div>
          <div className="bg-white/50 rounded-lg p-3 text-center">
            <div className="font-bold text-lg text-red-600">
              {activationRequests.filter(r => r.activation_status === 'failed').length}
            </div>
            <div className="text-muted-foreground">Failed</div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Activation Requests
            </CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button 
                onClick={sendBulkActivationUSSD}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Bulk USSD
              </Button>
              <Button 
                onClick={fetchActivationRequests}
                variant="outline"
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by phone number or SIM ICCID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="initiated">Initiated</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Activation Requests List */}
          <div className="space-y-4">
            {filteredRequests.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Smartphone className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No activation requests found.</p>
              </div>
            ) : (
              filteredRequests.map((request) => (
                <div 
                  key={request.id} 
                  className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-blue-500" />
                        <span className="font-mono font-medium">{request.phone_number}</span>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={`text-white ${getStatusColor(request.activation_status)}`}
                      >
                        {request.activation_status}
                      </Badge>
                      <Badge 
                        variant="secondary" 
                        className={`text-white ${getRicaStatusColor(request.rica_status)}`}
                      >
                        RICA: {request.rica_status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        <span>SIM: {request.sim_iccid.slice(-8)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        <span>{getLanguageDisplay(request.language_preference)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        <span>{request.activation_attempts} attempts</span>
                      </div>
                    </div>
                    
                    {request.error_message && (
                      <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                        <AlertCircle className="w-4 h-4 inline mr-1" />
                        {request.error_message}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => sendActivationUSSD(request.phone_number, request.language_preference)}
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Send USSD
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* User Preferences Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            User Preferences Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Opted In Users</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {userPreferences.filter(u => u.is_opted_in).length}
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium">Active SIMs</span>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {userPreferences.filter(u => u.activation_status === 'completed').length}
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FileCheck className="w-5 h-5 text-yellow-600" />
                <span className="font-medium">RICA Pending</span>
              </div>
              <div className="text-2xl font-bold text-yellow-600">
                {userPreferences.filter(u => u.rica_status === 'pending').length}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SIMActivationManager;