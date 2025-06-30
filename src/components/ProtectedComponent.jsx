import React from 'react';
import { useRole } from '../contexts/RoleContext';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiLock, FiAlertTriangle } = FiIcons;

function ProtectedComponent({ 
  children, 
  permissions = [], 
  requireAll = false, 
  fallback = null,
  showMessage = true,
  className = ""
}) {
  const { hasPermission, hasAnyPermission, hasAllPermissions, userRole, getRoleInfo } = useRole();

  // Check permissions based on requirements
  const hasAccess = () => {
    if (permissions.length === 0) return true;
    
    if (requireAll) {
      return hasAllPermissions(permissions);
    } else {
      return hasAnyPermission(permissions);
    }
  };

  if (!hasAccess()) {
    if (fallback) {
      return fallback;
    }

    if (!showMessage) {
      return null;
    }

    const roleInfo = getRoleInfo();

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-to-r from-terracotta-50 to-earth-50 border border-terracotta-200 rounded-xl p-6 text-center ${className}`}
      >
        <div className="w-16 h-16 bg-terracotta-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <SafeIcon icon={FiLock} className="text-terracotta-600 text-2xl" />
        </div>
        <h3 className="text-lg font-semibold text-earth-900 mb-2">
          Access Restricted
        </h3>
        <p className="text-earth-600 mb-4">
          Your current role ({roleInfo.name}) doesn't have permission to access this feature.
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-earth-500">
          <SafeIcon icon={FiAlertTriangle} />
          <span>Required permissions: {permissions.join(', ')}</span>
        </div>
      </motion.div>
    );
  }

  return <div className={className}>{children}</div>;
}

export default ProtectedComponent;