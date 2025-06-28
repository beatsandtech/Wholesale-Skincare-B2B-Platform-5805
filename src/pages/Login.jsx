import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const { FiPackage, FiMail, FiLock, FiEye, FiEyeOff, FiLeaf } = FiIcons;

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
            className="mx-auto h-20 w-20 bg-gradient-to-br from-forest-500 to-forest-600 rounded-2xl flex items-center justify-center shadow-lg"
          >
            <SafeIcon icon={FiLeaf} className="text-cream-50 text-3xl" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-4xl font-serif font-bold text-earth-800"
          >
            Natural Skincare
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-2 text-sm text-earth-600 font-medium"
          >
            Wholesale Portal - Welcome Back
          </motion.p>
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
            <h3 className="text-sm font-medium text-earth-700 mb-3 flex items-center">
              <SafeIcon icon={FiPackage} className="mr-2 text-forest-600" />
              Demo Accounts
            </h3>
            <div className="space-y-2 text-xs text-earth-600">
              <div className="flex justify-between items-center p-2 bg-white/60 rounded-lg">
                <span><strong className="text-forest-700">Admin:</strong> admin@skincare.com</span>
                <code className="text-earth-500 bg-earth-100 px-2 py-1 rounded text-xs">password123</code>
              </div>
              <div className="flex justify-between items-center p-2 bg-white/60 rounded-lg">
                <span><strong className="text-forest-700">Buyer:</strong> buyer@retailer.com</span>
                <code className="text-earth-500 bg-earth-100 px-2 py-1 rounded text-xs">password123</code>
              </div>
            </div>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
}

export default Login;