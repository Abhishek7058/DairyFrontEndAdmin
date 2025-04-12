'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

// Mock data for subscription plans
const mockSubscriptions = [
  { id: 'SUB001', name: 'Daily Essentials', duration: '30 days', price: 899, products: ['Milk (500ml)', 'Curd (200g)'], status: 'Active', subscribers: 45 },
  { id: 'SUB002', name: 'Family Pack', duration: '30 days', price: 1499, products: ['Milk (1L)', 'Curd (400g)', 'Paneer (200g)'], status: 'Active', subscribers: 32 },
  { id: 'SUB003', name: 'Premium Dairy', duration: '30 days', price: 2199, products: ['Milk (1L)', 'Curd (400g)', 'Paneer (200g)', 'Ghee (200ml)'], status: 'Active', subscribers: 18 },
  { id: 'SUB004', name: 'Weekend Special', duration: '90 days', price: 1299, products: ['Flavored Yogurt (100g)', 'Cheese Slices (10pcs)'], status: 'Inactive', subscribers: 0 },
  { id: 'SUB005', name: 'Office Pack', duration: '15 days', price: 699, products: ['Milk (500ml)', 'Buttermilk (200ml)'], status: 'Active', subscribers: 12 },
];

// Mock data for customer subscriptions
const mockCustomerSubscriptions = [
  { id: 'CSUB001', customer: 'Rahul Sharma', plan: 'Daily Essentials', startDate: '2023-10-15', endDate: '2023-11-14', status: 'Active' },
  { id: 'CSUB002', customer: 'Priya Patel', plan: 'Family Pack', startDate: '2023-10-10', endDate: '2023-11-09', status: 'Active' },
  { id: 'CSUB003', customer: 'Amit Singh', plan: 'Premium Dairy', startDate: '2023-09-25', endDate: '2023-10-24', status: 'Expiring Soon' },
  { id: 'CSUB004', customer: 'Neha Gupta', plan: 'Daily Essentials', startDate: '2023-10-05', endDate: '2023-11-04', status: 'Active' },
  { id: 'CSUB005', customer: 'Vikram Joshi', plan: 'Office Pack', startDate: '2023-10-01', endDate: '2023-10-15', status: 'Expired' },
];

export default function SubscriptionsPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('plans'); // 'plans' or 'customers'
  const [subscriptions] = useState(mockSubscriptions);
  const [customerSubscriptions] = useState(mockCustomerSubscriptions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle status filter
  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  // Filter subscriptions based on search and status
  const filteredSubscriptions = subscriptions.filter(subscription => {
    const matchesSearch = subscription.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscription.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || subscription.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filter customer subscriptions based on search and status
  const filteredCustomerSubscriptions = customerSubscriptions.filter(subscription => {
    const matchesSearch = subscription.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscription.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscription.plan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || subscription.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-dark-text">Subscription Management</h1>
          <button className="px-4 py-2 bg-primary text-white rounded-md bg-blue-600 transition-colors duration-200">
            {activeTab === 'plans' ? 'Create New Plan' : 'Add Customer Subscription'}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 border-b dark:border-dark-border">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'plans' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 dark:text-gray-400'}`}
            onClick={() => setActiveTab('plans')}
          >
            Subscription Plans
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'customers' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 dark:text-gray-400'}`}
            onClick={() => setActiveTab('customers')}
          >
            Customer Subscriptions
          </button>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={activeTab === 'plans' ? "Search subscription plans..." : "Search customer subscriptions..."}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                value={searchTerm}
                onChange={handleSearch}
              />
              <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <div className="w-full md:w-48">
              <select
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                value={statusFilter}
                onChange={handleStatusFilter}
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                {activeTab === 'customers' && (
                  <>
                    <option value="Expiring Soon">Expiring Soon</option>
                    <option value="Expired">Expired</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Subscription Plans Table */}
          {activeTab === 'plans' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-border">
                <thead className="bg-gray-50 dark:bg-dark-card">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Duration</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Products</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Subscribers</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-dark-card divide-y divide-gray-200 dark:divide-dark-border">
                  {filteredSubscriptions.map((subscription) => (
                    <tr key={subscription.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-dark-text">{subscription.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{subscription.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{subscription.duration}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">₹{subscription.price}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        <ul className="list-disc pl-5">
                          {subscription.products.map((product, index) => (
                            <li key={index}>{product}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${subscription.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {subscription.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{subscription.subscribers}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primary hover:text-blue-700 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-800">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Customer Subscriptions Table */}
          {activeTab === 'customers' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-border">
                <thead className="bg-gray-50 dark:bg-dark-card">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Plan</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Start Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">End Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-dark-card divide-y divide-gray-200 dark:divide-dark-border">
                  {filteredCustomerSubscriptions.map((subscription) => (
                    <tr key={subscription.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-dark-text">{subscription.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{subscription.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{subscription.plan}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{subscription.startDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{subscription.endDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${subscription.status === 'Active' ? 'bg-green-100 text-green-800' : subscription.status === 'Expiring Soon' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                          {subscription.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primary hover:text-blue-700 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-800">Cancel</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}