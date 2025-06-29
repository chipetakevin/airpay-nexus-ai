import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import RicaServicesSection from '@/components/RicaServicesSection';
import FeaturesSection from '@/components/FeaturesSection';
import BenefitsSection from '@/components/BenefitsSection';
import CommunityBenefitsSection from '@/components/CommunityBenefitsSection';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import StatsGrid from '@/components/StatsGrid';
import CTASection from '@/components/CTASection';
import FAQSection from '@/components/FAQSection';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import MobileCustomerLanding from '@/components/MobileCustomerLanding';
import WhatsAppShoppingSection from '@/components/WhatsAppShoppingSection';
import SmoothScrollNav from '@/components/SmoothScrollNav';
import MobileLayout from '@/components/navigation/MobileLayout';
import EnhancedWhatsAppAssistant from '@/components/whatsapp/EnhancedWhatsAppAssistant';
import RegistrationGate from '@/components/auth/RegistrationGate';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import CompressedWhatsAppInterface from '@/components/whatsapp/CompressedWhatsAppInterface';
import { MessageCircle } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useMobileAuth();

  return (
    <MobileLayout showTopNav={false} showBottomNav={true}>
      <div className="min-h-screen bg-white">
        <Header />
        
        {/* Mobile Customer Experience - Only show for authenticated users */}
        {isAuthenticated && (
          <section className="container mx-auto px-4 py-8">
            <MobileCustomerLanding />
          </section>
        )}
        
        <main>
          <div id="hero">
            <HeroSection />
          </div>
          
          {/* RICA Services Section - Added right after hero */}
          <RicaServicesSection />
          
          {/* Enhanced Devine Mobile Assistant Section with Scrolling Effect */}
          <section className="py-12 bg-gradient-to-br from-gray-50 to-blue-50 relative">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Meet Your AI Shopping Assistant
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Experience instant airtime and data purchases through our intelligent WhatsApp assistant. 
                  Available 24/7 with personalized recommendations and secure transactions.
                </p>
              </div>
              
              {/* Desktop/Tablet View - Full Interface */}
              <div className="max-w-md mx-auto hidden md:block">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-green-100">
                  <EnhancedWhatsAppAssistant />
                </div>
              </div>

              {/* Mobile View - Scrollable Preview */}
              <div className="md:hidden">
                <div className="max-w-sm mx-auto">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-green-100">
                    <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center relative">
                          <MessageCircle className="w-7 h-7 text-green-600" />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">Devine Mobile AI</h3>
                          <div className="flex items-center gap-2 text-sm opacity-90">
                            <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                            <span>Always here to help</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
                      <div className="space-y-3">
                        <div className="bg-white rounded-xl p-3 shadow-sm">
                          <p className="text-sm text-gray-900">👋 Welcome! What can I help you with?</p>
                        </div>
                        <div className="bg-white rounded-xl p-3 shadow-sm">
                          <p className="text-sm font-medium mb-2">Quick Services:</p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-blue-50 p-2 rounded">1️⃣ Airtime</div>
                            <div className="bg-green-50 p-2 rounded">2️⃣ Data</div>
                            <div className="bg-purple-50 p-2 rounded">3️⃣ Balance</div>
                            <div className="bg-orange-50 p-2 rounded">4️⃣ Gifts</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-white border-t">
                      <p className="text-xs text-center text-gray-600">
                        Scroll up/down to see the floating assistant ↑
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Always Online</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>AI Powered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Secure Payments</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Community Benefits Section - New addition */}
          <CommunityBenefitsSection />
          
          {/* WhatsApp Shopping Section */}
          <WhatsAppShoppingSection />
          
          <div id="features">
            <FeaturesSection />
          </div>
          <BenefitsSection />
          <StatsGrid />
          <div id="testimonials">
            <TestimonialsCarousel />
          </div>
          <CTASection />
          <div id="faq">
            <FAQSection />
          </div>
        </main>
        
        <Footer />
        <WhatsAppFloatingButton />
        <SmoothScrollNav />
        
        {/* Compressed Mobile Assistant - Only on Mobile */}
        <CompressedWhatsAppInterface />
      </div>
    </MobileLayout>
  );
};

export default Index;
