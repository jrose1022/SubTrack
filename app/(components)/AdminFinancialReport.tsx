'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface FinanceRecord {
  id?: number;
  total_amount: number;
  amount_paid: number;
  balance: number;
  type: string;
  status: string;
  start_date: string;
  due_date: string;
  payment_method: string;
  created_at: string;
  auth_id: string;
}

interface UserRecord {
  id: number;
  name: string;
  email: string;
  auth_id: string;
}

export default function AdminFinancialReport() {
  const [financeData, setFinanceData] = useState<FinanceRecord[]>([]);
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [applyToAll, setApplyToAll] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [type, setType] = useState<string>('Monthly Dues');

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  // Manage User Payments Modal
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedModalUser, setSelectedModalUser] = useState<UserRecord | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<FinanceRecord | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);

  

  // Fetch finance and users data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: finance } = await supabase.from('financing').select('*');
      const { data: usersData } = await supabase.from('users').select('*');

      if (finance) {
        setFinanceData(finance);
        const income = finance.reduce((sum, r) => sum + (Number(r.amount_paid) || 0), 0);
        const balance = finance.reduce((sum, r) => sum + (Number(r.balance) || 0), 0);
        setTotalIncome(income);
        setTotalBalance(balance);
      }
      if (usersData) setUsers(usersData);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Monthly summary
  const monthlyData = financeData.reduce((acc: any, row) => {
    const month = new Date(row.start_date).toLocaleString('default', { month: 'long' });
    if (!acc[month]) acc[month] = { income: 0, balance: 0 };
    acc[month].income += Number(row.amount_paid) || 0;
    acc[month].balance += Number(row.balance) || 0;
    return acc;
  }, {});

  const totalExpenses = totalIncome - totalBalance;

  // Add Balance Transaction
  const handleAddBalanceTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyToAll && !selectedUser) {
      alert('Please select a user or choose "Apply to All Users".');
      return;
    }
    if (totalAmount <= 0) {
      alert('Please enter a valid balance amount.');
      return;
    }

    const startDate = new Date().toISOString().split('T')[0];
    const dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + 1);

    const targetUsers = applyToAll ? users.map((u) => u.auth_id) : [selectedUser];

    const newTransactions = targetUsers.map((auth_id) => ({
      auth_id,
      total_amount: totalAmount,
      amount_paid: 0,
      balance: totalAmount,
      type,
      status: 'Unpaid',
      payment_method: 'Pending',
      start_date: startDate,
      due_date: dueDate.toISOString().split('T')[0],
    }));

    const { error } = await supabase.from('financing').insert(newTransactions);

    if (error) {
      alert(`Error adding balance transactions: ${error.message}`);
    } else {
      alert(applyToAll ? 'Balance added for all users!' : 'Balance added for selected user!');
      setShowForm(false);
      window.location.reload();
    }
  };

  // Open user modal
  const openUserModal = (user: UserRecord) => {
    setSelectedModalUser(user);
    setSelectedTransaction(null);
    setPaymentAmount(0);
    setShowUserModal(true);
  };

  // Submit payment
 // Add this state inside your component
const [paymentMethod, setPaymentMethod] = useState<string>('Cash');

