import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  Smartphone, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  MessageSquare,
  Mail,
  Phone,
  ScanLine
} from 'lucide-react';

interface CustomerData {
  fullName: string;
  idNumber: string;
  phoneNumber: string;
  email: string;
  physicalAddress: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  simIccid: string;
  msisdn: string;
  networkProvider: string;
  deviceType: string;
}

interface SIMActivation {
  id: string;
  customer_name: string;
  customer_phone: string;
  sim_iccid: string;
  network_provider: string;
  rica_status: string;
  created_at: string;
}

const CustomerOnboardingTab = () => {
  const [activeTab, setActiveTab] = useState('register');
  const [customerData, setCustomerData] = useState<CustomerData>({
    fullName: '',
    idNumber: '',
    phoneNumber: '',
    email: '',
    physicalAddress: '',
    dateOfBirth: '',
    gender: '',
    nationality: 'South African',
    simIccid: '',
    msisdn: '',
    networkProvider: 'Divine Mobile',
    deviceType: ''
  });
  
  const [activations, setActivations] = useState<SIMActivation[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<{[key: string]: File | null}>({
    idDocument: null,
    proofOfAddress: null,
    selfieWithId: null
  });
  
  const { toast } = useToast();

  useEffect(() => {
    loadActivations();
  }, []);

  const loadActivations = async () => {
    try {
      const { data, error } = await supabase
        .from('field_worker_activations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setActivations(data || []);
    } catch (error) {
      console.error('Error loading activations:', error);
    }
  };

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (type: string, file: File | null) => {
    setUploadedDocs(prev => ({ ...prev, [type]: file }));
  };

  const validateCustomerData = (): boolean => {
    const required = ['fullName', 'idNumber', 'phoneNumber', 'physicalAddress', 'dateOfBirth', 'gender', 'simIccid'];
    
    for (const field of required) {
      if (!customerData[field as keyof CustomerData]) {
        toast({
          title: "Validation Error",
          description: `${field} is required`,
          variant: "destructive"
        });
        return false;
      }
    }

    // Validate SA ID number
    if (!/^\d{13}$/.test(customerData.idNumber)) {
      toast({
        title: "Invalid ID Number",
        description: "Please enter a valid 13-digit South African ID number",
        variant: "destructive"
      });
      return false;
    }

    // Validate phone number
    if (!/^[0-9+\-\s()]{10,15}$/.test(customerData.phoneNumber)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const uploadDocument = async (file: File, type: string): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `customer-docs/${Date.now()}-${type}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('customer-documents')
      .upload(fileName, file);

    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from('customer-documents')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const registerCustomer = async () => {
    if (!validateCustomerData()) return;

    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Authentication required');

      // Get field worker info
      const { data: fieldWorker, error: fwError } = await supabase
        .from('field_workers')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (fwError || !fieldWorker) {
        throw new Error('Field worker profile not found');
      }

      // Upload documents
      const idDocUrl = uploadedDocs.idDocument ? await uploadDocument(uploadedDocs.idDocument, 'id') : null;
      const proofAddressUrl = uploadedDocs.proofOfAddress ? await uploadDocument(uploadedDocs.proofOfAddress, 'address') : null;
      const selfieUrl = uploadedDocs.selfieWithId ? await uploadDocument(uploadedDocs.selfieWithId, 'selfie') : null;

      // Register customer in RICA compliance  
      const ricaReference = `RICA-${Date.now()}`;
      const { data: ricaData, error: ricaError } = await supabase
        .from('rica_registrations')
        .insert({
          full_name: customerData.fullName,
          id_number: customerData.idNumber,
          mobile_number: customerData.phoneNumber,
          email: customerData.email,
          physical_address: customerData.physicalAddress,
          date_of_birth: customerData.dateOfBirth,
          gender: customerData.gender,
          nationality: customerData.nationality,
          sim_serial_number: customerData.simIccid,
          reference_number: ricaReference,
          user_id: user.id,
          user_type: 'customer',
          id_type: 'SA_ID',
          province: 'Gauteng', // Default province
          selfie_with_id_url: selfieUrl,
          proof_of_residence_url: proofAddressUrl,
          registration_status: 'pending'
        })
        .select()
        .single();

      if (ricaError) throw ricaError;

      // Create activation record
      const { data: activation, error: activationError } = await supabase
        .from('field_worker_activations')
        .insert({
          field_worker_id: fieldWorker.id,
          customer_name: customerData.fullName,
          customer_id_number: customerData.idNumber,
          customer_phone: customerData.phoneNumber,
          customer_email: customerData.email,
          sim_iccid: customerData.simIccid,
          msisdn: customerData.msisdn,
          network_provider: customerData.networkProvider,
          activation_type: 'new',
          rica_reference: ricaReference,
          rica_status: 'pending',
          commission_amount: 50.00,
          commission_status: 'pending'
        });

      if (activationError) throw activationError;

      // Notify admin for SIM activation
      await supabase.functions.invoke('notify-sim-activation', {
        body: {
          customer_name: customerData.fullName,
          sim_iccid: customerData.simIccid,
          rica_reference: ricaReference,
          field_worker_id: fieldWorker.id
        }
      });

      toast({
        title: "Customer Registered Successfully! 🎉",
        description: "Customer has been registered and SIM activation is pending admin approval.",
      });

      // Reset form
      setCustomerData({
        fullName: '', idNumber: '', phoneNumber: '', email: '', physicalAddress: '',
        dateOfBirth: '', gender: '', nationality: 'South African', simIccid: '',
        msisdn: '', networkProvider: 'Divine Mobile', deviceType: ''
      });
      setUploadedDocs({ idDocument: null, proofOfAddress: null, selfieWithId: null });
      
      // Reload activations
      loadActivations();

    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: "There was an error registering the customer. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'failed': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold">Customer Onboarding</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="register">Register Customer</TabsTrigger>
          <TabsTrigger value="status">Activation Status</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="register" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Customer SIM Registration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={customerData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="idNumber">ID Number *</Label>
                  <Input
                    id="idNumber"
                    value={customerData.idNumber}
                    onChange={(e) => handleInputChange('idNumber', e.target.value)}
                    placeholder="13-digit SA ID number"
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    value={customerData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={customerData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <Select value={customerData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="physicalAddress">Physical Address *</Label>
                <Textarea
                  id="physicalAddress"
                  value={customerData.physicalAddress}
                  onChange={(e) => handleInputChange('physicalAddress', e.target.value)}
                />
              </div>

              {/* SIM Card Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">SIM Card Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="simIccid">SIM ICCID *</Label>
                    <div className="flex gap-2">
                      <Input
                        id="simIccid"
                        value={customerData.simIccid}
                        onChange={(e) => handleInputChange('simIccid', e.target.value)}
                        placeholder="Scan or enter ICCID"
                      />
                      <Button variant="outline" size="icon">
                        <ScanLine className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="msisdn">Phone Number (MSISDN)</Label>
                    <Input
                      id="msisdn"
                      value={customerData.msisdn}
                      onChange={(e) => handleInputChange('msisdn', e.target.value)}
                      placeholder="Assigned phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="networkProvider">Network Provider</Label>
                    <Select value={customerData.networkProvider} onValueChange={(value) => handleInputChange('networkProvider', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Divine Mobile">Divine Mobile</SelectItem>
                        <SelectItem value="Vodacom">Vodacom</SelectItem>
                        <SelectItem value="MTN">MTN</SelectItem>
                        <SelectItem value="Cell C">Cell C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="deviceType">Device Type</Label>
                    <Select value={customerData.deviceType} onValueChange={(value) => handleInputChange('deviceType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select device type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="smartphone">Smartphone</SelectItem>
                        <SelectItem value="feature_phone">Feature Phone</SelectItem>
                        <SelectItem value="tablet">Tablet</SelectItem>
                        <SelectItem value="iot_device">IoT Device</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Document Upload */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Required Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries({
                    idDocument: 'ID Document *',
                    proofOfAddress: 'Proof of Address *',
                    selfieWithId: 'Selfie with ID *'
                  }).map(([key, label]) => (
                    <div key={key} className="border rounded-lg p-4">
                      <Label className="mb-2 block">{label}</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload(key, e.target.files?.[0] || null)}
                          className="hidden"
                          id={`customer-file-${key}`}
                        />
                        <label htmlFor={`customer-file-${key}`} className="cursor-pointer">
                          <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm text-gray-600">
                            {uploadedDocs[key]?.name || 'Click to upload'}
                          </p>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={registerCustomer} disabled={isSubmitting} className="px-8">
                  {isSubmitting ? 'Registering...' : 'Register Customer'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Activation Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activations.map((activation) => (
                  <div key={activation.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(activation.rica_status)}
                        <div>
                          <h4 className="font-semibold">{activation.customer_name}</h4>
                          <p className="text-sm text-gray-600">{activation.customer_phone}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">SIM: {activation.sim_iccid}</p>
                        <p className="text-sm text-gray-600">Network: {activation.network_provider}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(activation.rica_status)}>
                        {activation.rica_status}
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Mail className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Customer Registration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">Upload CSV File</h3>
                <p className="text-gray-600 mb-4">
                  Upload a CSV file with customer data to register multiple customers at once.
                </p>
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerOnboardingTab;