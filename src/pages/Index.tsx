

import React from 'react';
import { MessageCircle } from 'lucide-react';
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
import CompressedWhatsAppInterface from '@/components/whatsapp/CompressedWhatsAppInterface';

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
        
        {/* Compressed Mobile Assistant - Only on Mobile */}
        <CompressedWhatsAppInterface />
      </div>
    </MobileLayout>
  );
};

export default Index;

