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
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity, selectedTier) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => 
        item.id === product.id && item.selectedTier === selectedTier
      );
      
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id && item.selectedTier === selectedTier
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prev, { 
        ...product, 
        quantity, 
        selectedTier,
        unitPrice: product.pricing[selectedTier]
      }];
    });
  };

  const removeFromCart = (productId, tier) => {
    setCartItems(prev => prev.filter(item => 
      !(item.id === productId && item.selectedTier === tier)
    ));
  };

  const updateQuantity = (productId, tier, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, tier);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId && item.selectedTier === tier
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.unitPrice * item.quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}