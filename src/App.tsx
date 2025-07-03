
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PersistentAuthProvider } from "@/components/auth/PersistentAuthProvider";
import Index from "./pages/Index";
import Portal from "./pages/Portal";
import WhatsAppAssistant from "./pages/WhatsAppAssistant";
import ScanToTextAI from "./pages/ScanToTextAI";
import SpazaAI from "./pages/SpazaAI";
import MasterDashboard from "./pages/MasterDashboard";
import USSDSystem from "./pages/USSDSystem";
import DealsHub from "./pages/DealsHub";
import DealsRedirect from "./pages/DealsRedirect";
import NotFound from "./pages/NotFound";
import DevineBaaS from "./pages/DevineBaaS";
import DivineBaaS from "./pages/DivineBaaS";
import BaaSPlatform from "./pages/BaaSPlatform";
import PlatformDashboard from "./pages/PlatformDashboard";
import MVNXBaaS from "./pages/MVNXBaaS";
import DGXStation from "./pages/DGXStation";
import DMPayroll from "./pages/DMPayroll";
import AIPoweredDeals from "./pages/AIPoweredDeals";
import PortingSystem from "./pages/PortingSystem";
import RICARegistration from "./pages/RICARegistration";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PersistentAuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/portal" element={<Portal />} />
            <Route path="/whatsapp-assistant" element={<WhatsAppAssistant />} />
            <Route path="/scan-to-text-ai" element={<ScanToTextAI />} />
            <Route path="/spaza-ai" element={<SpazaAI />} />
            <Route path="/master-dashboard" element={<MasterDashboard />} />
            <Route path="/ussd-system" element={<USSDSystem />} />
            <Route path="/deals" element={<DealsRedirect />} />
            <Route path="/deals-hub" element={<DealsHub />} />
            <Route path="/devine-baas" element={<DevineBaaS />} />
            <Route path="/divine-baas" element={<DivineBaaS />} />
            <Route path="/baas-platform" element={<BaaSPlatform />} />
            <Route path="/platform-dashboard" element={<PlatformDashboard />} />
            <Route path="/mvnx-baas" element={<MVNXBaaS />} />
            <Route path="/dgx-station" element={<DGXStation />} />
            <Route path="/dm-payroll" element={<DMPayroll />} />
            <Route path="/ai-powered-deals" element={<AIPoweredDeals />} />
            <Route path="/porting-system" element={<PortingSystem />} />
            <Route path="/rica-registration" element={<RICARegistration />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PersistentAuthProvider>
  </QueryClientProvider>
);

export default App;
