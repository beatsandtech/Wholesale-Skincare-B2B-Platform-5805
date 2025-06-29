import React from 'react';
import { useSettings } from '../contexts/SettingsContext';

function BrandingWrapper({ children }) {
  const { settings } = useSettings();
  const { branding } = settings;

  // Apply custom CSS variables for dynamic theming
  React.useEffect(() => {
    if (branding.primaryColor) {
      document.documentElement.style.setProperty('--primary-color', branding.primaryColor);
    }
    if (branding.secondaryColor) {
      document.documentElement.style.setProperty('--secondary-color', branding.secondaryColor);
    }
  }, [branding.primaryColor, branding.secondaryColor]);

  return children;
}

export default BrandingWrapper;