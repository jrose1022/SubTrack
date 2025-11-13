'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-client';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    // 1️⃣ Sign in with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setMessage('Error logging in: ' + authError.message);
      return;
    }

    // 2️⃣ Fetch user profile from users table
    if (authData.user) {
      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .select('name, address, phone, email')
        .eq('auth_id', authData.user.id)
        .single(); // single row only

      if (profileError) {
        setMessage('Error fetching profile: ' + profileError.message);
        return;
      }

      // Optional: store profileData in localStorage or context
      localStorage.setItem('userProfile', JSON.stringify(profileData));

      // 3️⃣ Redirect to /home
      router.push('/home');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80 space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />

        {/* Message */}
        {message && <p className="text-sm text-red-500">{message}</p>}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
