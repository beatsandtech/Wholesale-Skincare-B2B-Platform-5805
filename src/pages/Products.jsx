import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useCategories } from '../contexts/CategoryContext';

const { FiSearch, FiFilter, FiShoppingCart, FiHeart, FiEye, FiLeaf, FiStar } = FiIcons;

function Products() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { categories } = useCategories();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const products = [
    {
      id: 1,
      name: 'Gentle Honey Cleanser',
      category: 'cleansers',
      description: 'Natural honey-based cleanser with chamomile extract for sensitive skin',
      image: 'https://images.unsplash.com/photo-1556228578-dd302b8a5e60?w=400',
      pricing: { bronze: 12.50, silver: 11.75, gold: 11.00, platinum: 10.25 },
      minOrder: 12,
      inStock: 245,
      ingredients: ['Honey', 'Chamomile', 'Aloe Vera'],
      certifications: ['Organic', 'Cruelty-Free']
    },
    {
      id: 2,
      name: 'Vitamin C Brightening Serum',
      category: 'serums',
      description: 'Potent vitamin C serum with hyaluronic acid for radiant skin',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400',
      pricing: { bronze: 28.00, silver: 26.25, gold: 24.50, platinum: 22.75 },
      minOrder: 6,
      inStock: 89,
      ingredients: ['Vitamin C', 'Hyaluronic Acid', 'Niacinamide'],
      certifications: ['Vegan', 'Cruelty-Free']
    },
    {
      id: 3,
      name: 'Hydrating Rose Moisturizer',
      category: 'moisturizers',
      description: 'Rich moisturizer with rose hip oil and ceramides for deep hydration',
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400',
      pricing: { bronze: 22.00, silver: 20.50, gold: 19.00, platinum: 17.50 },
      minOrder: 8,
      inStock: 156,
      ingredients: ['Rose Hip Oil', 'Ceramides', 'Shea Butter'],
      certifications: ['Organic', 'Vegan']
    },
    {
      id: 4,
      name: 'Detox Clay Mask',
      category: 'masks',
      description: 'Purifying clay mask with activated charcoal for deep cleansing',
      image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400',
      pricing: { bronze: 18.50, silver: 17.25, gold: 16.00, platinum: 14.75 },
      minOrder: 10,
      inStock: 203,
      ingredients: ['Bentonite Clay', 'Activated Charcoal', 'Tea Tree Oil'],
      certifications: ['Natural', 'Cruelty-Free']
    },
    {
      id: 5,
      name: 'Nourishing Argan Oil',
      category: 'oils',
      description: '100% pure argan oil for face and hair nourishment',
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400',
      pricing: { bronze: 35.00, silver: 32.75, gold: 30.50, platinum: 28.25 },
      minOrder: 4,
      inStock: 67,
      ingredients: ['Argan Oil'],
      certifications: ['Organic', 'Fair Trade', 'Vegan']
    },
    {
      id: 6,
      name: 'Soothing Oat Cleanser',
      category: 'cleansers',
      description: 'Gentle oat-based cleanser perfect for sensitive and dry skin',
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400',
      pricing: { bronze: 14.00, silver: 13.25, gold: 12.50, platinum: 11.75 },
      minOrder: 12,
      inStock: 178,
      ingredients: ['Oat Extract', 'Calendula', 'Coconut Oil'],
      certifications: ['Organic', 'Hypoallergenic']
    }
  ];

  const getUserTier = () => {
    return user?.tier || 'bronze';
  };

  const filteredProducts = products
    .filter(product => 
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return a.pricing[getUserTier()] - b.pricing[getUserTier()];
      return 0;
    });

  const handleAddToCart = (product, quantity = product.minOrder) => {
    const tier = getUserTier();
    addToCart(product, quantity, tier);
  };

  return (
    <div className="min-h-screen bg-natural-gradient bg-pattern-leaves">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-forest-500 to-forest-600 rounded-2xl flex items-center justify-center shadow-lg">
              <SafeIcon icon={FiLeaf} className="text-cream-50 text-2xl" />
            </div>
            <div>
              <h1 className="text-4xl font-serif font-bold text-earth-800">Natural Product Catalog</h1>
              <p className="text-earth-600 mt-2 text-lg">
                Browse our premium natural skincare products
                {user?.tier && (
                  <span className={`ml-3 px-3 py-1 rounded-full text-sm font-medium tier-${user.tier}`}>
                    {user.tier.charAt(0).toUpperCase() + user.tier.slice(1)} Tier
                  </span>
                )}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Filters Sidebar */}
          <div className="lg:w-80 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6"
            >
              <h3 className="text-xl font-semibold text-earth-800 mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-sage-500 to-sage-600 rounded-lg flex items-center justify-center mr-3">
                  <SafeIcon icon={FiFilter} className="text-white" />
                </div>
                Filters
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-3">
                    Search Products
                  </label>
                  <div className="relative">
                    <SafeIcon icon={FiSearch} className="absolute left-4 top-4 text-earth-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-earth-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-forest-500 bg-cream-50/50 placeholder-earth-400 transition-all duration-200"
                      placeholder="Search natural products..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-3">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-earth-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-forest-500 bg-cream-50/50 text-earth-700"
                  >
                    <option value="all">All Products</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-3">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 border border-earth-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-forest-500 bg-cream-50/50 text-earth-700"
                  >
                    <option value="name">Product Name</option>
                    <option value="price">Price (Low to High)</option>
                  </select>
                </div>
              </div>

              {/* Natural Benefits Section */}
              <div className="mt-6 p-4 bg-gradient-to-br from-forest-50 to-sage-50 rounded-xl border border-forest-200">
                <h4 className="font-medium text-forest-800 mb-2 flex items-center">
                  <SafeIcon icon={FiStar} className="mr-2 text-forest-600" />
                  Natural Benefits
                </h4>
                <ul className="text-sm text-forest-700 space-y-1">
                  <li>• 100% Natural Ingredients</li>
                  <li>• Cruelty-Free Testing</li>
                  <li>• Sustainable Packaging</li>
                  <li>• Organic Certifications</li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 overflow-hidden hover:shadow-xl transition-all duration-300 card-hover"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 flex flex-col space-y-2">
                      {product.certifications.map(cert => (
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

                    <div className="mb-4 p-3 bg-gradient-to-r from-cream-50 to-sage-50 rounded-xl border border-sage-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-earth-700">Your Tier Price:</span>
                        <span className="text-2xl font-bold text-forest-600">
                          ${product.pricing[getUserTier()].toFixed(2)}
                        </span>
                      </div>
                      <div className="text-xs text-earth-500 flex justify-between">
                        <span>Min order: {product.minOrder} units</span>
                        <span className="text-forest-600 font-medium">{product.inStock} in stock</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs font-medium text-earth-700 mb-2 flex items-center">
                        <SafeIcon icon={FiLeaf} className="mr-1 text-forest-500" />
                        Key Natural Ingredients:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {product.ingredients.slice(0, 3).map(ingredient => (
                          <span
                            key={ingredient}
                            className="px-2 py-1 bg-gradient-to-r from-earth-100 to-sage-100 text-xs text-earth-700 rounded-lg border border-earth-200 font-medium"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-gradient-to-r from-forest-500 to-forest-600 hover:from-forest-600 hover:to-forest-700 text-white px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                      >
                        <SafeIcon icon={FiShoppingCart} />
                        <span>Add to Cart</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
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
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200">
                <div className="w-20 h-20 bg-gradient-to-br from-earth-200 to-earth-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <SafeIcon icon={FiSearch} className="text-earth-600 text-3xl" />
                </div>
                <h3 className="text-xl font-semibold text-earth-800 mb-2">No natural products found</h3>
                <p className="text-earth-600">Try adjusting your search or filter criteria to discover more natural skincare products</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;