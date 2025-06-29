import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useOrders } from '../contexts/OrderContext';
import { format } from 'date-fns';

const {
  FiPackage,
  FiTruck,
  FiCheck,
  FiClock,
  FiMapPin,
  FiCalendar,
  FiArrowLeft,
  FiExternalLink,
  FiCopy,
  FiRefreshCw,
  FiDownload,
  FiPhone,
  FiMail
} = FiIcons;

function OrderTracking() {
  const { orderId } = useParams();
  const { getOrderById } = useOrders();
  const [trackingInput, setTrackingInput] = useState(orderId || '');
  const [selectedOrder, setSelectedOrder] = useState(orderId ? getOrderById(orderId) : null);
  const [copied, setCopied] = useState(false);

  const handleTrackOrder = (e) => {
    e.preventDefault();
    const order = getOrderById(trackingInput.toUpperCase());
    setSelectedOrder(order);
  };

  const copyTrackingNumber = () => {
    if (selectedOrder?.tracking) {
      navigator.clipboard.writeText(selectedOrder.tracking);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'order_placed': return FiClock;
      case 'processing': return FiPackage;
      case 'shipped': return FiTruck;
      case 'in_transit': return FiTruck;
      case 'out_for_delivery': return FiTruck;
      case 'delivered': return FiCheck;
      default: return FiPackage;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'order_placed': return 'text-earth-600 bg-earth-100';
      case 'processing': return 'text-terracotta-600 bg-terracotta-100';
      case 'shipped': return 'text-sage-600 bg-sage-100';
      case 'in_transit': return 'text-sage-600 bg-sage-100';
      case 'out_for_delivery': return 'text-forest-600 bg-forest-100';
      case 'delivered': return 'text-forest-700 bg-forest-200';
      default: return 'text-earth-600 bg-earth-100';
    }
  };

  const getProgressPercentage = (status) => {
    switch (status) {
      case 'order_placed': return 20;
      case 'processing': return 40;
      case 'shipped': return 60;
      case 'in_transit': return 80;
      case 'out_for_delivery': return 90;
      case 'delivered': return 100;
      default: return 0;
    }
  };

  const trackingSteps = [
    { key: 'order_placed', label: 'Order Placed', icon: FiClock },
    { key: 'processing', label: 'Processing', icon: FiPackage },
    { key: 'shipped', label: 'Shipped', icon: FiTruck },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: FiTruck },
    { key: 'delivered', label: 'Delivered', icon: FiCheck }
  ];

  const getCurrentStepIndex = (status) => {
    return trackingSteps.findIndex(step => step.key === status);
  };

  return (
    <div className="min-h-screen bg-natural-gradient bg-pattern-leaves">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/orders"
            className="flex items-center space-x-2 text-earth-600 hover:text-earth-800 mb-4 transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} />
            <span>Back to Orders</span>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-earth-900">Order Tracking</h1>
          <p className="text-earth-600 mt-2">
            Track your wholesale orders in real-time
          </p>
        </motion.div>

        {/* Tracking Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-earth-900 mb-4">Track Your Order</h2>
          <form onSubmit={handleTrackOrder} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                placeholder="Enter Order ID (e.g., ORD-2024-001)"
                className="w-full px-4 py-3 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white text-earth-900 placeholder-earth-400"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="bg-forest-600 hover:bg-forest-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center space-x-2 shadow-lg"
            >
              <SafeIcon icon={FiPackage} />
              <span>Track Order</span>
            </motion.button>
          </form>
        </motion.div>

        {selectedOrder ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-earth-900">{selectedOrder.id}</h3>
                    <p className="text-earth-600">
                      Placed on {format(new Date(selectedOrder.date), 'MMMM d, yyyy')}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                      <SafeIcon icon={getStatusIcon(selectedOrder.status)} className="mr-2" />
                      {selectedOrder.status.replace('_', ' ').toUpperCase()}
                    </div>
                    <p className="text-lg font-bold text-earth-900 mt-2">
                      ${selectedOrder.total.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-earth-700">Order Progress</span>
                    <span className="text-sm text-earth-600">
                      {getProgressPercentage(selectedOrder.status)}% Complete
                    </span>
                  </div>
                  <div className="w-full bg-earth-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getProgressPercentage(selectedOrder.status)}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="bg-gradient-to-r from-forest-500 to-forest-600 h-2 rounded-full"
                    />
                  </div>
                </div>

                {/* Tracking Steps */}
                <div className="space-y-4">
                  {trackingSteps.map((step, index) => {
                    const currentIndex = getCurrentStepIndex(selectedOrder.status);
                    const isCompleted = index <= currentIndex;
                    const isCurrent = index === currentIndex;
                    
                    return (
                      <motion.div
                        key={step.key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 ${
                          isCurrent 
                            ? 'bg-gradient-to-r from-forest-50 to-sage-50 border border-forest-200' 
                            : isCompleted 
                            ? 'bg-gradient-to-r from-sage-50 to-earth-50 border border-sage-200' 
                            : 'bg-earth-50 border border-earth-200'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isCompleted 
                            ? 'bg-forest-600 text-white' 
                            : 'bg-earth-300 text-earth-600'
                        }`}>
                          <SafeIcon icon={step.icon} />
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${
                            isCompleted ? 'text-forest-700' : 'text-earth-600'
                          }`}>
                            {step.label}
                          </p>
                          {isCurrent && (
                            <p className="text-sm text-forest-600">In Progress</p>
                          )}
                        </div>
                        {isCompleted && (
                          <SafeIcon icon={FiCheck} className="text-forest-600" />
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Tracking Number */}
                {selectedOrder.tracking && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-sage-50 to-earth-50 rounded-xl border border-sage-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-earth-700">Tracking Number</p>
                        <p className="font-mono text-earth-900">{selectedOrder.tracking}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={copyTrackingNumber}
                          className="p-2 text-earth-600 hover:text-earth-700 hover:bg-earth-100 rounded-lg transition-colors"
                        >
                          <SafeIcon icon={copied ? FiCheck : FiCopy} />
                        </button>
                        <button className="p-2 text-earth-600 hover:text-earth-700 hover:bg-earth-100 rounded-lg transition-colors">
                          <SafeIcon icon={FiExternalLink} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Tracking History */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6"
              >
                <h3 className="text-xl font-semibold text-earth-900 mb-6">Tracking History</h3>
                <div className="space-y-4">
                  {selectedOrder.trackingHistory.map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-start space-x-4 p-4 bg-gradient-to-r from-cream-50 to-sage-50 rounded-xl border border-sage-200"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(event.status)}`}>
                        <SafeIcon icon={getStatusIcon(event.status)} className="text-sm" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-earth-900">{event.description}</p>
                          <p className="text-sm text-earth-600">
                            {format(new Date(event.timestamp), 'MMM d, h:mm a')}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-earth-600">
                          <SafeIcon icon={FiMapPin} />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Items in Order */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6"
              >
                <h3 className="text-xl font-semibold text-earth-900 mb-6">Items in This Order</h3>
                <div className="space-y-4">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-cream-50 to-sage-50 rounded-xl border border-sage-200"
                    >
                      <div>
                        <p className="font-medium text-earth-900">{item.name}</p>
                        <p className="text-sm text-earth-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-earth-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Delivery Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6 sticky top-8"
              >
                <h3 className="text-lg font-semibold text-earth-900 mb-4">Delivery Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-earth-700 mb-1">Estimated Delivery</p>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiCalendar} className="text-forest-600" />
                      <span className="text-earth-900">
                        {selectedOrder.deliveredDate 
                          ? `Delivered ${format(new Date(selectedOrder.deliveredDate), 'MMM d, yyyy')}`
                          : format(new Date(selectedOrder.estimatedDelivery), 'MMM d, yyyy')
                        }
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-earth-700 mb-2">Shipping Address</p>
                    <div className="p-3 bg-gradient-to-r from-sage-50 to-earth-50 rounded-lg border border-sage-200">
                      <p className="font-medium text-earth-900">{selectedOrder.shippingAddress.name}</p>
                      <p className="text-earth-700">{selectedOrder.shippingAddress.company}</p>
                      <p className="text-earth-600">{selectedOrder.shippingAddress.address}</p>
                      <p className="text-earth-600">
                        {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-earth-200">
                    <button className="w-full bg-forest-600 hover:bg-forest-700 text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2">
                      <SafeIcon icon={FiRefreshCw} />
                      <span>Refresh Status</span>
                    </button>
                  </div>

                  <div className="pt-2">
                    <button className="w-full border border-earth-300 hover:bg-earth-50 text-earth-700 py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2">
                      <SafeIcon icon={FiDownload} />
                      <span>Download Receipt</span>
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Support Contact */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6"
              >
                <h3 className="text-lg font-semibold text-earth-900 mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-earth-50 rounded-xl transition-colors">
                    <SafeIcon icon={FiPhone} className="text-forest-600" />
                    <div>
                      <p className="font-medium text-earth-900">Call Support</p>
                      <p className="text-sm text-earth-600">+1 (555) 123-4567</p>
                    </div>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-earth-50 rounded-xl transition-colors">
                    <SafeIcon icon={FiMail} className="text-forest-600" />
                    <div>
                      <p className="font-medium text-earth-900">Email Support</p>
                      <p className="text-sm text-earth-600">support@naturalskincare.com</p>
                    </div>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        ) : trackingInput && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-12"
          >
            <SafeIcon icon={FiPackage} className="text-earth-400 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-earth-900 mb-2">Order Not Found</h3>
            <p className="text-earth-600 mb-6">
              We couldn't find an order with ID "{trackingInput}". Please check the order ID and try again.
            </p>
            <Link
              to="/orders"
              className="inline-flex items-center space-x-2 bg-forest-600 hover:bg-forest-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              <SafeIcon icon={FiArrowLeft} />
              <span>View All Orders</span>
            </Link>
          </motion.div>
        )}

        {!selectedOrder && !trackingInput && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-12"
          >
            <SafeIcon icon={FiPackage} className="text-earth-400 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-earth-900 mb-2">Track Your Order</h3>
            <p className="text-earth-600 mb-6">
              Enter your order ID above to track your wholesale order in real-time.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4">
                <SafeIcon icon={FiClock} className="text-forest-600 text-2xl mb-2 mx-auto" />
                <h4 className="font-medium text-earth-900">Real-time Updates</h4>
                <p className="text-sm text-earth-600">Get live updates on your order status</p>
              </div>
              <div className="text-center p-4">
                <SafeIcon icon={FiTruck} className="text-forest-600 text-2xl mb-2 mx-auto" />
                <h4 className="font-medium text-earth-900">Delivery Tracking</h4>
                <p className="text-sm text-earth-600">Track your package from warehouse to door</p>
              </div>
              <div className="text-center p-4">
                <SafeIcon icon={FiPhone} className="text-forest-600 text-2xl mb-2 mx-auto" />
                <h4 className="font-medium text-earth-900">Support Available</h4>
                <p className="text-sm text-earth-600">Get help when you need it most</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default OrderTracking;