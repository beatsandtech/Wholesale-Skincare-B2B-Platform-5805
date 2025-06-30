import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { RoleProvider } from './contexts/RoleContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { CartProvider } from './contexts/CartContext';
import { CategoryProvider } from './contexts/CategoryContext';
import { PaymentProvider } from './contexts/PaymentContext';
import { OrderProvider } from './contexts/OrderContext';
import BrandingWrapper from './components/BrandingWrapper';
import Navigation from './components/Navigation';
import InteractiveCartIcon from './components/InteractiveCartIcon';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import OrderTracking from './pages/OrderTracking';
import AdminPanel from './pages/AdminPanel';
import ProductManagement from './pages/ProductManagement';
import CategoryManagement from './pages/CategoryManagement';
import BulkImport from './pages/BulkImport';
import PricingTiers from './pages/PricingTiers';
import UserManagement from './pages/UserManagement';
import Reports from './pages/Reports';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PaymentHistory from './pages/PaymentHistory';
import SystemSettings from './pages/SystemSettings';
import './App.css';

function AppContent() {
  const { user } = useAuth();

  return (
    <BrandingWrapper>
      <div className="min-h-screen bg-natural-gradient">
        {user && <Navigation />}
        {user && <InteractiveCartIcon />}
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute permissions={['dashboard.view_buyer', 'dashboard.view_admin']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute permissions={['products.view']}>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute permissions={['orders.view_own', 'orders.view_all']}>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders/track/:orderId"
            element={
              <ProtectedRoute permissions={['orders.view_own', 'orders.view_all']}>
                <OrderTracking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders/track"
            element={
              <ProtectedRoute permissions={['orders.view_own', 'orders.view_all']}>
                <OrderTracking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute permissions={['cart.manage']}>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute permissions={['checkout.process']}>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payments"
            element={
              <ProtectedRoute permissions={['payments.view_own', 'payments.view_all']}>
                <PaymentHistory />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute permissions={['dashboard.view_admin']}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute permissions={['products.create', 'products.edit']}>
                <ProductManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute permissions={['categories.create', 'categories.edit']}>
                <CategoryManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/bulk-import"
            element={
              <ProtectedRoute permissions={['products.bulk_import']}>
                <BulkImport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pricing"
            element={
              <ProtectedRoute permissions={['pricing.edit']}>
                <PricingTiers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute permissions={['users.view']}>
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute permissions={['reports.view_basic']}>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/system-settings"
            element={
              <ProtectedRoute permissions={['settings.view']}>
                <SystemSettings />
              </ProtectedRoute>
            }
          />

          {/* Default Redirects */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </BrandingWrapper>
  );
}

function App() {
  return (
    <Router>
      <SettingsProvider>
        <AuthProvider>
          <RoleProvider>
            <CategoryProvider>
              <CartProvider>
                <OrderProvider>
                  <PaymentProvider>
                    <AppContent />
                  </PaymentProvider>
                </OrderProvider>
              </CartProvider>
            </CategoryProvider>
          </RoleProvider>
        </AuthProvider>
      </SettingsProvider>
    </Router>
  );
}

export default App;