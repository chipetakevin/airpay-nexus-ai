import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.80705902523a40e5af183f98674e2ac9',
  appName: 'airpay-nexus-ai',
  webDir: 'dist',
  server: {
    url: 'https://80705902-523a-40e5-af18-3f98674e2ac9.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0F172A',
      showSpinner: false
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#0F172A'
    }
  }
};

export default config;