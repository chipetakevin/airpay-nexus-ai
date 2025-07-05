import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Search, Filter, MapPin, Clock, DollarSign } from 'lucide-react';
import type { ActivityData, ReportFilters } from './MyReportTab';

interface ActivityLogProps {
  activities: ActivityData[];
  canEdit: boolean;
  showAllContractors: boolean;
  filters: ReportFilters;
}

export const ActivityLog: React.FC<ActivityLogProps> = ({
  activities,
  canEdit,
  showAllContractors,
  filters
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Mock activities data since the passed activities array is empty
  const mockActivities: ActivityData[] = [
    {
      id: '1',
      timestamp: new Date('2025-01-05T09:15:00'),
      taskType: 'SIM Activation',
      project: 'Project Alpha',
      status: 'completed',
      commission: 50,
      location: 'Johannesburg, Gauteng',
      contractorId: '1',
      contractorName: 'John Doe'
    },
    {
      id: '2',
      timestamp: new Date('2025-01-05T10:30:00'),
      taskType: 'KYC Verification',
      project: 'Client X Campaign',
      status: 'pending',
      commission: 75,
      location: 'Cape Town, Western Cape',
      contractorId: '2',
      contractorName: 'Jane Smith'
    },
    {
      id: '3',
      timestamp: new Date('2025-01-05T12:00:00'),
      taskType: 'Site Visit',
      status: 'approved',
      commission: 100,
      location: 'Durban, KwaZulu-Natal',
      contractorId: '1',
      contractorName: 'John Doe'
    },
    {
      id: '4',
      timestamp: new Date('2025-01-05T14:45:00'),
      taskType: 'Document Collection',
      project: 'Project Beta',
      status: 'completed',
      commission: 60,
      location: 'Pretoria, Gauteng',
      contractorId: '3',
      contractorName: 'Mike Johnson'
    }
  ];

  const displayActivities = activities.length > 0 ? activities : mockActivities;

  const filteredActivities = displayActivities
    .filter(activity => {
      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          activity.taskType.toLowerCase().includes(searchLower) ||
          activity.contractorName.toLowerCase().includes(searchLower) ||
          (activity.project && activity.project.toLowerCase().includes(searchLower)) ||
          (activity.location && activity.location.toLowerCase().includes(searchLower))
        );
      }
      return true;
    })
    .filter(activity => {
      // Apply report filters
      if (filters.taskType.length > 0 && !filters.taskType.includes(activity.taskType)) return false;
      if (filters.status.length > 0 && !filters.status.includes(activity.status)) return false;
      if (filters.project.length > 0 && activity.project && !filters.project.includes(activity.project)) return false;
      if (filters.location.length > 0 && activity.location && !filters.location.some(loc => activity.location?.includes(loc))) return false;
      
      // Date range filter
      if (filters.dateRange.start && activity.timestamp < filters.dateRange.start) return false;
      if (filters.dateRange.end && activity.timestamp > filters.dateRange.end) return false;
      
      return true;
    })
    .sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'timestamp':
          aValue = a.timestamp.getTime();
          bValue = b.timestamp.getTime();
          break;
        case 'taskType':
          aValue = a.taskType;
          bValue = b.taskType;
          break;
        case 'commission':
          aValue = a.commission;
          bValue = b.commission;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          return 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'approved': return 'default';
      case 'pending': return 'secondary';
      case 'rejected': return 'destructive';
      default: return 'outline';
    }
  };

  const handleStatusChange = (activityId: string, newStatus: string) => {
    console.log(`Changing status of activity ${activityId} to ${newStatus}`);
    // In real implementation, make API call to update status
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Activity Log
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="timestamp">Date & Time</SelectItem>
                <SelectItem value="taskType">Task Type</SelectItem>
                <SelectItem value="commission">Commission</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </Button>
          </div>
        </div>

        {/* Activities List */}
        <div className="space-y-3">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="mx-auto h-12 w-12 mb-4" />
              <p>No activities found matching your filters.</p>
            </div>
          ) : (
            filteredActivities.map((activity) => (
              <div key={activity.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{activity.taskType}</h3>
                      <Badge variant={getStatusVariant(activity.status)}>
                        {activity.status}
                      </Badge>
                    </div>
                    {showAllContractors && (
                      <p className="text-sm text-muted-foreground mb-1">
                        Contractor: {activity.contractorName}
                      </p>
                    )}
                    {activity.project && (
                      <p className="text-sm text-muted-foreground mb-1">
                        Project: {activity.project}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.timestamp.toLocaleString()}
                      </span>
                      {activity.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {activity.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        R {activity.commission}
                      </span>
                    </div>
                  </div>
                  {canEdit && activity.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(activity.id, 'rejected')}
                      >
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleStatusChange(activity.id, 'approved')}
                      >
                        Approve
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};