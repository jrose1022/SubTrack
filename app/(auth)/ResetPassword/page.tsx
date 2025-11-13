'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-client';

export default function ResetPassword() {
  const router = useRouter();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [validLink, setValidLink] = useState(true);

  useEffect(() => {
    // Supabase sends the token in the URL fragment (#access_token=...)
    if (!window.location.hash.includes('access_token')) {
      setValidLink(false);
    }
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validLink) {
      setMessage('Invalid or expired link.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setLoading(true);
    setMessage('');

    // Supabase automatically reads the access_token from the URL fragment
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Password updated successfully! Redirecting to login...');
      setTimeout(() => router.push('/Login'), 3000);
    }

    setLoading(false);
  };

  if (!validLink) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-red-500 font-bold">Invalid or expired reset link.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleReset} className="p-6 bg-white rounded shadow-md w-80">
        <h2 className="text-center font-bold mb-4">Reset Password</h2>

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full mb-4 p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full mb-4 p-2 border rounded"
        />

        {message && <p className="text-sm text-center text-red-500 mb-4">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
}
