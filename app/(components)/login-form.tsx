'use client';

import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { AuthBadge } from './auth-badge';
import { AuthHeader } from './auth-header';
import { InputField } from './input-field';
import { PasswordInput } from './password-input';
import { RememberMe } from './remember-me';
import { ForgotPassword } from './forgot-password';
import { SubmitButton } from './submit-button';
import { RoleNotice } from './role-notice';
import { AuthFooter } from './auth-footer';

export const LoginForm: React.FC = () => {
  // Fixed: Initialize password as empty string
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    // Simulated frontend-only login request
    setTimeout(() => {
      setIsLoading(false);
      alert('Frontend validation passed!');
    }, 1200);
  };

  return (
    <div className="w-full max-w-md">
      <AuthBadge />

      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-gray-200/50 border border-gray-100 space-y-6">
        <AuthHeader
          title="Welcome back"
          subtitle="Sign in to your community account."
        />

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            id="email"
            type="email"
            label="Email address"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            error={errors.email}
          />

          <PasswordInput
            id="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <div className="flex items-center justify-between pt-1">
            <RememberMe checked={rememberMe} onChange={setRememberMe} />
            <ForgotPassword />
          </div>

          <div className="pt-1">
            <SubmitButton isLoading={isLoading} text="Sign in securely" />
          </div>
        </form>

        <RoleNotice />
      </div>

      <AuthFooter />
    </div>
  );
};