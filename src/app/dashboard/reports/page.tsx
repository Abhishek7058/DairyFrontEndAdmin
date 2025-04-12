'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';

// Mock data for reports
const monthlySalesData = [
  { month: 'Jan', sales: 45000, orders: 120, returns: 5 },
  { month: 'Feb', sales: 52000, orders: 140, returns: 8 },
  { month: 'Mar', sales: 48000, orders: 130, returns: 7 },
  { month: 'Apr', sales: 61000, orders: 155, returns: 9 },
  { month: 'May', sales: 55000, orders: 145, returns: 6 },
  { month: 'Jun', sales: 67000, orders: 170, returns: 10 },
  { month: 'Jul', sales: 72000, orders: 185, returns: 12 },
  { month: 'Aug', sales: 78000, orders: 200, returns: 14 },
  { month: 'Sep', sales: 69000, orders: 175, returns: 11 },
  { month: 'Oct', sales: 74000, orders: 190, returns: 13 },
  { month: 'Nov', sales: 81000, orders: 210, returns: 15 },
  { month: 'Dec', sales: 95000, orders: 240, returns: 18 },
];

const productPerformanceData = [
  { name: 'Full Cream Milk', sales: 32000, growth: 15 },
  { name: 'Toned Milk', sales: 28000, growth: 12 },
  { name: 'Paneer', sales: 18000, growth: 20 },
  { name: 'Curd', sales: 15000, growth: 8 },
  { name: 'Butter', sales: 12000, growth: 5 },
  { name: 'Cheese', sales: 10000, growth: 18 },
  { name: 'Ghee', sales: 9000, growth: 10 },
  { name: 'Flavored Milk', sales: 7000, growth: 25 },
];

const deliveryPerformanceData = [
  { name: 'On Time', value: 78 },
  { name: 'Delayed', value: 15 },
  { name: 'Early', value: 7 },
];

const customerSegmentData = [
  { name: 'Regular', value: 45 },
  { name: 'Subscription', value: 30 },
  { name: 'Occasional', value: 15 },
  { name: 'New', value: 10 },
];

const inventoryStatusData = [
  { name: 'Milk', stock: 85, demand: 90 },
  { name: 'Paneer', stock: 70, demand: 65 },
  { name: 'Curd', stock: 60, demand: 75 },
  { name: 'Butter', stock: 50, demand: 45 },
  { name: 'Cheese', stock: 40, demand: 50 },
  { name: 'Ghee', stock: 65, demand: 60 },
];

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];

type ReportType = 'sales' | 'products' | 'delivery' | 'customers' | 'inventory';
type TimeRange = 'daily' | 'weekly' | 'monthly' | 'yearly';

