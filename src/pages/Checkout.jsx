import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import PaymentForm from '../components/PaymentForm';
import * as FiIcons from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const { FiShoppingCart, FiCheck, FiArrowLeft, FiPackage, FiTruck } = FiIcons;

function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  const orderTotal = getCartTotal();
  const processingFee = orderTotal * 0.029 + 0.30;
  const finalTotal = orderTotal + processingFee;

  const handlePaymentSuccess = (paymentIntent) => {
    setPaymentData(paymentIntent);
    setPaymentSuccess(true);
    clearCart();
    
    // In a real app, you would also:
    // 1. Create order record in database
    // 2. Send confirmation email
    // 3. Update inventory
    // 4. Notify admin of new order
  };

  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
    // Handle payment error (show notification, etc.)
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-natural-gradient bg-pattern-leaves">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-12"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-forest-500 to-forest-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <SafeIcon icon={FiCheck} className="text-white text-3xl" />
            </div>
            
            <h1 className="text-3xl font-serif font-bold text-earth-900 mb-4">
              Payment Successful!
            </h1>
            
            <p className="text-earth-600 mb-6 text-lg">
              Thank you for your wholesale order. Your payment has been processed successfully.
            </p>
            
            {paymentData && (
              <div className="bg-gradient-to-br from-sage-50 to-earth-50 rounded-xl p-6 border border-sage-200 mb-8">
                <h3 className="font-semibold text-earth-900 mb-4">Order Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-earth-600">Payment ID:</span>
                    <p className="font-mono text-earth-900">{paymentData.id}</p>
                  </div>
                  <div>
                    <span className="text-earth-600">Amount Paid:</span>
                    <p className="font-semibold text-earth-900">
                      ${(paymentData.amount / 100).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <span className="text-earth-600">Status:</span>
                    <p className="font-semibold text-forest-600 capitalize">
                      {paymentData.status}
                    </p>
                  </div>
                  <div>
                    <span className="text-earth-600">Processing Time:</span>
                    <p className="text-earth-900">1-2 business days</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border border-earth-200">
                <SafeIcon icon={FiPackage} className="text-forest-600 text-2xl mb-3 mx-auto" />
                <h4 className="font-semibold text-earth-900 mb-2">Order Processing</h4>
                <p className="text-earth-600 text-sm">
                  Your order will be processed within 1-2 business days
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-earth-200">
                <SafeIcon icon={FiTruck} className="text-forest-600 text-2xl mb-3 mx-auto" />
                <h4 className="font-semibold text-earth-900 mb-2">Shipping</h4>
                <p className="text-earth-600 text-sm">
                  Free shipping • 3-5 business days delivery
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/orders')}
                className="bg-forest-600 hover:bg-forest-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                View Order Status
              </button>
              <button
                onClick={() => navigate('/products')}
                className="border border-earth-300 hover:bg-earth-50 text-earth-700 px-6 py-3 rounded-xl font-medium transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

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
              Add some products to proceed with checkout.
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
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center space-x-2 text-earth-600 hover:text-earth-800 mb-4 transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} />
            <span>Back to Cart</span>
          </button>
          
          <h1 className="text-3xl font-serif font-bold text-earth-900">Checkout</h1>
          <p className="text-earth-600 mt-2">
            Complete your wholesale order securely with Stripe
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6"
            >
              <PaymentForm
                orderTotal={finalTotal}
                orderData={{ id: `ORD-${Date.now()}`, items: cartItems }}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6 sticky top-8"
            >
              <h2 className="text-xl font-semibold text-earth-900 mb-6">Your Order</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.selectedTier}`} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-earth-900 text-sm">{item.name}</p>
                      <p className="text-earth-600 text-xs">
                        {item.selectedTier} tier • Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-earth-900">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-earth-200 pt-4 space-y-2">
                <div className="flex justify-between text-earth-600">
                  <span>Subtotal</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-earth-600">
                  <span>Processing Fee (2.9% + $0.30)</span>
                  <span>${processingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-earth-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-earth-200 pt-2">
                  <div className="flex justify-between text-lg font-bold text-earth-900">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-br from-sage-50 to-earth-50 rounded-xl border border-sage-200">
                <h3 className="font-medium text-earth-900 mb-2">Wholesale Benefits</h3>
                <ul className="text-sm text-earth-600 space-y-1">
                  <li>• Free shipping on all orders</li>
                  <li>• Net 30 payment terms available</li>
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

export default Checkout;