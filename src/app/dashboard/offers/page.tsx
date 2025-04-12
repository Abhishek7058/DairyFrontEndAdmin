'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

// Mock data for offers
const mockOffers = [
  { 
    id: 'OFF001', 
    title: 'Welcome Discount', 
    description: 'Get 10% off on your first order', 
    discountType: 'Percentage', 
    discountValue: 10, 
    minOrderValue: 200, 
    startDate: '2023-10-01', 
    endDate: '2023-12-31', 
    status: 'Active',
    usageLimit: 1,
    usageCount: 45,
    applicableProducts: ['All Products']
  },
  { 
    id: 'OFF002', 
    title: 'Festival Special', 
    description: 'Flat ₹50 off on orders above ₹500', 
    discountType: 'Fixed', 
    discountValue: 50, 
    minOrderValue: 500, 
    startDate: '2023-10-15', 
    endDate: '2023-11-15', 
    status: 'Active',
    usageLimit: 0,
    usageCount: 78,
    applicableProducts: ['Ghee', 'Paneer', 'Cheese']
  },
  { 
    id: 'OFF003', 
    title: 'Weekend Offer', 
    description: '15% off on all dairy products', 
    discountType: 'Percentage', 
    discountValue: 15, 
    minOrderValue: 0, 
    startDate: '2023-10-07', 
    endDate: '2023-12-31', 
    status: 'Active',
    usageLimit: 0,
    usageCount: 120,
    applicableProducts: ['All Products']
  },
  { 
    id: 'OFF004', 
    title: 'Bulk Purchase Discount', 
    description: '20% off on orders above ₹1000', 
    discountType: 'Percentage', 
    discountValue: 20, 
    minOrderValue: 1000, 
    startDate: '2023-09-01', 
    endDate: '2023-10-31', 
    status: 'Expired',
    usageLimit: 0,
    usageCount: 65,
    applicableProducts: ['All Products']
  },
  { 
    id: 'OFF005', 
    title: 'Subscription Discount', 
    description: 'Get ₹100 off on any subscription plan', 
    discountType: 'Fixed', 
    discountValue: 100, 
    minOrderValue: 0, 
    startDate: '2023-10-01', 
    endDate: '2023-12-31', 
    status: 'Active',
    usageLimit: 1,
    usageCount: 32,
    applicableProducts: ['Subscription Plans']
  },
];

export default function OffersPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [offers, setOffers] = useState(mockOffers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  interface Offer {
    id: string;
    title: string;
    description: string;
    discountType: 'Percentage' | 'Fixed';
    discountValue: number;
    minOrderValue: number;
    startDate: string;
    endDate: string;
    status: 'Active' | 'Expired' | 'Scheduled';
    usageLimit: number;
    usageCount: number;
    applicableProducts: string[];
  }

  // Add handler for creating new offer
  const handleCreateOffer = (newOffer: Omit<Offer, 'id' | 'usageCount'>) => {
    setOffers([...offers, { ...newOffer, id: `OFF${offers.length + 1}`.padStart(6, '0'), usageCount: 0 }]);
    setShowCreateModal(false);
  };

  // Add handler for deleting offer
  const handleDeleteOffer = (offerId: string) => {
    setOffers(offers.filter(offer => offer.id !== offerId));
  };

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

  // Filter offers based on search and status
  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || offer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-dark-text">Offers Management</h1>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-primary text-white rounded-md bg-blue-600 transition-colors duration-200"
          >
            Create New Offer
          </button>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search offers..."
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
                <option value="Expired">Expired</option>
                <option value="Scheduled">Scheduled</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-border">
              <thead className="bg-gray-50 dark:bg-dark-card">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Discount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Min Order</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Validity</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Usage</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-dark-card divide-y divide-gray-200 dark:divide-dark-border">
                {filteredOffers.map((offer) => (
                  <tr key={offer.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-dark-text">{offer.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-dark-text">{offer.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{offer.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {offer.discountType === 'Percentage' ? `${offer.discountValue}%` : `₹${offer.discountValue}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {offer.minOrderValue > 0 ? `₹${offer.minOrderValue}` : 'None'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {offer.startDate} to {offer.endDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${offer.status === 'Active' ? 'bg-green-100 text-green-800' : offer.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                        {offer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {offer.usageCount} {offer.usageLimit > 0 ? `/ ${offer.usageLimit}` : ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary hover:text-blue-700 mr-3">Edit</button>
                      <button 
                        onClick={() => handleDeleteOffer(offer.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Offer Modal (simplified) */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-dark-card rounded-lg shadow-xl p-6 w-full max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text">Create New Offer</h3>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const newOffer = {
                  title: formData.get('title') as string,
                  description: formData.get('description') as string,
                  discountType: formData.get('discountType') as 'Percentage' | 'Fixed',
                  discountValue: Number(formData.get('discountValue')),
                  minOrderValue: Number(formData.get('minOrderValue')),
                  startDate: formData.get('startDate') as string,
                  endDate: formData.get('endDate') as string,
                  status: 'Active' as const,
                  usageLimit: Number(formData.get('usageLimit')),
                  usageCount: 0,
                  applicableProducts: [formData.get('applicableProducts') as string]
                };
                handleCreateOffer(newOffer);
              }}>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Offer Title</label>
                      <input 
                        type="text" 
                        name="title"
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary" 
                        placeholder="Enter offer title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Discount Type</label>
                      <select 
                        name="discountType"
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                      >
                        <option value="Percentage">Percentage</option>
                        <option value="Fixed">Fixed Amount</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Discount Value</label>
                      <input 
                        type="number" 
                        name="discountValue"
                        required
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary" 
                        placeholder="Enter discount value"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Minimum Order Value</label>
                      <input 
                        type="number" 
                        name="minOrderValue"
                        required
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary" 
                        placeholder="Enter minimum order value"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                      <input 
                        type="date" 
                        name="startDate"
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                      <input 
                        type="date" 
                        name="endDate"
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Usage Limit</label>
                      <input 
                        type="number" 
                        name="usageLimit"
                        required
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary" 
                        placeholder="Enter usage limit (0 for unlimited)"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                    <textarea 
                      name="description"
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary" 
                      rows={3}
                      placeholder="Enter offer description"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Applicable Products</label>
                    <select 
                      name="applicableProducts"
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    >
                      <option value="All Products">All Products</option>
                      <option value="Selected Products">Selected Products</option>
                      <option value="Subscription Plans">Subscription Plans</option>
                    </select>
                  </div>
                  <div className="flex justify-end space-x-3 pt-4 border-t dark:border-dark-border">
                    <button 
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="px-4 py-2 border border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                    >
                      Create Offer
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}