import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPackage, FiUsers, FiDollarSign, FiUpload, FiSettings, FiBarChart3, FiTrendingUp } = FiIcons;

function AdminPanel() {
  const adminActions = [
    {
      title: 'Product Management',
      description: 'Add, edit, and manage your product catalog',
      icon: FiPackage,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      link: '/admin/products'
    },
    {
      title: 'Bulk Import',
      description: 'Import products from CSV files',
      icon: FiUpload,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      link: '/admin/bulk-import'
    },
    {
      title: 'Pricing Tiers',
      description: 'Configure wholesale pricing tiers',
      icon: FiDollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      link: '/admin/pricing'
    },
    {
      title: 'User Management',
      description: 'Manage buyer accounts and permissions',
      icon: FiUsers,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      link: '#'
    },
    {
      title: 'Reports & Analytics',
      description: 'View sales reports and analytics',
      icon: FiBarChart3,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      link: '#'
    },
    {
      title: 'System Settings',
      description: 'Configure system-wide settings',
      icon: FiSettings,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      link: '#'
    }
  ];

  const stats = [
    {
      title: 'Total Products',
      value: '127',
      change: '+12',
      icon: FiPackage,
      color: 'text-blue-600'
    },
    {
      title: 'Active Buyers',
      value: '34',
      change: '+3',
      icon: FiUsers,
      color: 'text-green-600'
    },
    {
      title: 'Monthly Revenue',
      value: '$45,230',
      change: '+18%',
      icon: FiDollarSign,
      color: 'text-purple-600'
    },
    {
      title: 'Orders This Month',
      value: '89',
      change: '+25%',
      icon: FiTrendingUp,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-gray-600 mt-2">
          Manage your wholesale operations and business settings
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <SafeIcon icon={stat.icon} className={`text-xl ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Admin Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminActions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={action.link}
              className="block bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-primary-300 transition-all group"
            >
              <div className="flex items-center mb-4">
                <div className={`${action.bgColor} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                  <SafeIcon icon={action.icon} className={`text-xl ${action.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 ml-4 group-hover:text-primary-600 transition-colors">
                  {action.title}
                </h3>
              </div>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                {action.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: 'New product added', item: 'Vitamin E Night Cream', time: '2 hours ago' },
            { action: 'Order placed', item: 'ORD-2024-045 by Premium Beauty Retailers', time: '4 hours ago' },
            { action: 'Pricing updated', item: 'Gold tier pricing for Serums category', time: '1 day ago' },
            { action: 'New buyer registered', item: 'Natural Beauty Co.', time: '2 days ago' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.item}</p>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default AdminPanel;