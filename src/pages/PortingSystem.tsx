import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
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
  Settings
} from 'lucide-react';

const PortingSystem = () => {
  const [activeTab, setActiveTab] = useState('initiate');
  const [portingRequest, setPortingRequest] = useState({
    phoneNumber: '',
    currentNetwork: '',
    targetNetwork: '',
    documents: []
  });
  const [portingStatus, setPortingStatus] = useState('pending');
  const { toast } = useToast();

  const networks = ['MTN', 'Vodacom', 'Cell C', 'Telkom Mobile', 'Rain'];
  
  const mockPortingRequests = [
    {
      id: 'PRT001',
      phoneNumber: '072 123 4567',
      fromNetwork: 'MTN',
      toNetwork: 'Vodacom',
      status: 'processing',
      progress: 75,
      dateSubmitted: '2024-01-15',
      estimatedCompletion: '2024-01-18'
    },
    {
      id: 'PRT002',
      phoneNumber: '083 987 6543',
      fromNetwork: 'Cell C',
      toNetwork: 'MTN',
      status: 'completed',
      progress: 100,
      dateSubmitted: '2024-01-10',
      estimatedCompletion: '2024-01-13'
    }
  ];

  const handleDocumentUpload = (files: FileList | null) => {
    if (files) {
      toast({
        title: "AI Document Verification",
        description: "AI is analyzing your documents for authenticity and compliance...",
      });
      
      // Simulate AI verification
      setTimeout(() => {
        toast({
          title: "Documents Verified ✓",
          description: "All documents passed AI verification and ICASA compliance checks.",
        });
      }, 2000);
    }
  };

  const initiatePorting = () => {
    if (!portingRequest.phoneNumber || !portingRequest.currentNetwork || !portingRequest.targetNetwork) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Porting Request Initiated",
      description: "Your number porting request has been submitted to NPC for processing.",
    });
    
    setPortingStatus('processing');
    setActiveTab('track');
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

      {/* Main Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full mb-6">
          <TabsTrigger value="initiate">Initiate</TabsTrigger>
          <TabsTrigger value="track">Track</TabsTrigger>
          <TabsTrigger value="bulk">Bulk</TabsTrigger>
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
                  <Button variant="outline" type="button">
                    Select Files
                  </Button>
                </Label>
                <p className="text-xs text-gray-500 mt-2">
                  ID Document, Proof of Address, POA (if applicable)
                </p>
              </div>

              {/* AI Verification Status */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-800">AI Document Verification</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">
                    Advanced AI will verify document authenticity, check ICASA compliance, and validate eligibility in real-time.
                  </p>
                </CardContent>
              </Card>

              <Button onClick={initiatePorting} className="w-full" size="lg">
                Initiate Porting Request
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
            {mockPortingRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{request.phoneNumber}</h3>
                      <p className="text-sm text-gray-600">
                        {request.fromNetwork} → {request.toNetwork}
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
                      <span>{request.progress}%</span>
                    </div>
                    <Progress value={request.progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                    <div>
                      <span className="text-gray-600">Submitted:</span>
                      <p>{request.dateSubmitted}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Est. Completion:</span>
                      <p>{request.estimatedCompletion}</p>
                    </div>
                  </div>
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