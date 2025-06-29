import React, { createContext, useContext, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key (use environment variables in production)
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_stripe_publishable_key_here'
);

const PaymentContext = createContext();

export function usePayment() {
  return useContext(PaymentContext);
}

export function PaymentProvider({ children }) {
  const [processing, setProcessing] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([
    {
      id: 'pi_1234567890',
      amount: 24550,
      currency: 'usd',
      status: 'succeeded',
      created: '2024-01-15',
      orderId: 'ORD-2024-001',
      paymentMethod: 'card',
      last4: '4242'
    },
    {
      id: 'pi_0987654321',
      amount: 18025,
      currency: 'usd',
      status: 'succeeded',
      created: '2024-01-10',
      orderId: 'ORD-2024-002',
      paymentMethod: 'card',
      last4: '5555'
    }
  ]);

  // Create payment intent on your backend
  const createPaymentIntent = async (amount, currency = 'usd', metadata = {}) => {
    try {
      // In a real app, this would call your backend API
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to cents
          currency,
          metadata
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating payment intent:', error);
      // For demo purposes, return mock data
      return {
        client_secret: 'pi_mock_client_secret_for_demo',
        id: `pi_${Date.now()}`,
        amount: Math.round(amount * 100),
        currency,
        status: 'requires_payment_method'
      };
    }
  };

  // Process payment
  const processPayment = async (stripe, elements, paymentIntent, billingDetails) => {
    setProcessing(true);
    
    try {
      // For demo purposes, simulate successful payment
      if (paymentIntent.client_secret === 'pi_mock_client_secret_for_demo') {
        // Simulate payment processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const mockPaymentIntent = {
          id: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          status: 'succeeded'
        };

        // Add to payment history
        const newPayment = {
          id: mockPaymentIntent.id,
          amount: mockPaymentIntent.amount,
          currency: mockPaymentIntent.currency,
          status: mockPaymentIntent.status,
          created: new Date().toISOString().split('T')[0],
          paymentMethod: 'card',
          last4: '4242'
        };

        setPaymentHistory(prev => [newPayment, ...prev]);
        
        return { success: true, paymentIntent: mockPaymentIntent };
      }

      // Real Stripe payment processing
      const { error, paymentIntent: confirmedPayment } = await stripe.confirmCardPayment(
        paymentIntent.client_secret,
        {
          payment_method: {
            card: elements.getElement('card'),
            billing_details: billingDetails
          }
        }
      );

      if (error) {
        throw new Error(error.message);
      }

      // Add to payment history
      const newPayment = {
        id: confirmedPayment.id,
        amount: confirmedPayment.amount,
        currency: confirmedPayment.currency,
        status: confirmedPayment.status,
        created: new Date().toISOString().split('T')[0],
        paymentMethod: 'card',
        last4: '****'
      };

      setPaymentHistory(prev => [newPayment, ...prev]);
      
      return { success: true, paymentIntent: confirmedPayment };
    } catch (error) {
      console.error('Payment processing error:', error);
      return { success: false, error: error.message };
    } finally {
      setProcessing(false);
    }
  };

  // Setup subscription for recurring wholesale orders
  const createSubscription = async (priceId, customerId) => {
    try {
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_id: priceId,
          customer_id: customerId
        }),
      });

      return await response.json();
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw error;
    }
  };

  const value = {
    stripePromise,
    processing,
    paymentHistory,
    createPaymentIntent,
    processPayment,
    createSubscription
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
}