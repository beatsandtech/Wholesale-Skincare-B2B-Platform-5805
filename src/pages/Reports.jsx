import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBarChart3, FiTrendingUp, FiDollarSign, FiUsers, FiPackage, FiDownload, FiCalendar, FiFilter } = FiIcons;

function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');

  const salesData = [
    { month: 'Jan', revenue: 15420, orders: 45, customers: 12 },
    { month: 'Feb', revenue: 18250, orders: 52, customers: 15 },
    { month: 'Mar', revenue: 22100, orders: 61, customers: 18 },
    { month: 'Apr', revenue: 19800, orders: 58, customers: 16 },
    { month: 'May', revenue: 25600, orders: 72, customers: 21 },
    { month: 'Jun', revenue: 28900, orders: 81, customers: 24 }
  ];

  const topProducts = [
    { name: 'Vitamin C Brightening Serum', sales: 245, revenue: 6125.00, growth: 15.2 },
    { name: 'Gentle Honey Cleanser', sales: 189, revenue: 2079.00, growth: 8.7 },
    { name: 'Hydrating Rose Moisturizer', sales: 167, revenue: 3173.00, growth: 12.4 },
    { name: 'Detox Clay Mask', sales: 134, revenue: 2144.00, growth: -2.1 },
    { name: 'Nourishing Argan Oil', sales: 98, revenue: 2989.00, growth: 18.9 }
  ];

  const topCustomers = [
    { name: 'Premium Beauty Retailers', orders: 23, spent: 12450.75, tier: 'gold' },
    { name: 'Natural Beauty Store', orders: 15, spent: 7890.50, tier: 'silver' },
    { name: 'Luxury Beauty Co.', orders: 45, spent: 28750.00, tier: 'platinum' },
    { name: 'Organic Beauty Shop', orders: 8, spent: 3250.25, tier: 'bronze' }
  ];

  const kpiData = [
    {
      title: 'Total Revenue',
      value: '$142,890',
      change: '+18.2%',
      icon: FiDollarSign,
      color: 'text-forest-600',
      bgColor: 'bg-forest-100'
    },
    {
      title: 'Total Orders',
      value: '369',
      change: '+12.7%',
      icon: FiPackage,
      color: 'text-sage-600',
      bgColor: 'bg-sage-100'
    },
    {
      title: 'Active Customers',
      value: '106',
      change: '+8.4%',
      icon: FiUsers,
      color: 'text-earth-600',
      bgColor: 'bg-earth-100'
    },
    {
      title: 'Avg Order Value',
      value: '$387.20',
      change: '+5.1%',
      icon: FiTrendingUp,
      color: 'text-terracotta-600',
      bgColor: 'bg-terracotta-100'
    }
  ];

  const categoryBreakdown = [
    { category: 'Serums', revenue: 45200, percentage: 31.6, orders: 156 },
    { category: 'Moisturizers', revenue: 38900, percentage: 27.2, orders: 134 },
    { category: 'Cleansers', revenue: 28400, percentage: 19.9, orders: 98 },
    { category: 'Masks', revenue: 20100, percentage: 14.1, orders: 76 },
    { category: 'Oils', revenue: 10290, percentage: 7.2, orders: 34 }
  ];

  const exportReport = (type) => {
    // Simulate export functionality
    console.log(`Exporting ${type} report...`);
    alert(`${type.toUpperCase()} report exported successfully!`);
  };

  return (
    <div className="min-h-screen bg-natural-gradient bg-pattern-leaves">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-serif font-bold text-earth-900">Reports & Analytics</h1>
              <p className="text-earth-600 mt-2">
                Track your business performance and insights
              </p>
            </div>
            <div className="flex space-x-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              <button
                onClick={() => exportReport('pdf')}
                className="bg-forest-600 hover:bg-forest-700 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiDownload} />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-earth-600">{kpi.title}</p>
                  <p className="text-2xl font-bold text-earth-900 mt-1">{kpi.value}</p>
                  <p className={`text-sm mt-1 ${kpi.change.startsWith('+') ? 'text-forest-600' : 'text-terracotta-600'}`}>
                    {kpi.change} from last {selectedPeriod}
                  </p>
                </div>
                <div className={`p-3 ${kpi.bgColor} rounded-xl`}>
                  <SafeIcon icon={kpi.icon} className={`text-xl ${kpi.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6"
          >
            <h2 className="text-xl font-semibold text-earth-900 mb-6">Revenue Trend</h2>
            <div className="space-y-4">
              {salesData.map((data, index) => (
                <div key={data.month} className="flex items-center justify-between">
                  <span className="text-earth-700 font-medium">{data.month}</span>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-earth-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-forest-500 to-sage-600 h-2 rounded-full"
                        style={{ width: `${(data.revenue / 30000) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-earth-900 font-bold w-20 text-right">
                      ${data.revenue.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Category Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6"
          >
            <h2 className="text-xl font-semibold text-earth-900 mb-6">Sales by Category</h2>
            <div className="space-y-4">
              {categoryBreakdown.map((category, index) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-earth-700 font-medium">{category.category}</span>
                    <div className="text-right">
                      <span className="text-earth-900 font-bold">${category.revenue.toLocaleString()}</span>
                      <span className="text-earth-600 text-sm ml-2">({category.percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-earth-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-forest-500 to-sage-600 h-2 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6"
          >
            <h2 className="text-xl font-semibold text-earth-900 mb-6">Top Products</h2>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-4 bg-gradient-to-r from-cream-50 to-sage-50 rounded-xl border border-sage-200">
                  <div className="flex-1">
                    <p className="font-medium text-earth-900">{product.name}</p>
                    <p className="text-sm text-earth-600">{product.sales} units sold</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-earth-900">${product.revenue.toLocaleString()}</p>
                    <p className={`text-sm ${product.growth > 0 ? 'text-forest-600' : 'text-terracotta-600'}`}>
                      {product.growth > 0 ? '+' : ''}{product.growth}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Customers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6"
          >
            <h2 className="text-xl font-semibold text-earth-900 mb-6">Top Customers</h2>
            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div key={customer.name} className="flex items-center justify-between p-4 bg-gradient-to-r from-cream-50 to-sage-50 rounded-xl border border-sage-200">
                  <div className="flex-1">
                    <p className="font-medium text-earth-900">{customer.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 text-xs rounded-full tier-${customer.tier}`}>
                        {customer.tier.charAt(0).toUpperCase() + customer.tier.slice(1)}
                      </span>
                      <span className="text-sm text-earth-600">{customer.orders} orders</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-earth-900">${customer.spent.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Export Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6 mt-8"
        >
          <h2 className="text-xl font-semibold text-earth-900 mb-6">Export Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => exportReport('sales')}
              className="flex items-center justify-center space-x-2 p-4 border border-earth-300 rounded-xl hover:bg-earth-50 transition-colors"
            >
              <SafeIcon icon={FiDownload} className="text-earth-600" />
              <span className="text-earth-700">Sales Report</span>
            </button>
            <button
              onClick={() => exportReport('customers')}
              className="flex items-center justify-center space-x-2 p-4 border border-earth-300 rounded-xl hover:bg-earth-50 transition-colors"
            >
              <SafeIcon icon={FiDownload} className="text-earth-600" />
              <span className="text-earth-700">Customer Report</span>
            </button>
            <button
              onClick={() => exportReport('inventory')}
              className="flex items-center justify-center space-x-2 p-4 border border-earth-300 rounded-xl hover:bg-earth-50 transition-colors"
            >
              <SafeIcon icon={FiDownload} className="text-earth-600" />
              <span className="text-earth-700">Inventory Report</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Reports;