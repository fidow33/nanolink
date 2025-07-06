import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Users, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  DollarSign,
  Activity,
  Settings
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { apiClient } from '../../lib/api';
import type { Transaction, User } from '../../lib/supabase';

interface AdminDashboardProps {
  onBack: () => void;
}

export default function AdminDashboard({ onBack }: AdminDashboardProps) {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'transactions' | 'settings'>('overview');

  useEffect(() => {
    if (user?.role === 'admin') {
      loadAdminData();
    }
  }, [user]);

  const loadAdminData = async () => {
    try {
      setLoading(true);
      const [transactionsRes, usersRes, statsRes] = await Promise.all([
        apiClient.getAdminTransactions({ limit: 50 }),
        apiClient.getAdminUsers({ limit: 50 }),
        apiClient.getAdminStats()
      ]);
      
      setTransactions(transactionsRes.transactions || []);
      setUsers(usersRes.users || []);
      setStats(statsRes);
    } catch (error) {
      console.error('Load admin data error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTransactionStatus = async (transactionId: string, status: string, notes?: string) => {
    try {
      await apiClient.updateTransactionStatus(transactionId, status, notes);
      await loadAdminData(); // Refresh data
    } catch (error) {
      console.error('Update transaction status error:', error);
    }
  };

  const handleUpdateUserKyc = async (userId: string, kycStatus: string, notes?: string) => {
    try {
      await apiClient.updateUserKyc(userId, kycStatus, notes);
      await loadAdminData(); // Refresh data
    } catch (error) {
      console.error('Update user KYC error:', error);
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <XCircle className="w-12 h-12 text-red-600 mx-auto mb-3" />
          <h2 className="text-xl font-semibold text-red-900 mb-2">Access Denied</h2>
          <p className="text-red-700">You don't have permission to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-xl p-6 text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-lg bg-white shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-3">
          <img 
            src="/MAIN_-_NANO_STRATEGY_LOGO.pdf__1_-removebg-preview.png" 
            alt="NanoLink Logo" 
            className="w-8 h-8 object-contain"
          />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">NanoLink Admin</h1>
            <p className="text-slate-600">Manage platform operations</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mb-6">
        <div className="flex border-b border-slate-200">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'transactions', label: 'Transactions', icon: TrendingUp },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Total Users</p>
                      <p className="text-2xl font-bold text-blue-900">{stats?.users?.total || 0}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">Active Users</p>
                      <p className="text-2xl font-bold text-green-900">{stats?.users?.active || 0}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-600 text-sm font-medium">Pending KYC</p>
                      <p className="text-2xl font-bold text-yellow-900">{stats?.users?.pending_kyc || 0}</p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-yellow-600" />
                  </div>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">Total Volume</p>
                      <p className="text-2xl font-bold text-purple-900">${(stats?.transactions?.total_volume_30d || 0).toLocaleString()}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-slate-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-slate-900">New user registered from Kenya</span>
                    </div>
                    <span className="text-sm text-slate-600">2 min ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-slate-900">KYC approved for user +256700000002</span>
                    </div>
                    <span className="text-sm text-slate-600">5 min ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-slate-900">Large transaction flagged for review</span>
                    </div>
                    <span className="text-sm text-slate-600">12 min ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">User Management</h3>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Export Users
                  </button>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Country
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          KYC Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Balance
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {users.slice(0, 10).map((userData) => (
                        <tr key={userData.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-slate-900">{userData.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="capitalize text-slate-600">{userData.country}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              userData.kyc_status === 'approved' ? 'bg-green-100 text-green-800' :
                              userData.kyc_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {userData.kyc_status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-slate-900">
                            N/A
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              View
                            </button>
                            {userData.kyc_status === 'pending' && (
                              <button 
                                onClick={() => handleUpdateUserKyc(userData.id, 'approved')}
                                className="text-green-600 hover:text-green-900"
                              >
                                Approve
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Transaction Management</h3>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Export Transactions
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">Completed</p>
                      <p className="text-xl font-bold text-green-900">{stats?.transactions?.completed || 0}</p>
                    </div>
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-600 text-sm font-medium">Pending</p>
                      <p className="text-xl font-bold text-yellow-900">{stats?.transactions?.pending || 0}</p>
                    </div>
                    <AlertCircle className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Today's Volume</p>
                      <p className="text-xl font-bold text-blue-900">${(stats?.transactions?.total_volume_30d || 0).toLocaleString()}</p>
                    </div>
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Transaction ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {transactions.slice(0, 10).map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-mono text-sm text-slate-900">
                              {transaction.id.slice(0, 8)}...
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="capitalize text-slate-600">{transaction.type}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-slate-900">
                            {transaction.from_amount} {transaction.from_currency}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                              transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {transaction.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                            {new Date(transaction.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              View
                            </button>
                            {transaction.status === 'pending' && (
                              <button 
                                onClick={() => handleUpdateTransactionStatus(transaction.id, 'completed')}
                                className="text-green-600 hover:text-green-900"
                              >
                                Approve
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900">Platform Settings</h3>
              
              <div className="grid gap-6">
                <div className="bg-slate-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-slate-900 mb-4">Exchange Rates</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        USDT/KES Rate
                      </label>
                      <input
                        type="number"
                        defaultValue="146"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        BTC/KES Rate
                      </label>
                      <input
                        type="number"
                        defaultValue="6570000"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        ETH/KES Rate
                      </label>
                      <input
                        type="number"
                        defaultValue="365000"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-slate-900 mb-4">Transaction Limits</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Daily Buy Limit (USD)
                      </label>
                      <input
                        type="number"
                        defaultValue="10000"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Daily Sell Limit (USD)
                      </label>
                      <input
                        type="number"
                        defaultValue="10000"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}