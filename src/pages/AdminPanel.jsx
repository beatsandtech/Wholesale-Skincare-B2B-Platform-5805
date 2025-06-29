import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiPackage, FiUsers, FiDollarSign, FiUpload, FiSettings, FiBarChart3, 
  FiTrendingUp, FiTag, FiTool
} = FiIcons;

function AdminPanel() {
  const adminActions = [
    {
      title: 'Product Management',
      description: 'Add, edit, and manage your product catalog',
      icon: FiPackage,
      color: 'text-forest-600',
      bgColor: 'bg-forest-100',
      link: '/admin/products'
    },
    {
      title: 'Category Management',
      description: 'Organize products into categories',
      icon: FiTag,
      color: 'text-sage-600',
      bgColor: 'bg-sage-100',
      link: '/admin/categories'
    },
    {
      title: 'Bulk Import',
      description: 'Import products from CSV files',
      icon: FiUpload,
      color: 'text-earth-600',
      bgColor: 'bg-earth-100',
      link: '/admin/bulk-import'
    },
    {
      title: 'Pricing Tiers',
      description: 'Configure wholesale pricing tiers',
      icon: FiDollarSign,
      color: 'text-terracotta-600',
      bgColor: 'bg-terracotta-100',
      link: '/admin/pricing'
    },
    {
      title: 'User Management',
      description: 'Manage buyer accounts and permissions',
      icon: FiUsers,
      color: 'text-sage-700',
      bgColor: 'bg-sage-100',
      link: '/admin/users'
    },
    {
      title: 'Reports & Analytics',
      description: 'View sales reports and analytics',
      icon: FiBarChart3,
      color: 'text-forest-700',
      bgColor: 'bg-forest-100',
      link: '/admin/reports'
    },
    {
      title: 'System Settings',
      description: 'Configure payment gateways and system preferences',
      icon: FiTool,
      color: 'text-earth-700',
      bgColor: 'bg-earth-100',
      link: '/system-settings'
    }
  ];

  const stats = [
    {
      title: 'Total Products',
      value: '127',
      change: '+12',
      icon: FiPackage,
      color: 'text-forest-600'
    },
    {
      title: 'Active Buyers',
      value: '34',
      change: '+3',
      icon: FiUsers,
      color: 'text-sage-600'
    },
    {
      title: 'Monthly Revenue',
      value: '$45,230',
      change: '+18%',
      icon: FiDollarSign,
      color: 'text-terracotta-600'
    },
    {
      title: 'Orders This Month',
      value: '89',
      change: '+25%',
      icon: FiTrendingUp,
      color: 'text-earth-600'
    }
  ];

  return (
    <div className="min-h-screen bg-natural-gradient bg-pattern-leaves">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-serif font-bold text-earth-900">Admin Panel</h1>
          <p className="text-earth-600 mt-2">
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
              className={`bg-gradient-to-br ${stat.bgColor} backdrop-blur-sm rounded-2xl shadow-lg border ${stat.borderColor} p-6 hover:shadow-xl transition-all duration-300 card-hover`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-earth-700">{stat.title}</p>
                  <p className="text-2xl font-bold text-earth-800 mt-1">{stat.value}</p>
                  <p className="text-sm text-forest-600 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-sm`}>
                  <SafeIcon icon={stat.icon} className={`text-2xl ${stat.color}`} />
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
                className="block bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6 hover:shadow-xl hover:border-forest-300 transition-all group card-hover"
              >
                <div className="flex items-center mb-4">
                  <div className={`${action.bgColor} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                    <SafeIcon icon={action.icon} className={`text-xl ${action.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-earth-900 ml-4 group-hover:text-forest-600 transition-colors">
                    {action.title}
                  </h3>
                </div>
                <p className="text-earth-600 group-hover:text-earth-700 transition-colors">
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
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6 mt-8"
        >
          <h2 className="text-xl font-semibold text-earth-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              {
                action: 'New product added',
                item: 'Vitamin E Night Cream',
                time: '2 hours ago'
              },
              {
                action: 'Order placed',
                item: 'ORD-2024-045 by Premium Beauty Retailers',
                time: '4 hours ago'
              },
              {
                action: 'Pricing updated',
                item: 'Gold tier pricing for Serums category',
                time: '1 day ago'
              },
              {
                action: 'New buyer registered',
                item: 'Natural Beauty Co.',
                time: '2 days ago'
              }
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-cream-50 to-sage-50 rounded-xl border border-sage-200"
              >
                <div>
                  <p className="font-medium text-earth-900">{activity.action}</p>
                  <p className="text-sm text-earth-600">{activity.item}</p>
                </div>
                <span className="text-sm text-earth-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminPanel;