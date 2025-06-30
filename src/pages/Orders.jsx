import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useOrders } from '../contexts/OrderContext';
import { format } from 'date-fns';

const { FiPackage, FiTruck, FiCheck, FiClock, FiEye, FiDownload, FiSearch } = FiIcons;

function Orders() {
  const { orders } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return 'bg-terracotta-100 text-terracotta-800 border-terracotta-200';
      case 'shipped':
        return 'bg-sage-100 text-sage-800 border-sage-200';
      case 'delivered':
        return 'bg-forest-100 text-forest-800 border-forest-200';
      default:
        return 'bg-earth-100 text-earth-800 border-earth-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing':
        return FiClock;
      case 'shipped':
        return FiTruck;
      case 'delivered':
        return FiCheck;
      default:
        return FiPackage;
    }
  };

  return (
    <div className="min-h-screen bg-natural-gradient bg-pattern-leaves">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-serif font-bold text-earth-900">Order History</h1>
          <p className="text-earth-600 mt-2">
            Track and manage your wholesale orders
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-2 space-y-4">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-earth-900">{order.id}</h3>
                    <p className="text-earth-600 text-sm">
                      Placed on {format(new Date(order.date), 'MMMM d, yyyy')}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                      <SafeIcon icon={getStatusIcon(order.status)} className="mr-1" />
                      {order.status}
                    </div>
                    <p className="text-lg font-bold text-earth-900 mt-1">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="border-t border-earth-200 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-earth-700 mb-1">Items</p>
                      <p className="text-earth-600">{order.items.length} products</p>
                    </div>
                    {order.tracking && (
                      <div>
                        <p className="text-sm font-medium text-earth-700 mb-1">Tracking</p>
                        <p className="text-earth-600 font-mono text-sm">{order.tracking}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-earth-700 mb-1">
                        {order.status === 'delivered' ? 'Delivered' : 'Expected Delivery'}
                      </p>
                      <p className="text-earth-600">
                        {order.deliveredDate
                          ? format(new Date(order.deliveredDate), 'MMM d, yyyy')
                          : format(new Date(order.estimatedDelivery), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-earth-200">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="flex items-center space-x-2 px-3 py-2 text-forest-600 hover:text-forest-700 hover:bg-forest-50 rounded-xl transition-colors"
                      >
                        <SafeIcon icon={FiEye} />
                        <span>View Details</span>
                      </button>
                      <Link
                        to={`/orders/track/${order.id}`}
                        className="flex items-center space-x-2 px-3 py-2 text-sage-600 hover:text-sage-700 hover:bg-sage-50 rounded-xl transition-colors"
                      >
                        <SafeIcon icon={FiSearch} />
                        <span>Track Order</span>
                      </Link>
                      <button className="flex items-center space-x-2 px-3 py-2 text-earth-600 hover:text-earth-700 hover:bg-earth-50 rounded-xl transition-colors">
                        <SafeIcon icon={FiDownload} />
                        <span>Invoice</span>
                      </button>
                    </div>
                    {order.status === 'delivered' && (
                      <button className="px-4 py-2 bg-forest-600 hover:bg-forest-700 text-white rounded-xl text-sm font-medium transition-colors">
                        Reorder
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Details Sidebar */}
          <div className="lg:col-span-1">
            {selectedOrder ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6 sticky top-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-earth-900">Order Details</h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-earth-400 hover:text-earth-600"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-earth-900 mb-2">{selectedOrder.id}</h3>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedOrder.status)}`}>
                      <SafeIcon icon={getStatusIcon(selectedOrder.status)} className="mr-1" />
                      {selectedOrder.status}
                    </div>
                  </div>

                  <div className="border-t border-earth-200 pt-4">
                    <h4 className="font-medium text-earth-900 mb-3">Items Ordered</h4>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div>
                            <p className="text-earth-900 font-medium">{item.name}</p>
                            <p className="text-earth-600 text-sm">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-earth-200 pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total</span>
                      <span>${selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>

                  {selectedOrder.tracking && (
                    <div className="border-t border-earth-200 pt-4">
                      <h4 className="font-medium text-earth-900 mb-2">Tracking Information</h4>
                      <p className="text-earth-600 font-mono text-sm mb-2">{selectedOrder.tracking}</p>
                      <Link
                        to={`/orders/track/${selectedOrder.id}`}
                        className="w-full bg-forest-600 hover:bg-forest-700 text-white py-2 px-4 rounded-xl text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                      >
                        <SafeIcon icon={FiSearch} />
                        <span>Track Package</span>
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6 text-center">
                <SafeIcon icon={FiPackage} className="text-earth-400 text-3xl mb-4 mx-auto" />
                <h3 className="text-lg font-medium text-earth-900 mb-2">Select an Order</h3>
                <p className="text-earth-600">
                  Click on any order to view detailed information
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;