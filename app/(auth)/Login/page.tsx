'use client';

import { useState } from 'react';
import Link from 'next/link';
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

    try {
      // 1️⃣ Sign in with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError || !authData.user) {
        setMessage('Login failed: ' + (authError?.message || 'Unknown error'));
        return;
      }

      // 2️⃣ Fetch user profile using email
      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .select('name, address, phone, email')
        .eq('email', email)
        .maybeSingle(); // returns null if no row

      if (profileError) {
        setMessage('Failed to fetch profile: ' + profileError.message);
        return;
      }

      if (!profileData) {
        setMessage('No profile found for this email.');
        return;
      }

      // Optional: store profile info for later use
      localStorage.setItem('userProfile', JSON.stringify(profileData));

      // 3️⃣ Redirect to /home
      router.push('/home');
    } catch (err: any) {
      setMessage('Unexpected error: ' + err.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundColor: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(2px)',
      }}
    >
      <div
        className="rounded-2xl shadow-xl p-10 w-80 text-center"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
      >
        <div className="mb-4">
          <img
            src="/subTrackLogo.png"
            alt="SubTrack Logo"
            className="mx-auto mb-0"
            width={80}
            height={80}
          />
          <h1 className="font-bold text-black m-0" style={{ fontFamily: "'Inknut Antiqua', serif" }}>
            SubTrack
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <h2
            className="font-bold italic text-black text-center"
            style={{ fontFamily: "'Inknut Antiqua', serif" }}
          >
            Login
          </h2>

          {/* Email */}
          <div className="flex items-center bg-white rounded-full px-3 py-2 shadow">
            <span className="mr-2 text-gray-400">@</span>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-0 w-full text-gray-700 placeholder-gray-400"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-white rounded-full px-3 py-2 shadow">
            <span className="mr-2 text-gray-400">🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-0 w-full text-gray-700 placeholder-gray-400"
              required
            />
          </div>

          <div className="flex justify-end">
            <Link
              href="/SignUp"
              className="italic text-sm text-gray-700 hover:underline"
            >
              Don't have an account? Sign Up
            </Link>
          </div>

          <button
            type="submit"
            className="bg-black text-white rounded-full py-2 px-6 w-full hover:bg-gray-200 hover:text-black transition-colors"
          >
            Login
          </button>

          {message && (
            <p className="text-sm text-center text-red-500 mt-2">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
