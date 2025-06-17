
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Users, 
  Search, 
  Plus, 
  Edit, 
  Eye,
  UserCheck,
  Phone,
  Mail,
  Building
} from 'lucide-react';

const EmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const employees = [
    {
      id: 'EMP001',
      name: 'Thabo Mthembu',
      position: 'Software Engineer',
      department: 'IT',
      salary: 'R 45,000',
      status: 'Active',
      phone: '+27 11 123 4567',
      email: 'thabo@company.co.za'
    },
    {
      id: 'EMP002',
      name: 'Sarah Johnson',
      position: 'HR Manager',
      department: 'Human Resources',
      salary: 'R 55,000',
      status: 'Active',
      phone: '+27 21 234 5678',
      email: 'sarah@company.co.za'
    },
    {
      id: 'EMP003',
      name: 'Mohamed Hassan',
      position: 'Accountant',
      department: 'Finance',
      salary: 'R 42,000',
      status: 'On Leave',
      phone: '+27 31 345 6789',
      email: 'mohamed@company.co.za'
    },
    {
      id: 'EMP004',
      name: 'Zanele Ndlovu',
      position: 'Marketing Coordinator',
      department: 'Marketing',
      salary: 'R 38,000',
      status: 'Active',
      phone: '+27 12 456 7890',
      email: 'zanele@company.co.za'
    }
  ];

  const departmentStats = [
    { name: 'IT', count: 45, budget: 'R 2.1M' },
    { name: 'HR', count: 12, budget: 'R 540K' },
    { name: 'Finance', count: 18, budget: 'R 810K' },
    { name: 'Marketing', count: 22, budget: 'R 880K' },
    { name: 'Sales', count: 35, budget: 'R 1.6M' }
  ];

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Employee Management</h2>
          <p className="text-gray-600 text-sm">Manage employee records and HR information</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      {/* Department Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {departmentStats.map((dept, index) => (
          <Card key={index} className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-blue-600" />
                  <h3 className="font-semibold text-sm">{dept.name}</h3>
                </div>
                <p className="text-lg font-bold text-gray-900">{dept.count}</p>
                <p className="text-xs text-gray-600">{dept.budget} budget</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Employee Directory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search employees by name, department, or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <UserCheck className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Mobile-Friendly Employee Cards */}
          <div className="block lg:hidden space-y-4">
            {filteredEmployees.map((employee, index) => (
              <Card key={index} className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                        <p className="text-sm text-gray-600">{employee.position}</p>
                        <p className="text-xs text-gray-500">{employee.department}</p>
                      </div>
                      <Badge 
                        className={employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                      >
                        {employee.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">ID:</span>
                        <span className="font-medium">{employee.id}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Salary:</span>
                        <span className="font-semibold text-green-600">{employee.salary}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="text-xs">{employee.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span className="text-xs">{employee.phone}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-2 border-t">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell className="font-semibold text-green-600">{employee.salary}</TableCell>
                    <TableCell>
                      <Badge 
                        className={employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                      >
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeManagement;
