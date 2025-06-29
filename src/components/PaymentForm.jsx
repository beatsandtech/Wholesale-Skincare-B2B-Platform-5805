import React, { useState, useEffect } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { usePayment } from '../contexts/PaymentContext';
import { useAuth } from '../contexts/AuthContext';

const { FiCreditCard, FiLock, FiCheck, FiAlertCircle } = FiIcons;

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#3d3225',
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#9ca3af',
      },
    },
    invalid: {
      color: '#dc2626',
      iconColor: '#dc2626',
    },
  },
  hidePostalCode: false,
};

function CheckoutForm({ orderTotal, orderData, onSuccess, onError }) {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const { createPaymentIntent, processPayment, processing } = usePayment();
  
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'US',
    },
  });

  useEffect(() => {
    if (orderTotal > 0) {
      createPaymentIntent(orderTotal, 'usd', {
        order_id: orderData?.id,
        customer_id: user?.id,
        customer_email: user?.email
      }).then(setPaymentIntent);
    }
  }, [orderTotal, orderData, user, createPaymentIntent]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !paymentIntent) {
      return;
    }

    const result = await processPayment(stripe, elements, paymentIntent, billingDetails);
    
    if (result.success) {
      onSuccess(result.paymentIntent);
    } else {
      setError(result.error);
      onError(result.error);
    }
  };

  const handleCardChange = (event) => {
    setCardComplete(event.complete);
    setError(event.error ? event.error.message : null);
  };

  const handleBillingChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setBillingDetails(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setBillingDetails(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Billing Information */}
      <div className="bg-gradient-to-br from-sage-50 to-earth-50 rounded-xl p-6 border border-sage-200">
        <h3 className="text-lg font-semibold text-earth-900 mb-4 flex items-center">
          <SafeIcon icon={FiCreditCard} className="mr-2 text-forest-600" />
          Billing Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-earth-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={billingDetails.name}
              onChange={(e) => handleBillingChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-earth-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={billingDetails.email}
              onChange={(e) => handleBillingChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-earth-700 mb-2">
              Address Line 1 *
            </label>
            <input
              type="text"
              value={billingDetails.address.line1}
              onChange={(e) => handleBillingChange('address.line1', e.target.value)}
              className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-earth-700 mb-2">
              Address Line 2
            </label>
            <input
              type="text"
              value={billingDetails.address.line2}
              onChange={(e) => handleBillingChange('address.line2', e.target.value)}
              className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-earth-700 mb-2">
              City *
            </label>
            <input
              type="text"
              value={billingDetails.address.city}
              onChange={(e) => handleBillingChange('address.city', e.target.value)}
              className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-earth-700 mb-2">
              State *
            </label>
            <input
              type="text"
              value={billingDetails.address.state}
              onChange={(e) => handleBillingChange('address.state', e.target.value)}
              className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-earth-700 mb-2">
              ZIP Code *
            </label>
            <input
              type="text"
              value={billingDetails.address.postal_code}
              onChange={(e) => handleBillingChange('address.postal_code', e.target.value)}
              className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-earth-700 mb-2">
              Country *
            </label>
            <select
              value={billingDetails.address.country}
              onChange={(e) => handleBillingChange('address.country', e.target.value)}
              className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="AU">Australia</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="bg-white rounded-xl p-6 border border-earth-300">
        <h3 className="text-lg font-semibold text-earth-900 mb-4 flex items-center">
          <SafeIcon icon={FiLock} className="mr-2 text-forest-600" />
          Payment Information
        </h3>
        
        <div className="p-4 border border-earth-300 rounded-xl bg-gray-50">
          <CardElement
            options={CARD_ELEMENT_OPTIONS}
            onChange={handleCardChange}
          />
        </div>
        
        {error && (
          <div className="mt-3 flex items-center text-terracotta-600">
            <SafeIcon icon={FiAlertCircle} className="mr-2" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-gradient-to-br from-forest-50 to-sage-50 rounded-xl p-6 border border-forest-200">
        <h3 className="text-lg font-semibold text-earth-900 mb-4">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-earth-600">
            <span>Subtotal</span>
            <span>${orderTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-earth-600">
            <span>Processing Fee</span>
            <span>${(orderTotal * 0.029 + 0.30).toFixed(2)}</span>
          </div>
          <div className="border-t border-forest-200 pt-2 mt-2">
            <div className="flex justify-between text-lg font-bold text-earth-900">
              <span>Total</span>
              <span>${(orderTotal + orderTotal * 0.029 + 0.30).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-gradient-to-r from-sage-50 to-earth-50 rounded-xl p-4 border border-sage-200">
        <div className="flex items-center text-earth-700">
          <SafeIcon icon={FiLock} className="mr-2 text-forest-600" />
          <span className="text-sm">
            Your payment information is encrypted and secure. We use Stripe for processing payments.
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={!stripe || processing || !cardComplete || !paymentIntent}
        className="w-full bg-gradient-to-r from-forest-500 to-forest-600 hover:from-forest-600 hover:to-forest-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
      >
        {processing ? (
          <>
            <div className="spinner mr-2"></div>
            <span>Processing Payment...</span>
          </>
        ) : (
          <>
            <SafeIcon icon={FiLock} />
            <span>Complete Secure Payment</span>
          </>
        )}
      </motion.button>
    </form>
  );
}

function PaymentForm({ orderTotal, orderData, onSuccess, onError }) {
  const { stripePromise } = usePayment();

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm 
        orderTotal={orderTotal}
        orderData={orderData}
        onSuccess={onSuccess}
        onError={onError}
      />
    </Elements>
  );
}

export default PaymentForm;