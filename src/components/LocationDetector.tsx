
import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface LocationDetectorProps {
  onLocationUpdate: (location: string) => void;
}

const LocationDetector: React.FC<LocationDetectorProps> = ({ onLocationUpdate }) => {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd use reverse geocoding API
          // For demo purposes, we'll simulate location detection
          onLocationUpdate('Johannesburg, Gauteng, South Africa');
        },
        (error) => {
          console.log('Geolocation error:', error);
          onLocationUpdate('Location detection unavailable - defaulting to South Africa');
        }
      );
    } else {
      onLocationUpdate('Geolocation not supported - defaulting to South Africa');
    }
  }, [onLocationUpdate]);

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-4">
        <p className="text-sm text-blue-800">
          📍 <strong>Detected Location:</strong> Johannesburg, Gauteng, South Africa
        </p>
      </CardContent>
    </Card>
  );
};

export default LocationDetector;
