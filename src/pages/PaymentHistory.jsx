import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { usePayment } from '../contexts/PaymentContext';
import { format } from 'date-fns';

const { FiCreditCard, FiDownload, FiEye, FiFilter, FiCalendar, FiDollarSign } = FiIcons;

function PaymentHistory() {
  const { paymentHistory } = usePayment();
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const getStatusColor = (status) => {
    switch (status) {
      case 'succeeded':
        return 'bg-forest-100 text-forest-800 border-forest-200';
      case 'pending':
        return 'bg-earth-100 text-earth-800 border-earth-200';
      case 'failed':
        return 'bg-terracotta-100 text-terracotta-800 border-terracotta-200';
      default:
        return 'bg-earth-100 text-earth-800 border-earth-200';
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'card':
        return FiCreditCard;
      default:
        return FiDollarSign;
    }
  };

  const filteredPayments = paymentHistory.filter(payment => {
    if (selectedStatus !== 'all' && payment.status !== selectedStatus) {
      return false;
    }
    // Add period filtering logic here
    return true;
  });

  const totalAmount = filteredPayments.reduce((sum, payment) => sum + (payment.amount / 100), 0);

  return (
    <div className="min-h-screen bg-natural-gradient bg-pattern-leaves">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-serif font-bold text-earth-900">Payment History</h1>
          <p className="text-earth-600 mt-2">
            View and manage your payment transactions
          </p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-earth-600">Total Payments</p>
                <p className="text-2xl font-bold text-earth-900">{filteredPayments.length}</p>
              </div>
              <SafeIcon icon={FiCreditCard} className="text-forest-600 text-2xl" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-earth-600">Total Amount</p>
                <p className="text-2xl font-bold text-earth-900">${totalAmount.toFixed(2)}</p>
              </div>
              <SafeIcon icon={FiDollarSign} className="text-sage-600 text-2xl" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-earth-600">Success Rate</p>
                <p className="text-2xl font-bold text-earth-900">
                  {((filteredPayments.filter(p => p.status === 'succeeded').length / filteredPayments.length) * 100).toFixed(1)}%
                </p>
              </div>
              <SafeIcon icon={FiFilter} className="text-terracotta-600 text-2xl" />
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-earth-700 mb-2">
                Time Period
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
              >
                <option value="all">All Time</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-earth-700 mb-2">
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
              >
                <option value="all">All Statuses</option>
                <option value="succeeded">Succeeded</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div className="flex items-end">
              <button className="bg-forest-600 hover:bg-forest-700 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center space-x-2">
                <SafeIcon icon={FiDownload} />
                <span>Export</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Payments List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 overflow-hidden"
        >
          <div className="p-6 border-b border-earth-200">
            <h2 className="text-xl font-semibold text-earth-900">Recent Payments</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-earth-50 to-sage-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-earth-700">Payment ID</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-earth-700">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-earth-700">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-earth-700">Method</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-earth-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-earth-700">Order</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-earth-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-earth-200">
                {filteredPayments.map((payment, index) => (
                  <motion.tr
                    key={payment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gradient-to-r hover:from-sage-25 hover:to-earth-25 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-mono text-sm text-earth-900">
                        {payment.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-earth-600">
                      {format(new Date(payment.created), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-earth-900">
                        ${(payment.amount / 100).toFixed(2)}
                      </span>
                      <span className="text-earth-600 text-sm ml-1">
                        {payment.currency.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={getPaymentMethodIcon(payment.paymentMethod)} className="text-earth-600" />
                        <span className="text-earth-600 capitalize">
                          {payment.paymentMethod}
                        </span>
                        {payment.last4 && (
                          <span className="text-earth-500 text-sm">••••{payment.last4}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(payment.status)}`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-earth-600">
                      {payment.orderId || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="p-2 text-earth-600 hover:text-earth-700 hover:bg-earth-50 rounded-lg transition-colors">
                          <SafeIcon icon={FiEye} />
                        </button>
                        <button className="p-2 text-earth-600 hover:text-earth-700 hover:bg-earth-50 rounded-lg transition-colors">
                          <SafeIcon icon={FiDownload} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPayments.length === 0 && (
            <div className="text-center py-12">
              <SafeIcon icon={FiCreditCard} className="text-earth-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-lg font-medium text-earth-900 mb-2">No payments found</h3>
              <p className="text-earth-600">
                No payments match your current filters. Try adjusting your search criteria.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default PaymentHistory;