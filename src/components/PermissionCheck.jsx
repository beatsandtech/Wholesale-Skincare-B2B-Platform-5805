import React from 'react';
import { useRole } from '../contexts/RoleContext';

function PermissionCheck({ 
  permissions = [], 
  requireAll = false, 
  children, 
  fallback = null 
}) {
  const { hasAnyPermission, hasAllPermissions } = useRole();

  const hasAccess = () => {
    if (permissions.length === 0) return true;
    
    if (requireAll) {
      return hasAllPermissions(permissions);
    } else {
      return hasAnyPermission(permissions);
    }
  };

  if (!hasAccess()) {
    return fallback;
  }

  return children;
}

export default PermissionCheck;