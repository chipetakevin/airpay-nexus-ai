import React, { createContext, useContext, useState, useEffect } from 'react';

interface VersionContextType {
  currentVersion: string;
  displayVersion: string;
  setCurrentVersion: (version: string) => void;
  updateVersion: (version: string) => void;
}

const VersionContext = createContext<VersionContextType | undefined>(undefined);

export const useVersion = () => {
  const context = useContext(VersionContext);
  if (!context) {
    throw new Error('useVersion must be used within a VersionProvider');
  }
  return context;
};

interface VersionProviderProps {
  children: React.ReactNode;
}

export const VersionProvider: React.FC<VersionProviderProps> = ({ children }) => {
  const [currentVersion, setCurrentVersionState] = useState('v4.0.0');
  
  // Convert version to display format (e.g., "v4.0.0" -> "v4.0")
  const getDisplayVersion = (version: string): string => {
    if (version.startsWith('v')) {
      const versionParts = version.substring(1).split('.');
      if (versionParts.length >= 2) {
        return `v${versionParts[0]}.${versionParts[1]}`;
      }
    }
    return version;
  };

  const displayVersion = getDisplayVersion(currentVersion);

  const setCurrentVersion = (version: string) => {
    setCurrentVersionState(version);
    // Store in localStorage for persistence
    localStorage.setItem('mvne-current-version', version);
  };

  const updateVersion = (version: string) => {
    setCurrentVersion(version);
  };

  // Load version from localStorage on mount
  useEffect(() => {
    const savedVersion = localStorage.getItem('mvne-current-version');
    if (savedVersion) {
      setCurrentVersionState(savedVersion);
    }
  }, []);

  const value = {
    currentVersion,
    displayVersion,
    setCurrentVersion,
    updateVersion
  };

  return (
    <VersionContext.Provider value={value}>
      {children}
    </VersionContext.Provider>
  );
};