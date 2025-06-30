import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMapPin, FiCheck, FiEdit } = FiIcons;

function AddressForm({ 
  address, 
  onAddressChange, 
  savedAddresses = [], 
  onSelectSavedAddress,
  type = 'billing' // 'billing' or 'shipping'
}) {
  const [useExisting, setUseExisting] = useState(false);
  const [selectedSavedAddress, setSelectedSavedAddress] = useState('');

  const handleFieldChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      onAddressChange({
        ...address,
        [parent]: {
          ...address[parent],
          [child]: value
        }
      });
    } else {
      onAddressChange({
        ...address,
        [field]: value
      });
    }
  };

  const handleSavedAddressSelect = (addressId) => {
    const savedAddress = savedAddresses.find(addr => addr.id === addressId);
    if (savedAddress && onSelectSavedAddress) {
      onSelectSavedAddress(savedAddress);
      setSelectedSavedAddress(addressId);
    }
  };

  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-earth-900 flex items-center">
          <SafeIcon icon={FiMapPin} className="mr-2 text-forest-600" />
          {type === 'billing' ? 'Billing Address' : 'Shipping Address'}
        </h3>
        
        {savedAddresses.length > 0 && (
          <button
            type="button"
            onClick={() => setUseExisting(!useExisting)}
            className="text-forest-600 hover:text-forest-700 text-sm font-medium transition-colors"
          >
            {useExisting ? 'Enter new address' : 'Use saved address'}
          </button>
        )}
      </div>

      {useExisting && savedAddresses.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <label className="block text-sm font-medium text-earth-700">
            Select saved address
          </label>
          <div className="space-y-2">
            {savedAddresses.map((savedAddr) => (
              <motion.div
                key={savedAddr.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleSavedAddressSelect(savedAddr.id)}
                className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                  selectedSavedAddress === savedAddr.id
                    ? 'border-forest-500 bg-forest-50'
                    : 'border-earth-300 hover:border-earth-400 bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-earth-900">{savedAddr.name}</p>
                    <p className="text-earth-600 text-sm">{savedAddr.address.line1}</p>
                    {savedAddr.address.line2 && (
                      <p className="text-earth-600 text-sm">{savedAddr.address.line2}</p>
                    )}
                    <p className="text-earth-600 text-sm">
                      {savedAddr.address.city}, {savedAddr.address.state} {savedAddr.address.postal_code}
                    </p>
                    <p className="text-earth-600 text-sm">{savedAddr.address.country}</p>
                  </div>
                  {selectedSavedAddress === savedAddr.id && (
                    <SafeIcon icon={FiCheck} className="text-forest-600 mt-1" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          <button
            type="button"
            onClick={() => setUseExisting(false)}
            className="flex items-center space-x-2 text-earth-600 hover:text-earth-700 text-sm transition-colors"
          >
            <SafeIcon icon={FiEdit} />
            <span>Or enter a new address</span>
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-earth-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={address.name || ''}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-earth-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={address.email || ''}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-earth-700 mb-2">
              Address Line 1 *
            </label>
            <input
              type="text"
              value={address.address?.line1 || ''}
              onChange={(e) => handleFieldChange('address.line1', e.target.value)}
              className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
              placeholder="Street address"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-earth-700 mb-2">
              Address Line 2
            </label>
            <input
              type="text"
              value={address.address?.line2 || ''}
              onChange={(e) => handleFieldChange('address.line2', e.target.value)}
              className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
              placeholder="Apartment, suite, unit, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-earth-700 mb-2">
              City *
            </label>
            <input
              type="text"
              value={address.address?.city || ''}
              onChange={(e) => handleFieldChange('address.city', e.target.value)}
              className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-earth-700 mb-2">
              State/Province *
            </label>
            <input
              type="text"
              value={address.address?.state || ''}
              onChange={(e) => handleFieldChange('address.state', e.target.value)}
              className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-earth-700 mb-2">
              ZIP/Postal Code *
            </label>
            <input
              type="text"
              value={address.address?.postal_code || ''}
              onChange={(e) => handleFieldChange('address.postal_code', e.target.value)}
              className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-earth-700 mb-2">
              Country *
            </label>
            <select
              value={address.address?.country || 'US'}
              onChange={(e) => handleFieldChange('address.country', e.target.value)}
              className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
            >
              {countries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default AddressForm;