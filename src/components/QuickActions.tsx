
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Users, 
  BarChart3, 
  Settings, 
  CreditCard, 
  Shield,
  RefreshCw,
  Download
} from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      title: "Bulk Top-up",
      description: "Process multiple recharges",
      icon: Zap,
      color: "bg-blue-500 hover:bg-blue-600",
      action: "Launch"
    },
    {
      title: "Add New Agent",
      description: "Onboard new distributor",
      icon: Users,
      color: "bg-green-500 hover:bg-green-600",
      action: "Create"
    },
    {
      title: "Generate Report",
      description: "Custom analytics report",
      icon: BarChart3,
      color: "bg-purple-500 hover:bg-purple-600",
      action: "Generate"
    },
    {
      title: "System Settings",
      description: "Configure parameters",
      icon: Settings,
      color: "bg-gray-500 hover:bg-gray-600",
      action: "Configure"
    },
    {
      title: "Commission Payout",
      description: "Process agent payments",
      icon: CreditCard,
      color: "bg-emerald-500 hover:bg-emerald-600",
      action: "Process"
    },
    {
      title: "Security Audit",
      description: "Review fraud alerts",
      icon: Shield,
      color: "bg-red-500 hover:bg-red-600",
      action: "Review"
    },
    {
      title: "Sync Networks",
      description: "Update network status",
      icon: RefreshCw,
      color: "bg-orange-500 hover:bg-orange-600",
      action: "Sync"
    },
    {
      title: "Export Data",
      description: "Download transactions",
      icon: Download,
      color: "bg-teal-500 hover:bg-teal-600",
      action: "Export"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className={`h-24 flex flex-col items-center justify-center space-y-2 text-white border-none ${action.color} transition-all duration-300 hover:scale-105`}
            >
              <action.icon className="w-6 h-6" />
              <div className="text-center">
                <div className="text-sm font-medium">{action.title}</div>
                <div className="text-xs opacity-90">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
