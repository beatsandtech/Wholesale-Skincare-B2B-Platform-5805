import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export function useSettings() {
  return useContext(SettingsContext);
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    // Branding Settings
    branding: {
      companyName: 'Natural Skincare',
      companyTagline: 'Wholesale Portal',
      companyDescription: 'Premium natural skincare products for wholesale',
      logoUrl: '',
      primaryColor: '#4a8f4a', // forest-600
      secondaryColor: '#b89b7e', // earth-600
    },
    // Business Settings
    business: {
      companyEmail: 'info@naturalskincare.com',
      companyPhone: '+1 (555) 123-4567',
      companyAddress: '123 Natural Way, Green Valley, CA 90210',
      taxId: '12-3456789',
      timezone: 'America/Los_Angeles',
      dateFormat: 'MM/DD/YYYY',
      currency: 'USD',
    },
    // Payment Gateway Settings
    payment: {
      stripeEnabled: true,
      stripePublishableKey: 'pk_test_51234567890...',
      stripeSecretKey: 'sk_test_51234567890...',
      stripeWebhookSecret: 'whsec_1234567890...',
      paypalEnabled: false,
      paypalClientId: '',
      paypalClientSecret: '',
      paypalWebhookId: '',
      paypalSandbox: true,
      defaultCurrency: 'USD',
      processingFeePercentage: 2.9,
      processingFeeFixed: 0.30,
      autoCapture: true,
      testMode: true,
    },
    // Email Settings
    email: {
      provider: 'smtp',
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
      smtpUser: '',
      smtpPassword: '',
      smtpSecure: true,
      fromEmail: 'noreply@naturalskincare.com',
      fromName: 'Natural Skincare Co.',
      orderConfirmationEnabled: true,
      shipmentNotificationEnabled: true,
      marketingEmailsEnabled: false,
    },
    // Security Settings
    security: {
      twoFactorEnabled: false,
      sessionTimeout: 30,
      passwordMinLength: 8,
      passwordRequireSpecial: true,
      loginAttempts: 5,
      ipWhitelist: '',
      sslRequired: true,
      corsOrigins: '*',
    },
    // Integration Settings
    integrations: {
      analyticsEnabled: true,
      googleAnalyticsId: '',
      facebookPixelId: '',
      intercomEnabled: false,
      slackWebhook: '',
      inventorySync: false,
      autoBackups: true,
      backupFrequency: 'daily',
    }
  });

  const [saveStatus, setSaveStatus] = useState({});

  useEffect(() => {
    // Load settings from localStorage on component mount
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        console.log('Loading saved settings from localStorage:', parsed);
        setSettings(prev => ({
          ...prev,
          ...parsed
        }));
      } catch (error) {
        console.error('Error parsing saved settings:', error);
      }
    }
  }, []);

  // Auto-save to localStorage whenever settings change
  useEffect(() => {
    console.log('Settings changed, saving to localStorage:', settings);
    localStorage.setItem('appSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (section, key, value) => {
    console.log(`Updating setting ${section}.${key}:`, value);
    setSettings(prev => {
      const newSettings = {
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value
        }
      };
      console.log('New settings state:', newSettings);
      return newSettings;
    });
  };

  const updateSettings = (section, newSettings) => {
    console.log(`Updating ${section} settings:`, newSettings);
    setSettings(prev => {
      const updatedSettings = {
        ...prev,
        [section]: {
          ...prev[section],
          ...newSettings
        }
      };
      console.log('Updated settings state:', updatedSettings);
      return updatedSettings;
    });
  };

  const saveSectionSettings = async (section) => {
    setSaveStatus({ [section]: 'saving' });
    
    try {
      console.log(`Manually saving ${section} section:`, settings[section]);
      
      // Settings are already saved to localStorage via useEffect
      // This is just for UI feedback
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSaveStatus({ [section]: 'success' });
      
      console.log(`${section} settings saved successfully`);
      
      // Clear success status after 3 seconds
      setTimeout(() => {
        setSaveStatus(prev => {
          const newStatus = { ...prev };
          delete newStatus[section];
          return newStatus;
        });
      }, 3000);
      
      return { success: true };
    } catch (error) {
      console.error('Error saving settings:', error);
      setSaveStatus({ [section]: 'error' });
      
      // Clear error status after 5 seconds
      setTimeout(() => {
        setSaveStatus(prev => {
          const newStatus = { ...prev };
          delete newStatus[section];
          return newStatus;
        });
      }, 5000);
      
      return { success: false, error: error.message };
    }
  };

  const resetSection = (section) => {
    // Reset specific section to defaults
    const defaults = {
      branding: {
        companyName: 'Natural Skincare',
        companyTagline: 'Wholesale Portal',
        companyDescription: 'Premium natural skincare products for wholesale',
        logoUrl: '',
        primaryColor: '#4a8f4a',
        secondaryColor: '#b89b7e',
      },
      business: {
        companyEmail: 'info@naturalskincare.com',
        companyPhone: '+1 (555) 123-4567',
        companyAddress: '123 Natural Way, Green Valley, CA 90210',
        taxId: '12-3456789',
        timezone: 'America/Los_Angeles',
        dateFormat: 'MM/DD/YYYY',
        currency: 'USD',
      }
    };

    if (defaults[section]) {
      console.log(`Resetting ${section} to defaults:`, defaults[section]);
      setSettings(prev => ({
        ...prev,
        [section]: defaults[section]
      }));
    }
  };

  const value = {
    settings,
    updateSetting,
    updateSettings,
    saveSectionSettings,
    resetSection,
    saveStatus,
    // Helper functions
    getBrandingSettings: () => settings.branding,
    getBusinessSettings: () => settings.business,
    getPaymentSettings: () => settings.payment,
    getEmailSettings: () => settings.email,
    getSecuritySettings: () => settings.security,
    getIntegrationSettings: () => settings.integrations,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}