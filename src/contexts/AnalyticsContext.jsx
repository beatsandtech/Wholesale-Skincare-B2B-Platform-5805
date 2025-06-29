import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const AnalyticsContext = createContext();

export function useAnalytics() {
  return useContext(AnalyticsContext);
}

export function AnalyticsProvider({ children }) {
  const { user } = useAuth();
  const [analyticsData, setAnalyticsData] = useState({
    revenue: generateRevenueData(),
    customers: generateCustomerData(),
    products: generateProductData(),
    orders: generateOrderData(),
    geography: generateGeographyData(),
    trends: generateTrendData(),
    cohorts: generateCohortData(),
    predictions: generatePredictionData()
  });

  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
    end: new Date()
  });

  // Generate mock revenue data
  function generateRevenueData() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    
    return {
      monthly: months.map((month, index) => ({
        month,
        revenue: Math.floor(Math.random() * 50000) + 20000,
        orders: Math.floor(Math.random() * 200) + 50,
        customers: Math.floor(Math.random() * 80) + 20,
        avgOrderValue: Math.floor(Math.random() * 200) + 300
      })),
      daily: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        revenue: Math.floor(Math.random() * 3000) + 500,
        orders: Math.floor(Math.random() * 15) + 2,
        visitors: Math.floor(Math.random() * 200) + 50
      })),
      hourly: Array.from({ length: 24 }, (_, i) => ({
        hour: i,
        revenue: Math.floor(Math.random() * 500) + 100,
        orders: Math.floor(Math.random() * 5) + 1
      })),
      byTier: [
        { tier: 'Bronze', revenue: 45200, percentage: 28.5, customers: 45 },
        { tier: 'Silver', revenue: 62800, percentage: 39.6, customers: 28 },
        { tier: 'Gold', revenue: 38900, percentage: 24.5, customers: 18 },
        { tier: 'Platinum', revenue: 11700, percentage: 7.4, customers: 8 }
      ]
    };
  }

  // Generate customer analytics
  function generateCustomerData() {
    return {
      acquisition: {
        organic: 45,
        referral: 25,
        direct: 20,
        social: 10
      },
      retention: Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        rate: Math.max(20, 90 - i * 5 + Math.random() * 10)
      })),
      lifetime: {
        avgValue: 2450.75,
        avgDuration: 18.5,
        segments: [
          { segment: 'New (0-3 months)', count: 23, value: 450.25 },
          { segment: 'Growing (3-12 months)', count: 34, value: 1250.50 },
          { segment: 'Established (1-2 years)', count: 28, value: 3200.75 },
          { segment: 'Loyal (2+ years)', count: 15, value: 5800.90 }
        ]
      },
      satisfaction: {
        nps: 72,
        csat: 4.6,
        reviews: 4.8,
        supportTickets: 12
      }
    };
  }

  // Generate product analytics
  function generateProductData() {
    const categories = ['Cleansers', 'Serums', 'Moisturizers', 'Masks', 'Oils'];
    
    return {
      performance: categories.map(category => ({
        category,
        revenue: Math.floor(Math.random() * 40000) + 10000,
        units: Math.floor(Math.random() * 500) + 100,
        margin: Math.floor(Math.random() * 30) + 40,
        growth: (Math.random() - 0.5) * 40
      })),
      topSellers: [
        { name: 'Vitamin C Brightening Serum', revenue: 15420, units: 245, growth: 18.5 },
        { name: 'Gentle Honey Cleanser', revenue: 12350, units: 189, growth: 12.3 },
        { name: 'Hydrating Rose Moisturizer', revenue: 10890, units: 167, growth: 8.7 },
        { name: 'Detox Clay Mask', revenue: 9640, units: 134, growth: -2.1 },
        { name: 'Nourishing Argan Oil', revenue: 8750, units: 98, growth: 25.4 }
      ],
      inventory: {
        turnover: 6.2,
        stockouts: 3,
        overstock: 8,
        deadStock: 2
      }
    };
  }

  // Generate order analytics
  function generateOrderData() {
    return {
      fulfillment: {
        avgProcessingTime: 1.2,
        avgShippingTime: 3.8,
        onTimeDelivery: 94.5,
        returnRate: 2.3
      },
      patterns: {
        peakHours: [9, 10, 11, 14, 15, 16],
        peakDays: ['Tuesday', 'Wednesday', 'Thursday'],
        seasonality: [
          { month: 'Jan', factor: 0.8 },
          { month: 'Feb', factor: 0.9 },
          { month: 'Mar', factor: 1.1 },
          { month: 'Apr', factor: 1.2 },
          { month: 'May', factor: 1.3 },
          { month: 'Jun', factor: 1.1 }
        ]
      },
      channels: [
        { channel: 'Direct Orders', percentage: 65, revenue: 89500 },
        { channel: 'Bulk Orders', percentage: 25, revenue: 34500 },
        { channel: 'Subscription', percentage: 10, revenue: 13800 }
      ]
    };
  }

  // Generate geography data
  function generateGeographyData() {
    return {
      regions: [
        { region: 'North America', revenue: 78500, customers: 45, growth: 12.5 },
        { region: 'Europe', revenue: 34200, customers: 23, growth: 8.3 },
        { region: 'Asia Pacific', revenue: 23100, customers: 18, growth: 25.7 },
        { region: 'Latin America', revenue: 12800, customers: 12, growth: 15.2 }
      ],
      states: [
        { state: 'California', revenue: 28500, customers: 18 },
        { state: 'New York', revenue: 18200, customers: 12 },
        { state: 'Texas', revenue: 15600, customers: 8 },
        { state: 'Florida', revenue: 12300, customers: 7 },
        { state: 'Illinois', revenue: 9800, customers: 5 }
      ],
      shipping: {
        avgCost: 12.50,
        avgTime: 3.2,
        zones: [
          { zone: 'Zone 1 (Local)', cost: 8.50, time: 1.5 },
          { zone: 'Zone 2 (Regional)', cost: 12.50, time: 2.8 },
          { zone: 'Zone 3 (National)', cost: 18.75, time: 4.2 }
        ]
      }
    };
  }

  // Generate trend analysis
  function generateTrendData() {
    return {
      growth: {
        revenue: { current: 15.8, previous: 12.3, trend: 'up' },
        customers: { current: 8.5, previous: 11.2, trend: 'down' },
        orders: { current: 12.7, previous: 9.8, trend: 'up' },
        avgOrderValue: { current: 6.2, previous: 2.1, trend: 'up' }
      },
      forecasts: {
        nextMonth: {
          revenue: 52000,
          confidence: 85,
          range: [48000, 56000]
        },
        nextQuarter: {
          revenue: 165000,
          confidence: 78,
          range: [155000, 175000]
        },
        nextYear: {
          revenue: 720000,
          confidence: 65,
          range: [650000, 790000]
        }
      },
      correlations: [
        { metric1: 'Marketing Spend', metric2: 'New Customers', correlation: 0.78 },
        { metric1: 'Customer Satisfaction', metric2: 'Retention Rate', correlation: 0.85 },
        { metric1: 'Product Reviews', metric2: 'Sales Volume', correlation: 0.72 },
        { metric1: 'Shipping Speed', metric2: 'Customer Satisfaction', correlation: 0.68 }
      ]
    };
  }

  // Generate cohort analysis
  function generateCohortData() {
    const cohorts = [];
    for (let i = 0; i < 12; i++) {
      const cohort = {
        month: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 7),
        size: Math.floor(Math.random() * 50) + 20,
        retention: []
      };
      
      for (let j = 0; j <= i; j++) {
        cohort.retention.push(Math.max(10, 100 - j * 15 + Math.random() * 20));
      }
      
      cohorts.push(cohort);
    }
    
    return cohorts;
  }

  // Generate prediction data
  function generatePredictionData() {
    return {
      churn: {
        highRisk: 8,
        mediumRisk: 15,
        lowRisk: 77,
        factors: [
          { factor: 'Days since last order', impact: 0.85 },
          { factor: 'Order frequency decline', impact: 0.72 },
          { factor: 'Support ticket volume', impact: 0.45 },
          { factor: 'Price sensitivity', impact: 0.38 }
        ]
      },
      demand: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        predicted: Math.floor(Math.random() * 1000) + 500,
        confidence: Math.floor(Math.random() * 30) + 70
      })),
      pricing: {
        elasticity: -1.2,
        optimal: {
          current: 24.99,
          suggested: 26.50,
          impact: '+8.5% revenue'
        }
      }
    };
  }

  // Analytics tracking functions
  const trackEvent = (eventName, properties = {}) => {
    console.log('Analytics Event:', eventName, properties);
    // In production, send to analytics service
  };

  const trackPageView = (page) => {
    console.log('Page View:', page);
    // In production, send to analytics service
  };

  const trackConversion = (type, value, properties = {}) => {
    console.log('Conversion:', type, value, properties);
    // In production, send to analytics service
  };

  // Data filtering and aggregation
  const filterDataByDateRange = (data, start, end) => {
    return data.filter(item => {
      const itemDate = new Date(item.date || item.created_at);
      return itemDate >= start && itemDate <= end;
    });
  };

  const aggregateData = (data, groupBy = 'day') => {
    // Implementation for data aggregation
    return data;
  };

  const calculateGrowthRate = (current, previous) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  // Export functions
  const exportData = async (type, format = 'csv') => {
    console.log(`Exporting ${type} data as ${format}`);
    // Implementation for data export
    return { success: true, url: `/exports/${type}.${format}` };
  };

  const generateReport = async (reportType, options = {}) => {
    console.log(`Generating ${reportType} report`, options);
    // Implementation for report generation
    return { success: true, reportId: `report_${Date.now()}` };
  };

  const value = {
    analyticsData,
    dateRange,
    setDateRange,
    trackEvent,
    trackPageView,
    trackConversion,
    filterDataByDateRange,
    aggregateData,
    calculateGrowthRate,
    exportData,
    generateReport
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}