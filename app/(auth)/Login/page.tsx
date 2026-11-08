import React from 'react';
import { AuthHero } from '../../(components)/auth-hero';
import { LoginForm } from '../../(components)/login-form';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex w-full bg-[#FAF9F6]">
      {/* Left split hero */}
      <AuthHero />

      {/* Right split login card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 md:p-16">
        <LoginForm />
      </div>
    </main>
  );
}