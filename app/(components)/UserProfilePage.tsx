'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';

interface UserProfile {
  name: string;
  address?: string;
  phone?: string;
  email: string;
  auth_id: string;
}

interface FinancingRecord {
  id: string;
  type: string;
  status: string;
  total_amount: number;
  amount_paid: number;
  balance: number;
  due_date: string;
  payment_method: string;
}

export default function UserProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [transactions, setTransactions] = useState<FinancingRecord[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [error, setError] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: authData, error: authError } = await supabase.auth.getUser();
        if (authError) throw authError;
        if (!authData.user) throw new Error('No user logged in');

        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('name, address, phone, email, auth_id')
          .eq('auth_id', authData.user.id)
          .maybeSingle();

        if (userError) throw userError;
        if (!userData) throw new Error('Profile not found');

        setProfile(userData);
      } catch (err: any) {
        console.error('Profile fetch error:', err);
        setError(err.message || 'Failed to fetch profile');
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (!profile?.auth_id) {
      setLoadingTransactions(false);
      return;
    }

    const fetchTransactions = async () => {
      setLoadingTransactions(true);
      try {
        const { data, error: txError } = await supabase
          .from('financing')
          .select('*')
          .eq('auth_id', profile.auth_id)
          .order('due_date', { ascending: false });

        if (txError) throw txError;

        setTransactions(data || []);
      } catch (err: any) {
        console.error('Transactions fetch error:', err);
        setError(err.message || 'Failed to fetch transactions');
      } finally {
        setLoadingTransactions(false);
      }
    };

    fetchTransactions();
  }, [profile]);

  const formatCurrency = (amount: number) => `₱${amount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`;
  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-200 text-green-900';
      case 'Partially Paid': return 'bg-yellow-200 text-yellow-900';
      case 'Overdue': return 'bg-red-200 text-red-900';
      default: return 'bg-gray-200 text-gray-900';
    }
  };

  if (loadingProfile) return <p className="text-center mt-8 text-black">Loading profile...</p>;
  if (error) return <p className="text-center mt-8 text-red-600">{error}</p>;
  if (!profile) return <p className="text-center mt-8 text-black">No profile found.</p>;

  return (
    <div className="flex flex-col items-center sm:p-8 min-h-screen w-full space-y-8 text-black ">
      {/* PROFILE CARD */}
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl p-6 border border-gray-300">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-x-0 sm:space-x-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex-shrink-0 shadow-inner mb-4 sm:mb-0" />
          <div className="flex-grow text-center sm:text-left">
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className="text-sm mt-1">{profile.email}</p>
          </div>
        </div>
        <hr className="my-4 border-gray-300" />
        <div className="space-y-2 text-sm sm:text-base">
          <div className="flex justify-between">
            <p className="font-medium">Address:</p>
            <p>{profile.address || '-'}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Phone:</p>
            <p>{profile.phone || '-'}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">User ID:</p>
            <p className="truncate text-xs">{profile.auth_id}</p>
          </div>
        </div>
      </div>

      {/* TRANSACTIONS */}
      <div className="w-full max-w-3xl space-y-6">
        <h2 className="text-2xl font-bold text-center sm:text-left">Transaction History</h2>

        {loadingTransactions && <p>Loading transactions...</p>}
        {!loadingTransactions && transactions.length === 0 && <p>No transactions found.</p>}

        {transactions.map((r) => (
          <div key={r.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-300">
            {/* HEADER */}
            <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-300">
              <div>
                <h3 className="text-xl font-bold">{r.type}</h3>
                <p className="text-sm mt-1">ID: {r.id.substring(0, 8)}...</p>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase ${getStatusBadge(r.status)}`}>
                {r.status}
              </span>
            </div>

            {/* FINANCIAL INFO */}
            <div className="bg-gray-100 p-4 rounded-lg mb-4 border border-gray-200">
              <div className="flex justify-between py-1 border-b border-gray-300">
                <p>Total Amount</p>
                <p className="font-semibold">{formatCurrency(r.total_amount)}</p>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-300">
                <p>Amount Paid</p>
                <p className="font-semibold">{formatCurrency(r.amount_paid)}</p>
              </div>
              <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-300">
                <p className="font-semibold text-lg">Balance Due</p>
                <p className="text-red-600 font-extrabold">{formatCurrency(r.balance)}</p>
              </div>
            </div>

            {/* DETAILS */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <p>Due Date</p>
                <p>{formatDate(r.due_date)}</p>
              </div>
              <div className="flex justify-between">
                <p>Payment Method</p>
                <p className="capitalize">{r.payment_method}</p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex space-x-4">
              {r.balance > 0 && (
                <button
                  onClick={() => setModalMessage('SIMULATION TEST. PERO SEND NA LANG SA 09393719241')}
                  className="flex-1 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Pay Now
                </button>
              )}
              <button
                onClick={() => setModalMessage('SIMULATION TEST. PERO SEND NA LANG SA 09393719241')}
                className="flex-1 bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                View Receipt
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {modalMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full text-black">
            <h3 className="text-xl font-bold mb-2">Notice</h3>
            <p>{modalMessage}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setModalMessage('')}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
