import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiEdit, FiTrash2, FiSave, FiX, FiTag, FiCheck } = FiIcons;

function CategoryManagement() {
  const [categories, setCategories] = useState([
    { id: 'cleansers', name: 'Cleansers', description: 'Facial cleansers and cleansing products', productCount: 12 },
    { id: 'moisturizers', name: 'Moisturizers', description: 'Face and body moisturizing products', productCount: 18 },
    { id: 'serums', name: 'Serums', description: 'Concentrated treatment serums', productCount: 15 },
    { id: 'masks', name: 'Face Masks', description: 'Treatment masks and face packs', productCount: 8 },
    { id: 'oils', name: 'Face Oils', description: 'Facial oils and oil-based treatments', productCount: 6 }
  ]);

  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) return;

    const categoryData = {
      id: editingCategory ? editingCategory.id : formData.name.toLowerCase().replace(/\s+/g, '-'),
      name: formData.name.trim(),
      description: formData.description.trim(),
      productCount: editingCategory ? editingCategory.productCount : 0
    };

    if (editingCategory) {
      setCategories(prev => prev.map(cat => 
        cat.id === editingCategory.id ? categoryData : cat
      ));
      setEditingCategory(null);
    } else {
      setCategories(prev => [...prev, categoryData]);
      setIsAddingCategory(false);
    }

    setFormData({ name: '', description: '' });
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, description: category.description });
  };

  const handleDelete = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (category.productCount > 0) {
      alert(`Cannot delete "${category.name}" because it contains ${category.productCount} products. Please move or delete the products first.`);
      return;
    }
    
    if (window.confirm(`Are you sure you want to delete the "${category.name}" category?`)) {
      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    }
  };

  const handleCancel = () => {
    setIsAddingCategory(false);
    setEditingCategory(null);
    setFormData({ name: '', description: '' });
  };

  const handleAddNew = () => {
    setIsAddingCategory(true);
    setFormData({ name: '', description: '' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Category Management</h1>
            <p className="text-gray-600 mt-2">
              Organize your products into categories
            </p>
          </div>
          <button
            onClick={handleAddNew}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <SafeIcon icon={FiPlus} />
            <span>Add Category</span>
          </button>
        </div>
      </motion.div>

      {/* Add/Edit Category Form */}
      {(isAddingCategory || editingCategory) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h2>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              <SafeIcon icon={FiX} className="text-xl" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter category name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter category description"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiSave} />
                <span>{editingCategory ? 'Update Category' : 'Add Category'}</span>
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiTag} className="text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.productCount} products</p>
                </div>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => handleEdit(category)}
                  className="p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  <SafeIcon icon={FiEdit} />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  disabled={category.productCount > 0}
                >
                  <SafeIcon icon={FiTrash2} />
                </button>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">
              {category.description || 'No description provided'}
            </p>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Category ID: {category.id}</span>
              {category.productCount > 0 && (
                <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs">
                  {category.productCount} products
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <SafeIcon icon={FiTag} className="text-gray-400 text-4xl mb-4 mx-auto" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No categories yet</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first category</p>
          <button
            onClick={handleAddNew}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Add Category
          </button>
        </div>
      )}

      {/* Category Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Category Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 mb-2">
              {categories.length}
            </div>
            <p className="text-gray-600">Total Categories</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
            </div>
            <p className="text-gray-600">Total Products</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {categories.filter(cat => cat.productCount > 0).length}
            </div>
            <p className="text-gray-600">Active Categories</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default CategoryManagement;