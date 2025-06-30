import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import CompanyLogo from './CompanyLogo';
import RoleBadge from './RoleBadge';
import * as FiIcons from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useRole } from '../contexts/RoleContext';

const { FiHome, FiPackage, FiShoppingCart, FiUser, FiSettings, FiLogOut, FiUpload, FiDollarSign, FiTag, FiCreditCard, FiBarChart3, FiUsers, FiTool } = FiIcons;

function Navigation() {
  const { user, logout } = useAuth();
  const { getCartItemCount, getCartTotal } = useCart();
  const { getNavigationItems, hasPermission } = useRole();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = getNavigationItems();
  const cartItemCount = getCartItemCount();
  const cartTotal = getCartTotal();

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-earth-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <CompanyLogo size="default" showTagline={true} linkTo="/dashboard" />
          </div>

          {/* Main Navigation - Scrollable on smaller screens */}
          <div className="flex items-center overflow-x-auto scrollbar-hide space-x-1 flex-1 mx-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const iconMap = {
                FiHome,
                FiPackage,
                FiShoppingCart,
                FiSettings,
                FiUpload,
                FiDollarSign,
                FiTag,
                FiCreditCard,
                FiBarChart3,
                FiUsers,
                FiTool
              };
              const IconComponent = iconMap[item.icon] || FiPackage;

              // Special handling for cart icon
              if (item.path === '/cart') {
                return (
                  <Link key={item.path} to={item.path} className="relative flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap relative group ${
                        isActive
                          ? 'bg-gradient-to-r from-forest-100 to-sage-100 text-forest-700 border border-forest-200 shadow-sm'
                          : 'text-earth-600 hover:text-forest-700 hover:bg-gradient-to-r hover:from-sage-50 hover:to-earth-50 hover:border hover:border-sage-200'
                      }`}
                    >
                      <div className="relative">
                        <SafeIcon icon={IconComponent} className="text-lg" />
                        {cartItemCount > 0 && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            key={cartItemCount} // This will trigger animation on count change
                            className="absolute -top-2 -right-2 bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg border-2 border-white"
                          >
                            {cartItemCount > 99 ? '99+' : cartItemCount}
                          </motion.span>
                        )}
                      </div>
                      <span className="hidden lg:block">{item.label}</span>
                      
                      {/* Cart total display on hover */}
                      {cartTotal > 0 && (
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                          <div className="bg-earth-800 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap shadow-lg">
                            ${cartTotal.toFixed(2)}
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-earth-800"></div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </Link>
                );
              }

              return (
                <Link key={item.path} to={item.path} className="relative flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? 'bg-gradient-to-r from-forest-100 to-sage-100 text-forest-700 border border-forest-200 shadow-sm'
                        : 'text-earth-600 hover:text-forest-700 hover:bg-gradient-to-r hover:from-sage-50 hover:to-earth-50 hover:border hover:border-sage-200'
                    }`}
                  >
                    <SafeIcon icon={IconComponent} className="text-lg" />
                    <span className="hidden lg:block">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            {/* Cart Quick Access - Mobile */}
            <Link to="/cart" className="lg:hidden relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-earth-600 hover:text-forest-700 rounded-lg hover:bg-forest-50 transition-colors relative"
              >
                <SafeIcon icon={FiShoppingCart} className="text-xl" />
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    key={cartItemCount}
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg border-2 border-white"
                  >
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            <div className="text-sm text-earth-600 text-right">
              <div className="font-semibold text-earth-800">{user?.name}</div>
              <div className="text-xs text-earth-500">{user?.company}</div>
              <div className="mt-1">
                <RoleBadge role={user?.role} size="small" />
              </div>
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