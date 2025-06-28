import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const { FiHome, FiPackage, FiShoppingCart, FiUser, FiSettings, FiLogOut, FiUpload, FiDollarSign, FiTag, FiLeaf } = FiIcons;

function Navigation() {
  const { user, logout } = useAuth();
  const { getCartItemCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const buyerNavItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/products', icon: FiPackage, label: 'Products' },
    { path: '/orders', icon: FiShoppingCart, label: 'My Orders' },
    { path: '/cart', icon: FiShoppingCart, label: 'Cart', badge: getCartItemCount() }
  ];

  const adminNavItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/products', icon: FiPackage, label: 'Products' },
    { path: '/orders', icon: FiShoppingCart, label: 'Orders' },
    { path: '/admin', icon: FiSettings, label: 'Admin Panel' },
    { path: '/admin/products', icon: FiPackage, label: 'Manage Products' },
    { path: '/admin/categories', icon: FiTag, label: 'Categories' },
    { path: '/admin/bulk-import', icon: FiUpload, label: 'Bulk Import' },
    { path: '/admin/pricing', icon: FiDollarSign, label: 'Pricing Tiers' }
  ];

  const navItems = user?.role === 'admin' ? adminNavItems : buyerNavItems;

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-earth-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="w-10 h-10 bg-gradient-to-br from-forest-500 to-forest-600 rounded-xl flex items-center justify-center shadow-md"
              >
                <SafeIcon icon={FiLeaf} className="text-cream-50 text-xl" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-serif font-bold text-earth-800 group-hover:text-forest-700 transition-colors">
                  Natural Skincare
                </span>
                <span className="text-xs text-earth-500 bg-gradient-to-r from-sage-100 to-earth-100 px-2 py-0.5 rounded-full border border-sage-200">
                  Wholesale Portal
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path} className="relative">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-forest-100 to-sage-100 text-forest-700 border border-forest-200 shadow-sm'
                        : 'text-earth-600 hover:text-forest-700 hover:bg-gradient-to-r hover:from-sage-50 hover:to-earth-50 hover:border hover:border-sage-200'
                    }`}
                  >
                    <SafeIcon icon={item.icon} className="text-lg" />
                    <span className="hidden sm:block">{item.label}</span>
                    {item.badge > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-sm"
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-earth-600 text-right">
              <div className="font-semibold text-earth-800">{user?.name}</div>
              <div className="text-xs text-earth-500">{user?.company}</div>
              {user?.tier && (
                <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full mt-1 tier-${user.tier}`}>
                  {user.tier.charAt(0).toUpperCase() + user.tier.slice(1)} Tier
                </span>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 text-earth-600 hover:text-terracotta-600 transition-colors rounded-lg hover:bg-terracotta-50"
            >
              <SafeIcon icon={FiLogOut} />
              <span className="hidden sm:block">Logout</span>
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;