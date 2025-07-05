import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CollapsibleSection from '@/components/ui/collapsible-section';
import CollapsibleCardExample from '@/components/ui/collapsible-card-example';
import { ArrowLeft, Sparkles, Settings, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const CollapsibleDemo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Collapsible Components</h1>
                <p className="text-sm text-gray-600">Smooth animations and user-friendly interactions</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Left Column - Card Examples */}
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Settings className="w-5 h-5 text-indigo-600" />
                Interactive Card Examples
              </h2>
              <p className="text-gray-600 text-sm">
                Based on your OneCard interface design with smooth collapse animations
              </p>
            </div>
            
            <CollapsibleCardExample />
          </div>

          {/* Right Column - Documentation */}
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Info className="w-5 h-5 text-indigo-600" />
                Component Features
              </h2>
            </div>

            <div className="space-y-4">
              <CollapsibleSection
                defaultVisible={true}
                showToggleButton={true}
                toggleButtonText={{ show: "Show Features", hide: "Hide Features" }}
              >
                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Key Features</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Smooth fade-out and collapse animations</li>
                    <li>• Configurable animation duration</li>
                    <li>• Toggle and close button options</li>
                    <li>• Custom button text support</li>
                    <li>• Callback functions for state changes</li>
                    <li>• Responsive and accessible design</li>
                  </ul>
                </Card>
              </CollapsibleSection>

              <CollapsibleSection
                defaultVisible={false}
                showToggleButton={true}
                toggleButtonText={{ show: "Show Usage", hide: "Hide Usage" }}
              >
                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Basic Usage</h3>
                  <div className="bg-gray-50 p-3 rounded text-xs font-mono">
                    <div className="text-gray-800">
                      {'<CollapsibleSection'}
                      <br />
                      {'  defaultVisible={true}'}
                      <br />
                      {'  showToggleButton={true}'}
                      <br />
                      {'  onToggle={(visible) => console.log(visible)}'}
                      <br />
                      {'>'}
                      <br />
                      {'  <YourContent />'}
                      <br />
                      {'</CollapsibleSection>'}
                    </div>
                  </div>
                </Card>
              </CollapsibleSection>

              <CollapsibleSection
                defaultVisible={false}
                showToggleButton={true}
                showCloseButton={true}
                toggleButtonText={{ show: "Show Props", hide: "Hide Props" }}
                onClose={() => console.log('Props section closed')}
              >
                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Available Props</h3>
                  <div className="space-y-2 text-sm">
                    <div><code className="bg-gray-100 px-2 py-1 rounded">defaultVisible</code> - Initial visibility state</div>
                    <div><code className="bg-gray-100 px-2 py-1 rounded">showToggleButton</code> - Show/hide toggle button</div>
                    <div><code className="bg-gray-100 px-2 py-1 rounded">showCloseButton</code> - Show close button</div>
                    <div><code className="bg-gray-100 px-2 py-1 rounded">animationDuration</code> - Animation speed in ms</div>
                    <div><code className="bg-gray-100 px-2 py-1 rounded">onToggle</code> - Callback when toggled</div>
                    <div><code className="bg-gray-100 px-2 py-1 rounded">onClose</code> - Callback when closed</div>
                  </div>
                </Card>
              </CollapsibleSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollapsibleDemo;