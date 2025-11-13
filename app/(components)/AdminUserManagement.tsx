'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';

interface AdminProfile {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  is_admin: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  is_admin: boolean;
  status: 'active' | 'blocked' | 'pending';
}

interface TransactionInput {
  user_id: string;
  type: string;
  total_amount: number;
  amount_paid: number;
  balance: number;
  due_date: string;
  payment_method: string;
}

export default function AdminDashboard() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);

  const [transactionInput, setTransactionInput] = useState<TransactionInput>({
    user_id: '',
    type: '',
    total_amount: 0,
    amount_paid: 0,
    balance: 0,
    due_date: '',
    payment_method: ''
  });
  const [addingTransaction, setAddingTransaction] = useState(false);

  // Fetch admin profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedProfile = localStorage.getItem('userProfile');
        if (!storedProfile) throw new Error('No profile found in localStorage');
        setProfile(JSON.parse(storedProfile));
      } catch (err: any) {
        console.error(err);
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const { data, error } = await supabase.from('users').select('*').order('name');
      if (error) throw error;
      setUsers(data || []);
      setFilteredUsers(data || []);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users
  useEffect(() => {
    if (!searchQuery) setFilteredUsers(users);
    else {
      const q = searchQuery.toLowerCase();
      setFilteredUsers(
        users.filter(
          (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
        )
      );
    }
  }, [searchQuery, users]);

  // Toggle admin
  const toggleAdmin = async (id: string, makeAdmin: boolean) => {
    setUpdating(id);
    try {
      const { error } = await supabase.from('users').update({ is_admin: makeAdmin }).eq('id', id);
      if (error) throw error;
      fetchUsers();
    } catch (err: any) {
      alert(err.message || 'Failed to update role.');
    } finally {
      setUpdating(null);
    }
  };

  // Update status
  const updateStatus = async (id: string, status: 'active' | 'blocked' | 'pending') => {
    setUpdating(id);
    try {
      const { error } = await supabase.from('users').update({ status }).eq('id', id);
      if (error) throw error;
      fetchUsers();
    } catch (err: any) {
      alert(err.message || 'Failed to update status.');
    } finally {
      setUpdating(null);
    }
  };

  const handleTransactionChange = (field: keyof TransactionInput, value: any) => {
    setTransactionInput((prev) => ({ ...prev, [field]: value }));
  };

  const addTransaction = async () => {
    if (!transactionInput.user_id || !transactionInput.type || !transactionInput.total_amount) {
      return alert('Please fill in all required fields.');
    }

    setAddingTransaction(true);
    try {
      const { error } = await supabase.from('financing').insert([
        {
          auth_id: transactionInput.user_id,
          type: transactionInput.type,
          total_amount: transactionInput.total_amount,
          amount_paid: transactionInput.amount_paid,
          balance: transactionInput.balance,
          due_date: transactionInput.due_date,
          payment_method: transactionInput.payment_method,
          status:
            transactionInput.balance === 0
              ? 'Paid'
              : transactionInput.balance < transactionInput.total_amount
              ? 'Partially Paid'
              : 'Pending',
        },
      ]);

      if (error) throw error;

      alert('Transaction added successfully!');
      setTransactionInput({
        user_id: '',
        type: '',
        total_amount: 0,
        amount_paid: 0,
        balance: 0,
        due_date: '',
        payment_method: ''
      });
    } catch (err: any) {
      alert(err.message || 'Failed to add transaction.');
    } finally {
      setAddingTransaction(false);
    }
  };

  return (
    <div className="flex flex-col justify-center p-4 sm:p-8 bg-gray-50 space-y-6">
      {/* Admin Profile */}
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8">
        {loadingProfile ? (
          <p className="text-center text-gray-600">Loading profile...</p>
        ) : profile ? (
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-300 rounded-full shadow-inner mb-3 sm:mb-4" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-gray-600">{profile.email}</p>
            <p className={`mt-1 font-medium ${profile.is_admin ? 'text-blue-700' : 'text-gray-700'}`}>
              {profile.is_admin ? 'Admin' : 'User'}
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-600">No profile data available.</p>
        )}
      </div>

      {/* User Management */}
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 overflow-x-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-0">User Management</h1>
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-800 text-black placeholder-gray-700 w-full sm:w-1/3 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300 text-left"
          />
        </div>

        {loadingUsers ? (
          <p className="text-center text-black">Loading users...</p>
        ) : (
          <table className="w-full table-auto min-w-[600px] text-sm text-center text-black sm:text-base border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 sm:px-4 py-2 border">Name</th>
                <th className="px-2 sm:px-4 py-2 border">Email</th>
                <th className="px-2 sm:px-4 py-2 border">Phone</th>
                <th className="px-2 sm:px-4 py-2 border">Address</th>
                <th className="px-2 sm:px-4 py-2 border">Role</th>
                <th className="px-2 sm:px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b text-black text-center hover:bg-gray-50">
                  <td className="px-2 sm:px-4 py-1">{user.name}</td>
                  <td className="px-2 sm:px-4 py-1">{user.email}</td>
                  <td className="px-2 sm:px-4 py-1">{user.phone || '-'}</td>
                  <td className="px-2 sm:px-4 py-1">{user.address || '-'}</td>
                  <td className="px-2 sm:px-4 py-1">
                    <select
                      className="border border-gray-800 rounded px-2 py-1 w-full text-gray-700"
                      value={user.is_admin ? 'admin' : 'user'}
                      disabled={updating === user.id}
                      onChange={(e) => toggleAdmin(user.id, e.target.value === 'admin')}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-2 sm:px-4 py-1">
                    <select
                      className="border border-gray-800 rounded px-2 py-1 w-full text-gray-700"
                      value={user.status}
                      disabled={updating === user.id}
                      onChange={(e) =>
                        updateStatus(user.id, e.target.value as 'active' | 'blocked' | 'pending')
                      }
                    >
                      <option value="active">Active</option>
                      <option value="blocked">Blocked</option>
                      <option value="pending">Pending</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Financial Transaction */}
      <div className="bg-white rounded-2xl text-center shadow-xl p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Add Financial Transaction</h1>
        <div className="grid  sm:grid-cols-2 gap-4">
          {/* User */}
          <div>
            <label className="block text-black mb-1 font-medium">Select User</label>
            <select
              value={transactionInput.user_id}
              onChange={(e) => handleTransactionChange('user_id', e.target.value)}
              className="border border-gray-800 text-black px-3 py-2 rounded w-full"
            >
              <option value="">Select User</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} - {u.email}
                </option>
              ))}
            </select>
          </div>

          {/* Transaction Type */}
          <div>
            <label className="block text-black mb-1 font-medium">Transaction Type</label>
            <input
              type="text"
              value={transactionInput.type}
              onChange={(e) => handleTransactionChange('type', e.target.value)}
              className="border border-gray-800 text-black px-3 py-2 rounded w-full"
            />
          </div>

          {/* Total Amount */}
          <div>
            <label className="block text-black mb-1 font-medium">Total Amount</label>
            <input
              type="number"
              value={transactionInput.total_amount}
              onChange={(e) =>
                handleTransactionChange('total_amount', parseFloat(e.target.value))
              }
              className="border border-gray-800 text-black px-3 py-2 rounded w-full"
            />
          </div>

          {/* Amount Paid */}
          <div>
            <label className="block text-black mb-1 font-medium">Amount Paid</label>
            <input
              type="number"
              value={transactionInput.amount_paid}
              onChange={(e) => {
                const paid = parseFloat(e.target.value);
                handleTransactionChange('amount_paid', paid);
                handleTransactionChange('balance', transactionInput.total_amount - paid);
              }}
              className="border border-gray-800 text-black px-3 py-2 rounded w-full"
            />
          </div>

          {/* Balance */}
          <div>
            <label className="block text-black mb-1 font-medium">Balance</label>
            <input
              type="number"
              value={transactionInput.balance}
              readOnly
              className="border border-gray-800 text-black px-3 py-2 rounded w-full bg-gray-100"
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-black mb-1 font-medium">Due Date</label>
            <input
              type="date"
              value={transactionInput.due_date}
              onChange={(e) => handleTransactionChange('due_date', e.target.value)}
              className="border border-gray-800 text-black px-3 py-2 rounded w-full"
            />
          </div>

          {/* Payment Method */}
            <div>
            <label className="block text-black mb-1 font-medium">Payment Method</label>
            <select
                value={transactionInput.payment_method}
                onChange={(e) => handleTransactionChange('payment_method', e.target.value)}
                className="border border-gray-800 text-black px-3 py-2 rounded w-full"
            >
                <option value="">Select Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="GCash">GCash</option>
                <option value="Debit">Debit</option>
            </select>
            </div>

        </div>

        <button
          onClick={addTransaction}
          disabled={addingTransaction}
          className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          {addingTransaction ? 'Adding...' : 'Add Transaction'}
        </button>
      </div>
    </div>
  );
}
