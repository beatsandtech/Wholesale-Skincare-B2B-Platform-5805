import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';

const { FiShoppingCart, FiX, FiPlus, FiMinus, FiTrash2, FiArrowRight } = FiIcons;

function InteractiveCartIcon() {
  const { cartItems, getCartItemCount, getCartTotal, updateQuantity, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const cartItemCount = getCartItemCount();
  const cartTotal = getCartTotal();

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const handleQuantityChange = (item, newQuantity) => {
    console.log('InteractiveCartIcon - Quantity change:', {
      item: item.name,
      newQuantity,
      caseKey: item.caseKey
    });
    
    if (newQuantity <= 0) {
      handleRemove(item);
    } else {
      updateQuantity(item.id, item.selectedTier, newQuantity, item.caseKey);
    }
  };

  const handleRemove = (item) => {
    console.log('InteractiveCartIcon - Removing item:', {
      id: item.id,
      tier: item.selectedTier,
      caseKey: item.caseKey,
      name: item.name
    });
    
    if (window.confirm(`Remove "${item.name}" from cart?`)) {
      removeFromCart(item.id, item.selectedTier, item.caseKey);
    }
  };

  return (
    <>
      {/* Cart Icon Button - Lowered Position */}
      <motion.div
        className="fixed top-20 right-4 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          onClick={toggleCart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-gradient-to-br from-forest-500 to-forest-600 text-white p-4 rounded-full shadow-xl border-4 border-white backdrop-blur-sm hover:shadow-2xl transition-all duration-300"
        >
          <SafeIcon icon={FiShoppingCart} className="text-xl" />
          
          {/* Cart Badge */}
          {cartItemCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              key={cartItemCount}
              className="absolute -top-2 -right-2 bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg border-2 border-white"
            >
              {cartItemCount > 99 ? '99+' : cartItemCount}
            </motion.span>
          )}

          {/* Pulse Animation for Empty Cart */}
          {cartItemCount === 0 && (
            <motion.div
              className="absolute inset-0 rounded-full bg-forest-400"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.button>
      </motion.div>

      {/* Cart Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* Cart Panel - Adjusted Position */}
            <motion.div
              initial={{ opacity: 0, x: 400, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 400, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-20 right-4 w-96 max-w-[90vw] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-earth-200 z-50 max-h-[80vh] flex flex-col"
            >
              {/* Header */}
              <div className="p-4 border-b border-earth-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiShoppingCart} className="text-forest-600 text-xl" />
                    <h3 className="text-lg font-semibold text-earth-900">Shopping Cart</h3>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-earth-400 hover:text-earth-600 hover:bg-earth-50 rounded-lg transition-colors"
                  >
                    <SafeIcon icon={FiX} />
                  </button>
                </div>
                {cartItemCount > 0 && (
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-earth-600">{cartItemCount} items</span>
                    <span className="font-semibold text-forest-600">${cartTotal.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-earth-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <SafeIcon icon={FiShoppingCart} className="text-earth-400 text-2xl" />
                    </div>
                    <p className="text-earth-600 mb-4">Your cart is empty</p>
                    <Link
                      to="/products"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center space-x-2 bg-forest-600 hover:bg-forest-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                    >
                      <span>Browse Products</span>
                      <SafeIcon icon={FiArrowRight} />
                    </Link>
                  </div>
                ) : (
                  <div className="p-2 space-y-2">
                    {cartItems.map((item) => (
                      <motion.div
                        key={`${item.id}-${item.selectedTier}-${item.caseKey}`}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-gradient-to-r from-sage-50 to-earth-50 rounded-xl p-3 border border-sage-200"
                      >
                        <div className="flex items-start space-x-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                          />
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-earth-900 text-sm truncate">
                              {item.name}
                            </h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`px-2 py-0.5 text-xs rounded-full tier-${item.selectedTier}`}>
                                {item.selectedTier}
                              </span>
                              {item.caseInfo && (
                                <span className="text-xs text-earth-600">
                                  {item.caseInfo.caseSize.label}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleQuantityChange(item, item.quantity - (item.unitsPerCase || 1))}
                                  className="w-6 h-6 rounded-md bg-white border border-earth-300 flex items-center justify-center hover:bg-earth-50 transition-colors"
                                >
                                  <SafeIcon icon={FiMinus} className="text-xs" />
                                </button>
                                <span className="text-sm font-medium text-earth-900 min-w-[2rem] text-center">
                                  {item.casesOrdered || item.quantity}
                                </span>
                                <button
                                  onClick={() => handleQuantityChange(item, item.quantity + (item.unitsPerCase || 1))}
                                  className="w-6 h-6 rounded-md bg-white border border-earth-300 flex items-center justify-center hover:bg-earth-50 transition-colors"
                                >
                                  <SafeIcon icon={FiPlus} className="text-xs" />
                                </button>
                              </div>

                              <div className="text-right">
                                <p className="text-sm font-semibold text-earth-900">
                                  ${(item.unitPrice * item.quantity).toFixed(2)}
                                </p>
                                <button
                                  onClick={() => handleRemove(item)}
                                  className="text-terracotta-500 hover:text-terracotta-600 transition-colors"
                                >
                                  <SafeIcon icon={FiTrash2} className="text-xs" />
                                </button>
                              </div>
                            </div>

                            {item.quantity !== item.casesOrdered && (
                              <p className="text-xs text-earth-500 mt-1">
                                Total: {item.quantity} units
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="p-4 border-t border-earth-200 bg-gradient-to-r from-sage-50 to-earth-50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-earth-900">Total:</span>
                    <span className="text-xl font-bold text-forest-600">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="space-y-2">
                    <Link
                      to="/cart"
                      onClick={() => setIsOpen(false)}
                      className="w-full bg-earth-600 hover:bg-earth-700 text-white py-2 px-4 rounded-xl text-sm font-medium transition-colors text-center block"
                    >
                      View Cart
                    </Link>
                    <Link
                      to="/checkout"
                      onClick={() => setIsOpen(false)}
                      className="w-full bg-gradient-to-r from-forest-500 to-forest-600 hover:from-forest-600 hover:to-forest-700 text-white py-2 px-4 rounded-xl text-sm font-medium transition-colors text-center block flex items-center justify-center space-x-2"
                    >
                      <span>Checkout</span>
                      <SafeIcon icon={FiArrowRight} />
                    </Link>
                  </div>
                  <p className="text-xs text-earth-600 text-center mt-2">
                    Free shipping on all wholesale orders
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default InteractiveCartIcon;