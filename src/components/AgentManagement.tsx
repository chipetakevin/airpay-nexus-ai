
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, MapPin, Star } from 'lucide-react';

const AgentManagement = () => {
  const topAgents = [
    {
      name: "Cape Town Central Store",
      id: "AGT-001",
      revenue: "R 125,847",
      transactions: 2847,
      commission: "R 12,584",
      rating: 4.9,
      status: "Active",
      location: "Cape Town, WC"
    },
    {
      name: "Johannesburg Mega Mall",
      id: "AGT-002",
      revenue: "R 98,234",
      transactions: 2156,
      commission: "R 9,823",
      rating: 4.8,
      status: "Active",
      location: "Johannesburg, GP"
    },
    {
      name: "Durban Beach Front",
      id: "AGT-003",
      revenue: "R 87,651",
      transactions: 1923,
      commission: "R 8,765",
      rating: 4.7,
      status: "Active",
      location: "Durban, KZN"
    },
    {
      name: "Pretoria University",
      id: "AGT-004",
      revenue: "R 76,543",
      transactions: 1678,
      commission: "R 7,654",
      rating: 4.6,
      status: "Training",
      location: "Pretoria, GP"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Training':
        return 'bg-blue-100 text-blue-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span>Top Performing Agents</span>
          </CardTitle>
          <Button variant="outline" size="sm">
            View All Agents
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topAgents.map((agent, index) => (
            <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{agent.name}</h3>
                  <p className="text-xs text-gray-500">{agent.id}</p>
                </div>
                <Badge className={getStatusColor(agent.status)}>
                  {agent.status}
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Revenue:</span>
                  <span className="font-medium text-green-600">{agent.revenue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transactions:</span>
                  <span className="font-medium">{agent.transactions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Commission:</span>
                  <span className="font-medium text-blue-600">{agent.commission}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-500">{agent.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="font-medium">{agent.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentManagement;
