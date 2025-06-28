import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const { FiPackage, FiShoppingCart, FiTrendingUp, FiUsers, FiDollarSign, FiClock, FiLeaf, FiStar } = FiIcons;

function Dashboard() {
  const { user } = useAuth();
  const { getCartItemCount, getCartTotal } = useCart();

  const buyerStats = [
    {
      title: 'Cart Items',
      value: getCartItemCount(),
      icon: FiShoppingCart,
      color: 'text-forest-600',
      bgColor: 'from-forest-100 to-forest-200',
      borderColor: 'border-forest-300'
    },
    {
      title: 'Cart Total',
      value: `$${getCartTotal().toFixed(2)}`,
      icon: FiDollarSign,
      color: 'text-sage-700',
      bgColor: 'from-sage-100 to-sage-200',
      borderColor: 'border-sage-300'
    },
    {
      title: 'Orders This Month',
      value: '8',
      icon: FiTrendingUp,
      color: 'text-earth-700',
      bgColor: 'from-earth-100 to-earth-200',
      borderColor: 'border-earth-300'
    },
    {
      title: 'Pending Orders',
      value: '2',
      icon: FiClock,
      color: 'text-terracotta-700',
      bgColor: 'from-terracotta-100 to-terracotta-200',
      borderColor: 'border-terracotta-300'
    }
  ];

  const adminStats = [
    {
      title: 'Total Products',
      value: '127',
      icon: FiPackage,
      color: 'text-forest-600',
      bgColor: 'from-forest-100 to-forest-200',
      borderColor: 'border-forest-300'
    },
    {
      title: 'Active Buyers',
      value: '34',
      icon: FiUsers,
      color: 'text-sage-700',
      bgColor: 'from-sage-100 to-sage-200',
      borderColor: 'border-sage-300'
    },
    {
      title: 'Monthly Revenue',
      value: '$45,230',
      icon: FiDollarSign,
      color: 'text-earth-700',
      bgColor: 'from-earth-100 to-earth-200',
      borderColor: 'border-earth-300'
    },
    {
      title: 'Pending Orders',
      value: '12',
      icon: FiClock,
      color: 'text-terracotta-700',
      bgColor: 'from-terracotta-100 to-terracotta-200',
      borderColor: 'border-terracotta-300'
    }
  ];

  const stats = user?.role === 'admin' ? adminStats : buyerStats;

  const recentOrders = [
    { id: 'ORD-001', date: '2024-01-15', items: 12, total: 245.50, status: 'Processing' },
    { id: 'ORD-002', date: '2024-01-10', items: 8, total: 180.25, status: 'Shipped' },
    { id: 'ORD-003', date: '2024-01-05', items: 15, total: 320.75, status: 'Delivered' }
  ];

  return (
    <div className="min-h-screen bg-natural-gradient bg-pattern-leaves">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-forest-500 to-forest-600 rounded-2xl flex items-center justify-center shadow-lg">
              <SafeIcon icon={FiLeaf} className="text-cream-50 text-2xl" />
            </div>
            <div>
              <h1 className="text-4xl font-serif font-bold text-earth-800">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-earth-600 mt-2 text-lg">
                {user?.role === 'admin' 
                  ? 'Manage your wholesale operations from this natural dashboard.' 
                  : `Here's your wholesale ordering dashboard for ${user?.company}.`
                }
              </p>
            </div>
          </div>
        </motion.div>

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
                  <p className="text-3xl font-bold text-earth-800 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <SafeIcon icon={FiTrendingUp} className="text-forest-500 text-sm mr-1" />
                    <span className="text-sm text-forest-600 font-medium">+5.2% this month</span>
                  </div>
                </div>
                <div className={`bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-sm`}>
                  <SafeIcon icon={stat.icon} className={`text-2xl ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-sage-500 to-sage-600 rounded-xl flex items-center justify-center">
                <SafeIcon icon={FiPackage} className="text-white text-lg" />
              </div>
              <h2 className="text-xl font-semibold text-earth-800">Recent Orders</h2>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-cream-50 to-sage-50 rounded-xl border border-sage-200 hover:shadow-md transition-all duration-200"
                >
                  <div>
                    <p className="font-medium text-earth-800">{order.id}</p>
                    <p className="text-sm text-earth-600">{order.items} items • {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-earth-800">${order.total}</p>
                    <span className={`inline-block px-3 py-1 text-xs rounded-full font-medium status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-forest-500 to-forest-600 rounded-xl flex items-center justify-center">
                <SafeIcon icon={FiStar} className="text-white text-lg" />
              </div>
              <h2 className="text-xl font-semibold text-earth-800">Quick Actions</h2>
            </div>
            <div className="space-y-3">
              {user?.role === 'admin' ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left p-4 bg-gradient-to-r from-forest-50 to-sage-50 hover:from-forest-100 hover:to-sage-100 rounded-xl transition-all duration-200 border border-forest-200 hover:border-forest-300"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-forest-500 to-forest-600 rounded-lg flex items-center justify-center">
                        <SafeIcon icon={FiPackage} className="text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-earth-800">Add New Product</p>
                        <p className="text-sm text-earth-600">Create a new natural product listing</p>
                      </div>
                    </div>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left p-4 bg-gradient-to-r from-earth-50 to-terracotta-50 hover:from-earth-100 hover:to-terracotta-100 rounded-xl transition-all duration-200 border border-earth-200 hover:border-earth-300"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-earth-500 to-earth-600 rounded-lg flex items-center justify-center">
                        <SafeIcon icon={FiUsers} className="text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-earth-800">Manage Buyers</p>
                        <p className="text-sm text-earth-600">View and manage buyer accounts</p>
                      </div>
                    </div>
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left p-4 bg-gradient-to-r from-forest-50 to-sage-50 hover:from-forest-100 hover:to-sage-100 rounded-xl transition-all duration-200 border border-forest-200 hover:border-forest-300"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-forest-500 to-forest-600 rounded-lg flex items-center justify-center">
                        <SafeIcon icon={FiPackage} className="text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-earth-800">Browse Products</p>
                        <p className="text-sm text-earth-600">Explore our natural skincare catalog</p>
                      </div>
                    </div>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left p-4 bg-gradient-to-r from-earth-50 to-terracotta-50 hover:from-earth-100 hover:to-terracotta-100 rounded-xl transition-all duration-200 border border-earth-200 hover:border-earth-300"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-earth-500 to-earth-600 rounded-lg flex items-center justify-center">
                        <SafeIcon icon={FiShoppingCart} className="text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-earth-800">View Cart</p>
                        <p className="text-sm text-earth-600">Review items in your cart</p>
                      </div>
                    </div>
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;