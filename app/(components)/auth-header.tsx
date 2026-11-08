import React from 'react';
import { Lock } from 'lucide-react';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center shrink-0 border border-gray-200/50">
        <Lock className="w-5 h-5 text-gray-800" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">{title}</h2>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      </div>
    </div>
  );
};