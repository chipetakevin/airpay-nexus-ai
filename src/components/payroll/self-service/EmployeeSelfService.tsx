import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  User, 
  FileText, 
  Download, 
  Edit, 
  Bell,
  MessageCircle,
  CreditCard,
  Calendar,
  Shield,
  Clock,
  DollarSign,
  Settings,
  HelpCircle,
  Smartphone,
  Mail,
  Phone,
  MapPin,
  Building2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmployeeProfile {
  id: string;
  name: string;
  employee_id: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  start_date: string;
  salary: number;
  photo_url?: string;
}

interface Payslip {
  id: string;
  pay_period: string;
  gross_salary: number;
  net_salary: number;
  paye_tax: number;
  uif_contribution: number;
  medical_aid: number;
  pension_fund: number;
  generated_date: string;
  status: string;
}

interface LeaveRequest {
  id: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  days_requested: number;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
  submitted_date: string;
}

interface BenefitInfo {
  id: string;
  benefit_type: string;
  provider: string;
  coverage: string;
  premium: number;
  status: 'active' | 'inactive';
}

const EmployeeSelfService = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPayslipModal, setShowPayslipModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);
  const { toast } = useToast();

  // Mock data - in real implementation, this would come from API
  const [employee] = useState<EmployeeProfile>({
    id: '1',
    name: 'John Mthembu',
    employee_id: 'EMP001',
    email: 'john.mthembu@divinemobile.co.za',
    phone: '+27 11 123 4567',
    department: 'IT Development',
    position: 'Senior Developer',
    start_date: '2022-03-15',
    salary: 65000,
    photo_url: ''
  });

  const [payslips] = useState<Payslip[]>([
    {
      id: '1',
      pay_period: 'January 2025',
      gross_salary: 65000,
      net_salary: 45240,
      paye_tax: 12850,
      uif_contribution: 650,
      medical_aid: 1500,
      pension_fund: 4875,
      generated_date: '2025-01-31',
      status: 'available'
    },
    {
      id: '2',
      pay_period: 'December 2024',
      gross_salary: 65000,
      net_salary: 48240,
      paye_tax: 12850,
      uif_contribution: 650,
      medical_aid: 1500,
      pension_fund: 4875,
      generated_date: '2024-12-31',
      status: 'available'
    }
  ]);

  const [leaveRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      leave_type: 'Annual Leave',
      start_date: '2025-02-15',
      end_date: '2025-02-22',
      days_requested: 5,
      status: 'pending',
      reason: 'Family vacation',
      submitted_date: '2025-01-20'
    },
    {
      id: '2',
      leave_type: 'Sick Leave',
      start_date: '2025-01-10',
      end_date: '2025-01-12',
      days_requested: 3,
      status: 'approved',
      reason: 'Medical appointment',
      submitted_date: '2025-01-09'
    }
  ]);

  const [benefits] = useState<BenefitInfo[]>([
    {
      id: '1',
      benefit_type: 'Medical Aid',
      provider: 'Discovery Health',
      coverage: 'Comprehensive Plan',
      premium: 1500,
      status: 'active'
    },
    {
      id: '2',
      benefit_type: 'Pension Fund',
      provider: 'Allan Gray',
      coverage: '7.5% Contribution',
      premium: 4875,
      status: 'active'
    },
    {
      id: '3',
      benefit_type: 'Group Life Insurance',
      provider: 'Old Mutual',
      coverage: '4x Annual Salary',
      premium: 285,
      status: 'active'
    }
  ]);

  const downloadPayslip = (payslip: Payslip) => {
    toast({
      title: "Payslip Downloaded",
      description: `${payslip.pay_period} payslip has been downloaded successfully.`,
    });
  };

  const downloadTaxCertificate = () => {
    toast({
      title: "Tax Certificate Generated",
      description: "Your IRP5 tax certificate has been generated and downloaded.",
    });
  };

  const submitLeaveRequest = (formData: any) => {
    toast({
      title: "Leave Request Submitted",
      description: "Your leave request has been submitted for approval.",
    });
    setShowLeaveModal(false);
  };

  const updateProfile = (updatedData: any) => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6 p-4">
      {/* Employee Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{employee.name}</h1>
          <p className="text-blue-100">{employee.position} • {employee.department}</p>
          <p className="text-blue-200 text-sm">Employee ID: {employee.employee_id}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            <Smartphone className="w-4 h-4 mr-2" />
            Mobile App
          </Button>
          <Button variant="secondary" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Current Salary</p>
                <p className="text-2xl font-bold text-green-800">R{employee.salary.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">Leave Balance</p>
                <p className="text-2xl font-bold text-blue-800">18 days</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700">Benefits</p>
                <p className="text-2xl font-bold text-purple-800">{benefits.filter(b => b.status === 'active').length}</p>
              </div>
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700">Service Years</p>
                <p className="text-2xl font-bold text-orange-800">2.8</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="payslips">Payslips</TabsTrigger>
          <TabsTrigger value="leave">Leave</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <Input value={employee.name} disabled />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Employee ID</label>
                    <Input value={employee.employee_id} disabled />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <Input value={employee.email} />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <Input value={employee.phone} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Department</label>
                    <Input value={employee.department} disabled />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Position</label>
                    <Input value={employee.position} disabled />
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button onClick={() => updateProfile({})}>
                  <Edit className="w-4 h-4 mr-2" />
                  Update Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Address Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Street Address</label>
                    <Input placeholder="Enter your street address" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">City</label>
                    <Input placeholder="Enter your city" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Province</label>
                    <Input placeholder="Enter your province" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Postal Code</label>
                    <Input placeholder="Enter postal code" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payslips Tab */}
        <TabsContent value="payslips" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Payslips & Tax Documents</h3>
            <Button onClick={downloadTaxCertificate}>
              <Download className="w-4 h-4 mr-2" />
              Download IRP5
            </Button>
          </div>

          <div className="grid gap-4">
            {payslips.map((payslip) => (
              <Card key={payslip.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-semibold">{payslip.pay_period}</h4>
                      <p className="text-sm text-gray-600">Generated: {payslip.generated_date}</p>
                      <div className="flex gap-4 text-sm">
                        <span>Gross: R{payslip.gross_salary.toLocaleString()}</span>
                        <span>Net: R{payslip.net_salary.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setSelectedPayslip(payslip);
                          setShowPayslipModal(true);
                        }}
                      >
                        <FileText className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => downloadPayslip(payslip)}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Leave Tab */}
        <TabsContent value="leave" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Leave Management</h3>
            <Button onClick={() => setShowLeaveModal(true)}>
              <Calendar className="w-4 h-4 mr-2" />
              Request Leave
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <h4 className="font-semibold text-blue-900">Annual Leave</h4>
                <p className="text-2xl font-bold text-blue-800">18</p>
                <p className="text-sm text-blue-600">days remaining</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <h4 className="font-semibold text-green-900">Sick Leave</h4>
                <p className="text-2xl font-bold text-green-800">27</p>
                <p className="text-sm text-green-600">days remaining</p>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <h4 className="font-semibold text-purple-900">Family Responsibility</h4>
                <p className="text-2xl font-bold text-purple-800">3</p>
                <p className="text-sm text-purple-600">days remaining</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Leave History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaveRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{request.leave_type}</h4>
                        <Badge className={
                          request.status === 'approved' ? 'bg-green-100 text-green-800' :
                          request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }>
                          {request.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {request.start_date} to {request.end_date} ({request.days_requested} days)
                      </p>
                      <p className="text-sm text-gray-500">{request.reason}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Submitted</p>
                      <p className="text-sm font-medium">{request.submitted_date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Benefits Tab */}
        <TabsContent value="benefits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Employee Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{benefit.benefit_type}</h4>
                        <Badge className={benefit.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {benefit.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{benefit.provider} • {benefit.coverage}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">R{benefit.premium.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">per month</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Document Center
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <FileText className="w-6 h-6" />
                  <span>Employment Contract</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <CreditCard className="w-6 h-6" />
                  <span>Tax Certificates</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Shield className="w-6 h-6" />
                  <span>Benefit Documents</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Building2 className="w-6 h-6" />
                  <span>Company Policies</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Support Tab */}
        <TabsContent value="support" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Get Help
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Live Chat Support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Email HR Department
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Support: 0800 123 456
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Knowledge Base
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="w-4 h-4 mr-2" />
                  Notification Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Export My Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Mobile App Setup
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Payslip Modal */}
      <Dialog open={showPayslipModal} onOpenChange={setShowPayslipModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Payslip Details - {selectedPayslip?.pay_period}</DialogTitle>
          </DialogHeader>
          {selectedPayslip && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Gross Salary</p>
                  <p className="text-lg font-bold">R{selectedPayslip.gross_salary.toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Net Salary</p>
                  <p className="text-lg font-bold text-green-600">R{selectedPayslip.net_salary.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Deductions</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span>PAYE Tax:</span>
                    <span>R{selectedPayslip.paye_tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>UIF:</span>
                    <span>R{selectedPayslip.uif_contribution.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Medical Aid:</span>
                    <span>R{selectedPayslip.medical_aid.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pension Fund:</span>
                    <span>R{selectedPayslip.pension_fund.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={() => downloadPayslip(selectedPayslip)}>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Copy
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Leave Request Modal */}
      <Dialog open={showLeaveModal} onOpenChange={setShowLeaveModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Leave</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Leave Type</label>
              <select className="w-full p-2 border rounded-md">
                <option>Annual Leave</option>
                <option>Sick Leave</option>
                <option>Family Responsibility</option>
                <option>Maternity/Paternity</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Start Date</label>
                <Input type="date" />
              </div>
              <div>
                <label className="text-sm font-medium">End Date</label>
                <Input type="date" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Reason</label>
              <Textarea placeholder="Please provide a reason for your leave request..." />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => submitLeaveRequest({})}>
                <Calendar className="w-4 h-4 mr-2" />
                Submit Request
              </Button>
              <Button variant="outline" onClick={() => setShowLeaveModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeSelfService;