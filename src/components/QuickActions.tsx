
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  RefreshCw, 
  Users, 
  Settings, 
  BarChart3
} from 'lucide-react';

const QuickActions = () => {
  const { toast } = useToast();

  const handleRefreshSystem = () => {
    toast({
      title: "System Refresh Initiated",
      description: "Refreshing system state and updating data...",
    });
    
    // Simulate system refresh
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleUserManagement = () => {
    toast({
      title: "User Management",
      description: "Opening user management interface...",
    });
    // TODO: Navigate to user management section
  };

  const handleSystemSettings = () => {
    toast({
      title: "System Settings",
      description: "Accessing system configuration panel...",
    });
    // TODO: Navigate to system settings
  };

  const handleAnalytics = () => {
    toast({
      title: "Analytics Dashboard",
      description: "Loading analytics and reporting interface...",
    });
    // TODO: Navigate to analytics dashboard
  };

  const actions = [
    {
      title: "Refresh System",
      icon: RefreshCw,
      onClick: handleRefreshSystem,
      className: "bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-blue-200 text-blue-700"
    },
    {
      title: "User Management", 
      icon: Users,
      onClick: handleUserManagement,
      className: "bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border-green-200 text-green-700"
    },
    {
      title: "System Settings",
      icon: Settings,
      onClick: handleSystemSettings,
      className: "bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border-purple-200 text-purple-700"
    },
    {
      title: "Analytics",
      icon: BarChart3,
      onClick: handleAnalytics,
      className: "bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 border-orange-200 text-orange-700"
    }
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-blue-600">⚡</span>
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={action.onClick}
              className={`h-24 flex flex-col items-center justify-center space-y-3 transition-all duration-300 hover:scale-105 ${action.className}`}
            >
              <action.icon className="w-8 h-8" />
              <div className="text-sm font-medium">{action.title}</div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
