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

export default function AdminProfileWithUserManagement() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [errorProfile, setErrorProfile] = useState('');
  const [errorUsers, setErrorUsers] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedProfile = localStorage.getItem('userProfile');
        if (!storedProfile) throw new Error('No profile found in localStorage');
        setProfile(JSON.parse(storedProfile));
      } catch (err: any) {
        setErrorProfile(err.message || 'Failed to load profile');
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
  }, []);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const { data, error } = await supabase.from('users').select('*').order('name');
      if (error) throw error;
      setUsers(data || []);
    } catch (err: any) {
      setErrorUsers(err.message || 'Failed to fetch users.');
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

  return (
    <div className="flex justify-center p-4 sm:p-8 bg-gray-50">
      <div className="w-full sm:w-[98%] lg:w-[100%] max-w-[1500px] flex flex-col space-y-6">

        {/* Admin Profile */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8">
          {loadingProfile ? (
            <p className="text-center text-gray-600">Loading profile...</p>
          ) : errorProfile ? (
            <p className="text-center text-red-500">{errorProfile}</p>
          ) : profile ? (
            <>
              <div className="flex flex-col items-center mb-4 sm:mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-300 rounded-full shadow-inner mb-3 sm:mb-4" />
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{profile.name}</h1>
                <p className="text-gray-600">{profile.email}</p>
                <p className={`mt-1 font-medium ${profile.is_admin ? 'text-blue-700' : 'text-gray-700'}`}>
                  {profile.is_admin ? 'Admin' : 'User'}
                </p>
              </div>
              <hr className="border-gray-200 mb-4 sm:mb-6" />
              <div className="space-y-2 sm:space-y-4 text-gray-700 text-sm sm:text-base">
                <div className="flex justify-between">
                  <span className="font-medium">Phone:</span>
                  <span>{profile.phone || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Address:</span>
                  <span>{profile.address || '-'}</span>
                </div>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-600">No profile data available.</p>
          )}
        </div>

        {/* User Management */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 overflow-x-auto">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center sm:text-left">
            User Management
          </h1>

          {loadingUsers ? (
            <p className="text-center">Loading users...</p>
          ) : errorUsers ? (
            <p className="text-center text-red-500">{errorUsers}</p>
          ) : (
            <table className="w-full table-auto min-w-[00px] text-sm text- text-black sm:text-base border-collapse">
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
                {users.map((user) => (
                  <tr key={user.id} className="border-b text-black text-center hover:bg-gray-50">
                    <td className="px-2 sm:px-4 py-1 text-center">{user.name}</td>
                    <td className="px-2 sm:px-4 py-1 text-center">{user.email}</td>
                    <td className="px-2 sm:px-4 py-1 text-center">{user.phone || '-'}</td>
                    <td className="px-2 sm:px-4 py-1 text-center">{user.address || '-'}</td>
                    <td className="px-2 sm:px-4 py-1 text-center">
                      <select
                        className="border rounded px-2 py-1 w-full text-gray-700"
                        value={user.is_admin ? 'admin' : 'user'}
                        disabled={updating === user.id}
                        onChange={(e) => toggleAdmin(user.id, e.target.value === 'admin')}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-2 sm:px-4 py-1 text-center">
                      <select
                        className="border rounded px-2 py-1 w-full text-gray-700"
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
      </div>
    </div>
  );
}
