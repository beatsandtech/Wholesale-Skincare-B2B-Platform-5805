import React, { createContext, useContext, useState, useEffect } from 'react';

const CategoryContext = createContext();

export function useCategories() {
  return useContext(CategoryContext);
}

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([
    { id: 'cleansers', name: 'Cleansers', description: 'Facial cleansers and cleansing products' },
    { id: 'moisturizers', name: 'Moisturizers', description: 'Face and body moisturizing products' },
    { id: 'serums', name: 'Serums', description: 'Concentrated treatment serums' },
    { id: 'masks', name: 'Face Masks', description: 'Treatment masks and face packs' },
    { id: 'oils', name: 'Face Oils', description: 'Facial oils and oil-based treatments' }
  ]);

  useEffect(() => {
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addCategory = (category) => {
    const newCategory = {
      ...category,
      id: category.id || category.name.toLowerCase().replace(/\s+/g, '-')
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (categoryId, updatedCategory) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId ? { ...cat, ...updatedCategory } : cat
    ));
  };

  const deleteCategory = (categoryId) => {
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
  };

  const getCategoryById = (categoryId) => {
    return categories.find(cat => cat.id === categoryId);
  };

  const value = {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryById
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}