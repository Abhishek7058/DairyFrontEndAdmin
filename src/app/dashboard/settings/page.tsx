'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function SettingsPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  
  // Settings state
  const [activeTab, setActiveTab] = useState('general');
  const [notificationEmail, setNotificationEmail] = useState('admin@dairydashboard.com');
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const [autoLogout, setAutoLogout] = useState('30');
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('en');
  const [taxRate, setTaxRate] = useState('5');
  
  // User roles mock data
  const [roles] = useState([
    { id: 1, name: 'Admin', permissions: ['all'] },
    { id: 2, name: 'Manager', permissions: ['view_all', 'edit_products', 'edit_orders', 'view_reports'] },
    { id: 3, name: 'Staff', permissions: ['view_products', 'view_orders', 'update_order_status'] },
    { id: 4, name: 'Delivery', permissions: ['view_assigned_orders', 'update_delivery_status'] }
  ]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleSaveSettings = () => {
    // In a real app, this would save settings to the backend
    alert('Settings saved successfully!');
  };

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
          <button 
            onClick={handleSaveSettings}
            className="px-4 py-2 bg-primary text-white rounded-md bg-blue-600 transition-colors duration-200"
          >
            Save Changes
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 border-b overflow-x-auto">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'general' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
            onClick={() => setActiveTab('general')}
          >
            General
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'notifications' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'users' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
            onClick={() => setActiveTab('users')}
          >
            User Roles
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'backup' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
            onClick={() => setActiveTab('backup')}
          >
            Backup & Security
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'appearance' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
            onClick={() => setActiveTab('appearance')}
          >
            Appearance
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">General Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary" 
                    defaultValue="Dairy Admin Dashboard"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary" 
                    defaultValue="contact@dairydashboard.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="INR">Indian Rupee (₹)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                    <option value="GBP">British Pound (£)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="gu">Gujarati</option>
                    <option value="mr">Marathi</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary" 
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Auto Logout (minutes)</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary" 
                    value={autoLogout}
                    onChange={(e) => setAutoLogout(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Address</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary" 
                  rows={3}
                  defaultValue="123 Dairy Lane, Milk City, 400001"
                ></textarea>
              </div>
            </div>
          )}
          
          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">Notification Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notification Email</label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary" 
                    value={notificationEmail}
                    onChange={(e) => setNotificationEmail(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="emailNotifications" 
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" 
                    checked={emailNotifications}
                    onChange={() => setEmailNotifications(!emailNotifications)}
                  />
                  <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-700">
                    Email Notifications
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="smsNotifications" 
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" 
                    checked={smsNotifications}
                    onChange={() => setSmsNotifications(!smsNotifications)}
                  />
                  <label htmlFor="smsNotifications" className="ml-2 block text-sm text-gray-700">
                    SMS Notifications
                  </label>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-md font-medium text-gray-800 mb-2">Notification Events</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="newOrder" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" defaultChecked />
                      <label htmlFor="newOrder" className="ml-2 block text-sm text-gray-700">
                        New Order Placed
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input type="checkbox" id="lowStock" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" defaultChecked />
                      <label htmlFor="lowStock" className="ml-2 block text-sm text-gray-700">
                        Low Stock Alert
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input type="checkbox" id="deliveryStatus" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" defaultChecked />
                      <label htmlFor="deliveryStatus" className="ml-2 block text-sm text-gray-700">
                        Delivery Status Changes
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input type="checkbox" id="subscriptionRenewal" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" defaultChecked />
                      <label htmlFor="subscriptionRenewal" className="ml-2 block text-sm text-gray-700">
                        Subscription Renewals
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input type="checkbox" id="paymentFailure" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" defaultChecked />
                      <label htmlFor="paymentFailure" className="ml-2 block text-sm text-gray-700">
                        Payment Failures
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* User Roles Settings */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">User Roles & Permissions</h2>
                <button className="px-3 py-1.5 bg-primary text-white text-sm rounded-md hover:bg-blue-600 transition-colors duration-200">
                  Add New Role
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {roles.map((role) => (
                      <tr key={role.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{role.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {role.permissions.join(', ')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-primary hover:text-blue-700 mr-3">Edit</button>
                          {role.name !== 'Admin' && (
                            <button className="text-red-600 hover:text-red-800">Delete</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-md font-medium text-gray-800 mb-3">User Assignment</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Assign roles to users from the user management section.
                </p>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200">
                  Go to User Management
                </button>
              </div>
            </div>
          )}
          
          {/* Backup & Security Settings */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">Backup & Security Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Backup Frequency</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    value={backupFrequency}
                    onChange={(e) => setBackupFrequency(e.target.value)}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                
                <div className="pt-2">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 mr-3">
                    Backup Now
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200">
                    Restore from Backup
                  </button>
                </div>
                
                <div className="pt-6">
                  <h3 className="text-md font-medium text-gray-800 mb-3">Security Settings</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input type="checkbox" id="twoFactor" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" defaultChecked />
                      <label htmlFor="twoFactor" className="ml-2 block text-sm text-gray-700">
                        Enable Two-Factor Authentication
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input type="checkbox" id="ipRestriction" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                      <label htmlFor="ipRestriction" className="ml-2 block text-sm text-gray-700">
                        IP Address Restriction
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input type="checkbox" id="loginAttempts" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" defaultChecked />
                      <label htmlFor="loginAttempts" className="ml-2 block text-sm text-gray-700">
                        Limit Failed Login Attempts
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors duration-200">
                    Reset All Passwords
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">Appearance Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  >
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="purple">Purple</option>
                    <option value="red">Red</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}