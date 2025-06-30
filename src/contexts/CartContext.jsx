import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
        console.log('Loaded cart from localStorage:', parsedCart);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        setCartItems([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    console.log('Cart updated:', cartItems);
  }, [cartItems]);

  const addToCart = (product, quantity, selectedTier, caseInfo = null) => {
    console.log('CartContext - Adding to cart:', {
      productName: product.name,
      quantity,
      selectedTier,
      caseInfo
    });

    setCartItems(prev => {
      // Create a unique key based on product, tier, and case size
      const caseKey = caseInfo ? `${caseInfo.caseSize.size}-${caseInfo.caseSize.label}` : 'default';
      const existingItemIndex = prev.findIndex(item => 
        item.id === product.id && 
        item.selectedTier === selectedTier && 
        item.caseKey === caseKey
      );

      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedItems = [...prev];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
          totalUnits: updatedItems[existingItemIndex].totalUnits + quantity
        };
        console.log('Updated existing cart item:', updatedItems[existingItemIndex]);
        return updatedItems;
      }

      // Create new cart item
      const newItem = {
        id: product.id,
        name: product.name,
        description: product.description,
        image: product.image,
        category: product.category,
        ingredients: product.ingredients,
        certifications: product.certifications,
        pricing: product.pricing,
        inStock: product.inStock,
        quantity,
        selectedTier,
        unitPrice: product.pricing[selectedTier],
        caseKey,
        totalUnits: quantity
      };

      // Add case information if provided
      if (caseInfo) {
        newItem.caseInfo = caseInfo;
        newItem.casesOrdered = caseInfo.casesOrdered;
        newItem.unitsPerCase = caseInfo.unitsPerCase;
        newItem.caseSize = caseInfo.caseSize;
      }

      console.log('Created new cart item:', newItem);
      return [...prev, newItem];
    });
  };

  const removeFromCart = (productId, tier, caseKey = 'default') => {
    console.log('CartContext - Removing from cart:', { productId, tier, caseKey });
    
    setCartItems(prev => {
      const filteredItems = prev.filter(item => 
        !(item.id === productId && item.selectedTier === tier && item.caseKey === caseKey)
      );
      console.log('Items after removal:', filteredItems);
      console.log('Removed item with:', { productId, tier, caseKey });
      return filteredItems;
    });
  };

  const updateQuantity = (productId, tier, quantity, caseKey = 'default') => {
    console.log('CartContext - Updating quantity:', { productId, tier, quantity, caseKey });
    
    if (quantity <= 0) {
      removeFromCart(productId, tier, caseKey);
      return;
    }

    setCartItems(prev => 
      prev.map(item => 
        item.id === productId && item.selectedTier === tier && item.caseKey === caseKey
          ? { 
              ...item, 
              quantity, 
              totalUnits: item.caseInfo ? quantity : quantity 
            }
          : item
      )
    );
  };

  const updateCaseQuantity = (productId, tier, caseQuantity, caseKey = 'default') => {
    console.log('CartContext - Updating case quantity:', { productId, tier, caseQuantity, caseKey });
    
    if (caseQuantity <= 0) {
      removeFromCart(productId, tier, caseKey);
      return;
    }

    setCartItems(prev => 
      prev.map(item => {
        if (item.id === productId && item.selectedTier === tier && item.caseKey === caseKey && item.caseInfo) {
          const newTotalUnits = caseQuantity * item.unitsPerCase;
          return {
            ...item,
            casesOrdered: caseQuantity,
            quantity: newTotalUnits,
            totalUnits: newTotalUnits,
            caseInfo: {
              ...item.caseInfo,
              casesOrdered: caseQuantity
            }
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    console.log('CartContext - Clearing cart');
    setCartItems([]);
  };

  const getCartTotal = () => {
    const total = cartItems.reduce((total, item) => {
      return total + (item.unitPrice * item.quantity);
    }, 0);
    console.log('Cart total calculated:', total);
    return total;
  };

  const getCartItemCount = () => {
    const count = cartItems.reduce((total, item) => {
      // Count cases if available, otherwise count units
      return total + (item.casesOrdered || item.quantity);
    }, 0);
    console.log('Cart item count:', count);
    return count;
  };

  const getTotalUnits = () => {
    const units = cartItems.reduce((total, item) => total + item.quantity, 0);
    console.log('Total units:', units);
    return units;
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateCaseQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    getTotalUnits
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}