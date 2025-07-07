
import Auth from "./pages/Auth";
import CustomerDashboard from "./components/customer/CustomerDashboard";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
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
import RegistrationHub from "./pages/RegistrationHub";
import AdminMVNEDashboard from "./pages/AdminMVNEDashboard";
import MobileDashboard from "./pages/MobileDashboard";
import CustomerAuth from "./pages/CustomerAuth";
import CustomerPortal from "./pages/CustomerPortal";
import AdminDashboard from "./pages/AdminDashboard";
import EnhancedVersionManagerPage from "./pages/EnhancedVersionManager";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PersistentAuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
        <Route path="/auth" element={<Auth />} />
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
            <Route path="/registration-hub" element={<RegistrationHub />} />
            <Route path="/admin-mvne" element={<AdminMVNEDashboard />} />
            <Route path="/mobile-dashboard" element={<MobileDashboard />} />
            <Route path="/customer-auth" element={<CustomerAuth />} />
            <Route path="/customer-portal" element={<CustomerPortal />} />
            <Route path="/enhanced-version-manager" element={<EnhancedVersionManagerPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PersistentAuthProvider>
  </QueryClientProvider>
);

export default App;
