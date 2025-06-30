import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';

const { FiShoppingCart, FiCheck, FiX } = FiIcons;

function CartNotification({ show, product, quantity, onClose }) {
  const { getCartTotal, getCartItemCount } = useCart();

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); // Increased to 4 seconds for better UX

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show || !product) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -100, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -100, x: '-50%' }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-forest-200 p-4 max-w-md w-full mx-4"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-forest-500 to-forest-600 rounded-xl flex items-center justify-center">
              <SafeIcon icon={FiCheck} className="text-white text-lg" />
            </div>
            
            <div className="flex-1">
              <h4 className="font-semibold text-earth-900">Added to Cart!</h4>
              <p className="text-sm text-earth-600">
                {quantity} {quantity === 1 ? 'unit' : 'units'} of {product.name}
              </p>
            </div>
            
            <button
              onClick={onClose}
              className="p-1 text-earth-400 hover:text-earth-600 transition-colors"
            >
              <SafeIcon icon={FiX} />
            </button>
          </div>
          
          <div className="mt-3 pt-3 border-t border-earth-200">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className="text-earth-600">
                  Cart Total: ${getCartTotal().toFixed(2)}
                </span>
                <span className="text-earth-600">
                  ({getCartItemCount()} items)
                </span>
              </div>
              
              <Link
                to="/cart"
                onClick={onClose}
                className="inline-flex items-center space-x-1 text-forest-600 hover:text-forest-700 font-medium transition-colors"
              >
                <SafeIcon icon={FiShoppingCart} className="text-sm" />
                <span>View Cart</span>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CartNotification;