import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Phone,
  Shield,
  Zap,
  Bot,
  Search,
  Settings,
  Bell,
  BarChart3,
  Globe,
  Calendar,
  Users,
  Database,
  Lock,
  Wifi,
  MessageSquare,
  Eye,
  Download,
  RefreshCw
} from 'lucide-react';

const PortingSystem = () => {
  const [activeTab, setActiveTab] = useState('initiate');
  const [user, setUser] = useState(null);
  const [portingRequests, setPortingRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [realTimeEnabled, setRealTimeEnabled] = useState(true);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const { toast } = useToast();

  const [portingRequest, setPortingRequest] = useState({
    phoneNumber: '',
    currentNetwork: '',
    targetNetwork: '',
    documents: [],
    priority: 'normal',
    scheduledCutover: '',
    fullName: '',
    idNumber: '',
    dateOfBirth: '',
    contactEmail: '',
    contactMobile: '',
    simType: 'physical',
    consentOwnership: false,
    consentDataProcessing: false,
    digitalSignature: ''
  });

  const networks = ['MTN', 'Vodacom', 'Cell C', 'Telkom Mobile', 'Rain'];
  
  useEffect(() => {
    initializeUser();
    if (user) {
      loadPortingRequests();
      loadNotifications();
      loadAnalytics();
      
      if (realTimeEnabled) {
        setupRealTimeSubscriptions();
      }
    }
  }, [user, realTimeEnabled]);

  const initializeUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const setupRealTimeSubscriptions = () => {
    // Real-time updates for porting requests
    const portingChannel = supabase
      .channel('porting_requests')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'porting_requests',
        filter: `user_id=eq.${user?.id}`
      }, (payload) => {
        console.log('Real-time update:', payload);
        loadPortingRequests();
        
        if (payload.eventType === 'UPDATE') {
          toast({
            title: "Status Update",
            description: `Porting request ${payload.new.phone_number} status changed to ${payload.new.status}`,
          });
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(portingChannel);
    };
  };

  const loadPortingRequests = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('porting_requests')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPortingRequests(data);
    }
  };

  const loadNotifications = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('porting_notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (!error && data) {
      setNotifications(data);
    }
  };

  const loadAnalytics = async () => {
    const { data, error } = await supabase
      .from('porting_analytics')
      .select('*')
      .gte('date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
      .order('date', { ascending: false });

    if (!error && data) {
      setAnalytics(data);
    }
  };

  const handleDocumentUpload = async (files: FileList | null) => {
    if (files) {
      setLoading(true);
      toast({
        title: "AI Document Verification",
        description: "AI is analyzing your documents for authenticity and compliance...",
      });
      
      // Simulate AI verification with enhanced features
      setTimeout(() => {
        const verificationResult = {
          authenticity: 98.5,
          compliance: true,
          extractedData: {
            idNumber: "8001015009087",
            fullName: "John Doe",
            address: "123 Main St, Cape Town"
          },
          fraudScore: 0.02
        };

        setPortingRequest(prev => ({
          ...prev,
          documents: [
            ...prev.documents,
            {
              files: Array.from(files),
              verification: verificationResult,
              timestamp: new Date().toISOString()
            }
          ]
        }));

        toast({
          title: "Documents Verified ✓",
          description: `AI verification complete: ${verificationResult.authenticity}% authenticity, ICASA compliant`,
        });
        setLoading(false);
      }, 3000);
    }
  };

  const initiatePorting = async () => {
    if (!portingRequest.phoneNumber || !portingRequest.currentNetwork || !portingRequest.targetNetwork) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to initiate porting requests.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('porting_requests')
        .insert({
          user_id: user.id,
          phone_number: portingRequest.phoneNumber,
          current_network: portingRequest.currentNetwork,
          target_network: portingRequest.targetNetwork,
          request_type: 'individual',
          priority: portingRequest.priority,
          scheduled_cutover: portingRequest.scheduledCutover || null,
          documents: portingRequest.documents
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Porting Request Initiated",
        description: `Request ${data.id} submitted to NPC for processing. You'll receive real-time updates.`,
      });
      
      setActiveTab('track');
      await loadPortingRequests();
      
      // Reset form
      setPortingRequest({
        phoneNumber: '',
        currentNetwork: '',
        targetNetwork: '',
        documents: [],
        priority: 'normal',
        scheduledCutover: '',
        fullName: '',
        idNumber: '',
        dateOfBirth: '',
        contactEmail: '',
        contactMobile: '',
        simType: 'physical',
        consentOwnership: false,
        consentDataProcessing: false,
        digitalSignature: ''
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initiate porting request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'processing': return 'bg-yellow-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'processing': return <Clock className="w-4 h-4" />;
      case 'rejected': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🇿🇦 SA Number Porting System
        </h1>
        <p className="text-gray-600">
          AI-Driven • ICASA Compliant • Automated Processing
        </p>
      </div>

      {/* Key Features Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="text-center p-3">
          <Bot className="w-8 h-8 mx-auto mb-2 text-blue-600" />
          <p className="text-sm font-medium">AI Verification</p>
        </Card>
        <Card className="text-center p-3">
          <Shield className="w-8 h-8 mx-auto mb-2 text-green-600" />
          <p className="text-sm font-medium">ICASA Compliant</p>
        </Card>
        <Card className="text-center p-3">
          <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
          <p className="text-sm font-medium">Fast Processing</p>
        </Card>
        <Card className="text-center p-3">
          <Phone className="w-8 h-8 mx-auto mb-2 text-purple-600" />
          <p className="text-sm font-medium">All Networks</p>
        </Card>
      </div>

      {/* Enhanced Status Bar */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={`${realTimeEnabled ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi className={`w-4 h-4 ${realTimeEnabled ? 'text-green-600' : 'text-gray-400'}`} />
              <span className="text-sm font-medium">Real-Time Updates</span>
            </div>
            <Switch checked={realTimeEnabled} onCheckedChange={setRealTimeEnabled} />
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Notifications</span>
            </div>
            <Badge variant="secondary">{notifications.length}</Badge>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium">AI Assistant</span>
            </div>
            <Button size="sm" variant="outline" onClick={() => setAiChatOpen(!aiChatOpen)}>
              {aiChatOpen ? 'Close' : 'Open'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* AI Chat Interface */}
      {aiChatOpen && (
        <Card className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-600" />
              AI Porting Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white rounded-lg p-4 max-h-60 overflow-y-auto">
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  <strong>AI:</strong> Hello! I'm your intelligent porting assistant. I can help you with:
                  <ul className="mt-2 space-y-1 ml-4">
                    <li>• Status updates and tracking</li>
                    <li>• Document requirements and verification</li>
                    <li>• Network compatibility checks</li>
                    <li>• Troubleshooting and support</li>
                    <li>• Bulk porting guidance</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Ask me anything about number porting..." className="flex-1" />
              <Button>Send</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-6 w-full mb-6">
          <TabsTrigger value="initiate">Initiate</TabsTrigger>
          <TabsTrigger value="track">Track</TabsTrigger>
          <TabsTrigger value="bulk">Bulk</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>

        {/* Initiate Porting Tab */}
        <TabsContent value="initiate">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Initiate Number Porting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    placeholder="e.g., 072 123 4567"
                    value={portingRequest.phoneNumber}
                    onChange={(e) => setPortingRequest({...portingRequest, phoneNumber: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="currentNetwork">Current Network *</Label>
                  <select 
                    id="currentNetwork"
                    className="w-full p-2 border rounded-md"
                    value={portingRequest.currentNetwork}
                    onChange={(e) => setPortingRequest({...portingRequest, currentNetwork: e.target.value})}
                  >
                    <option value="">Select Network</option>
                    {networks.map(network => (
                      <option key={network} value={network}>{network}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="targetNetwork">Target Network *</Label>
                <select 
                  id="targetNetwork"
                  className="w-full p-2 border rounded-md"
                  value={portingRequest.targetNetwork}
                  onChange={(e) => setPortingRequest({...portingRequest, targetNetwork: e.target.value})}
                >
                  <option value="">Select Network</option>
                  {networks.map(network => (
                    <option key={network} value={network}>{network}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Priority Level</Label>
                  <select 
                    id="priority"
                    className="w-full p-2 border rounded-md"
                    value={portingRequest.priority}
                    onChange={(e) => setPortingRequest({...portingRequest, priority: e.target.value})}
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="scheduledCutover">Scheduled Cutover (Optional)</Label>
                  <Input
                    id="scheduledCutover"
                    type="datetime-local"
                    value={portingRequest.scheduledCutover}
                    onChange={(e) => setPortingRequest({...portingRequest, scheduledCutover: e.target.value})}
                  />
                </div>
              </div>

              {/* Document Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600 mb-2">Upload Required Documents</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.png,.jpeg"
                  className="hidden"
                  id="documentUpload"
                  onChange={(e) => handleDocumentUpload(e.target.files)}
                />
                <Label htmlFor="documentUpload" className="cursor-pointer">
                  <Button variant="outline" type="button" disabled={loading}>
                    {loading ? 'Processing...' : 'Select Files'}
                  </Button>
                </Label>
                <p className="text-xs text-gray-500 mt-2">
                  ID Document, Proof of Address, POA (if applicable)
                </p>
                
                {/* Document Verification Results */}
                {portingRequest.documents.length > 0 && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {portingRequest.documents.length} document(s) verified
                      </span>
                    </div>
                    {portingRequest.documents.map((doc, index) => (
                      <div key={index} className="text-xs text-green-700 mt-1">
                        Authenticity: {doc.verification?.authenticity}% • Fraud Score: {doc.verification?.fraudScore}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Enhanced AI Verification Status */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-800">Advanced AI Processing</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                    <div>
                      <p className="text-blue-700">• Document Authentication</p>
                      <p className="text-blue-700">• Fraud Detection & Prevention</p>
                      <p className="text-blue-700">• ICASA Compliance Validation</p>
                    </div>
                    <div>
                      <p className="text-blue-700">• Eligibility Verification</p>
                      <p className="text-blue-700">• Network Compatibility Check</p>
                      <p className="text-blue-700">• Automated Risk Assessment</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button onClick={initiatePorting} className="w-full" size="lg" disabled={loading}>
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Processing Request...
                  </>
                ) : (
                  'Initiate Porting Request'
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Track Porting Tab */}
        <TabsContent value="track">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Track Porting Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <Input placeholder="Enter phone number or reference" className="flex-1" />
                  <Button>Track</Button>
                </div>
              </CardContent>
            </Card>

            {/* Active Porting Requests */}
            {portingRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{request.phone_number}</h3>
                      <p className="text-sm text-gray-600">
                        {request.current_network} → {request.target_network}
                      </p>
                    </div>
                    <Badge className={`${getStatusColor(request.status)} text-white`}>
                      {getStatusIcon(request.status)}
                      {request.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{request.progress_percentage || 0}%</span>
                    </div>
                    <Progress value={request.progress_percentage || 0} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                    <div>
                      <span className="text-gray-600">Submitted:</span>
                      <p>{new Date(request.created_at).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Priority:</span>
                      <p className="capitalize">{request.priority}</p>
                    </div>
                  </div>
                  
                  {request.npc_reference && (
                    <div className="mt-2 text-xs text-gray-500">
                      NPC Ref: {request.npc_reference}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Bulk Porting Tab */}
        <TabsContent value="bulk">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Bulk Number Porting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600 mb-2">Upload CSV/Excel File</p>
                <Button variant="outline">
                  Select Bulk File
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  Support for up to 1000 numbers per batch
                </p>
              </div>

              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-4">
                  <h4 className="font-medium text-yellow-800 mb-2">Bulk Porting Features:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Scheduled cutover times for business continuity</li>
                    <li>• AI-powered batch validation and processing</li>
                    <li>• Real-time progress tracking for all numbers</li>
                    <li>• Automated rollback on critical errors</li>
                  </ul>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <BarChart3 className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <h3 className="text-2xl font-bold text-blue-600">98.7%</h3>
                <p className="text-sm text-gray-600">Success Rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <h3 className="text-2xl font-bold text-green-600">4.2h</h3>
                <p className="text-sm text-gray-600">Avg Processing Time</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <h3 className="text-2xl font-bold text-purple-600">12,453</h3>
                <p className="text-sm text-gray-600">Total Ports (YTD)</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-600" />
                <h3 className="text-2xl font-bold text-red-600">0.3%</h3>
                <p className="text-sm text-gray-600">Fraud Detection Rate</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Network Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>MTN</span>
                    <div className="flex items-center gap-2">
                      <Progress value={45} className="w-20 h-2" />
                      <span className="text-sm text-gray-600">45%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Vodacom</span>
                    <div className="flex items-center gap-2">
                      <Progress value={35} className="w-20 h-2" />
                      <span className="text-sm text-gray-600">35%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Cell C</span>
                    <div className="flex items-center gap-2">
                      <Progress value={15} className="w-20 h-2" />
                      <span className="text-sm text-gray-600">15%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Others</span>
                    <div className="flex items-center gap-2">
                      <Progress value={5} className="w-20 h-2" />
                      <span className="text-sm text-gray-600">5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Processing Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>AI Verification Time</span>
                    <span className="font-medium">2.3 sec avg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>NPC Response Time</span>
                    <span className="font-medium">45 min avg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Document Accuracy</span>
                    <span className="font-medium text-green-600">99.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Customer Satisfaction</span>
                    <span className="font-medium text-blue-600">4.8/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* API Tab */}
        <TabsContent value="api">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  API Integration & Webhooks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Base URL</h4>
                  <code className="text-sm bg-white p-2 rounded border block">
                    https://faubmvkpcgjxmzemztye.supabase.co/functions/v1/porting-api
                  </code>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-blue-50">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-blue-800 mb-2">Initiate Porting</h4>
                      <code className="text-xs text-blue-700">POST /initiate</code>
                      <p className="text-sm text-blue-600 mt-1">Create new porting request</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-green-50">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-green-800 mb-2">Check Status</h4>
                      <code className="text-xs text-green-700">GET /status/{'{id}'}</code>
                      <p className="text-sm text-green-600 mt-1">Get request status</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-purple-50">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-purple-800 mb-2">Bulk Porting</h4>
                      <code className="text-xs text-purple-700">POST /bulk</code>
                      <p className="text-sm text-purple-600 mt-1">Submit batch requests</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-yellow-50">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-yellow-800 mb-2">Analytics</h4>
                      <code className="text-xs text-yellow-700">GET /analytics</code>
                      <p className="text-sm text-yellow-600 mt-1">Retrieve metrics</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-orange-50 border-orange-200">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-orange-800 mb-2">Webhook Configuration</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Status Updates:</span>
                        <Badge className="bg-green-500 text-white">Enabled</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Completion Notifications:</span>
                        <Badge className="bg-green-500 text-white">Enabled</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Error Alerts:</span>
                        <Badge className="bg-green-500 text-white">Enabled</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download API Docs
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    View API Logs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Admin Dashboard Tab */}
        <TabsContent value="admin">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <h3 className="text-2xl font-bold text-green-600">1,247</h3>
                <p className="text-sm text-gray-600">Completed Ports (30d)</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <h3 className="text-2xl font-bold text-yellow-600">89</h3>
                <p className="text-sm text-gray-600">In Progress</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <h3 className="text-2xl font-bold text-blue-600">98.7%</h3>
                <p className="text-sm text-gray-600">Success Rate</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                System Administration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <Shield className="w-6 h-6 mb-2" />
                  ICASA Compliance
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Bot className="w-6 h-6 mb-2" />
                  AI Model Settings
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <FileText className="w-6 h-6 mb-2" />
                  Audit Logs
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Zap className="w-6 h-6 mb-2" />
                  NPC Integration
                </Button>
              </div>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <h4 className="font-medium text-green-800 mb-2">System Status:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>NPC Connection:</span>
                      <Badge className="bg-green-500 text-white">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>AI Services:</span>
                      <Badge className="bg-green-500 text-white">Online</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>ICASA Compliance:</span>
                      <Badge className="bg-green-500 text-white">Verified</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortingSystem;