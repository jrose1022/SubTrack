import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  icon: Icon,
  error,
  id,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-bold text-gray-800">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          className={`w-full px-4 py-3 text-sm bg-[#F8F8F8] border border-gray-200/60 rounded-xl outline-none transition-all duration-200 focus:bg-white focus:border-amber-500 text-gray-900 placeholder:text-gray-400 ${
            Icon ? 'pr-10' : ''
          } ${className}`}
          {...props}
        />
        {Icon && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};