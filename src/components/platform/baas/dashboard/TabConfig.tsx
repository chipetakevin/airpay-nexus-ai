
import { 
  BarChart, Brain, Network, Users, MessageSquare, Activity,
  Server, Shield, Globe, Database, TrendingUp, Zap
} from 'lucide-react';

export const tabConfig = [
  {
    value: 'overview',
    label: 'Overview',
    icon: <BarChart className="w-4 h-4 md:w-5 md:h-5" />,
    gradient: 'from-blue-500 via-blue-600 to-indigo-700',
    bgGradient: 'from-blue-50 via-blue-100 to-indigo-100',
    shadowColor: 'shadow-blue-500/30',
    description: 'Platform overview and metrics'
  },
  {
    value: 'agentic-ai',
    label: 'Agentic AI',
    icon: <Brain className="w-4 h-4 md:w-5 md:h-5" />,
    gradient: 'from-purple-500 via-violet-600 to-fuchsia-700',
    bgGradient: 'from-purple-50 via-violet-100 to-fuchsia-100',
    shadowColor: 'shadow-purple-500/30',
    description: 'Autonomous AI agents and automation'
  },
  {
    value: 'data-mesh',
    label: 'Data Mesh',
    icon: <Network className="w-4 h-4 md:w-5 md:h-5" />,
    gradient: 'from-emerald-500 via-teal-600 to-cyan-700',
    bgGradient: 'from-emerald-50 via-teal-100 to-cyan-100',
    shadowColor: 'shadow-emerald-500/30',
    description: 'Decentralized data architecture'
  },
  {
    value: 'cdp',
    label: 'Customer CDP',
    icon: <Users className="w-4 h-4 md:w-5 md:h-5" />,
    gradient: 'from-pink-500 via-rose-600 to-red-700',
    bgGradient: 'from-pink-50 via-rose-100 to-red-100',
    shadowColor: 'shadow-pink-500/30',
    description: 'Customer data platform and analytics'
  },
  {
    value: 'whatsapp-business',
    label: 'WhatsApp Business',
    icon: <MessageSquare className="w-4 h-4 md:w-5 md:h-5" />,
    gradient: 'from-green-500 via-emerald-600 to-teal-700',
    bgGradient: 'from-green-50 via-emerald-100 to-teal-100',
    shadowColor: 'shadow-green-500/30',
    description: 'WhatsApp Business API integration'
  },
  {
    value: 'transactions',
    label: 'Transactions',
    icon: <Activity className="w-4 h-4 md:w-5 md:h-5" />,
    gradient: 'from-orange-500 via-amber-600 to-yellow-700',
    bgGradient: 'from-orange-50 via-amber-100 to-yellow-100',
    shadowColor: 'shadow-orange-500/30',
    description: 'Transaction processing engine'
  },
  {
    value: 'infrastructure',
    label: 'Infrastructure',
    icon: <Server className="w-4 h-4 md:w-5 md:h-5" />,
    gradient: 'from-slate-500 via-gray-600 to-zinc-700',
    bgGradient: 'from-slate-50 via-gray-100 to-zinc-100',
    shadowColor: 'shadow-slate-500/30',
    description: 'Cloud infrastructure management'
  },
  {
    value: 'security',
    label: 'Security',
    icon: <Shield className="w-4 h-4 md:w-5 md:h-5" />,
    gradient: 'from-red-500 via-rose-600 to-pink-700',
    bgGradient: 'from-red-50 via-rose-100 to-pink-100',
    shadowColor: 'shadow-red-500/30',
    description: 'Security and compliance monitoring'
  },
  {
    value: 'api',
    label: 'API Gateway',
    icon: <Globe className="w-4 h-4 md:w-5 md:h-5" />,
    gradient: 'from-indigo-500 via-blue-600 to-cyan-700',
    bgGradient: 'from-indigo-50 via-blue-100 to-cyan-100',
    shadowColor: 'shadow-indigo-500/30',
    description: 'API management and routing'
  },
  {
    value: 'supabase',
    label: 'Database Core',
    icon: <Database className="w-4 h-4 md:w-5 md:h-5" />,
    gradient: 'from-teal-500 via-cyan-600 to-blue-700',
    bgGradient: 'from-teal-50 via-cyan-100 to-blue-100',
    shadowColor: 'shadow-teal-500/30',
    description: 'Database configuration and management'
  },
  {
    value: 'analytics',
    label: 'Analytics',
    icon: <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />,
    gradient: 'from-violet-500 via-purple-600 to-indigo-700',
    bgGradient: 'from-violet-50 via-purple-100 to-indigo-100',
    shadowColor: 'shadow-violet-500/30',
    description: 'Business intelligence and insights'
  },
  {
    value: 'realtime',
    label: 'Real-time',
    icon: <Zap className="w-4 h-4 md:w-5 md:h-5" />,
    gradient: 'from-yellow-500 via-orange-600 to-red-700',
    bgGradient: 'from-yellow-50 via-orange-100 to-red-100',
    shadowColor: 'shadow-yellow-500/30',
    description: 'Real-time processing and streaming'
  }
];
