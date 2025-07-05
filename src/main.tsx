
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { MobileFirstProvider } from './components/layout/MobileFirstProvider.tsx'

// Update document title
document.title = 'Divine Mobile - Smart Mobile Services Platform';

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MobileFirstProvider>
      <App />
    </MobileFirstProvider>
  </React.StrictMode>
);
