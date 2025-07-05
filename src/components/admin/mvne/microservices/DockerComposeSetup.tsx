import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Container, 
  Database, 
  Server, 
  Activity, 
  CheckCircle, 
  AlertTriangle,
  Play,
  Square,
  RefreshCw,
  Download,
  Eye,
  Settings
} from 'lucide-react';

interface Service {
  name: string;
  image: string;
  status: 'running' | 'stopped' | 'starting' | 'error';
  ports: string[];
  health: number;
  cpu: number;
  memory: string;
  uptime: string;
}

const DockerComposeSetup = () => {
  const [deploymentStatus, setDeploymentStatus] = useState('running');

  const services: Service[] = [
    {
      name: 'mvne-api',
      image: 'mvne/api:latest',
      status: 'running',
      ports: ['8000:8000', '9090:9090'],
      health: 98,
      cpu: 15.2,
      memory: '245MB',
      uptime: '2d 14h'
    },
    {
      name: 'postgres',
      image: 'postgres:14',
      status: 'running',
      ports: ['5432:5432'],
      health: 100,
      cpu: 8.1,
      memory: '156MB',
      uptime: '2d 14h'
    },
    {
      name: 'redis',
      image: 'redis:7-alpine',
      status: 'running',
      ports: ['6379:6379'],
      health: 99,
      cpu: 2.3,
      memory: '45MB',
      uptime: '2d 14h'
    },
    {
      name: 'rabbitmq',
      image: 'rabbitmq:3-management',
      status: 'running',
      ports: ['5672:5672', '15672:15672'],
      health: 97,
      cpu: 5.7,
      memory: '89MB',
      uptime: '2d 14h'
    },
    {
      name: 'cgrates',
      image: 'cgrates/cgrates:latest',
      status: 'running',
      ports: ['2012:2012'],
      health: 95,
      cpu: 12.4,
      memory: '178MB',
      uptime: '2d 13h'
    },
    {
      name: 'smsc',
      image: 'paicbd/smsc:latest',
      status: 'running',
      ports: ['2775:2775'],
      health: 94,
      cpu: 18.6,
      memory: '234MB',
      uptime: '2d 13h'
    },
    {
      name: 'prometheus',
      image: 'prom/prometheus:latest',
      status: 'running',
      ports: ['9090:9090'],
      health: 99,
      cpu: 3.2,
      memory: '67MB',
      uptime: '2d 14h'
    },
    {
      name: 'grafana',
      image: 'grafana/grafana:latest',
      status: 'running',
      ports: ['3000:3000'],
      health: 98,
      cpu: 4.8,
      memory: '123MB',
      uptime: '2d 14h'
    },
    {
      name: 'kong',
      image: 'kong:latest',
      status: 'running',
      ports: ['8000:8000', '8001:8001'],
      health: 96,
      cpu: 7.3,
      memory: '198MB',
      uptime: '2d 13h'
    }
  ];

  const dockerComposeYaml = `version: '3.8'

services:
  # MVNE Platform API
  mvne-api:
    build: .
    ports:
      - "8000:8000"
      - "9090:9090"
    environment:
      - DB_HOST=postgres
      - REDIS_HOST=redis
      - RABBITMQ_HOST=rabbitmq
      - CGRATES_HOST=cgrates
      - SMSC_HOST=smsc
    depends_on:
      - postgres
      - redis
      - rabbitmq
      - cgrates
    volumes:
      - ./logs:/app/logs
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # PostgreSQL Database
  postgres:
    image: postgres:14
    environment:
      - POSTGRES_DB=mvne_platform
      - POSTGRES_USER=mvne_user
      - POSTGRES_PASSWORD=mvne_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U mvne_user -d mvne_platform"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis Cache
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped
    command: redis-server --appendonly yes
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 3

  # RabbitMQ Message Queue
  rabbitmq:
    image: rabbitmq:3-management
    environment:
      - RABBITMQ_DEFAULT_USER=mvne
      - RABBITMQ_DEFAULT_PASS=mvne_password
    ports:
      - "5672:5672"
      - "15672:15672"
    volumes:
      - rabbitmq_data:/var/lib/rabbitmq
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "rabbitmq-diagnostics", "ping"]
      interval: 15s
      timeout: 10s
      retries: 3

  # CGRateS Billing Engine
  cgrates:
    image: cgrates/cgrates:latest
    ports:
      - "2012:2012"
      - "2080:2080"
    environment:
      - CGRATES_NODEID=cgrates
    volumes:
      - ./cgrates.json:/etc/cgrates/cgrates.json
      - cgrates_data:/var/spool/cgrates
    restart: unless-stopped
    depends_on:
      - postgres
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:2080/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # SMSC Service
  smsc:
    image: paicbd/smsc:latest
    ports:
      - "2775:2775"
      - "8080:8080"
    environment:
      - SMSC_CONFIG=/etc/smsc/config.yaml
    volumes:
      - ./smsc-config.yaml:/etc/smsc/config.yaml
      - smsc_data:/var/lib/smsc
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Prometheus Monitoring
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--storage.tsdb.retention.time=200h'
      - '--web.enable-lifecycle'
    restart: unless-stopped

  # Grafana Visualization
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana_data:/var/lib/grafana
      - ./grafana/provisioning:/etc/grafana/provisioning
    restart: unless-stopped

  # Kong API Gateway
  kong:
    image: kong:latest
    environment:
      - KONG_DATABASE=off
      - KONG_DECLARATIVE_CONFIG=/kong/declarative/kong.yml
      - KONG_PROXY_ACCESS_LOG=/dev/stdout
      - KONG_ADMIN_ACCESS_LOG=/dev/stdout
      - KONG_PROXY_ERROR_LOG=/dev/stderr
      - KONG_ADMIN_ERROR_LOG=/dev/stderr
      - KONG_ADMIN_LISTEN=0.0.0.0:8001
    ports:
      - "8000:8000"
      - "8001:8001"
    volumes:
      - ./kong.yml:/kong/declarative/kong.yml
    restart: unless-stopped

  # Celery Worker
  celery-worker:
    build: .
    command: celery -A mvne_tasks worker --loglevel=info
    environment:
      - DB_HOST=postgres
      - REDIS_HOST=redis
      - RABBITMQ_HOST=rabbitmq
    depends_on:
      - postgres
      - redis
      - rabbitmq
    volumes:
      - ./logs:/app/logs
    restart: unless-stopped

  # Celery Beat Scheduler
  celery-beat:
    build: .
    command: celery -A mvne_tasks beat --loglevel=info
    environment:
      - DB_HOST=postgres
      - REDIS_HOST=redis
      - RABBITMQ_HOST=rabbitmq
    depends_on:
      - postgres
      - redis
      - rabbitmq
    volumes:
      - ./logs:/app/logs
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
  rabbitmq_data:
  cgrates_data:
  smsc_data:
  prometheus_data:
  grafana_data:

networks:
  default:
    name: mvne-network`;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'starting':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'stopped':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getServiceIcon = (name: string) => {
    if (name.includes('postgres')) return <Database className="w-4 h-4 text-blue-600" />;
    if (name.includes('redis')) return <Server className="w-4 h-4 text-red-600" />;
    if (name.includes('api')) return <Activity className="w-4 h-4 text-green-600" />;
    return <Container className="w-4 h-4 text-purple-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl shadow-lg">
            <Container className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Docker Compose Stack</h2>
            <p className="text-muted-foreground">Microservices orchestration & container management</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Play className="w-4 h-4 mr-2" />
            Deploy
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Badge variant="outline" className={getStatusColor(deploymentStatus)}>
            <Container className="w-4 h-4 mr-1" />
            {deploymentStatus.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Deployment Status Alert */}
      <Alert className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription>
          <div className="flex items-center justify-between">
            <span className="text-green-800 font-medium">
              All services running successfully - {services.length} containers active
            </span>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">
                <Activity className="w-3 h-3 mr-1" />
                Cluster Healthy
              </Badge>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="compose">Docker Compose</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-6">
          {/* Service Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.name} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getServiceIcon(service.name)}
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                    </div>
                    <Badge variant="outline" className={getStatusColor(service.status)}>
                      {service.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{service.image}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Health</span>
                      <span className="font-medium">{service.health}%</span>
                    </div>
                    <Progress value={service.health} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">CPU:</span>
                      <div className="font-medium">{service.cpu}%</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Memory:</span>
                      <div className="font-medium">{service.memory}</div>
                    </div>
                  </div>

                  <div className="text-sm">
                    <span className="text-gray-500">Ports:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {service.ports.map((port, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {port}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-gray-500">
                    Uptime: {service.uptime}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-3 h-3 mr-1" />
                      Logs
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="w-3 h-3 mr-1" />
                      Config
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compose" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Container className="w-5 h-5" />
                Docker Compose Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto max-h-96">
                <pre className="text-sm">
                  <code>{dockerComposeYaml}</code>
                </pre>
              </div>
              <div className="flex gap-2 mt-4">
                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  Download docker-compose.yml
                </Button>
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Validate Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Container Resource Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.slice(0, 5).map((service) => (
                    <div key={service.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{service.name}</span>
                        <span>{service.cpu}% CPU</span>
                      </div>
                      <Progress value={service.cpu} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Health Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.slice(0, 5).map((service) => (
                    <div key={service.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getServiceIcon(service.name)}
                        <span className="font-medium">{service.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-gray-600">{service.health}%</div>
                        <div className={`w-3 h-3 rounded-full ${
                          service.health > 95 ? 'bg-green-500' : 
                          service.health > 90 ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DockerComposeSetup;