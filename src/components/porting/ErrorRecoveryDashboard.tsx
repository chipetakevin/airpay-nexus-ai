import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useErrorRecovery } from '@/hooks/useErrorRecovery';
import { 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw, 
  Trash2, 
  Activity,
  Shield,
  Clock,
  TrendingUp
} from 'lucide-react';

export const ErrorRecoveryDashboard: React.FC = () => {
  const { 
    errorLogs, 
    isRecovering, 
    clearErrorLogs, 
    getErrorStats,
    recoveryStrategies 
  } = useErrorRecovery();

  const stats = getErrorStats();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityTextColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-700';
      case 'high': return 'text-orange-700';
      case 'medium': return 'text-yellow-700';
      case 'low': return 'text-blue-700';
      default: return 'text-gray-700';
    }
  };

  return (
    <div className="space-y-4">
      {/* Recovery Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Activity className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <h3 className="text-2xl font-bold text-blue-600">{stats.total}</h3>
            <p className="text-sm text-gray-600">Total Errors</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-600" />
            <h3 className="text-2xl font-bold text-green-600">{stats.recovered}</h3>
            <p className="text-sm text-gray-600">Auto-Recovered</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-purple-600" />
            <h3 className="text-2xl font-bold text-purple-600">{stats.recoveryRate.toFixed(1)}%</h3>
            <p className="text-sm text-gray-600">Recovery Rate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-red-600" />
            <h3 className="text-2xl font-bold text-red-600">{stats.critical + stats.high}</h3>
            <p className="text-sm text-gray-600">Critical/High</p>
          </CardContent>
        </Card>
      </div>

      {/* Recovery Status */}
      {isRecovering && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
              <span className="font-medium text-blue-800">Auto-Recovery in Progress</span>
            </div>
            <Progress value={75} className="h-2" />
            <p className="text-sm text-blue-600 mt-1">Attempting automatic error resolution...</p>
          </CardContent>
        </Card>
      )}

      {/* Recovery Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Active Recovery Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {recoveryStrategies.map((strategy, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{strategy.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {strategy.maxAttempts} attempts
                  </Badge>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Errors */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Error Activity
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearErrorLogs}
              disabled={errorLogs.length === 0}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Logs
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {errorLogs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
              <p className="font-medium">No Recent Errors</p>
              <p className="text-sm">System running smoothly</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {stats.recent.map((error) => (
                <div key={error.id} className="border rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getSeverityColor(error.severity)}`}></div>
                      <span className="font-medium text-sm">{error.context}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getSeverityTextColor(error.severity)}`}
                      >
                        {error.severity}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {error.recovered ? (
                        <Badge className="bg-green-500 text-white text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Recovered
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          {error.recoveryAttempts} attempts
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    {typeof error.error === 'string' ? error.error : error.error.message}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{new Date(error.timestamp).toLocaleTimeString()}</span>
                    <span>ID: {error.id.slice(0, 8)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};