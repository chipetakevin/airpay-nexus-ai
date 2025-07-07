import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Star, Zap, Users, Shield, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import IntelligentCollapsible from '@/components/ui/intelligent-collapsible';

const IntelligentCollapsibleSections = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const sectionsRef = useRef<HTMLDivElement>(null);
  
  // Accordion mode handler - only one section open at a time
  const handleSectionToggle = useCallback((sectionTitle: string, isExpanded: boolean) => {
    if (isExpanded) {
      setActiveSection(sectionTitle);
      setExpandedSections(prev => new Set(prev).add(sectionTitle));
    } else {
      setActiveSection(null);
      setExpandedSections(prev => {
        const newSet = new Set(prev);
        newSet.delete(sectionTitle);
        return newSet;
      });
    }
  }, []);

  // Close all sections function
  const closeAllSections = useCallback(() => {
    // Trigger close on all sections by dispatching custom events
    const sectionTitles = [
      "Unified Mobile Platform",
      "Quick Access Features", 
      "Join Our Thriving Community",
      "Why Choose Smart Deals Shopping?"
    ];
    
    sectionTitles.forEach(title => {
      const storageKey = `collapsible-${title.replace(/\s+/g, '-').toLowerCase()}`;
      localStorage.setItem(storageKey, JSON.stringify(true)); // true = collapsed
    });
    
    setExpandedSections(new Set());
    setActiveSection(null);
    
    // Dispatch storage event to trigger updates
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'collapsible-sections-close-all',
      newValue: Date.now().toString()
    }));
  }, []);

  return (
    <div className="space-y-4 max-w-4xl mx-auto" role="region" aria-label="Feature sections">
      {/* Close All Control */}
      {expandedSections.size > 0 && (
        <div className="flex justify-center animate-fade-in">
          <Button
            variant="outline"
            size="sm"
            onClick={closeAllSections}
            className="bg-white/80 backdrop-blur-sm hover:bg-white border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 shadow-sm transition-all duration-200"
            aria-label="Close all expanded sections"
          >
            <X className="w-3 h-3 mr-2" />
            Close All Sections
          </Button>
        </div>
      )}
      
      <div ref={sectionsRef} className="space-y-3">
        <IntelligentCollapsible
          title="Unified Mobile Platform"
          icon={<Star className="w-5 h-5 text-orange-500" />}
          badge="Premium"
          badgeVariant="outline"
          defaultCollapsed={true}
          className="border-orange-200 bg-orange-50/20"
          accordionMode={false}
          persistState={true}
          lazyLoad={false}
          onToggle={(isExpanded) => handleSectionToggle("Unified Mobile Platform", isExpanded)}
        >
        <div className="space-y-4">
          <p className="text-gray-700">
            Experience our comprehensive mobile platform that brings together all your favorite services
            in one seamless interface. From airtime and data to financial services, everything you need
            is just a tap away.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-orange-600 mb-2">Smart Features</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• AI-powered recommendations</li>
                <li>• Instant transactions</li>
                <li>• Multi-network support</li>
                <li>• Secure payments</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-orange-600 mb-2">Network Coverage</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Vodacom</li>
                <li>• MTN</li>
                <li>• Cell C</li>
                <li>• Telkom</li>
              </ul>
            </div>
          </div>
        </div>
      </IntelligentCollapsible>

        <IntelligentCollapsible
          title="Quick Access Features"
          icon={<Zap className="w-5 h-5 text-blue-500" />}
          badge="Fast"
          badgeVariant="secondary"
          defaultCollapsed={true}
          className="border-blue-200 bg-blue-50/20"
          accordionMode={false}
          persistState={true}
          lazyLoad={true}
          onToggle={(isExpanded) => handleSectionToggle("Quick Access Features", isExpanded)}
        >
        <div className="space-y-4">
          <p className="text-gray-700">
            Lightning-fast access to your most-used features. No more navigating through complex menus - 
            everything you need is right at your fingertips.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white p-3 rounded-lg border text-center">
              <div className="text-2xl mb-1">📱</div>
              <div className="text-sm font-medium">Buy Airtime</div>
            </div>
            <div className="bg-white p-3 rounded-lg border text-center">
              <div className="text-2xl mb-1">📊</div>
              <div className="text-sm font-medium">Data Bundles</div>
            </div>
            <div className="bg-white p-3 rounded-lg border text-center">
              <div className="text-2xl mb-1">💳</div>
              <div className="text-sm font-medium">OneCard</div>
            </div>
            <div className="bg-white p-3 rounded-lg border text-center">
              <div className="text-2xl mb-1">🎯</div>
              <div className="text-sm font-medium">Deals</div>
            </div>
          </div>
        </div>
      </IntelligentCollapsible>

        <IntelligentCollapsible
          title="Join Our Thriving Community"
          icon={<Users className="w-5 h-5 text-purple-500" />}
          badge="50K+ Members"
          badgeVariant="outline"
          defaultCollapsed={true}
          className="border-purple-200 bg-purple-50/20"
          accordionMode={false}
          persistState={true}
          lazyLoad={true}
          onToggle={(isExpanded) => handleSectionToggle("Join Our Thriving Community", isExpanded)}
        >
        <div className="space-y-4">
          <p className="text-gray-700">
            Become part of a growing community of smart shoppers who save money on mobile services
            while earning rewards with every purchase.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div className="bg-white p-4 rounded-lg border text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">R2.5M+</div>
              <div className="text-sm text-gray-600">Rewards Earned</div>
            </div>
            <div className="bg-white p-4 rounded-lg border text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </IntelligentCollapsible>

        <IntelligentCollapsible
          title="Why Choose Smart Deals Shopping?"
          icon={<Shield className="w-5 h-5 text-purple-500" />}
          badge="Trusted"
          badgeVariant="outline"
          defaultCollapsed={true}
          className="border-purple-200 bg-purple-50/20"
          accordionMode={false}
          persistState={true}
          lazyLoad={true}
          onToggle={(isExpanded) => handleSectionToggle("Why Choose Smart Deals Shopping?", isExpanded)}
        >
        <div className="space-y-4">
          <p className="text-gray-700">
            Discover why thousands of South Africans trust us with their mobile service needs.
            From competitive pricing to exceptional customer service, we're here to help you save.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-purple-600">Best Prices Guaranteed</h4>
                  <p className="text-sm text-gray-600">We constantly monitor market prices to ensure you get the best deals available.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-purple-600">Instant Delivery</h4>
                  <p className="text-sm text-gray-600">Airtime and data delivered to your phone within seconds of purchase.</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-purple-600">Secure Transactions</h4>
                  <p className="text-sm text-gray-600">Bank-level security protects your personal and financial information.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-purple-600">24/7 Support</h4>
                  <p className="text-sm text-gray-600">Our customer support team is always ready to help you with any questions.</p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </IntelligentCollapsible>
      </div>
    </div>
  );
};

export default IntelligentCollapsibleSections;
