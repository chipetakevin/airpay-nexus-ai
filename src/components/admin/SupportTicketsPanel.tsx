import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Headphones, 
  Plus, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  MessageSquare, 
  User,
  Phone,
  Mail,
  Calendar,
  Filter
} from 'lucide-react';

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mvno: string;
  status: 'active' | 'suspended' | 'inactive';
  balance: number;
  plan: string;
  joinDate: string;
  lastActivity: string;
  dataUsage: number;
  voiceUsage: number;
  smsUsage: number;
  simStatus: 'active' | 'inactive' | 'suspended';
  supportTickets: number;
}

interface SupportTicket {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  subject: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  responseTime: number; // hours
}

interface SupportTicketsPanelProps {
  customers: Customer[];
}

const SupportTicketsPanel: React.FC<SupportTicketsPanelProps> = ({ customers }) => {
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'TKT001',
      customerId: 'CUST002',
      customerName: 'Sarah Johnson',
      customerPhone: '+27829876543',
      subject: 'Unable to access data services',
      description: 'Customer reports inability to connect to mobile data despite having active plan',
      category: 'Technical',
      priority: 'high',
      status: 'in-progress',
      assignedTo: 'Tech Support Team',
      createdAt: '2024-12-29T10:30:00Z',
      updatedAt: '2024-12-30T14:15:00Z',
      responseTime: 2.5
    },
    {
      id: 'TKT002',
      customerId: 'CUST003',
      customerName: 'Michael Brown',
      customerPhone: '+27825555555',
      subject: 'Billing inquiry - overcharge',
      description: 'Customer disputes recent charges on account',
      category: 'Billing',
      priority: 'medium',
      status: 'open',
      assignedTo: 'Billing Team',
      createdAt: '2024-12-28T16:45:00Z',
      updatedAt: '2024-12-28T16:45:00Z',
      responseTime: 0
    }
  ]);

  const [isCreateTicketOpen, setIsCreateTicketOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const getPriorityBadge = (priority: string) => {
    const variants = {
      low: 'bg-blue-100 text-blue-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };
    return variants[priority as keyof typeof variants] || variants.low;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      open: 'bg-gray-100 text-gray-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-600'
    };
    return variants[status as keyof typeof variants] || variants.open;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      case 'closed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    return matchesStatus && matchesPriority;
  });

  const stats = {
    totalTickets: tickets.length,
    openTickets: tickets.filter(t => t.status === 'open').length,
    inProgressTickets: tickets.filter(t => t.status === 'in-progress').length,
    resolvedTickets: tickets.filter(t => t.status === 'resolved').length,
    averageResponseTime: tickets.reduce((sum, t) => sum + t.responseTime, 0) / tickets.length || 0
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Headphones className="w-6 h-6 text-blue-600" />
            Support Ticket Management
          </h2>
          <p className="text-gray-600">Automated ticket routing and resolution tracking</p>
        </div>
        <Dialog open={isCreateTicketOpen} onOpenChange={setIsCreateTicketOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Support Ticket</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Customer</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map(customer => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.firstName} {customer.lastName} - {customer.phone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Subject</label>
                <Input placeholder="Brief description of the issue" />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="account">Account</SelectItem>
                    <SelectItem value="general">General Inquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Priority</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea placeholder="Detailed description of the issue" rows={3} />
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="flex-1">Create Ticket</Button>
                <Button variant="outline" onClick={() => setIsCreateTicketOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-700">{stats.totalTickets}</div>
            <div className="text-sm text-gray-600">Total Tickets</div>
          </CardContent>
        </Card>
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.openTickets}</div>
            <div className="text-sm text-red-600">Open</div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.inProgressTickets}</div>
            <div className="text-sm text-blue-600">In Progress</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.resolvedTickets}</div>
            <div className="text-sm text-green-600">Resolved</div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.averageResponseTime.toFixed(1)}h</div>
            <div className="text-sm text-purple-600">Avg Response</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Filter className="w-4 h-4 text-gray-500" />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Support Tickets ({filteredTickets.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Response Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span className="font-medium">{ticket.customerName}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Phone className="w-3 h-3" />
                          <span>{ticket.customerPhone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-48">
                        <p className="font-medium truncate">{ticket.subject}</p>
                        <p className="text-sm text-gray-500 truncate">{ticket.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{ticket.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityBadge(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(ticket.status)}
                        <Badge className={getStatusBadge(ticket.status)}>
                          {ticket.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{ticket.assignedTo}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(ticket.createdAt)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={ticket.responseTime > 24 ? 'text-red-600' : 'text-green-600'}>
                        {ticket.responseTime > 0 ? `${ticket.responseTime}h` : 'Pending'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredTickets.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No support tickets found matching the current filters.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportTicketsPanel;