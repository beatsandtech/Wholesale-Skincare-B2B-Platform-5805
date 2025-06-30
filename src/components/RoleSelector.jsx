import React from 'react';
import { useRole } from '../contexts/RoleContext';
import RoleBadge from './RoleBadge';

function RoleSelector({ 
  value, 
  onChange, 
  disabled = false, 
  className = "",
  includeDescription = false 
}) {
  const { getAvailableRoles } = useRole();
  const availableRoles = getAvailableRoles();

  return (
    <div className={className}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white disabled:bg-earth-50 disabled:text-earth-500"
      >
        {availableRoles.map(({ role, name, description }) => (
          <option key={role} value={role}>
            {name} {includeDescription && `- ${description}`}
          </option>
        ))}
      </select>
      
      {includeDescription && value && (
        <div className="mt-2 p-3 bg-gradient-to-r from-sage-50 to-earth-50 rounded-lg border border-sage-200">
          <RoleBadge role={value} className="mb-2" />
          <p className="text-sm text-earth-600">
            {availableRoles.find(r => r.role === value)?.description}
          </p>
        </div>
      )}
    </div>
  );
}

export default RoleSelector;