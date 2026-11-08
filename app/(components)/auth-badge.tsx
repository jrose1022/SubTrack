import React from 'react';

export const AuthBadge: React.FC = () => {
  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase text-gray-700">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        Demonstration Environment
      </div>
    </div>
  );
};