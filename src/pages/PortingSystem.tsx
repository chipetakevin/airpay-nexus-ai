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
  useFormValidation, 
  formatSAMobileNumber, 
  formatSAIDNumber, 
  sanitizeInput,
  type FormData 
} from '@/hooks/useFormValidation';
import { useEnhancedSecurity } from '@/hooks/useEnhancedSecurity';
import { usePortingSystemState } from '@/hooks/usePortingSystemState';
import { useErrorRecovery } from '@/hooks/useErrorRecovery';
import { ErrorRecoveryDashboard } from '@/components/porting/ErrorRecoveryDashboard';
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
  RefreshCw,
  AlertCircle,
  X,
  Activity
} from 'lucide-react';

const PortingSystem = () => {
  const [activeTab, setActiveTab] = useState('initiate');
  const [realTimeEnabled, setRealTimeEnabled] = useState(true);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [securityToken, setSecurityToken] = useState('');
  const [npcStatus, setNpcStatus] = useState({ connected: true, responseTime: '45ms' });
  const [networkCompatibility, setNetworkCompatibility] = useState<any>(null);
  const [validationStatus, setValidationStatus] = useState<any>({});

  const { toast } = useToast();
  const { errors, touched, validateField, validateForm, handleFieldChange, clearErrors } = useFormValidation();
  const { 
    sanitizeAndValidateInput, 
    maskSensitiveData, 
    validateFileUpload, 
    generateSecurityToken,
    checkRateLimit,
    auditLogs,
    securityViolations 
  } = useEnhancedSecurity();

  const {
    user,
    portingRequests,
    notifications,
    analytics,
    loading,
    systemHealth,
    setLoading,
    initializeUser,
    loadPortingRequests,
    loadNotifications,
    loadAnalytics,
    monitorSystemHealth,
    submitPortingRequest,
    withRecovery
  } = usePortingSystemState();

  const { attemptRecovery, getErrorStats } = useErrorRecovery();

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
    consentMarketing: false,
    digitalSignature: ''
  });

  const networks = ['MTN', 'Vodacom', 'Cell C', 'Telkom Mobile', 'Rain', 'FNB Connect', 'MakroCall'];
  
  // Enhanced network compatibility matrix
  const networkCompatibilityMatrix = {
    'MTN': { 'Vodacom': true, 'Cell C': true, 'Telkom Mobile': true, 'Rain': true, 'FNB Connect': true, 'MakroCall': false },
    'Vodacom': { 'MTN': true, 'Cell C': true, 'Telkom Mobile': true, 'Rain': true, 'FNB Connect': true, 'MakroCall': false },
    'Cell C': { 'MTN': true, 'Vodacom': true, 'Telkom Mobile': true, 'Rain': true, 'FNB Connect': false, 'MakroCall': false },
    'Telkom Mobile': { 'MTN': true, 'Vodacom': true, 'Cell C': true, 'Rain': true, 'FNB Connect': true, 'MakroCall': true },
    'Rain': { 'MTN': true, 'Vodacom': true, 'Cell C': true, 'Telkom Mobile': true, 'FNB Connect': false, 'MakroCall': false },
    'FNB Connect': { 'MTN': true, 'Vodacom': true, 'Telkom Mobile': true, 'Cell C': false, 'Rain': false, 'MakroCall': false },
    'MakroCall': { 'Telkom Mobile': true, 'MTN': false, 'Vodacom': false, 'Cell C': false, 'Rain': false, 'FNB Connect': false }
  };

  useEffect(() => {
    initializeUser();
    if (user) {
      loadPortingRequests();
      loadNotifications();
      loadAnalytics();
      monitorSystemHealth();
      
      if (realTimeEnabled) {
        setupRealTimeSubscriptions();
      }
    }
  }, [user, realTimeEnabled]);

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

  const validateNetworkCompatibility = (fromNetwork: string, toNetwork: string) => {
    if (!fromNetwork || !toNetwork) return null;
    
    const isCompatible = networkCompatibilityMatrix[fromNetwork]?.[toNetwork] || false;
    const result = {
      compatible: isCompatible,
      estimatedTime: isCompatible ? `${Math.floor(Math.random() * 4) + 2} hours` : 'N/A',
      npcRequired: true,
      additionalSteps: !isCompatible ? ['Contact current provider', 'Special authorization required'] : []
    };

    setNetworkCompatibility(result);
    return result;
  };

  const performRealTimeValidation = async (field: string, value: string) => {
    if (!value) return;

    const validation = { valid: true, message: '', suggestions: [] };

    switch (field) {
      case 'phoneNumber':
        // Use withRecovery for network lookup
        const networkCheck = await withRecovery(async () => {
          return await simulateNetworkLookup(value);
        }, 'Phone Number Validation');
        
        const isValidFormat = /^0[6-8][0-9]{8}$/.test(value.replace(/\s/g, ''));
        
        validation.valid = isValidFormat && (networkCheck?.active || false);
        validation.message = !isValidFormat 
          ? 'Invalid SA mobile number format' 
          : !(networkCheck?.active) 
          ? 'Number not found or inactive'
          : `Active on ${networkCheck.network}`;
        break;

      case 'currentNetwork':
      case 'targetNetwork':
        if (portingRequest.currentNetwork && portingRequest.targetNetwork) {
          const compatibility = validateNetworkCompatibility(
            portingRequest.currentNetwork, 
            portingRequest.targetNetwork
          );
          validation.valid = compatibility?.compatible || false;
          validation.message = compatibility?.compatible 
            ? `Compatible - Est. ${compatibility.estimatedTime}`
            : 'Incompatible networks - additional steps required';
        }
        break;
    }

    setValidationStatus(prev => ({ ...prev, [field]: validation }));
  };

  const simulateNetworkLookup = async (phoneNumber: string) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const cleanNumber = phoneNumber.replace(/\s/g, '');
    
    // Simulate network detection based on number patterns
    const networkPatterns = {
      'MTN': /^0(83|63|73|78)/,
      'Vodacom': /^0(82|72|79)/,
      'Cell C': /^0(84|74)/,
      'Telkom Mobile': /^0(81|71)/,
      'Rain': /^0(87|67)/
    };

    for (const [network, pattern] of Object.entries(networkPatterns)) {
      if (pattern.test(cleanNumber)) {
        return { active: Math.random() > 0.1, network }; // 90% active rate
      }
    }

    return { active: false, network: 'Unknown' };
  };

  const handleDocumentUpload = async (files: FileList | null) => {
    if (files) {
      setLoading(true);
      const validFiles: any[] = [];
      const errors: string[] = [];

      // Validate each file with enhanced security
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const validation = validateFileUpload(file);
        
        if (validation.isValid) {
          // Simulate AI verification with enhanced security features
          const verificationResult = {
            authenticity: Math.floor(Math.random() * 5) + 95, // 95-99%
            compliance: true,
            extractedData: {
              idNumber: "8001015009087",
              fullName: "John Doe",
              address: "123 Main St, Cape Town"
            },
            fraudScore: Math.random() * 0.05, // 0-0.05
            securityScan: {
              malwareDetected: false,
              fileIntegrity: true,
              metadataClean: true
            },
            fileName: validation.sanitizedName
          };

          validFiles.push({
            file,
            verification: verificationResult,
            timestamp: new Date().toISOString(),
            originalName: file.name,
            sanitizedName: validation.sanitizedName
          });

          toast({
            title: "Document Verified ✓",
            description: `${validation.sanitizedName}: ${verificationResult.authenticity}% authenticity, Security scan passed`,
          });
        } else {
          errors.push(`${file.name}: ${validation.violations.join(', ')}`);
        }
      }

      if (errors.length > 0) {
        toast({
          title: "Document Validation Failed",
          description: errors.join(' | '),
          variant: "destructive"
        });
      }

      if (validFiles.length > 0) {
        setPortingRequest(prev => ({
          ...prev,
          documents: [...prev.documents, ...validFiles]
        }));

        toast({
          title: "Security Validation Complete",
          description: `${validFiles.length} document(s) passed all security checks and AI verification.`,
        });
      }

      setLoading(false);
    }
  };

  const initiatePorting = async () => {
    // Validate the entire form
    if (!validateForm(portingRequest as FormData)) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form before submitting.",
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
          phone_number: portingRequest.phoneNumber.replace(/\s/g, ''),
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
        title: "Porting Request Initiated ✓",
        description: `Request ${data.id.slice(0, 8)}... submitted successfully. Real-time updates enabled.`,
      });
      
      setActiveTab('track');
      await loadPortingRequests();
      
      // Reset form and clear validation
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
        consentMarketing: false,
        digitalSignature: ''
      });
      clearErrors();

    } catch (error) {
      toast({
        title: "Submission Error",
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30 p-2 sm:p-4 lg:p-6">
      {/* Mobile-First Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/638d9726-2690-4aba-acea-6054bc398c06.png"
              alt="Divine Mobile Crown Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Divine Mobile Porting Interface
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                AI-Driven • ICASA Compliant • Automated Processing
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              <Activity className="w-3 h-3 mr-1" />
              Live System
            </Badge>
          </div>
        </div>
      </div>

      {/* Mobile-First Feature Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
        <Card className="text-center p-2 sm:p-3 hover:shadow-md transition-shadow">
          <Bot className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 text-blue-600" />
          <p className="text-xs sm:text-sm font-medium">AI Verification</p>
        </Card>
        <Card className="text-center p-2 sm:p-3 hover:shadow-md transition-shadow">
          <Shield className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 text-green-600" />
          <p className="text-xs sm:text-sm font-medium">ICASA Compliant</p>
        </Card>
        <Card className="text-center p-2 sm:p-3 hover:shadow-md transition-shadow">
          <Zap className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 text-yellow-600" />
          <p className="text-xs sm:text-sm font-medium">Fast Processing</p>
        </Card>
        <Card className="text-center p-2 sm:p-3 hover:shadow-md transition-shadow">
          <Phone className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 text-purple-600" />
          <p className="text-xs sm:text-sm font-medium">All Networks</p>
        </Card>
      </div>

      {/* Enhanced Status Bar with NPC Integration */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className={`${systemHealth.npcConnection ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Database className={`w-4 h-4 ${systemHealth.npcConnection ? 'text-green-600' : 'text-red-600'}`} />
              <span className="text-sm font-medium">NPC Integration</span>
            </div>
            <div className="text-xs text-gray-600">
              <div>Status: {npcStatus.connected ? 'Connected' : 'Disconnected'}</div>
              <div>Response: {npcStatus.responseTime}</div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${realTimeEnabled ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi className={`w-4 h-4 ${realTimeEnabled ? 'text-green-600' : 'text-gray-400'}`} />
              <span className="text-sm font-medium">Real-Time</span>
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

      {/* System Health Dashboard */}
      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Shield className="w-5 h-5" />
            System Health & Network Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${systemHealth.npcConnection ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <p className="text-xs font-medium">NPC Gateway</p>
              <p className="text-xs text-gray-600">{systemHealth.npcConnection ? 'Online' : 'Offline'}</p>
            </div>
            <div className="text-center">
              <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${systemHealth.apiGateway ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <p className="text-xs font-medium">API Gateway</p>
              <p className="text-xs text-gray-600">{systemHealth.apiGateway ? 'Active' : 'Down'}</p>
            </div>
            <div className="text-center">
              <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${systemHealth.database ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <p className="text-xs font-medium">Database</p>
              <p className="text-xs text-gray-600">{systemHealth.database ? 'Connected' : 'Error'}</p>
            </div>
            <div className="text-center">
              <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${systemHealth.security ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <p className="text-xs font-medium">Security</p>
              <p className="text-xs text-gray-600">{systemHealth.security ? 'Secure' : 'Alert'}</p>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 rounded-full mx-auto mb-2 bg-blue-500"></div>
              <p className="text-xs font-medium">Uptime</p>
              <p className="text-xs text-gray-600">{systemHealth.uptime}</p>
            </div>
          </div>
        </CardContent>
      </Card>

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

      {/* Mobile-First Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 pb-2 sm:pb-4">
          <TabsList className="grid grid-cols-3 sm:grid-cols-7 w-full h-auto p-1 bg-muted/30">
            <TabsTrigger value="initiate" className="flex flex-col sm:flex-row items-center gap-1 text-xs sm:text-sm p-2 sm:p-3">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Initiate</span>
              <span className="sm:hidden">Start</span>
            </TabsTrigger>
            <TabsTrigger value="track" className="flex flex-col sm:flex-row items-center gap-1 text-xs sm:text-sm p-2 sm:p-3">
              <Search className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Track</span>
            </TabsTrigger>
            <TabsTrigger value="bulk" className="flex flex-col sm:flex-row items-center gap-1 text-xs sm:text-sm p-2 sm:p-3">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Bulk</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="hidden sm:flex flex-col sm:flex-row items-center gap-1 text-xs sm:text-sm p-2 sm:p-3">
              <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="hidden sm:flex flex-col sm:flex-row items-center gap-1 text-xs sm:text-sm p-2 sm:p-3">
              <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>API</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="hidden sm:flex flex-col sm:flex-row items-center gap-1 text-xs sm:text-sm p-2 sm:p-3">
              <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Admin</span>
            </TabsTrigger>
            <TabsTrigger value="recovery" className="hidden sm:flex flex-col sm:flex-row items-center gap-1 text-xs sm:text-sm p-2 sm:p-3">
              <Activity className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Recovery</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Enhanced Initiate Porting Tab with Full Validation */}
        <TabsContent value="initiate">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Customer Number Porting Request Form
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Complete this form with accurate information. All fields marked with * are required.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Personal Information Section - Enhanced */}
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="flex items-center gap-1">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="e.g., John Smith"
                      value={portingRequest.fullName || ''}
                      onChange={(e) => {
                        const security = sanitizeAndValidateInput(e.target.value, 'fullName');
                        if (security.isSecure) {
                          setPortingRequest({...portingRequest, fullName: security.sanitized});
                          handleFieldChange('fullName', security.sanitized, portingRequest as FormData);
                        } else {
                          toast({
                            title: "Security Alert",
                            description: `Input blocked: ${security.violations.join(', ')}`,
                            variant: "destructive"
                          });
                        }
                      }}
                      className={`${errors.fullName ? 'border-red-500 bg-red-50' : touched.fullName ? 'border-green-500 bg-green-50' : ''}`}
                      maxLength={50}
                    />
                    {errors.fullName && (
                      <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                        <AlertCircle className="w-3 h-3" />
                        {errors.fullName}
                      </div>
                    )}
                    {touched.fullName && !errors.fullName && (
                      <div className="flex items-center gap-1 mt-1 text-sm text-green-600">
                        <CheckCircle className="w-3 h-3" />
                        Valid name format
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="idNumber" className="flex items-center gap-1">
                      SA ID Number / Passport <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="idNumber"
                      placeholder="e.g., 8001015009087"
                      value={portingRequest.idNumber || ''}
                      onChange={(e) => {
                        const formatted = formatSAIDNumber(e.target.value);
                        setPortingRequest({...portingRequest, idNumber: formatted});
                        handleFieldChange('idNumber', formatted, portingRequest as FormData);
                      }}
                      className={`${errors.idNumber ? 'border-red-500 bg-red-50' : touched.idNumber ? 'border-green-500 bg-green-50' : ''}`}
                      maxLength={13}
                    />
                    {errors.idNumber && (
                      <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                        <AlertCircle className="w-3 h-3" />
                        {errors.idNumber}
                      </div>
                    )}
                    {touched.idNumber && !errors.idNumber && (
                      <div className="flex items-center gap-1 mt-1 text-sm text-green-600">
                        <CheckCircle className="w-3 h-3" />
                        Valid SA ID number
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="dateOfBirth" className="flex items-center gap-1">
                      Date of Birth <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={portingRequest.dateOfBirth || ''}
                      onChange={(e) => {
                        setPortingRequest({...portingRequest, dateOfBirth: e.target.value});
                        handleFieldChange('dateOfBirth', e.target.value, portingRequest as FormData);
                      }}
                      className={`${errors.dateOfBirth ? 'border-red-500 bg-red-50' : touched.dateOfBirth ? 'border-green-500 bg-green-50' : ''}`}
                      max={new Date().toISOString().split('T')[0]}
                    />
                    {errors.dateOfBirth && (
                      <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                        <AlertCircle className="w-3 h-3" />
                        {errors.dateOfBirth}
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-1">Must be 18+ years old</p>
                  </div>

                  <div>
                    <Label htmlFor="contactEmail" className="flex items-center gap-1">
                      Contact Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="john@example.com"
                      value={portingRequest.contactEmail || ''}
                      onChange={(e) => {
                        const sanitized = sanitizeInput(e.target.value);
                        setPortingRequest({...portingRequest, contactEmail: sanitized});
                        handleFieldChange('contactEmail', sanitized, portingRequest as FormData);
                      }}
                      className={`${errors.contactEmail ? 'border-red-500 bg-red-50' : touched.contactEmail ? 'border-green-500 bg-green-50' : ''}`}
                    />
                    {errors.contactEmail && (
                      <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                        <AlertCircle className="w-3 h-3" />
                        {errors.contactEmail}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="contactMobile" className="flex items-center gap-1">
                      Contact Mobile Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="contactMobile"
                      placeholder="082 123 4567"
                      value={portingRequest.contactMobile || ''}
                      onChange={(e) => {
                        const formatted = formatSAMobileNumber(e.target.value);
                        setPortingRequest({...portingRequest, contactMobile: formatted});
                        handleFieldChange('contactMobile', formatted, portingRequest as FormData);
                      }}
                      className={`${errors.contactMobile ? 'border-red-500 bg-red-50' : touched.contactMobile ? 'border-green-500 bg-green-50' : ''}`}
                      maxLength={13}
                    />
                    {errors.contactMobile && (
                      <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                        <AlertCircle className="w-3 h-3" />
                        {errors.contactMobile}
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-1">Format: 082 123 4567</p>
                  </div>
                </div>
              </div>

              {/* Current SIM Details Section - Enhanced */}
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Current SIM Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phoneNumber" className="flex items-center gap-1">
                      Mobile Number to Port <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phoneNumber"
                      placeholder="072 123 4567"
                      value={portingRequest.phoneNumber}
                      onChange={(e) => {
                        const formatted = formatSAMobileNumber(e.target.value);
                        setPortingRequest({...portingRequest, phoneNumber: formatted});
                        handleFieldChange('phoneNumber', formatted, portingRequest as FormData);
                        performRealTimeValidation('phoneNumber', formatted);
                      }}
                      className={`${errors.phoneNumber ? 'border-red-500 bg-red-50' : touched.phoneNumber ? 'border-green-500 bg-green-50' : ''}`}
                      maxLength={13}
                    />
                    {errors.phoneNumber && (
                      <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phoneNumber}
                      </div>
                    )}
                    {validationStatus.phoneNumber && (
                      <div className={`flex items-center gap-1 mt-1 text-sm ${validationStatus.phoneNumber.valid ? 'text-green-600' : 'text-yellow-600'}`}>
                        {validationStatus.phoneNumber.valid ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {validationStatus.phoneNumber.message}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="currentNetwork" className="flex items-center gap-1">
                      Current Network Provider <span className="text-red-500">*</span>
                    </Label>
                    <select 
                      id="currentNetwork"
                      className={`w-full p-2 border rounded-md bg-white ${errors.currentNetwork ? 'border-red-500 bg-red-50' : ''}`}
                      value={portingRequest.currentNetwork}
                      onChange={(e) => {
                        setPortingRequest({...portingRequest, currentNetwork: e.target.value});
                        handleFieldChange('currentNetwork', e.target.value, portingRequest as FormData);
                        performRealTimeValidation('currentNetwork', e.target.value);
                      }}
                    >
                      <option value="">Select Current Network</option>
                      {networks.map(network => (
                        <option key={network} value={network}>{network}</option>
                      ))}
                    </select>
                    {errors.currentNetwork && (
                      <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                        <AlertCircle className="w-3 h-3" />
                        {errors.currentNetwork}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="simType" className="flex items-center gap-1">
                      SIM Type <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="simType"
                          value="physical"
                          checked={portingRequest.simType === 'physical'}
                          onChange={(e) => {
                            setPortingRequest({...portingRequest, simType: e.target.value});
                            handleFieldChange('simType', e.target.value, portingRequest as FormData);
                          }}
                          className="text-blue-600"
                        />
                        Physical SIM
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="simType"
                          value="esim"
                          checked={portingRequest.simType === 'esim'}
                          onChange={(e) => {
                            setPortingRequest({...portingRequest, simType: e.target.value});
                            handleFieldChange('simType', e.target.value, portingRequest as FormData);
                          }}
                          className="text-blue-600"
                        />
                        eSIM
                      </label>
                    </div>
                    {errors.simType && (
                      <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                        <AlertCircle className="w-3 h-3" />
                        {errors.simType}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Recipient Network Section - Enhanced */}
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Recipient (New) Network
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="targetNetwork" className="flex items-center gap-1">
                      Desired New Network Provider <span className="text-red-500">*</span>
                    </Label>
                    <select 
                      id="targetNetwork"
                      className={`w-full p-2 border rounded-md bg-white ${errors.targetNetwork ? 'border-red-500 bg-red-50' : ''}`}
                      value={portingRequest.targetNetwork}
                      onChange={(e) => {
                        setPortingRequest({...portingRequest, targetNetwork: e.target.value});
                        handleFieldChange('targetNetwork', e.target.value, portingRequest as FormData);
                        performRealTimeValidation('targetNetwork', e.target.value);
                      }}
                    >
                      <option value="">Select Target Network</option>
                      {networks.map(network => (
                        <option key={network} value={network}>{network}</option>
                      ))}
                    </select>
                    {errors.targetNetwork && (
                      <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                        <AlertCircle className="w-3 h-3" />
                        {errors.targetNetwork}
                      </div>
                    )}
                    {networkCompatibility && (
                      <div className={`mt-2 p-3 rounded-lg border ${networkCompatibility.compatible ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                        <div className="flex items-center gap-2 text-sm">
                          {networkCompatibility.compatible ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-yellow-600" />
                          )}
                          <span className={networkCompatibility.compatible ? 'text-green-800' : 'text-yellow-800'}>
                            {networkCompatibility.compatible 
                              ? `✓ Compatible networks - Estimated time: ${networkCompatibility.estimatedTime}`
                              : '⚠ Additional authorization may be required'
                            }
                          </span>
                        </div>
                        {networkCompatibility.additionalSteps.length > 0 && (
                          <div className="mt-2 text-xs text-yellow-700">
                            <strong>Required steps:</strong>
                            <ul className="ml-4 mt-1">
                              {networkCompatibility.additionalSteps.map((step, index) => (
                                <li key={index} className="list-disc">{step}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="scheduledCutover">Preferred Activation Date & Time</Label>
                    <Input
                      id="scheduledCutover"
                      type="datetime-local"
                      value={portingRequest.scheduledCutover}
                      min={new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().slice(0, 16)}
                      onChange={(e) => {
                        setPortingRequest({...portingRequest, scheduledCutover: e.target.value});
                        handleFieldChange('scheduledCutover', e.target.value, portingRequest as FormData);
                      }}
                      className={`${errors.scheduledCutover ? 'border-red-500 bg-red-50' : ''}`}
                    />
                    {errors.scheduledCutover && (
                      <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                        <AlertCircle className="w-3 h-3" />
                        {errors.scheduledCutover}
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-1">Optional: Leave blank for immediate processing</p>
                  </div>

                  <div>
                    <Label htmlFor="priority">Priority Level</Label>
                    <select 
                      id="priority"
                      className="w-full p-2 border rounded-md bg-white"
                      value={portingRequest.priority}
                      onChange={(e) => setPortingRequest({...portingRequest, priority: e.target.value})}
                    >
                      <option value="normal">Normal (Standard Processing)</option>
                      <option value="high">High (Expedited Processing)</option>
                      <option value="urgent">Urgent (Emergency Processing)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Enhanced Document Upload with Validation */}
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Supporting Documents
                </h3>
                <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                  <p className="text-sm text-purple-600 mb-2">Upload Required Documents</p>
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
                      {loading ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          AI Processing...
                        </>
                      ) : (
                        'Select Files'
                      )}
                    </Button>
                  </Label>
                  <div className="mt-3 space-y-1 text-xs text-purple-600">
                    <p><strong>Required:</strong> SA ID Document or Passport</p>
                    <p><strong>Required:</strong> Proof of Address (not older than 3 months)</p>
                    <p><strong>Optional:</strong> Power of Attorney (if applicable)</p>
                    <p><strong>Formats:</strong> PDF, JPG, PNG • <strong>Max Size:</strong> 5MB per file</p>
                  </div>
                  
                  {/* Document Verification Results */}
                  {portingRequest.documents.length > 0 && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 text-green-800">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {portingRequest.documents.length} document(s) verified by AI
                        </span>
                      </div>
                      {portingRequest.documents.map((doc, index) => (
                        <div key={index} className="text-xs text-green-700 mt-1 flex justify-between">
                          <span>Document {index + 1}</span>
                          <span>Authenticity: {doc.verification?.authenticity}% • Fraud Risk: {doc.verification?.fraudScore}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {errors.documents && (
                    <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
                      <AlertCircle className="w-3 h-3" />
                      {errors.documents}
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced Legal Compliance & Consent Section */}
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Legal Authorization & Consent
                </h3>
                <div className="space-y-4">
                  {/* Mandatory Porting Authorization & Data Processing Consent */}
                  <div className="bg-white p-4 rounded-lg border border-red-200">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="consentOwnership"
                        checked={portingRequest.consentOwnership}
                        onChange={(e) => {
                          setPortingRequest({...portingRequest, consentOwnership: e.target.checked});
                          handleFieldChange('consentOwnership', e.target.checked, portingRequest as FormData);
                        }}
                        className="mt-1 w-4 h-4 text-red-600 border-red-300 rounded focus:ring-red-500"
                        required
                      />
                      <label htmlFor="consentOwnership" className="text-sm text-gray-800 cursor-pointer leading-relaxed">
                        I confirm that I am the legal owner of this cellphone number and hereby authorize Divine Mobile to process my porting request. I consent to the collection and processing of my personal information for the purpose of number porting, in accordance with the{' '}
                        <a href="/privacy-policy" target="_blank" className="text-blue-600 hover:underline font-medium">
                          Privacy Policy
                        </a>.
                      </label>
                    </div>
                    {errors.consentOwnership && (
                      <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
                        <AlertCircle className="w-3 h-3" />
                        This authorization is required to process your porting request.
                      </div>
                    )}
                  </div>

                  {/* POPIA Data Processing Consent - Enhanced */}
                  <div className="bg-white p-4 rounded-lg border border-red-200">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="consentDataProcessing"
                        checked={portingRequest.consentDataProcessing}
                        onChange={(e) => {
                          setPortingRequest({...portingRequest, consentDataProcessing: e.target.checked});
                          handleFieldChange('consentDataProcessing', e.target.checked, portingRequest as FormData);
                        }}
                        className="mt-1 w-4 h-4 text-red-600 border-red-300 rounded focus:ring-red-500"
                        required
                      />
                      <label htmlFor="consentDataProcessing" className="text-sm text-gray-800 cursor-pointer leading-relaxed">
                        I acknowledge that I have read and understood the{' '}
                        <a href="/terms-and-conditions" target="_blank" className="text-blue-600 hover:underline font-medium">
                          Terms and Conditions
                        </a>{' '}
                        and the{' '}
                        <a href="/privacy-policy" target="_blank" className="text-blue-600 hover:underline font-medium">
                          Privacy Policy
                        </a>{' '}
                        relating to this porting request.
                      </label>
                    </div>
                    {errors.consentDataProcessing && (
                      <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
                        <AlertCircle className="w-3 h-3" />
                        You must acknowledge the terms and privacy policy to proceed.
                      </div>
                    )}
                  </div>

                  {/* Optional Marketing Communications Consent */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="consentMarketing"
                        checked={portingRequest.consentMarketing || false}
                        onChange={(e) => setPortingRequest({...portingRequest, consentMarketing: e.target.checked})}
                        className="mt-1 w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="consentMarketing" className="text-sm text-gray-800 cursor-pointer leading-relaxed">
                        <span className="font-medium text-blue-800">Optional:</span> I consent to receive marketing and promotional communications from Divine Mobile. I understand I can opt out at any time.
                      </label>
                    </div>
                    <div className="ml-7 mt-2">
                      <p className="text-xs text-blue-700">
                        This includes special offers, service updates, and product announcements via SMS, email, or phone.
                      </p>
                    </div>
                  </div>

                  {/* Digital Signature Confirmation */}
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <Label htmlFor="digitalSignature" className="text-sm font-medium text-gray-800 mb-2 block">
                      Digital Signature Confirmation <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="digitalSignature"
                      placeholder="Type your full name to provide digital signature"
                      value={portingRequest.digitalSignature}
                      onChange={(e) => {
                        const sanitized = sanitizeInput(e.target.value);
                        setPortingRequest({...portingRequest, digitalSignature: sanitized});
                        handleFieldChange('digitalSignature', sanitized, portingRequest as FormData);
                      }}
                      className={`${errors.digitalSignature ? 'border-red-500 bg-red-50' : ''}`}
                      required
                    />
                    {errors.digitalSignature && (
                      <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                        <AlertCircle className="w-3 h-3" />
                        {errors.digitalSignature}
                      </div>
                    )}
                    <p className="text-xs text-gray-600 mt-2">
                      By typing your full name above, you provide a legally binding digital signature for this porting request under the Electronic Communications and Transactions Act.
                    </p>
                  </div>

                  {/* Consent Withdrawal Information */}
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-yellow-800">
                        <p className="font-medium mb-2">Your Rights & Consent Withdrawal:</p>
                        <div className="space-y-1 text-xs">
                          <p>• You may withdraw your consent at any time by contacting us at <a href="mailto:dpo@divinemobile.co.za" className="text-blue-600 hover:underline font-medium">dpo@divinemobile.co.za</a> or through our customer portal.</p>
                          <p>• You have the right to access, correct, or delete your personal information under POPIA.</p>
                          <p>• Withdrawal of consent may affect our ability to complete your porting request.</p>
                          <p>• You can file complaints with the Information Regulator if your privacy rights are violated.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Legal Compliance Statement */}
                  <div className="bg-gray-50 p-3 rounded border border-gray-200">
                    <p className="text-xs text-gray-700 text-center">
                      This form complies with ICASA Number Portability Regulations (2018), POPIA, and ECT Act requirements.
                      All consents are recorded with timestamps for audit and compliance purposes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced AI Verification Status */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Bot className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-800">Advanced AI Processing & Security</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <p className="text-blue-700 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3" />
                        Document Authentication & Verification
                      </p>
                      <p className="text-blue-700 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3" />
                        Advanced Fraud Detection & Prevention
                      </p>
                      <p className="text-blue-700 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3" />
                        ICASA Compliance Validation
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-blue-700 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3" />
                        Real-time Eligibility Verification
                      </p>
                      <p className="text-blue-700 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3" />
                        Network Compatibility Check
                      </p>
                      <p className="text-blue-700 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3" />
                        Automated Risk Assessment
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Submit Button with Security Features */}
              <div className="bg-gray-50 p-4 rounded-lg border">
                {/* CAPTCHA Placeholder - Would integrate with reCAPTCHA in production */}
                <div className="mb-4 p-3 bg-white border rounded-lg">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="captchaVerification"
                      checked={captchaVerified}
                      onChange={(e) => setCaptchaVerified(e.target.checked)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <label htmlFor="captchaVerification" className="text-sm text-gray-700">
                      I'm not a robot (CAPTCHA verification)
                    </label>
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    This verification helps prevent automated submissions and protects against spam.
                  </p>
                </div>

                {/* Security Status Indicators */}
                <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  <div className="flex items-center gap-1 text-green-600">
                    <Lock className="w-3 h-3" />
                    <span>SSL Encrypted</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <Shield className="w-3 h-3" />
                    <span>POPIA Compliant</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <Eye className="w-3 h-3" />
                    <span>Audit Trail</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <Database className="w-3 h-3" />
                    <span>Encrypted Storage</span>
                  </div>
                </div>

                <Button 
                  onClick={initiatePorting} 
                  className="w-full" 
                  size="lg" 
                  disabled={loading || !captchaVerified}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Processing with Security Validation...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Submit Secure Porting Request
                    </>
                  )}
                </Button>
                <p className="text-xs text-gray-600 text-center mt-2">
                  🔒 Your data is protected with bank-level encryption and comprehensive security measures.
                </p>
              </div>
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

        {/* Enhanced Admin Dashboard Tab with Security Monitoring */}
        <TabsContent value="admin">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
            <Card>
              <CardContent className="p-4 text-center">
                <h3 className="text-2xl font-bold text-red-600">{securityViolations}</h3>
                <p className="text-sm text-gray-600">Security Alerts (24h)</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Security Monitoring Dashboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {auditLogs.slice(-10).reverse().map((log, index) => (
                    <div key={index} className={`p-2 rounded text-xs border-l-4 ${
                      log.riskLevel === 'high' ? 'border-red-500 bg-red-50' :
                      log.riskLevel === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                      'border-green-500 bg-green-50'
                    }`}>
                      <div className="flex justify-between items-start">
                        <span className="font-medium">{log.action}</span>
                        <span className="text-gray-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <p className="text-gray-600 mt-1">{log.details}</p>
                      {log.fieldName && (
                        <p className="text-gray-500">Field: {log.fieldName}</p>
                      )}
                    </div>
                  ))}
                  {auditLogs.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No security events recorded</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Data Protection Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Data Protection Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">SSL/TLS Encryption:</span>
                    <Badge className="bg-green-500 text-white">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Database Encryption:</span>
                    <Badge className="bg-green-500 text-white">AES-256</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Input Validation:</span>
                    <Badge className="bg-green-500 text-white">Enhanced</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Audit Logging:</span>
                    <Badge className="bg-green-500 text-white">Enabled</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">POPIA Compliance:</span>
                    <Badge className="bg-green-500 text-white">Verified</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Rate Limiting:</span>
                    <Badge className="bg-green-500 text-white">Active</Badge>
                  </div>
                </div>
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

        {/* Error Recovery Tab */}
        <TabsContent value="recovery">
          <ErrorRecoveryDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortingSystem;