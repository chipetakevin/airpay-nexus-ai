import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Upload, 
  FileText, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  User,
  MapPin,
  GraduationCap,
  CreditCard,
  FileCheck
} from 'lucide-react';

interface FormData {
  // Personal Information
  fullName: string;
  idNumber: string;
  email: string;
  phone: string;
  physicalAddress: string;
  postalAddress: string;
  province: string;
  city: string;
  
  // Professional Details
  qualification: string;
  skills: string[];
  regionAssignment: string;
  
  // Banking Details
  bankName: string;
  accountNumber: string;
  branchCode: string;
  accountType: string;
  
  // Compliance
  popiaConsent: boolean;
  termsAccepted: boolean;
}

const FieldWorkerRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    idNumber: '',
    email: '',
    phone: '',
    physicalAddress: '',
    postalAddress: '',
    province: '',
    city: '',
    qualification: '',
    skills: [],
    regionAssignment: '',
    bankName: '',
    accountNumber: '',
    branchCode: '',
    accountType: 'savings',
    popiaConsent: false,
    termsAccepted: false
  });
  
  const [documents, setDocuments] = useState({
    contract: null as File | null,
    idDocument: null as File | null,
    proofOfAddress: null as File | null,
    qualificationCertificate: null as File | null
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const provinces = [
    'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal',
    'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape'
  ];

  const skillOptions = [
    'Communication', 'Customer Service', 'Leadership', 'Sales',
    'Problem Solving', 'Time Management', 'Technical Support', 'Training'
  ];

  const qualificationOptions = [
    'Matric', 'Certificate', 'Diploma', 'Degree', 'Post Graduate'
  ];

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleFileUpload = (type: keyof typeof documents, file: File | null) => {
    setDocuments(prev => ({ ...prev, [type]: file }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1: // Personal Information
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.idNumber.trim()) newErrors.idNumber = 'ID number is required';
        if (!/^\d{13}$/.test(formData.idNumber)) newErrors.idNumber = 'Invalid South African ID number';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.physicalAddress.trim()) newErrors.physicalAddress = 'Physical address is required';
        if (!formData.province) newErrors.province = 'Province is required';
        break;

      case 2: // Professional Details
        if (!formData.qualification) newErrors.qualification = 'Qualification is required';
        if (formData.skills.length === 0) newErrors.skills = 'At least one skill is required';
        if (!formData.regionAssignment.trim()) newErrors.regionAssignment = 'Region assignment is required';
        break;

      case 3: // Banking Details
        if (!formData.bankName.trim()) newErrors.bankName = 'Bank name is required';
        if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Account number is required';
        if (!formData.branchCode.trim()) newErrors.branchCode = 'Branch code is required';
        break;

      case 4: // Documents
        if (!documents.contract) newErrors.contract = 'Contract upload is required';
        if (!documents.idDocument) newErrors.idDocument = 'ID document is required';
        if (!documents.proofOfAddress) newErrors.proofOfAddress = 'Proof of address is required';
        break;

      case 5: // Compliance
        if (!formData.popiaConsent) newErrors.popiaConsent = 'POPIA consent is required';
        if (!formData.termsAccepted) newErrors.termsAccepted = 'Terms acceptance is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const uploadFile = async (file: File, type: string): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `field-worker-${Date.now()}-${type}.${fileExt}`;
    
    // In a real implementation, you would upload to Supabase Storage
    // For now, we'll simulate the upload and return a placeholder URL
    return `uploads/field-workers/${fileName}`;
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) return;

    setIsSubmitting(true);
    try {
      // Upload documents
      const contractUrl = documents.contract ? await uploadFile(documents.contract, 'contract') : null;
      const idDocumentUrl = documents.idDocument ? await uploadFile(documents.idDocument, 'id') : null;
      const proofAddressUrl = documents.proofOfAddress ? await uploadFile(documents.proofOfAddress, 'address') : null;
      const qualificationUrl = documents.qualificationCertificate ? await uploadFile(documents.qualificationCertificate, 'qualification') : null;

      // Create field worker record
      const { data, error } = await supabase
        .from('field_workers')
        .insert({
          user_id: (await supabase.auth.getUser()).data.user?.id,
          full_name: formData.fullName,
          id_number: formData.idNumber,
          email: formData.email,
          phone: formData.phone,
          physical_address: formData.physicalAddress,
          postal_address: formData.postalAddress,
          province: formData.province,
          city: formData.city,
          qualification: formData.qualification,
          skills: formData.skills,
          region_assignment: formData.regionAssignment,
          bank_name: formData.bankName,
          account_number: formData.accountNumber,
          branch_code: formData.branchCode,
          account_type: formData.accountType,
          contract_url: contractUrl,
          id_document_url: idDocumentUrl,
          proof_of_address_url: proofAddressUrl,
          qualification_certificate_url: qualificationUrl,
          popia_consent: formData.popiaConsent,
          popia_consent_at: new Date().toISOString(),
          terms_accepted: formData.termsAccepted,
          terms_accepted_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Registration Successful! 🎉",
        description: "Your field worker registration has been submitted for review. You'll be notified once approved.",
      });

      // Reset form
      setCurrentStep(1);
      setFormData({
        fullName: '', idNumber: '', email: '', phone: '', physicalAddress: '',
        postalAddress: '', province: '', city: '', qualification: '', skills: [],
        regionAssignment: '', bankName: '', accountNumber: '', branchCode: '',
        accountType: 'savings', popiaConsent: false, termsAccepted: false
      });
      setDocuments({ contract: null, idDocument: null, proofOfAddress: null, qualificationCertificate: null });

    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Personal Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={errors.fullName ? 'border-red-500' : ''}
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>
              
              <div>
                <Label htmlFor="idNumber">ID Number *</Label>
                <Input
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) => handleInputChange('idNumber', e.target.value)}
                  placeholder="13-digit South African ID"
                  className={errors.idNumber ? 'border-red-500' : ''}
                />
                {errors.idNumber && <p className="text-red-500 text-sm mt-1">{errors.idNumber}</p>}
              </div>
              
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="0123456789"
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>
            
            <div>
              <Label htmlFor="physicalAddress">Physical Address *</Label>
              <Textarea
                id="physicalAddress"
                value={formData.physicalAddress}
                onChange={(e) => handleInputChange('physicalAddress', e.target.value)}
                className={errors.physicalAddress ? 'border-red-500' : ''}
              />
              {errors.physicalAddress && <p className="text-red-500 text-sm mt-1">{errors.physicalAddress}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="province">Province *</Label>
                <Select value={formData.province} onValueChange={(value) => handleInputChange('province', value)}>
                  <SelectTrigger className={errors.province ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map(province => (
                      <SelectItem key={province} value={province}>{province}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}
              </div>
              
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold">Professional Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="qualification">Highest Qualification *</Label>
                <Select value={formData.qualification} onValueChange={(value) => handleInputChange('qualification', value)}>
                  <SelectTrigger className={errors.qualification ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select qualification" />
                  </SelectTrigger>
                  <SelectContent>
                    {qualificationOptions.map(qual => (
                      <SelectItem key={qual} value={qual}>{qual}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.qualification && <p className="text-red-500 text-sm mt-1">{errors.qualification}</p>}
              </div>
              
              <div>
                <Label htmlFor="regionAssignment">Region Assignment *</Label>
                <Input
                  id="regionAssignment"
                  value={formData.regionAssignment}
                  onChange={(e) => handleInputChange('regionAssignment', e.target.value)}
                  placeholder="e.g., Johannesburg North"
                  className={errors.regionAssignment ? 'border-red-500' : ''}
                />
                {errors.regionAssignment && <p className="text-red-500 text-sm mt-1">{errors.regionAssignment}</p>}
              </div>
            </div>
            
            <div>
              <Label>Skills & Competencies *</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {skillOptions.map(skill => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={formData.skills.includes(skill)}
                      onCheckedChange={() => handleSkillToggle(skill)}
                    />
                    <label htmlFor={skill} className="text-sm font-medium">{skill}</label>
                  </div>
                ))}
              </div>
              {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold">Banking Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bankName">Bank Name *</Label>
                <Input
                  id="bankName"
                  value={formData.bankName}
                  onChange={(e) => handleInputChange('bankName', e.target.value)}
                  className={errors.bankName ? 'border-red-500' : ''}
                />
                {errors.bankName && <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>}
              </div>
              
              <div>
                <Label htmlFor="accountType">Account Type</Label>
                <Select value={formData.accountType} onValueChange={(value) => handleInputChange('accountType', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="current">Current</SelectItem>
                    <SelectItem value="transmission">Transmission</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                  className={errors.accountNumber ? 'border-red-500' : ''}
                />
                {errors.accountNumber && <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>}
              </div>
              
              <div>
                <Label htmlFor="branchCode">Branch Code *</Label>
                <Input
                  id="branchCode"
                  value={formData.branchCode}
                  onChange={(e) => handleInputChange('branchCode', e.target.value)}
                  className={errors.branchCode ? 'border-red-500' : ''}
                />
                {errors.branchCode && <p className="text-red-500 text-sm mt-1">{errors.branchCode}</p>}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Upload className="w-5 h-5 text-orange-600" />
              <h3 className="font-semibold">Document Uploads</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries({
                contract: 'Service Contract *',
                idDocument: 'ID Document *',
                proofOfAddress: 'Proof of Address *',
                qualificationCertificate: 'Qualification Certificate'
              }).map(([key, label]) => (
                <div key={key} className="border rounded-lg p-4">
                  <Label className="mb-2 block">{label}</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(key as keyof typeof documents, e.target.files?.[0] || null)}
                      className="hidden"
                      id={`file-${key}`}
                    />
                    <label htmlFor={`file-${key}`} className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        {documents[key as keyof typeof documents]?.name || 'Click to upload file'}
                      </p>
                    </label>
                  </div>
                  {errors[key] && <p className="text-red-500 text-sm mt-1">{errors[key]}</p>}
                </div>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-red-600" />
              <h3 className="font-semibold">POPIA Compliance & Terms</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Data Protection Notice</h4>
                <p className="text-sm text-gray-700">
                  We collect your personal information for the purpose of field worker registration, 
                  contract management, and commission processing. Your data will be processed in 
                  accordance with the Protection of Personal Information Act (POPIA).
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="popiaConsent"
                  checked={formData.popiaConsent}
                  onCheckedChange={(checked) => handleInputChange('popiaConsent', checked)}
                  className={errors.popiaConsent ? 'border-red-500' : ''}
                />
                <div className="flex-1">
                  <label htmlFor="popiaConsent" className="text-sm font-medium">
                    POPIA Consent *
                  </label>
                  <p className="text-sm text-gray-600 mt-1">
                    I consent to the collection, processing, and storage of my personal information 
                    for the purposes outlined above.
                  </p>
                  {errors.popiaConsent && <p className="text-red-500 text-sm mt-1">{errors.popiaConsent}</p>}
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="termsAccepted"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => handleInputChange('termsAccepted', checked)}
                  className={errors.termsAccepted ? 'border-red-500' : ''}
                />
                <div className="flex-1">
                  <label htmlFor="termsAccepted" className="text-sm font-medium">
                    Terms & Conditions *
                  </label>
                  <p className="text-sm text-gray-600 mt-1">
                    I accept the field worker service agreement and understand my responsibilities 
                    as an independent service provider.
                  </p>
                  {errors.termsAccepted && <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const stepTitles = [
    'Personal Info',
    'Professional',
    'Banking',
    'Documents',
    'Compliance'
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-blue-600" />
            Field Worker Registration
          </CardTitle>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Step {currentStep} of 5</span>
              <span className="text-sm text-gray-500">{Math.round((currentStep / 5) * 100)}% Complete</span>
            </div>
            <Progress value={(currentStep / 5) * 100} className="w-full" />
            <div className="flex justify-between mt-2">
              {stepTitles.map((title, index) => (
                <div key={title} className={`text-xs ${index + 1 <= currentStep ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
                  {title}
                </div>
              ))}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {getStepContent()}
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            
            {currentStep < 5 ? (
              <Button onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FieldWorkerRegistration;