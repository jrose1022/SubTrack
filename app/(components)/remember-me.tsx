import React from 'react';

interface RememberMeProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const RememberMe: React.FC<RememberMeProps> = ({ checked, onChange }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-gray-300 text-amber-500 focus:ring-amber-400 accent-amber-500 cursor-pointer"
      />
      <span className="text-xs font-medium text-gray-700">Remember this device</span>
    </label>
  );
};