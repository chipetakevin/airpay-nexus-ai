
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Portal from "./pages/Portal";
import DealsHub from "./pages/DealsHub";
import WhatsAppAssistant from "./pages/WhatsAppAssistant";
import ScanToTextAI from "./pages/ScanToTextAI";
import SpazaAI from "./pages/SpazaAI";
import PlatformDashboard from "./pages/PlatformDashboard";
import BaaSPlatform from "./pages/BaaSPlatform";
import DevineBaaS from "./pages/DevineBaaS";
import MVNXBaaS from "./pages/MVNXBaaS";
import MasterDashboard from "./pages/MasterDashboard";
import USSDSystem from "./pages/USSDSystem";
import DMPayroll from "./pages/DMPayroll";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/deals" element={<DealsHub />} />
          <Route path="/whatsapp-assistant" element={<WhatsAppAssistant />} />
          <Route path="/scan-to-text-ai" element={<ScanToTextAI />} />
          <Route path="/spaza-ai" element={<SpazaAI />} />
          <Route path="/platform-dashboard" element={<PlatformDashboard />} />
          <Route path="/baas-platform" element={<BaaSPlatform />} />
          <Route path="/devine-baas" element={<DevineBaaS />} />
          <Route path="/mvnx-baas" element={<MVNXBaaS />} />
          <Route path="/master-dashboard" element={<MasterDashboard />} />
          <Route path="/ussd-system" element={<USSDSystem />} />
          <Route path="/dm-payroll" element={<DMPayroll />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
