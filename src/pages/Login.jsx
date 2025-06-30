import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import CompanyLogo from '../components/CompanyLogo';
import * as FiIcons from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const { FiPackage, FiMail, FiLock, FiEye, FiEyeOff, FiShield, FiCrown, FiUser } = FiIcons;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const demoAccounts = [
    {
      email: 'admin@skincare.com',
      role: 'Administrator',
      description: 'Full system access with all permissions',
      icon: FiCrown,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      email: 'manager@skincare.com',
      role: 'Manager',
      description: 'Product and order management access',
      icon: FiShield,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      email: 'buyer@retailer.com',
      role: 'Buyer',
      description: 'Customer access for browsing and ordering',
      icon: FiUser,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    }
  ];

  const quickLogin = (accountEmail) => {
    setEmail(accountEmail);
    setPassword('password123');
  };

  return (
    <div className="min-h-screen bg-natural-gradient flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Natural background pattern */}
      <div className="absolute inset-0 bg-pattern-leaves"></div>
      
      {/* Floating natural elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-forest-100 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-earth-100 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-sage-100 rounded-full opacity-15 blur-lg"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 relative z-10"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <CompanyLogo size="large" showTagline={true} linkTo={null} />
          </motion.div>
        </div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 space-y-6 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-earth-200"
          onSubmit={handleSubmit}
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-terracotta-50 to-terracotta-100 border border-terracotta-200 text-terracotta-800 px-4 py-3 rounded-xl"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-earth-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <SafeIcon icon={FiMail} className="absolute left-4 top-4 text-earth-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full pl-12 pr-3 py-3 border border-earth-200 placeholder-earth-400 text-earth-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-forest-500 focus:bg-forest-50/50 transition-all duration-200 bg-cream-50/50"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-earth-700 mb-2">
                Password
              </label>
              <div className="relative">
                <SafeIcon icon={FiLock} className="absolute left-4 top-4 text-earth-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full pl-12 pr-12 py-3 border border-earth-200 placeholder-earth-400 text-earth-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-forest-500 focus:bg-forest-50/50 transition-all duration-200 bg-cream-50/50"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-earth-400 hover:text-earth-600 transition-colors"
                >
                  <SafeIcon icon={showPassword ? FiEyeOff : FiEye} />
                </button>
              </div>
            </div>
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-forest-500 to-forest-600 hover:from-forest-600 hover:to-forest-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
            >
              {loading ? (
                <span className="flex items-center">
                  <div className="spinner mr-2"></div>
                  Signing in...
                </span>
              ) : (
                'Sign in to your account'
              )}
            </motion.button>
          </div>

          <div className="mt-6 p-6 bg-gradient-to-br from-sage-50 to-earth-50 rounded-xl border border-sage-200">
            <h3 className="text-sm font-medium text-earth-700 mb-4 flex items-center">
              <SafeIcon icon={FiPackage} className="mr-2 text-forest-600" />
              Demo Accounts - Role-Based Access
            </h3>
            <div className="space-y-3">
              {demoAccounts.map((account, index) => (
                <motion.div
                  key={account.email}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className={`p-3 ${account.bgColor} ${account.borderColor} border rounded-lg cursor-pointer hover:shadow-md transition-all duration-200`}
                  onClick={() => quickLogin(account.email)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${account.bgColor} rounded-full flex items-center justify-center border ${account.borderColor}`}>
                        <SafeIcon icon={account.icon} className={`${account.color} text-sm`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-earth-800">{account.role}</p>
                        <p className="text-xs text-earth-600">{account.email}</p>
                      </div>
                    </div>
                    <code className="text-earth-500 bg-earth-100 px-2 py-1 rounded text-xs">
                      password123
                    </code>
                  </div>
                  <p className="text-xs text-earth-600 mt-2 ml-11">{account.description}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-white/60 rounded-lg border border-earth-200">
              <p className="text-xs text-earth-600">
                <strong>Note:</strong> Each role has different permissions and will show different navigation options and features. 
                Try logging in with different roles to see the role-based access control in action.
              </p>
            </div>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
}

export default Login;