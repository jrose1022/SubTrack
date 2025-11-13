'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase-client';

export default function SignUp() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    // 1️⃣ Sign up user using Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`, // redirect after verification
      },
    });

    if (authError) {
      setMessage('Error signing up: ' + authError.message);
      return;
    }

    // 2️⃣ Insert extra info into users table
    if (authData.user) {
      const { error: dbError } = await supabase.from('users').insert([
        {
          auth_id: authData.user.id, // link to Supabase Auth user
          name,
          address,
          phone,
          email: authData.user.email, // must include email
        },
      ]);

      if (dbError) {
        setMessage('Error saving user info: ' + dbError.message);
        return;
      }

      // 3️⃣ Success
      setMessage(
        'Sign-up successful! Please check your email to verify your account.'
      );
      setName('');
      setAddress('');
      setPhone('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
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
          <Image
            src="/subTrackLogo.png"
            alt="SubTrack Logo"
            className="mx-auto mb-0"
            width={80}
            height={80}
          />
          <h1
            className="font-bold text-black m-0"
            style={{ fontFamily: "'Inknut Antiqua', serif" }}
          >
            SubTrack
          </h1>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4 text-left">
          <h2
            className="font-bold italic text-black text-center"
            style={{ fontFamily: "'Inknut Antiqua', serif" }}
          >
            Sign Up
          </h2>

          {/* Name */}
          <div className="flex items-center bg-white rounded-full px-3 py-2 shadow">
            <span className="mr-2 text-gray-400">@</span>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent outline-0 w-full text-gray-700 placeholder-gray-400"
              required
            />
          </div>

          {/* Address */}
          <div className="flex items-center bg-white rounded-full px-3 py-2 shadow">
            <span className="mr-2 text-gray-400">🏠</span>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-transparent outline-0 w-full text-gray-700 placeholder-gray-400"
              required
            />
          </div>

          {/* Phone */}
          <div className="flex items-center bg-white rounded-full px-3 py-2 shadow">
            <span className="mr-2 text-gray-400">📞</span>
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-transparent outline-0 w-full text-gray-700 placeholder-gray-400"
              required
            />
          </div>

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

          {/* Confirm Password */}
          <div className="flex items-center bg-white rounded-full px-3 py-2 shadow">
            <span className="mr-2 text-gray-400">🔒</span>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-transparent outline-0 w-full text-gray-700 placeholder-gray-400"
              required
            />
          </div>

          <div className="flex justify-end">
            <Link
              href="/Login"
              className="italic text-sm text-gray-700 hover:underline"
            >
              Already have an account? Log in
            </Link>
          </div>

          <button
            type="submit"
            className="bg-black text-white rounded-full py-2 px-6 w-full hover:bg-gray-200 hover:text-black transition-colors"
          >
            Sign Up
          </button>

          {message && (
            <p className="text-sm text-center text-gray-700 mt-2">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
