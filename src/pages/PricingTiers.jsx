import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiDollarSign, FiUsers, FiEdit, FiSave, FiX, FiPlus } = FiIcons;

function PricingTiers() {
  const [tiers, setTiers] = useState([
    {
      id: 'bronze',
      name: 'Bronze',
      description: 'Basic wholesale pricing for new customers',
      minOrderValue: 500,
      discount: 0,
      color: 'bg-amber-100 text-amber-800',
      requirements: ['Minimum $500 order value', 'Business license verification']
    },
    {
      id: 'silver',
      name: 'Silver',
      description: 'Enhanced pricing for regular customers',
      minOrderValue: 1000,
      discount: 5,
      color: 'bg-gray-100 text-gray-800',
      requirements: ['Minimum $1,000 order value', '3+ months trading history', 'Good payment record']
    },
    {
      id: 'gold',
      name: 'Gold',
      description: 'Premium pricing for valued partners',
      minOrderValue: 2500,
      discount: 12,
      color: 'bg-yellow-100 text-yellow-800',
      requirements: ['Minimum $2,500 order value', '12+ months trading history', 'Excellent payment record']
    },
    {
      id: 'platinum',
      name: 'Platinum',
      description: 'Exclusive pricing for top-tier partners',
      minOrderValue: 5000,
      discount: 18,
      color: 'bg-purple-100 text-purple-800',
      requirements: ['Minimum $5,000 order value', '24+ months trading history', 'Strategic partnership agreement']
    }
  ]);

  const [editingTier, setEditingTier] = useState(null);
  const [editForm, setEditForm] = useState({});

  const categories = [
    { id: 'cleansers', name: 'Cleansers', basePrice: 12.00 },
    { id: 'moisturizers', name: 'Moisturizers', basePrice: 20.00 },
    { id: 'serums', name: 'Serums', basePrice: 25.00 },
    { id: 'masks', name: 'Face Masks', basePrice: 16.00 },
    { id: 'oils', name: 'Face Oils', basePrice: 30.00 }
  ];

  const handleEdit = (tier) => {
    setEditingTier(tier.id);
    setEditForm({ ...tier });
  };

  const handleSave = () => {
    setTiers(prev => prev.map(tier => 
      tier.id === editingTier ? editForm : tier
    ));
    setEditingTier(null);
    setEditForm({});
  };

  const handleCancel = () => {
    setEditingTier(null);
    setEditForm({});
  };

  const calculatePrice = (basePrice, discount) => {
    return basePrice * (1 - discount / 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Pricing Tiers</h1>
        <p className="text-gray-600 mt-2">
          Configure wholesale pricing tiers and requirements
        </p>
      </motion.div>

      {/* Pricing Tiers Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${tier.color}`}>
                {tier.name}
              </div>
              <button
                onClick={() => handleEdit(tier)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <SafeIcon icon={FiEdit} />
              </button>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">{tier.name} Tier</h3>
            <p className="text-gray-600 text-sm mb-4">{tier.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Min Order:</span>
                <span className="font-medium">${tier.minOrderValue}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Discount:</span>
                <span className="font-medium text-green-600">{tier.discount}%</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs font-medium text-gray-700 mb-2">Requirements:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                {tier.requirements.map((req, reqIndex) => (
                  <li key={reqIndex} className="flex items-start">
                    <span className="text-green-500 mr-1">•</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit Tier Modal */}
      {editingTier && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Edit {editForm.name} Tier
              </h2>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={FiX} className="text-xl" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tier Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Order Value ($)
                </label>
                <input
                  type="number"
                  value={editForm.minOrderValue}
                  onChange={(e) => setEditForm({ ...editForm, minOrderValue: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Percentage (%)
                </label>
                <input
                  type="number"
                  value={editForm.discount}
                  onChange={(e) => setEditForm({ ...editForm, discount: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiSave} />
                <span>Save Changes</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Pricing Matrix */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Pricing Matrix</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Base Price
                </th>
                {tiers.map(tier => (
                  <th key={tier.id} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {tier.name} ({tier.discount}% off)
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {category.name}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${category.basePrice.toFixed(2)}
                  </td>
                  {tiers.map(tier => (
                    <td key={tier.id} className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      ${calculatePrice(category.basePrice, tier.discount).toFixed(2)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Tier Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Tier Benefits Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, index) => (
            <div key={tier.id} className="border border-gray-200 rounded-lg p-4">
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${tier.color}`}>
                {tier.name}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Discount Rate</span>
                  <span className="font-semibold text-green-600">{tier.discount}%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Min Order</span>
                  <span className="font-semibold">${tier.minOrderValue.toLocaleString()}</span>
                </div>
                
                <div className="pt-2 border-t">
                  <p className="text-xs font-medium text-gray-700 mb-2">Benefits:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• {tier.discount > 0 ? `${tier.discount}% discount` : 'Standard pricing'}</li>
                    <li>• Free shipping</li>
                    <li>• Net 30 payment terms</li>
                    {tier.discount >= 12 && <li>• Priority support</li>}
                    {tier.discount >= 18 && <li>• Dedicated account manager</li>}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tier Progression Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 mt-8"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Advance Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <SafeIcon icon={FiDollarSign} className="text-white text-xl" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Order Volume</h3>
            <p className="text-sm text-gray-600">
              Meet minimum order requirements consistently to qualify for higher tiers
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <SafeIcon icon={FiUsers} className="text-white text-xl" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Trading History</h3>
            <p className="text-sm text-gray-600">
              Maintain a good trading relationship with timely payments and regular orders
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <SafeIcon icon={FiPlus} className="text-white text-xl" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Partnership</h3>
            <p className="text-sm text-gray-600">
              Engage in strategic partnerships and marketing collaborations for premium tiers
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default PricingTiers;