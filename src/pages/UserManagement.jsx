import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiPlus, FiEdit, FiTrash2, FiSave, FiX, FiMail, FiBuilding, FiShield, FiEye, FiDollarSign } = FiIcons;

function UserManagement() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Buyer',
      email: 'buyer@retailer.com',
      company: 'Premium Beauty Retailers',
      role: 'buyer',
      tier: 'gold',
      status: 'active',
      joinDate: '2023-08-15',
      totalOrders: 23,
      totalSpent: 12450.75,
      lastOrder: '2024-01-15'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah@beautystore.com',
      company: 'Natural Beauty Store',
      role: 'buyer',
      tier: 'silver',
      status: 'active',
      joinDate: '2023-11-20',
      totalOrders: 15,
      totalSpent: 7890.50,
      lastOrder: '2024-01-12'
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike@organicshop.com',
      company: 'Organic Beauty Shop',
      role: 'buyer',
      tier: 'bronze',
      status: 'inactive',
      joinDate: '2024-01-05',
      totalOrders: 3,
      totalSpent: 1250.25,
      lastOrder: '2024-01-08'
    },
    {
      id: 4,
      name: 'Emma Davis',
      email: 'emma@luxurybeauty.com',
      company: 'Luxury Beauty Co.',
      role: 'buyer',
      tier: 'platinum',
      status: 'active',
      joinDate: '2023-05-10',
      totalOrders: 45,
      totalSpent: 28750.00,
      lastOrder: '2024-01-14'
    }
  ]);

  const [isAddingUser, setIsAddingUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: 'buyer',
    tier: 'bronze',
    status: 'active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    const userData = {
      ...formData,
      id: editingUser ? editingUser.id : Date.now(),
      joinDate: editingUser ? editingUser.joinDate : new Date().toISOString().split('T')[0],
      totalOrders: editingUser ? editingUser.totalOrders : 0,
      totalSpent: editingUser ? editingUser.totalSpent : 0,
      lastOrder: editingUser ? editingUser.lastOrder : null
    };

    if (editingUser) {
      setUsers(prev => prev.map(user => user.id === editingUser.id ? userData : user));
      setEditingUser(null);
    } else {
      setUsers(prev => [...prev, userData]);
      setIsAddingUser(false);
    }

    setFormData({ name: '', email: '', company: '', role: 'buyer', tier: 'bronze', status: 'active' });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      company: user.company,
      role: user.role,
      tier: user.tier,
      status: user.status
    });
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  const handleCancel = () => {
    setIsAddingUser(false);
    setEditingUser(null);
    setFormData({ name: '', email: '', company: '', role: 'buyer', tier: 'bronze', status: 'active' });
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'bronze': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'silver': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'platinum': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-earth-100 text-earth-800 border-earth-200';
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-forest-100 text-forest-800 border-forest-200'
      : 'bg-earth-100 text-earth-800 border-earth-200';
  };

  return (
    <div className="min-h-screen bg-natural-gradient bg-pattern-leaves">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-serif font-bold text-earth-900">User Management</h1>
              <p className="text-earth-600 mt-2">
                Manage buyer accounts and permissions
              </p>
            </div>
            <button
              onClick={() => setIsAddingUser(true)}
              className="bg-forest-600 hover:bg-forest-700 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center space-x-2 shadow-lg"
            >
              <SafeIcon icon={FiPlus} />
              <span>Add User</span>
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-earth-600">Total Users</p>
                <p className="text-2xl font-bold text-earth-900">{users.length}</p>
              </div>
              <SafeIcon icon={FiUsers} className="text-forest-600 text-2xl" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-earth-600">Active Users</p>
                <p className="text-2xl font-bold text-earth-900">
                  {users.filter(u => u.status === 'active').length}
                </p>
              </div>
              <SafeIcon icon={FiShield} className="text-sage-600 text-2xl" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-earth-600">Premium Tiers</p>
                <p className="text-2xl font-bold text-earth-900">
                  {users.filter(u => ['gold', 'platinum'].includes(u.tier)).length}
                </p>
              </div>
              <SafeIcon icon={FiDollarSign} className="text-terracotta-600 text-2xl" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-earth-600">Total Revenue</p>
                <p className="text-2xl font-bold text-earth-900">
                  ${users.reduce((sum, u) => sum + u.totalSpent, 0).toLocaleString()}
                </p>
              </div>
              <SafeIcon icon={FiDollarSign} className="text-earth-600 text-2xl" />
            </div>
          </motion.div>
        </div>

        {/* Add/Edit User Form */}
        {(isAddingUser || editingUser) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 p-6 mb-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-earth-900">
                {editingUser ? 'Edit User' : 'Add New User'}
              </h2>
              <button
                onClick={handleCancel}
                className="text-earth-400 hover:text-earth-600"
              >
                <SafeIcon icon={FiX} className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
                    placeholder="Enter company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
                  >
                    <option value="buyer">Buyer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    Tier
                  </label>
                  <select
                    value={formData.tier}
                    onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                    className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
                  >
                    <option value="bronze">Bronze</option>
                    <option value="silver">Silver</option>
                    <option value="gold">Gold</option>
                    <option value="platinum">Platinum</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-earth-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-earth-300 text-earth-700 rounded-xl hover:bg-earth-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-forest-600 hover:bg-forest-700 text-white rounded-xl transition-colors flex items-center space-x-2"
                >
                  <SafeIcon icon={FiSave} />
                  <span>{editingUser ? 'Update User' : 'Add User'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-earth-200 overflow-hidden"
        >
          <div className="p-6 border-b border-earth-200">
            <h2 className="text-xl font-semibold text-earth-900">All Users</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-earth-50 to-sage-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-earth-700">User</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-earth-700">Company</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-earth-700">Tier</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-earth-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-earth-700">Orders</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-earth-700">Total Spent</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-earth-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-earth-200">
                {users.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gradient-to-r hover:from-sage-25 hover:to-earth-25 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-forest-500 to-forest-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-earth-900">{user.name}</p>
                          <p className="text-sm text-earth-600">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-earth-600">{user.company}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getTierColor(user.tier)}`}>
                        {user.tier.charAt(0).toUpperCase() + user.tier.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(user.status)}`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-earth-600">{user.totalOrders}</td>
                    <td className="px-6 py-4 font-medium text-earth-900">${user.totalSpent.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="p-2 text-earth-600 hover:text-earth-700 hover:bg-earth-50 rounded-lg transition-colors"
                        >
                          <SafeIcon icon={FiEye} />
                        </button>
                        <button
                          onClick={() => handleEdit(user)}
                          className="p-2 text-forest-600 hover:text-forest-700 hover:bg-forest-50 rounded-lg transition-colors"
                        >
                          <SafeIcon icon={FiEdit} />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-2 text-terracotta-600 hover:text-terracotta-700 hover:bg-terracotta-50 rounded-lg transition-colors"
                        >
                          <SafeIcon icon={FiTrash2} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* User Details Modal */}
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-earth-900">User Details</h2>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-earth-400 hover:text-earth-600"
                >
                  <SafeIcon icon={FiX} className="text-xl" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-earth-700">Name</label>
                    <p className="text-earth-900 font-medium">{selectedUser.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-earth-700">Email</label>
                    <p className="text-earth-900">{selectedUser.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-earth-700">Company</label>
                    <p className="text-earth-900">{selectedUser.company}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-earth-700">Join Date</label>
                    <p className="text-earth-900">{new Date(selectedUser.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-earth-700">Tier</label>
                    <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium border ${getTierColor(selectedUser.tier)}`}>
                      {selectedUser.tier.charAt(0).toUpperCase() + selectedUser.tier.slice(1)}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-earth-700">Total Orders</label>
                    <p className="text-earth-900 font-medium">{selectedUser.totalOrders}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-earth-700">Total Spent</label>
                    <p className="text-earth-900 font-medium">${selectedUser.totalSpent.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-earth-700">Last Order</label>
                    <p className="text-earth-900">{selectedUser.lastOrder ? new Date(selectedUser.lastOrder).toLocaleDateString() : 'No orders yet'}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default UserManagement;