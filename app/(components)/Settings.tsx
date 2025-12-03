'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Profile fields
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [authUser, setAuthUser] = useState<any>(null);

  // Fetch the logged-in user + profile
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMessage('User not logged in.');
        setLoading(false);
        return;
      }

      setAuthUser(user);

      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('auth_id', user.id)
        .single();

      if (error) {
        console.error(error);
        setMessage('Error loading profile.');
      } else if (profile) {
        setUsername(profile.name || '');
        setAddress(profile.address || '');
        setContact(profile.contact || '');
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!authUser) return;

    // Update Profile Info
    const { error: profileError } = await supabase
      .from('users')
      .update({ name: username, address, contact })
      .eq('auth_id', authUser.id);

    if (profileError) {
      setMessage('Error saving profile.');
      console.log(profileError);
      return;
    }

    // Update password if fields are filled
    if (currentPassword || newPassword || confirmPassword) {
      if (!currentPassword || !newPassword || !confirmPassword) {
        setMessage('Please fill in all password fields.');
        return;
      }

      if (newPassword !== confirmPassword) {
        setMessage('New password and confirm password do not match.');
        return;
      }

      // Reauthenticate user
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: authUser.email,
        password: currentPassword,
      });

      if (signInError) {
        setMessage('Current password is incorrect.');
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setMessage('Failed to update password.');
        console.log(updateError);
        return;
      }
    }

    setMessage('Profile updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-700">
        Loading...
      </div>
    );

  return (
    <div className="max-w-lg mx-auto p-8 mt-12 bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Account Settings
      </h1>

      {message && (
        <p className="mb-6 text-center text-sm text-blue-600 font-medium">{message}</p>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Username */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            placeholder="Enter your username"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            placeholder="Enter your address"
          />
        </div>

        {/* Contact */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Contact Number</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            placeholder="Enter contact number"
          />
        </div>

        {/* Password Section */}
        <div className="pt-4 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h2>

          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              placeholder="Enter current password"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              placeholder="Re-enter new password"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-black transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
