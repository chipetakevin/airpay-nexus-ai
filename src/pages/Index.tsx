
import React, { useState } from 'react';
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
import IntelligentCollapsibleSections from '@/components/home/IntelligentCollapsibleSections';
import { useMobileAuth } from '@/hooks/useMobileAuth';
import StaticWhatsAppAssistant from '@/components/whatsapp/StaticWhatsAppAssistant';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useMobileAuth();
  const [isQuickShopOpen, setIsQuickShopOpen] = useState(false);

  const toggleQuickShop = () => {
    setIsQuickShopOpen(!isQuickShopOpen);
  };

  const handleQuickShopExit = () => {
    setIsQuickShopOpen(false);
    // Seamlessly redirect to AI-Powered Deals using correct design
    window.location.href = '/ai-powered-deals';
  };

  return (
    <MobileLayout showTopNav={false} showBottomNav={true}>
      <div className="min-h-screen bg-white">
        <Header onQuickShopToggle={toggleQuickShop} isQuickShopOpen={isQuickShopOpen} />
        
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
          
          {/* Quick Shop WhatsApp Assistant - Shows when tab is clicked */}
          {isQuickShopOpen && (
            <section className="py-8 bg-gradient-to-br from-green-50 via-white to-blue-50 border-b-4 border-green-200 animate-fade-in">
              <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-center flex-1">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <MessageCircle className="w-8 h-8 text-green-600" />
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Quick Shop - Buy Airtime & Data
                      </h2>
                    </div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Get instant airtime and data through WhatsApp - fast, secure, and convenient
                    </p>
                  </div>
                  <Button
                    onClick={handleQuickShopExit}
                    className="ml-4 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                    title="Get Started"
                  >
                    <span className="text-sm">Get Started</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                
                <Card className="max-w-md mx-auto shadow-2xl border-2 border-green-300">
                  <CardContent className="p-0">
                    <StaticWhatsAppAssistant />
                  </CardContent>
                </Card>
                
                <div className="text-center mt-6">
                  <p className="text-sm text-gray-500">
                    🔒 Secure • ⚡ Instant • 🌍 All Networks
                  </p>
                </div>
              </div>
            </section>
          )}
          
          {/* Intelligent Collapsible Sections */}
          <section className="py-8 bg-gray-50">
            <div className="container mx-auto px-4">
              <IntelligentCollapsibleSections />
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
          
          {/* Collapsible Components Demo Section */}
          <section className="py-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Interactive Components
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Experience smooth collapsible sections with beautiful animations
                </p>
              </div>
              
              <div className="max-w-md mx-auto">
                <Card className="shadow-xl border-2 border-indigo-200 overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">✨</div>
                    <h3 className="text-xl font-semibold mb-2">Collapsible Demo</h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      See the OneCard interface with smooth collapse animations
                    </p>
                    <Button 
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                      onClick={() => window.location.href = '/collapsible-demo'}
                    >
                      Try Interactive Demo
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          
          <BenefitsSection />
          <StatsGrid />
          
          {/* Devine Mobile Assistant - Positioned just below StatsGrid */}
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
