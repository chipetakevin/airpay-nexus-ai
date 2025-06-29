
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Calendar, 
  Users, 
  CheckCircle,
  UserCheck,
  Timer,
  Coffee
} from 'lucide-react';

const TimeAttendance = () => {
  const attendanceData = [
    { employee: 'Thabo Mthembu', timeIn: '08:15', timeOut: '17:30', hours: '8h 45m', status: 'Present' },
    { employee: 'Sarah Johnson', timeIn: '08:00', timeOut: '17:00', hours: '8h 30m', status: 'Present' },
    { employee: 'Mohamed Hassan', timeIn: '-', timeOut: '-', hours: '0h', status: 'On Leave' },
    { employee: 'Zanele Ndlovu', timeIn: '08:30', timeOut: '17:45', hours: '8h 45m', status: 'Overtime' }
  ];

  const leaveRequests = [
    { employee: 'John Smith', type: 'Annual Leave', dates: '15-17 Jan 2025', days: 3, status: 'Pending' },
    { employee: 'Lisa Chen', type: 'Sick Leave', dates: '20 Jan 2025', days: 1, status: 'Approved' },
    { employee: 'Mike Johnson', type: 'Family Leave', dates: '25-26 Jan 2025', days: 2, status: 'Pending' }
  ];

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Time & Attendance</h2>
          <p className="text-gray-600 text-sm">Manage employee time tracking and leave</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <UserCheck className="w-4 h-4 mr-2" />
            Clock In/Out
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Calendar className="w-4 h-4 mr-2" />
            Manage Leave
          </Button>
        </div>
      </div>

      {/* Today's Attendance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Today's Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {attendanceData.map((record, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{record.employee}</h4>
                    <p className="text-sm text-gray-600">{record.timeIn} - {record.timeOut}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{record.hours}</p>
                    <p className="text-xs text-gray-500">Total Hours</p>
                  </div>
                  <Badge 
                    className={
                      record.status === 'Present' ? 'bg-green-100 text-green-800' :
                      record.status === 'Overtime' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }
                  >
                    {record.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leave Management */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            Leave Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaveRequests.map((request, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-3">
                <div>
                  <h4 className="font-medium text-gray-900">{request.employee}</h4>
                  <p className="text-sm text-gray-600">{request.type} • {request.dates}</p>
                  <p className="text-xs text-gray-500">{request.days} days</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge 
                    className={
                      request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }
                  >
                    {request.status}
                  </Badge>
                  {request.status === 'Pending' && (
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline">
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Biometric Integration */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Timer className="w-5 h-5 text-green-600" />
            Biometric Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Integration Features</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Fingerprint time clocking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Facial recognition support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Mobile GPS tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Automatic overtime calculation</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Self-Service Portal</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                  <Coffee className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Request leave online</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">View time sheets</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Check leave balances</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeAttendance;
