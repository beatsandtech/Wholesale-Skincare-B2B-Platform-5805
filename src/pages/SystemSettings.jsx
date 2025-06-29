import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import { useSettings } from '../contexts/SettingsContext';
import CompanyLogo from '../components/CompanyLogo';
import ImageUpload from '../components/ImageUpload';
import * as FiIcons from 'react-icons/fi';

const {
  FiSettings, FiCreditCard, FiGlobe, FiMail, FiShield, FiDatabase, FiSave, FiKey,
  FiDollarSign, FiLock, FiEye, FiEyeOff, FiCheck, FiAlertTriangle, FiRefreshCw,
  FiDownload, FiUpload, FiToggleLeft, FiToggleRight, FiEdit, FiX, FiPalette,
  FiLoader, FiCamera
} = FiIcons;

function SystemSettings() {
  const { settings, updateSettings, saveSectionSettings, resetSection, saveStatus } = useSettings();
  const [activeTab, setActiveTab] = useState('branding');
  const [showApiKeys, setShowApiKeys] = useState({});
  const [localSettings, setLocalSettings] = useState(settings);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState({});

  // Sync local settings when context settings change
  useEffect(() => {
    console.log('Context settings changed:', settings);
    setLocalSettings(settings);
    // Reset unsaved changes when context updates
    setHasUnsavedChanges({});
  }, [settings]);

  const tabs = [
    { id: 'branding', label: 'Branding', icon: FiPalette },
    { id: 'business', label: 'Business Info', icon: FiGlobe },
    { id: 'payment', label: 'Payment Gateways', icon: FiCreditCard },
    { id: 'email', label: 'Email Settings', icon: FiMail },
    { id: 'security', label: 'Security', icon: FiShield },
    { id: 'integrations', label: 'Integrations', icon: FiDatabase }
  ];

  const toggleApiKeyVisibility = (key) => {
    setShowApiKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLocalSettingChange = (section, key, value) => {
    console.log(`Changing ${section}.${key} to:`, value);
    
    setLocalSettings(prev => {
      const updated = {
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value
        }
      };
      console.log('Local settings updated:', updated);
      return updated;
    });
    
    setHasUnsavedChanges(prev => ({ ...prev, [section]: true }));
  };

  const handleLogoUpload = (imageUrl) => {
    handleLocalSettingChange('branding', 'logoUrl', imageUrl);
  };

  const handleSave = async (section) => {
    console.log(`Saving ${section} settings...`);
    console.log('Local settings to save:', localSettings[section]);
    
    try {
      // Update the context with local changes
      updateSettings(section, localSettings[section]);
      
      // Trigger the save status animation
      const result = await saveSectionSettings(section);
      
      if (result.success) {
        setHasUnsavedChanges(prev => ({ ...prev, [section]: false }));
        console.log(`${section} settings saved successfully`);
      } else {
        console.error(`Failed to save ${section} settings:`, result.error);
      }
    } catch (error) {
      console.error(`Error saving ${section} settings:`, error);
    }
  };

  const handleReset = (section) => {
    if (window.confirm(`Are you sure you want to reset ${section} settings to default values?`)) {
      resetSection(section);
      setHasUnsavedChanges(prev => ({ ...prev, [section]: false }));
    }
  };

  const testConnection = async (service) => {
    console.log(`Testing ${service} connection...`);
    setTimeout(() => {
      alert(`${service} connection test completed. Check console for details.`);
    }, 1000);
  };

  const renderSaveButton = (section) => {
    const status = saveStatus[section];
    const hasChanges = hasUnsavedChanges[section];

    return (
      <div className="flex items-center space-x-4">
        {hasChanges && (
          <span className="text-sm text-orange-600 flex items-center">
            <SafeIcon icon={FiAlertTriangle} className="mr-1" />
            Unsaved changes
          </span>
        )}
        <button
          onClick={() => handleReset(section)}
          className="px-4 py-2 border border-earth-300 text-earth-700 rounded-xl hover:bg-earth-50 transition-colors"
        >
          Reset to Default
        </button>
        <button
          onClick={() => handleSave(section)}
          disabled={status === 'saving'}
          className="bg-forest-600 hover:bg-forest-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center space-x-2 shadow-lg"
        >
          {status === 'saving' ? (
            <>
              <SafeIcon icon={FiLoader} className="animate-spin" />
              <span>Saving...</span>
            </>
          ) : status === 'success' ? (
            <>
              <SafeIcon icon={FiCheck} />
              <span>Saved!</span>
            </>
          ) : (
            <>
              <SafeIcon icon={FiSave} />
              <span>Save {section.charAt(0).toUpperCase() + section.slice(1)} Settings</span>
            </>
          )}
        </button>
      </div>
    );
  };

  const renderBrandingSettings = () => (
    <div className="space-y-8">
      {/* Live Preview */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6">
        <h3 className="text-lg font-semibold text-earth-900 mb-4">Live Preview</h3>
        <div className="p-6 bg-gradient-to-r from-sage-50 to-earth-50 rounded-xl border border-sage-200">
          <div className="flex items-center space-x-3 group">
            {localSettings.branding?.logoUrl ? (
              <img
                src={localSettings.branding.logoUrl}
                alt={`${localSettings.branding?.companyName} Logo`}
                className="w-16 h-16 object-contain rounded-xl"
              />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-forest-500 to-forest-600 rounded-xl flex items-center justify-center shadow-md">
                <SafeIcon icon={FiPalette} className="text-cream-50 text-2xl" />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-4xl font-serif font-bold text-earth-800">
                {localSettings.branding?.companyName || 'Natural Skincare'}
              </span>
              <span className="text-lg text-earth-500 bg-gradient-to-r from-sage-100 to-earth-100 px-2 py-0.5 rounded-full border border-sage-200">
                {localSettings.branding?.companyTagline || 'Wholesale Portal'}
              </span>
            </div>
          </div>
          <p className="text-earth-600 mt-4">{localSettings.branding?.companyDescription}</p>
        </div>
      </div>

      {/* Company Information */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6">
        <h3 className="text-lg font-semibold text-earth-900 mb-6">Company Branding</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-earth-700 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              value={localSettings.branding?.companyName || ''}
              onChange={(e) => handleLocalSettingChange('branding', 'companyName', e.target.value)}
              className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
              placeholder="Your Company Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-earth-700 mb-2">
              Tagline
            </label>
            <input
              type="text"
              value={localSettings.branding?.companyTagline || ''}
              onChange={(e) => handleLocalSettingChange('branding', 'companyTagline', e.target.value)}
              className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
              placeholder="e.g., Wholesale Portal"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-earth-700 mb-2">
              Company Description
            </label>
            <textarea
              value={localSettings.branding?.companyDescription || ''}
              onChange={(e) => handleLocalSettingChange('branding', 'companyDescription', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
              placeholder="Brief description of your company"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-earth-700 mb-2">
              Company Logo
            </label>
            <div className="bg-gradient-to-br from-sage-50 to-earth-50 rounded-xl p-4 border border-sage-200">
              <ImageUpload
                value={localSettings.branding?.logoUrl || ''}
                onChange={handleLogoUpload}
                className="w-full"
              />
              <div className="mt-3 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-earth-200">
                <div className="flex items-start space-x-3">
                  <SafeIcon icon={FiCamera} className="text-forest-600 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-earth-800 mb-1">Logo Guidelines</p>
                    <ul className="text-xs text-earth-600 space-y-1">
                      <li>• Recommended size: 200x200 pixels minimum</li>
                      <li>• Formats supported: PNG, JPG, GIF, SVG</li>
                      <li>• Square logos work best for consistent display</li>
                      <li>• Transparent backgrounds recommended for PNG files</li>
                      <li>• Maximum file size: 5MB</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-earth-500 mt-2">
              Leave empty to use the default leaf icon. Your logo will appear in the navigation and login page.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-earth-700 mb-2">
              Primary Color
            </label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={localSettings.branding?.primaryColor || '#4a8f4a'}
                onChange={(e) => handleLocalSettingChange('branding', 'primaryColor', e.target.value)}
                className="w-16 h-10 border border-earth-300 rounded-xl"
              />
              <input
                type="text"
                value={localSettings.branding?.primaryColor || '#4a8f4a'}
                onChange={(e) => handleLocalSettingChange('branding', 'primaryColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
                placeholder="#4a8f4a"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-earth-700 mb-2">
              Secondary Color
            </label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={localSettings.branding?.secondaryColor || '#b89b7e'}
                onChange={(e) => handleLocalSettingChange('branding', 'secondaryColor', e.target.value)}
                className="w-16 h-10 border border-earth-300 rounded-xl"
              />
              <input
                type="text"
                value={localSettings.branding?.secondaryColor || '#b89b7e'}
                onChange={(e) => handleLocalSettingChange('branding', 'secondaryColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
                placeholder="#b89b7e"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        {renderSaveButton('branding')}
      </div>
    </div>
  );

  const renderBusinessSettings = () => (
    <div className="space-y-6">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6">
        <h3 className="text-lg font-semibold text-earth-900 mb-6">Company Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-earth-700 mb-2">
              Company Email *
            </label>
            <input
              type="email"
              value={localSettings.business?.companyEmail || ''}
              onChange={(e) => handleLocalSettingChange('business', 'companyEmail', e.target.value)}
              className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-earth-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={localSettings.business?.companyPhone || ''}
              onChange={(e) => handleLocalSettingChange('business', 'companyPhone', e.target.value)}
              className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-earth-700 mb-2">
              Tax ID
            </label>
            <input
              type="text"
              value={localSettings.business?.taxId || ''}
              onChange={(e) => handleLocalSettingChange('business', 'taxId', e.target.value)}
              className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-earth-700 mb-2">
              Currency
            </label>
            <select
              value={localSettings.business?.currency || 'USD'}
              onChange={(e) => handleLocalSettingChange('business', 'currency', e.target.value)}
              className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-earth-700 mb-2">
            Company Address *
          </label>
          <textarea
            value={localSettings.business?.companyAddress || ''}
            onChange={(e) => handleLocalSettingChange('business', 'companyAddress', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
          />
        </div>
      </div>

      <div className="flex justify-end">
        {renderSaveButton('business')}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'branding': return renderBrandingSettings();
      case 'business': return renderBusinessSettings();
      default: return renderBrandingSettings();
    }
  };

  return (
    <div className="min-h-screen bg-natural-gradient bg-pattern-leaves">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-serif font-bold text-earth-900">System Settings</h1>
          <p className="text-earth-600 mt-2">
            Configure branding, business info, payment gateways, and system preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-4 sticky top-8"
            >
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center space-x-3 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-forest-100 to-sage-100 text-forest-700 border border-forest-200 shadow-sm'
                        : 'text-earth-600 hover:text-forest-700 hover:bg-gradient-to-r hover:from-sage-50 hover:to-earth-50'
                    }`}
                  >
                    <SafeIcon icon={tab.icon} className="text-lg" />
                    <span className="font-medium">{tab.label}</span>
                    {hasUnsavedChanges[tab.id] && (
                      <div className="w-2 h-2 bg-orange-500 rounded-full ml-auto"></div>
                    )}
                  </button>
                ))}
              </nav>
            </motion.div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SystemSettings;