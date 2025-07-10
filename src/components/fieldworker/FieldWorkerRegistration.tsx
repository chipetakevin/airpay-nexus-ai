import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { User, Phone, Mail, MapPin, Building, CreditCard, Settings, Upload, CheckCircle, X, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useBranchCodeAutoAssign } from '@/hooks/useBranchCodeAutoAssign';
import { usePermanentFormStorage } from '@/hooks/usePermanentFormStorage';

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
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  const { SOUTH_AFRICAN_BANK_BRANCHES, autoAssignBranchCode } = useBranchCodeAutoAssign();
  const { savePermanently, loadPermanentData, autoSave, autoFillForm } = usePermanentFormStorage('fieldworker');
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const [bankQuery, setBankQuery] = useState(formData.bankName || '');

  // Enhanced initialization with auto-fill
  useEffect(() => {
    const initializeForm = () => {
      try {
        const savedData = loadPermanentData();
        if (savedData && Object.keys(savedData).length > 0) {
          console.log('🔄 Auto-filling field worker form with saved data...', savedData);
          
          setFormData(prev => ({ ...prev, ...savedData }));
          
          toast({
            title: "📝 Field Worker Form Auto-Filled!",
            description: "Your previously saved information has been restored.",
            duration: 3000
          });
        } else {
          console.log('ℹ️ No saved field worker data found - starting with clean form');
        }
      } catch (error) {
        console.error('Error initializing field worker form:', error);
      }
    };

    initializeForm();
  }, []); // Only run once on mount

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

  const handleInputChange = (field: string, value: string) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);
    
    // Clear specific field errors when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Enhanced auto-save with optimized debouncing
    autoSave(updatedFormData, 800);
  };

  const handleBankSelect = (bankName: string) => {
    setBankQuery(bankName);
    setShowBankDropdown(false);
    handleInputChange('bankName', bankName);
    
    // Auto-assign branch code
    autoAssignBranchCode(bankName, (branchCode) => {
      handleInputChange('branchCode', branchCode);
      console.log(`✅ Branch code ${branchCode} assigned for ${bankName}`);
    });
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

  const uploadFileToStorage = async (file: File, folder: string): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('field-worker-documents')
      .upload(fileName, file);

    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from('field-worker-documents')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) return;

    setIsSubmitting(true);
    try {
      // Check if user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to submit your registration.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Registration Submitted! 🎉",
        description: "Your application is pending admin approval. You'll receive an email notification once processed.",
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
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Personal Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={`h-12 ${errors.fullName ? 'border-red-500' : ''}`}
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="idNumber" className="text-sm font-medium">ID Number *</Label>
                <Input
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) => handleInputChange('idNumber', e.target.value)}
                  placeholder="13-digit South African ID"
                  className={`h-12 ${errors.idNumber ? 'border-red-500' : ''}`}
                />
                {errors.idNumber && <p className="text-red-500 text-sm mt-1">{errors.idNumber}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`h-12 ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="0123456789"
                  className={`h-12 ${errors.phone ? 'border-red-500' : ''}`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="physicalAddress" className="text-sm font-medium">Physical Address *</Label>
              <Textarea
                id="physicalAddress"
                value={formData.physicalAddress}
                onChange={(e) => handleInputChange('physicalAddress', e.target.value)}
                className={`min-h-20 ${errors.physicalAddress ? 'border-red-500' : ''}`}
              />
              {errors.physicalAddress && <p className="text-red-500 text-sm mt-1">{errors.physicalAddress}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="province" className="text-sm font-medium">Province *</Label>
                <Select value={formData.province} onValueChange={(value) => handleInputChange('province', value)}>
                  <SelectTrigger className={`h-12 ${errors.province ? 'border-red-500' : ''}`}>
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
              
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="h-12"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Building className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold">Professional Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="qualification" className="text-sm font-medium">Highest Qualification *</Label>
                <Select value={formData.qualification} onValueChange={(value) => handleInputChange('qualification', value)}>
                  <SelectTrigger className={`h-12 ${errors.qualification ? 'border-red-500' : ''}`}>
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
              
              <div className="space-y-2">
                <Label htmlFor="regionAssignment" className="text-sm font-medium">Region Assignment *</Label>
                <Input
                  id="regionAssignment"
                  value={formData.regionAssignment}
                  onChange={(e) => handleInputChange('regionAssignment', e.target.value)}
                  placeholder="e.g., Johannesburg North"
                  className={`h-12 ${errors.regionAssignment ? 'border-red-500' : ''}`}
                />
                {errors.regionAssignment && <p className="text-red-500 text-sm mt-1">{errors.regionAssignment}</p>}
              </div>
            </div>
            
            <div className="space-y-3">
              <Label className="text-sm font-medium">Skills & Competencies *</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {skillOptions.map(skill => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={formData.skills.includes(skill)}
                      onCheckedChange={() => handleSkillToggle(skill)}
                    />
                    <label htmlFor={skill} className="text-sm font-medium cursor-pointer">{skill}</label>
                  </div>
                ))}
              </div>
              {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold">Banking Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bank Selection with Autocomplete */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <Label htmlFor="bankSearch" className="text-sm font-medium text-gray-800">
                    Select Your South African Bank *
                  </Label>
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-300 self-start sm:self-auto">
                    Auto-Detect
                  </Badge>
                </div>
                <div className="relative">
                  <Input
                    id="bankSearch"
                    value={bankQuery}
                    onChange={(e) => {
                      setBankQuery(e.target.value);
                      setShowBankDropdown(e.target.value.length > 0);
                    }}
                    placeholder="Start typing your bank name (e.g., FNB, ABSA, Standard Bank)..."
                    className={`w-full h-12 text-base ${errors.bankName ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'} bg-white`}
                    onFocus={() => setShowBankDropdown(bankQuery.length > 0)}
                  />
                  
                  {showBankDropdown && Object.keys(SOUTH_AFRICAN_BANK_BRANCHES).filter(bank => 
                    bank.toLowerCase().includes(bankQuery.toLowerCase())
                  ).length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-md shadow-lg z-50 max-h-48 overflow-y-auto">
                      {Object.keys(SOUTH_AFRICAN_BANK_BRANCHES).filter(bank => 
                        bank.toLowerCase().includes(bankQuery.toLowerCase())
                      ).map((bank) => (
                        <div
                          key={bank}
                          className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                          onClick={() => handleBankSelect(bank)}
                        >
                          <div className="font-medium text-gray-900 text-sm sm:text-base">{bank}</div>
                          <div className="text-xs sm:text-sm text-blue-600">
                            Branch Code: {SOUTH_AFRICAN_BANK_BRANCHES[bank]?.universalBranchCode}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {errors.bankName && <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="accountType" className="text-sm font-medium">Account Type</Label>
                <Select value={formData.accountType} onValueChange={(value) => handleInputChange('accountType', value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="current">Current</SelectItem>
                    <SelectItem value="transmission">Transmission</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Account Number */}
              <div className="space-y-2">
                <Label htmlFor="accountNumber" className="text-sm font-medium text-gray-800">
                  Account Number *
                </Label>
                <Input
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                    handleInputChange('accountNumber', value);
                  }}
                  placeholder="Enter account number"
                  className={`w-full h-12 text-base font-mono ${errors.accountNumber ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'} bg-white`}
                  maxLength={11}
                />
                {formData.accountNumber && formData.accountNumber.length >= 9 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                    <p className="text-green-700 text-sm flex items-center gap-2">
                      <span className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </span>
                      Valid account number format
                    </p>
                  </div>
                )}
                {errors.accountNumber && <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>}
              </div>
            </div>

            {/* Branch Code - Full width auto-filled field */}
            <div className="space-y-2">
              <Label htmlFor="branchCode" className="text-sm font-medium text-gray-800">
                Branch Code
              </Label>
              <Input
                id="branchCode"
                value={formData.branchCode || ''}
                placeholder={formData.branchCode ? formData.branchCode : "Auto-filled from bank selection"}
                readOnly
                className={`w-full h-12 text-base font-mono font-semibold ${
                  formData.branchCode 
                    ? 'bg-green-50 border-green-300 text-green-700' 
                    : 'bg-blue-50 border-blue-200 text-blue-700'
                }`}
              />
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                <div className="flex items-start gap-2 text-xs text-blue-700">
                  <span className="w-3 h-3 mt-0.5 flex-shrink-0">ℹ️</span>
                  <span>Branch code will be automatically assigned from your bank selection</span>
                </div>
              </div>
              {errors.branchCode && <p className="text-red-500 text-sm mt-1">{errors.branchCode}</p>}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Upload className="w-5 h-5 text-orange-600" />
              <h3 className="font-semibold">Document Uploads</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries({
                contract: 'Service Contract *',
                idDocument: 'ID Document *',
                proofOfAddress: 'Proof of Address *',
                qualificationCertificate: 'Qualification Certificate'
              }).map(([key, label]) => (
                <div key={key} className="border rounded-lg p-4">
                  <Label className="mb-2 block text-sm font-medium">{label}</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
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
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-red-600" />
              <h3 className="font-semibold">POPIA Compliance & Terms</h3>
            </div>
            
            <div className="space-y-6">
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
                  onCheckedChange={(checked) => handleInputChange('popiaConsent', checked ? 'true' : 'false')}
                  className={errors.popiaConsent ? 'border-red-500' : ''}
                />
                <div className="flex-1">
                  <label htmlFor="popiaConsent" className="text-sm font-medium cursor-pointer">
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
                  onCheckedChange={(checked) => handleInputChange('termsAccepted', checked ? 'true' : 'false')}
                  className={errors.termsAccepted ? 'border-red-500' : ''}
                />
                <div className="flex-1">
                  <label htmlFor="termsAccepted" className="text-sm font-medium cursor-pointer">
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
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <Card>
        <CardHeader className="space-y-4">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <User className="w-6 h-6 text-blue-600" />
            Field Worker Registration
          </CardTitle>
          <div>
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
        
        <CardContent className="space-y-6">
          {getStepContent()}
          
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="w-full sm:flex-1 h-12 order-2 sm:order-1"
            >
              Back
            </Button>
            
            {currentStep < 5 ? (
              <Button 
                onClick={handleNext}
                className="w-full sm:flex-1 h-12 order-1 sm:order-2"
              >
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="w-full sm:flex-1 h-12 order-1 sm:order-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Registration'
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FieldWorkerRegistration;