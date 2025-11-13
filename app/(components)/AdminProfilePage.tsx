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

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedProfile = localStorage.getItem('userProfile');
        if (!storedProfile) throw new Error('No profile found in localStorage');

        const user = JSON.parse(storedProfile);
        setProfile(user);
      } catch (err: any) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading profile...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!profile) return <p className="text-center mt-10 text-gray-600">No profile data available.</p>;

  return (
    <div className="flex justify-center vw-75 items-start p-8 ">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full sm:w-[75vw] max-w-lg">

        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex-shrink-0 shadow-inner mb-4" aria-label="Admin Avatar" />
          <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
          <p className="text-gray-600">{profile.email}</p>
          <p className={`mt-1 font-medium ${profile.is_admin ? 'text-blue-700' : 'text-gray-700'}`}>
            {profile.is_admin ? 'Admin' : 'User'}
          </p>
        </div>

        <hr className="border-gray-200 mb-6" />

        <div className="space-y-4 text-left text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Phone:</span>
            <span>{profile.phone || '-'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Address:</span>
            <span>{profile.address || '-'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
