import React from 'react';
import Link from 'next/link';

export const ForgotPassword: React.FC = () => {
  return (
    <Link
      href="/ForgotPassword"
      className="text-xs font-bold text-gray-800 hover:text-amber-600 transition-colors"
    >
      Forgot password?
    </Link>
  );
};