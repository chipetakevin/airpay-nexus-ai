
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
import { useMobileAuth } from '@/hooks/useMobileAuth';
import StaticWhatsAppAssistant from '@/components/whatsapp/StaticWhatsAppAssistant';
import { Card, CardContent } from '@/components/ui/card';

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
          
          {/* Devine Mobile Assistant - Positioned just above RICA Services */}
          <section className="py-8 bg-gradient-to-br from-green-50 via-white to-blue-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Devine Mobile Assistant
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Your intelligent shopping companion - get instant help with airtime, data, and mobile services
                </p>
              </div>
              
              <Card className="max-w-md mx-auto shadow-xl border-2 border-green-200">
                <CardContent className="p-0">
                  <StaticWhatsAppAssistant />
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* RICA Services Section - This shows the registration gate */}
          <RicaServicesSection />
          
          {/* Community Benefits Section */}
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
