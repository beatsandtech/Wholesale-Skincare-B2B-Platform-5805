import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useInventory } from '../contexts/InventoryContext';
import { format } from 'date-fns';

const { 
  FiPackage, FiAlertTriangle, FiTrendingUp, FiTrendingDown, 
  FiDollarSign, FiEdit, FiPlus, FiMinus, FiRefreshCw, 
  FiDownload, FiUpload, FiSearch, FiFilter, FiEye,
  FiShoppingCart, FiClock, FiMapPin, FiUser, FiCalendar,
  FiBarChart3, FiActivity, FiBox
} = FiIcons;

function InventoryManagement() {
  const { 
    inventory, 
    stockMovements, 
    alerts, 
    updateStock, 
    updateReorderPoint,
    getInventorySummary,
    getLowStockItems,
    getReorderSuggestions
  } = useInventory();

  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [adjustmentModal, setAdjustmentModal] = useState(false);
  const [adjustmentData, setAdjustmentData] = useState({
    quantity: 0,
    reason: '',
    type: 'adjustment'
  });

  const summary = getInventorySummary();
  const lowStockItems = getLowStockItems();
  const reorderSuggestions = getReorderSuggestions();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiTrendingUp },
    { id: 'inventory', label: 'Inventory', icon: FiPackage },
    { id: 'movements', label: 'Stock Movements', icon: FiRefreshCw },
    { id: 'alerts', label: 'Alerts', icon: FiAlertTriangle, badge: alerts.length }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'in_stock': return 'bg-forest-100 text-forest-800 border-forest-200';
      case 'low_stock': return 'bg-terracotta-100 text-terracotta-800 border-terracotta-200';
      case 'critical_low': return 'bg-red-100 text-red-800 border-red-200';
      case 'out_of_stock': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-earth-100 text-earth-800 border-earth-200';
    }
  };

  const getAlertSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-terracotta-100 text-terracotta-800 border-terracotta-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-earth-100 text-earth-800 border-earth-200';
    }
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStockAdjustment = () => {
    if (selectedItem && adjustmentData.quantity !== 0) {
      updateStock(
        selectedItem.id,
        parseInt(adjustmentData.quantity),
        adjustmentData.reason,
        adjustmentData.type
      );
      setAdjustmentModal(false);
      setAdjustmentData({ quantity: 0, reason: '', type: 'adjustment' });
      setSelectedItem(null);
    }
  };

  const openAdjustmentModal = (item) => {
    setSelectedItem(item);
    setAdjustmentModal(true);
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-earth-600">Total Products</p>
              <p className="text-2xl font-bold text-earth-900">{summary.totalProducts}</p>
            </div>
            <SafeIcon icon={FiPackage} className="text-forest-600 text-2xl" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-earth-600">In Stock</p>
              <p className="text-2xl font-bold text-forest-600">{summary.inStock}</p>
            </div>
            <SafeIcon icon={FiTrendingUp} className="text-forest-600 text-2xl" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-earth-600">Low Stock</p>
              <p className="text-2xl font-bold text-terracotta-600">{summary.lowStock}</p>
            </div>
            <SafeIcon icon={FiAlertTriangle} className="text-terracotta-600 text-2xl" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-earth-600">Critical Low</p>
              <p className="text-2xl font-bold text-red-600">{summary.criticalLow}</p>
            </div>
            <SafeIcon icon={FiTrendingDown} className="text-red-600 text-2xl" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-earth-600">Total Value</p>
              <p className="text-2xl font-bold text-earth-900">${summary.totalValue.toLocaleString()}</p>
            </div>
            <SafeIcon icon={FiDollarSign} className="text-earth-600 text-2xl" />
          </div>
        </motion.div>
      </div>

      {/* Low Stock Items */}
      {lowStockItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6"
        >
          <h3 className="text-lg font-semibold text-earth-900 mb-4 flex items-center">
            <SafeIcon icon={FiAlertTriangle} className="mr-2 text-terracotta-600" />
            Items Requiring Attention
          </h3>
          <div className="space-y-3">
            {lowStockItems.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-terracotta-50 to-earth-50 rounded-xl border border-terracotta-200">
                <div>
                  <p className="font-medium text-earth-900">{item.productName}</p>
                  <p className="text-sm text-earth-600">SKU: {item.sku}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-terracotta-600">{item.availableStock} units</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Reorder Suggestions */}
      {reorderSuggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6"
        >
          <h3 className="text-lg font-semibold text-earth-900 mb-4 flex items-center">
            <SafeIcon icon={FiShoppingCart} className="mr-2 text-forest-600" />
            Reorder Suggestions
          </h3>
          <div className="space-y-3">
            {reorderSuggestions.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-forest-50 to-sage-50 rounded-xl border border-forest-200">
                <div>
                  <p className="font-medium text-earth-900">{item.productName}</p>
                  <p className="text-sm text-earth-600">Current: {item.availableStock} | Reorder Point: {item.reorderPoint}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-forest-600">Order {item.suggestedOrderQuantity} units</p>
                  <p className="text-sm text-earth-600">${(item.suggestedOrderQuantity * item.cost).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-natural-gradient bg-pattern-leaves">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-serif font-bold text-earth-900">Inventory Management</h1>
          <p className="text-earth-600 mt-2">
            Track stock levels, manage inventory, and monitor product availability
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-2 mb-8">
          <nav className="flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`relative flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedTab === tab.id
                    ? 'bg-gradient-to-r from-forest-100 to-sage-100 text-forest-700 shadow-sm'
                    : 'text-earth-600 hover:text-forest-700 hover:bg-earth-50'
                }`}
              >
                <SafeIcon icon={tab.icon} />
                <span>{tab.label}</span>
                {tab.badge && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-terracotta-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {selectedTab === 'overview' && renderOverview()}
          {/* Other tab content would go here */}
        </div>

        {/* Stock Adjustment Modal */}
        {adjustmentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
            >
              <h3 className="text-lg font-semibold text-earth-900 mb-4">
                Adjust Stock: {selectedItem?.productName}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    Adjustment Type
                  </label>
                  <select
                    value={adjustmentData.type}
                    onChange={(e) => setAdjustmentData({ ...adjustmentData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500"
                  >
                    <option value="adjustment">Manual Adjustment</option>
                    <option value="restock">Restock</option>
                    <option value="sale">Sale</option>
                    <option value="damage">Damage/Loss</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    Quantity Change
                  </label>
                  <input
                    type="number"
                    value={adjustmentData.quantity}
                    onChange={(e) => setAdjustmentData({ ...adjustmentData, quantity: e.target.value })}
                    className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500"
                    placeholder="Enter positive or negative number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    Reason
                  </label>
                  <input
                    type="text"
                    value={adjustmentData.reason}
                    onChange={(e) => setAdjustmentData({ ...adjustmentData, reason: e.target.value })}
                    className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500"
                    placeholder="Enter reason for adjustment"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setAdjustmentModal(false)}
                  className="px-4 py-2 border border-earth-300 text-earth-700 rounded-xl hover:bg-earth-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStockAdjustment}
                  className="px-4 py-2 bg-forest-600 hover:bg-forest-700 text-white rounded-xl transition-colors"
                >
                  Apply Adjustment
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InventoryManagement;