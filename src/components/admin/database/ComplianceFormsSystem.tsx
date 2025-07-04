import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const ComplianceFormsSystem: React.FC = () => {
  const { toast } = useToast();
  const [activeForm, setActiveForm] = useState('individual');
  const [formProgress, setFormProgress] = useState(0);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Form state for individual customer
  const [individualForm, setIndividualForm] = useState({
    fullName: '',
    idNumber: '',
    dateOfBirth: '',
    gender: '',
    mobileNumber: '',
    email: '',
    physicalAddress: '',
    proofOfAddress: null as File | null,
    idDocument: null as File | null,
    selfieWithId: null as File | null,
    simIccid: '',
    msisdn: '',
    consentPopia: false,
    consentMarketing: false,
    termsAccepted: false
  });

  // Form state for business customer
  const [businessForm, setBusinessForm] = useState({
    companyName: '',
    registrationNumber: '',
    vatNumber: '',
    companyAddress: '',
    contactPersonName: '',
    contactPersonPosition: '',
    contactPersonId: '',
    contactEmail: '',
    contactPhone: '',
    cipcDocument: null as File | null,
    proofOfAddress: null as File | null,
    bankStatement: null as File | null,
    taxClearance: null as File | null,
    beeeCertificate: null as File | null,
    companyLetterhead: null as File | null,
    consentPopia: false,
    termsAccepted: false
  });

  // Validation functions
  const validateSouthAfricanId = (id: string): boolean => {
    const idRegex = /^[0-9]{13}$/;
    return idRegex.test(id);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^(\+27|0)[0-9]{9}$/;
    return phoneRegex.test(phone);
  };

  const calculateFormProgress = (formType: string): number => {
    let completed = 0;
    let total = 0;

    if (formType === 'individual') {
      total = 15;
      if (individualForm.fullName) completed++;
      if (individualForm.idNumber && validateSouthAfricanId(individualForm.idNumber)) completed++;
      if (individualForm.dateOfBirth) completed++;
      if (individualForm.gender) completed++;
      if (individualForm.mobileNumber && validatePhoneNumber(individualForm.mobileNumber)) completed++;
      if (individualForm.email && validateEmail(individualForm.email)) completed++;
      if (individualForm.physicalAddress) completed++;
      if (individualForm.proofOfAddress) completed++;
      if (individualForm.idDocument) completed++;
      if (individualForm.selfieWithId) completed++;
      if (individualForm.simIccid) completed++;
      if (individualForm.msisdn) completed++;
      if (individualForm.consentPopia) completed++;
      if (individualForm.consentMarketing) completed++;
      if (individualForm.termsAccepted) completed++;
    } else if (formType === 'business') {
      total = 17;
      if (businessForm.companyName) completed++;
      if (businessForm.registrationNumber) completed++;
      if (businessForm.companyAddress) completed++;
      if (businessForm.contactPersonName) completed++;
      if (businessForm.contactPersonPosition) completed++;
      if (businessForm.contactPersonId && validateSouthAfricanId(businessForm.contactPersonId)) completed++;
      if (businessForm.contactEmail && validateEmail(businessForm.contactEmail)) completed++;
      if (businessForm.contactPhone && validatePhoneNumber(businessForm.contactPhone)) completed++;
      if (businessForm.cipcDocument) completed++;
      if (businessForm.proofOfAddress) completed++;
      if (businessForm.bankStatement) completed++;
      if (businessForm.taxClearance) completed++;
      if (businessForm.beeeCertificate) completed++;
      if (businessForm.companyLetterhead) completed++;
      if (businessForm.consentPopia) completed++;
      if (businessForm.termsAccepted) completed++;
      if (businessForm.vatNumber) completed++;
    }

    return Math.round((completed / total) * 100);
  };

  const handleIndividualSubmit = async () => {
    const errors: Record<string, string> = {};

    // Validation
    if (!individualForm.fullName) errors.fullName = 'Full name is required';
    if (!individualForm.idNumber || !validateSouthAfricanId(individualForm.idNumber)) {
      errors.idNumber = 'Valid South African ID number is required';
    }
    if (!individualForm.email || !validateEmail(individualForm.email)) {
      errors.email = 'Valid email address is required';
    }
    if (!individualForm.mobileNumber || !validatePhoneNumber(individualForm.mobileNumber)) {
      errors.mobileNumber = 'Valid South African phone number is required';
    }
    if (!individualForm.consentPopia) errors.consentPopia = 'POPIA consent is required';
    if (!individualForm.termsAccepted) errors.termsAccepted = 'Terms acceptance is required';

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      toast({
        title: "RICA Registration Successful",
        description: "Individual customer registration completed and verified.",
      });
      
      // Here you would typically send the data to your backend
      console.log('Individual form submitted:', individualForm);
    } else {
      toast({
        title: "Validation Errors",
        description: "Please correct the highlighted fields.",
        variant: "destructive"
      });
    }
  };

  const handleBusinessSubmit = async () => {
    const errors: Record<string, string> = {};

    // Validation
    if (!businessForm.companyName) errors.companyName = 'Company name is required';
    if (!businessForm.registrationNumber) errors.registrationNumber = 'CIPC registration number is required';
    if (!businessForm.contactPersonName) errors.contactPersonName = 'Contact person name is required';
    if (!businessForm.contactPersonId || !validateSouthAfricanId(businessForm.contactPersonId)) {
      errors.contactPersonId = 'Valid contact person ID is required';
    }
    if (!businessForm.contactEmail || !validateEmail(businessForm.contactEmail)) {
      errors.contactEmail = 'Valid contact email is required';
    }
    if (!businessForm.contactPhone || !validatePhoneNumber(businessForm.contactPhone)) {
      errors.contactPhone = 'Valid contact phone number is required';
    }
    if (!businessForm.consentPopia) errors.consentPopia = 'POPIA consent is required';
    if (!businessForm.termsAccepted) errors.termsAccepted = 'Terms acceptance is required';

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      toast({
        title: "Business Registration Successful",
        description: "Corporate customer registration completed and verified.",
      });
      
      console.log('Business form submitted:', businessForm);
    } else {
      toast({
        title: "Validation Errors",
        description: "Please correct the highlighted fields.",
        variant: "destructive"
      });
    }
  };

  const handleFileUpload = (file: File | null, formType: string, fieldName: string) => {
    if (file) {
      // Validate file type and size
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Only PDF, JPG, and PNG files are allowed.",
          variant: "destructive"
        });
        return;
      }

      if (file.size > maxSize) {
        toast({
          title: "File Too Large",
          description: "File size must be less than 5MB.",
          variant: "destructive"
        });
        return;
      }

      if (formType === 'individual') {
        setIndividualForm(prev => ({ ...prev, [fieldName]: file }));
      } else if (formType === 'business') {
        setBusinessForm(prev => ({ ...prev, [fieldName]: file }));
      }

      toast({
        title: "File Uploaded",
        description: `${file.name} uploaded successfully.`,
      });
    }
  };

  React.useEffect(() => {
    const progress = calculateFormProgress(activeForm);
    setFormProgress(progress);
  }, [individualForm, businessForm, activeForm]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">RICA Compliance Forms</h2>
          <p className="text-muted-foreground">South African MVNE/MNO Registration System</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Form Progress</p>
            <p className="text-2xl font-bold text-purple-600">{formProgress}%</p>
          </div>
          <Progress value={formProgress} className="w-32" />
        </div>
      </div>

      {/* Form Tabs */}
      <Tabs value={activeForm} onValueChange={setActiveForm} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted">
          <TabsTrigger value="individual">Individual Customer</TabsTrigger>
          <TabsTrigger value="business">Business Customer</TabsTrigger>
          <TabsTrigger value="sim">SIM/eSIM Registration</TabsTrigger>
          <TabsTrigger value="vendor">Vendor Registration</TabsTrigger>
        </TabsList>

        {/* Individual Customer Form */}
        <TabsContent value="individual" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Individual Customer Registration (RICA)
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                  POPIA Compliant
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name (as per ID) *</Label>
                  <Input
                    id="fullName"
                    value={individualForm.fullName}
                    onChange={(e) => setIndividualForm(prev => ({ ...prev, fullName: e.target.value }))}
                    className={validationErrors.fullName ? 'border-red-500' : ''}
                  />
                  {validationErrors.fullName && (
                    <p className="text-sm text-red-500">{validationErrors.fullName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idNumber">South African ID Number *</Label>
                  <Input
                    id="idNumber"
                    value={individualForm.idNumber}
                    onChange={(e) => setIndividualForm(prev => ({ ...prev, idNumber: e.target.value }))}
                    placeholder="1234567890123"
                    maxLength={13}
                    className={validationErrors.idNumber ? 'border-red-500' : ''}
                  />
                  {validationErrors.idNumber && (
                    <p className="text-sm text-red-500">{validationErrors.idNumber}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={individualForm.dateOfBirth}
                    onChange={(e) => setIndividualForm(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select onValueChange={(value) => setIndividualForm(prev => ({ ...prev, gender: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobileNumber">Mobile Number *</Label>
                  <Input
                    id="mobileNumber"
                    value={individualForm.mobileNumber}
                    onChange={(e) => setIndividualForm(prev => ({ ...prev, mobileNumber: e.target.value }))}
                    placeholder="+27821234567"
                    className={validationErrors.mobileNumber ? 'border-red-500' : ''}
                  />
                  {validationErrors.mobileNumber && (
                    <p className="text-sm text-red-500">{validationErrors.mobileNumber}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={individualForm.email}
                    onChange={(e) => setIndividualForm(prev => ({ ...prev, email: e.target.value }))}
                    className={validationErrors.email ? 'border-red-500' : ''}
                  />
                  {validationErrors.email && (
                    <p className="text-sm text-red-500">{validationErrors.email}</p>
                  )}
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Address Information</h3>
                <div className="space-y-2">
                  <Label htmlFor="physicalAddress">Physical/Residential Address *</Label>
                  <Textarea
                    id="physicalAddress"
                    value={individualForm.physicalAddress}
                    onChange={(e) => setIndividualForm(prev => ({ ...prev, physicalAddress: e.target.value }))}
                    placeholder="Street address, suburb, city, postal code"
                    rows={3}
                  />
                </div>
              </div>

              {/* Document Uploads */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Document Uploads</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="proofOfAddress">Proof of Address *</Label>
                    <Input
                      id="proofOfAddress"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e.target.files?.[0] || null, 'individual', 'proofOfAddress')}
                    />
                    <p className="text-xs text-muted-foreground">
                      Upload utility bill, bank statement (not older than 3 months)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idDocument">ID Document *</Label>
                    <Input
                      id="idDocument"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e.target.files?.[0] || null, 'individual', 'idDocument')}
                    />
                    <p className="text-xs text-muted-foreground">
                      Front and back of South African ID
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="selfieWithId">Selfie with ID *</Label>
                    <Input
                      id="selfieWithId"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e.target.files?.[0] || null, 'individual', 'selfieWithId')}
                    />
                    <p className="text-xs text-muted-foreground">
                      Clear selfie holding your ID document
                    </p>
                  </div>
                </div>
              </div>

              {/* SIM Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">SIM Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="simIccid">SIM ICCID *</Label>
                    <Input
                      id="simIccid"
                      value={individualForm.simIccid}
                      onChange={(e) => setIndividualForm(prev => ({ ...prev, simIccid: e.target.value }))}
                      placeholder="SIM serial number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="msisdn">MSISDN/Phone Number</Label>
                    <Input
                      id="msisdn"
                      value={individualForm.msisdn}
                      onChange={(e) => setIndividualForm(prev => ({ ...prev, msisdn: e.target.value }))}
                      placeholder="Auto-assigned or manual entry"
                    />
                  </div>
                </div>
              </div>

              {/* Consent and Terms */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Consent & Terms</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="consentPopia"
                      checked={individualForm.consentPopia}
                      onCheckedChange={(checked) => 
                        setIndividualForm(prev => ({ ...prev, consentPopia: checked as boolean }))
                      }
                    />
                    <Label htmlFor="consentPopia" className="text-sm">
                      I consent to the processing of my personal information in accordance with POPIA *
                    </Label>
                  </div>
                  {validationErrors.consentPopia && (
                    <p className="text-sm text-red-500">{validationErrors.consentPopia}</p>
                  )}

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="consentMarketing"
                      checked={individualForm.consentMarketing}
                      onCheckedChange={(checked) => 
                        setIndividualForm(prev => ({ ...prev, consentMarketing: checked as boolean }))
                      }
                    />
                    <Label htmlFor="consentMarketing" className="text-sm">
                      I consent to receiving marketing communications
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="termsAccepted"
                      checked={individualForm.termsAccepted}
                      onCheckedChange={(checked) => 
                        setIndividualForm(prev => ({ ...prev, termsAccepted: checked as boolean }))
                      }
                    />
                    <Label htmlFor="termsAccepted" className="text-sm">
                      I accept the Terms & Conditions *
                    </Label>
                  </div>
                  {validationErrors.termsAccepted && (
                    <p className="text-sm text-red-500">{validationErrors.termsAccepted}</p>
                  )}
                </div>
              </div>

              <Button 
                onClick={handleIndividualSubmit}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                size="lg"
              >
                Submit RICA Registration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Business Customer Form */}
        <TabsContent value="business" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Business/Corporate Customer Registration
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                  Corporate RICA
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Company Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={businessForm.companyName}
                    onChange={(e) => setBusinessForm(prev => ({ ...prev, companyName: e.target.value }))}
                    className={validationErrors.companyName ? 'border-red-500' : ''}
                  />
                  {validationErrors.companyName && (
                    <p className="text-sm text-red-500">{validationErrors.companyName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">CIPC Registration Number *</Label>
                  <Input
                    id="registrationNumber"
                    value={businessForm.registrationNumber}
                    onChange={(e) => setBusinessForm(prev => ({ ...prev, registrationNumber: e.target.value }))}
                    className={validationErrors.registrationNumber ? 'border-red-500' : ''}
                  />
                  {validationErrors.registrationNumber && (
                    <p className="text-sm text-red-500">{validationErrors.registrationNumber}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vatNumber">VAT Number</Label>
                  <Input
                    id="vatNumber"
                    value={businessForm.vatNumber}
                    onChange={(e) => setBusinessForm(prev => ({ ...prev, vatNumber: e.target.value }))}
                    placeholder="Optional if applicable"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyAddress">Company Address *</Label>
                  <Textarea
                    id="companyAddress"
                    value={businessForm.companyAddress}
                    onChange={(e) => setBusinessForm(prev => ({ ...prev, companyAddress: e.target.value }))}
                    placeholder="Physical and postal address"
                    rows={2}
                  />
                </div>
              </div>

              {/* Contact Person Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Person Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactPersonName">Contact Person Name *</Label>
                    <Input
                      id="contactPersonName"
                      value={businessForm.contactPersonName}
                      onChange={(e) => setBusinessForm(prev => ({ ...prev, contactPersonName: e.target.value }))}
                      className={validationErrors.contactPersonName ? 'border-red-500' : ''}
                    />
                    {validationErrors.contactPersonName && (
                      <p className="text-sm text-red-500">{validationErrors.contactPersonName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPersonPosition">Position/Title *</Label>
                    <Input
                      id="contactPersonPosition"
                      value={businessForm.contactPersonPosition}
                      onChange={(e) => setBusinessForm(prev => ({ ...prev, contactPersonPosition: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPersonId">Contact Person ID Number *</Label>
                    <Input
                      id="contactPersonId"
                      value={businessForm.contactPersonId}
                      onChange={(e) => setBusinessForm(prev => ({ ...prev, contactPersonId: e.target.value }))}
                      maxLength={13}
                      className={validationErrors.contactPersonId ? 'border-red-500' : ''}
                    />
                    {validationErrors.contactPersonId && (
                      <p className="text-sm text-red-500">{validationErrors.contactPersonId}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={businessForm.contactEmail}
                      onChange={(e) => setBusinessForm(prev => ({ ...prev, contactEmail: e.target.value }))}
                      className={validationErrors.contactEmail ? 'border-red-500' : ''}
                    />
                    {validationErrors.contactEmail && (
                      <p className="text-sm text-red-500">{validationErrors.contactEmail}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone *</Label>
                    <Input
                      id="contactPhone"
                      value={businessForm.contactPhone}
                      onChange={(e) => setBusinessForm(prev => ({ ...prev, contactPhone: e.target.value }))}
                      className={validationErrors.contactPhone ? 'border-red-500' : ''}
                    />
                    {validationErrors.contactPhone && (
                      <p className="text-sm text-red-500">{validationErrors.contactPhone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Document Uploads */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Required Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cipcDocument">CIPC Registration *</Label>
                    <Input
                      id="cipcDocument"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e.target.files?.[0] || null, 'business', 'cipcDocument')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessProofOfAddress">Proof of Address *</Label>
                    <Input
                      id="businessProofOfAddress"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e.target.files?.[0] || null, 'business', 'proofOfAddress')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bankStatement">Bank Statement *</Label>
                    <Input
                      id="bankStatement"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e.target.files?.[0] || null, 'business', 'bankStatement')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="taxClearance">Tax Clearance *</Label>
                    <Input
                      id="taxClearance"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e.target.files?.[0] || null, 'business', 'taxClearance')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="beeeCertificate">B-BBEE Certificate</Label>
                    <Input
                      id="beeeCertificate"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e.target.files?.[0] || null, 'business', 'beeeCertificate')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyLetterhead">Company Letterhead *</Label>
                    <Input
                      id="companyLetterhead"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e.target.files?.[0] || null, 'business', 'companyLetterhead')}
                    />
                  </div>
                </div>
              </div>

              {/* Consent and Terms */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Consent & Terms</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="businessConsentPopia"
                      checked={businessForm.consentPopia}
                      onCheckedChange={(checked) => 
                        setBusinessForm(prev => ({ ...prev, consentPopia: checked as boolean }))
                      }
                    />
                    <Label htmlFor="businessConsentPopia" className="text-sm">
                      We consent to the processing of company information in accordance with POPIA *
                    </Label>
                  </div>
                  {validationErrors.consentPopia && (
                    <p className="text-sm text-red-500">{validationErrors.consentPopia}</p>
                  )}

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="businessTermsAccepted"
                      checked={businessForm.termsAccepted}
                      onCheckedChange={(checked) => 
                        setBusinessForm(prev => ({ ...prev, termsAccepted: checked as boolean }))
                      }
                    />
                    <Label htmlFor="businessTermsAccepted" className="text-sm">
                      We accept the Terms & Conditions *
                    </Label>
                  </div>
                  {validationErrors.termsAccepted && (
                    <p className="text-sm text-red-500">{validationErrors.termsAccepted}</p>
                  )}
                </div>
              </div>

              <Button 
                onClick={handleBusinessSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                size="lg"
              >
                Submit Business Registration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Placeholder for other tabs */}
        <TabsContent value="sim">
          <Card>
            <CardHeader>
              <CardTitle>SIM/eSIM Registration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">SIM registration form will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendor">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Registration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Vendor registration form will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceFormsSystem;