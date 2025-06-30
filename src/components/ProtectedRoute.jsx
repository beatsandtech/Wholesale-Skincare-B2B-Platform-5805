import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useRole } from '../contexts/RoleContext';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiLock, FiArrowLeft } = FiIcons;

function ProtectedRoute({ 
  children, 
  permissions = [], 
  requireAll = false,
  redirectTo = '/dashboard' 
}) {
  const { user, loading } = useAuth();
  const { canAccessRoute, hasAnyPermission, hasAllPermissions, roleLoading, getRoleInfo } = useRole();

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen bg-natural-gradient flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check permissions if specified
  if (permissions.length > 0) {
    const hasAccess = requireAll 
      ? hasAllPermissions(permissions) 
      : hasAnyPermission(permissions);

    if (!hasAccess) {
      const roleInfo = getRoleInfo();
      
      return (
        <div className="min-h-screen bg-natural-gradient bg-pattern-leaves">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center min-h-screen">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-12"
            >
              <div className="w-20 h-20 bg-terracotta-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <SafeIcon icon={FiLock} className="text-terracotta-600 text-3xl" />
              </div>
              <h1 className="text-3xl font-serif font-bold text-earth-900 mb-4">
                Access Denied
              </h1>
              <p className="text-earth-600 mb-6 text-lg">
                Your current role ({roleInfo.name}) doesn't have permission to access this page.
              </p>
              <div className="bg-gradient-to-r from-sage-50 to-earth-50 rounded-xl p-6 border border-sage-200 mb-8">
                <h3 className="font-semibold text-earth-900 mb-2">Required Permissions:</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {permissions.map(permission => (
                    <span 
                      key={permission}
                      className="px-3 py-1 bg-earth-100 text-earth-700 rounded-full text-sm font-medium"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => window.history.back()}
                className="bg-forest-600 hover:bg-forest-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center space-x-2 mx-auto"
              >
                <SafeIcon icon={FiArrowLeft} />
                <span>Go Back</span>
              </button>
            </motion.div>
          </div>
        </div>
      );
    }
  }

  return children;
}

export default ProtectedRoute;