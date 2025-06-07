
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Portal from "./pages/Portal";
import MasterDashboard from "./pages/MasterDashboard";
import PlatformDashboard from "./pages/PlatformDashboard";
import BaaSPlatform from "./pages/BaaSPlatform";
import SpazaAI from "./pages/SpazaAI";
import WhatsAppAssistant from "./pages/WhatsAppAssistant";
import USSDSystem from "./pages/USSDSystem";
import ScanToTextAI from "./pages/ScanToTextAI";
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
          <Route path="/dashboard" element={<MasterDashboard />} />
          <Route path="/platform" element={<PlatformDashboard />} />
          <Route path="/platform/baas" element={<BaaSPlatform />} />
          <Route path="/spaza-ai" element={<SpazaAI />} />
          <Route path="/whatsapp-assistant" element={<WhatsAppAssistant />} />
          <Route path="/ussd-system" element={<USSDSystem />} />
          <Route path="/scan-to-text" element={<ScanToTextAI />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
