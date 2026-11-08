import React from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  isLoading?: boolean;
  text: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading, text }) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 text-xs tracking-wide cursor-pointer"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Signing in...</span>
        </>
      ) : (
        <>
          <ArrowRight className="w-4 h-4" />
          <span>{text}</span>
        </>
      )}
    </button>
  );
};