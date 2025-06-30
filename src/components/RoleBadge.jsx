import React from 'react';
import { useRole } from '../contexts/RoleContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiShield, FiUser, FiCrown } = FiIcons;

function RoleBadge({ role, size = 'default', showIcon = true, className = "" }) {
  const { getRoleInfo } = useRole();
  const roleInfo = getRoleInfo(role);

  const sizes = {
    small: 'text-xs px-2 py-1',
    default: 'text-sm px-3 py-1',
    large: 'text-base px-4 py-2'
  };

  const getIcon = (role) => {
    switch (role) {
      case 'admin':
        return FiCrown;
      case 'manager':
        return FiShield;
      case 'buyer':
        return FiUser;
      default:
        return FiUser;
    }
  };

  return (
    <span className={`inline-flex items-center space-x-1 rounded-full font-medium border ${roleInfo.color} ${sizes[size]} ${className}`}>
      {showIcon && (
        <SafeIcon icon={getIcon(role)} className="text-current" />
      )}
      <span>{roleInfo.name}</span>
    </span>
  );
}

export default RoleBadge;