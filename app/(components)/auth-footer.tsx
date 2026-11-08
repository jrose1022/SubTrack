import React from 'react';
import { Shield } from 'lucide-react';

export const AuthFooter: React.FC = () => {
  return (
    <div className="space-y-4 text-center text-xs text-gray-500 max-w-sm mx-auto mt-8">
      <div className="space-y-1">
        <p className="font-medium text-gray-700 text-[12px]">Need an account? Ask the HOA office for an invitation.</p>
        <p className="text-[11px] text-gray-400 leading-relaxed">
          Administrator access is assigned by an authorized board administrator. This design does not connect to a live sign-in service.
        </p>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-gray-500 text-[11px] pt-2">
        <Shield className="w-3.5 h-3.5 text-gray-600" />
        <span>Secure access · Private household records</span>
      </div>
    </div>
  );
};