import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useSettings } from '../contexts/SettingsContext';

const { FiLeaf } = FiIcons;

function CompanyLogo({ size = 'default', showTagline = true, linkTo = '/dashboard' }) {
  const { getBrandingSettings } = useSettings();
  const branding = getBrandingSettings();

  const sizes = {
    small: {
      container: 'w-8 h-8',
      icon: 'text-lg',
      title: 'text-lg',
      tagline: 'text-xs'
    },
    default: {
      container: 'w-10 h-10',
      icon: 'text-xl',
      title: 'text-xl',
      tagline: 'text-xs'
    },
    large: {
      container: 'w-16 h-16',
      icon: 'text-2xl',
      title: 'text-4xl',
      tagline: 'text-lg'
    }
  };

  const sizeConfig = sizes[size] || sizes.default;

  const LogoContent = () => (
    <div className="flex items-center space-x-3 group">
      {branding.logoUrl ? (
        <img
          src={branding.logoUrl}
          alt={`${branding.companyName} Logo`}
          className={`${sizeConfig.container} object-contain rounded-xl`}
        />
      ) : (
        <motion.div
          whileHover={{ rotate: 5, scale: 1.05 }}
          className={`${sizeConfig.container} bg-gradient-to-br from-forest-500 to-forest-600 rounded-xl flex items-center justify-center shadow-md`}
        >
          <SafeIcon icon={FiLeaf} className={`text-cream-50 ${sizeConfig.icon}`} />
        </motion.div>
      )}
      <div className="flex flex-col">
        <span className={`${sizeConfig.title} font-serif font-bold text-earth-800 group-hover:text-forest-700 transition-colors`}>
          {branding.companyName}
        </span>
        {showTagline && (
          <span className={`${sizeConfig.tagline} text-earth-500 bg-gradient-to-r from-sage-100 to-earth-100 px-2 py-0.5 rounded-full border border-sage-200`}>
            {branding.companyTagline}
          </span>
        )}
      </div>
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo}>
        <LogoContent />
      </Link>
    );
  }

  return <LogoContent />;
}

export default CompanyLogo;