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
    },
    // Webhook Settings
    webhooks: {
      enabled: false,
      events: {
        orderCreated: {
          enabled: false,
          url: '',
          secret: '',
          retryAttempts: 3,
          timeout: 30
        },
        orderUpdated: {
          enabled: false,
          url: '',
          secret: '',
          retryAttempts: 3,
          timeout: 30
        },
        orderCancelled: {
          enabled: false,
          url: '',
          secret: '',
          retryAttempts: 3,
          timeout: 30
        },
        paymentReceived: {
          enabled: false,
          url: '',
          secret: '',
          retryAttempts: 3,
          timeout: 30
        },
        paymentFailed: {
          enabled: false,
          url: '',
          secret: '',
          retryAttempts: 3,
          timeout: 30
        },
        userRegistered: {
          enabled: false,
          url: '',
          secret: '',
          retryAttempts: 3,
          timeout: 30
        },
        inventoryLow: {
          enabled: false,
          url: '',
          secret: '',
          retryAttempts: 3,
          timeout: 30
        },
        customEvent: {
          enabled: false,
          url: '',
          secret: '',
          retryAttempts: 3,
          timeout: 30
        }
      },
      globalSettings: {
        userAgent: 'Natural-Skincare-Webhooks/1.0',
        contentType: 'application/json',
        includeTimestamp: true,
        includeSignature: true,
        signatureHeader: 'X-Webhook-Signature',
        retryDelay: 5000,
        maxRetries: 3
      }
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
      },
      webhooks: {
        enabled: false,
        events: {
          orderCreated: { enabled: false, url: '', secret: '', retryAttempts: 3, timeout: 30 },
          orderUpdated: { enabled: false, url: '', secret: '', retryAttempts: 3, timeout: 30 },
          orderCancelled: { enabled: false, url: '', secret: '', retryAttempts: 3, timeout: 30 },
          paymentReceived: { enabled: false, url: '', secret: '', retryAttempts: 3, timeout: 30 },
          paymentFailed: { enabled: false, url: '', secret: '', retryAttempts: 3, timeout: 30 },
          userRegistered: { enabled: false, url: '', secret: '', retryAttempts: 3, timeout: 30 },
          inventoryLow: { enabled: false, url: '', secret: '', retryAttempts: 3, timeout: 30 },
          customEvent: { enabled: false, url: '', secret: '', retryAttempts: 3, timeout: 30 }
        },
        globalSettings: {
          userAgent: 'Natural-Skincare-Webhooks/1.0',
          contentType: 'application/json',
          includeTimestamp: true,
          includeSignature: true,
          signatureHeader: 'X-Webhook-Signature',
          retryDelay: 5000,
          maxRetries: 3
        }
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

  // Webhook utility functions
  const sendWebhook = async (eventType, payload) => {
    const webhookConfig = settings.webhooks;
    const eventConfig = webhookConfig.events[eventType];
    
    if (!webhookConfig.enabled || !eventConfig.enabled || !eventConfig.url) {
      console.log(`Webhook for ${eventType} is disabled or not configured`);
      return { success: false, reason: 'disabled' };
    }

    const webhookPayload = {
      event: eventType,
      timestamp: new Date().toISOString(),
      data: payload
    };

    if (webhookConfig.globalSettings.includeSignature && eventConfig.secret) {
      // In a real implementation, you would generate HMAC signature here
      webhookPayload.signature = 'sha256=mock_signature';
    }

    try {
      const response = await fetch(eventConfig.url, {
        method: 'POST',
        headers: {
          'Content-Type': webhookConfig.globalSettings.contentType,
          'User-Agent': webhookConfig.globalSettings.userAgent,
          ...(webhookConfig.globalSettings.includeSignature && eventConfig.secret ? {
            [webhookConfig.globalSettings.signatureHeader]: webhookPayload.signature
          } : {})
        },
        body: JSON.stringify(webhookPayload),
        signal: AbortSignal.timeout(eventConfig.timeout * 1000)
      });

      if (response.ok) {
        console.log(`Webhook ${eventType} sent successfully`);
        return { success: true, response };
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Webhook ${eventType} failed:`, error);
      
      // Implement retry logic
      if (eventConfig.retryAttempts > 0) {
        setTimeout(() => {
          sendWebhook(eventType, payload);
        }, webhookConfig.globalSettings.retryDelay);
      }
      
      return { success: false, error: error.message };
    }
  };

  const testWebhook = async (eventType) => {
    const testPayload = {
      test: true,
      message: `Test webhook for ${eventType} event`,
      timestamp: new Date().toISOString()
    };

    return await sendWebhook(eventType, testPayload);
  };

  const value = {
    settings,
    updateSetting,
    updateSettings,
    saveSectionSettings,
    resetSection,
    saveStatus,
    sendWebhook,
    testWebhook,
    // Helper functions
    getBrandingSettings: () => settings.branding,
    getBusinessSettings: () => settings.business,
    getPaymentSettings: () => settings.payment,
    getEmailSettings: () => settings.email,
    getSecuritySettings: () => settings.security,
    getIntegrationSettings: () => settings.integrations,
    getWebhookSettings: () => settings.webhooks,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}