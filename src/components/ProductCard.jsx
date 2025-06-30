import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiShoppingCart, FiEye, FiHeart, FiLeaf, FiPackage, FiPlus, FiMinus } = FiIcons;

function ProductCard({ product, userTier, onAddToCart, onViewDetails }) {
  const [selectedCaseSize, setSelectedCaseSize] = useState(product.caseSizes?.[0] || { size: product.minOrder || 12, label: 'Standard' });
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    const minQuantity = 1;
    const maxQuantity = Math.floor(product.inStock / selectedCaseSize.size);
    setQuantity(Math.max(minQuantity, Math.min(newQuantity, maxQuantity)));
  };

  const handleAddToCart = async () => {
    if (isAdding) return; // Prevent double-clicking
    
    setIsAdding(true);
    console.log('ProductCard - Add to cart clicked:', {
      product: product.name,
      quantity,
      userTier,
      selectedCaseSize
    });

    try {
      await onAddToCart(product, quantity, userTier, selectedCaseSize);
      
      // Visual feedback
      setTimeout(() => {
        setIsAdding(false);
      }, 1000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAdding(false);
    }
  };

  const totalUnits = quantity * selectedCaseSize.size;
  const unitPrice = product.pricing[userTier];
  const totalPrice = unitPrice * totalUnits;
  const maxAvailableCases = Math.floor(product.inStock / selectedCaseSize.size);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 overflow-hidden hover:shadow-xl transition-all duration-300 card-hover"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          {product.certifications?.map(cert => (
            <span
              key={cert}
              className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-earth-700 rounded-full border border-earth-200 shadow-sm"
            >
              {cert}
            </span>
          ))}
        </div>
        <div className="absolute top-4 left-4">
          <div className="w-8 h-8 bg-forest-500/90 backdrop-blur-sm rounded-full flex items-center justify-center">
            <SafeIcon icon={FiLeaf} className="text-white text-sm" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-earth-800 mb-2 font-serif">
          {product.name}
        </h3>
        <p className="text-earth-600 text-sm mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Case Size Selection */}
        {product.caseSizes && product.caseSizes.length > 1 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-earth-700 mb-2">
              Case Size
            </label>
            <div className="grid grid-cols-2 gap-2">
              {product.caseSizes.map((caseSize, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedCaseSize(caseSize);
                    setQuantity(1); // Reset quantity when changing case size
                  }}
                  className={`p-2 text-sm rounded-lg border transition-all duration-200 ${
                    selectedCaseSize === caseSize
                      ? 'border-forest-500 bg-forest-50 text-forest-700'
                      : 'border-earth-300 hover:border-earth-400 text-earth-600'
                  }`}
                >
                  <div className="text-center">
                    <p className="font-medium">{caseSize.label}</p>
                    <p className="text-xs">{caseSize.size} units</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-earth-700 mb-2">
            Quantity (Cases)
          </label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-lg border border-earth-300 flex items-center justify-center hover:bg-earth-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <SafeIcon icon={FiMinus} className="text-sm" />
            </button>
            
            <div className="flex-1 text-center">
              <input
                type="number"
                min="1"
                max={maxAvailableCases}
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="w-20 text-center border border-earth-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-forest-500"
              />
            </div>
            
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= maxAvailableCases}
              className="w-8 h-8 rounded-lg border border-earth-300 flex items-center justify-center hover:bg-earth-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <SafeIcon icon={FiPlus} className="text-sm" />
            </button>
          </div>
          
          <div className="mt-2 text-xs text-earth-600 text-center">
            Total: {totalUnits} units • {maxAvailableCases} cases available
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-4 p-3 bg-gradient-to-r from-cream-50 to-sage-50 rounded-xl border border-sage-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-earth-700">Unit Price ({userTier} tier):</span>
            <span className="text-lg font-bold text-forest-600">
              ${unitPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm text-earth-600">
            <span>Case Price ({selectedCaseSize.size} units):</span>
            <span className="font-medium">${(unitPrice * selectedCaseSize.size).toFixed(2)}</span>
          </div>
          <div className="border-t border-sage-300 mt-2 pt-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-earth-700">Total Price:</span>
              <span className="text-xl font-bold text-forest-600">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Key Ingredients */}
        <div className="mb-4">
          <p className="text-xs font-medium text-earth-700 mb-2 flex items-center">
            <SafeIcon icon={FiLeaf} className="mr-1 text-forest-500" />
            Key Natural Ingredients:
          </p>
          <div className="flex flex-wrap gap-1">
            {product.ingredients?.slice(0, 3).map(ingredient => (
              <span
                key={ingredient}
                className="px-2 py-1 bg-gradient-to-r from-earth-100 to-sage-100 text-xs text-earth-700 rounded-lg border border-earth-200 font-medium"
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: isAdding ? 1 : 1.02, y: isAdding ? 0 : -1 }}
            whileTap={{ scale: isAdding ? 1 : 0.98 }}
            onClick={handleAddToCart}
            disabled={maxAvailableCases === 0 || isAdding}
            className={`flex-1 text-white px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg ${
              isAdding 
                ? 'bg-green-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-forest-500 to-forest-600 hover:from-forest-600 hover:to-forest-700 disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          >
            {isAdding ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
                <span>Added!</span>
              </>
            ) : (
              <>
                <SafeIcon icon={FiShoppingCart} />
                <span>Add to Cart</span>
              </>
            )}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onViewDetails(product)}
            className="p-3 border border-earth-200 rounded-xl hover:bg-earth-50 transition-colors"
          >
            <SafeIcon icon={FiEye} className="text-earth-600" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 border border-earth-200 rounded-xl hover:bg-earth-50 transition-colors"
          >
            <SafeIcon icon={FiHeart} className="text-earth-600" />
          </motion.button>
        </div>

        {/* Stock Warning */}
        {maxAvailableCases < 5 && maxAvailableCases > 0 && (
          <div className="mt-3 p-2 bg-terracotta-50 border border-terracotta-200 rounded-lg">
            <p className="text-xs text-terracotta-700 text-center">
              Only {maxAvailableCases} cases remaining in stock
            </p>
          </div>
        )}

        {maxAvailableCases === 0 && (
          <div className="mt-3 p-2 bg-earth-100 border border-earth-300 rounded-lg">
            <p className="text-xs text-earth-600 text-center font-medium">
              Out of Stock
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ProductCard;