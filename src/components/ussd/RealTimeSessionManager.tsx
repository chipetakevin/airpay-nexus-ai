import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Activity, 
  Users, 
  Clock, 
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  RefreshCw,
  Eye,
  StopCircle,
  Play,
  Smartphone,
  Globe,
  Zap
} from 'lucide-react';
import { useUSSDData } from '@/hooks/useUSSDData';
import { format, formatDistanceToNow } from 'date-fns';

const RealTimeSessionManager = () => {
  const { whatsappSessions, customers, loading } = useUSSDData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [sessionFilter, setSessionFilter] = useState<'all' | 'active' | 'ended' | 'suspended'>('all');

  // Filter sessions based on search and filter
  const filteredSessions = whatsappSessions.filter(session => {
    const matchesSearch = !searchQuery || 
      session.whatsapp_number.includes(searchQuery) ||
      session.session_id.includes(searchQuery);
    
    const matchesFilter = sessionFilter === 'all' || session.status === sessionFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Get session statistics
  const sessionStats = {
    total: whatsappSessions.length,
    active: whatsappSessions.filter(s => s.status === 'active').length,
    ended: whatsappSessions.filter(s => s.status === 'ended').length,
    suspended: whatsappSessions.filter(s => s.status === 'suspended').length,
    fallbackTriggered: whatsappSessions.filter(s => s.fallback_triggered).length
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'ended':
        return <XCircle className="w-4 h-4 text-gray-500" />;
      case 'suspended':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'ended':
        return 'secondary';
      case 'suspended':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'whatsapp':
        return <MessageSquare className="w-4 h-4" />;
      case 'gsm':
        return <Smartphone className="w-4 h-4" />;
      case 'website':
        return <Globe className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const formatDuration = (startTime: string, endTime?: string | null) => {
    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : new Date();
    const duration = end.getTime() - start.getTime();
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <Activity className="w-6 h-6 mr-2" />
          Real-Time Session Manager
        </h2>
        <Button variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Auto-refresh: ON
        </Button>
      </div>

      {/* Session Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Sessions</p>
                <p className="text-2xl font-bold">{sessionStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-600">{sessionStats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-muted-foreground">Ended</p>
                <p className="text-2xl font-bold text-gray-600">{sessionStats.ended}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Suspended</p>
                <p className="text-2xl font-bold text-yellow-600">{sessionStats.suspended}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Fallbacks</p>
                <p className="text-2xl font-bold text-orange-600">{sessionStats.fallbackTriggered}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search by phone number or session ID..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              {['all', 'active', 'ended', 'suspended'].map((filter) => (
                <Button
                  key={filter}
                  variant={sessionFilter === filter ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSessionFilter(filter as any)}
                  className="capitalize"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session List */}
      <Card>
        <CardHeader>
          <CardTitle>Live Sessions ({filteredSessions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredSessions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No sessions found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredSessions.map((session) => (
                <div 
                  key={session.id} 
                  className={`flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer ${
                    selectedSession === session.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedSession(session.id)}
                >
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(session.status)}
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="font-mono">
                          {session.session_id}
                        </Badge>
                        <span className="font-medium">{session.whatsapp_number}</span>
                        <Badge variant={getStatusColor(session.status) as any}>
                          {session.status}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          {getPlatformIcon(session.platform)}
                          <span className="text-sm text-muted-foreground">{session.platform}</span>
                        </div>
                        {session.fallback_triggered && (
                          <Badge variant="destructive" className="text-xs">
                            Fallback
                          </Badge>
                        )}
                      </div>
                      
                      <div className="text-sm text-muted-foreground mt-1">
                        <span>Started: {format(new Date(session.start_time), 'HH:mm:ss')}</span>
                        <span className="mx-2">•</span>
                        <span>Duration: {formatDuration(session.start_time, session.end_time)}</span>
                        <span className="mx-2">•</span>
                        <span>Last activity: {formatDistanceToNow(new Date(session.last_activity), { addSuffix: true })}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    
                    {session.status === 'active' ? (
                      <Button variant="outline" size="sm" className="text-red-600">
                        <StopCircle className="w-4 h-4" />
                      </Button>
                    ) : session.status === 'suspended' ? (
                      <Button variant="outline" size="sm" className="text-green-600">
                        <Play className="w-4 h-4" />
                      </Button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Session Details (if selected) */}
      {selectedSession && (
        <Card>
          <CardHeader>
            <CardTitle>Session Details</CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const session = filteredSessions.find(s => s.id === selectedSession);
              if (!session) return null;
              
              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium">Session Information</h4>
                      <div className="space-y-2 mt-2 text-sm">
                        <div><strong>Session ID:</strong> {session.session_id}</div>
                        <div><strong>WhatsApp Number:</strong> {session.whatsapp_number}</div>
                        <div><strong>Platform:</strong> {session.platform}</div>
                        <div><strong>Status:</strong> {session.status}</div>
                        <div><strong>Start Time:</strong> {format(new Date(session.start_time), 'PPp')}</div>
                        {session.end_time && (
                          <div><strong>End Time:</strong> {format(new Date(session.end_time), 'PPp')}</div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Session State</h4>
                      <div className="space-y-2 mt-2 text-sm">
                        <div><strong>Last Activity:</strong> {format(new Date(session.last_activity), 'PPp')}</div>
                        <div><strong>Fallback Triggered:</strong> {session.fallback_triggered ? 'Yes' : 'No'}</div>
                        {session.chatbot_state && (
                          <div><strong>Chatbot State:</strong> {JSON.stringify(session.chatbot_state)}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RealTimeSessionManager;