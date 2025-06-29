import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export function useOrders() {
  return useContext(OrderContext);
}

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'processing',
      total: 245.50,
      items: [
        { name: 'Gentle Honey Cleanser', quantity: 12, price: 11.00 },
        { name: 'Vitamin C Serum', quantity: 6, price: 24.50 },
        { name: 'Hydrating Rose Moisturizer', quantity: 8, price: 19.00 }
      ],
      tracking: null,
      estimatedDelivery: '2024-01-22',
      shippingAddress: {
        name: 'John Buyer',
        company: 'Premium Beauty Retailers',
        address: '123 Business Ave, Suite 100',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90210',
        country: 'US'
      },
      trackingHistory: [
        {
          status: 'order_placed',
          timestamp: '2024-01-15T10:00:00Z',
          location: 'Natural Skincare Co.',
          description: 'Order received and confirmed'
        },
        {
          status: 'processing',
          timestamp: '2024-01-15T14:30:00Z',
          location: 'Natural Skincare Co. Warehouse',
          description: 'Order is being prepared for shipment'
        }
      ]
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 180.25,
      items: [
        { name: 'Detox Clay Mask', quantity: 10, price: 16.00 },
        { name: 'Soothing Oat Cleanser', quantity: 12, price: 12.50 }
      ],
      tracking: 'TRK123456789',
      estimatedDelivery: '2024-01-18',
      shippingAddress: {
        name: 'John Buyer',
        company: 'Premium Beauty Retailers',
        address: '123 Business Ave, Suite 100',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90210',
        country: 'US'
      },
      trackingHistory: [
        {
          status: 'order_placed',
          timestamp: '2024-01-10T09:15:00Z',
          location: 'Natural Skincare Co.',
          description: 'Order received and confirmed'
        },
        {
          status: 'processing',
          timestamp: '2024-01-10T16:45:00Z',
          location: 'Natural Skincare Co. Warehouse',
          description: 'Order is being prepared for shipment'
        },
        {
          status: 'shipped',
          timestamp: '2024-01-11T08:30:00Z',
          location: 'Los Angeles, CA Distribution Center',
          description: 'Package shipped via FedEx Express'
        },
        {
          status: 'in_transit',
          timestamp: '2024-01-12T12:15:00Z',
          location: 'Phoenix, AZ Sorting Facility',
          description: 'Package in transit to destination'
        },
        {
          status: 'out_for_delivery',
          timestamp: '2024-01-16T07:00:00Z',
          location: 'Los Angeles, CA Local Facility',
          description: 'Out for delivery - expected today'
        }
      ]
    },
    {
      id: 'ORD-2024-003',
      date: '2024-01-05',
      status: 'delivered',
      total: 320.75,
      items: [
        { name: 'Nourishing Argan Oil', quantity: 4, price: 30.50 },
        { name: 'Vitamin C Serum', quantity: 8, price: 24.50 },
        { name: 'Hydrating Rose Moisturizer', quantity: 6, price: 19.00 }
      ],
      tracking: 'TRK987654321',
      deliveredDate: '2024-01-12',
      shippingAddress: {
        name: 'John Buyer',
        company: 'Premium Beauty Retailers',
        address: '123 Business Ave, Suite 100',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90210',
        country: 'US'
      },
      trackingHistory: [
        {
          status: 'order_placed',
          timestamp: '2024-01-05T11:20:00Z',
          location: 'Natural Skincare Co.',
          description: 'Order received and confirmed'
        },
        {
          status: 'processing',
          timestamp: '2024-01-05T15:30:00Z',
          location: 'Natural Skincare Co. Warehouse',
          description: 'Order is being prepared for shipment'
        },
        {
          status: 'shipped',
          timestamp: '2024-01-06T09:00:00Z',
          location: 'Los Angeles, CA Distribution Center',
          description: 'Package shipped via FedEx Express'
        },
        {
          status: 'in_transit',
          timestamp: '2024-01-08T14:20:00Z',
          location: 'Denver, CO Sorting Facility',
          description: 'Package in transit to destination'
        },
        {
          status: 'out_for_delivery',
          timestamp: '2024-01-12T08:30:00Z',
          location: 'Los Angeles, CA Local Facility',
          description: 'Out for delivery'
        },
        {
          status: 'delivered',
          timestamp: '2024-01-12T16:45:00Z',
          location: '123 Business Ave, Los Angeles, CA',
          description: 'Package delivered successfully - signed by J. BUYER'
        }
      ]
    }
  ]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  const updateOrderStatus = (orderId, newStatus, trackingNumber = null) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const updatedOrder = {
          ...order,
          status: newStatus,
          tracking: trackingNumber || order.tracking
        };

        // Add new tracking history entry
        const newHistoryEntry = {
          status: newStatus,
          timestamp: new Date().toISOString(),
          location: 'Natural Skincare Co. Warehouse',
          description: getStatusDescription(newStatus)
        };

        updatedOrder.trackingHistory = [...order.trackingHistory, newHistoryEntry];
        return updatedOrder;
      }
      return order;
    }));
  };

  const getStatusDescription = (status) => {
    switch (status) {
      case 'order_placed': return 'Order received and confirmed';
      case 'processing': return 'Order is being prepared for shipment';
      case 'shipped': return 'Package shipped';
      case 'in_transit': return 'Package in transit to destination';
      case 'out_for_delivery': return 'Out for delivery';
      case 'delivered': return 'Package delivered successfully';
      default: return 'Status updated';
    }
  };

  const createOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'order_placed',
      tracking: null,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      trackingHistory: [
        {
          status: 'order_placed',
          timestamp: new Date().toISOString(),
          location: 'Natural Skincare Co.',
          description: 'Order received and confirmed'
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const value = {
    orders,
    getOrderById,
    updateOrderStatus,
    createOrder
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}