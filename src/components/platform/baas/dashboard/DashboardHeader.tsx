
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Brain, Network, MessageSquare } from 'lucide-react';

const DashboardHeader = () => {
  return (
    <div className="text-center space-y-3 md:space-y-4">
      <div className="flex justify-center mb-3 md:mb-4">
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-3 md:p-4 rounded-2xl">
          <Brain className="w-8 h-8 md:w-12 md:h-12 text-purple-600 animate-pulse" />
        </div>
      </div>
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent px-4">
        Divinely Mobile Agentic BaaS Platform
      </h1>
      <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
        Revolutionary Backend-as-a-Service platform with autonomous AI agents, powered by advanced data mesh architecture for telecommunications excellence
      </p>
      <div className="flex flex-wrap justify-center gap-2 text-xs md:text-sm">
        <Badge variant="outline" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-300">
          <Brain className="w-3 h-3 mr-1" />
          18 Autonomous Agents
        </Badge>
        <Badge variant="outline" className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-300">
          <Network className="w-3 h-3 mr-1" />
          Data Mesh Architecture
        </Badge>
        <Badge variant="outline" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300">
          <MessageSquare className="w-3 h-3 mr-1" />
          WhatsApp Business Ready
        </Badge>
      </div>
    </div>
  );
};

export default DashboardHeader;
