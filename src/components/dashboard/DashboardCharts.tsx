'use client';

import { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Mock data for charts
const salesData = [
  { month: 'Jan', sales: 45000 },
  { month: 'Feb', sales: 52000 },
  { month: 'Mar', sales: 48000 },
  { month: 'Apr', sales: 61000 },
  { month: 'May', sales: 55000 },
  { month: 'Jun', sales: 67000 },
  { month: 'Jul', sales: 72000 },
  { month: 'Aug', sales: 78000 },
  { month: 'Sep', sales: 69000 },
  { month: 'Oct', sales: 74000 },
  { month: 'Nov', sales: 81000 },
  { month: 'Dec', sales: 95000 },
];

const productCategoryData = [
  { name: 'Milk', value: 45 },
  { name: 'Yogurt', value: 20 },
  { name: 'Cheese', value: 15 },
  { name: 'Dairy Fat', value: 12 },
  { name: 'Beverage', value: 8 },
];

const orderStatusData = [
  { name: 'Delivered', value: 65 },
  { name: 'Processing', value: 20 },
  { name: 'Pending', value: 10 },
  { name: 'Cancelled', value: 5 },
];

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];
const STATUS_COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444'];

type ChartType = 'sales' | 'products' | 'orders';

export default function DashboardCharts() {
  const [activeChart, setActiveChart] = useState<ChartType>('sales');

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 mb-4">
        <button
          onClick={() => setActiveChart('sales')}
          className={`px-4 py-2 rounded-md transition-colors ${activeChart === 'sales' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-dark-card text-gray-700 dark:text-gray-300'}`}
        >
          Sales Trends
        </button>
        <button
          onClick={() => setActiveChart('products')}
          className={`px-4 py-2 rounded-md transition-colors ${activeChart === 'products' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-dark-card text-gray-700 dark:text-gray-300'}`}
        >
          Product Categories
        </button>
        <button
          onClick={() => setActiveChart('orders')}
          className={`px-4 py-2 rounded-md transition-colors ${activeChart === 'orders' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-dark-card text-gray-700 dark:text-gray-300'}`}
        >
          Order Status
        </button>
      </div>

      <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text mb-6">
          {activeChart === 'sales' && 'Monthly Sales Trends'}
          {activeChart === 'products' && 'Product Category Distribution'}
          {activeChart === 'orders' && 'Order Status Distribution'}
        </h3>

        <div className="h-80">
          {activeChart === 'sales' && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    borderColor: '#e0e0e0',
                    borderRadius: '4px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                  }} 
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Sales']} 
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}

          {activeChart === 'products' && (
            <div className="flex flex-col md:flex-row items-center justify-center h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {productCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-6 md:mt-0 md:ml-6">
                <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Product Categories</h4>
                <div className="space-y-2">
                  {productCategoryData.map((item, index) => (
                    <div key={item.name} className="flex items-center">
                      <div className="w-4 h-4 mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{item.name}: {item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeChart === 'orders' && (
            <div className="flex flex-col md:flex-row h-full">
              <ResponsiveContainer width="60%" height="100%">
                <BarChart
                  data={orderStatusData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Percentage']} 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      borderColor: '#e0e0e0',
                      borderRadius: '4px',
                      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="value">
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="flex-1 flex flex-col justify-center items-center mt-6 md:mt-0">
                <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">Order Status</h4>
                <div className="space-y-4 w-full max-w-xs">
                  {orderStatusData.map((item, index) => (
                    <div key={item.name} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 mr-2" style={{ backgroundColor: STATUS_COLORS[index % STATUS_COLORS.length] }}></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{item.name}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${item.value}%`, 
                            backgroundColor: STATUS_COLORS[index % STATUS_COLORS.length] 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}