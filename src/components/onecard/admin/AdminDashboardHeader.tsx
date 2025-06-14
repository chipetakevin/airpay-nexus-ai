
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

const AdminDashboardHeader = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Users className="w-8 h-8" />
          OneCard Admin Dashboard
        </CardTitle>
        <p className="text-blue-100">Complete customer management and reporting suite</p>
      </CardHeader>
    </Card>
  );
};

export default AdminDashboardHeader;
