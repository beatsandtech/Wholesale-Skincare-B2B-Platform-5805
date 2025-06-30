import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import SafeIcon from '../common/SafeIcon';
import ImageUpload from '../components/ImageUpload';
import { useCategories } from '../contexts/CategoryContext';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiEdit, FiTrash2, FiSave, FiX, FiPackage, FiSettings } = FiIcons;

function ProductManagement() {
  const { categories } = useCategories();
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Gentle Honey Cleanser',
      category: 'cleansers',
      description: 'Natural honey-based cleanser with chamomile extract',
      image: 'https://images.unsplash.com/photo-1556228578-dd302b8a5e60?w=400',
      pricing: {
        bronze: 12.50,
        silver: 11.75,
        gold: 11.00,
        platinum: 10.25
      },
      caseSizes: [
        { size: 12, label: 'Standard' },
        { size: 24, label: 'Bulk' },
        { size: 6, label: 'Sample' }
      ],
      inStock: 245,
      ingredients: ['Honey', 'Chamomile', 'Aloe Vera'],
      certifications: ['Organic', 'Cruelty-Free']
    }
  ]);

  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [caseSizes, setCaseSizes] = useState([{ size: '', label: '' }]);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();

  const addCaseSize = () => {
    setCaseSizes([...caseSizes, { size: '', label: '' }]);
  };

  const removeCaseSize = (index) => {
    setCaseSizes(caseSizes.filter((_, i) => i !== index));
  };

  const updateCaseSize = (index, field, value) => {
    const updatedCases = caseSizes.map((caseSize, i) => 
      i === index ? { ...caseSize, [field]: value } : caseSize
    );
    setCaseSizes(updatedCases);
  };

  const onSubmit = (data) => {
    // Filter out empty case sizes
    const validCaseSizes = caseSizes.filter(cs => cs.size && cs.label);
    
    const productData = {
      ...data,
      id: editingProduct ? editingProduct.id : Date.now(),
      image: selectedImage,
      pricing: {
        bronze: parseFloat(data.bronzePrice),
        silver: parseFloat(data.silverPrice),
        gold: parseFloat(data.goldPrice),
        platinum: parseFloat(data.platinumPrice)
      },
      caseSizes: validCaseSizes.length > 0 ? validCaseSizes : [{ size: parseInt(data.minOrder) || 12, label: 'Standard' }],
      inStock: parseInt(data.inStock),
      ingredients: data.ingredients.split(',').map(i => i.trim()),
      certifications: data.certifications.split(',').map(c => c.trim())
    };

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? productData : p));
      setEditingProduct(null);
    } else {
      setProducts(prev => [...prev, productData]);
      setIsAddingProduct(false);
    }

    reset();
    setSelectedImage('');
    setCaseSizes([{ size: '', label: '' }]);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setSelectedImage(product.image);
    setCaseSizes(product.caseSizes || [{ size: product.minOrder || 12, label: 'Standard' }]);
    
    setValue('name', product.name);
    setValue('category', product.category);
    setValue('description', product.description);
    setValue('bronzePrice', product.pricing.bronze);
    setValue('silverPrice', product.pricing.silver);
    setValue('goldPrice', product.pricing.gold);
    setValue('platinumPrice', product.pricing.platinum);
    setValue('inStock', product.inStock);
    setValue('ingredients', product.ingredients.join(', '));
    setValue('certifications', product.certifications.join(', '));
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const handleCancel = () => {
    setIsAddingProduct(false);
    setEditingProduct(null);
    setSelectedImage('');
    setCaseSizes([{ size: '', label: '' }]);
    reset();
  };

  const handleAddNew = () => {
    setIsAddingProduct(true);
    setSelectedImage('');
    setCaseSizes([{ size: '', label: '' }]);
    reset();
  };

  return (
    <div className="min-h-screen bg-natural-gradient bg-pattern-leaves">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-serif font-bold text-earth-900">Product Management</h1>
              <p className="text-earth-600 mt-2">
                Add, edit, and manage your product catalog with flexible case sizes
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                to="/admin/categories"
                className="bg-earth-600 hover:bg-earth-700 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center space-x-2 shadow-lg"
              >
                <SafeIcon icon={FiSettings} />
                <span>Manage Categories</span>
              </Link>
              <button
                onClick={handleAddNew}
                className="bg-forest-600 hover:bg-forest-700 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center space-x-2 shadow-lg"
              >
                <SafeIcon icon={FiPlus} />
                <span>Add Product</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Add/Edit Product Form */}
        {(isAddingProduct || editingProduct) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6 mb-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-earth-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={handleCancel} className="text-earth-400 hover:text-earth-600">
                <SafeIcon icon={FiX} className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    {...register('name', { required: 'Product name is required' })}
                    className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
                    placeholder="Enter product name"
                  />
                  {errors.name && (
                    <p className="text-terracotta-600 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    Category *
                  </label>
                  <select
                    {...register('category', { required: 'Category is required' })}
                    className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-terracotta-600 text-sm mt-1">{errors.category.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Description *
                </label>
                <textarea
                  {...register('description', { required: 'Description is required' })}
                  rows={3}
                  className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
                  placeholder="Enter product description"
                />
                {errors.description && (
                  <p className="text-terracotta-600 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Product Image
                </label>
                <ImageUpload value={selectedImage} onChange={setSelectedImage} />
              </div>

              {/* Case Sizes Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-earth-700">
                    Case Sizes *
                  </label>
                  <button
                    type="button"
                    onClick={addCaseSize}
                    className="text-forest-600 hover:text-forest-700 text-sm font-medium flex items-center space-x-1"
                  >
                    <SafeIcon icon={FiPlus} className="text-sm" />
                    <span>Add Case Size</span>
                  </button>
                </div>
                
                <div className="space-y-3">
                  {caseSizes.map((caseSize, index) => (
                    <div key={index} className="grid grid-cols-3 gap-3 p-3 bg-sage-50 rounded-lg border border-sage-200">
                      <div>
                        <label className="block text-xs font-medium text-earth-600 mb-1">
                          Case Label
                        </label>
                        <input
                          type="text"
                          value={caseSize.label}
                          onChange={(e) => updateCaseSize(index, 'label', e.target.value)}
                          placeholder="e.g., Standard, Bulk"
                          className="w-full px-2 py-1 border border-earth-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-forest-500 bg-white text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-earth-600 mb-1">
                          Units per Case
                        </label>
                        <input
                          type="number"
                          value={caseSize.size}
                          onChange={(e) => updateCaseSize(index, 'size', parseInt(e.target.value))}
                          placeholder="12"
                          min="1"
                          className="w-full px-2 py-1 border border-earth-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-forest-500 bg-white text-sm"
                        />
                      </div>
                      
                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() => removeCaseSize(index)}
                          disabled={caseSizes.length === 1}
                          className="w-full py-1 text-terracotta-600 hover:text-terracotta-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                          <SafeIcon icon={FiTrash2} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <p className="text-xs text-earth-500 mt-2">
                  Define different case sizes for flexible ordering. Customers can choose the most suitable case size for their needs.
                </p>
              </div>

              {/* Pricing Tiers */}
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-4">
                  Pricing Tiers (per unit) *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['bronze', 'silver', 'gold', 'platinum'].map(tier => (
                    <div key={tier}>
                      <label className="block text-sm font-medium text-earth-600 mb-1 capitalize">
                        {tier} Price
                      </label>
                      <input
                        {...register(`${tier}Price`, {
                          required: `${tier} price is required`,
                          min: { value: 0, message: 'Price must be positive' }
                        })}
                        type="number"
                        step="0.01"
                        className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
                        placeholder="0.00"
                      />
                      {errors[`${tier}Price`] && (
                        <p className="text-terracotta-600 text-xs mt-1">{errors[`${tier}Price`].message}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Stock Quantity (total units) *
                </label>
                <input
                  {...register('inStock', {
                    required: 'Stock quantity is required',
                    min: { value: 0, message: 'Stock cannot be negative' }
                  })}
                  type="number"
                  className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
                  placeholder="Enter total units in stock"
                />
                {errors.inStock && (
                  <p className="text-terracotta-600 text-sm mt-1">{errors.inStock.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    Ingredients (comma-separated)
                  </label>
                  <input
                    {...register('ingredients')}
                    className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
                    placeholder="Honey, Chamomile, Aloe Vera"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    Certifications (comma-separated)
                  </label>
                  <input
                    {...register('certifications')}
                    className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
                    placeholder="Organic, Cruelty-Free, Vegan"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-earth-300 text-earth-700 rounded-xl hover:bg-earth-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-forest-600 hover:bg-forest-700 text-white rounded-xl transition-colors flex items-center space-x-2"
                >
                  <SafeIcon icon={FiSave} />
                  <span>{editingProduct ? 'Update Product' : 'Add Product'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Products List */}
        <div className="space-y-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6"
            >
              <div className="flex items-center space-x-6">
                <img
                  src={product.image || '/api/placeholder/80/80'}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-xl"
                />
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-earth-900">{product.name}</h3>
                  <p className="text-earth-600 text-sm mb-2">{product.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-earth-500">
                    <span className="capitalize">
                      {categories.find(cat => cat.id === product.category)?.name || product.category}
                    </span>
                    <span>•</span>
                    <span>Stock: {product.inStock}</span>
                  </div>
                  
                  {/* Case Sizes Display */}
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-sm font-medium text-earth-700">Case sizes:</span>
                    {product.caseSizes?.map((caseSize, index) => (
                      <span
                        key={index}
                        className="text-xs bg-sage-100 px-2 py-1 rounded border border-sage-200"
                      >
                        {caseSize.label} ({caseSize.size})
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm font-medium text-earth-700">Pricing:</span>
                    {Object.entries(product.pricing).map(([tier, price]) => (
                      <span key={tier} className="text-xs bg-earth-100 px-2 py-1 rounded capitalize">
                        {tier}: ${price.toFixed(2)}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="p-2 text-forest-600 hover:text-forest-700 hover:bg-forest-50 rounded-xl transition-colors"
                  >
                    <SafeIcon icon={FiEdit} />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2 text-terracotta-600 hover:text-terracotta-700 hover:bg-terracotta-50 rounded-xl transition-colors"
                  >
                    <SafeIcon icon={FiTrash2} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200">
            <SafeIcon icon={FiPackage} className="text-earth-400 text-4xl mb-4 mx-auto" />
            <h3 className="text-lg font-medium text-earth-900 mb-2">No products yet</h3>
            <p className="text-earth-600 mb-4">Get started by adding your first product with flexible case sizes</p>
            <button
              onClick={handleAddNew}
              className="bg-forest-600 hover:bg-forest-700 text-white px-4 py-2 rounded-xl font-medium transition-colors"
            >
              Add Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductManagement;