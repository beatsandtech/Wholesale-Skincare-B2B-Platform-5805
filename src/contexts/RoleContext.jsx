import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const RoleContext = createContext();

export function useRole() {
  return useContext(RoleContext);
}

// Define comprehensive role permissions
const PERMISSIONS = {
  // Product permissions
  'products.view': ['admin', 'buyer', 'manager'],
  'products.create': ['admin', 'manager'],
  'products.edit': ['admin', 'manager'],
  'products.delete': ['admin'],
  'products.bulk_import': ['admin', 'manager'],
  
  // Order permissions
  'orders.view_own': ['admin', 'buyer', 'manager'],
  'orders.view_all': ['admin', 'manager'],
  'orders.create': ['admin', 'buyer', 'manager'],
  'orders.edit': ['admin', 'manager'],
  'orders.cancel': ['admin', 'buyer', 'manager'],
  'orders.fulfill': ['admin', 'manager'],
  
  // User permissions
  'users.view': ['admin', 'manager'],
  'users.create': ['admin'],
  'users.edit': ['admin'],
  'users.delete': ['admin'],
  'users.manage_tiers': ['admin'],
  
  // Category permissions
  'categories.view': ['admin', 'buyer', 'manager'],
  'categories.create': ['admin', 'manager'],
  'categories.edit': ['admin', 'manager'],
  'categories.delete': ['admin'],
  
  // Reports permissions
  'reports.view_basic': ['admin', 'manager'],
  'reports.view_advanced': ['admin'],
  'reports.export': ['admin', 'manager'],
  
  // Settings permissions
  'settings.view': ['admin'],
  'settings.edit': ['admin'],
  'settings.payment': ['admin'],
  'settings.branding': ['admin'],
  
  // Pricing permissions
  'pricing.view': ['admin', 'manager'],
  'pricing.edit': ['admin'],
  'pricing.tiers': ['admin'],
  
  // Cart and checkout permissions
  'cart.manage': ['buyer', 'manager'],
  'checkout.process': ['buyer', 'manager'],
  
  // Payment permissions
  'payments.view_own': ['buyer', 'manager'],
  'payments.view_all': ['admin', 'manager'],
  'payments.process': ['admin', 'buyer', 'manager'],
  
  // Dashboard permissions
  'dashboard.view_buyer': ['buyer'],
  'dashboard.view_admin': ['admin', 'manager'],
  'dashboard.analytics': ['admin', 'manager']
};

// Define role hierarchies and descriptions
const ROLES = {
  admin: {
    name: 'Administrator',
    description: 'Full system access with all permissions',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    priority: 1
  },
  manager: {
    name: 'Manager',
    description: 'Product and order management with reporting access',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    priority: 2
  },
  buyer: {
    name: 'Buyer',
    description: 'Customer access for browsing and ordering products',
    color: 'bg-green-100 text-green-800 border-green-200',
    priority: 3
  }
};

