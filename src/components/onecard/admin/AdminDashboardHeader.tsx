
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

const AdminDashboardHeader = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <img 
            src="/lovable-uploads/5ef6be83-8590-459d-942d-7a0539064226.png" 
            alt="Divine Mobile Crown Logo"
            className="h-8 w-8 object-contain"
          />
          OneCard Admin Dashboard
        </CardTitle>
        <p className="text-blue-100">Complete customer management and reporting suite</p>
      </CardHeader>
    </Card>
  );
};

export default AdminDashboardHeader;
