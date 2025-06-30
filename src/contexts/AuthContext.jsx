import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Demo users with different roles
        const demoUsers = {
          'admin@skincare.com': {
            id: 1,
            email: 'admin@skincare.com',
            name: 'Admin User',
            role: 'admin',
            company: 'Natural Skincare Co.',
            tier: 'platinum'
          },
          'manager@skincare.com': {
            id: 2,
            email: 'manager@skincare.com',
            name: 'Manager User',
            role: 'manager',
            company: 'Natural Skincare Co.',
            tier: 'gold'
          },
          'buyer@retailer.com': {
            id: 3,
            email: 'buyer@retailer.com',
            name: 'John Buyer',
            role: 'buyer',
            company: 'Premium Beauty Retailers',
            tier: 'gold'
          }
        };

        const userData = demoUsers[email];
        if (userData && password === 'password123') {
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}