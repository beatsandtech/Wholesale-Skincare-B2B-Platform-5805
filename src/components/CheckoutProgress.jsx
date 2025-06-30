import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiShoppingCart, FiCreditCard, FiCheck, FiTruck } = FiIcons;

function CheckoutProgress({ currentStep = 1 }) {
  const steps = [
    { id: 1, title: 'Cart Review', icon: FiShoppingCart, description: 'Review your items' },
    { id: 2, title: 'Checkout', icon: FiCreditCard, description: 'Payment & shipping' },
    { id: 3, title: 'Confirmation', icon: FiCheck, description: 'Order confirmed' },
    { id: 4, title: 'Processing', icon: FiTruck, description: 'Order processing' }
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6 mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-earth-200 -translate-y-1/2 z-0">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-forest-500 to-forest-600"
          />
        </div>

        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isUpcoming = step.id > currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted
                    ? 'bg-forest-600 border-forest-600 text-white'
                    : isCurrent
                    ? 'bg-white border-forest-500 text-forest-600 shadow-lg'
                    : 'bg-white border-earth-300 text-earth-400'
                }`}
              >
                {isCompleted ? (
                  <SafeIcon icon={FiCheck} className="text-lg" />
                ) : (
                  <SafeIcon icon={step.icon} className="text-lg" />
                )}
              </motion.div>

              <div className="mt-3 text-center">
                <p className={`text-sm font-medium ${
                  isCurrent ? 'text-forest-700' : isCompleted ? 'text-forest-600' : 'text-earth-500'
                }`}>
                  {step.title}
                </p>
                <p className={`text-xs mt-1 ${
                  isCurrent ? 'text-forest-600' : isCompleted ? 'text-forest-500' : 'text-earth-400'
                }`}>
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CheckoutProgress;