import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const RoleNotice: React.FC = () => {
  return (
    <div className="pt-6 border-t border-gray-100 flex gap-3 items-start text-left">
      <ShieldCheck className="w-4.5 h-4.5 text-gray-700 mt-0.5 shrink-0" />
      <div className="space-y-1">
        <p className="font-bold text-gray-800 text-[12px]">Access follows your assigned role.</p>
        <p className="text-[11px] text-gray-500 leading-normal">
          Supabase Authentication verifies your account, then opens your provisioned Homeowner or Administrator portal. Roles cannot be self-selected.
        </p>
      </div>
    </div>
  );
};