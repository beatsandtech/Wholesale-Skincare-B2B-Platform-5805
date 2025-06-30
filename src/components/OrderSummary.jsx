import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiChevronDown, FiChevronUp, FiTag, FiTruck, FiShield, FiPercent } = FiIcons;

function OrderSummary({ 
  cartItems, 
  subtotal, 
  processingFee, 
  shipping = 0, 
  tax = 0, 
  discount = 0, 
  total,
  promoCode = '',
  onPromoCodeChange,
  onApplyPromo,
  promoLoading = false,
  promoError = '',
  promoSuccess = false
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localPromoCode, setLocalPromoCode] = useState(promoCode);

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    if (onApplyPromo && localPromoCode.trim()) {
      onApplyPromo(localPromoCode.trim());
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6 sticky top-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-earth-900">Order Summary</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden flex items-center space-x-1 text-earth-600 hover:text-earth-800 transition-colors"
        >
          <span className="text-sm">
            {isExpanded ? 'Hide' : 'Show'} details
          </span>
          <SafeIcon icon={isExpanded ? FiChevronUp : FiChevronDown} />
        </button>
      </div>

      <AnimatePresence>
        {(isExpanded || window.innerWidth >= 1024) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 mb-6"
          >
            {/* Cart Items */}
            <div className="space-y-3 max-h-40 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.selectedTier}`} className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-earth-900 text-sm truncate">{item.name}</p>
                    <div className="flex items-center space-x-2 text-xs text-earth-600">
                      <span className={`px-2 py-0.5 rounded tier-${item.selectedTier}`}>
                        {item.selectedTier}
                      </span>
                      <span>×{item.quantity}</span>
                    </div>
                  </div>
                  <p className="font-medium text-earth-900">
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Promo Code */}
            <div className="border-t border-earth-200 pt-4">
              <form onSubmit={handlePromoSubmit} className="space-y-3">
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <SafeIcon 
                      icon={FiTag} 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-earth-400" 
                    />
                    <input
                      type="text"
                      value={localPromoCode}
                      onChange={(e) => setLocalPromoCode(e.target.value)}
                      placeholder="Promo code"
                      className="w-full pl-10 pr-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={promoLoading || !localPromoCode.trim()}
                    className="px-4 py-2 bg-earth-600 hover:bg-earth-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-medium transition-colors"
                  >
                    {promoLoading ? 'Applying...' : 'Apply'}
                  </button>
                </div>
                
                {promoError && (
                  <p className="text-terracotta-600 text-xs flex items-center">
                    <SafeIcon icon={FiPercent} className="mr-1" />
                    {promoError}
                  </p>
                )}
                
                {promoSuccess && (
                  <p className="text-forest-600 text-xs flex items-center">
                    <SafeIcon icon={FiTag} className="mr-1" />
                    Promo code applied successfully!
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Order Totals */}
      <div className="space-y-3">
        <div className="flex justify-between text-earth-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-forest-600">
            <span className="flex items-center">
              <SafeIcon icon={FiPercent} className="mr-1 text-sm" />
              Discount
            </span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-earth-600">
          <span className="flex items-center">
            <SafeIcon icon={FiShield} className="mr-1 text-sm" />
            Processing Fee
          </span>
          <span>${processingFee.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-earth-600">
          <span className="flex items-center">
            <SafeIcon icon={FiTruck} className="mr-1 text-sm" />
            Shipping
          </span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>

        {tax > 0 && (
          <div className="flex justify-between text-earth-600">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        )}

        <div className="border-t border-earth-200 pt-3">
          <div className="flex justify-between text-lg font-bold text-earth-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="mt-6 p-4 bg-gradient-to-r from-sage-50 to-earth-50 rounded-xl border border-sage-200">
        <div className="flex items-center text-earth-700">
          <SafeIcon icon={FiShield} className="mr-2 text-forest-600" />
          <span className="text-sm">
            Secure 256-bit SSL encryption
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;