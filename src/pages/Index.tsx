
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
          
          {/* Devine Mobile Assistant Section - Positioned after RICA services */}
          <section className="py-12 bg-gradient-to-br from-gray-50 to-blue-50">
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
              
              <div className="max-w-md mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <EnhancedWhatsAppAssistant />
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
      </div>
    </MobileLayout>
  );
};

export default Index;
