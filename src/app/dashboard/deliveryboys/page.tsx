'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

// Mock data for delivery boys
const mockDeliveryBoys = [
  { id: 'DEL001', name: 'Sanjay Yadav', phone: '9876543210', email: 'sanjay.yadav@example.com', address: '123 Worker Colony, Delhi', joinDate: '2023-01-10', status: 'Active', route: 'North Delhi', vehicleType: 'Motorcycle', vehicleNumber: 'DL-5S-AB-1234' },
  { id: 'DEL002', name: 'Manoj Kumar', phone: '8765432109', email: 'manoj.kumar@example.com', address: '456 Sector 18, Noida', joinDate: '2023-02-15', status: 'Active', route: 'Noida Sector 18-30', vehicleType: 'Scooter', vehicleNumber: 'UP-16-CD-5678' },
  { id: 'DEL003', name: 'Ravi Sharma', phone: '7654321098', email: 'ravi.sharma@example.com', address: '789 MG Road, Gurgaon', joinDate: '2023-03-05', status: 'Inactive', route: 'Gurgaon Central', vehicleType: 'Bicycle', vehicleNumber: 'N/A' },
  { id: 'DEL004', name: 'Prakash Verma', phone: '6543210987', email: 'prakash.verma@example.com', address: '234 Rohini, Delhi', joinDate: '2023-04-20', status: 'Active', route: 'Rohini', vehicleType: 'Motorcycle', vehicleNumber: 'DL-7S-EF-9012' },
  { id: 'DEL005', name: 'Sunil Gupta', phone: '5432109876', email: 'sunil.gupta@example.com', address: '567 Dwarka, Delhi', joinDate: '2023-05-12', status: 'Active', route: 'Dwarka', vehicleType: 'Motorcycle', vehicleNumber: 'DL-8S-GH-3456' },
  { id: 'DEL006', name: 'Anil Patel', phone: '4321098765', email: 'anil.patel@example.com', address: '890 Indirapuram, Ghaziabad', joinDate: '2023-06-25', status: 'Inactive', route: 'Indirapuram', vehicleType: 'Scooter', vehicleNumber: 'UP-14-IJ-7890' },
  { id: 'DEL007', name: 'Vijay Singh', phone: '3210987654', email: 'vijay.singh@example.com', address: '123 Vaishali, Ghaziabad', joinDate: '2023-07-18', status: 'Active', route: 'Vaishali', vehicleType: 'Motorcycle', vehicleNumber: 'UP-14-KL-1234' },
  { id: 'DEL008', name: 'Deepak Mishra', phone: '2109876543', email: 'deepak.mishra@example.com', address: '456 Greater Noida', joinDate: '2023-08-30', status: 'Active', route: 'Greater Noida West', vehicleType: 'Motorcycle', vehicleNumber: 'UP-16-MN-5678' },
];

