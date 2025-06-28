import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { format } from 'date-fns';

const { FiPackage, FiTruck, FiCheck, FiClock, FiEye, FiDownload } = FiIcons;

function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'Processing',
      total: 245.50,
      items: [
        { name: 'Gentle Honey Cleanser', quantity: 12, price: 11.00 },
        { name: 'Vitamin C Serum', quantity: 6, price: 24.50 },
        { name: 'Hydrating Rose Moisturizer', quantity: 8, price: 19.00 }
      ],
      tracking: null,
      estimatedDelivery: '2024-01-22'
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-10',
      status: 'Shipped',
      total: 180.25,
      items: [
        { name: 'Detox Clay Mask', quantity: 10, price: 16.00 },
        { name: 'Soothing Oat Cleanser', quantity: 12, price: 12.50 }
      ],
      tracking: 'TRK123456789',
      estimatedDelivery: '2024-01-18'
    },
    {
      id: 'ORD-2024-003',
      date: '2024-01-05',
      status: 'Delivered',
      total: 320.75,
      items: [
        { name: 'Nourishing Argan Oil', quantity: 4, price: 30.50 },
        { name: 'Vitamin C Serum', quantity: 8, price: 24.50 },
        { name: 'Hydrating Rose Moisturizer', quantity: 6, price: 19.00 }
      ],
      tracking: 'TRK987654321',
      deliveredDate: '2024-01-12'
    },
    {
      id: 'ORD-2023-045',
      date: '2023-12-20',
      status: 'Delivered',
      total: 450.00,
      items: [
        { name: 'Gentle Honey Cleanser', quantity: 24, price: 11.00 },
        { name: 'Detox Clay Mask', quantity: 15, price: 16.00 }
      ],
      tracking: 'TRK456789123',
      deliveredDate: '2023-12-28'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing':
        return FiClock;
      case 'Shipped':
        return FiTruck;
      case 'Delivered':
        return FiCheck;
      default:
        return FiPackage;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
        <p className="text-gray-600 mt-2">
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
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                  <p className="text-gray-600 text-sm">
                    Placed on {format(new Date(order.date), 'MMMM d, yyyy')}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    <SafeIcon icon={getStatusIcon(order.status)} className="mr-1" />
                    {order.status}
                  </div>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    ${order.total.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Items</p>
                    <p className="text-gray-600">{order.items.length} products</p>
                  </div>
                  
                  {order.tracking && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Tracking</p>
                      <p className="text-gray-600 font-mono text-sm">{order.tracking}</p>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      {order.status === 'Delivered' ? 'Delivered' : 'Expected Delivery'}
                    </p>
                    <p className="text-gray-600">
                      {order.deliveredDate ? 
                        format(new Date(order.deliveredDate), 'MMM d, yyyy') :
                        format(new Date(order.estimatedDelivery), 'MMM d, yyyy')
                      }
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="flex items-center space-x-2 px-3 py-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                      <SafeIcon icon={FiEye} />
                      <span>View Details</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                      <SafeIcon icon={FiDownload} />
                      <span>Invoice</span>
                    </button>
                  </div>
                  
                  {order.status === 'Delivered' && (
                    <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors">
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
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">{selectedOrder.id}</h3>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                    <SafeIcon icon={getStatusIcon(selectedOrder.status)} className="mr-1" />
                    {selectedOrder.status}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Items Ordered</h4>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="text-gray-900 font-medium">{item.name}</p>
                          <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span>${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>

                {selectedOrder.tracking && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Tracking Information</h4>
                    <p className="text-gray-600 font-mono text-sm mb-2">{selectedOrder.tracking}</p>
                    <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                      Track Package
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <SafeIcon icon={FiPackage} className="text-gray-400 text-3xl mb-4 mx-auto" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Order</h3>
              <p className="text-gray-600">
                Click on any order to view detailed information
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;