export default function ReportsPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [activeReport, setActiveReport] = useState<ReportType>('sales');
  const [timeRange, setTimeRange] = useState<TimeRange>('monthly');
  const [isExporting, setIsExporting] = useState(false);

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  const handleExport = (format: 'pdf' | 'csv' | 'excel') => {
    setIsExporting(true);
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      alert(`Report exported as ${format.toUpperCase()} successfully!`);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-dark-text">Reports & Analytics</h1>
          
          <div className="flex flex-wrap gap-2">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as TimeRange)}
              className="px-3 py-2 bg-white dark:bg-dark-card border border-gray-300 dark:border-dark-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            
            <div className="flex gap-2">
              <button 
                onClick={() => handleExport('pdf')} 
                disabled={isExporting}
                className="px-3 py-2 bg-primary text-white rounded-md text-sm bg-blue-600 transition-colors disabled:opacity-50"
              >
                {isExporting ? 'Exporting...' : 'Export PDF'}
              </button>
              <button 
                onClick={() => handleExport('csv')}
                disabled={isExporting}
                className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
              >
                Export CSV
              </button>
              <button 
                onClick={() => handleExport('excel')}
                disabled={isExporting}
                className="px-3 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                Export Excel
              </button>
            </div>
          </div>
        </div>

        {/* Report Type Navigation */}
        <div className="flex flex-wrap gap-2 pb-4 border-b border-gray-200 dark:border-dark-border">
          <button
            onClick={() => setActiveReport('sales')}
            className={`px-4 py-2 rounded-md transition-colors ${activeReport === 'sales' ? 'bg-primary text-white' : 'bg-gray-100 text-black'}`}
          >
            Sales Analytics
          </button>
          <button
            onClick={() => setActiveReport('products')}
            className={`px-4 py-2 rounded-md transition-colors ${activeReport === 'products' ? 'bg-primary text-white' : 'bg-gray-100 text-black'}`}
          >
            Product Performance
          </button>
          <button
            onClick={() => setActiveReport('delivery')}
            className={`px-4 py-2 rounded-md transition-colors ${activeReport === 'delivery' ? 'bg-primary text-white' : 'bg-gray-100 text-black'}`}
          >
            Delivery Performance
          </button>
          <button
            onClick={() => setActiveReport('customers')}
            className={`px-4 py-2 rounded-md transition-colors ${activeReport === 'customers' ? 'bg-primary text-white' : 'bg-gray-100 text-black'}`}
          >
            Customer Insights
          </button>
          <button
            onClick={() => setActiveReport('inventory')}
            className={`px-4 py-2 rounded-md transition-colors ${activeReport === 'inventory' ? 'bg-primary text-white' : 'bg-gray-100 text-black'}`}
          >
            Inventory Status
          </button>
        </div>

        {/* Sales Analytics Report */}
        {activeReport === 'sales' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text mb-2">Total Sales</h3>
                <p className="text-3xl font-bold text-primary">₹7,48,000</p>
                <p className="text-sm text-green-500 mt-2">+12.5% from previous {timeRange}</p>
              </div>
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text mb-2">Total Orders</h3>
                <p className="text-3xl font-bold text-secondary">1,860</p>
                <p className="text-sm text-green-500 mt-2">+8.3% from previous {timeRange}</p>
              </div>
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text mb-2">Average Order Value</h3>
                <p className="text-3xl font-bold text-accent">₹402</p>
                <p className="text-sm text-green-500 mt-2">+3.7% from previous {timeRange}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text mb-6">Sales Trend</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlySalesData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
                    <Area 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.2} 
                      activeDot={{ r: 8 }} 
                      name="Sales (₹)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text mb-6">Orders vs Returns</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlySalesData}
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
                      />
                      <Legend />
                      <Bar dataKey="orders" fill="#10b981" name="Orders" />
                      <Bar dataKey="returns" fill="#ef4444" name="Returns" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text mb-4">Key Metrics</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue Target</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Order Completion Rate</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div className="bg-secondary h-2.5 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Customer Retention</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">68%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div className="bg-accent h-2.5 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Return Rate</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">7%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '7%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Performance Report */}
        {activeReport === 'products' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text mb-6">Product Sales Performance</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={productPerformanceData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis type="number" stroke="#6b7280" />
                    <YAxis dataKey="name" type="category" stroke="#6b7280" width={80} />
                    <Tooltip 
                      formatter={(value) => [`₹${value.toLocaleString()}`, 'Sales']} 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                        borderColor: '#e0e0e0',
                        borderRadius: '4px',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="sales" fill="#3b82f6" name="Sales (₹)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text mb-6">Product Growth Rate</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={productPerformanceData.slice(0, 5)}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="name" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Growth Rate']} 
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                          borderColor: '#e0e0e0',
                          borderRadius: '4px',
                          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                        }} 
                      />
                      <Legend />
                      <Bar dataKey="growth" fill="#10b981" name="Growth Rate (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text mb-4">Top Selling Products</h3>
                <div className="space-y-4">
                  {productPerformanceData.slice(0, 5).map((product, index) => (
                    <div key={product.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                          <span className="text-primary font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-200">{product.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Growth: <span className="text-green-500">+{product.growth}%</span></p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-800 dark:text-gray-200">₹{product.sales.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delivery Performance Report */}
        {activeReport === 'delivery' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text mb-2">On-Time Delivery</h3>
                <p className="text-3xl font-bold text-green-500">78%</p>
                <p className="text-sm text-green-500 mt-2">+5% from previous {timeRange}</p>
              </div>
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text mb-2">Average Delivery Time</h3>
                <p className="text-3xl font-bold text-primary">28 min</p>
                <p className="text-sm text-green-500 mt-2">-3 min from previous {timeRange}</p>
              </div>
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text mb-2">Delivery Satisfaction</h3>
                <p className="text-3xl font-bold text-accent">4.7/5</p>
                <p className="text-sm text-green-500 mt-2">+0.2 from previous {timeRange}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text mb-6">Delivery Performance</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deliveryPerformanceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {deliveryPerformanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text mb-4">Delivery Boy Performance</h3>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-primary font-bold">RS</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-200">Rahul Singh</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">ID: DB001</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-800 dark:text-gray-200">92% On-Time</p>
                        <p className="text-sm text-green-500">4.8/5 Rating</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-primary font-bold">AK</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-200">Amit Kumar</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">ID: DB002</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-800 dark:text-gray-200">88% On-Time</p>
                        <p className="text-sm text-green-500">4.7/5 Rating</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-primary font-bold">VP</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-200">Vijay Patel</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">ID: DB003</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-800 dark:text-gray-200">85% On-Time</p>
                        <p className="text-sm text-green-500">4.6/5 Rating</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Customer Insights Report */}
        {activeReport === 'customers' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text mb-2">Total Customers</h3>
                <p className="text-3xl font-bold text-primary">1,245</p>
                <p className="text-sm text-green-500 mt-2">+8% from previous {timeRange}</p>
              </div>
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text mb-2">New Customers</h3>
                <p className="text-3xl font-bold text-secondary">124</p>
                <p className="text-sm text-green-500 mt-2">+15% from previous {timeRange}</p>
              </div>
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text mb-2">Customer Retention</h3>
                <p className="text-3xl font-bold text-accent">68%</p>
                <p className="text-sm text-green-500 mt-2">+3% from previous {timeRange}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text mb-6">Customer Segments</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={customerSegmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {customerSegmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text mb-4">Customer Engagement</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">App Downloads</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">82%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">65%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div className="bg-secondary h-2.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Subscription Rate</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">48%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div className="bg-accent h-2.5 rounded-full" style={{ width: '48%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Referral Rate</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">23%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '23%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Inventory Status Report */}
        {activeReport === 'inventory' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text mb-2">Stock Availability</h3>
                <p className="text-3xl font-bold text-primary">92%</p>
                <p className="text-sm text-green-500 mt-2">+4% from previous {timeRange}</p>
              </div>
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text mb-2">Low Stock Items</h3>
                <p className="text-3xl font-bold text-yellow-500">8</p>
                <p className="text-sm text-red-500 mt-2">+2 from previous {timeRange}</p>
              </div>
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text mb-2">Inventory Value</h3>
                <p className="text-3xl font-bold text-accent">₹4,85,000</p>
                <p className="text-sm text-green-500 mt-2">+7% from previous {timeRange}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text mb-6">Stock vs Demand</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={inventoryStatusData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                        borderColor: '#e0e0e0',
                        borderRadius: '4px',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="stock" fill="#3b82f6" name="Current Stock (%)" />
                    <Bar dataKey="demand" fill="#f59e0b" name="Current Demand (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text mb-4">Low Stock Alert</h3>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-200">Full Cream Milk</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Current Stock: 15%</p>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-primary text-white text-sm rounded-md hover:bg-blue-600 transition-colors">
                        Restock
                      </button>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-200">Paneer</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Current Stock: 20%</p>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-primary text-white text-sm rounded-md hover:bg-blue-600 transition-colors">
                        Restock
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text mb-4">Inventory Turnover</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Milk Products</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">4.2 days</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Cheese & Paneer</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">6.5 days</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div className="bg-secondary h-2.5 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Butter & Ghee</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">12.3 days</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div className="bg-accent h-2.5 rounded-full" style={{ width: '55%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}