export default function DeliveryBoysPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [deliveryBoys, setDeliveryBoys] = useState(mockDeliveryBoys);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const [filterStatus, setFilterStatus] = useState('');
  const [filterRoute, setFilterRoute] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  interface DeliveryBoy {
    id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    joinDate: string;
    status: string;
    route: string;
    vehicleType: string;
    vehicleNumber: string;
  }

  const [currentDeliveryBoy, setCurrentDeliveryBoy] = useState<DeliveryBoy | null>(null);
  const [newDeliveryBoy, setNewDeliveryBoy] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    status: 'Active',
    route: '',
    vehicleType: 'Motorcycle',
    vehicleNumber: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Get unique routes for filter dropdown
  const routes = [...new Set(mockDeliveryBoys.map(boy => boy.route))];

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle sort
  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Handle status filter
  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  };

  // Handle route filter
  const handleRouteFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterRoute(e.target.value);
  };

  // Open add modal
  const openAddModal = () => {
    setNewDeliveryBoy({
      id: `DEL${String(deliveryBoys.length + 1).padStart(3, '0')}`,
      name: '',
      phone: '',
      email: '',
      address: '',
      status: 'Active',
      route: '',
      vehicleType: 'Motorcycle',
      vehicleNumber: ''
    });
    setIsAddModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (deliveryBoy: DeliveryBoy) => {
    setCurrentDeliveryBoy(deliveryBoy);
    setIsEditModalOpen(true);
  };

  // Handle add delivery boy
  const handleAddDeliveryBoy = () => {
    const today = new Date();
    const joinDate = today.toISOString().split('T')[0];
    
    const deliveryBoyToAdd = {
      ...newDeliveryBoy,
      joinDate
    };
    
    setDeliveryBoys([...deliveryBoys, deliveryBoyToAdd]);
    setIsAddModalOpen(false);
  };

  // Handle edit delivery boy
  const handleEditDeliveryBoy = () => {
    if (!currentDeliveryBoy) return;
    
    const updatedDeliveryBoys = deliveryBoys.map(boy => 
      boy.id === currentDeliveryBoy.id ? currentDeliveryBoy : boy
    );
    
    setDeliveryBoys(updatedDeliveryBoys);
    setIsEditModalOpen(false);
    setCurrentDeliveryBoy(null);
  };

  // Handle delete delivery boy
  const handleDeleteDeliveryBoy = (id: string) => {
    if (window.confirm('Are you sure you want to delete this delivery boy?')) {
      const updatedDeliveryBoys = deliveryBoys.filter(boy => boy.id !== id);
      setDeliveryBoys(updatedDeliveryBoys);
    }
  };

  // Filter and sort delivery boys
  const filteredDeliveryBoys = deliveryBoys
    .filter(boy => {
      const matchesSearch = 
        boy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        boy.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        boy.phone.includes(searchTerm) ||
        boy.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === '' || boy.status === filterStatus;
      const matchesRoute = filterRoute === '' || boy.route === filterRoute;
      
      return matchesSearch && matchesStatus && matchesRoute;
    })
    .sort((a, b) => {
      if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-dark-text">Delivery Boys</h1>
          <button 
            onClick={openAddModal}
            className="px-4 py-2 bg-primary text-white rounded-md bg-blue-600 transition-colors duration-200"
          >
            Add New Delivery Boy
          </button>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search delivery boys..."
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

            <div className="w-full md:w-48 mr-2">
              <select
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                value={filterStatus}
                onChange={handleStatusFilter}
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="w-full md:w-48">
              <select
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                value={filterRoute}
                onChange={handleRouteFilter}
              >
                <option value="">All Routes</option>
                {routes.map(route => (
                  <option key={route} value={route}>{route}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-border">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('id')}
                  >
                    ID {sortConfig.key === 'id' && (
                      <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('name')}
                  >
                    Name {sortConfig.key === 'name' && (
                      <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('phone')}
                  >
                    Phone {sortConfig.key === 'phone' && (
                      <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('route')}
                  >
                    Route {sortConfig.key === 'route' && (
                      <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('vehicleType')}
                  >
                    Vehicle {sortConfig.key === 'vehicleType' && (
                      <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('status')}
                  >
                    Status {sortConfig.key === 'status' && (
                      <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-dark-card divide-y divide-gray-200 dark:divide-dark-border">
                {filteredDeliveryBoys.map((boy) => (
                  <tr key={boy.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-dark-text">
                      {boy.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {boy.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {boy.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {boy.route}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {boy.vehicleType} {boy.vehicleNumber !== 'N/A' && `(${boy.vehicleNumber})`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${boy.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {boy.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openEditModal(boy)}
                        className="text-primary hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteDeliveryBoy(boy.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
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
      </div>

      {/* Add Delivery Boy Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-card rounded-lg p-8 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-dark-text">Add New Delivery Boy</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ID</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  value={newDeliveryBoy.id}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  value={newDeliveryBoy.name}
                  onChange={(e) => setNewDeliveryBoy({...newDeliveryBoy, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  value={newDeliveryBoy.phone}
                  onChange={(e) => setNewDeliveryBoy({...newDeliveryBoy, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  value={newDeliveryBoy.email}
                  onChange={(e) => setNewDeliveryBoy({...newDeliveryBoy, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  value={newDeliveryBoy.address}
                  onChange={(e) => setNewDeliveryBoy({...newDeliveryBoy, address: e.target.value})}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Route</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  value={newDeliveryBoy.route}
                  onChange={(e) => setNewDeliveryBoy({...newDeliveryBoy, route: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vehicle Type</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  value={newDeliveryBoy.vehicleType}
                  onChange={(e) => setNewDeliveryBoy({...newDeliveryBoy, vehicleType: e.target.value})}
                >
                  <option value="Motorcycle">Motorcycle</option>
                  <option value="Scooter">Scooter</option>
                  <option value="Bicycle">Bicycle</option>
                  <option value="Car">Car</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vehicle Number</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  value={newDeliveryBoy.vehicleNumber}
                  onChange={(e) => setNewDeliveryBoy({...newDeliveryBoy, vehicleNumber: e.target.value})}
                  placeholder={newDeliveryBoy.vehicleType === 'Bicycle' ? 'N/A' : 'Enter vehicle number'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  value={newDeliveryBoy.status}
                  onChange={(e) => setNewDeliveryBoy({...newDeliveryBoy, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 border border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDeliveryBoy}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Add Delivery Boy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Delivery Boy Modal */}
      {isEditModalOpen && currentDeliveryBoy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-card rounded-lg p-8 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-dark-text">Edit Delivery Boy</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ID</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  value={currentDeliveryBoy.id}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  value={currentDeliveryBoy.name}
                  onChange={(e) => setCurrentDeliveryBoy({...currentDeliveryBoy, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  value={currentDeliveryBoy.phone}
                  onChange={(e) => setCurrentDeliveryBoy({...currentDeliveryBoy, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  value={currentDeliveryBoy.email}
                  onChange={(e) => setCurrentDeliveryBoy({...currentDeliveryBoy, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  value={currentDeliveryBoy.address}
                  onChange={(e) => setCurrentDeliveryBoy({...currentDeliveryBoy, address: e.target.value})}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Route</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  value={currentDeliveryBoy.route}
                  onChange={(e) => setCurrentDeliveryBoy({...currentDeliveryBoy, route: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vehicle Type</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  value={currentDeliveryBoy.vehicleType}
                  onChange={(e) => setCurrentDeliveryBoy({...currentDeliveryBoy, vehicleType: e.target.value})}
                >
                  <option value="Motorcycle">Motorcycle</option>
                  <option value="Scooter">Scooter</option>
                  <option value="Bicycle">Bicycle</option>
                  <option value="Car">Car</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vehicle Number</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  value={currentDeliveryBoy.vehicleNumber}
                  onChange={(e) => setCurrentDeliveryBoy({...currentDeliveryBoy, vehicleNumber: e.target.value})}
                  placeholder={currentDeliveryBoy.vehicleType === 'Bicycle' ? 'N/A' : 'Enter vehicle number'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  value={currentDeliveryBoy.status}
                  onChange={(e) => setCurrentDeliveryBoy({...currentDeliveryBoy, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 border border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Cancel
              </button>
              <button
                onClick={handleEditDeliveryBoy}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Update Delivery Boy
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}