// Update handlePaymentSubmit to include payment_method
const handlePaymentSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!selectedTransaction) return;

  const newAmountPaid = Number(selectedTransaction.amount_paid) + Number(paymentAmount);
  const newBalance = Number(selectedTransaction.total_amount) - newAmountPaid;

  const { error } = await supabase
    .from('financing')
    .update({
      amount_paid: newAmountPaid,
      balance: newBalance,
      status: newBalance === 0 ? 'Paid' : 'Partial',
      payment_method: paymentMethod, // <-- add method here
    })
    .eq('id', selectedTransaction.id);

  if (error) {
    alert(`Error updating payment: ${error.message}`);
  } else {
    alert('Payment updated!');
    setSelectedTransaction(null);
    setPaymentAmount(0);
    setPaymentMethod('Cash');
    const { data: updatedFinance } = await supabase.from('financing').select('*');
    if (updatedFinance) setFinanceData(updatedFinance);
  }
};


  const userTransactions = selectedModalUser
    ? financeData.filter((f) => f.auth_id === selectedModalUser.auth_id)
    : [];

  return (
    <div className="w-full sm:w-[90%] lg:w-[75%] min-h-[80vh] bg-white/90 rounded-2xl shadow-lg p-6 sm:p-8 text-gray-900 mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Financial Report Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="p-6 bg-green-100 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-green-700">Total Income</h2>
          <p className="text-2xl font-bold text-green-900 mt-2">₱{totalIncome.toLocaleString()}</p>
        </div>
        <div className="p-6 bg-red-100 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-red-700">Total Expenses</h2>
          <p className="text-2xl font-bold text-red-900 mt-2">₱{totalExpenses.toLocaleString()}</p>
        </div>
        <div className="p-6 bg-blue-100 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-blue-700">Total Balance</h2>
          <p className="text-2xl font-bold text-blue-900 mt-2">₱{totalBalance.toLocaleString()}</p>
        </div>
      </div>

      {/* Add Balance Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
        >
          Add New Balance Transaction
        </button>
        <button
          onClick={() => setShowUserModal(true)}
          className="ml-4 px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
        >
          Manage User Payments
        </button>
      </div>

      {/* Monthly Breakdown Table */}
      <div className="mt-6 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Monthly Breakdown</h2>
        <table className="min-w-full bg-white border border-gray-300 rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="py-2 px-3 border-b text-left">Month</th>
              <th className="py-2 px-3 border-b text-left">Income</th>
              <th className="py-2 px-3 border-b text-left">Expenses</th>
              <th className="py-2 px-3 border-b text-left">Balance</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(monthlyData).map(([month, values]: any) => (
              <tr key={month} className="border-b hover:bg-gray-50">
                <td className="py-2 px-3">{month}</td>
                <td className="py-2 px-3 text-green-700">₱{values.income.toLocaleString()}</td>
                <td className="py-2 px-3 text-red-700">
                  ₱{(values.income - values.balance).toLocaleString()}
                </td>
                <td className="py-2 px-3 text-blue-700">₱{values.balance.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Balance Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Balance Transaction</h2>
            <form onSubmit={handleAddBalanceTransaction} className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={applyToAll}
                  onChange={(e) => setApplyToAll(e.target.checked)}
                  id="applyToAll"
                />
                <label htmlFor="applyToAll" className="text-gray-700">
                  Apply to All Users
                </label>
              </div>

              {!applyToAll && (
                <div>
                  <label className="block text-gray-700 mb-1">Select User</label>
                  <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="w-full border rounded-lg p-2"
                  >
                    <option value="">-- Choose User --</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.auth_id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-gray-700 mb-1">Transaction Type</label>
                <input
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full border rounded-lg p-2"
                  placeholder="e.g. Monthly Dues"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Balance Amount</label>
                <input
                  type="number"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(Number(e.target.value))}
                  className="w-full border rounded-lg p-2"
                  placeholder="Enter amount"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Add Balance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Payment Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-start pt-20 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedModalUser ? `Transactions for ${selectedModalUser.name}` : 'Select User'}
              </h2>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => { setShowUserModal(false); setSelectedModalUser(null); }}
              >
                ✖
              </button>
            </div>

            {!selectedModalUser && (
              <div className="space-y-2">
                {users.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => openUserModal(user)}
                    className="w-full text-left px-4 py-2 border rounded-lg hover:bg-gray-100"
                  >
                    {user.name} ({user.email})
                  </button>
                ))}
              </div>
            )}

            {selectedModalUser && (
              <div className="space-y-4">
                {userTransactions.length === 0 ? (
                  <p className="text-gray-600">No transactions for this user.</p>
                ) : (
                  <table className="min-w-full border border-gray-300 rounded-xl overflow-hidden">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-3 border-b">Type</th>
                        <th className="py-2 px-3 border-b">Total</th>
                        <th className="py-2 px-3 border-b">Paid</th>
                        <th className="py-2 px-3 border-b">Balance</th>
                        <th className="py-2 px-3 border-b">Status</th>
                        <th className="py-2 px-3 border-b">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userTransactions.map((tx) => (
                        <tr key={tx.id} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-3">{tx.type}</td>
                          <td className="py-2 px-3">₱{tx.total_amount.toLocaleString()}</td>
                          <td className="py-2 px-3 text-green-700">₱{tx.amount_paid.toLocaleString()}</td>
                          <td className="py-2 px-3 text-blue-700">₱{tx.balance.toLocaleString()}</td>
                          <td className="py-2 px-3">{tx.status}</td>
                          <td className="py-2 px-3">
                            {tx.balance > 0 && (
                              <button
                                className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                onClick={() => { setSelectedTransaction(tx); setPaymentAmount(0); }}
                              >
                                Pay
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

               

{/* Payment Form */}
{selectedTransaction && (
  <form onSubmit={handlePaymentSubmit} className="mt-4 space-y-2">
    <p>
      Paying for: <strong>{selectedTransaction.type}</strong> | Balance: ₱{selectedTransaction.balance.toLocaleString()}
    </p>
    <input
      type="number"
      value={paymentAmount}
      onChange={(e) => setPaymentAmount(Number(e.target.value))}
      placeholder="Enter payment amount"
      min={1}
      max={selectedTransaction.balance}
      required
      className="w-full border rounded-lg p-2"
    />
    <div>
      <label className="block text-gray-700 mb-1">Payment Method</label>
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="w-full border rounded-lg p-2"
        required
      >
        <option value="Cash">Cash</option>
        <option value="Bank Transfer">Bank Transfer</option>
        <option value="GCash">GCash</option>
        <option value="Credit Card">Credit Card</option>
      </select>
    </div>
    <div className="flex justify-end gap-2">
      <button
        type="button"
        className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
        onClick={() => setSelectedTransaction(null)}
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Submit Payment
      </button>
    </div>
  </form>
)}

                
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
