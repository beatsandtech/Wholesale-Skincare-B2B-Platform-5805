import React, { createContext, useContext, useState, useEffect } from 'react';

const InventoryContext = createContext();

export function useInventory() {
  return useContext(InventoryContext);
}

export function InventoryProvider({ children }) {
  const [inventory, setInventory] = useState([
    {
      id: 1,
      productId: 1,
      productName: 'Gentle Honey Cleanser',
      sku: 'GHC-001',
      currentStock: 245,
      reservedStock: 24,
      availableStock: 221,
      reorderPoint: 50,
      maxStock: 500,
      cost: 8.50,
      lastRestocked: '2024-01-10',
      supplier: 'Natural Ingredients Co.',
      location: 'Warehouse A-1',
      batchNumber: 'B240110-001',
      expiryDate: '2025-01-10',
      status: 'in_stock'
    },
    {
      id: 2,
      productId: 2,
      productName: 'Vitamin C Brightening Serum',
      sku: 'VCS-002',
      currentStock: 89,
      reservedStock: 12,
      availableStock: 77,
      reorderPoint: 30,
      maxStock: 200,
      cost: 18.75,
      lastRestocked: '2024-01-08',
      supplier: 'Vitamin Solutions Ltd.',
      location: 'Warehouse A-2',
      batchNumber: 'B240108-002',
      expiryDate: '2024-12-08',
      status: 'in_stock'
    },
    {
      id: 3,
      productId: 3,
      productName: 'Hydrating Rose Moisturizer',
      sku: 'HRM-003',
      currentStock: 156,
      reservedStock: 18,
      availableStock: 138,
      reorderPoint: 40,
      maxStock: 300,
      cost: 12.25,
      lastRestocked: '2024-01-12',
      supplier: 'Rose Beauty Supplies',
      location: 'Warehouse B-1',
      batchNumber: 'B240112-003',
      expiryDate: '2025-06-12',
      status: 'in_stock'
    },
    {
      id: 4,
      productId: 4,
      productName: 'Detox Clay Mask',
      sku: 'DCM-004',
      currentStock: 23,
      reservedStock: 8,
      availableStock: 15,
      reorderPoint: 25,
      maxStock: 150,
      cost: 9.80,
      lastRestocked: '2024-01-05',
      supplier: 'Clay & Earth Co.',
      location: 'Warehouse B-2',
      batchNumber: 'B240105-004',
      expiryDate: '2025-03-05',
      status: 'low_stock'
    },
    {
      id: 5,
      productId: 5,
      productName: 'Nourishing Argan Oil',
      sku: 'NAO-005',
      currentStock: 67,
      reservedStock: 5,
      availableStock: 62,
      reorderPoint: 20,
      maxStock: 100,
      cost: 22.50,
      lastRestocked: '2024-01-14',
      supplier: 'Moroccan Oils Direct',
      location: 'Warehouse C-1',
      batchNumber: 'B240114-005',
      expiryDate: '2025-12-14',
      status: 'in_stock'
    },
    {
      id: 6,
      productId: 6,
      productName: 'Soothing Oat Cleanser',
      sku: 'SOC-006',
      currentStock: 8,
      reservedStock: 6,
      availableStock: 2,
      reorderPoint: 35,
      maxStock: 200,
      cost: 7.25,
      lastRestocked: '2023-12-28',
      supplier: 'Oat Harvest Ltd.',
      location: 'Warehouse A-3',
      batchNumber: 'B231228-006',
      expiryDate: '2024-06-28',
      status: 'critical_low'
    }
  ]);

  const [stockMovements, setStockMovements] = useState([
    {
      id: 1,
      productId: 1,
      productName: 'Gentle Honey Cleanser',
      type: 'sale',
      quantity: -12,
      reason: 'Order #ORD-2024-001',
      timestamp: '2024-01-15T10:30:00Z',
      user: 'System'
    },
    {
      id: 2,
      productId: 2,
      type: 'restock',
      quantity: +50,
      reason: 'Purchase Order #PO-2024-005',
      timestamp: '2024-01-14T14:20:00Z',
      user: 'Admin User'
    },
    {
      id: 3,
      productId: 4,
      type: 'adjustment',
      quantity: -5,
      reason: 'Damaged goods',
      timestamp: '2024-01-13T09:15:00Z',
      user: 'Warehouse Manager'
    }
  ]);

  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: 'Natural Ingredients Co.',
      contact: 'sarah@naturalingredients.com',
      phone: '+1 (555) 123-4567',
      leadTime: 7,
      minOrderValue: 1000,
      status: 'active'
    },
    {
      id: 2,
      name: 'Vitamin Solutions Ltd.',
      contact: 'orders@vitaminsolutions.com',
      phone: '+1 (555) 234-5678',
      leadTime: 10,
      minOrderValue: 1500,
      status: 'active'
    },
    {
      id: 3,
      name: 'Rose Beauty Supplies',
      contact: 'procurement@rosebeauty.com',
      phone: '+1 (555) 345-6789',
      leadTime: 5,
      minOrderValue: 800,
      status: 'active'
    }
  ]);

  const [alerts, setAlerts] = useState([]);

  // Calculate inventory status
  useEffect(() => {
    const newAlerts = [];
    
    inventory.forEach(item => {
      // Low stock alert
      if (item.availableStock <= item.reorderPoint && item.status !== 'out_of_stock') {
        newAlerts.push({
          id: `low-stock-${item.id}`,
          type: 'low_stock',
          severity: item.availableStock <= (item.reorderPoint * 0.5) ? 'critical' : 'warning',
          productId: item.id,
          productName: item.productName,
          message: `${item.productName} is running low (${item.availableStock} units remaining)`,
          timestamp: new Date().toISOString()
        });
      }

      // Expiry alert (within 3 months)
      const expiryDate = new Date(item.expiryDate);
      const threeMonthsFromNow = new Date();
      threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
      
      if (expiryDate <= threeMonthsFromNow) {
        newAlerts.push({
          id: `expiry-${item.id}`,
          type: 'expiry',
          severity: 'warning',
          productId: item.id,
          productName: item.productName,
          message: `${item.productName} expires on ${expiryDate.toLocaleDateString()}`,
          timestamp: new Date().toISOString()
        });
      }

      // Overstock alert
      if (item.currentStock > item.maxStock * 0.9) {
        newAlerts.push({
          id: `overstock-${item.id}`,
          type: 'overstock',
          severity: 'info',
          productId: item.id,
          productName: item.productName,
          message: `${item.productName} is overstocked (${item.currentStock}/${item.maxStock})`,
          timestamp: new Date().toISOString()
        });
      }
    });

    setAlerts(newAlerts);
  }, [inventory]);

  // Update stock levels
  const updateStock = (productId, quantity, reason, type = 'adjustment') => {
    setInventory(prev => prev.map(item => {
      if (item.id === productId) {
        const newCurrentStock = Math.max(0, item.currentStock + quantity);
        const newAvailableStock = Math.max(0, newCurrentStock - item.reservedStock);
        
        let status = 'in_stock';
        if (newAvailableStock === 0) status = 'out_of_stock';
        else if (newAvailableStock <= item.reorderPoint * 0.5) status = 'critical_low';
        else if (newAvailableStock <= item.reorderPoint) status = 'low_stock';

        return {
          ...item,
          currentStock: newCurrentStock,
          availableStock: newAvailableStock,
          status,
          lastRestocked: type === 'restock' ? new Date().toISOString().split('T')[0] : item.lastRestocked
        };
      }
      return item;
    }));

    // Add stock movement record
    const movement = {
      id: Date.now(),
      productId,
      productName: inventory.find(item => item.id === productId)?.productName,
      type,
      quantity,
      reason,
      timestamp: new Date().toISOString(),
      user: 'Current User' // In real app, get from auth context
    };

    setStockMovements(prev => [movement, ...prev]);
  };

  // Reserve stock for orders
  const reserveStock = (productId, quantity) => {
    setInventory(prev => prev.map(item => {
      if (item.id === productId) {
        const newReservedStock = item.reservedStock + quantity;
        const newAvailableStock = Math.max(0, item.currentStock - newReservedStock);
        
        return {
          ...item,
          reservedStock: newReservedStock,
          availableStock: newAvailableStock
        };
      }
      return item;
    }));
  };

  // Release reserved stock
  const releaseReservedStock = (productId, quantity) => {
    setInventory(prev => prev.map(item => {
      if (item.id === productId) {
        const newReservedStock = Math.max(0, item.reservedStock - quantity);
        const newAvailableStock = item.currentStock - newReservedStock;
        
        return {
          ...item,
          reservedStock: newReservedStock,
          availableStock: newAvailableStock
        };
      }
      return item;
    }));
  };

  // Update reorder points
  const updateReorderPoint = (productId, newReorderPoint) => {
    setInventory(prev => prev.map(item => {
      if (item.id === productId) {
        return { ...item, reorderPoint: newReorderPoint };
      }
      return item;
    }));
  };

  // Get inventory summary
  const getInventorySummary = () => {
    const totalProducts = inventory.length;
    const inStock = inventory.filter(item => item.status === 'in_stock').length;
    const lowStock = inventory.filter(item => item.status === 'low_stock').length;
    const criticalLow = inventory.filter(item => item.status === 'critical_low').length;
    const outOfStock = inventory.filter(item => item.status === 'out_of_stock').length;
    const totalValue = inventory.reduce((sum, item) => sum + (item.currentStock * item.cost), 0);

    return {
      totalProducts,
      inStock,
      lowStock,
      criticalLow,
      outOfStock,
      totalValue
    };
  };

  // Get low stock items
  const getLowStockItems = () => {
    return inventory.filter(item => 
      item.status === 'low_stock' || item.status === 'critical_low'
    );
  };

  // Get items needing reorder
  const getReorderSuggestions = () => {
    return inventory
      .filter(item => item.availableStock <= item.reorderPoint)
      .map(item => ({
        ...item,
        suggestedOrderQuantity: item.maxStock - item.currentStock
      }));
  };

  // Generate purchase order
  const generatePurchaseOrder = (items) => {
    const po = {
      id: `PO-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      items,
      status: 'pending',
      totalValue: items.reduce((sum, item) => sum + (item.quantity * item.cost), 0)
    };

    return po;
  };

  const value = {
    inventory,
    stockMovements,
    suppliers,
    alerts,
    updateStock,
    reserveStock,
    releaseReservedStock,
    updateReorderPoint,
    getInventorySummary,
    getLowStockItems,
    getReorderSuggestions,
    generatePurchaseOrder
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
}