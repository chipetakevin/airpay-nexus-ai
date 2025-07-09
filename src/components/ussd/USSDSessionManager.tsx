import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUSSDData } from '@/hooks/useUSSDData';
import { toast } from 'sonner';
import { 
  Activity, 
  Users, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  X,
  RefreshCw,
  Search,
  Filter,
  Eye,
  MessageSquare,
  Phone
} from 'lucide-react';

interface USSDSession {
  id: string;
  sessionId: string;
  phoneNumber: string;
  userId?: string;
  sessionStatus: 'active' | 'completed' | 'timeout' | 'error';
  currentMenu: string;
  sessionData: any;
  startedAt: string;
  expiresAt: string;
  completedAt?: string;
  timeoutAt?: string;
  language: string;
}

const USSDSessionManager = () => {
  const { ussdCodes, loading } = useUSSDData();
  const [sessions, setSessions] = useState<USSDSession[]>([]);
  const [activeTab, setActiveTab] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSession, setSelectedSession] = useState<USSDSession | null>(null);

  // Mock data for demonstration
  useEffect(() => {
    const mockSessions: USSDSession[] = [
      {
        id: '1',
        sessionId: 'sess_001',
        phoneNumber: '+27123456789',
        userId: 'user_123',
        sessionStatus: 'active',
        currentMenu: 'main_menu',
        sessionData: { lastInput: '1', menuPath: ['main'] },
        startedAt: new Date(Date.now() - 120000).toISOString(),
        expiresAt: new Date(Date.now() + 180000).toISOString(),
        language: 'en'
      },
      {
        id: '2',
        sessionId: 'sess_002',
        phoneNumber: '+27987654321',
        sessionStatus: 'completed',
        currentMenu: 'airtime_purchase',
        sessionData: { amount: 50, transaction_id: 'tx_456' },
        startedAt: new Date(Date.now() - 300000).toISOString(),
        expiresAt: new Date(Date.now() - 120000).toISOString(),
        completedAt: new Date(Date.now() - 60000).toISOString(),
        language: 'en'
      },
      {
        id: '3',
        sessionId: 'sess_003',
        phoneNumber: '+27555666777',
        sessionStatus: 'timeout',
        currentMenu: 'balance_inquiry',
        sessionData: { step: 'authentication' },
        startedAt: new Date(Date.now() - 420000).toISOString(),
        expiresAt: new Date(Date.now() - 240000).toISOString(),
        timeoutAt: new Date(Date.now() - 240000).toISOString(),
        language: 'en'
      }
    ];
    setSessions(mockSessions);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Activity className="w-4 h-4 text-green-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'timeout':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'completed':
        return 'bg-blue-500';
      case 'timeout':
        return 'bg-orange-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDuration = (startTime: string, endTime?: string) => {
    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : new Date();
    const duration = Math.floor((end.getTime() - start.getTime()) / 1000);
    
    if (duration < 60) return `${duration}s`;
    if (duration < 3600) return `${Math.floor(duration / 60)}m ${duration % 60}s`;
    return `${Math.floor(duration / 3600)}h ${Math.floor((duration % 3600) / 60)}m`;
  };

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.phoneNumber.includes(searchTerm) || 
                         session.sessionId.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || session.sessionStatus === statusFilter;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'active' && session.sessionStatus === 'active') ||
                      (activeTab === 'completed' && session.sessionStatus === 'completed') ||
                      (activeTab === 'issues' && ['timeout', 'error'].includes(session.sessionStatus));
    
    return matchesSearch && matchesStatus && matchesTab;
  });

  const terminateSession = (sessionId: string) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, sessionStatus: 'completed', completedAt: new Date().toISOString() }
        : session
    ));
    toast.success('Session terminated successfully');
  };

  const sessionStats = {
    total: sessions.length,
    active: sessions.filter(s => s.sessionStatus === 'active').length,
    completed: sessions.filter(s => s.sessionStatus === 'completed').length,
    issues: sessions.filter(s => ['timeout', 'error'].includes(s.sessionStatus)).length
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-6 h-6 mr-3 text-blue-500" />
            USSD Session Manager
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Session Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Total Sessions</p>
                    <p className="text-2xl font-bold">{sessionStats.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Activity className="h-8 w-8 text-green-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Active</p>
                    <p className="text-2xl font-bold">{sessionStats.active}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-blue-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Completed</p>
                    <p className="text-2xl font-bold">{sessionStats.completed}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <AlertTriangle className="h-8 w-8 text-orange-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Issues</p>
                    <p className="text-2xl font-bold">{sessionStats.issues}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by phone number or session ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="timeout">Timeout</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          {/* Session Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Sessions</TabsTrigger>
              <TabsTrigger value="active">Active ({sessionStats.active})</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="issues">Issues ({sessionStats.issues})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <SessionsList sessions={filteredSessions} onTerminate={terminateSession} onView={setSelectedSession} />
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              <SessionsList sessions={filteredSessions} onTerminate={terminateSession} onView={setSelectedSession} />
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <SessionsList sessions={filteredSessions} onTerminate={terminateSession} onView={setSelectedSession} />
            </TabsContent>

            <TabsContent value="issues" className="space-y-4">
              <SessionsList sessions={filteredSessions} onTerminate={terminateSession} onView={setSelectedSession} />
            </TabsContent>
          </Tabs>

          {/* Session Detail Modal */}
          {selectedSession && (
            <SessionDetailModal
              session={selectedSession}
              onClose={() => setSelectedSession(null)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

interface SessionsListProps {
  sessions: USSDSession[];
  onTerminate: (sessionId: string) => void;
  onView: (session: USSDSession) => void;
}

const SessionsList: React.FC<SessionsListProps> = ({ sessions, onTerminate, onView }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Activity className="w-4 h-4 text-green-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'timeout':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'completed':
        return 'bg-blue-500';
      case 'timeout':
        return 'bg-orange-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDuration = (startTime: string, endTime?: string) => {
    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : new Date();
    const duration = Math.floor((end.getTime() - start.getTime()) / 1000);
    
    if (duration < 60) return `${duration}s`;
    if (duration < 3600) return `${Math.floor(duration / 60)}m ${duration % 60}s`;
    return `${Math.floor(duration / 3600)}h ${Math.floor((duration % 3600) / 60)}m`;
  };

  return (
    <div className="space-y-3">
      {sessions.map((session) => (
        <Card key={session.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(session.sessionStatus)}
                  <Badge className={getStatusColor(session.sessionStatus)}>
                    {session.sessionStatus.toUpperCase()}
                  </Badge>
                </div>
                
                <div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="font-mono font-semibold">{session.phoneNumber}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Session: {session.sessionId} • Menu: {session.currentMenu}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right text-sm">
                  <div className="text-gray-500">Duration</div>
                  <div className="font-semibold">
                    {formatDuration(session.startedAt, session.completedAt || session.timeoutAt)}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onView(session)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  
                  {session.sessionStatus === 'active' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onTerminate(session.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {sessions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No sessions found matching your criteria
        </div>
      )}
    </div>
  );
};

interface SessionDetailModalProps {
  session: USSDSession;
  onClose: () => void;
}

const SessionDetailModal: React.FC<SessionDetailModalProps> = ({ session, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Session Details</h3>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Session ID</Label>
                <div className="font-mono">{session.sessionId}</div>
              </div>
              <div>
                <Label>Phone Number</Label>
                <div className="font-mono">{session.phoneNumber}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Status</Label>
                <Badge className={`${session.sessionStatus === 'active' ? 'bg-green-500' : 
                  session.sessionStatus === 'completed' ? 'bg-blue-500' :
                  session.sessionStatus === 'timeout' ? 'bg-orange-500' : 'bg-red-500'}`}>
                  {session.sessionStatus.toUpperCase()}
                </Badge>
              </div>
              <div>
                <Label>Current Menu</Label>
                <div>{session.currentMenu}</div>
              </div>
            </div>

            <div>
              <Label>Session Data</Label>
              <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                <pre>{JSON.stringify(session.sessionData, null, 2)}</pre>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Started At</Label>
                <div>{new Date(session.startedAt).toLocaleString()}</div>
              </div>
              <div>
                <Label>Expires At</Label>
                <div>{new Date(session.expiresAt).toLocaleString()}</div>
              </div>
            </div>

            {session.completedAt && (
              <div>
                <Label>Completed At</Label>
                <div>{new Date(session.completedAt).toLocaleString()}</div>
              </div>
            )}

            {session.timeoutAt && (
              <div>
                <Label>Timeout At</Label>
                <div>{new Date(session.timeoutAt).toLocaleString()}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default USSDSessionManager;