export function RoleProvider({ children }) {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setUserRole(user.role || 'buyer');
    } else {
      setUserRole(null);
    }
    setRoleLoading(false);
  }, [user]);

  // Check if user has specific permission
  const hasPermission = (permission) => {
    if (!userRole) return false;
    const allowedRoles = PERMISSIONS[permission];
    return allowedRoles ? allowedRoles.includes(userRole) : false;
  };

  // Check if user has any of the specified permissions
  const hasAnyPermission = (permissions) => {
    return permissions.some(permission => hasPermission(permission));
  };

  // Check if user has all specified permissions
  const hasAllPermissions = (permissions) => {
    return permissions.every(permission => hasPermission(permission));
  };

  // Get user's role information
  const getRoleInfo = (role = userRole) => {
    return ROLES[role] || {
      name: 'Unknown',
      description: 'Unknown role',
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      priority: 999
    };
  };

  // Check if user can access a specific route
  const canAccessRoute = (route) => {
    const routePermissions = {
      '/dashboard': ['dashboard.view_buyer', 'dashboard.view_admin'],
      '/products': ['products.view'],
      '/orders': ['orders.view_own', 'orders.view_all'],
      '/cart': ['cart.manage'],
      '/checkout': ['checkout.process'],
      '/payments': ['payments.view_own', 'payments.view_all'],
      '/admin': ['dashboard.view_admin'],
      '/admin/products': ['products.create', 'products.edit'],
      '/admin/categories': ['categories.create', 'categories.edit'],
      '/admin/bulk-import': ['products.bulk_import'],
      '/admin/pricing': ['pricing.edit'],
      '/admin/users': ['users.view'],
      '/admin/reports': ['reports.view_basic'],
      '/system-settings': ['settings.view']
    };

    const requiredPermissions = routePermissions[route];
    if (!requiredPermissions) return true; // Allow access if no specific permissions required
    
    return hasAnyPermission(requiredPermissions);
  };

  // Get filtered navigation items based on permissions
  const getNavigationItems = () => {
    const allItems = [
      {
        path: '/dashboard',
        icon: 'FiHome',
        label: 'Dashboard',
        permissions: ['dashboard.view_buyer', 'dashboard.view_admin']
      },
      {
        path: '/products',
        icon: 'FiPackage',
        label: 'Products',
        permissions: ['products.view']
      },
      {
        path: '/orders',
        icon: 'FiShoppingCart',
        label: hasPermission('orders.view_all') ? 'Orders' : 'My Orders',
        permissions: ['orders.view_own', 'orders.view_all']
      },
      {
        path: '/cart',
        icon: 'FiShoppingCart',
        label: 'Cart',
        permissions: ['cart.manage'],
        badge: true
      },
      {
        path: '/payments',
        icon: 'FiCreditCard',
        label: 'Payments',
        permissions: ['payments.view_own', 'payments.view_all']
      },
      {
        path: '/admin',
        icon: 'FiSettings',
        label: 'Admin Panel',
        permissions: ['dashboard.view_admin']
      },
      {
        path: '/admin/products',
        icon: 'FiPackage',
        label: 'Manage Products',
        permissions: ['products.create', 'products.edit']
      },
      {
        path: '/admin/categories',
        icon: 'FiTag',
        label: 'Categories',
        permissions: ['categories.create', 'categories.edit']
      },
      {
        path: '/admin/bulk-import',
        icon: 'FiUpload',
        label: 'Bulk Import',
        permissions: ['products.bulk_import']
      },
      {
        path: '/admin/pricing',
        icon: 'FiDollarSign',
        label: 'Pricing Tiers',
        permissions: ['pricing.edit']
      },
      {
        path: '/admin/users',
        icon: 'FiUsers',
        label: 'Users',
        permissions: ['users.view']
      },
      {
        path: '/admin/reports',
        icon: 'FiBarChart3',
        label: 'Reports',
        permissions: ['reports.view_basic']
      },
      {
        path: '/system-settings',
        icon: 'FiTool',
        label: 'System Settings',
        permissions: ['settings.view']
      }
    ];

    return allItems.filter(item => hasAnyPermission(item.permissions));
  };

  // Get available roles for user management (only roles with lower priority)
  const getAvailableRoles = () => {
    const currentRoleInfo = getRoleInfo();
    return Object.entries(ROLES)
      .filter(([role, info]) => info.priority >= currentRoleInfo.priority)
      .map(([role, info]) => ({ role, ...info }));
  };

  // Check if user can manage another user based on role hierarchy
  const canManageUser = (targetUserRole) => {
    if (!hasPermission('users.edit')) return false;
    
    const currentRoleInfo = getRoleInfo();
    const targetRoleInfo = getRoleInfo(targetUserRole);
    
    return currentRoleInfo.priority <= targetRoleInfo.priority;
  };

  const value = {
    userRole,
    roleLoading,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getRoleInfo,
    canAccessRoute,
    getNavigationItems,
    getAvailableRoles,
    canManageUser,
    PERMISSIONS,
    ROLES
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
}