import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';

const { FiShoppingCart, FiPlus, FiMinus, FiTrash2, FiCreditCard } = FiIcons;

function Cart() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();

  const handleQuantityChange = (productId, tier, newQuantity) => {
    updateQuantity(productId, tier, newQuantity);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-natural-gradient bg-pattern-leaves">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-12"
          >
            <SafeIcon icon={FiShoppingCart} className="text-earth-400 text-4xl mb-4 mx-auto" />
            <h2 className="text-xl font-semibold text-earth-900 mb-2">Your cart is empty</h2>
            <p className="text-earth-600 mb-6">
              Add some products to get started with your wholesale order.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="bg-forest-600 hover:bg-forest-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Browse Products
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-natural-gradient bg-pattern-leaves">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-serif font-bold text-earth-900">Shopping Cart</h1>
          <p className="text-earth-600 mt-2">
            Review your wholesale order before checkout
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={`${item.id}-${item.selectedTier}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-earth-900">{item.name}</h3>
                    <p className="text-earth-600 text-sm">{item.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded tier-${item.selectedTier}`}>
                        {item.selectedTier.charAt(0).toUpperCase() + item.selectedTier.slice(1)} Tier
                      </span>
                      <span className="text-lg font-bold text-earth-900">
                        ${item.unitPrice.toFixed(2)} each
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.selectedTier, item.quantity - 1)}
                      className="p-1 rounded-lg border border-earth-300 hover:bg-earth-50 transition-colors"
                    >
                      <SafeIcon icon={FiMinus} className="text-earth-600" />
                    </button>
                    <span className="w-12 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.selectedTier, item.quantity + 1)}
                      className="p-1 rounded-lg border border-earth-300 hover:bg-earth-50 transition-colors"
                    >
                      <SafeIcon icon={FiPlus} className="text-earth-600" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-earth-900">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id, item.selectedTier)}
                      className="text-terracotta-600 hover:text-terracotta-700 mt-2 transition-colors"
                    >
                      <SafeIcon icon={FiTrash2} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6 sticky top-8"
            >
              <h2 className="text-xl font-semibold text-earth-900 mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-earth-600">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-earth-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-earth-200 pt-4">
                  <div className="flex justify-between text-lg font-bold text-earth-900">
                    <span>Total</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-forest-500 to-forest-600 hover:from-forest-600 hover:to-forest-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                >
                  <SafeIcon icon={FiCreditCard} />
                  <span>Proceed to Checkout</span>
                </motion.button>
                
                <button
                  onClick={clearCart}
                  className="w-full border border-earth-300 hover:bg-earth-50 text-earth-700 py-3 px-4 rounded-xl font-medium transition-colors"
                >
                  Clear Cart
                </button>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-br from-sage-50 to-earth-50 rounded-xl border border-sage-200">
                <h3 className="font-medium text-earth-900 mb-2">Wholesale Benefits</h3>
                <ul className="text-sm text-earth-600 space-y-1">
                  <li>• Free shipping on all orders</li>
                  <li>• Secure payment with Stripe</li>
                  <li>• Net 30 payment terms</li>
                  <li>• Dedicated account manager</li>
                  <li>• Priority customer support</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;